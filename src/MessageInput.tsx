import react, { FormEvent } from "react"
import { Message } from "./MessageInterface"

function MessageInput({ socket, receiver }: { socket: WebSocket | undefined, receiver: string | null }) {
    const [message, setMessage] = react.useState<string>()

    return (
        <form className='w-full'>
            <div className='flex justify-between'>
                <input className='w-full border outline-gray-200 p-4 rounded-l' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='message' name='message' />
                <button className='bg-green-400 p-4 rounded-l text-white' type='submit' onClick={(e) => handleSubmit(socket, e)}>Send</button>
            </div>
        </form>
    )

    function handleSubmit(socket: WebSocket | undefined, e: FormEvent) {
        e.preventDefault()

        if (message && message.trim()) {
            const sentMessage: Message = {
                body: message,
                receiver: receiver,
                username: "",
                is_new: false
            }
            console.log("sent: ", sentMessage);


            socket?.send(JSON.stringify(sentMessage))

            setMessage("")
        }
    }
}

export default MessageInput
