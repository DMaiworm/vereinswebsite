import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Fit-durchs-Jahr | SG Hünstetten',
}

export default function FitDurchsJahrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
