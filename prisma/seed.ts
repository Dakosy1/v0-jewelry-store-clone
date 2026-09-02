import { PrismaClient } from '@prisma/client'
import path from 'path'

const dbUrl = `file:${path.resolve(process.cwd(), 'prisma/dev.db')}`
const prisma = new PrismaClient({ datasourceUrl: dbUrl })

async function main() {
  // Collections
  const collections = [
    { slug: 'medical-steel', nameRu: 'Медицинская сталь с напылением серебра', nameEn: 'Medical Steel with Silver Plating', nameKk: 'Күміс жалатылған медициналық болат' },
    { slug: 'silver',        nameRu: 'Серебро 925 проба',                       nameEn: '925 Silver',                         nameKk: '925 сынамалы күміс' },
    { slug: 'toy-bastar',    nameRu: 'Идеи той бастар',                         nameEn: 'Toy Bastar Ideas',                    nameKk: 'Той бастар идеялары' },
    { slug: 'kyz-uzatu',     nameRu: 'Наборы для кыз узату',                    nameEn: 'Kyz Uzatu Sets',                      nameKk: 'Қыз ұзату жиынтықтары' },
  ]
  for (const col of collections) {
    await prisma.collection.upsert({ where: { slug: col.slug }, update: col, create: col })
  }

  // Categories
  const categories = [
    { id: 'rings',     slug: 'rings',     nameRu: 'Кольца',    nameEn: 'Rings',     nameKk: 'Сақиналар'   },
    { id: 'necklaces', slug: 'necklaces', nameRu: 'Колье',     nameEn: 'Necklaces', nameKk: 'Алқалар'     },
    { id: 'bracelets', slug: 'bracelets', nameRu: 'Браслеты',  nameEn: 'Bracelets', nameKk: 'Білезіктер'  },
    { id: 'earrings',  slug: 'earrings',  nameRu: 'Серьги',    nameEn: 'Earrings',  nameKk: 'Сырғалар'    },
    { id: 'pendants',  slug: 'pendants',  nameRu: 'Подвески',  nameEn: 'Pendants',  nameKk: 'Медальондар' },
    { id: 'chains',    slug: 'chains',    nameRu: 'Цепочки',   nameEn: 'Chains',    nameKk: 'Тізбектер'   },
    { id: 'sets',      slug: 'sets',      nameRu: 'Комплекты', nameEn: 'Sets',      nameKk: 'Жиынтықтар'  },
    { id: 'besbilezik',      slug: 'besbilezik',      nameRu: 'Бесбілезік',    nameEn: 'Besbilezik',    nameKk: 'Бесбілезік'      },
    { id: 'belbeu-kapsyrma', slug: 'belbeu-kapsyrma', nameRu: 'Пояс белбеу',   nameEn: 'Belbeu buckle', nameKk: 'Белбеу қапсырма' },
    { id: 'broshki',         slug: 'broshki',         nameRu: 'Брошки',        nameEn: 'Brooches',      nameKk: 'Брошкалар'       },
    { id: 'tumar',           slug: 'tumar',           nameRu: 'Тұмар',         nameEn: 'Tumar',         nameKk: 'Тұмар'           },
    { id: 'kudalyk-set',     slug: 'kudalyk-set',     nameRu: 'Сет',           nameEn: 'Set',           nameKk: 'Сет'             },
    { id: 'mens-signet',   slug: 'mens-signet',   nameRu: 'Мужская печатка', nameEn: "Men's Signet Ring", nameKk: 'Ерлер мөр сақинасы' },
    { id: 'mens-bracelet', slug: 'mens-bracelet', nameRu: 'Мужской браслет', nameEn: "Men's Bracelet",   nameKk: 'Ерлер білезігі'    },
    { id: 'mens-chain',    slug: 'mens-chain',    nameRu: 'Мужская цепь',    nameEn: "Men's Chain",      nameKk: 'Ерлер тізбегі'     },
    { id: 'gift-sets',     slug: 'gift-sets',     nameRu: 'Подарочные наборы', nameEn: 'Gift Sets',       nameKk: 'Сыйлық сеттер'     },
  ]
  for (const cat of categories) {
    await prisma.category.upsert({ where: { id: cat.id }, update: cat, create: cat })
  }

  // Map collection slugs to IDs
  const colMap = Object.fromEntries(
    (await prisma.collection.findMany()).map(c => [c.slug, c.id])
  )

  // Products with real images and collection assignments
  // silver      → серебряные изделия
  // kyz-uzatu   → свадебные/жемчужные изделия
  // toy-bastar  → праздничные/яркие изделия
  // medical-steel → пока пусто (нет товаров из меди/стали)
  const products = [
    { id: 'r001', slug: 'gold-solitaire-ring-diamond',   barcode: '1001', nameRu: 'Кольцо с бриллиантом солитер',          categoryId: 'rings',     price: 285000, metal: 'gold',      tags: JSON.stringify(['gold', 'silver']), purity: '585', stone: 'diamond', weight: 3.2,  images: JSON.stringify(['/images/products/ring-diamond-solitaire.jpg']), description: 'Классическое кольцо-солитер из жёлтого золота 585 пробы с бриллиантом 0.3 карата.', inStock: true,  isNew: true,  isBestseller: true,  collectionId: colMap['kyz-uzatu']   },
    { id: 'r002', slug: 'gold-ring-stacking-ruby',       barcode: '1002', nameRu: 'Кольцо дорожка с рубином',              categoryId: 'rings',     price: 185000, metal: 'gold',      tags: JSON.stringify(['gold', 'rose-gold']), purity: '585', stone: 'ruby',    weight: 2.8,  images: JSON.stringify(['/images/products/ring-stacking-ruby.jpg']),     description: 'Тонкое кольцо-дорожка из жёлтого золота 585 пробы с натуральными рубинами.',        inStock: true,  isNew: false, isBestseller: true,  collectionId: colMap['toy-bastar']  },
    { id: 'r003', slug: 'rose-gold-ring-pearl',          barcode: '1003', nameRu: 'Кольцо с жемчугом из розового золота',  categoryId: 'rings',     price: 145000, metal: 'rose-gold', tags: JSON.stringify(['rose-gold', 'white-pearl']), purity: '585', stone: 'pearl',   weight: 3.5,  images: JSON.stringify(['/images/products/ring-pearl-rose-gold.jpg']),   description: 'Элегантное кольцо из розового золота 585 пробы с речным жемчугом.',                 inStock: true,  isNew: false, isBestseller: false, collectionId: colMap['kyz-uzatu']   },
    { id: 'r004', slug: 'gold-signet-ring',              barcode: '1004', nameRu: 'Перстень-печатка из золота',            categoryId: 'rings',     price: 320000, metal: 'gold',      tags: JSON.stringify(['gold', 'black']), purity: '750', stone: null,      weight: 8.4,  images: JSON.stringify(['/images/products/ring-signet-gold.jpg']),       description: 'Массивный перстень-печатка из жёлтого золота 750 пробы.',                            inStock: true,  isNew: false, isBestseller: false, collectionId: null                  },
    { id: 'e001', slug: 'gold-hoop-earrings-classic',   barcode: '2001', nameRu: 'Серьги-конго классические',             categoryId: 'earrings',  price: 98000,  metal: 'gold',      tags: JSON.stringify(['gold', 'silver']), purity: '585', stone: null,      weight: 4.1,  images: JSON.stringify(['/images/product-1.jpg']),                        description: 'Классические серьги-конго из жёлтого золота 585 пробы. Диаметр 25 мм.',             inStock: true,  isNew: false, isBestseller: true,  collectionId: colMap['toy-bastar']  },
    { id: 'e002', slug: 'diamond-stud-earrings',        barcode: '2002', nameRu: 'Серьги-пусеты с бриллиантами',          categoryId: 'earrings',  price: 245000, metal: 'gold',      tags: JSON.stringify(['gold', 'champagne']), purity: '750', stone: 'diamond', weight: 2.2,  images: JSON.stringify(['/images/product-2.jpg']),                        description: 'Серьги-пусеты из белого золота 750 пробы с бриллиантами. Суммарный вес 0.4 карата.', inStock: true,  isNew: true,  isBestseller: false, collectionId: colMap['kyz-uzatu']   },
    { id: 'e003', slug: 'pearl-drop-earrings',          barcode: '2003', nameRu: 'Серьги-капли с жемчугом',               categoryId: 'earrings',  price: 115000, metal: 'rose-gold', tags: JSON.stringify(['rose-gold', 'white-pearl']), purity: '585', stone: 'pearl',   weight: 3.8,  images: JSON.stringify(['/images/product-3.jpg']),                        description: 'Серьги-капли из розового золота 585 пробы с натуральным морским жемчугом.',          inStock: true,  isNew: false, isBestseller: true,  collectionId: colMap['kyz-uzatu']   },
    { id: 'b001', slug: 'diamond-tennis-bracelet',      barcode: '3001', nameRu: 'Теннисный браслет с бриллиантами',      categoryId: 'bracelets', price: 875000, metal: 'gold',      tags: JSON.stringify(['gold', 'silver']), purity: '750', stone: 'diamond', weight: 9.2,  images: JSON.stringify(['/images/product-4.jpg']),                        description: 'Теннисный браслет из белого золота 750 пробы с 28 бриллиантами.',                   inStock: true,  isNew: false, isBestseller: true,  collectionId: null                  },
    { id: 'b002', slug: 'gold-chain-bracelet',          barcode: '3002', nameRu: 'Браслет-цепь из жёлтого золота',        categoryId: 'bracelets', price: 185000, metal: 'gold',      tags: JSON.stringify(['gold', 'black']), purity: '585', stone: null,      weight: 6.5,  images: JSON.stringify(['/images/product-5.jpg']),                        description: 'Браслет плетения «якорь» из жёлтого золота 585 пробы. Длина 19 см.',                inStock: true,  isNew: false, isBestseller: false, collectionId: colMap['toy-bastar']  },
    { id: 'b003', slug: 'silver-cuff-bracelet',         barcode: '3003', nameRu: 'Жёсткий браслет из серебра',            categoryId: 'bracelets', price: 45000,  metal: 'silver',    tags: JSON.stringify(['silver', 'champagne']), purity: '925', stone: null,      weight: 12.0, images: JSON.stringify(['/images/product-6.jpg']),                        description: 'Жёсткий браслет open-cuff из серебра 925 пробы. Матовый финиш.',                    inStock: true,  isNew: true,  isBestseller: false, collectionId: colMap['silver']      },
    { id: 'n001', slug: 'gold-pendant-necklace-circle', barcode: '4001', nameRu: 'Колье с круглой подвеской',             categoryId: 'necklaces', price: 135000, metal: 'gold',      tags: JSON.stringify(['gold', 'rose-gold']), purity: '585', stone: null,      weight: 4.3,  images: JSON.stringify(['/images/product-7.jpg']),                        description: 'Тонкое колье из жёлтого золота 585 пробы с подвеской-кругом. Длина цепочки 45 см.', inStock: true,  isNew: false, isBestseller: true,  collectionId: colMap['toy-bastar']  },
    { id: 'n002', slug: 'diamond-bar-necklace',         barcode: '4002', nameRu: 'Колье-бар с бриллиантами',              categoryId: 'necklaces', price: 295000, metal: 'gold',      tags: JSON.stringify(['gold', 'silver', 'champagne']), purity: '750', stone: 'diamond', weight: 3.8,  images: JSON.stringify(['/images/product-8.jpg']),                        description: 'Минималистичное колье-бар из белого золота 750 пробы с бриллиантами.',               inStock: true,  isNew: false, isBestseller: false, collectionId: null                  },
    { id: 'p001', slug: 'gold-heart-pendant',           barcode: '5001', nameRu: 'Подвеска «Сердце» из золота',           categoryId: 'pendants',  price: 78000,  metal: 'gold',      tags: JSON.stringify(['gold', 'rose-gold']), purity: '585', stone: 'ruby',    weight: 2.1,  images: JSON.stringify(['/images/product-9.jpg']),                        description: 'Подвеска в форме сердца из жёлтого золота 585 пробы с рубиновой вставкой.',         inStock: true,  isNew: true,  isBestseller: false, collectionId: colMap['toy-bastar']  },
    { id: 'c001', slug: 'gold-chain-curb-50cm',         barcode: '6001', nameRu: 'Золотая цепочка «панцирь» 50 см',       categoryId: 'chains',    price: 225000, metal: 'gold',      tags: JSON.stringify(['gold', 'black']), purity: '585', stone: null,      weight: 8.6,  images: JSON.stringify(['/images/product-10.jpg']),                       description: 'Цепочка плетения «панцирь» из жёлтого золота 585 пробы. Длина 50 см.',              inStock: true,  isNew: false, isBestseller: true,  collectionId: null                  },
    { id: 'c002', slug: 'silver-venetian-chain-45cm',   barcode: '6002', nameRu: 'Серебряная цепочка «венецианка» 45 см', categoryId: 'chains',    price: 35000,  metal: 'silver',    tags: JSON.stringify(['silver', 'white-pearl']), purity: '925', stone: null,      weight: 3.2,  images: JSON.stringify(['/images/product-11.jpg']),                       description: 'Изящная цепочка плетения «венецианка» из серебра 925 пробы. Длина 45 см.',          inStock: true,  isNew: false, isBestseller: false, collectionId: colMap['silver']      },
    { id: 's001', slug: 'gold-set-ring-earrings-pearl', barcode: '7001', nameRu: 'Комплект с жемчугом (кольцо + серьги)', categoryId: 'sets',      price: 220000, metal: 'rose-gold', tags: JSON.stringify(['rose-gold', 'white-pearl', 'champagne']), purity: '585', stone: 'pearl',   weight: null, images: JSON.stringify(['/images/product-12.jpg']),                       description: 'Комплект из жемчуга и розового золота 585 пробы: кольцо и серьги-пусеты.',          inStock: true,  isNew: false, isBestseller: true,  collectionId: colMap['kyz-uzatu']   },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    })
  }

  console.log('✅ Seed complete: 4 collections, 7 categories, 16 products')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
