import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: 'active' },
    include: { category: true, collection: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    tags: p.tags ? JSON.parse(p.tags) : [],
  })))
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const product = await prisma.product.create({
    data: {
      id: `p_${Date.now()}`,
      slug: body.slug || body.nameRu.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + `-${Date.now()}`,
      nameRu: body.nameRu,
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      metal: body.metal,
      purity: body.purity,
      stone: body.stone || null,
      weight: body.weight ? Number(body.weight) : null,
      images: JSON.stringify(body.images ?? []),
      description: body.description ?? '',
      inStock: body.inStock ?? true,
      isNew: body.isNew ?? false,
      isBestseller: body.isBestseller ?? false,
      status: 'active',
      categoryId: body.categoryId,
      collectionId: body.collectionId || null,
    },
    include: { category: true, collection: true },
  })

  return NextResponse.json({ ...product, images: JSON.parse(product.images) }, { status: 201 })
}
