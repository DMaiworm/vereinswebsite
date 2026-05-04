import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = {
  title: 'LadyFit | SG Hünstetten',
}

export default function LadyFitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
