import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && router.pathname !== '/auth/login') {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || (!user && router.pathname !== '/auth/login')) {
    return <div>Loading...</div>
  }

  return <>{children}</>
} 