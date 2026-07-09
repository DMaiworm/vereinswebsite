import Link from 'next/link'
import { renderMarkdownInline } from '@/lib/markdown'

interface ZahlenTraditionSectionProps {
  aboutText?: string | null;
  aboutText2?: string | null;
  statsMitglieder?: string | null;
  statsKurseProWoche?: string | null;
  statsLizenziertTrainer?: string | null;
}

export default function ZahlenTraditionSection({
  aboutText,
  aboutText2,
  statsMitglieder,
  statsKurseProWoche,
  statsLizenziertTrainer,
}: ZahlenTraditionSectionProps) {
  const stats = [
    { value: '80+', label: 'Jahre Tradition' },
    { value: statsMitglieder ?? '300+', label: 'Aktive Mitglieder' },
    { value: statsKurseProWoche ?? '15+', label: 'Kurse pro Woche' },
    { value: statsLizenziertTrainer ?? '6', label: 'Lizenzierte Trainer' },
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <h2 className="font-display font-extrabold uppercase mb-6 leading-none text-[#052856]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            Seit{' '}
            <span style={{ WebkitTextStroke: '2px #052856', color: 'transparent' }}>1944</span>
            {' '}die Heimat des Sports
          </h2>
          <p
            className="text-sm text-[#1b1c1c] font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: renderMarkdownInline(aboutText ?? 'Die SG Hünstetten vereint Menschen, die Sport lieben – von der ersten Turnstunde der Kleinsten bis zum Fußballabend der Veteranen. Über 80 Jahre Tradition, Gemeinschaft und Leidenschaft in einer Gemeinde.') }}
          />
          <p
            className="text-sm text-[#44474f] italic"
            dangerouslySetInnerHTML={{ __html: renderMarkdownInline(aboutText2 ?? 'Ob Gesundheitssport, Badminton, Fußball oder Kinderturnen – bei uns findet jeder den richtigen Platz. Wir sind kein Verein. Wir sind eine Gemeinschaft.') }}
          />
        </div>

        {/* Right: stat grid + buttons */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-[#f0eded] p-10 text-center shadow-sm rounded-lg"
              >
                <p className="text-4xl font-display font-extrabold text-[#052856] mb-2">{value}</p>
                <p className="text-[9px] uppercase font-bold tracking-widest text-[#747780]">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link
              href="/geschichte"
              className="label-cap flex-1 text-center px-6 py-3 bg-[#052856] text-white rounded-sm hover:bg-[#0a3568] transition-colors"
            >
              Unsere Geschichte
            </Link>
            <Link
              href="/vorstand"
              className="label-cap flex-1 text-center px-6 py-3 border-2 border-[#052856] text-[#052856] rounded-sm hover:bg-[#052856] hover:text-white transition-colors"
            >
              Das Team im Hintergrund
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
