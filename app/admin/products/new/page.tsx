'use client'

import { AdminNavbar } from '@/components/admin-navbar'
import { ProductForm } from '@/components/admin-product-form'

export default function NewProductPage() {
  return (
    <>
      <AdminNavbar />
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-lg font-medium mb-8">Новый товар</h1>
        <ProductForm />
      </main>
    </>
  )
}
