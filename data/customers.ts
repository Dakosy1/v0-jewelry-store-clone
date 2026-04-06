export interface CustomerPhoto {
  id: string
  image: string
  name: string
  caption?: string
}

export const customerPhotos: CustomerPhoto[] = [
  { id: 'c1', image: '/placeholder.jpg', name: 'Айгерим', caption: 'Серьги из коллекции Tomiris' },
  { id: 'c2', image: '/placeholder.jpg', name: 'Дана', caption: 'Кольцо из серебра 925' },
  { id: 'c3', image: '/placeholder.jpg', name: 'Салтанат', caption: 'Подарок на той бастар' },
  { id: 'c4', image: '/placeholder.jpg', name: 'Меруерт', caption: 'Колье из розового золота' },
  { id: 'c5', image: '/placeholder.jpg', name: 'Жансая', caption: 'Браслет из медицинской стали' },
  { id: 'c6', image: '/placeholder.jpg', name: 'Назгуль', caption: 'Кыз узату — украшения для невесты' },
]
