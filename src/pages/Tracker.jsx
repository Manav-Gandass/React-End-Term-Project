import { useState } from 'react'
import { useStore } from '../context/StoreContext'

export default function Tracker() {
    const { teamMembers, addMember, addContribution } = useStore()
    const [memberName, setMemberName] = useState('')
    const [contribName, setContribName] = useState('')
    const [type, setType] = useState('coding')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')

    const handleAddMember = (e) => {
        e.preventDefault()
        addMember(memberName)
        setMemberName('')
    }

    const handleLogContribution = (e) => {
        e.preventDefault()
        if (!contribName || !duration) return
        addContribution({
            name: contribName,
            type,
            duration: parseInt(duration),
            description
        })
        setDuration('')
        setDescription('')
        alert('Contribution logged!')
    }

    return (
        <div className="grid grid-cols-2 gap-8">
            {/* Add Member */}
            <div className="bg-zinc-900 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Add Team Member</h2>
                <form onSubmit={handleAddMember}>
                    <input
                        type="text"
                        value={memberName}
                        onChange={e => setMemberName(e.target.value)}
                        placeholder="Member name"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 mb-4"
                    />
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl">Add Member</button>
                </form>
                <div className="mt-8">
                    <h3 className="text-sm text-zinc-400 mb-3">Current Members</h3>
                    <ul className="space-y-2">
                        {teamMembers.map(m => <li key={m.id} className="bg-zinc-800 rounded-2xl px-6 py-3">{m.name}</li>)}
                    </ul>
                </div>
            </div>

            {/* Log Contribution */}
            <div className="bg-zinc-900 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Log Contribution</h2>
                <form onSubmit={handleLogContribution} className="space-y-6">
                    <select
                        value={contribName}
                        onChange={e => setContribName(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4"
                    >
                        <option value="">Select member</option>
                        {teamMembers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                    </select>

                    <div className="grid grid-cols-3 gap-3">
                        {['coding', 'review', 'planning'].map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`py-4 rounded-2xl ${type === t ? 'bg-indigo-600 text-white' : 'bg-zinc-800'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        placeholder="Minutes"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4"
                    />

                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 h-24"
                    />

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl">Log Contribution</button>
                </form>
            </div>
        </div>
    )
}