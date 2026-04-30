/**
 * Shared design tokens and CSS for CDN Tailwind v3 layouts.
 *
 * Why this exists: Next.js project uses Tailwind v4 (PostCSS build). CDN pages
 * (Tischtennis, Sponsoren, …) load Tailwind v3 from cdn.tailwindcss.com and need
 * the same tokens injected as a plain <style> tag — outside any CSS layer so they
 * beat CDN preflight resets. Everything here is the single source of truth.
 */

// ─── MD3 SG Hünstetten color palette ────────────────────────────────────────
export const MD3_COLORS = {
  primary:                     '#052856',
  'primary-container':         '#223e6d',
  'primary-fixed':             '#d7e2ff',
  'primary-fixed-dim':         '#acc7fe',
  'on-primary':                '#ffffff',
  'on-primary-container':      '#90aae0',
  'on-primary-fixed':          '#001a40',
  'on-primary-fixed-variant':  '#2b4676',
  'inverse-primary':           '#acc7fe',
  secondary:                   '#6c5e00',
  'secondary-container':       '#fde000',
  'secondary-fixed':           '#ffe324',
  'secondary-fixed-dim':       '#e1c700',
  'on-secondary':              '#ffffff',
  'on-secondary-container':    '#706300',
  'on-secondary-fixed':        '#211c00',
  'on-secondary-fixed-variant':'#514700',
  tertiary:                    '#182b39',
  'tertiary-container':        '#2e4150',
  'tertiary-fixed':            '#d1e5f8',
  'tertiary-fixed-dim':        '#b5c9dc',
  'on-tertiary':               '#ffffff',
  'on-tertiary-container':     '#99adbf',
  'on-tertiary-fixed':         '#091d2b',
  'on-tertiary-fixed-variant': '#364958',
  surface:                     '#fbf9f8',
  'surface-dim':               '#dcd9d9',
  'surface-bright':            '#fbf9f8',
  'surface-variant':           '#e4e2e1',
  'surface-tint':              '#445e8f',
  'surface-container-lowest':  '#ffffff',
  'surface-container-low':     '#f6f3f2',
  'surface-container':         '#f0eded',
  'surface-container-high':    '#eae8e7',
  'surface-container-highest': '#e4e2e1',
  'on-surface':                '#1b1c1c',
  'on-surface-variant':        '#44474f',
  'on-background':             '#1b1c1c',
  background:                  '#fbf9f8',
  'inverse-surface':           '#303030',
  'inverse-on-surface':        '#f3f0f0',
  outline:                     '#747780',
  'outline-variant':           '#c4c6d0',
  error:                       '#ba1a1a',
  'error-container':           '#ffdad6',
  'on-error':                  '#ffffff',
  'on-error-container':        '#93000a',
  // Brand nav colors (required for BaseNav)
  navy:                        '#052856',
  gold:                        '#fde000',
  'gold-dim':                  '#e1c700',
  chalk:                       '#f5f0e8',
}

export const MD3_FONT_FAMILY = {
  headline: ['Lexend', 'sans-serif'],
  display:  ['Lexend', 'sans-serif'],
  body:     ['Plus Jakarta Sans', 'sans-serif'],
  label:    ['Plus Jakarta Sans', 'sans-serif'],
  // Ergänzungen für Editorial Redesign (Pilates, etc.) - Bestehende Keys bleiben unberührt
  'display-lg':  ['Lexend', 'sans-serif'],
  'headline-lg': ['Lexend', 'sans-serif'],
  'headline-md': ['Lexend', 'sans-serif'],
  'body-lg':     ['Lexend', 'sans-serif'],
  'body-md':     ['Lexend', 'sans-serif'],
  'label-lg':    ['Lexend', 'sans-serif'],
  'label-sm':    ['Lexend', 'sans-serif'],
}

export const MD3_BORDER_RADIUS = {
  DEFAULT: '0.5rem',
  lg:      '1rem',
  xl:      '1.5rem',
  full:    '9999px',
}

