import { useLayoutEffect, useRef } from 'react'
import { Message } from './MessageInterface'
import UsernameItem from './UsernameItem'
function MessagesList({ messages, username, handleReceiver }: { messages: Message[], username: string, handleReceiver: CallableFunction }) {
    const messagesContainer = useRef<HTMLUListElement>(null)
    useLayoutEffect(() => {
        const current = messagesContainer.current
        current?.scrollTo(0, current?.scrollHeight ?? 0)
    }, [messages])

    return (
        <ul className='flex flex-col items-start list-none m-2 overflow-y-scroll' ref={messagesContainer}>
            {messages?.map((message: Message) =>
                <li key={message.id}>
                    <UsernameItem message={message} username={username} handleReceiver={handleReceiver} />
                    <span className='font-bold'>{message.body}</span>
                </li>
            )}
        </ul>
    )

}

export default MessagesList
