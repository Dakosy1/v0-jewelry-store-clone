import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const stones = await prisma.stone.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(stones)
}

export async function POST(req: Request) {
  const { label } = await req.json()
  if (!label?.trim()) return NextResponse.json({ error: 'label required' }, { status: 400 })
  const value = label.trim().toLowerCase().replace(/\s+/g, '-')
  const stone = await prisma.stone.create({ data: { label: label.trim(), value } })
  return NextResponse.json(stone)
}
