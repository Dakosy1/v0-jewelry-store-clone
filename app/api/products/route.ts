import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
function serializeProduct(p: any) {
  return {
    ...p,
    category: p.categoryId ?? null,
    colors: [],
    images: JSON.parse(p.images),
    tags: p.tags ? JSON.parse(p.tags) : undefined,
  }
}

function isValidBarcode(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}$/.test(value)
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const category = searchParams.get('category')
    const sale = searchParams.get('sale')

    const where: any = { status: 'active' }
    if (collection) {
      const col = await prisma.collection.findUnique({ where: { slug: collection } })
      if (col) where.collectionId = col.id
    }
    if (category) where.categoryId = category
    if (sale === '1') where.oldPrice = { not: null }

    const products = await prisma.product.findMany({
      where,
      include: { category: true, collection: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products.map(serializeProduct), {
      headers: { 'Cache-Control': 'no-store, must-revalidate' },
    })
  } catch (error) {
    console.error('[/api/products] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.nameRu || !body.price || !body.categoryId || !body.metal || !body.purity || !isValidBarcode(body.barcode)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        id: body.id ?? `idx_${Date.now()}`,
        slug: body.slug ?? body.nameRu.toLowerCase().replace(/\s+/g, '-'),
        barcode: body.barcode,
        nameRu: body.nameRu,
        price: body.price,
        oldPrice: body.oldPrice ?? null,
        metal: body.metal,
        purity: body.purity,
        stone: body.stone ?? null,
        weight: body.weight ?? null,
        images: JSON.stringify(body.images ?? []),
        description: body.description ?? '',
        tags: body.tags ? JSON.stringify(body.tags) : null,
        inStock: body.inStock ?? true,
        isNew: body.isNew ?? false,
        isBestseller: body.isBestseller ?? false,
        categoryId: body.categoryId,
        collectionId: body.collectionId ?? null,
      },
    })

    return NextResponse.json(serializeProduct(product), { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
