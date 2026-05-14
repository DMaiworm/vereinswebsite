export default function ZahlenTraditionSection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <span className="text-[9px] text-[#747780] font-bold uppercase tracking-widest mb-4 block">
            05 — Über uns
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-extrabold uppercase italic mb-10 leading-none text-[#052856]">
            Seit{' '}
            <span style={{ WebkitTextStroke: '2px #052856', color: 'transparent' }}>1944</span>
            {' '}die Heimat des Sports
          </h2>
          <p className="text-sm text-[#1b1c1c] font-bold mb-6">
            Die SG Hünstetten vereint Menschen, die Sport lieben – von der ersten Turnstunde der Kleinsten bis zum Fußballabend der Veteranen. Über 80 Jahre Tradition, Gemeinschaft und Leidenschaft in einer Gemeinde.
          </p>
          <p className="text-sm text-[#44474f] italic">
            Ob Gesundheitssport, Badminton, Fußball oder Kinderturnen – bei uns findet jeder den richtigen Platz. Wir sind kein Verein. Wir sind eine Gemeinschaft.
          </p>
        </div>

        {/* Right: stat grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '80+', label: 'Jahre Tradition' },
            { value: '300+', label: 'Aktive Mitglieder' },
            { value: '15+', label: 'Kurse pro Woche' },
            { value: '6', label: 'Lizenzierte Trainer' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#f0eded] p-10 text-center shadow-sm rounded-lg"
            >
              <p className="text-4xl font-display font-extrabold text-[#052856] mb-2">{value}</p>
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#747780]">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
