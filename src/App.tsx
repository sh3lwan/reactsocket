import './App.css'
import MessagesList from './MessagesList'
import MessageInput from './MessageInput'
import { Message } from './MessageInterface'
import { useEffect, useState } from 'react'
import Login from './Login'

function App() {
    const [socket, setSocket] = useState<WebSocket>()
    const [messages, setMessages] = useState<Message[]>([])
    const [connected, setConnected] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [receiver, setReceiver] = useState<string>("")


    useEffect(() => {
        return () => {
            if (!socket) return
            socket.close()
        }
    }, [socket])

    return (
        <>
            <div className={!connected ? 'h-screen flex items-center text-center justify-center overflow-hidden' : 'hidden'}>
                <Login username={username}
                    setSocket={setSocket}
                    setConnected={setConnected}
                    setMessages={setMessages}
                    setUsername={setUsername} />
            </div>

            <div className={connected ? 'flex flex-col justify-between h-screen ' : 'hidden'}>
                <MessagesList messages={messages} username={username} handleReceiver={handleReceiver} />
                <MessageInput socket={socket} receiver={receiver} />
            </div>
        </>
    )

    async function handleReceiver(receiver: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/connect?receiver=${receiver}`)

            const json = await response.json()

            const messages = json.Data.messages ?? []

            setMessages(messages)

            setReceiver(receiver)
        } catch (e) {
            console.error(e)
        }

    }

}

export default App
