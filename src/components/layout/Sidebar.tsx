import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Companies', href: '/companies' },
  { name: 'Individuals', href: '/individuals' },
  { name: 'Conversations', href: '/conversations' },
]

export function Sidebar() {
  const router = useRouter()

  return (
    <nav className="w-64 bg-gray-50 h-full">
      <div className="px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 