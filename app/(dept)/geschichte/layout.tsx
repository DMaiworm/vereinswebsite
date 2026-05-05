import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chronik | SG Hünstetten',
}

const CSS = `
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
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  )
}
