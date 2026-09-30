// Создаёт уменьшенные копии для всех фото в public/uploads, у которых их ещё нет.
// Запуск: nice -n 19 node scripts/generate-thumbs.mjs
// Размеры и пути должны совпадать с lib/image-variants.ts
import sharp from 'sharp'
import { mkdir, readdir, access } from 'fs/promises'
import path from 'path'

const WIDTHS = [400, 800, 1600]
const uploadDir = path.join(process.cwd(), 'public', 'uploads')

sharp.concurrency(1)

const files = (await readdir(uploadDir, { withFileTypes: true })).filter(e => e.isFile()).map(e => e.name)
let made = 0, skipped = 0, failed = 0

for (const [i, file] of files.entries()) {
  for (const w of WIDTHS) {
    const dir = path.join(uploadDir, '_thumbs', String(w))
    const out = path.join(dir, `${file}.webp`)
    try {
      await access(out)
      skipped++
      continue
    } catch {}
    try {
      await mkdir(dir, { recursive: true })
      await sharp(path.join(uploadDir, file))
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out)
      made++
    } catch (err) {
      failed++
      console.error(`ошибка ${file} (${w}px): ${err.message}`)
    }
  }
  if ((i + 1) % 50 === 0) console.log(`${i + 1}/${files.length}`)
}

console.log(`готово: создано ${made}, уже было ${skipped}, ошибок ${failed}`)
