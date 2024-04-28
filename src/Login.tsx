import { FormEvent, useEffect } from "react"
import { Message } from "./MessageInterface"

export default function Login({ username, setConnected, setMessages, setSocket, setUsername }: {
    username: string,
    setConnected: CallableFunction,
    setMessages: CallableFunction,
    setSocket: CallableFunction,
    setUsername: CallableFunction
}) {

    useEffect(() => {
        const savedUsername = localStorage.getItem("username")

        if (savedUsername) {
            handleLogin(savedUsername)
            setUsername(savedUsername)
        }

    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        await handleLogin(username)
    }

    async function handleLogin(username: string) {

        const response = await fetch(`http://localhost:8080/api/connect`)

        if (response.status === 200) {
            const socket = await connectSocket()

            const firstMessage: Message = {
                username: username,
                is_new: true,
                body: ""
            }


            socket?.send(JSON.stringify(firstMessage))

            const data = await response.json()

            const messages = data.messages ?? []

            setSocket(socket)

            setMessages((prevList: Message[]) => [...prevList, ...messages])

            setConnected(true)

            localStorage.setItem("username", username)
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
                        receivedObj
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


