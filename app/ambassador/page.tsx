import type { Metadata } from 'next'
import { AmbassadorPage } from '@/components/ambassador-page'

export const metadata: Metadata = {
  title: 'Программа амбассадоров — Tomiris Collection Astana',
  description: 'Станьте амбассадором TOMIRIS COLLECTION ASTANA. Носите украшения, создавайте контент и вдохновляйте сообщество вместе с нами.',
}

export default function AmbassadorRoutePage() {
  return <AmbassadorPage />
}
