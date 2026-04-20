import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="bg-zinc-900 rounded-3xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-8 text-center">Login to TeamViz</h1>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 mb-4 outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 mb-6 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl font-medium"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-zinc-400 mt-6">
                    Don't have an account? <Link to="/signup" className="text-indigo-400">Sign up</Link>
                </p>
            </div>
        </div>
    )
}