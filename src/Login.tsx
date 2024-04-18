import { FormEvent, useState } from "react"

export default function Login() {
    const [username, setUsername] = useState<string>("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8080/api/connect', {
            method: 'POST',
            body: JSON.stringify({
                username: username
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(response)
    }
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>
            <form className="" onSubmit={handleSubmit}>
                <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="p-4 outline-none" />
            </form>
        </div>
    )

}

