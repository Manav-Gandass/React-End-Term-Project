import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-16">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl">👥</div>
                <h1 className="text-3xl font-semibold tracking-tighter">TeamViz</h1>
            </div>

            <nav className="space-y-2 flex-1">
                <Link
                    to="/dashboard"
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-zinc-800 text-zinc-300 transition-all"
                >
                    <span className="text-2xl">📊</span>
                    <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                    to="/tracker"
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-zinc-800 text-zinc-300 transition-all"
                >
                    <span className="text-2xl">➕</span>
                    <span className="font-medium">Tracker</span>
                </Link>
                <Link
                    to="/insights"
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-zinc-800 text-zinc-300 transition-all"
                >
                    <span className="text-2xl">💡</span>
                    <span className="font-medium">Insights</span>
                </Link>
            </nav>

            <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-300 transition-all"
            >
                <span className="text-xl">🚪</span>
                <span>Logout</span>
            </button>
        </div>
    )
}