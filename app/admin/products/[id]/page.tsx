'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminNavbar } from '@/components/admin-navbar'
import { ProductForm } from '@/components/admin-product-form'

export default function EditProductPage() {
  const { id } = useParams() as { id: string }
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false) })
  }, [id])

  return (
    <>
      <AdminNavbar />
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-lg font-medium mb-8">Редактировать товар</h1>
        {loading ? (
          <div className="text-zinc-500 text-sm">Загрузка...</div>
        ) : (
          <ProductForm initialData={product} productId={id} />
        )}
      </main>
    </>
  )
}
