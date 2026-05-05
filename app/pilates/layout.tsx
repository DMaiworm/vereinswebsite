import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Pilates & BodyART | SG Hünstetten',
}

export default function PilatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
