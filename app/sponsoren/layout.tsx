import { CDN_CSS, cdnScript } from '@/lib/brandCss'

export const metadata = {
  title: 'Sponsoring & Partner | SG Hünstetten',
}

// Page-specific additions on top of shared CDN_CSS
const extraCss = `
  .kinetic-slant      { transform: rotate(-2deg); }
  .vanguard-gradient  { background: linear-gradient(135deg, #052856 0%, #0a408a 100%); }
  .skew-x-negative    { transform: skewX(-12deg); }
  .skew-x-negative > * { transform: skewX(12deg); }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar       { -ms-overflow-style: none; scrollbar-width: none; }
`

export default function SponsorenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + extraCss }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript({
        // Sponsoren uses a tighter border-radius scale than the MD3 default
        borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
      }) }} />
      {children}
    </>
  )
}
