'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight, Camera, Heart, Instagram, MessageCircle, Sparkles, Star } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/context/LanguageContext'
import { INSTAGRAM_URL, TELEGRAM_URL, WHATSAPP_URL } from '@/lib/social-links'

const content = {
  ru: {
    label: 'Программа амбассадоров',
    title: 'Станьте лицом TOMIRIS COLLECTION ASTANA',
    subtitle:
      'Каждая женщина уникальна и достойна восхищения. Мы ищем тех, кто разделяет нашу философию красоты и хочет вдохновлять других через стиль и украшения.',
    primaryCta: 'Стать амбассадором',
    secondaryCta: 'Написать в Telegram',
    philosophyLabel: 'Наша философия',
    philosophy:
      '«Каждая женщина уникальна и достойна восхищения» — это не просто слова, это основа всего, что мы создаём в TOMIRIS COLLECTION ASTANA. Наши амбассадоры воплощают эту идею и помогают ей звучать громче.',
    areasTitle: 'Как участвовать',
    areas: [
      {
        title: 'Носите украшения',
        text: 'Делитесь своими образами с украшениями TOMIRIS COLLECTION ASTANA в Instagram, TikTok или других платформах. Ваша аудитория видит красоту через вас.',
      },
      {
        title: 'Создавайте контент',
        text: 'Реклсы, фото, сторис — любой формат, в котором вы чувствуете себя органично. Мы помогаем с продуктами и идеями.',
      },
      {
        title: 'Вдохновляйте сообщество',
        text: 'Рекомендуйте TOMIRIS COLLECTION ASTANA подругам, участвуйте в наших мероприятиях и становитесь частью растущего круга женщин с вкусом.',
      },
    ],
    benefitsTitle: 'Что вы получаете',
    benefits: [
      {
        title: 'Украшения в подарок',
        text: 'Амбассадоры получают украшения из актуальных коллекций для съёмок и личного использования.',
      },
      {
        title: 'Персональный промокод',
        text: 'Уникальный промокод для вашей аудитории с комиссией с каждой продажи.',
      },
      {
        title: 'Приоритетный доступ',
        text: 'Ранний доступ к новым коллекциям, закрытым мероприятиям и специальным сборкам.',
      },
      {
        title: 'Поддержка бренда',
        text: 'Мы делимся вашим контентом, отмечаем вас в наших аккаунтах и помогаем расти.',
      },
    ],
    requirementsTitle: 'Кого мы ищем',
    requirements: [
      'Активный Instagram, TikTok или другая платформа',
      'Искренняя любовь к украшениям и стилю',
      'Аудитория от 500 живых подписчиков',
      'Готовность к регулярному созданию контента',
    ],
    applyTitle: 'Оставить заявку',
    applyText:
      'Заполните форму ниже. Мы соберём сообщение и сразу откроем WhatsApp, чтобы вы могли отправить заявку с удобного устройства.',
    form: {
      name: 'Имя и фамилия',
      phone: 'Телефон',
      city: 'Город',
      instagram: 'Ссылка на Instagram / TikTok',
      followers: 'Количество подписчиков',
      message: 'Почему хотите стать амбассадором',
      submit: 'Отправить заявку в WhatsApp',
    },
    steps: [
      'Заполните форму с вашими данными и ссылкой на профиль.',
      'Мы рассматриваем заявки и отвечаем в течение 2–3 рабочих дней.',
      'После подтверждения обсуждаем условия и отправляем первый набор украшений.',
    ],
  },
  en: {
    label: 'Ambassador Program',
    title: 'Become the face of TOMIRIS COLLECTION ASTANA',
    subtitle:
      'Every woman is unique and deserves admiration. We are looking for those who share our philosophy of beauty and want to inspire others through style and jewelry.',
    primaryCta: 'Become an ambassador',
    secondaryCta: 'Message on Telegram',
    philosophyLabel: 'Our philosophy',
    philosophy:
      '"Every woman is unique and deserves admiration" — this is not just a tagline, it is the foundation of everything we create at TOMIRIS COLLECTION ASTANA. Our ambassadors bring this idea to life.',
    areasTitle: 'How to participate',
    areas: [
      {
        title: 'Wear our jewelry',
        text: 'Share your looks featuring TOMIRIS COLLECTION ASTANA jewelry on Instagram, TikTok, or other platforms. Your audience discovers beauty through you.',
      },
      {
        title: 'Create content',
        text: 'Reels, photos, stories — any format that feels natural to you. We help with products and creative ideas.',
      },
      {
        title: 'Inspire the community',
        text: 'Recommend TOMIRIS COLLECTION ASTANA to friends, join our events, and become part of a growing circle of women with taste.',
      },
    ],
    benefitsTitle: 'What you get',
    benefits: [
      {
        title: 'Jewelry as a gift',
        text: 'Ambassadors receive pieces from current collections for shoots and personal use.',
      },
      {
        title: 'Personal promo code',
        text: 'A unique code for your audience with a commission on every sale.',
      },
      {
        title: 'Priority access',
        text: 'Early access to new collections, exclusive events, and special curations.',
      },
      {
        title: 'Brand support',
        text: 'We share your content, tag you in our accounts, and help you grow.',
      },
    ],
    requirementsTitle: 'Who we look for',
    requirements: [
      'Active Instagram, TikTok, or other platform',
      'Genuine love for jewelry and personal style',
      'Audience of 500+ engaged followers',
      'Willingness to create content regularly',
    ],
    applyTitle: 'Apply now',
    applyText:
      'Fill out the form below. We will prepare the message and open WhatsApp so you can send your application right away.',
    form: {
      name: 'Full name',
      phone: 'Phone number',
      city: 'City',
      instagram: 'Instagram / TikTok link',
      followers: 'Number of followers',
      message: 'Why do you want to become an ambassador',
      submit: 'Send application via WhatsApp',
    },
    steps: [
      'Fill in the form with your details and profile link.',
      'We review applications and respond within 2–3 business days.',
      'Once confirmed, we discuss terms and send your first jewelry set.',
    ],
  },
  kk: {
    label: 'Амбассадор бағдарламасы',
    title: 'TOMIRIS COLLECTION ASTANA бетіне айналыңыз',
    subtitle:
      'Әрбір әйел бірегей және сұлулықты еркін сезінуге лайық. Біз сұлулық философиямызды бөлісетін және украшения мен стиль арқылы басқаларды шабыттандырғысы келетіндерді іздейміз.',
    primaryCta: 'Амбассадор болу',
    secondaryCta: 'Telegram арқылы жазу',
    philosophyLabel: 'Біздің философия',
    philosophy:
      '«Әрбір әйел бірегей және сұлулыққа лайық» — бұл тек сөз емес, TOMIRIS COLLECTION ASTANA-тің негізгі идеясы. Амбассадорларымыз осы идеяны өмірде бейнелейді.',
    areasTitle: 'Қалай қатысуға болады',
    areas: [
      {
        title: 'Украшение киіңіз',
        text: 'TOMIRIS COLLECTION ASTANA украшенийлерімен образдарыңызды Instagram, TikTok немесе басқа платформаларда бөлісіңіз.',
      },
      {
        title: 'Контент жасаңыз',
        text: 'Риллстер, фотолар, сторилер — сізге органикалы кез келген формат. Біз өнімдер мен идеялармен көмектесеміз.',
      },
      {
        title: 'Қауымдастықты шабыттандырыңыз',
        text: 'TOMIRIS COLLECTION ASTANA-ті достарыңызға ұсыныңыз, іс-шараларымызға қатысыңыз және дәмі бар әйелдер шеңберінің бөлігіне айналыңыз.',
      },
    ],
    benefitsTitle: 'Не аласыз',
    benefits: [
      {
        title: 'Сыйлыққа украшения',
        text: 'Амбассадорлар түсірілімдерге және жеке пайдалану үшін өзекті коллекциялардан украшения алады.',
      },
      {
        title: 'Жеке промокод',
        text: 'Аудиторияңыз үшін бірегей промокод және әрбір сатудан комиссия.',
      },
      {
        title: 'Басым қол жетімділік',
        text: 'Жаңа коллекцияларға, жабық іс-шараларға және арнайы жиынтықтарға ерте қол жетімділік.',
      },
      {
        title: 'Бренд қолдауы',
        text: 'Біз контентіңізді бөлісіп, аккаунттарымызда белгілеп, өсуіңізге көмектесеміз.',
      },
    ],
    requirementsTitle: 'Кімдерді іздейміз',
    requirements: [
      'Белсенді Instagram, TikTok немесе басқа платформа',
      'Украшение мен стильге деген шынайы сүйіспеншілік',
      '500+ тірі жазылушы аудитория',
      'Тұрақты контент жасауға дайын болу',
    ],
    applyTitle: 'Өтінім қалдыру',
    applyText:
      'Төмендегі форманы толтырыңыз. Біз хабарламаны дайындап, оны бірден WhatsApp-та ашамыз.',
    form: {
      name: 'Аты-жөніңіз',
      phone: 'Телефон нөмірі',
      city: 'Қала',
      instagram: 'Instagram / TikTok сілтемесі',
      followers: 'Жазылушылар саны',
      message: 'Амбассадор болғыңыз келетін себеп',
      submit: 'WhatsApp арқылы жіберу',
    },
    steps: [
      'Деректеріңіз бен профиль сілтемеңізді форма арқылы жіберіңіз.',
      'Өтінімдерді қарастырып, 2–3 жұмыс күні ішінде жауап береміз.',
      'Растағаннан кейін шарттарды талқылап, алғашқы украшение жинағын жіберіміз.',
    ],
  },
} as const

