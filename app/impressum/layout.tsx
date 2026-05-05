import { CDN_CSS, cdnScript, VEREINS_EXTRA_CSS } from '@/lib/designBlau'
import { IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export const metadata = {
  title: 'Impressum & Rechtliches | SG Hünstetten',
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + VEREINS_EXTRA_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
