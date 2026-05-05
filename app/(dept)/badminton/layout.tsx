import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SG Hünstetten – Badminton',
  description: 'Badminton-Abteilung der SG Hünstetten – Erwachsene, Jugend und Leistungssport.',
}

export default function BadmintonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
