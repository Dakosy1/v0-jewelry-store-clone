import type { Category } from '@/types/product'

export interface CategoryItem {
    id: Category
    slug: string
    nameRu: string
    nameEn: string
    icon?: string
}

export const categories: CategoryItem[] = [
    { id: 'rings', slug: 'rings', nameRu: 'КОЛЬЦА', nameEn: 'RINGS' },
    { id: 'necklaces', slug: 'necklaces', nameRu: 'КОЛЬЕ', nameEn: 'NECKLACES' },
    { id: 'bracelets', slug: 'bracelets', nameRu: 'БРАСЛЕТЫ', nameEn: 'BRACELETS' },
    { id: 'earrings', slug: 'earrings', nameRu: 'СЕРЬГИ', nameEn: 'EARRINGS' },
    { id: 'pendants', slug: 'pendants', nameRu: 'ПОДВЕСКИ', nameEn: 'PENDANTS' },
    { id: 'chains', slug: 'chains', nameRu: 'ЦЕПОЧКИ', nameEn: 'CHAINS' },
    { id: 'sets', slug: 'sets', nameRu: 'КОМПЛЕКТЫ', nameEn: 'SETS' },
]
