import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Vorstand | SG Hünstetten',
}

export default function VorstandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
