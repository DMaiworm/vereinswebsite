import { CDN_CSS, cdnScript } from '@/lib/designBlau'
import { IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export const metadata = {
  title: 'Impressum & Rechtliches | SG Hünstetten',
}

const EXTRA_CSS = `
  .vanguard-slant { transform: skewX(-6deg); }
  .kinetic-rotate { transform: rotate(-2deg); }
  .text-shadow-kinetic { text-shadow: 2px 2px 0px #FDE000; }
  .glass-nav { backdrop-filter: blur(16px); }
`

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + EXTRA_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
