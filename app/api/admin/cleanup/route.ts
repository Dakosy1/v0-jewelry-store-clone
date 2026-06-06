import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { unlink, readdir } from 'fs/promises'
import path from 'path'

export async function POST() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  // Собираем все файлы в /uploads/
  let files: string[] = []
  try {
    files = await readdir(uploadDir)
  } catch {
    return NextResponse.json({ deleted: 0, message: 'Папка uploads не найдена' })
  }

  // Собираем все пути к фото из БД (все товары, включая архивные)
  const products = await prisma.product.findMany({ select: { images: true } })
  const usedPaths = new Set<string>()
  for (const p of products) {
    const imgs: string[] = JSON.parse(p.images)
    imgs.forEach(img => usedPaths.add(img.replace('/uploads/', '')))
  }

  // Удаляем файлы которые не используются ни одним товаром
  let deleted = 0
  for (const file of files) {
    if (!usedPaths.has(file)) {
      await unlink(path.join(uploadDir, file)).catch(() => {})
      deleted++
    }
  }

  return NextResponse.json({ deleted, message: `Удалено ${deleted} осиротевших файлов` })
}
