import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = {
  title: 'SkiGym | SG Hünstetten',
}

export default function SkiGymLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
