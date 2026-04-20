import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc
} from 'firebase/firestore'
import { useAuth } from './AuthContext'

const StoreContext = createContext()

export function StoreProvider({ children }) {
    const { currentUser } = useAuth()
    const [teamMembers, setTeamMembers] = useState([])
    const [contributions, setContributions] = useState([])

    useEffect(() => {
        if (!currentUser) {
            setTeamMembers([])
            setContributions([])
            return
        }

        // Team Members listener
        const membersQ = query(
            collection(db, "teamMembers"),
            where("userId", "==", currentUser.uid)
        )
        const unsubscribeMembers = onSnapshot(membersQ, (snap) => {
            setTeamMembers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        // Contributions listener
        const contribQ = query(
            collection(db, "contributions"),
            where("userId", "==", currentUser.uid)
        )
        const unsubscribeContrib = onSnapshot(contribQ, (snap) => {
            setContributions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        return () => {
            unsubscribeMembers()
            unsubscribeContrib()
        }
    }, [currentUser])

    const addMember = async (name) => {
        if (!currentUser || !name.trim()) return
        await addDoc(collection(db, "teamMembers"), {
            userId: currentUser.uid,
            name: name.trim()
        })
    }

    const addContribution = async (contrib) => {
        if (!currentUser) return
        await addDoc(collection(db, "contributions"), {
            userId: currentUser.uid,
            ...contrib,
            date: new Date().toISOString()
        })
    }

    const getUserStats = () => {
        const stats = {}
        teamMembers.forEach(m => {
            stats[m.name] = { totalMinutes: 0, types: {} }
        })

        contributions.forEach(c => {
            if (stats[c.name]) {
                stats[c.name].totalMinutes += c.duration
                stats[c.name].types[c.type] = (stats[c.name].types[c.type] || 0) + c.duration
            }
        })

        const totalTeamMinutes = Object.values(stats).reduce((sum, s) => sum + s.totalMinutes, 0)
        return { stats, totalTeamMinutes }
    }

    const getImbalanceInsights = () => {
        const { stats, totalTeamMinutes } = getUserStats()
        const insights = []

        if (totalTeamMinutes === 0) return ["No contributions yet. Add members and log work!"]

        let maxName = ""
        let maxMin = 0
        Object.keys(stats).forEach(name => {
            if (stats[name].totalMinutes > maxMin) {
                maxMin = stats[name].totalMinutes
                maxName = name
            }
        })

        const perc = totalTeamMinutes > 0 ? Math.round((maxMin / totalTeamMinutes) * 100) : 0
        if (perc > 50) {
            insights.push(`${maxName} is doing ${perc}% of the work — possible imbalance`)
        } else {
            insights.push("Team contribution looks balanced 👏")
        }

        const typesLogged = [...new Set(contributions.map(c => c.type))]
        if (!typesLogged.includes('review')) insights.push("No review contributions logged yet")
        if (!typesLogged.includes('planning')) insights.push("Consider logging planning sessions")

        return insights
    }

    const getRole = (name) => {
        const user = teamMembers.find(m => m.name === name)
        if (!user) return "Member"
        const userContrib = contributions.filter(c => c.name === name)
        if (userContrib.length === 0) return "New member"

        const typeCount = {}
        userContrib.forEach(c => typeCount[c.type] = (typeCount[c.type] || 0) + 1)
        const dominant = Object.keys(typeCount).reduce((a, b) =>
            typeCount[a] > typeCount[b] ? a : b
        )
        return dominant === "coding" ? "Mostly Coder" :
            dominant === "review" ? "Mostly Reviewer" : "Mostly Planner"
    }

    const value = {
        teamMembers,
        contributions,
        addMember,
        addContribution,
        getUserStats,
        getImbalanceInsights,
        getRole
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext)