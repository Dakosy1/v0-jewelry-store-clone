import type { Metadata } from 'next'
import { CareerPage } from '@/components/career-page'

export const metadata: Metadata = {
  title: 'Карьера с TOMIRIS COLLECTION ASTANA — Tomiris Collection Astana',
  description: 'Откликнитесь на вакансию в TOMIRIS COLLECTION ASTANA. Команда, рост, красивые проекты и быстрый отклик через WhatsApp.',
}

export default function CareerWithTomyrisPage() {
  return <CareerPage />
}
