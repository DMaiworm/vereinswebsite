import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Achtsamkeit & Entspannung | SG Hünstetten',
}

export default function AchtsamkeitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
