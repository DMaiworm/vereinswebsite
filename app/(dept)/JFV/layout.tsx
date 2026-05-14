import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jfv',
})

export const metadata: Metadata = {
  title: 'JFV Hünstetten – Jugendfußball',
}

export default function JFVLayout({ children }: { children: React.ReactNode }) {
  return <div className={jakarta.className}>{children}</div>
}
