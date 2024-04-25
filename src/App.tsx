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

    useEffect(() => {

        return () => {
            if (!socket) return
            socket.close()
        }
    }, [socket])

    return (
        <>
            <div className={!connected ? 'h-screen flex items-center text-center justify-center overflow-hidden' : 'hidden'}>
                <Login setSocket={setSocket} setConnected={() => setConnected(true)} setMessages={setMessages} />
            </div>

            <div className={connected ? 'flex flex-col max-h-screen ' : 'hidden'}>
                <MessagesList messages={messages} />
                <MessageInput socket={socket} />
            </div>
        </>
    )

}

export default App
