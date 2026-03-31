import type { Category } from '@/types/product'

export interface CategoryItem {
    id: Category
    slug: string
    nameRu: string
    nameEn: string
    nameKk: string
    icon?: string
}

export const categories: CategoryItem[] = [
    { id: 'rings', slug: 'rings', nameRu: 'КОЛЬЦА', nameEn: 'RINGS', nameKk: 'САҚИНАЛАР' },
    { id: 'necklaces', slug: 'necklaces', nameRu: 'КОЛЬЕ', nameEn: 'NECKLACES', nameKk: 'АЛҚАЛАР' },
    { id: 'bracelets', slug: 'bracelets', nameRu: 'БРАСЛЕТЫ', nameEn: 'BRACELETS', nameKk: 'БІЛЕЗІКТЕР' },
    { id: 'earrings', slug: 'earrings', nameRu: 'СЕРЬГИ', nameEn: 'EARRINGS', nameKk: 'СЫРҒАЛАР' },
    { id: 'pendants', slug: 'pendants', nameRu: 'ПОДВЕСКИ', nameEn: 'PENDANTS', nameKk: 'АЛҚАЛАР' },
    { id: 'chains', slug: 'chains', nameRu: 'ЦЕПОЧКИ', nameEn: 'CHAINS', nameKk: 'ТІЗБЕКТЕР' },
    { id: 'sets', slug: 'sets', nameRu: 'КОМПЛЕКТЫ', nameEn: 'SETS', nameKk: 'ЖИНАҚТАР' },
]
