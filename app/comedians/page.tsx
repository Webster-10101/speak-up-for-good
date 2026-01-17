import type { Metadata } from 'next'
import ComediansContent from './ComediansContent'

export const metadata: Metadata = {
  title: 'Coaching for Comedians & Performers | Edinburgh + Online | Speak Up For Good',
  description: 'Performance coaching for stand-up comedians - from finding the idea to landing it on stage. Get Edinburgh-ready. Help with material, nerves, delivery, and spontaneity. Free 20-minute taster session.',
  keywords: 'comedian coaching, stand-up comedy coach, Edinburgh Fringe coaching, comedy performance, stage presence, improv confidence, speaking coach Edinburgh',
  openGraph: {
    title: 'Coaching for Comedians & Performers | Speak Up For Good',
    description: 'From finding the idea to landing it on stage. Get Edinburgh-ready. Free 20-minute taster.',
    url: 'https://speakupforgood.com/comedians',
    siteName: 'Speak Up For Good',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching for Comedians & Performers',
    description: 'From finding the idea to landing it on stage. Get Edinburgh-ready.',
  },
  alternates: {
    canonical: 'https://speakupforgood.com/comedians',
  },
}

export default function ComediansPage() {
  return <ComediansContent />
}
