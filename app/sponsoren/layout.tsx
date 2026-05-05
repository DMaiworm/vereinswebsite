import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Sponsoring & Partner | SG Hünstetten',
}

export default function SponsorenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
