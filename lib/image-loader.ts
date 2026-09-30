import { thumbUrl } from './image-variants'

// Загрузчик для next/image: фото из /uploads/ берём из готовых уменьшенных копий,
// остальные картинки (public/images) отдаём как есть
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return thumbUrl(src, width)
}
