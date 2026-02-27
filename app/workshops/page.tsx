import type { Metadata } from 'next'
import WorkshopsContent from './WorkshopsContent'

export const metadata: Metadata = {
  title: 'Speaking Workshops for Teams | Speak Up For Good',
  description: 'Interactive speaking workshops for teams. Build confidence, clarity, and presence across your organisation. Half-day, full-day, and lunch-and-learn formats available.',
  keywords: 'team speaking workshop, corporate speaking training, team communication, presentation skills workshop, speaking confidence team, group speaking coaching',
  openGraph: {
    title: 'Speaking Workshops for Teams | Speak Up For Good',
    description: 'Interactive speaking workshops for teams. Build confidence, clarity, and presence across your organisation.',
    url: 'https://speakupforgood.com/workshops',
    siteName: 'Speak Up For Good',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaking Workshops for Teams | Speak Up For Good',
    description: 'Interactive speaking workshops for teams. Build confidence, clarity, and presence across your organisation.',
  },
  alternates: {
    canonical: 'https://speakupforgood.com/workshops',
  },
}

export default function WorkshopsPage() {
  return <WorkshopsContent />
}
