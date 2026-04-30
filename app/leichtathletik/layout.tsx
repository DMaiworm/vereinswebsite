import type { Metadata } from 'next'
import { Lexend, Plus_Jakarta_Sans } from 'next/font/google'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SG Hünstetten – Leichtathletik',
  description: 'Leichtathletik-Abteilung der SG Hünstetten – KiLa Kids, Lauftreff und Early Birds.',
}

export default function AthleticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />
      <div className={`${lexend.variable} ${jakarta.variable} font-body bg-mist text-ink-soft antialiased`}>
        {children}
      </div>
    </>
  )
}
