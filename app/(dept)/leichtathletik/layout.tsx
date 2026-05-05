import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SG Hünstetten – Leichtathletik',
  description: 'Leichtathletik-Abteilung der SG Hünstetten – KiLa Kids, Lauftreff und Early Birds.',
}

export default function AthleticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
