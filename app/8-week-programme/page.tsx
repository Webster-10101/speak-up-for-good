import type { Metadata } from 'next'
import ProgrammeContent from './ProgrammeContent'

export const metadata: Metadata = {
  title: '8-Week Speaking Transformation Programme | Speak Up For Good',
  description: 'Transform how you speak and feel when it matters. 8 weekly coaching sessions covering presence, clarity, storytelling, and authenticity. Reduce performance load. Satisfaction guarantee.',
  keywords: 'speaking transformation, public speaking course, speaking confidence, presentation skills, executive communication, speaking coach, 8 week programme',
  openGraph: {
    title: '8-Week Speaking Transformation Programme | Speak Up For Good',
    description: 'Transform how you speak and feel when it matters. 8 weekly sessions. Satisfaction guarantee.',
    url: 'https://speakupforgood.com/8-week-programme',
    siteName: 'Speak Up For Good',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '8-Week Speaking Transformation Programme',
    description: 'Transform how you speak and feel when it matters. 8 weekly sessions. Satisfaction guarantee.',
  },
  alternates: {
    canonical: 'https://speakupforgood.com/8-week-programme',
  },
}

export default function ProgrammePage() {
  return <ProgrammeContent />
}
