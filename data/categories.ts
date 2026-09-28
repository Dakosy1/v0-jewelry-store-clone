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
    { id: 'rings',      slug: 'rings',      nameRu: 'КОЛЬЦА',    nameEn: 'RINGS',      nameKk: 'САҚИНАЛАР'  },
    { id: 'necklaces',  slug: 'necklaces',  nameRu: 'КОЛЬЕ',     nameEn: 'NECKLACES',  nameKk: 'АЛҚАЛАР'    },
    { id: 'bracelets',  slug: 'bracelets',  nameRu: 'БРАСЛЕТЫ',  nameEn: 'BRACELETS',  nameKk: 'БІЛЕЗІКТЕР' },
    { id: 'earrings',   slug: 'earrings',   nameRu: 'СЕРЬГИ',    nameEn: 'EARRINGS',   nameKk: 'СЫРҒАЛАР'   },
    { id: 'pendants',   slug: 'pendants',   nameRu: 'ПОДВЕСКИ',  nameEn: 'PENDANTS',   nameKk: 'АЛҚАЛАР'    },
    { id: 'chains',     slug: 'chains',     nameRu: 'ЦЕПОЧКИ',   nameEn: 'CHAINS',     nameKk: 'ТІЗБЕКТЕР'  },
    { id: 'sets',       slug: 'sets',       nameRu: 'КОМПЛЕКТЫ', nameEn: 'SETS',       nameKk: 'ЖИНАҚТАР'   },
    { id: 'shekelik',   slug: 'shekelik',   nameRu: 'ШЕКЕЛІК',   nameEn: 'SHEKELIK',   nameKk: 'ШЕКЕЛІК'    },
    { id: 'shakhmaran', slug: 'shakhmaran', nameRu: 'ШАХМАРАН',  nameEn: 'SHAKHMARAN', nameKk: 'ШАХМАРАН'   },
    { id: 'besbilezik',      slug: 'besbilezik',      nameRu: 'БЕСБІЛЕЗІК',    nameEn: 'BESBILEZIK',     nameKk: 'БЕСБІЛЕЗІК'      },
    { id: 'kapsyrma',        slug: 'kapsyrma',        nameRu: 'ҚАПСЫРМА',      nameEn: 'KAPSYRMA',       nameKk: 'ҚАПСЫРМА'        },
    { id: 'belbeu',          slug: 'belbeu',          nameRu: 'БЕЛБЕУ',        nameEn: 'BELBEU',         nameKk: 'БЕЛБЕУ'          },
    { id: 'shashbau',        slug: 'shashbau',        nameRu: 'ШАШБАУ',        nameEn: 'SHASHBAU',       nameKk: 'ШАШБАУ'          },
    { id: 'broshki',         slug: 'broshki',         nameRu: 'БРОШКИ',        nameEn: 'BROOCHES',       nameKk: 'БРОШКАЛАР'       },
    { id: 'tumar',           slug: 'tumar',           nameRu: 'ТҰМАР',         nameEn: 'TUMAR',          nameKk: 'ТҰМАР'           },
    { id: 'kudalyk-set',     slug: 'kudalyk-set',     nameRu: 'СЕТ',           nameEn: 'SET',            nameKk: 'СЕТ'             },
    { id: 'signet',        slug: 'signet',        nameRu: 'ПЕЧАТКА',         nameEn: 'SIGNET RING',      nameKk: 'МӨР САҚИНА'        },
    { id: 'gift-sets',     slug: 'gift-sets',     nameRu: 'ПОДАРОЧНЫЕ НАБОРЫ', nameEn: 'GIFT SETS',       nameKk: 'СЫЙЛЫҚ СЕТТЕР'     },
]
