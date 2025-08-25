import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Speak Up For Good - Speaking Coach',
  description: 'Your ideas can change the world — but only if people listen. I help you speak with confidence, clarity, and presence, so your mission is heard, shared, and acted upon.',
  keywords: 'speaking coach, public speaking, confidence, presentation skills, effective altruism',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
} 