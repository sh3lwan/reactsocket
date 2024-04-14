import { FormEvent, useEffect, useState } from 'react'
import './App.css'

function App() {

    interface Message {
        username: string
        body: string
        is_new: boolean
    }

    const [socket, setSocket] = useState<WebSocket>()
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => connectSocket(), [])

    return (
        <>
            <div className='relative h-lvh'>
                <ul className='flex flex-col items-start list-none '>
                    {messages?.map((message) =>
                        <li>
                            {message.is_new ?
                                <span className='text-green-500 pr-2'>{message.username}~</span>
                                :
                                <span className='text-red-500 pr-2'>{message.username}:~</span>
                            }
                            <span className='font-bold'>{message.body}</span>
                        </li>
                    )}
                </ul>
                <form className='fixed bottom-0 left-0 w-full'>
                    <div className='flex justify-between'>
                        <input className='w-full border p-4' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='message' name='message' />
                        <button className='bg-gray-500 p-4 rounded-1' type='submit' onClick={(e) => handleSubmit(e)}>SEND</button>
                    </div>
                </form>
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

                console.log(receivedObj)

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


    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (message) {
            socket?.send(message ?? "")
            setMessage("")
        }
    }


}

export default App
