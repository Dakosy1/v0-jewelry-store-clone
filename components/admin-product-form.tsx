'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Category = { id: string; nameRu: string }
type Collection = { id: string; nameRu: string }

type FormData = {
  nameRu: string
  price: string
  oldPrice: string
  categoryId: string
  collectionId: string
  metal: string
  purity: string
  stone: string
  weight: string
  description: string
  images: string[]
  inStock: boolean
  isNew: boolean
  isBestseller: boolean
}

const METALS = [
  { value: 'gold', label: 'Жёлтое золото' },
  { value: 'rose-gold', label: 'Розовое золото' },
  { value: 'silver', label: 'Серебро' },
  { value: 'platinum', label: 'Платина' },
]

const PURITIES = ['585', '750', '925', '950', '999']

const STONES = [
  { value: '', label: 'Без камня' },
  { value: 'diamond', label: 'Бриллиант' },
  { value: 'ruby', label: 'Рубин' },
  { value: 'sapphire', label: 'Сапфир' },
  { value: 'emerald', label: 'Изумруд' },
  { value: 'pearl', label: 'Жемчуг' },
  { value: 'cubic-zirconia', label: 'Фианит' },
]

const EMPTY: FormData = {
  nameRu: '', price: '', oldPrice: '', categoryId: '', collectionId: '',
  metal: 'gold', purity: '585', stone: '', weight: '', description: '',
  images: [], inStock: true, isNew: false, isBestseller: false,
}

export function ProductForm({
  initialData,
  productId,
}: {
  initialData?: any
  productId?: string
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormData>(() =>
    initialData
      ? {
          nameRu: initialData.nameRu ?? '',
          price: String(initialData.price ?? ''),
          oldPrice: initialData.oldPrice ? String(initialData.oldPrice) : '',
          categoryId: initialData.categoryId ?? '',
          collectionId: initialData.collectionId ?? '',
          metal: initialData.metal ?? 'gold',
          purity: initialData.purity ?? '585',
          stone: initialData.stone ?? '',
          weight: initialData.weight ? String(initialData.weight) : '',
          description: initialData.description ?? '',
          images: initialData.images ?? [],
          inStock: initialData.inStock ?? true,
          isNew: initialData.isNew ?? false,
          isBestseller: initialData.isBestseller ?? false,
        }
      : EMPTY
  )

  const [categories, setCategories] = useState<Category[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories)
    fetch('/api/collections').then(r => r.json()).then(setCollections)
  }, [])

  function set(field: keyof FormData, value: any) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function uploadImage(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) set('images', [...form.images, data.url])
    else setError(data.error ?? 'Ошибка загрузки')
  }

  function removeImage(url: string) {
    set('images', form.images.filter(i => i !== url))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      weight: form.weight ? Number(form.weight) : null,
      stone: form.stone || null,
      collectionId: form.collectionId || null,
    }

    const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products'
    const method = productId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Ошибка сохранения')
      setSaving(false)
    }
  }

  const field = 'w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-600 rounded'
  const label = 'block text-xs text-zinc-400 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Название */}
      <div>
        <label className={label}>Название товара *</label>
        <input className={field} required value={form.nameRu}
          onChange={e => set('nameRu', e.target.value)}
          placeholder="Кольцо с бриллиантом солитер" />
      </div>

      {/* Описание */}
      <div>
        <label className={label}>Описание</label>
        <textarea className={field + ' min-h-[100px] resize-y'} value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Опишите товар..." />
      </div>

      {/* Цены */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Цена (₸) *</label>
          <input className={field} required type="number" min="0" value={form.price}
            onChange={e => set('price', e.target.value)} placeholder="150000" />
        </div>
        <div>
          <label className={label}>Старая цена (₸) — для скидки</label>
          <input className={field} type="number" min="0" value={form.oldPrice}
            onChange={e => set('oldPrice', e.target.value)} placeholder="необязательно" />
        </div>
      </div>

      {/* Категория и коллекция */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Категория *</label>
          <select className={field} required value={form.categoryId}
            onChange={e => set('categoryId', e.target.value)}>
            <option value="">Выберите категорию</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.nameRu}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Коллекция</label>
          <select className={field} value={form.collectionId}
            onChange={e => set('collectionId', e.target.value)}>
            <option value="">Без коллекции</option>
            {collections.map(c => <option key={c.id} value={c.id}>{c.nameRu}</option>)}
          </select>
        </div>
      </div>

      {/* Металл и проба */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Металл *</label>
          <select className={field} value={form.metal} onChange={e => set('metal', e.target.value)}>
            {METALS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Проба *</label>
          <select className={field} value={form.purity} onChange={e => set('purity', e.target.value)}>
            {PURITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Камень и вес */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Камень</label>
          <select className={field} value={form.stone} onChange={e => set('stone', e.target.value)}>
            {STONES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Вес (г)</label>
          <input className={field} type="number" step="0.1" min="0" value={form.weight}
            onChange={e => set('weight', e.target.value)} placeholder="3.5" />
        </div>
      </div>

      {/* Фотографии */}
      <div>
        <label className={label}>Фотографии</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map(url => (
            <div key={url} className="relative w-24 h-24 rounded overflow-hidden bg-zinc-800 group">
              <Image src={url} alt="" fill className="object-cover" />
              <button type="button" onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                Удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded border-2 border-dashed border-zinc-700 hover:border-zinc-500 flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 transition text-xs gap-1">
            {uploading ? '...' : <><span className="text-2xl">+</span><span>Фото</span></>}
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => {
            if (e.target.files) {
              Array.from(e.target.files).forEach(file => uploadImage(file))
            }
            e.target.value = ''
          }} />
        <p className="text-zinc-600 text-xs">JPG, PNG, WEBP — до 5MB</p>
      </div>

      {/* Флаги */}
      <div className="flex gap-6">
        {([
          ['inStock', 'В наличии'],
          ['isNew', 'Новинка'],
          ['isBestseller', 'Хит продаж'],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key] as boolean}
              onChange={e => set(key, e.target.checked)}
              className="w-4 h-4 accent-white" />
            <span className="text-sm text-zinc-300">{label}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Кнопки */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-zinc-200 transition disabled:opacity-50 rounded">
          {saving ? 'Сохранение...' : productId ? 'Сохранить изменения' : 'Создать товар'}
        </button>
        <button type="button" onClick={() => router.push('/admin')}
          className="px-6 py-3 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition rounded">
          Отмена
        </button>
      </div>
    </form>
  )
}
