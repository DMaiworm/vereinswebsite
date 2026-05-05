import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Kids in Bewegung | SG Hünstetten',
}

export default function KidsInBewegungLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
