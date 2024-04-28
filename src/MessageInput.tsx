import react, { FormEvent } from "react"

function MessageInput(props: { socket: WebSocket | undefined }) {
    const [message, setMessage] = react.useState<string>()

    return (
        <form className='w-full'>
            <div className='flex justify-between'>
                <input className='w-full border outline-gray-200 p-4 rounded-l' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='message' name='message' />
                <button className='bg-green-400 p-4 rounded-l text-white' type='submit' onClick={(e) => handleSubmit(props.socket, e)}>Send</button>
            </div>
        </form>
    )

    function handleSubmit(socket: WebSocket | undefined, e: FormEvent) {
        e.preventDefault()

        if (message && message.trim()) {
            socket?.send(message ?? "")
            setMessage("")
        }
    }
}

export default MessageInput
