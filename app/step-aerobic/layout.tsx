import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = {
  title: 'Step-Aerobic | SG Hünstetten',
}

export default function StepAerobicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
