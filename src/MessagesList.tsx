import { useLayoutEffect, useRef } from 'react'
import { Message } from './MessageInterface'
import UsernameItem from './UsernameItem'
function MessagesList(props: { messages: Message[], username: string }) {
    const messagesContainer = useRef<HTMLUListElement>(null)
    useLayoutEffect(() => {
        const current = messagesContainer.current
        current?.scrollTo(0, current?.scrollHeight ?? 0)
    }, [props.messages])
    console.log(props.messages, props.username)
    return (
        <ul className='flex flex-col items-start list-none m-2 overflow-y-scroll' ref={messagesContainer}>
            {props.messages?.map((message: Message) =>
                <li key={message.id}>
                    <UsernameItem message={message} username={props.username} />
                    <span className='font-bold'>{message.body}</span>
                </li>
            )}
        </ul>
    )

}

export default MessagesList
