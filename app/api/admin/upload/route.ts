import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  if (file.size > 100 * 1024 * 1024) {
    return NextResponse.json({ error: 'Файл больше 100MB' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const originalExt = file.name.split('.').pop()?.toLowerCase() ?? ''
  const isHeic = originalExt === 'heic' || originalExt === 'heif'
  const base = `${Date.now()}-${Math.random().toString(36).slice(2)}`

  let outputBuffer: Buffer
  let filename: string

  if (isHeic) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const convert = require('heic-convert')
    const jpegBuffer = await convert({ buffer, format: 'JPEG', quality: 0.9 })
    outputBuffer = Buffer.from(jpegBuffer)
    filename = `${base}.jpg`
  } else {
    outputBuffer = buffer
    filename = `${base}.${originalExt}`
  }

  await writeFile(path.join(uploadDir, filename), outputBuffer)

  return NextResponse.json({ url: `/uploads/${filename}` })
}
