import { useLayoutEffect, useRef } from 'react'
import { Message } from './MessageInterface'

function MessagesList(props: { messages: Message[] }) {
    const messagesContainer = useRef<HTMLUListElement>(null)
    useLayoutEffect(() => {
        const current  = messagesContainer.current
        current?.scrollTo(0, current?.scrollHeight ?? 0)
    }, [props.messages])
    return (
        <ul className='flex flex-col items-start list-none m-2 overflow-y-scroll' ref={messagesContainer}>
            {props.messages?.map((message: Message) =>
                <li key={message.id}>
                    {message.is_new ?
                        <span className='text-green-500 pr-2'>{message.username}~</span>
                        :
                        <span className='text-red-500 pr-2'>{message.username}:~</span>}
                    <span className='font-bold'>{message.body}</span>
                </li>
            )}
        </ul>
    )

}

export default MessagesList
