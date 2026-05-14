import Link from 'next/link';
import type { Department } from '@/lib/api';

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
  beschreibung: 'LadyFit, ManFit, Tanzfitness, Step-Aerobic und Workout – sieben Kurse für alle, die gemeinsam fit bleiben wollen.',
};

const JFV_CARD: Department = {
  id: 'jfv-static',
  name: 'Jugendfußball',
  icon: '⚽',
  beschreibung: 'Vom ersten Ballkontakt bis zur A-Jugend – der JFV Hünstetten fördert junge Talente.',
};

interface AbteilungenGridProps {
  departments: Department[];
}

export default function AbteilungenGrid({ departments }: AbteilungenGridProps) {
  if (departments.length === 0) return null;

  const hasFitness = departments.some((d) => d.name === 'Fitness');
  const cards = [...(hasFitness ? departments : [...departments, FITNESS_CARD]), JFV_CARD];

  return (
    <section id="abteilungen" className="bg-[#cbd5e1] py-10 px-6 text-[#1b1c1c]">

      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#052856] uppercase tracking-[0.3em] text-xs font-bold block mb-4 text-center">
          Unser Verein
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-0 text-center text-[#052856]">
          Abteilungen
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-[1000px] mx-auto">
        {cards.map((dept) => {
          const slug = DEPT_SLUGS[dept.name];
          const label = DEPT_LABELS[dept.name] ?? dept.name;
          const heroPfad = dept.hero_foto_pfad;

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
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#052856] to-[#0a3568]" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#052856]/90 via-[#052856]/30 to-transparent" />

              {/* JFV Logo top-right */}
              {dept.id === 'jfv-static' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/jfv-logo.png" alt="JFV Logo" className="absolute z-10 drop-shadow-lg" style={{ width: '48px', top: '12px', right: '12px' }} />
              )}

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">
                  {label}
                </h3>
                {slug && (
                  <span className="inline-flex items-center gap-2 text-[#fde000] font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all mt-1">
                    Entdecken →
                  </span>
                )}
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