// Neue Definitionen für Schriftgrößen, die bisher in brandCss fehlten
export const MD3_FONT_SIZES = {
  'display-lg':  ['3rem', { lineHeight: '1.2', fontWeight: '700' }],    // 48px
  'headline-lg': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],    // 32px
  'headline-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],  // 24px
  'body-lg':     ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],// 18px
  'body-md':     ['1rem', { lineHeight: '1.5', fontWeight: '400' }],    // 16px
  'label-lg':    ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],// 14px
  'label-sm':    ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],  // 12px
}

// ─── Shared Tailwind CDN config ───────────────────────────────────────────────
export const CDN_TW_CONFIG = {
  darkMode: 'class' as const,
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors:       MD3_COLORS,
      fontFamily:   MD3_FONT_FAMILY,
      borderRadius: MD3_BORDER_RADIUS,
      fontSize:     MD3_FONT_SIZES,
    },
  },
}

// ─── Shared inline CSS for CDN layouts ───────────────────────────────────────
// Rules are outside any @layer so they beat CDN utilities and preflight resets.
export const CDN_CSS = `
  :root {
    --color-primary:                  #052856;
    --color-primary-container:        #223e6d;
    --color-primary-fixed:            #d7e2ff;
    --color-primary-fixed-dim:        #acc7fe;
    --color-on-primary:               #ffffff;
    --color-on-primary-container:     #90aae0;
    --color-on-primary-fixed:         #001a40;
    --color-on-primary-fixed-variant: #2b4676;
    --color-inverse-primary:          #acc7fe;
    --color-secondary:                #6c5e00;
    --color-secondary-container:      #fde000;
    --color-secondary-fixed:          #ffe324;
    --color-secondary-fixed-dim:      #e1c700;
    --color-on-secondary:             #ffffff;
    --color-on-secondary-container:   #706300;
    --color-on-secondary-fixed:       #211c00;
    --color-on-secondary-fixed-variant: #514700;
    --color-tertiary:                 #182b39;
    --color-tertiary-container:       #2e4150;
    --color-tertiary-fixed:           #d1e5f8;
    --color-tertiary-fixed-dim:       #b5c9dc;
    --color-on-tertiary:              #ffffff;
    --color-on-tertiary-container:    #99adbf;
    --color-on-tertiary-fixed:        #091d2b;
    --color-on-tertiary-fixed-variant:#364958;
    --color-surface:                  #fbf9f8;
    --color-surface-dim:              #dcd9d9;
    --color-surface-bright:           #fbf9f8;
    --color-surface-variant:          #e4e2e1;
    --color-surface-tint:             #445e8f;
    --color-surface-container-lowest: #ffffff;
    --color-surface-container-low:    #f6f3f2;
    --color-surface-container:        #f0eded;
    --color-surface-container-high:   #eae8e7;
    --color-surface-container-highest:#e4e2e1;
    --color-on-surface:               #1b1c1c;
    --color-on-surface-variant:       #44474f;
    --color-on-background:            #1b1c1c;
    --color-background:               #fbf9f8;
    --color-inverse-surface:          #303030;
    --color-inverse-on-surface:       #f3f0f0;
    --color-outline:                  #747780;
    --color-outline-variant:          #c4c6d0;
    --color-error:                    #ba1a1a;
    --color-error-container:          #ffdad6;
    --color-on-error:                 #ffffff;
    --color-on-error-container:       #93000a;
  }


  /* MD3 background utilities */
  .bg-primary                   { background-color: #052856 }
  .bg-primary-container         { background-color: #223e6d }
  .bg-secondary                 { background-color: #6c5e00 }
  .bg-secondary-container       { background-color: #fde000 }
  .bg-tertiary                  { background-color: #182b39 }
  .bg-tertiary-container        { background-color: #2e4150 }
  .bg-surface                   { background-color: #fbf9f8 }
  .bg-surface-dim               { background-color: #dcd9d9 }
  .bg-surface-container         { background-color: #f0eded }
  .bg-surface-container-low     { background-color: #f6f3f2 }
  .bg-surface-container-high    { background-color: #eae8e7 }
  .bg-surface-container-highest { background-color: #e4e2e1 }
  .bg-surface-container-lowest  { background-color: #ffffff }
  .bg-white                     { background-color: #ffffff }
  .bg-background                { background-color: #fbf9f8 }
  .bg-outline-variant           { background-color: #c4c6d0 }

  /* MD3 text utilities */
  .text-primary                 { color: #052856 }
  .text-primary-fixed           { color: #d7e2ff }
  .text-secondary               { color: #6c5e00 }
  .text-secondary-container     { color: #fde000 }
  .text-on-primary              { color: #ffffff }
  .text-on-primary-container    { color: #90aae0 }
  .text-on-secondary            { color: #ffffff }
  .text-on-secondary-container  { color: #706300 }
  .text-on-tertiary             { color: #ffffff }
  .text-on-tertiary-container   { color: #99adbf }
  .text-on-surface              { color: #1b1c1c }
  .text-on-surface-variant      { color: #44474f }
  .text-on-background           { color: #1b1c1c }
  .text-outline                 { color: #747780 }
  .text-white                   { color: #ffffff }

  /* MD3 border utilities */
  .border-primary               { border-color: #052856 }
  .border-secondary-container   { border-color: #fde000 }
  .border-outline               { border-color: #747780 }
  .border-outline-variant       { border-color: #c4c6d0 }

  /* Hover utilities (unlayered so they beat CDN preflight on CDN pages) */
  .hover\\:bg-secondary-container:hover   { background-color: #fde000 }
  .hover\\:bg-primary:hover               { background-color: #052856 }
  .hover\\:bg-primary-container:hover     { background-color: #223e6d }
  .hover\\:border-secondary-container:hover { border-color: #fde000 }
  .hover\\:border-primary:hover           { border-color: #052856 }
  .hover\\:text-primary:hover             { color: #052856 }
  .hover\\:text-white:hover               { color: #ffffff }
  .hover\\:text-on-primary:hover          { color: #ffffff }

  /* BaseNav brand utilities */
  .bg-navy                      { background-color: #052856 }
  .bg-navy\\/95                 { background-color: rgba(5,40,86,0.95) }
  .bg-gold                      { background-color: #fde000 }
  .bg-gold-dim                  { background-color: #e1c700 }
  .text-gold                    { color: #fde000 }
  .text-chalk                   { color: #f5f0e8 }
  .text-chalk\\/70              { color: rgba(245,240,232,0.7) }
  .text-chalk\\/60              { color: rgba(245,240,232,0.6) }
  .text-chalk\\/40              { color: rgba(245,240,232,0.4) }
  .text-navy                    { color: #052856 }
  .border-gold                  { border-color: #fde000 }

  /* Editorial Typography Ergänzungen (Lexend basiert) */
  .text-display-lg              { font-size: 3rem; line-height: 1.2; font-weight: 700; }
  .text-headline-lg             { font-size: 2rem; line-height: 1.3; font-weight: 600; }
  .text-headline-md             { font-size: 1.5rem; line-height: 1.4; font-weight: 600; }
  .text-body-lg                 { font-size: 1.125rem; line-height: 1.6; font-weight: 400; }
  .text-body-md                 { font-size: 1rem; line-height: 1.5; font-weight: 400; }
  .text-label-lg                { font-size: 0.875rem; line-height: 1.5; font-weight: 600; }
  .text-label-sm                { font-size: 0.75rem; line-height: 1.5; font-weight: 500; }

  .font-display-lg, .font-headline-lg, .font-headline-md, .font-body-lg, .font-body-md, .font-label-lg, .font-label-sm { 
    font-family: Lexend, sans-serif; 
  }
`

// ─── CDN script snippet (document.write pattern) ─────────────────────────────
// extraThemeExtend is deep-merged into theme.extend so callers can override
// borderRadius etc. without losing the shared colors/fontFamily.
export function cdnScript(extraThemeExtend?: Record<string, unknown>): string {
  const config = {
    ...CDN_TW_CONFIG,
    theme: {
      extend: {
        ...CDN_TW_CONFIG.theme.extend,
        ...extraThemeExtend,
      },
    },
  }
  return `tailwind={config:${JSON.stringify(config)}};document.write('<scr'+'ipt src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\\/scr'+'ipt>');`
}
