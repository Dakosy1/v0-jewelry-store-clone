'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Save, X } from 'lucide-react'
import { Product } from '@/types/product'
import { CategoryItem } from '@/data/categories'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    inStock: true,
    category: 'rings' as any,
    metal: 'gold',
    purity: '585',
    images: ['/images/products/placeholder.jpg']
  })

  // Fetch data
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts)
    fetch('/api/categories').then(res => res.json()).then(setCategories)
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    if (res.ok) {
      const added = await res.json()
      setProducts([...products, added])
      setIsAdding(false)
      setNewProduct({
        inStock: true,
        category: 'rings' as any,
        metal: 'gold',
        purity: '585',
        images: ['/images/products/placeholder.jpg']
      })
    }
  }

  return (
    <div className="min-h-screen bg-secondary p-8 font-[family-name:var(--font-inter)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-light tracking-tight text-foreground uppercase">Управление магазином</h1>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.2em] hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            ДОБАВИТЬ ТОВАР
          </button>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-background p-6 border border-border">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">Всего товаров</p>
            <p className="text-2xl font-medium">{products.length}</p>
          </div>
          <div className="bg-background p-6 border border-border">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">Категорий</p>
            <p className="text-2xl font-medium">{categories.length}</p>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-background border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Товар</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Категория</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Цена</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Наличие</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary relative overflow-hidden">
                        <img src={p.images[0]} alt={p.nameRu} className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{p.nameRu}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{p.metal} {p.purity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">{p.category}</td>
                  <td className="px-6 py-4">{p.price.toLocaleString('ru-KZ')} ₸</td>
                  <td className="px-6 py-4">
                    {p.inStock ? (
                      <span className="text-green-600 text-[10px] tracking-widest font-bold">В НАЛИЧИИ</span>
                    ) : (
                      <span className="text-red-500 text-[10px] tracking-widest font-bold">НЕТ</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-primary mr-3"><Edit className="h-4 w-4" /></button>
                    <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Modal (Primitive version) */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-background w-full max-w-xl p-8 border border-border shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-light uppercase tracking-widest">Новый товар</h2>
                <button onClick={() => setIsAdding(false)}><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-2">Название (RU)</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={newProduct.nameRu || ''}
                    onChange={e => setNewProduct({...newProduct, nameRu: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-2">Категория</label>
                    <select 
                      className="w-full bg-secondary p-3 text-sm focus:outline-none"
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.nameRu}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-2">Цена (₸)</label>
                    <input 
                      type="number" 
                      required 
                      className="w-full bg-secondary p-3 text-sm focus:outline-none"
                      value={newProduct.price || ''}
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-2">Металл</label>
                    <input 
                      type="text" 
                      className="w-full bg-secondary p-3 text-sm"
                      value={newProduct.metal || ''}
                      onChange={e => setNewProduct({...newProduct, metal: e.target.value as any})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-2">Проба</label>
                    <input 
                      type="text" 
                      className="w-full bg-secondary p-3 text-sm"
                      value={newProduct.purity || ''}
                      onChange={e => setNewProduct({...newProduct, purity: e.target.value as any})}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  СОХРАНИТЬ ТОВАР
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
