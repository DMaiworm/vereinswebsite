import { CDN_CSS, cdnScript } from '@/lib/designBlau'

export const metadata = {
  title: 'Tischtennis Abteilung | SG Hünstetten',
}

export default function TischtennisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
