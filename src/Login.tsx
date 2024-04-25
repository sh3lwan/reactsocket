import { FormEvent, useState } from "react"
import { Message } from "./MessageInterface"

export default function Login({ setConnected, setMessages, setSocket }: { setConnected: any, setMessages: any, setSocket: any }) {
    const [username, setUsername] = useState<string>("")


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8080/api/connect?username=${username}`)

        if (response.status === 200) {
            const socket = await connectSocket()

            const firstMessage: Message = {
                username: username,
                is_new: true,
                body: ""
            }

            socket?.send(JSON.stringify(firstMessage))

            const messages: Message[] = []

            const data = await response.json()

            data.messages?.forEach((message) => {
                messages.push({
                    ...message,
                    body: message.message
                })
            });

            setSocket(socket)

            setMessages(messages)

            setConnected(true)

        }


    }

    function connectSocket() {
        const webSocket = new WebSocket("ws://localhost:8080/ws")

        return new Promise<WebSocket>((resolve, fail) => {
            webSocket.onopen = (e) => {
                console.log('Socket Opened', e)
                resolve(webSocket)
            }

            webSocket.onclose = () => {
                console.log('Socket Closed');
            }

            webSocket.onerror = (error) => {
                console.error("error:", error)
                fail(error)
            }

            webSocket.onmessage = (e: MessageEvent) => {
                let receivedObj = e.data

                console.log('received message', receivedObj)
                try {
                    receivedObj = JSON.parse(receivedObj)

                    setMessages((prevList: Message[]) => [
                        ...prevList,
                        {
                            username: receivedObj.username,
                            body: receivedObj.message,
                            is_new: receivedObj.is_new,
                        } as Message
                    ])
                } catch (e) {
                    console.error(e)
                }

            }
        })

    }

    return (
        <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>
            <form className="" onSubmit={handleSubmit}>
                <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="p-4 outline-none" />
            </form>
        </>
    )

}


