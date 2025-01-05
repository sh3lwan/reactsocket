import { Message } from './MessageInterface'

export default function UsernameItem({ message, username, handleReceiver }: { message: Message, username: string, handleReceiver: CallableFunction }) {
    if (message.username === username) {
        return <span
            className={message.is_new ? 'text-green-500 pr-2 font-bold' : 'text-red-400 pr-2 font-bold'}>
            {message.username}:~
        </span>
    }

    return <button
        type='button'
        onClick={() => handleReceiver(message.username)}
        className={message.is_new ? 'text-green-400 pr-2' : 'text-red-400 pr-2'}>
        {message.username}:~
    </button>
}
