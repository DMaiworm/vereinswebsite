import { CDN_CSS, cdnScript } from '@/lib/designBlau'

export const metadata = {
  title: 'Fußball Abteilung | SG Hünstetten',
}

const extraCss = `
  .kinetic-gradient {
    background: radial-gradient(circle at top right, #223e6d 0%, #052856 100%);
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`

export default function FussballLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + extraCss }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
