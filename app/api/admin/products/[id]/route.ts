import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import path from 'path'
import { normalizeProductColors } from '@/lib/product-colors'

function isValidBarcode(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}$/.test(value)
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, collection: true },
  })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ...product, colors: normalizeProductColors(product.tags ? JSON.parse(product.tags) : [], product.metal), images: JSON.parse(product.images) })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const colors = normalizeProductColors(body.colors, body.metal)

  if (!isValidBarcode(body.barcode) || colors.length === 0) {
    return NextResponse.json({ error: 'Проверьте штрихкод и выберите хотя бы один цвет' }, { status: 400 })
  }

  // Удаляем фото которые убрали при редактировании
  const existing = await prisma.product.findUnique({ where: { id } })
  if (existing) {
    const oldImages: string[] = JSON.parse(existing.images)
    const newImages: string[] = body.images ?? []
    const removed = oldImages.filter(img => img.startsWith('/uploads/') && !newImages.includes(img))
    for (const imgPath of removed) {
      await unlink(path.join(process.cwd(), 'public', imgPath)).catch(() => {})
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      barcode: body.barcode,
      nameRu: body.nameRu,
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      metal: body.metal,
      purity: body.purity || null,
      stone: body.stone || null,
      weight: body.weight ? Number(body.weight) : null,
      images: JSON.stringify(body.images ?? []),
      description: body.description ?? '',
      tags: JSON.stringify(colors),
      inStock: body.inStock ?? true,
      isNew: body.isNew ?? false,
      isBestseller: body.isBestseller ?? false,
      categoryId: body.categoryId || null,
      collectionId: body.collectionId || null,
    },
    include: { category: true, collection: true },
  })

  return NextResponse.json({ ...product, colors: normalizeProductColors(product.tags ? JSON.parse(product.tags) : [], product.metal), images: JSON.parse(product.images) })
}

// Архивировать товар
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { status } = await request.json()

  const product = await prisma.product.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(product)
}

// Удалить товар и его изображения
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Удаляем файлы изображений если они в /public/uploads/
  const images: string[] = JSON.parse(product.images)
  for (const imgPath of images) {
    if (imgPath.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', imgPath)
      await unlink(filePath).catch(() => {}) // игнорируем если файл уже удалён
    }
  }

  await prisma.product.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}
