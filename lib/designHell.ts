/**
 * Design "Hell" – weiches Gesundheitssport-Theme für CDN Tailwind v3 Layouts.
 *
 * primary=#001433 (fast-schwarz-navy), primary-container=#052856 (SG-Blau),
 * surface warm-white (#fcf9f8). Wird von allen Gesundheitssport/Wellness-Seiten
 * importiert: pilates, achtsamkeit, manfit, ladyfit, workout, skigym,
 * fitdurchsjahr, tanzfitness, rueckenfit, qi-gong, step-aerobic,
 * gesundheitssport, fitness.
 */

import { CDN_CSS as BASE_CSS } from './brandCss'

// Hell-spezifische Farbwerte – primary dunkler als der Blau-Standard
const HELL_PRIMARY          = '#001433'
const HELL_PRIMARY_CONT     = '#052856'
const HELL_ON_PRIMARY_CONT  = '#7690c4'
const HELL_SURFACE          = '#fcf9f8'

const HELL_OVERRIDES = `
  /* ── Primärfarb-Overrides (überschreiben brandCss.CDN_CSS) ─────────────── */
  .bg-primary                 { background-color: ${HELL_PRIMARY} }
  .bg-primary-container       { background-color: ${HELL_PRIMARY_CONT} }
  .text-primary               { color: ${HELL_PRIMARY} }
  .text-primary-container     { color: ${HELL_PRIMARY_CONT} }
  .text-on-primary-container  { color: ${HELL_ON_PRIMARY_CONT} }
  .text-on-secondary-fixed    { color: #211c00 }
  .border-primary             { border-color: ${HELL_PRIMARY} }
  .border-primary-container   { border-color: ${HELL_PRIMARY_CONT} }
  .bg-primary-fixed           { background-color: #d7e2ff }

  /* ── Opacity-Utilities (CDN v3 kann keine hex-Opacity-Modifikatoren) ───── */
  .bg-primary\\/10            { background-color: rgba(0,20,51,0.1) }
  .from-primary-container\\/60 {
    --tw-gradient-from: rgba(5,40,86,0.6) var(--tw-gradient-from-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5,40,86,0));
  }
  .border-outline-variant\\/10 { border-color: rgba(196,198,208,0.1) }

  /* ── Typographie-Tokens (alle Lexend) ────────────────────────────────── */
  .text-display-lg   { font-size: 48px; line-height: 1.1;  letter-spacing: -0.02em; font-weight: 700 }
  .text-headline-lg  { font-size: 32px; line-height: 1.2;  letter-spacing: -0.01em; font-weight: 600 }
  .text-headline-md  { font-size: 24px; line-height: 1.3;  font-weight: 600 }
  .text-body-lg      { font-size: 18px; line-height: 1.6;  font-weight: 400 }
  .text-body-md      { font-size: 16px; line-height: 1.6;  font-weight: 400 }
  .text-label-lg     { font-size: 14px; line-height: 1.2;  letter-spacing: 0.05em; font-weight: 600 }
  .text-label-sm     { font-size: 12px; line-height: 1.2;  font-weight: 500 }

  .font-display-lg,
  .font-headline-lg,
  .font-headline-md,
  .font-body-lg,
  .font-body-md,
  .font-label-lg,
  .font-label-sm,
  .font-lexend        { font-family: 'Lexend', sans-serif }

  /* ── Spezial-Utilities ────────────────────────────────────────────────── */
  .bg-glass {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.85);
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
`

export const CDN_CSS = BASE_CSS + HELL_OVERRIDES

export const DESIGN_HELL_TW_CONFIG = {
  darkMode: 'class' as const,
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'primary':                    HELL_PRIMARY,
        'primary-container':          HELL_PRIMARY_CONT,
        'on-primary':                 '#ffffff',
        'on-primary-container':       HELL_ON_PRIMARY_CONT,
        'on-primary-fixed':           '#001a40',
        'on-primary-fixed-variant':   '#2b4676',
        'primary-fixed':              '#d7e2ff',
        'primary-fixed-dim':          '#acc7fe',
        'inverse-primary':            '#acc7fe',
        'secondary':                  '#6c5e00',
        'secondary-container':        '#fde000',
        'secondary-fixed':            '#ffe326',
        'secondary-fixed-dim':        '#e1c700',
        'on-secondary':               '#ffffff',
        'on-secondary-container':     '#706300',
        'on-secondary-fixed':         '#211c00',
        'on-secondary-fixed-variant': '#514700',
        'tertiary':                   '#001629',
        'tertiary-container':         '#002b49',
        'tertiary-fixed':             '#cfe5ff',
        'tertiary-fixed-dim':         '#9acbfe',
        'on-tertiary':                '#ffffff',
        'on-tertiary-container':      '#6394c5',
        'on-tertiary-fixed':          '#001d34',
        'on-tertiary-fixed-variant':  '#094a76',
        'surface':                    HELL_SURFACE,
        'surface-dim':                '#dcd9d9',
        'surface-bright':             HELL_SURFACE,
        'surface-variant':            '#e5e2e1',
        'surface-tint':               '#445e8f',
        'surface-container-lowest':   '#ffffff',
        'surface-container-low':      '#f6f3f2',
        'surface-container':          '#f0eded',
        'surface-container-high':     '#eae7e7',
        'surface-container-highest':  '#e5e2e1',
        'on-surface':                 '#1b1c1c',
        'on-surface-variant':         '#44474f',
        'background':                 HELL_SURFACE,
        'on-background':              '#1b1c1c',
        'inverse-surface':            '#303030',
        'inverse-on-surface':         '#f3f0ef',
        'outline':                    '#747780',
        'outline-variant':            '#c4c6d0',
        'error':                      '#ba1a1a',
        'error-container':            '#ffdad6',
        'on-error':                   '#ffffff',
        'on-error-container':         '#93000a',
        // Brand nav (für BaseNav)
        'navy':                       '#052856',
        'gold':                       '#fde000',
        'gold-dim':                   '#e1c700',
        'chalk':                      '#f5f0e8',
      },
      spacing: {
        xl:     '80px',
        lg:     '48px',
        md:     '24px',
        sm:     '12px',
        xs:     '4px',
        base:   '8px',
        gutter: '24px',
      },
      fontFamily: {
        'display-lg':  ['Lexend'],
        'headline-lg': ['Lexend'],
        'headline-md': ['Lexend'],
        'body-lg':     ['Lexend'],
        'body-md':     ['Lexend'],
        'label-lg':    ['Lexend'],
        'label-sm':    ['Lexend'],
        'lexend':      ['Lexend'],
      },
      fontSize: {
        'display-lg':  ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg':     ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md':     ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-lg':    ['14px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm':    ['12px', { lineHeight: '1.2', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        full:    '9999px',
      },
    },
  },
}

export function cdnScript(): string {
  return `tailwind={config:${JSON.stringify(DESIGN_HELL_TW_CONFIG)}};document.write('<scr'+'ipt src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\\/scr'+'ipt>');`
}
