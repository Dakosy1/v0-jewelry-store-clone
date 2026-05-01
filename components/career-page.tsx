'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Clock3, Gem, MapPin, MessageCircle, Send, Sparkles, Users } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/context/LanguageContext'
import { TELEGRAM_URL, WHATSAPP_URL } from '@/lib/social-links'

const content = {
  ru: {
    label: 'Карьера с TOMIRIS COLLECTION ASTANA',
    title: 'Расти. Создавай. Вдохновляй вместе с нами.',
    subtitle:
      'Мы строим ювелирный бренд, который ценит вкус, темп, сервис и сильную команду. Если вам близка эстетика TOMIRIS COLLECTION ASTANA, у нас можно не просто работать, а расти вместе с брендом.',
    primaryCta: 'Откликнуться сейчас',
    secondaryCta: 'Написать в Telegram',
    introTitle: 'Команда, с которой хочется двигаться дальше',
    introText:
      'В TOMIRIS COLLECTION ASTANA важны не только продажи, но и впечатление, которое остаётся у клиента. Нам нужны люди, которые умеют чувствовать продукт, любить красивый сервис и работать с вниманием к деталям.',
    stats: [
      { value: '4', label: 'ключевые коллекции' },
      { value: '100%', label: 'фокус на сервисе и эстетике' },
      { value: '1', label: 'команда, которая растёт вместе' },
    ],
    benefitsTitle: 'Почему выбирают нас',
    benefits: [
      {
        title: 'Рост внутри бренда',
        text: 'Даём пространство для инициативы, развития в продажах, контенте, операционке и клиентском опыте.',
      },
      {
        title: 'Живой красивый продукт',
        text: 'Вы будете работать с брендом, где важны вкус, визуал, упаковка, подача и реальная любовь к украшениям.',
      },
      {
        title: 'Человечная коммуникация',
        text: 'Мы ценим уважение, аккуратность, скорость и умение работать без хаоса даже в высокий сезон.',
      },
      {
        title: 'Гибкость и темп',
        text: 'Ищем тех, кто любит движение, умеет быстро включаться и при этом сохраняет высокий уровень сервиса.',
      },
    ],
    rolesTitle: 'Кого мы чаще всего ищем',
    roles: [
      'Менеджер по продажам и работе с клиентами',
      'Контент-креатор / SMM-специалист',
      'Фотограф / видеограф для съёмок',
      'Операционный менеджер / логистика',
    ],
    applyTitle: 'Откликнуться на вакансию',
    applyText:
      'Заполните короткую форму. Мы соберём сообщение и сразу откроем WhatsApp, чтобы вы могли отправить отклик с удобного устройства.',
    form: {
      name: 'Имя и фамилия',
      phone: 'Телефон',
      city: 'Город',
      role: 'Желаемая позиция',
      experience: 'Опыт работы',
      resume: 'Ссылка на резюме / портфолио',
      message: 'Коротко о себе',
      submit: 'Отправить отклик в WhatsApp',
      helper: 'Можно вставить ссылку на Google Drive, hh.kz, Behance или Instagram.',
    },
    steps: [
      'Укажите, на какую роль вы хотите откликнуться.',
      'Оставьте телефон и удобную ссылку на резюме или портфолио.',
      'Сообщение откроется в WhatsApp в готовом виде, останется только отправить.',
    ],
  },
  en: {
    label: 'Careers at TOMIRIS COLLECTION ASTANA',
    title: 'Grow. Create. Inspire with us.',
    subtitle:
      'We are building a jewelry brand that values taste, pace, service, and a strong team. If you connect with TOMIRIS COLLECTION ASTANA aesthetics, you can do more than work here — you can grow with the brand.',
    primaryCta: 'Apply now',
    secondaryCta: 'Message on Telegram',
    introTitle: 'A team you actually want to build with',
    introText:
      'At TOMIRIS COLLECTION ASTANA, sales matter, but so does the feeling we leave with every client. We look for people who understand product, love thoughtful service, and care about details.',
    stats: [
      { value: '4', label: 'signature collections' },
      { value: '100%', label: 'focus on service and aesthetics' },
      { value: '1', label: 'team growing together' },
    ],
    benefitsTitle: 'Why people choose us',
    benefits: [
      {
        title: 'Growth inside the brand',
        text: 'There is room to grow across sales, content, operations, and client experience.',
      },
      {
        title: 'A product with taste',
        text: 'You will work with a brand where visual identity, packaging, presentation, and true love for jewelry matter.',
      },
      {
        title: 'Human communication',
        text: 'We value respect, precision, speed, and calm execution even during busy seasons.',
      },
      {
        title: 'Flexibility and momentum',
        text: 'We love people who move fast, adapt quickly, and still keep service quality high.',
      },
    ],
    rolesTitle: 'Roles we often look for',
    roles: [
      'Sales and client success manager',
      'Content creator / SMM specialist',
      'Photographer / videographer',
      'Operations / logistics manager',
    ],
    applyTitle: 'Apply for a role',
    applyText:
      'Fill out the short form. We will prepare the message and open WhatsApp so you can send your application right away.',
    form: {
      name: 'Full name',
      phone: 'Phone number',
      city: 'City',
      role: 'Desired role',
      experience: 'Work experience',
      resume: 'Resume / portfolio link',
      message: 'A few words about you',
      submit: 'Send application via WhatsApp',
      helper: 'You can paste a Google Drive, hh.kz, Behance, or Instagram link.',
    },
    steps: [
      'Tell us which role you want to apply for.',
      'Leave your phone number and a convenient resume or portfolio link.',
      'WhatsApp will open with a ready-to-send application message.',
    ],
  },
  kk: {
    label: 'TOMIRIS COLLECTION ASTANA мансабы',
    title: 'Бізбен бірге өсіңіз. Жасаңыз. Шабыт беріңіз.',
    subtitle:
      'Біз талғамды, сервисті, қарқынды және мықты команданы бағалайтын зергерлік брендті дамытып жатырмыз. Егер сізге TOMIRIS COLLECTION ASTANA эстетикасы жақын болса, мұнда тек жұмыс істемей, брендпен бірге өсе аласыз.',
    primaryCta: 'Қазір өтінім беру',
    secondaryCta: 'Telegram арқылы жазу',
    introTitle: 'Бірге дамығың келетін команда',
    introText:
      'TOMIRIS COLLECTION ASTANA-те тек сату емес, клиентте қалатын әсер де маңызды. Біз өнімді сезіне алатын, әсем сервисті жақсы көретін және детальға мұқият қарайтын адамдарды іздейміз.',
    stats: [
      { value: '4', label: 'негізгі коллекция' },
      { value: '100%', label: 'сервис пен эстетикаға назар' },
      { value: '1', label: 'бірге өсетін команда' },
    ],
    benefitsTitle: 'Неге бізді таңдайды',
    benefits: [
      {
        title: 'Бренд ішінде өсу',
        text: 'Сатылымда, контентте, операциялық процестерде және клиенттік сервисте өсуге мүмкіндік бар.',
      },
      {
        title: 'Әдемі әрі мәні бар өнім',
        text: 'Сіз визуал, қаптама, ұсыну және әшекейге деген сүйіспеншілік маңызды брендпен жұмыс істейсіз.',
      },
      {
        title: 'Адамға жақын коммуникация',
        text: 'Біз сыйластықты, ұқыптылықты, жылдамдықты және қарбаласта да сапаны сақтай білуді бағалаймыз.',
      },
      {
        title: 'Икемділік пен қарқын',
        text: 'Біз жылдам бейімделетін, қозғалысты жақсы көретін және сонымен бірге сервисті жоғары деңгейде ұстайтын адамдарды ұнатамыз.',
      },
    ],
    rolesTitle: 'Біз жиі іздейтін рөлдер',
    roles: [
      'Сату және клиенттермен жұмыс менеджері',
      'Контент-креатор / SMM маманы',
      'Фотограф / видеограф',
      'Операциялық менеджер / логистика',
    ],
    applyTitle: 'Вакансияға өтінім беру',
    applyText:
      'Қысқа форманы толтырыңыз. Біз хабарламаны дайындап, оны бірден WhatsApp-та ашамыз.',
    form: {
      name: 'Аты-жөніңіз',
      phone: 'Телефон нөмірі',
      city: 'Қала',
      role: 'Қалаған позиция',
      experience: 'Жұмыс тәжірибесі',
      resume: 'Резюме / портфолио сілтемесі',
      message: 'Өзіңіз туралы қысқаша',
      submit: 'WhatsApp арқылы жіберу',
      helper: 'Google Drive, hh.kz, Behance немесе Instagram сілтемесін қоса аласыз.',
    },
    steps: [
      'Қандай рөлге өтінім бергіңіз келетінін жазыңыз.',
      'Телефоныңызды және ыңғайлы резюме не портфолио сілтемесін қалдырыңыз.',
      'Дайын хабарлама WhatsApp-та ашылады, тек жіберу қалады.',
    ],
  },
} as const

