import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fußball Abteilung | SG Hünstetten',
}

const CSS = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`

export default function FussballLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  )
}
