import { Message } from './MessageInterface'

export default function UsernameItem({ message, username }: { message: Message, username: string }) {
    if (message.is_new) {
        return <span className='text-green-500 pr-2'>{message.username}~</span>
    }

    return <span className={message.username === username ? 'text-red-500 pr-2 font-bold' : 'text-red-400 pr-2'}>{message.username}:~ </span>

}
