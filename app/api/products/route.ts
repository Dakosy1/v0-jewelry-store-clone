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

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const category = searchParams.get('category')
    const sale = searchParams.get('sale')
    const men = searchParams.get('men')

    // Archived products stay visible on the site (shown as out-of-stock via
    // the isSold/inStock badge) instead of disappearing — only exclude
    // nothing here, "archived" is a display state, not a delete.
    const where: any = {}
    if (collection) {
      const col = await prisma.collection.findUnique({ where: { slug: collection } })
      if (col) where.collectionId = col.id
    }
    if (category) where.categoryId = category
    if (sale === '1') where.oldPrice = { not: null }
    if (men === '1') where.isMen = true

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
