import type { ProductColor, Metal } from '@/types/product'

export const PRODUCT_COLOR_OPTIONS: Array<{
  value: ProductColor
  label: string
  swatch: string
}> = [
  { value: 'gold', label: 'Золотой', swatch: '#D4AF37' },
  { value: 'silver', label: 'Серебристый', swatch: '#C0C0C0' },
  { value: 'rose-gold', label: 'Розовое золото', swatch: '#C9897B' },
  { value: 'black', label: 'Чёрный', swatch: '#2A2A2A' },
  { value: 'white-pearl', label: 'Белый жемчуг', swatch: '#F5F1EA' },
  { value: 'champagne', label: 'Шампань', swatch: '#D9C2A0' },
]

export const PRODUCT_COLOR_VALUES = PRODUCT_COLOR_OPTIONS.map((option) => option.value)

export const DEFAULT_COLORS_BY_METAL: Record<Metal, ProductColor[]> = {
  gold: ['gold'],
  silver: ['silver'],
  platinum: ['silver'],
  'rose-gold': ['rose-gold'],
}

export function getDefaultColorsForMetal(metal: Metal | string): ProductColor[] {
  return DEFAULT_COLORS_BY_METAL[metal as Metal] ?? ['gold']
}

export function getProductColorLabel(color: ProductColor) {
  return PRODUCT_COLOR_OPTIONS.find((option) => option.value === color)?.label ?? color
}

export function getProductColorSwatch(color: ProductColor) {
  return PRODUCT_COLOR_OPTIONS.find((option) => option.value === color)?.swatch ?? '#CCCCCC'
}

export function isValidProductColor(value: unknown): value is ProductColor {
  return typeof value === 'string' && PRODUCT_COLOR_VALUES.includes(value as ProductColor)
}

export function normalizeProductColors(value: unknown, fallbackMetal?: string): ProductColor[] {
  const parsed = Array.isArray(value) ? value.filter(isValidProductColor) : []
  if (parsed.length > 0) return Array.from(new Set(parsed))
  return getDefaultColorsForMetal(fallbackMetal ?? 'gold')
}
