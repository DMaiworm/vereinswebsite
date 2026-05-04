import { CDN_CSS, cdnScript, IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export const metadata = {
  title: 'Tanzfitness | SG Hünstetten',
}

export default function TanzfitnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
