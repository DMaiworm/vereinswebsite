import { CDN_CSS, cdnScript } from '@/lib/designBlau'
import { IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export const metadata = {
  title: 'Vorstand | SG Hünstetten',
}

const EXTRA_CSS = `
  .kinetic-slant { transform: rotate(-2deg); }
  .vanguard-gradient { background: linear-gradient(135deg, #052856 0%, #0a408a 100%); }
`

export default function VorstandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + EXTRA_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
