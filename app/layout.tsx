import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import SessionWrapper from '@/components/SessionWrapper'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://speakupforgood.com'),
  title: 'Speak Up For Good - Speaking Coach',
  description: 'Your ideas can change the world — but only if people listen. I help you speak with confidence, clarity, and presence, so your mission is heard, shared, and acted upon.',
  keywords: 'speaking coach, public speaking, confidence, presentation skills, effective altruism',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Speak Up For Good - Speaking Coach',
    description: 'Your ideas can change the world — but only if people listen.',
    images: ['/speak_up_icon_.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <script src="https://cdn.usefathom.com/script.js" data-site="MPVEXNMB" defer></script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <Analytics />
        <GoogleAnalytics gaId="G-SELT48HNN5" />
      </body>
    </html>
  )
}
