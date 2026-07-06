import Link from 'next/link';
import type { Department } from '@/lib/api';
import { asset } from '@/lib/assetPath';

const DEPT_SLUGS: Record<string, string> = {
  'Badminton':           'badminton',
  'Tischtennis':         'tischtennis',
  'Leichtathetik':       'leichtathletik',
  'Leichtathletik':      'leichtathletik',
  'Fußball':             'fussball',
  'Fussball':            'fussball',
  'Fussball - Senioren': 'fussball',
  'Jugendfußball':       'JFV',
  'Gesundheitssport':    'gesundheitssport',
  'Yoga':                'gesundheitssport',
  'Fitness':             'fitness',
};

// Display name overrides
const DEPT_LABELS: Record<string, string> = {
  'Yoga': 'Gesundheitssport',
};

const FITNESS_CARD: Department = {
  id: 'fitness-static',
  name: 'Fitness',
  icon: '💪',
  description: null,
};

const JFV_CARD: Department = {
  id: 'jfv-static',
  name: 'Jugendfußball',
  icon: '⚽',
  description: null,
};

const OUTDOOR_CARD: Department = {
  id: 'outdoor-static',
  name: 'Outdoor',
  icon: '🏕️',
  description: null,
};

const GYMNASTIK_CARD: Department = {
  id: 'gymnastik-static',
  name: 'Gymnastik',
  icon: '🤸',
  description: null,
};

// Fixed display order
const DEPT_ORDER = [
  'Fußball', 'Fussball', 'Fussball - Senioren',
  'Badminton',
  'Tischtennis',
  'Leichtathetik', 'Leichtathletik',
  'Fitness', 'fitness-static',
  'outdoor-static',
  'gymnastik-static',
  'Gesundheitssport', 'Yoga',
  'jfv-static',
];

interface AbteilungenGridProps {
  departments: Department[];
}

export default function AbteilungenGrid({ departments }: AbteilungenGridProps) {
  if (departments.length === 0) return null;

  const hasFitness = departments.some((d) => d.name === 'Fitness');
  const raw = [...(hasFitness ? departments : [...departments, FITNESS_CARD]), OUTDOOR_CARD, GYMNASTIK_CARD, JFV_CARD];

  const sorted = [...raw].sort((a, b) => {
    const ai = DEPT_ORDER.findIndex((k) => k === a.name || k === a.id);
    const bi = DEPT_ORDER.findIndex((k) => k === b.name || k === b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  // Deduplicate by resolved slug (keeps first occurrence)
  const seenSlugs = new Set<string>();
  const cards = sorted.filter((d) => {
    const slug = DEPT_SLUGS[d.name] ?? d.id;
    if (seenSlugs.has(slug)) return false;
    seenSlugs.add(slug);
    return true;
  });

  return (
    <section id="abteilungen" className="bg-[#cbd5e1] py-10 px-6 text-[#1b1c1c]">

      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-[#052856] uppercase tracking-[0.3em] text-xs font-bold block mb-4 text-center">
          Unser Verein
        </span>
        <h2 className="font-display font-extrabold mb-0 text-center text-[#052856]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
          Abteilungen
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-[1000px] mx-auto">
        {cards.map((dept) => {
          const slug = DEPT_SLUGS[dept.name];
          const label = DEPT_LABELS[dept.name] ?? dept.name;
          const heroPfad = dept.heroImageUrl;

          const cardContent = (
            <div
              className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-all duration-300"
              style={{ width: '300px', height: '150px' }}
            >
              {/* Background image or gradient */}
              {heroPfad ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroPfad}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : dept.id === 'jfv-static' ? (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #5388AF 0%, #3e6b8d 100%)' }} />
              ) : dept.id === 'outdoor-static' || dept.id === 'gymnastik-static' ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#374151] to-[#1f2937]" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#052856] to-[#0a3568]" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#052856]/90 via-[#052856]/30 to-transparent" />

              {/* JFV Logo top-right */}
              {dept.id === 'jfv-static' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset('/jfv-logo.png')} alt="JFV Logo" className="absolute z-10 drop-shadow-lg" style={{ width: '48px', top: '12px', right: '12px' }} />
              )}

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">
                  {label}
                </h3>
                {slug ? (
                  <span className="inline-flex items-center gap-2 text-[#fde000] font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all mt-1">
                    Entdecken →
                  </span>
                ) : (dept.id === 'outdoor-static' || dept.id === 'gymnastik-static') ? (
                  <span className="text-white/50 font-bold text-xs uppercase tracking-widest mt-1">Seite folgt</span>
                ) : null}
              </div>
            </div>
          );

          return slug ? (
            <Link key={dept.id} href={`/${slug}`}>
              {cardContent}
            </Link>
          ) : (
            <div key={dept.id}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
