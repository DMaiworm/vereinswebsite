import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'LadyFit | SG Hünstetten',
}

export default function LadyFitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
