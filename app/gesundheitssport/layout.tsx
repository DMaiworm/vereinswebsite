import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = {
  title: 'Gesundheitssport | SG Hünstetten',
}

const EXTRA_CSS = `
  .kinetic-gradient {
    background: radial-gradient(circle at top right, #223e6d, #052856);
  }
  .py-xl { padding-top: 5rem; padding-bottom: 5rem }
  .p-lg  { padding: 3rem }
`

export default function GesundheitssportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + EXTRA_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
