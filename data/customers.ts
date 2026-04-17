export interface CustomerPhoto {
  id: string
  image: string
  name: string
  caption?: string
}

export const customerPhotos: CustomerPhoto[] = [
  { id: 'c1', image: '/images/photosession/GK2A9147.JPG', name: 'Айгерим', caption: 'Серьги из коллекции Tomiris' },
  { id: 'c2', image: '/images/photosession/GK2A9158.JPG', name: 'Дана', caption: 'Кольцо из серебра 925' },
  { id: 'c3', image: '/images/photosession/GK2A9171.JPG', name: 'Салтанат', caption: 'Подарок на той бастар' },
  { id: 'c4', image: '/images/photosession/GK2A9181.JPG', name: 'Меруерт', caption: 'Колье из розового золота' },
  { id: 'c5', image: '/images/photosession/GK2A9468.JPG', name: 'Жансая', caption: 'Браслет из медицинской стали' },
  { id: 'c6', image: '/images/photosession/GK2A9476.JPG', name: 'Назгуль', caption: 'Кыз узату — украшения для невесты' },
  { id: 'c7', image: '/images/photosession/GK2A9611.JPG', name: 'Аружан', caption: 'Украшения ручной работы' },
  { id: 'c8', image: '/images/photosession/GK2A9729.JPG', name: 'Камила', caption: 'Серебро 925 пробы' },
]
