import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { normalizeProductColors } from '@/lib/product-colors'

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: 'archived' },
    include: { category: true, collection: true },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json(products.map(p => ({
    ...p,
    colors: normalizeProductColors(p.tags ? JSON.parse(p.tags) : [], p.metal),
    images: JSON.parse(p.images),
    tags: p.tags ? JSON.parse(p.tags) : [],
  })))
}
