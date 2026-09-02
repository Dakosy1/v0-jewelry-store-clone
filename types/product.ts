export type Metal = 'gold' | 'silver' | 'platinum' | 'rose-gold'
export type Purity = '585' | '750' | '925' | '950' | '999'
export type Stone = 'carnelian' | 'malachite' | 'jade' | 'cats-eye' | 'citrine' | 'amethyst' | 'larimar' | 'pearl' | 'quartz' | 'enamel' | 'none'
export type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'pendants' | 'chains' | 'sets' | 'shekelik' | 'shakhmaran' | 'besbilezik' | 'belbeu-kapsyrma' | 'broshki' | 'tumar' | 'kudalyk-set' | 'mens-signet' | 'mens-bracelet' | 'mens-chain' | 'gift-sets'
export type ProductColor = 'gold' | 'silver' | 'rose-gold' | 'black' | 'white-pearl' | 'champagne'

export interface Product {
  id: string
  slug: string
  barcode: string
  name: string
  nameRu: string
  category: Category
  price: number          // в тенге ₸
  oldPrice?: number      // для скидки
  metal: Metal
  colors?: ProductColor[]
  selectedColor?: ProductColor
  purity: Purity
  stone?: Stone
  weight?: number        // в граммах
  images: string[]       // пути к изображениям
  description: string
  nameKk?: string
  nameEn?: string
  descriptionKk?: string
  descriptionEn?: string
  tags?: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
  isSold?: boolean
  status?: 'active' | 'archived'
}

export interface CartItem {
  product: Product
  quantity: number
}
