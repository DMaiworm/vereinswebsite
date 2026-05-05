interface SiteFooterProps {
  logoUrl?: string | null
  departmentLabel?: string
  variant?: 'dark' | 'light'
}

export default function SiteFooter({ logoUrl, departmentLabel, variant = 'dark' }: SiteFooterProps) {
  const dark = variant === 'dark'

  const bg         = dark ? 'bg-navy'              : 'bg-surface-container-low font-body'
  const divider    = dark ? 'border-white/5'        : 'border-[#e4e2e1]'
  const heading    = dark ? 'text-gold'             : 'text-navy'
  const logo1      = dark ? 'text-gold'             : 'text-navy'
  const logo2      = dark ? 'text-chalk'            : 'text-navy'
  const logoEv     = dark ? 'text-gold'             : 'text-[#052856]'
  const body       = dark ? 'text-chalk/60'         : 'text-on-surface-variant'
  const link       = dark ? 'text-chalk/60 hover:text-chalk' : 'text-on-surface hover:text-navy'
  const meta       = dark ? 'text-chalk/40'         : 'text-on-surface-variant'
  const icon       = dark ? 'text-chalk/40 hover:text-chalk' : 'text-on-surface-variant hover:text-navy'
  const inputBg    = dark ? 'bg-white/5 border-white/10 text-chalk placeholder:text-chalk/20 focus:border-gold/50'
                          : 'bg-white border-navy/15 text-navy placeholder:text-navy/30 focus:border-navy/40'

  return (
    <footer className={`${bg} pt-5 pb-6 overflow-hidden relative`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-6">

          {/* Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="SG Hünstetten Logo" className="h-24 w-auto object-contain" />
              )}
              <span className="font-display text-3xl leading-none">
                <span className={`font-black ${logo1} uppercase`}>SG</span>
                <span className={`font-semibold ${logo2} uppercase ml-0.5`}>HÜNSTETTEN</span>
                <span className={`font-light text-sm ${logoEv}`}>E.V.</span>
              </span>
            </div>
            <p className={`${body} max-w-sm leading-relaxed text-sm`}>
              Seit über 80 Jahren die Heimat für Sportbegeisterte in der Region. Tradition trifft Dynamik.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className={`font-display font-black uppercase tracking-widest text-xs ${heading} mb-3`}>Verein</h4>
              <ul className={`space-y-4 ${body} text-sm font-semibold`}>
                {[
                    { label: 'Badminton',        href: '../badminton' },
                    { label: 'Fitness',          href: '../fitness' },
                    { label: 'Fußball',          href: '../fussball' },
                    { label: 'Gesundheitssport', href: '../gesundheitssport' },
                    { label: 'Kinderturnen',     href: '../kinderturnen' },
                    { label: 'Leichtathletik',   href: '../leichtathletik' },
                    { label: 'Tischtennis',      href: '../tischtennis' },
                  ].map(({ label, href }) => (
                  <li key={label}><a className={`${link} transition-colors`} href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`font-display font-black uppercase tracking-widest text-xs ${heading} mb-3`}>Rechtliches</h4>
              <ul className={`space-y-4 ${body} text-sm font-semibold`}>
                {[
                  { label: 'Kontakt',        href: '#kontakt' },
                  { label: 'Impressum',      href: '/impressum' },
                  { label: 'Datenschutz',    href: '#' },
                  { label: 'Mitgliedschaft', href: '#' },
                  { label: 'Vorstand',       href: '/vorstand' },
                  { label: 'Satzung',        href: '#' },
                ].map(({ label, href }) => (
                  <li key={label}><a className={`${link} transition-colors`} href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={`font-display font-black uppercase tracking-widest text-xs ${heading} mb-3`}>Newsletter</h4>
            <p className={`${body} text-sm mb-6`}>Erhalte die neuesten Infos direkt per Mail.</p>
            <div className="flex gap-1.5 w-3/4">
              <input
                className={`${inputBg} border rounded-lg px-3 py-2 text-xs w-full focus:outline-none`}
                placeholder="Deine E-Mail"
                type="email"
              />
              <button className="bg-gold text-navy w-9 h-9 rounded-lg hover:scale-105 transition-transform shrink-0 flex items-center justify-center" type="button">
                <span className="material-symbols-outlined text-xs">send</span>
              </button>
            </div>
          </div>

        </div>

        <div className={`pt-8 border-t ${divider} flex flex-col md:flex-row justify-between items-center gap-6`}>
          <p className={`${meta} text-[10px] font-bold uppercase tracking-[0.2em]`}>
            © 2025 SG Hünstetten{departmentLabel ? ` – ${departmentLabel}` : ''} · 80 Jahre Tradition &amp; Leidenschaft
          </p>
          <div className="flex gap-6">
            <a className={`${icon} transition-colors`} href="#">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
