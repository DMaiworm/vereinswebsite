import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Mitgliedschaft | SG Hünstetten',
}

export default function MitgliedschaftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
