export interface CustomerPhoto {
  id: string
  type: 'photo'
  image: string
  name: string
  caption?: string
}

export interface CustomerReel {
  id: string
  type: 'reel'
  reelId: string
  caption?: string
}

export type CustomerItem = CustomerPhoto | CustomerReel

export const customerItems: CustomerItem[] = [
  { id: 'r1', type: 'reel', reelId: 'DNVxZAiM35J' },
  { id: 'c1', type: 'photo', image: '/images/photosession/webp/GK2A9147.webp', name: 'Айгерим', caption: 'Серьги из коллекции Tomiris' },
  { id: 'r2', type: 'reel', reelId: 'DNibXgMsuUk' },
  { id: 'c2', type: 'photo', image: '/images/photosession/webp/GK2A9158.webp', name: 'Дана', caption: 'Кольцо из серебра 925' },
  { id: 'r3', type: 'reel', reelId: 'DJR4X1gM-Qe' },
  { id: 'c3', type: 'photo', image: '/images/photosession/webp/GK2A9171.webp', name: 'Салтанат', caption: 'Подарок на той бастар' },
  { id: 'r4', type: 'reel', reelId: 'DJPeELPsnth' },
  { id: 'c4', type: 'photo', image: '/images/photosession/webp/GK2A9181.webp', name: 'Меруерт', caption: 'Колье из розового золота' },
  { id: 'r5', type: 'reel', reelId: 'DIqHRiFz1Oi' },
  { id: 'c5', type: 'photo', image: '/images/photosession/webp/GK2A9468.webp', name: 'Жансая', caption: 'Браслет из медицинской стали' },
  { id: 'r6', type: 'reel', reelId: 'DVd2iDCjFdB' },
  { id: 'c6', type: 'photo', image: '/images/photosession/webp/GK2A9476.webp', name: 'Назгуль', caption: 'Кыз узату — украшения для невесты' },
  { id: 'c7', type: 'photo', image: '/images/photosession/webp/GK2A9611.webp', name: 'Аружан', caption: 'Украшения ручной работы' },
  { id: 'c8', type: 'photo', image: '/images/photosession/webp/GK2A9729.webp', name: 'Камила', caption: 'Серебро 925 пробы' },
]

// keep old export for backward compat
export const customerPhotos = customerItems.filter((i): i is CustomerPhoto => i.type === 'photo')
