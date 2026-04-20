import { useStore } from '../context/StoreContext'

export default function Insights() {
    const { contributions, getImbalanceInsights, getUserStats, getRole, teamMembers } = useStore()
    const insights = getImbalanceInsights()
    const { stats } = getUserStats()

    // Simple timeline (last 5 contributions)
    const timeline = [...contributions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

    return (
        <div className="space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Team Insights</h2>
                <div className="space-y-4">
                    {insights.map((insight, i) => (
                        <div key={i} className="bg-zinc-800 rounded-2xl p-6 flex gap-4">
                            <span className="text-3xl">💡</span>
                            <p>{insight}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
                <h2 className="text-xl font-medium mb-6">Contribution Timeline</h2>
                <div className="space-y-3">
                    {timeline.map(c => (
                        <div key={c.id} className="flex justify-between bg-zinc-800 rounded-2xl p-5">
                            <div>
                                <span className="font-medium">{c.name}</span> • {c.type} • {c.duration} min
                            </div>
                            <div className="text-xs text-zinc-400">{new Date(c.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
                <h2 className="text-xl font-medium mb-6">Role Detection</h2>
                <div className="grid grid-cols-2 gap-4">
                    {teamMembers.map(member => (
                        <div key={member.id} className="bg-zinc-800 rounded-2xl p-6">
                            <div className="font-medium">{member.name}</div>
                            <div className="text-emerald-400 text-sm mt-1">{getRole(member.name)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}