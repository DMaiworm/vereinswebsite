import { CDN_CSS, cdnScript, VEREINS_EXTRA_CSS } from '@/lib/designBlau'
import { IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export const metadata = {
  title: 'Chronik | SG Hünstetten',
}

const EXTRA_CSS = `
  .timeline-line::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #052856, #FDE000, #052856);
    opacity: 0.2;
  }
  @media (max-width: 768px) {
    .timeline-line::before { left: 20px; transform: none; }
  }
`

export default function GeschichteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + VEREINS_EXTRA_CSS + EXTRA_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
