import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Impressum & Rechtliches | SG Hünstetten',
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
