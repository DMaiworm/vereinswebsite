import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gesundheitssport | SG Hünstetten',
}

export default function GesundheitssportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
