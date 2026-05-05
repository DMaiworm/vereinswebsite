import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Qi-Gong | SG Hünstetten',
}

export default function QiGongLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
