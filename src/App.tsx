import { useEffect, useState } from 'react'
import './App.css'
import MessagesList from './MessagesList'
import MessageInput from './MessageInput'
import { Message } from './MessageInterface'
import Login from './Login'

function App() {
    const [socket, setSocket] = useState<WebSocket>()
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const username = localStorage.getItem("username") ?? ""
        if (!username) return

        connectSocket()
    }, [])

    return (
        <>
            <Login />
            <div className='hidden relative h-lvh'>
                <MessagesList messages={messages} />
                <MessageInput socket={socket} />
            </div>
        </>
    )

    function connectSocket() {
        const webSocket = new WebSocket("ws://localhost:8080/ws")

        webSocket.onopen = (e) => {
            console.log('Socket Opened', e)
        }

        webSocket.onclose = () => {
            console.log('Socket Closed');
        }

        webSocket.onerror = (error) => {
            console.log(error)
        }

        webSocket.onmessage = (e: MessageEvent) => {
            let receivedObj = e.data

            try {
                receivedObj = JSON.parse(receivedObj)


                setMessages((prevList: Message[]) => [
                    ...prevList,
                    {
                        username: receivedObj.id,
                        body: receivedObj.message,
                        is_new: receivedObj.is_new,
                    } as Message
                ])
            } catch (e) {
                console.error(e)
            }

        }

        setSocket(webSocket)

        return () => {
            webSocket.close();
        };
    }
}

export default App
