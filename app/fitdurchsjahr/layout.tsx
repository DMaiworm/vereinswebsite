import { CDN_CSS } from '@/lib/brandCss'

// Pilates uses primary: #001433 and primary-container: #052856 — opposite of the shared palette.
// These unlayered overrides sit after CDN_CSS so they win the source-order cascade.
const PILATES_OVERRIDES = `
  .bg-primary                 { background-color: #001433 }
  .bg-primary-container       { background-color: #052856 }
  .text-primary               { color: #001433 }
  .text-primary-container     { color: #052856 }
  .text-on-primary-container  { color: #7690c4 }
  .text-on-secondary-fixed    { color: #211c00 }
  .border-primary-container   { border-color: #052856 }
  .bg-primary-fixed           { background-color: #d7e2ff }

  /* Font size tokens (all Lexend per design spec) */
  .text-display-lg   { font-size: 48px; line-height: 1.1;  letter-spacing: -0.02em; font-weight: 700 }
  .text-headline-lg  { font-size: 32px; line-height: 1.2;  letter-spacing: -0.01em; font-weight: 600 }
  .text-headline-md  { font-size: 24px; line-height: 1.3;  font-weight: 600 }
  .text-body-lg      { font-size: 18px; line-height: 1.6;  font-weight: 400 }
  .text-body-md      { font-size: 16px; line-height: 1.6;  font-weight: 400 }
  .text-label-lg     { font-size: 14px; line-height: 1.2;  letter-spacing: 0.05em; font-weight: 600 }
  .text-label-sm     { font-size: 12px; line-height: 1.2;  font-weight: 500 }

  /* Font family tokens — all Lexend per design spec */
  .font-display-lg,
  .font-headline-lg,
  .font-headline-md,
  .font-body-lg,
  .font-body-md,
  .font-label-lg,
  .font-label-sm,
  .font-lexend        { font-family: 'Lexend', sans-serif }

  .bg-glass {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.85);
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
`

const pilatesTwConfig = JSON.stringify({
  darkMode: 'class',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'on-primary-fixed':           '#001a40',
        'surface-tint':               '#445e8f',
        'surface-container':          '#f0eded',
        'surface-variant':            '#e5e2e1',
        'primary-fixed':              '#d7e2ff',
        'surface-container-high':     '#eae7e7',
        'on-tertiary':                '#ffffff',
        'secondary-fixed':            '#ffe326',
        'inverse-surface':            '#303030',
        'primary-fixed-dim':          '#acc7fe',
        'error-container':            '#ffdad6',
        'error':                      '#ba1a1a',
        'surface-container-low':      '#f6f3f2',
        'secondary-fixed-dim':        '#e1c700',
        'on-surface':                 '#1b1c1c',
        'inverse-primary':            '#acc7fe',
        'on-tertiary-fixed':          '#001d34',
        'surface-bright':             '#fcf9f8',
        'outline-variant':            '#c4c6d0',
        'secondary-container':        '#fde000',
        'on-error':                   '#ffffff',
        'tertiary':                   '#001629',
        'surface-dim':                '#dcd9d9',
        'on-error-container':         '#93000a',
        'tertiary-fixed':             '#cfe5ff',
        'surface':                    '#fcf9f8',
        'on-secondary-fixed':         '#211c00',
        'background':                 '#fcf9f8',
        'on-secondary-fixed-variant': '#514700',
        'on-secondary-container':     '#706300',
        'on-surface-variant':         '#44474f',
        'secondary':                  '#6c5e00',
        'inverse-on-surface':         '#f3f0ef',
        'on-background':              '#1b1c1c',
        'on-secondary':               '#ffffff',
        'primary-container':          '#052856',
        'surface-container-lowest':   '#ffffff',
        'on-primary-fixed-variant':   '#2b4676',
        'on-tertiary-container':      '#6394c5',
        'on-primary':                 '#ffffff',
        'outline':                    '#747780',
        'on-primary-container':       '#7690c4',
        'primary':                    '#001433',
        'tertiary-container':         '#002b49',
        'tertiary-fixed-dim':         '#9acbfe',
        'surface-container-highest':  '#e5e2e1',
        'on-tertiary-fixed-variant':  '#094a76',
      },
      spacing: {
        xl:             '80px',
        lg:             '48px',
        md:             '24px',
        sm:             '12px',
        xs:             '4px',
        base:           '8px',
        gutter:         '24px',
      },
      fontFamily: {
        'body-md':    ['Lexend'],
        'body-lg':    ['Lexend'],
        'label-sm':   ['Lexend'],
        'headline-md':['Lexend'],
        'headline-lg':['Lexend'],
        'label-lg':   ['Lexend'],
        'display-lg': ['Lexend'],
        'lexend':     ['Lexend'],
      },
      fontSize: {
        'body-md':    ['16px', { lineHeight: '1.6',  fontWeight: '400' }],
        'body-lg':    ['18px', { lineHeight: '1.6',  fontWeight: '400' }],
        'label-sm':   ['12px', { lineHeight: '1.2',  fontWeight: '500' }],
        'headline-md':['24px', { lineHeight: '1.3',  fontWeight: '600' }],
        'headline-lg':['32px', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-lg':   ['14px', { lineHeight: '1.2',  letterSpacing: '0.05em',  fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        full:    '9999px',
      },
    },
  },
})

export const metadata = {
  title: 'Fit-durchs-Jahr | SG Hünstetten',
}

export default function FitDurchsJahrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <style dangerouslySetInnerHTML={{ __html: PILATES_OVERRIDES }} />
      <script dangerouslySetInnerHTML={{
        __html: `tailwind={config:${pilatesTwConfig}};document.write('<scr'+'ipt src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\\/scr'+'ipt>');`,
      }} />
      {children}
    </>
  )
}
