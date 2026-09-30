import sharp from 'sharp'
import { mkdir, unlink } from 'fs/promises'
import path from 'path'
import { THUMB_DIR, THUMB_WIDTHS } from './image-variants'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

sharp.concurrency(1)

// Создаёт копии для файла из public/uploads (имя без пути)
export async function generateVariants(filename: string) {
  for (const w of THUMB_WIDTHS) {
    const dir = path.join(uploadDir, THUMB_DIR, String(w))
    await mkdir(dir, { recursive: true })
    await sharp(path.join(uploadDir, filename))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${filename}.webp`))
  }
}

export async function removeVariants(filename: string) {
  for (const w of THUMB_WIDTHS) {
    await unlink(path.join(uploadDir, THUMB_DIR, String(w), `${filename}.webp`)).catch(() => {})
  }
}
