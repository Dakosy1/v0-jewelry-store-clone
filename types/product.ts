export type Metal = 'gold' | 'silver' | 'platinum' | 'rose-gold'
export type Purity = '585' | '750' | '925' | '950' | '999'
export type Stone = 'carnelian' | 'malachite' | 'jade' | 'cats-eye' | 'citrine' | 'amethyst' | 'larimar' | 'pearl' | 'quartz' | 'enamel' | 'none'
export type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'pendants' | 'chains' | 'sets' | 'shekelik' | 'shakhmaran'
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
  tags?: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
