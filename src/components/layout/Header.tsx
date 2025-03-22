import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Stakeholder CRM</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span>{user.email}</span>
            <button
              onClick={() => signOut()}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
} 