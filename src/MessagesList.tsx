import { Message } from './MessageInterface'

function MessagesList(props: { messages: Message[] }) {
    return (
        <ul className='flex flex-col items-start list-none m-2'>
            {props.messages?.map((message: Message) => 
                <li key={message.body}>
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