const rolesIcons = [Gem, Users, Sparkles, BriefcaseBusiness]
const benefitIcons = [Sparkles, Gem, Users, Clock3]

function buildApplicationLink(values: {
  name: string
  phone: string
  city: string
  role: string
  experience: string
  resume: string
  message: string
}) {
  const rows = [
    'Здравствуйте! Хочу откликнуться на вакансию в TOMIRIS COLLECTION ASTANA.',
    '',
    `Имя: ${values.name || '—'}`,
    `Телефон: ${values.phone || '—'}`,
    `Город: ${values.city || '—'}`,
    `Позиция: ${values.role || '—'}`,
    `Опыт: ${values.experience || '—'}`,
    `Резюме / портфолио: ${values.resume || '—'}`,
    `О себе: ${values.message || '—'}`,
  ]

  return `${WHATSAPP_URL}?text=${encodeURIComponent(rows.join('\n'))}`
}

export function CareerPage() {
  const { locale } = useLanguage()
  const t = content[locale]
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    role: '',
    experience: '',
    resume: '',
    message: '',
  })

  const applicationLink = useMemo(() => buildApplicationLink(form), [form])

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[116px]">
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
                <Link
                  href="#career-apply"
                  className="inline-flex items-center justify-center gap-2 border border-black bg-black px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-black font-sans"
                >
                  {t.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-black/15 bg-white/60 px-7 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:border-black hover:bg-white font-sans"
                >
                  {t.secondaryCta}
                  <Send className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {t.stats.map((stat) => (
                  <div key={stat.label} className="border border-black/10 bg-white/70 p-5 backdrop-blur-sm">
                    <div className="text-3xl font-light text-black">{stat.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-black/45 font-sans">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden border border-black/10 bg-black/5 sm:min-h-[340px]">
                <Image src="/images/photosession/webp/GK2A9401.webp" alt="Tomiris Collection Astana team and jewelry styling" fill className="object-cover" quality={74} />
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-[160px] overflow-hidden border border-black/10 bg-black/5">
                  <Image src="/images/photosession/webp/GK2A9468.webp" alt="Jewelry photoshoot" fill className="object-cover" quality={72} />
                </div>
                <div className="relative min-h-[160px] overflow-hidden border border-black/10 bg-black/5">
                  <Image src="/images/photosession/webp/GK2A9729.webp" alt="Tomiris Collection Astana jewelry details" fill className="object-cover" quality={72} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/40 font-sans">TOMIRIS COLLECTION ASTANA</p>
            <h2 className="mt-5 text-3xl font-light text-black md:text-5xl">{t.introTitle}</h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-black/65 font-sans md:text-lg">{t.introText}</p>
        </section>

        <section className="border-y border-border bg-[#111111] text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-light md:text-5xl">{t.benefitsTitle}</h2>
              <div className="hidden text-[11px] uppercase tracking-[0.32em] text-white/40 font-sans lg:block">Team & growth</div>
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

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/40 font-sans">Open roles</p>
            <h2 className="mt-5 text-3xl font-light text-black md:text-5xl">{t.rolesTitle}</h2>
            <div className="mt-10 grid gap-4">
              {t.roles.map((role, index) => {
                const Icon = rolesIcons[index]
                return (
                  <div key={role} className="flex items-center gap-4 border border-border bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f1e8] text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-base text-black font-sans">{role}</div>
                  </div>
                )
              })}
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

            <div className="mt-10 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-black/65 font-sans">
                <MapPin className="h-4 w-4" />
                Kazakhstan
              </div>
              <div className="flex items-center gap-3 text-sm text-black/65 font-sans">
                <Clock3 className="h-4 w-4" />
                Fast response
              </div>
            </div>
          </div>
        </section>

        <section id="career-apply" className="border-t border-border bg-white">
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
                  {t.form.role}
                  <input
                    value={form.role}
                    onChange={(e) => updateField('role', e.target.value)}
                    className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    placeholder={t.form.role}
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-2 text-sm text-black/55 font-sans">
                {t.form.experience}
                <input
                  value={form.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                  placeholder={t.form.experience}
                />
              </label>

              <label className="mt-4 flex flex-col gap-2 text-sm text-black/55 font-sans">
                {t.form.resume}
                <input
                  value={form.resume}
                  onChange={(e) => updateField('resume', e.target.value)}
                  className="border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                  placeholder="https://..."
                />
              </label>
              <p className="mt-2 text-xs text-black/45 font-sans">{t.form.helper}</p>

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
