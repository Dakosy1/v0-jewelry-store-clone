'use client'

import { useEffect, useState } from 'react'
import { AdminNavbar } from '@/components/admin-navbar'
import Image from 'next/image'

type Product = {
  id: string
  nameRu: string
  price: number
  images: string[]
  category: { nameRu: string }
  collection: { nameRu: string } | null
}

export default function ArchivePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/archive')
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function restore(id: string) {
    await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'active' }),
    })
    load()
  }

  async function deletePermanently(id: string) {
    if (!confirm('Удалить навсегда? Это действие нельзя отменить.')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <>
      <AdminNavbar />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-lg font-medium mb-6">Архив ({products.length})</h1>

        {loading ? (
          <div className="text-zinc-500 text-sm">Загрузка...</div>
        ) : products.length === 0 ? (
          <div className="text-zinc-500 text-sm py-12 text-center">Архив пуст</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-left">
                  <th className="pb-3 pr-4 font-normal">Фото</th>
                  <th className="pb-3 pr-4 font-normal">Название</th>
                  <th className="pb-3 pr-4 font-normal">Категория</th>
                  <th className="pb-3 pr-4 font-normal">Цена</th>
                  <th className="pb-3 font-normal">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-zinc-800/50 opacity-70 hover:opacity-100">
                    <td className="py-3 pr-4">
                      {p.images[0] ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-zinc-800">
                          <Image src={p.images[0]} alt={p.nameRu} fill className="object-cover grayscale" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-zinc-800" />
                      )}
                    </td>
                    <td className="py-3 pr-4 text-zinc-300">{p.nameRu}</td>
                    <td className="py-3 pr-4 text-zinc-500">{p.category.nameRu}</td>
                    <td className="py-3 pr-4 text-zinc-500">{p.price.toLocaleString('ru')} ₸</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        <button onClick={() => restore(p.id)}
                          className="text-zinc-400 hover:text-green-400 transition text-xs">
                          Вернуть в продажу
                        </button>
                        <button onClick={() => deletePermanently(p.id)}
                          className="text-zinc-400 hover:text-red-400 transition text-xs">
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  )
}
