import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

interface DashboardStats {
  companies: number
  individuals: number
  conversations: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    companies: 0,
    individuals: 0,
    conversations: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: companies },
          { count: individuals },
          { count: conversations },
        ] = await Promise.all([
          supabase.from('companies').select('*', { count: 'exact', head: true }),
          supabase.from('individuals').select('*', { count: 'exact', head: true }),
          supabase.from('conversations').select('*', { count: 'exact', head: true }),
        ])

        setStats({
          companies: companies || 0,
          individuals: individuals || 0,
          conversations: conversations || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Companies</h2>
          <p className="mt-2 text-3xl font-bold">{stats.companies}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Individuals</h2>
          <p className="mt-2 text-3xl font-bold">{stats.individuals}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
          <p className="mt-2 text-3xl font-bold">{stats.conversations}</p>
        </div>
      </div>
    </div>
  )
} 