import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Rücken-Fit | SG Hünstetten',
}

export default function RueckenfitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
