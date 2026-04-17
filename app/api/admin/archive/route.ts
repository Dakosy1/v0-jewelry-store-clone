import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: 'archived' },
    include: { category: true, collection: true },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json(products.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    tags: p.tags ? JSON.parse(p.tags) : [],
  })))
}
