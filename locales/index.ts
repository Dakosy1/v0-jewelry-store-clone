'use client'

import { useLanguage } from '@/context/LanguageContext'

export type Locale = 'ru' | 'en' | 'kk'

const translations = {
  ru: {
    // Navbar
    nav: {
      catalog: 'КАТАЛОГ',
      bestsellers: 'ХИТЫ',
      bestsellersMobile: 'ХИТЫ ПРОДАЖ',
      about: 'О НАС',
      contacts: 'КОНТАКТЫ',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      search: 'Поиск',
      profile: 'Профиль',
      cart: 'Корзина',
      collections: [
        { label: 'Медицинская сталь с серебром', slug: 'medical-steel' },
        { label: 'Серебро', slug: 'silver' },
        { label: 'Той бастар', slug: 'toy-bastar' },
        { label: 'Қыз ұзату', slug: 'kyz-uzatu' },
      ],
    },
    // Hero
    hero: {
      label: 'НОВАЯ КОЛЛЕКЦИЯ 2026',
      heading: 'TOMIRIS COLLECTION',
      tagline: 'Искусство минимализма и вечная классика в каждом изделии',
      cta: 'ПЕРЕЙТИ В КАТАЛОГ',
      imageAlt: 'Элегантное золотое колье на модели',
    },
    // Brand story
    brand: {
      label: 'НАША ФИЛОСОФИЯ',
      heading: 'Красота заслуживает того, чтобы быть замеченной',
      p1: 'В Tomiris Collection мы верим, что каждое украшение рассказывает свою историю. Наши мастера создают каждое изделие вручную, сочетая традиционные техники с современным минималистичным дизайном.',
      p2: 'Наша философия проста: продукт и ценность, которую он приносит нашим клиентам, стоят на первом месте. Мы гордимся созданием украшений, которые помогают выразить вашу уникальную элегантность.',
      cta: 'ПОДРОБНЕЕ',
      imageAlt: 'Крупный план изысканных ювелирных украшений',
    },
    // Newsletter
    newsletter: {
      label: 'ОСТАВАЙТЕСЬ НА СВЯЗИ',
      heading: 'Будьте первыми в курсе событий',
      description: 'Подпишитесь, чтобы получать новости о новых коллекциях, эксклюзивных предложениях и последних новинках от Tomiris Collection.',
      placeholder: 'Ваш e-mail',
      subscribeLabel: 'Подписаться',
      success: 'Спасибо за подписку!',
    },
    // Footer
    footer: {
      description: 'Эстетика минимализма и высокого искусства в каждом ювелирном украшении. Ручная работа и безупречное качество.',
      shop: {
        title: 'МАГАЗИН',
        items: ['Кольца', 'Колье', 'Браслеты', 'Серьги', 'Новинки'],
      },
      company: {
        title: 'КОМПАНИЯ',
        items: ['О нас', 'Наша история', 'Карьера', 'Пресса', 'Контакты'],
      },
      support: {
        title: 'ПОДДЕРЖКА',
        items: ['Доставка и возврат', 'Гид по размерам', 'Уход за украшениями', 'FAQ', 'Конфиденциальность'],
      },
      copyright: '© 2026 TOMIRIS COLLECTION. ВСЕ ПРАВА ЗАЩИЩЕНЫ.',
    },
    // Cart
    cart: {
      title: 'КОРЗИНА',
      empty: 'Ваша корзина пуста',
      continueShopping: 'ПРОДОЛЖИТЬ ПОКУПКИ',
      total: 'ИТОГО',
      checkout: 'ОФОРМИТЬ ЧЕРЕЗ WHATSAPP',
      decrease: 'Уменьшить',
      increase: 'Увеличить',
      remove: 'Удалить',
    },
    // Catalog
    catalog: {
      label: 'УКРАШЕНИЯ',
      heading: 'Каталог',
      all: 'ВСЕ',
      empty: 'В этой категории товаров пока нет',
      scrollLeft: 'Прокрутить влево',
      scrollRight: 'Прокрутить вправо',
    },
    // Product page
    product: {
      backToCatalog: 'НАЗАД В КАТАЛОГ',
      addToCart: 'ДОБАВИТЬ В КОРЗИНУ',
      outOfStock: 'НЕТ В НАЛИЧИИ',
      purity: 'проба',
      specs: {
        metal: 'Металл',
        purity: 'Проба',
        stone: 'Камень',
        weight: 'Вес',
        grams: 'г',
      },
    },
    // Product attributes
    metals: {
      gold: 'Жёлтое золото',
      'rose-gold': 'Розовое золото',
      silver: 'Серебро',
      platinum: 'Платина',
    },
    stones: {
      diamond: 'Бриллиант',
      ruby: 'Рубин',
      sapphire: 'Сапфир',
      emerald: 'Изумруд',
      pearl: 'Жемчуг',
      'cubic-zirconia': 'Фианит',
      none: '—',
    },
    // Category names
    categories: {
      rings: 'КОЛЬЦА',
      necklaces: 'КОЛЬЕ',
      bracelets: 'БРАСЛЕТЫ',
      earrings: 'СЕРЬГИ',
      pendants: 'ПОДВЕСКИ',
      chains: 'ЦЕПОЧКИ',
      sets: 'КОМПЛЕКТЫ',
    },
  },

  en: {
    nav: {
      catalog: 'CATALOG',
      bestsellers: 'BESTSELLERS',
      bestsellersMobile: 'BESTSELLERS',
      about: 'ABOUT',
      contacts: 'CONTACTS',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      search: 'Search',
      profile: 'Profile',
      cart: 'Cart',
      collections: [
        { label: 'Medical Steel with Silver', slug: 'medical-steel' },
        { label: 'Silver', slug: 'silver' },
        { label: 'Toy Bastar', slug: 'toy-bastar' },
        { label: 'Kyz Uzatu', slug: 'kyz-uzatu' },
      ],
    },
    hero: {
      label: 'NEW COLLECTION 2026',
      heading: 'TOMIRIS COLLECTION',
      tagline: 'The art of minimalism and timeless elegance in every piece',
      cta: 'SHOP NOW',
      imageAlt: 'Elegant gold necklace on model',
    },
    brand: {
      label: 'OUR PHILOSOPHY',
      heading: 'Beauty deserves to be noticed',
      p1: 'At Tomiris Collection, we believe every piece of jewelry tells its own story. Our craftsmen create each item by hand, blending traditional techniques with contemporary minimalist design.',
      p2: 'Our philosophy is simple: the product and the value it brings to our clients comes first. We take pride in crafting jewelry that helps express your unique elegance.',
      cta: 'LEARN MORE',
      imageAlt: 'Close-up of fine luxury jewelry',
    },
    newsletter: {
      label: 'STAY CONNECTED',
      heading: 'Be the first to know',
      description: 'Subscribe to receive updates on new collections, exclusive offers, and the latest arrivals from Tomiris Collection.',
      placeholder: 'Your e-mail',
      subscribeLabel: 'Subscribe',
      success: 'Thank you for subscribing!',
    },
    footer: {
      description: 'The aesthetics of minimalism and fine art in every jewelry piece. Handmade and impeccable quality.',
      shop: {
        title: 'SHOP',
        items: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'New Arrivals'],
      },
      company: {
        title: 'COMPANY',
        items: ['About Us', 'Our Story', 'Careers', 'Press', 'Contacts'],
      },
      support: {
        title: 'SUPPORT',
        items: ['Shipping & Returns', 'Size Guide', 'Jewelry Care', 'FAQ', 'Privacy'],
      },
      copyright: '© 2026 TOMIRIS COLLECTION. ALL RIGHTS RESERVED.',
    },
    cart: {
      title: 'CART',
      empty: 'Your cart is empty',
      continueShopping: 'CONTINUE SHOPPING',
      total: 'TOTAL',
      checkout: 'ORDER VIA WHATSAPP',
      decrease: 'Decrease',
      increase: 'Increase',
      remove: 'Remove',
    },
    catalog: {
      label: 'JEWELRY',
      heading: 'Catalog',
      all: 'ALL',
      empty: 'No products in this category yet',
      scrollLeft: 'Scroll left',
      scrollRight: 'Scroll right',
    },
    product: {
      backToCatalog: 'BACK TO CATALOG',
      addToCart: 'ADD TO CART',
      outOfStock: 'OUT OF STOCK',
      purity: 'hallmark',
      specs: {
        metal: 'Metal',
        purity: 'Purity',
        stone: 'Stone',
        weight: 'Weight',
        grams: 'g',
      },
    },
    metals: {
      gold: 'Yellow Gold',
      'rose-gold': 'Rose Gold',
      silver: 'Silver',
      platinum: 'Platinum',
    },
    stones: {
      diamond: 'Diamond',
      ruby: 'Ruby',
      sapphire: 'Sapphire',
      emerald: 'Emerald',
      pearl: 'Pearl',
      'cubic-zirconia': 'Cubic Zirconia',
      none: '—',
    },
    categories: {
      rings: 'RINGS',
      necklaces: 'NECKLACES',
      bracelets: 'BRACELETS',
      earrings: 'EARRINGS',
      pendants: 'PENDANTS',
      chains: 'CHAINS',
      sets: 'SETS',
    },
  },

  kk: {
    nav: {
      catalog: 'КАТАЛОГ',
      bestsellers: 'ХИТ ТАУАРЛАР',
      bestsellersMobile: 'ХИТ ТАУАРЛАР',
      about: 'БІЗ ТУРАЛЫ',
      contacts: 'БАЙЛАНЫС',
      openMenu: 'Мәзірді ашу',
      closeMenu: 'Мәзірді жабу',
      search: 'Іздеу',
      profile: 'Профиль',
      cart: 'Себет',
      collections: [
        { label: 'Күміс толтырмалы медициналық болат', slug: 'medical-steel' },
        { label: 'Күміс', slug: 'silver' },
        { label: 'Той бастар', slug: 'toy-bastar' },
        { label: 'Қыз ұзату', slug: 'kyz-uzatu' },
      ],
    },
    hero: {
      label: 'ЖАҢА КОЛЛЕКЦИЯ 2026',
      heading: 'TOMIRIS COLLECTION',
      tagline: 'Әрбір бұйымда минимализм өнері және мәңгілік классика',
      cta: 'КАТАЛОГҚА ӨТУ',
      imageAlt: 'Үлгідегі элегантты алтын алқа',
    },
    brand: {
      label: 'БІЗДІҢ ФИЛОСОФИЯ',
      heading: 'Сұлулық байқалуды еңбектенеді',
      p1: 'Tomiris Collection-да біз әрбір зергерлік бұйым өз тарихын баяндайды деп сенеміз. Біздің шеберлер дәстүрлі техниканы заманауи минималистік дизайнмен ұштастыра отырып, әрбір бұйымды қолмен жасайды.',
      p2: 'Біздің философиямыз қарапайым: өнім және ол клиенттерімізге әкелетін құндылық бірінші орында. Біз сіздің бірегей элегантттылығыңызды білдіруге көмектесетін зергерлік бұйымдар жасауымызбен мақтанамыз.',
      cta: 'ТОЛЫҒЫРАҚ',
      imageAlt: 'Сәнді зергерлік бұйымдардың жақын көрінісі',
    },
    newsletter: {
      label: 'БАЙЛАНЫСТА БОЛЫҢЫЗ',
      heading: 'Оқиғалардан бірінші болып хабардар болыңыз',
      description: 'Tomiris Collection-нан жаңа коллекциялар, эксклюзивті ұсыныстар және соңғы жаңалықтар туралы хабарламалар алу үшін жазылыңыз.',
      placeholder: 'Сіздің e-mail',
      subscribeLabel: 'Жазылу',
      success: 'Жазылғаныңызға рахмет!',
    },
    footer: {
      description: 'Әрбір зергерлік бұйымда минимализм мен биік өнер эстетикасы. Қолмен жасалған және мінсіз сапа.',
      shop: {
        title: 'ДҮКЕН',
        items: ['Сақиналар', 'Алқалар', 'Білезіктер', 'Сырғалар', 'Жаңалықтар'],
      },
      company: {
        title: 'КОМПАНИЯ',
        items: ['Біз туралы', 'Біздің тарих', 'Мансап', 'Баспасөз', 'Байланыс'],
      },
      support: {
        title: 'ҚОЛДАУ',
        items: ['Жеткізу және қайтару', 'Өлшем нұсқаулығы', 'Зергерлік бұйымдарды күту', 'FAQ', 'Құпиялылық'],
      },
      copyright: '© 2026 TOMIRIS COLLECTION. БАРЛЫҚ ҚҰҚЫҚТАР ҚОРҒАЛҒАН.',
    },
    cart: {
      title: 'СЕБЕТ',
      empty: 'Себетіңіз бос',
      continueShopping: 'САТЫП АЛУДЫ ЖАЛҒАСТЫРУ',
      total: 'ЖИЫНЫ',
      checkout: 'WHATSAPP АРҚЫЛЫ РӘСІМДЕУ',
      decrease: 'Азайту',
      increase: 'Арттыру',
      remove: 'Жою',
    },
    catalog: {
      label: 'ЗЕРГЕРЛІК БҰЙЫМДАР',
      heading: 'Каталог',
      all: 'БАРЛЫҒЫ',
      empty: 'Бұл санатта әзірше тауарлар жоқ',
      scrollLeft: 'Солға айналдыру',
      scrollRight: 'Оңға айналдыру',
    },
    product: {
      backToCatalog: 'КАТАЛОГҚА ҚАЙТУ',
      addToCart: 'СЕБЕТКЕ ҚОСУ',
      outOfStock: 'ҚОЛДА ЖОҚ',
      purity: 'сынама',
      specs: {
        metal: 'Металл',
        purity: 'Сынама',
        stone: 'Тас',
        weight: 'Салмағы',
        grams: 'г',
      },
    },
    metals: {
      gold: 'Сары алтын',
      'rose-gold': 'Қызғылт алтын',
      silver: 'Күміс',
      platinum: 'Платина',
    },
    stones: {
      diamond: 'Бриллиант',
      ruby: 'Рубин',
      sapphire: 'Сапфир',
      emerald: 'Изумруд',
      pearl: 'Інжу',
      'cubic-zirconia': 'Фианит',
      none: '—',
    },
    categories: {
      rings: 'САҚИНАЛАР',
      necklaces: 'АЛҚАЛАР',
      bracelets: 'БІЛЕЗІКТЕР',
      earrings: 'СЫРҒАЛАР',
      pendants: 'АЛҚАЛАР',
      chains: 'ТІЗБЕКТЕР',
      sets: 'ЖИНАҚТАР',
    },
  },
}

export type Translations = typeof translations.ru

export function useT(): Translations {
  const { locale } = useLanguage()
  return translations[locale]
}
