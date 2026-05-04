import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = {
  title: 'ManFit | SG Hünstetten',
}

export default function ManFitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
