import { CDN_CSS, cdnScript, MD3_COLORS } from '@/lib/brandCss'

export const metadata = {
  title: 'Gesundheitssport | SG Hünstetten',
}

// This design uses primary=#001433 (darker than shared #052856)
const GS_COLORS = { ...MD3_COLORS, primary: '#001433', 'primary-container': '#052856' }

const extraCss = `
  /* Gesundheitssport primary override (design uses #001433) */
  .text-primary                     { color: #001433 }
  .bg-primary                       { background-color: #001433 }
  .border-primary                   { border-color: #001433 }

  /* Opacity variants — CDN v3 can't resolve hex opacity modifiers */
  .bg-primary\\/10                  { background-color: rgba(0,20,51,0.1) }
  .from-primary-container\\/60      {
    --tw-gradient-from: rgba(5,40,86,0.6) var(--tw-gradient-from-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5,40,86,0));
  }
  .border-outline-variant\\/10      { border-color: rgba(196,198,208,0.1) }

  /* Custom fontSize/fontFamily tokens from design config */
  .text-display-lg  { font-size: 48px; line-height: 1.1; letter-spacing: -0.02em; font-weight: 700 }
  .text-body-lg     { font-size: 18px; line-height: 1.6; font-weight: 400 }
  .text-label-lg    { font-size: 14px; line-height: 1.2; letter-spacing: 0.05em; font-weight: 600 }
  .font-display-lg, .font-body-lg, .font-label-lg { font-family: 'Lexend', sans-serif }

  /* Non-standard spacing tokens used in design */
  .py-xl { padding-top: 5rem; padding-bottom: 5rem }
  .p-lg  { padding: 3rem }

  .kinetic-gradient {
    background: radial-gradient(circle at top right, #223e6d, #052856);
  }
`

export default function GesundheitssportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS + extraCss }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript({ colors: GS_COLORS }) }} />
      {children}
    </>
  )
}
