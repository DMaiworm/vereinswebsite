import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Früh übt sich (I) | SG Hünstetten',
}

export default function FruehUebtSich1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
