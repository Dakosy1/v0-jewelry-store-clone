'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export function AdminNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const links = [
    { href: '/admin', label: 'Товары' },
    { href: '/admin/products/new', label: '+ Добавить' },
    { href: '/admin/archive', label: 'Архив' },
  ]

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-white text-sm font-medium tracking-widest">TOMIRIS ADMIN</span>
        <nav className="flex gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={logout}
        className="text-zinc-400 hover:text-white text-sm transition"
      >
        Выйти
      </button>
    </header>
  )
}
