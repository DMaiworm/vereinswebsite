import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Grundschulturnen | SG Hünstetten',
}

export default function GrundschulturnenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
