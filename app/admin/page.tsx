'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNavbar } from '@/components/admin-navbar'
import Image from 'next/image'

type Product = {
  id: string
  nameRu: string
  price: number
  images: string[]
  inStock: boolean
  isNew: boolean
  isBestseller: boolean
  category: { nameRu: string }
  collection: { nameRu: string } | null
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function load() {
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function archive(id: string) {
    if (!confirm('Отправить товар в архив?')) return
    await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'archived' }),
    })
    load()
  }

  return (
    <>
      <AdminNavbar />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-medium">Активные товары ({products.length})</h1>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition rounded"
          >
            + Добавить товар
          </button>
        </div>

        {loading ? (
          <div className="text-zinc-500 text-sm">Загрузка...</div>
        ) : products.length === 0 ? (
          <div className="text-zinc-500 text-sm py-12 text-center">Товаров нет. Добавьте первый!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-left">
                  <th className="pb-3 pr-4 font-normal">Фото</th>
                  <th className="pb-3 pr-4 font-normal">Название</th>
                  <th className="pb-3 pr-4 font-normal">Категория</th>
                  <th className="pb-3 pr-4 font-normal">Коллекция</th>
                  <th className="pb-3 pr-4 font-normal">Цена</th>
                  <th className="pb-3 pr-4 font-normal">Наличие</th>
                  <th className="pb-3 font-normal">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                    <td className="py-3 pr-4">
                      {p.images[0] ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-zinc-800">
                          <Image src={p.images[0]} alt={p.nameRu} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">нет</div>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-white">{p.nameRu}</div>
                      <div className="flex gap-2 mt-1">
                        {p.isNew && <span className="text-[10px] bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded">NEW</span>}
                        {p.isBestseller && <span className="text-[10px] bg-amber-900/50 text-amber-300 px-1.5 py-0.5 rounded">ХИТ</span>}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-zinc-300">{p.category.nameRu}</td>
                    <td className="py-3 pr-4 text-zinc-300">{p.collection?.nameRu ?? '—'}</td>
                    <td className="py-3 pr-4 text-zinc-300">{p.price.toLocaleString('ru')} ₸</td>
                    <td className="py-3 pr-4">
                      <span className={`text-[11px] px-2 py-1 rounded ${p.inStock ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                        {p.inStock ? 'Есть' : 'Нет'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => router.push(`/admin/products/${p.id}`)}
                          className="text-zinc-400 hover:text-white transition text-xs"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => archive(p.id)}
                          className="text-zinc-400 hover:text-amber-400 transition text-xs"
                        >
                          В архив
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
