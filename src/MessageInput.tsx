import react, { FormEvent } from "react"

function MessageInput(props: { socket: WebSocket | undefined }) {
    const [message, setMessage] = react.useState<string>()

    return (
        <form className='fixed bottom-0 left-0 w-full'>
            <div className='flex justify-between'>
                <input className='w-full border p-4' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='message' name='message' />
                <button className='bg-gray-500 p-4 rounded-1' type='submit' onClick={(e) => handleSubmit(props.socket, e)}>SEND</button>
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
