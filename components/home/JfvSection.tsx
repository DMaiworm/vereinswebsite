import { internalHref } from '@/lib/assetPath'

export default function JfvSection() {
  return (
    <section className="py-12 bg-navy noise relative overflow-hidden">

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-4">
        <span
          className="text-outline-chalk font-display font-black uppercase leading-none select-none"
          style={{ fontSize: 'clamp(60px, 14vw, 200px)', letterSpacing: '-0.04em', opacity: 0.06 }}
        >
          JFV
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              <span className="label-cap text-gold">Jugendförderverein</span>
            </div>

            <h2 className="display-giant text-chalk mb-6" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}>
              JFV<br />
              <span className="text-gold">Hünstetten</span>
            </h2>

            <p className="text-chalk/60 text-sm leading-relaxed max-w-md font-body mb-8">
              Der Jugendförderverein JFV Hünstetten bündelt den Jugendfußball der Region. E-, D-, C- und B-Jugend trainieren gemeinsam unter professioneller Betreuung – für Nachwuchs, der Fußball liebt.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.jfv-huenstetten.de"
                target="_blank"
                rel="noopener noreferrer"
                className="label-cap inline-flex items-center gap-2 rounded-sm px-8 py-3 bg-gold text-navy hover:bg-gold-dim active:scale-95 transition-all"
              >
                Zur JFV-Website
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
              <a
                href={internalHref('/fussball')}
                className="label-cap inline-flex items-center gap-2 rounded-sm px-8 py-3 border border-white/20 text-chalk hover:bg-white/10 transition-all"
              >
                Fußball bei der SG
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Right: feature card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 space-y-6">
            {[
              { icon: 'sports_soccer', label: 'E-Jugend', desc: 'Fußball-Spaß für die Kleinsten ab 7 Jahren' },
              { icon: 'sports_soccer', label: 'D-Jugend', desc: 'Technik und Teamspiel für 10–12-Jährige' },
              { icon: 'sports_soccer', label: 'C/B-Jugend', desc: 'Wettkampf und Entwicklung für 12–16-Jährige' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 border-b border-white/8 pb-6 last:border-0 last:pb-0">
                <span className="material-symbols-outlined fill-icon text-gold shrink-0" style={{ fontSize: '20px' }}>{icon}</span>
                <div>
                  <p className="label-cap text-chalk mb-1">{label}</p>
                  <p className="text-chalk/40 text-sm font-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
