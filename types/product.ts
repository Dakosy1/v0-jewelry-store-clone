export type Metal = 'gold' | 'silver' | 'platinum' | 'rose-gold'
export type Purity = '585' | '750' | '925' | '950' | '999'
export type Stone = 'diamond' | 'ruby' | 'sapphire' | 'emerald' | 'pearl' | 'cubic-zirconia' | 'none'
export type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'pendants' | 'chains' | 'sets'

export interface Product {
  id: string
  slug: string
  name: string
  nameRu: string
  category: Category
  price: number          // в тенге ₸
  oldPrice?: number      // для скидки
  metal: Metal
  purity: Purity
  stone?: Stone
  weight?: number        // в граммах
  images: string[]       // пути к изображениям
  description: string
  tags?: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
