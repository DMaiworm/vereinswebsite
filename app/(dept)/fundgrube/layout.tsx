import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fundgrube | SG Hünstetten',
}

export default function FundgrubeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
