import Link from 'next/link';

interface KursDerWoche {
  name: string;
  kategorie: string;
  motto: string;
  beschreibung: string;
  href: string;
  watermark: string;
}

const KURSE_POOL: KursDerWoche[] = [
  { name: 'LadyFit', kategorie: 'Fitness', motto: 'Bleib in Bewegung', beschreibung: 'Funktionsgymnastik für Frauen jeden Alters – mit Elementen aus Yoga, Wirbelsäulen- und Beckenbodengymnastik. Schwerpunkt ist die Stärkung der Rumpfmuskulatur, Verbesserung der Beweglichkeit und Korrektur von Fehlhaltungen. Schonend für Gelenke, Sehnen und Bänder.', href: '/ladyfit', watermark: 'LADYFIT' },
  { name: 'Qi-Gong', kategorie: 'Gesundheit', motto: 'Tradition', beschreibung: 'Lernen Sie die traditionellen chinesischen Bewegungsformen kennen, die den Energiefluss im Körper harmonisieren und die Selbstheilungskräfte aktivieren. Ein Kurs für alle, die innere Ruhe und Ausgeglichenheit suchen.', href: '/qi-gong', watermark: 'QI-GONG' },
  { name: 'Step-Aerobic', kategorie: 'Fitness', motto: 'Step by Step', beschreibung: 'Gelenkschonendes Herz-Kreislauf-Training auf einer höhenverstellbaren Plattform. Trainiert Bein- und Gesäßmuskulatur, stärkt den Rumpf und steigert Koordination sowie Kondition. Mittleres Niveau – Anfänger willkommen!', href: '/step-aerobic', watermark: 'STEP' },
  { name: 'Rücken-Fit', kategorie: 'Gesundheit', motto: 'Prävention', beschreibung: 'Ihre Wirbelsäule im Fokus. Durch gezielte Mobilisation und Kräftigung der Rückenmuskulatur beugen wir Schmerzen vor und verbessern Ihre Haltung nachhaltig. Ideal für Vielsitzer und aktive Menschen jeden Alters.', href: '/rueckenfit', watermark: 'RÜCKEN' },
  { name: 'Tanzfitness', kategorie: 'Fitness', motto: 'Ästhetik und Ausdauer', beschreibung: 'Die Verbindung aus Tanzästhetik und Fitness-Ausdauer. 60 Minuten Bewegung mit lateinamerikanischen, Pop- und Hip-Hop-Sounds trainiert den ganzen Körper. Für alle Altersklassen – einfach zur Probestunde vorbeikommen!', href: '/tanzfitness', watermark: 'TANZ' },
  { name: 'Workout', kategorie: 'Fitness', motto: 'Spaß an der Bewegung', beschreibung: 'Ausdauer und Kraft gemeinsam zur Musik trainieren – für alle Alters- und Fitnessstufen. Alle Übungen mit dem eigenen Körpergewicht, keine Vorkenntnisse nötig. Hauptsache Spaß! Einfach zum Probetraining vorbeikommen.', href: '/workout', watermark: 'WORKOUT' },
  { name: 'Pilates & BodyART', kategorie: 'Gesundheit', motto: 'Core Strength', beschreibung: 'Kräftigung von innen nach außen. Wir konzentrieren uns auf die tiefliegende Muskulatur, die Körperhaltung und den fließenden Übergang zwischen Kraft und Dehnung. Ein dynamisches Workout für einen starken Core.', href: '/pilates', watermark: 'PILATES' },
];

function pickKurs(): KursDerWoche {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return KURSE_POOL[dayOfYear % KURSE_POOL.length];
}

export default function KursDerWocheSection() {
  const kurs = pickKurs();

  return (
    <section className="bg-navy noise relative overflow-hidden py-20">

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-4">
        <span
          className="text-outline-chalk font-display font-black uppercase leading-none select-none"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)', letterSpacing: '-0.04em', opacity: 0.07 }}
        >
          {kurs.watermark}
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <p className="sec-num text-chalk/40">04 — Kurs der Woche</p>
            </div>

            <span
              className="label-cap mb-4 block rounded-sm px-3 py-1.5 w-fit border"
              style={{ color: '#fde000', borderColor: 'rgba(253,224,0,0.3)' }}
            >
              {kurs.kategorie}
            </span>

            <h2 className="display-giant text-chalk mb-6" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
              {kurs.name.includes(' ') ? (
                <>
                  {kurs.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-gold">{kurs.name.split(' ').slice(-1)}</span>
                </>
              ) : (
                <span className="text-gold">{kurs.name}</span>
              )}
            </h2>

            <p className="label-cap text-gold/60 mb-4 tracking-label">{kurs.motto}</p>

            <p className="text-chalk/60 text-sm leading-relaxed max-w-md font-body mb-8">
              {kurs.beschreibung}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={kurs.href}
                className="label-cap inline-flex items-center gap-2 rounded-sm px-7 py-3 bg-gold text-navy hover:bg-gold-dim active:scale-95 transition-all"
              >
                Kurs entdecken
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/fitness"
                className="label-cap inline-flex items-center gap-2 rounded-sm px-7 py-3 border border-white/20 text-chalk hover:bg-white/10 transition-all"
              >
                Alle Kurse
              </Link>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '15+', label: 'Kurse pro Woche' },
              { value: '300+', label: 'aktive Mitglieder' },
              { value: '80 J.', label: 'Vereinstradition' },
              { value: '6', label: 'lizenzierte Trainer' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-7 text-center"
              >
                <p className="font-display font-black text-gold mb-1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em' }}>
                  {value}
                </p>
                <p className="label-cap text-chalk/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