const areaIcons = [Heart, Camera, Instagram]
const benefitIcons = [Sparkles, Star, Heart, Camera]

function buildAmbassadorLink(values: {
  name: string
  phone: string
  city: string
  instagram: string
  followers: string
  message: string
}) {
  const rows = [
    'Здравствуйте! Хочу стать амбассадором TOMIRIS COLLECTION ASTANA.',
    '',
    `Имя: ${values.name || '—'}`,
    `Телефон: ${values.phone || '—'}`,
    `Город: ${values.city || '—'}`,
    `Instagram / TikTok: ${values.instagram || '—'}`,
    `Подписчиков: ${values.followers || '—'}`,
    `О себе: ${values.message || '—'}`,
  ]
  return `${WHATSAPP_URL}?text=${encodeURIComponent(rows.join('\n'))}`
}

export function AmbassadorPage() {
  const { locale } = useLanguage()
  const t = content[locale]
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    instagram: '',
    followers: '',
    message: '',
  })

  const applicationLink = useMemo(() => buildAmbassadorLink(form), [form])

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[116px]">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-[#f7f1e8]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(31,24,19,0.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-black/45 font-sans">
                {t.label}
              </p>
              <h1 className="max-w-3xl text-4xl font-light leading-tight text-balance text-black md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-black/65 font-sans md:text-lg">
                {t.subtitle}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#ambassador-apply"
                  className="inline-flex items-center justify-center gap-2 border border-black bg-black px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-black font-sans"
                >
                  {t.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-black/15 bg-white/60 px-7 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:border-black hover:bg-white font-sans"
                >
                  {t.secondaryCta}
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden border border-black/10 bg-black/5 sm:min-h-[340px]">
                <Image src="/images/photosession/webp/GK2A9171.webp" alt="TOMIRIS COLLECTION ASTANA ambassador jewelry" fill className="object-cover" quality={74} />
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-[160px] overflow-hidden border border-black/10 bg-black/5">
                  <Image src="/images/photosession/webp/GK2A9476.webp" alt="TOMIRIS COLLECTION ASTANA jewelry style" fill className="object-cover" quality={72} />
                </div>
                <div className="relative min-h-[160px] overflow-hidden border border-black/10 bg-black/5">
                  <Image src="/images/photosession/webp/GK2A9611.webp" alt="TOMIRIS COLLECTION ASTANA collection" fill className="object-cover" quality={72} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy quote */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center lg:px-10 lg:py-20">
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-black/40 font-sans">{t.philosophyLabel}</p>
            <blockquote className="text-2xl font-light leading-relaxed text-black md:text-4xl">
              {t.philosophy}
            </blockquote>
          </div>
        </section>

        {/* How to participate */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-black/40 font-sans">TOMIRIS COLLECTION ASTANA</p>
            <h2 className="text-3xl font-light text-black md:text-5xl">{t.areasTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.areas.map((area, index) => {
              const Icon = areaIcons[index]
              return (
                <div key={area.title} className="border border-border bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f1e8]">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="text-xl font-light text-black">{area.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/65 font-sans">{area.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Benefits — dark section */}
        <section className="border-y border-border bg-[#111111] text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-light md:text-5xl">{t.benefitsTitle}</h2>
              <div className="hidden text-[11px] uppercase tracking-[0.32em] text-white/40 font-sans lg:block">Ambassador perks</div>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-2">
              {t.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index]
                return (
                  <div key={benefit.title} className="bg-[#151515] p-8 lg:p-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-[#d8bb7a]" />
                    </div>
                    <h3 className="text-2xl font-light">{benefit.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 font-sans">{benefit.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Requirements + How it works */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/40 font-sans">Requirements</p>
            <h2 className="mt-5 text-3xl font-light text-black md:text-5xl">{t.requirementsTitle}</h2>
            <div className="mt-10 grid gap-4">
              {t.requirements.map((req, index) => (
                <div key={req} className="flex items-center gap-4 border border-border bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f1e8] text-sm font-sans text-black/60">
                    {index + 1}
                  </div>
                  <div className="text-base text-black font-sans">{req}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/10 bg-[#f7f1e8] p-8 lg:p-10">
            <div className="flex items-center gap-3 text-black/45">
              <MessageCircle className="h-5 w-5" />
              <span className="text-[11px] uppercase tracking-[0.32em] font-sans">How it works</span>
            </div>
            <div className="mt-8 space-y-6">
              {t.steps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-sans">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-black/70 font-sans">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 border-t border-black/10 pt-8">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-black/55 transition hover:text-black font-sans"
              >
                <Instagram className="h-4 w-4" />
                @tomiris_collection_astana.kz
              </a>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="ambassador-apply" className="border-t border-border bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-black/40 font-sans">Apply</p>
              <h2 className="mt-5 text-3xl font-light text-black md:text-5xl">{t.applyTitle}</h2>
              <p className="mt-6 text-base leading-8 text-black/65 font-sans">{t.applyText}</p>
            </div>

            <div className="border border-black/10 bg-[#fcfaf7] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-black/55 font-sans">
                  {t.form.name}
                  <input
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    placeholder={t.form.name}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-black/55 font-sans">
                  {t.form.phone}
                  <input
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    placeholder="+7 777 000 00 00"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-black/55 font-sans">
                  {t.form.city}
                  <input
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    placeholder={t.form.city}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-black/55 font-sans">
                  {t.form.followers}
                  <input
                    value={form.followers}
                    onChange={(e) => updateField('followers', e.target.value)}
                    className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    placeholder="1000"
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-2 text-sm text-black/55 font-sans">
                {t.form.instagram}
                <input
                  value={form.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                  placeholder="https://instagram.com/yourhandle"
                />
              </label>

              <label className="mt-4 flex flex-col gap-2 text-sm text-black/55 font-sans">
                {t.form.message}
                <textarea
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="min-h-[132px] border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                  placeholder={t.form.message}
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#1b1b1b] font-sans"
                >
                  {t.form.submit}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-black/10 bg-white px-6 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:border-black font-sans"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
