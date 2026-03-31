# TOMIRIS COLLECTION — Паспорт проекта

> Интернет-магазин ювелирных украшений премиум-класса. Минималистичная эстетика, ориентирован на казахстанский рынок.

---

## Содержание

1. [Общая информация](#1-общая-информация)
2. [Технологический стек](#2-технологический-стек)
3. [Архитектура проекта](#3-архитектура-проекта)
4. [Структура директорий](#4-структура-директорий)
5. [Модель данных](#5-модель-данных)
6. [Функциональность](#6-функциональность)
7. [API маршруты](#7-api-маршруты)
8. [Контексты и хуки](#8-контексты-и-хуки)
9. [Мультиязычность (i18n)](#9-мультиязычность-i18n)
10. [Запуск проекта](#10-запуск-проекта)
11. [История изменений](#11-история-изменений)
12. [Планируемые доработки](#12-планируемые-доработки)

---

## 1. Общая информация

| Параметр | Значение |
|---|---|
| Название | TOMIRIS COLLECTION |
| Тип | Интернет-магазин ювелирных украшений |
| Версия | 0.3.0 |
| Рынок | Казахстан (русскоязычный и казахоязычный сегмент) |
| Валюта | Казахстанский тенге (KZT, ₸) |
| Оформление заказов | Через WhatsApp |
| Дизайн | Люксовый минимализм, чёрно-белая гамма |
| Шрифты | Cormorant Garamond (заголовки), Inter (текст) |
| Поддерживаемые языки | Русский (основной), Казахский, Английский |

---

## 2. Технологический стек

### Frontend

| Технология | Версия | Назначение |
|---|---|---|
| Next.js | 16.1.6 | Фреймворк (App Router) |
| React | 19.2.4 | UI-библиотека |
| TypeScript | 5.7.3 | Типизация |
| Tailwind CSS | 4.2.0 | Стилизация |
| Shadcn/ui | — | Готовые UI-компоненты (на основе Radix UI) |
| Lucide React | 0.564.0 | Иконки |
| Embla Carousel | 8.6.0 | Карусель товаров |
| React Hook Form | 7.54.1 | Управление формами |
| Zod | 3.24.1 | Валидация схем |
| Recharts | 2.15.0 | Графики (для будущей аналитики) |

### Backend / Инфраструктура

| Технология | Назначение |
|---|---|
| Next.js API Routes | Серверная логика (GET/POST products) |
| `db.json` | Файловая база данных (JSON) |
| Vercel Analytics | Веб-аналитика |
| localStorage | Хранение корзины и языка на клиенте |
| WhatsApp API (wa.me) | Оформление заказов |

---

## 3. Архитектура проекта

```
Клиент (браузер)
  │
  ├── LanguageProvider  ← выбранный язык (localStorage, ключ: "locale")
  │     └── CartProvider  ← корзина (localStorage, ключ: "tomiris_cart")
  │           └── Страницы и компоненты
  │
  └── API-запросы → Next.js API Routes → db.json
```

### Паттерны

- **App Router** — файловая маршрутизация Next.js (папка `app/`)
- **Server Components** — страницы по умолчанию серверные; компоненты с интерактивностью имеют директиву `'use client'`
- **Context API** — глобальное состояние корзины и языка
- **Custom hooks** — `useCart()`, `useT()`, `useLanguage()`, `useMobile()`

---

## 4. Структура директорий

```
v0-jewelry-store-clone/
│
├── app/                          # Страницы и API (Next.js App Router)
│   ├── layout.tsx                # Корневой layout: шрифты, провайдеры, аналитика
│   ├── page.tsx                  # Главная страница
│   ├── globals.css               # Глобальные CSS-переменные и стили
│   ├── catalog/
│   │   └── page.tsx              # Каталог товаров с фильтрацией по категориям
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx          # Страница товара (динамический маршрут)
│   ├── admin/
│   │   └── page.tsx              # Панель администратора (CRUD товаров)
│   └── api/
│       ├── products/
│       │   └── route.ts          # GET /api/products, POST /api/products
│       └── categories/
│           └── route.ts          # GET /api/categories
│
├── components/                   # Переиспользуемые React-компоненты
│   ├── navbar.tsx                # Навигационная панель + переключатель языка
│   ├── cart-drawer.tsx           # Боковая панель корзины (Sheet)
│   ├── product-card.tsx          # Карточка товара (в каталоге и карусели)
│   ├── product-carousel.tsx      # Горизонтальная прокручиваемая карусель
│   ├── hero-banner.tsx           # Hero-секция главной страницы
│   ├── brand-story.tsx           # Секция «О нас» / философия бренда
│   ├── category-bar.tsx          # Горизонтальный скролл по категориям
│   ├── footer.tsx                # Подвал сайта
│   ├── newsletter.tsx            # Форма подписки на рассылку
│   ├── language-switcher.tsx     # Переключатель языка: RU | KK | EN
│   ├── theme-provider.tsx        # Провайдер темы (next-themes)
│   └── ui/                       # ~40 Shadcn/ui примитивов (button, sheet, dialog и др.)
│
├── context/                      # React Context провайдеры
│   ├── CartContext.tsx           # Глобальная корзина + localStorage
│   └── LanguageContext.tsx       # Выбранный язык + localStorage
│
├── locales/                      # Переводы (i18n)
│   └── index.ts                  # Все переводы RU/KK/EN + хук useT()
│
├── data/                         # Статические данные
│   ├── categories.ts             # 7 категорий с именами на RU/EN/KK
│   └── products.ts               # Образцы товаров (резервные данные)
│
├── types/                        # TypeScript-типы
│   └── product.ts                # Product, CartItem, Metal, Stone, Category, Purity
│
├── hooks/                        # Кастомные React-хуки
│   ├── use-mobile.ts             # Определение мобильного breakpoint
│   └── use-toast.ts              # Toast-уведомления
│
├── lib/                          # Утилиты
│   ├── utils.ts                  # cn() — объединение классов Tailwind
│   └── whatsapp.ts               # Генерация ссылки для заказа через WhatsApp
│
├── public/                       # Статические файлы
│   └── images/                   # Изображения (hero.jpg, brand.jpg, товары)
│
├── db.json                       # JSON-база данных товаров
├── package.json
├── tsconfig.json
├── next.config.mjs               # TS-ошибки игнорируются; изображения без оптимизации
└── postcss.config.mjs
```

---

## 5. Модель данных

### Product

```typescript
interface Product {
  id: string           // Уникальный ID
  slug: string         // URL-slug (например: "ring-gold-585-diamond")
  name: string         // Системное название (латиница)
  nameRu: string       // Название на русском
  category: Category   // rings | necklaces | bracelets | earrings | pendants | chains | sets
  price: number        // Цена в тенге (KZT)
  oldPrice?: number    // Старая цена (для отображения скидки)
  metal: Metal         // gold | silver | platinum | rose-gold
  purity: Purity       // 585 | 750 | 925 | 950 | 999
  stone?: Stone        // diamond | ruby | sapphire | emerald | pearl | cubic-zirconia | none
  weight?: number      // Вес в граммах
  images: string[]     // Пути к изображениям
  description: string  // Описание товара
  tags?: string[]      // Теги для поиска
  inStock: boolean     // Наличие на складе
  isNew?: boolean      // Флаг «Новинка»
  isBestseller?: boolean // Флаг «Хит продаж»
}
```

### CartItem

```typescript
interface CartItem {
  product: Product
  quantity: number
}
```

### CategoryItem

```typescript
interface CategoryItem {
  id: Category
  slug: string
  nameRu: string  // Название на русском
  nameEn: string  // Название на английском
  nameKk: string  // Название на казахском
  icon?: string
}
```

---

## 6. Функциональность

### Покупатель

| Функция | Статус | Описание |
|---|---|---|
| Просмотр каталога | ✅ Готово | Сетка товаров 2–4 колонки, адаптивная |
| Фильтрация по категориям | ✅ Готово | Кнопки-фильтры с активным состоянием |
| Страница товара | ✅ Готово | Фото, характеристики, цена, кнопка в корзину |
| Корзина | ✅ Готово | Боковая панель, изменение количества, удаление |
| Сохранение корзины | ✅ Готово | Через localStorage (ключ: `tomiris_cart`) |
| Оформление через WhatsApp | ✅ Готово | Ссылка wa.me с форматированным сообщением |
| Карусель «Хиты продаж» | ✅ Готово | Горизонтальный скролл на главной |
| Hero-баннер | ✅ Готово | Полноэкранный блок с фото и CTA |
| Секция «О бренде» | ✅ Готово | Текст + фото, ссылка на каталог |
| Подписка на рассылку | ✅ Готово | Форма с валидацией email (только frontend) |
| Переключатель языка | ✅ Готово | RU / KK / EN, сохраняется в localStorage |
| Адаптивный дизайн | ✅ Готово | Mobile-first, breakpoints: sm / md / lg |

### Администратор

| Функция | Статус | Описание |
|---|---|---|
| Список товаров | ✅ Готово | Отображение всех товаров из db.json |
| Добавление товара | ✅ Готово | Форма → POST /api/products |
| Редактирование товара | ✅ Готово | Inline-редактирование |
| Удаление товара | ✅ Готово | DELETE с подтверждением |

---

## 7. API маршруты

### `GET /api/products`

Возвращает все товары из `db.json`.

```json
[
  {
    "id": "ring-001",
    "slug": "ring-gold-585-solitaire",
    "nameRu": "Кольцо с бриллиантом",
    "category": "rings",
    "price": 485000,
    "metal": "gold",
    "purity": "585"
  }
]
```

### `POST /api/products`

Добавляет новый товар в `db.json`. Тело запроса — объект `Product`.

### `GET /api/categories`

Возвращает список категорий из `data/categories.ts`.

---

## 8. Контексты и хуки

### `CartContext` — `context/CartContext.tsx`

Глобальное состояние корзины. Доступно через `useCart()`.

| Метод / Свойство | Тип | Описание |
|---|---|---|
| `cart` | `CartItem[]` | Массив товаров в корзине |
| `addToCart(product, qty?)` | function | Добавить товар (qty по умолчанию = 1) |
| `removeFromCart(id)` | function | Удалить товар по ID |
| `updateQuantity(id, qty)` | function | Обновить количество (qty ≤ 0 удаляет товар) |
| `clearCart()` | function | Очистить корзину |
| `totalItems` | number | Общее количество единиц |
| `totalPrice` | number | Итоговая сумма в тенге |
| `isOpen` | boolean | Состояние боковой панели |
| `openCart()` | function | Открыть боковую панель |
| `closeCart()` | function | Закрыть боковую панель |

Персистентность: `localStorage`, ключ `tomiris_cart`.

---

### `LanguageContext` — `context/LanguageContext.tsx`

Управление языком интерфейса. Доступно через `useLanguage()`.

| Свойство | Тип | Описание |
|---|---|---|
| `locale` | `'ru' \| 'en' \| 'kk'` | Текущий язык |
| `setLocale(locale)` | function | Установить язык и сохранить в localStorage |

Персистентность: `localStorage`, ключ `locale`. Значение по умолчанию — `'ru'`.

---

### `useT()` — `locales/index.ts`

Возвращает объект переводов для текущего языка.

```typescript
const t = useT()

t.nav.catalog        // 'КАТАЛОГ' | 'CATALOG' | 'КАТАЛОГ'
t.cart.checkout      // 'ОФОРМИТЬ ЧЕРЕЗ WHATSAPP' | 'ORDER VIA WHATSAPP' | 'WHATSAPP АРҚЫЛЫ РӘСІМДЕУ'
t.metals.gold        // 'Жёлтое золото' | 'Yellow Gold' | 'Сары алтын'
t.product.addToCart  // 'ДОБАВИТЬ В КОРЗИНУ' | 'ADD TO CART' | 'СЕБЕТКЕ ҚОСУ'
```

---

### `buildWhatsAppLink(cart)` — `lib/whatsapp.ts`

Генерирует ссылку `wa.me/77474441219?text=...` с форматированным перечнем товаров и итоговой суммой на русском языке.

---

## 9. Мультиязычность (i18n)

### Реализация

Кастомное решение на базе React Context без внешних библиотек (`next-intl`, `i18next` и др. не используются).

**Принцип работы:**
1. `LanguageProvider` оборачивает всё приложение в `app/layout.tsx`
2. При старте читает сохранённое значение из `localStorage` (ключ `locale`)
3. Любой клиентский компонент вызывает `useT()` и получает переводы для текущего языка
4. `LanguageSwitcher` в навбаре меняет язык и сохраняет выбор

### Поддерживаемые языки

| Код | Язык | Статус |
|---|---|---|
| `ru` | Русский | Основной, полный перевод |
| `kk` | Казахский | Полный перевод |
| `en` | Английский | Полный перевод |

### Переведённые разделы

| Раздел | Namespace |
|---|---|
| Навигация | `t.nav.*` |
| Hero-баннер | `t.hero.*` |
| О бренде | `t.brand.*` |
| Рассылка | `t.newsletter.*` |
| Подвал (колонки: Магазин, Компания, Поддержка) | `t.footer.*` |
| Корзина | `t.cart.*` |
| Каталог | `t.catalog.*` |
| Страница товара | `t.product.*` |
| Металлы | `t.metals.*` |
| Камни | `t.stones.*` |
| Категории | `t.categories.*` |

### Структура `locales/index.ts`

```typescript
export type Locale = 'ru' | 'en' | 'kk'

const translations = {
  ru: { nav, hero, brand, newsletter, footer, cart, catalog, product, metals, stones, categories },
  en: { ... },
  kk: { ... },
}

export function useT(): Translations {
  const { locale } = useLanguage()
  return translations[locale]
}
```

---

## 10. Запуск проекта

### Требования

- Node.js 18+
- npm / yarn / pnpm

### Команды

```bash
# Установить зависимости
npm install

# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-сервера
npm run start

# Линтинг
npm run lint
```

Приложение доступно по адресу: `http://localhost:3000`

### Переменные окружения

На данный момент не используются. Номер WhatsApp захардкожен в `lib/whatsapp.ts`:

```typescript
const WHATSAPP_NUMBER = '77474441219'
```

---

## 11. История изменений

### v0.1.0 — Initial commit (`a11ec67`)

- Инициализация проекта из v0 (Vercel AI)

---

### v0.2.0 — Tomiris Collection MVP (`146fc61`)

- Полная реализация MVP интернет-магазина
- Каталог товаров, страница товара, корзина
- Оформление заказа через WhatsApp
- Административная панель (CRUD)
- Главная страница: hero, карусель, бренд, рассылка
- Файловая база данных `db.json`
- 7 категорий: кольца, колье, браслеты, серьги, подвески, цепочки, комплекты

---

### v0.3.0 — Мультиязычность i18n (31.03.2026)

**Задача:** добавить поддержку казахского и английского языков при основном русском интерфейсе.

**Новые файлы:**

| Файл | Описание |
|---|---|
| `locales/index.ts` | Все переводы для трёх языков + хук `useT()` |
| `context/LanguageContext.tsx` | React Context: хранение и переключение языка с персистентностью в localStorage |
| `components/language-switcher.tsx` | UI-компонент `ru \| kk \| en` в навбаре |

**Изменённые файлы:**

| Файл | Что изменилось |
|---|---|
| `app/layout.tsx` | Добавлен `<LanguageProvider>` как внешняя обёртка вокруг `<CartProvider>` |
| `data/categories.ts` | Добавлено поле `nameKk` (казахское название) для всех 7 категорий |
| `components/navbar.tsx` | Все тексты через `useT()`, добавлен `<LanguageSwitcher>` в десктопное и мобильное меню |
| `components/hero-banner.tsx` | Переведён; добавлена директива `'use client'` (требует контекст) |
| `components/brand-story.tsx` | Переведён; добавлена директива `'use client'` |
| `components/newsletter.tsx` | Все тексты через `useT()` |
| `components/footer.tsx` | Добавлена директива `'use client'`; колонки меню через `useT()` |
| `components/product-card.tsx` | Названия металлов через `t.metals[product.metal]` |
| `components/category-bar.tsx` | Названия категорий по текущей локали (nameRu / nameEn / nameKk) |
| `components/cart-drawer.tsx` | Все тексты корзины через `useT()` |
| `app/catalog/page.tsx` | Заголовки, фильтры, пустое состояние через `useT()` |
| `app/product/[slug]/page.tsx` | Характеристики товара, кнопки, надписи через `useT()` |

**Архитектурные решения:**

- Выбран кастомный Context вместо `next-intl` — не требует реструктуризации URL-маршрутов (без `/[locale]/` префикса)
- Язык хранится в `localStorage` (ключ `locale`) — сохраняется между сессиями браузера
- Значение по умолчанию — русский (`ru`)
- Переключатель отображается как `ru | kk | en`, активный язык выделен цветом

---

## 12. Планируемые доработки

### Высокий приоритет

- [ ] **База данных** — миграция с `db.json` на PostgreSQL или MongoDB
- [ ] **Изображения товаров** — загрузка и хранение реальных фотографий (Cloudinary / S3)
- [ ] **Авторизация** — личный кабинет, история заказов

### Средний приоритет

- [ ] **Платёжная система** — интеграция с Kaspi Pay, Halyk Bank или Stripe
- [ ] **Поиск** — поиск по названию и характеристикам товара
- [ ] **SEO** — динамические мета-теги, Open Graph, JSON-LD для товаров
- [ ] **Фильтры каталога** — по металлу, пробе, цене, камню

### Низкий приоритет

- [ ] **Wishlist** — список желаний
- [ ] **Отзывы** — система оценок и комментариев
- [ ] **Email-рассылка** — интеграция через Resend / SendGrid
- [ ] **Аналитика заказов** — дашборд в панели администратора
- [ ] **URL-локализация** — переход на `next-intl` с маршрутами `/ru/`, `/kk/`, `/en/`

---

*Документ обновлён: 31 марта 2026 г.*
