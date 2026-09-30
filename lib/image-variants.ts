// Уменьшенные копии загруженных фото: /uploads/_thumbs/<ширина>/<имя файла>.webp
// Создаются при загрузке (lib/image-variants-server.ts). Если копии нет,
// nginx отдаёт оригинал, так что ссылка никогда не битая.

export const THUMB_WIDTHS = [400, 800, 1600] as const
export const THUMB_DIR = '_thumbs'

export function thumbUrl(src: string, width: number) {
  if (!src.startsWith('/uploads/') || src.startsWith(`/uploads/${THUMB_DIR}/`)) return src
  // Телефоны с плотным экраном просят ~1080px для карточки — 800px им хватает с запасом
  const w = width <= 480 ? 400 : width <= 1200 ? 800 : 1600
  return `/uploads/${THUMB_DIR}/${w}/${src.slice('/uploads/'.length)}.webp`
}
