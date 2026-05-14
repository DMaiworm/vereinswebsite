export default function ZahlenTraditionSection() {
  return (
    <section className="py-20 bg-mist">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: quote + text */}
          <div>
            <p className="sec-num text-navy/30 mb-6">05 — Über uns</p>
            <h2 className="display-giant text-navy mb-6" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Seit <span style={{ WebkitTextStroke: '2px #052856', color: 'transparent' }}>1944</span>{' '}
              die Heimat des Sports
            </h2>
            <p className="text-ink-soft/60 leading-relaxed font-body max-w-lg mb-6">
              Die SG Hünstetten vereint Menschen, die Sport lieben – von der ersten Turnstunde der Kleinsten bis zum Fußballabend der Veteranen. Über 80 Jahre Tradition, Gemeinschaft und Leidenschaft in einer Gemeinde.
            </p>
            <p className="text-ink-soft/50 leading-relaxed font-body max-w-lg text-sm">
              Ob Gesundheitssport, Badminton, Fußball oder Kinderturnen – bei uns findet jeder den richtigen Platz. Wir sind kein Verein. Wir sind eine Gemeinschaft.
            </p>
          </div>

          {/* Right: stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '80+', label: 'Jahre Tradition', accent: true },
              { value: '300+', label: 'aktive Mitglieder', accent: false },
              { value: '15+', label: 'Kurse pro Woche', accent: false },
              { value: '6', label: 'lizenzierte Trainer', accent: true },
            ].map(({ value, label, accent }) => (
              <div
                key={label}
                className="rounded-2xl bg-white border border-navy/8 p-8 text-center shadow-sm"
                style={accent ? { borderBottom: '3px solid #fde000' } : { borderBottom: '3px solid #052856' }}
              >
                <p
                  className="font-display font-black text-navy mb-1"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.05em' }}
                >
                  {value}
                </p>
                <p className="label-cap text-ink-soft/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
