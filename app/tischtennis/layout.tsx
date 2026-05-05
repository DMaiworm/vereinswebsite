import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tischtennis Abteilung | SG Hünstetten',
}

export default function TischtennisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
