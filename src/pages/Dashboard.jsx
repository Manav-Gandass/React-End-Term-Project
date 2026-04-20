import { useStore } from '../context/StoreContext'

export default function Dashboard() {
    const { teamMembers, contributions } = useStore()

    return (
        <div className="p-8">
            <h1 className="text-4xl font-semibold text-white mb-8">Dashboard</h1>

            <div className="bg-zinc-900 rounded-3xl p-10">
                <p className="text-xl text-zinc-300 mb-6">
                    Welcome to TeamViz
                </p>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-zinc-400 text-sm mb-2">Team Members</p>
                        <p className="text-6xl font-bold text-white">{teamMembers.length}</p>
                    </div>
                    <div>
                        <p className="text-zinc-400 text-sm mb-2">Contributions</p>
                        <p className="text-6xl font-bold text-white">{contributions.length}</p>
                    </div>
                </div>

                {teamMembers.length === 0 && (
                    <div className="mt-12 text-center py-12 border border-dashed border-zinc-700 rounded-3xl">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-2xl font-medium mb-3">No team members yet</h3>
                        <p className="text-zinc-400 max-w-xs mx-auto">
                            Go to the Tracker page to add members and log contributions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}