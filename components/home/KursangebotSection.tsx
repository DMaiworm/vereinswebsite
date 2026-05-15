'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Kurs {
  name: string;
  motto: string;
  beschreibung: string;
  href: string;
}

interface Kategorie {
  key: string;
  label: string;
  kurse: Kurs[];
}

const KATEGORIEN: Kategorie[] = [
  {
    key: 'kinder',
    label: 'Kinder',
    kurse: [
      { name: 'Früh übt sich I', motto: 'Ab 6 Monaten', beschreibung: 'Eltern-Kind-Turnen für die Allerkleinsten. Spielerische Bewegungsförderung, sanfte Übungen und gemeinsame Erlebnisse für Säuglinge und ihre Eltern.', href: '/fruehuebtsich-1' },
      { name: 'Früh übt sich II', motto: '1,5 – 3 Jahre', beschreibung: 'Kinder entdecken ihren Körper durch Rollen, Klettern und Balancieren. Erste soziale Kontakte im Eltern-Kind-Turnen.', href: '/fruehuebtsich-2' },
      { name: 'Kids in Bewegung', motto: '3,5 – 7 Jahre', beschreibung: 'Turnen & Spielen für Kindergartenkinder. Bewegungslandschaften, Spiele und altersgerechte Challenges fördern Koordination und Spaß.', href: '/kids-in-bewegung' },
      { name: 'Grundschulturnen', motto: '6 – 10 Jahre', beschreibung: 'Sport, Spiel & Spaß für Grundschulkinder. Kondition, Teamgeist und Bewegungsfreude stehen im Mittelpunkt.', href: '/grundschulturnen' },
    ],
  },
  {
    key: 'jugend',
    label: 'Jugend',
    kurse: [
      { name: 'JFV Hünstetten – Jugend', motto: 'Fußball für alle Altersklassen', beschreibung: 'Der Jugendförderverein JFV Hünstetten bietet Fußball für E-, D-, C- und B-Jugend. Gemeinschaft, Wettkampf und Spaß am runden Leder.', href: '/fussball' },
      { name: 'Leichtathletik Jugend', motto: 'Laufen, Springen, Werfen', beschreibung: 'Athletik-Training für junge Sportler. Koordination, Schnelligkeit und Technik stehen im Vordergrund – mit regelmäßigen Wettkampfteilnahmen.', href: '/leichtathletik' },
    ],
  },
  {
    key: 'fitness',
    label: 'Fitness',
    kurse: [
      { name: 'LadyFit', motto: 'Bleib in Bewegung', beschreibung: 'Funktionsgymnastik für Frauen jeden Alters – Yoga, Wirbelsäulen- und Beckenbodengymnastik. Schonend für Gelenke, Sehnen und Bänder.', href: '/ladyfit' },
      { name: 'ManFit', motto: 'Man(n) bewegt sich', beschreibung: 'Reine Männergruppe: Funktionsgymnastik mit eigenem Körpergewicht oder Handgeräten, intensives Dehnen und Entspannung.', href: '/manfit' },
      { name: 'Step-Aerobic', motto: 'Step by Step', beschreibung: 'Gelenkschonendes Herz-Kreislauf-Training auf der Step-Plattform. Drei Choreographien, mittleres Niveau – Anfänger willkommen!', href: '/step-aerobic' },
      { name: 'Tanzfitness', motto: 'Ästhetik und Ausdauer', beschreibung: 'Tanzästhetik trifft Fitness. 60 Minuten Bewegung mit lateinamerikanischen, Pop- und Hip-Hop-Sounds. Für alle Altersklassen.', href: '/tanzfitness' },
      { name: 'Workout', motto: 'Spaß an der Bewegung', beschreibung: 'Ausdauer und Kraft zur Musik. Alle Übungen mit dem eigenen Körpergewicht – keine Vorkenntnisse nötig. Hauptsache Spaß!', href: '/workout' },
      { name: 'Fit das ganze Jahr', motto: 'Ganzjährig stark bleiben', beschreibung: 'HIIT, Zirkeltraining, Kraft und Koordination – variantenreiches Ganzkörpertraining für motivierte Sportler beiderlei Geschlechts.', href: '/fitdurchsjahr' },
      { name: 'Fit in die Skisaison', motto: 'Weniger Muskelkater, weniger Verletzungen', beschreibung: 'Skisportmotorisches Training von November bis März: Kraft, Schnellkraft, Koordination und Rumpfstabilität mit HIIT und Zirkeltraining.', href: '/skigym' },
    ],
  },
  {
    key: 'gesundheit',
    label: 'Gesundheit',
    kurse: [
      { name: 'Achtsamkeit & Entspannung', motto: 'Mental Health', beschreibung: 'Bewusste Atemtechniken und sanfte Bewegungsabläufe bauen Stress ab und fördern mentale Klarheit. Perfekt für den Ausgleich im Alltag.', href: '/achtsamkeit' },
      { name: 'Pilates & BodyART', motto: 'Core Strength', beschreibung: 'Kräftigung der tiefliegenden Muskulatur, Körperhaltung und fließende Übergänge zwischen Kraft und Dehnung. Ein starker Core für jeden.', href: '/pilates' },
      { name: 'Rücken-Fit', motto: 'Prävention', beschreibung: 'Gezielte Mobilisation und Kräftigung der Rückenmuskulatur. Beugt Schmerzen vor und verbessert die Haltung – ideal für Vielsitzer.', href: '/rueckenfit' },
      { name: 'Qi-Gong', motto: 'Tradition', beschreibung: 'Traditionelle chinesische Bewegungsformen harmonisieren den Energiefluss und aktivieren die Selbstheilungskräfte des Körpers.', href: '/qi-gong' },
    ],
  },
  {
    key: 'ballsport',
    label: 'Ballsport',
    kurse: [
      { name: 'Badminton', motto: 'Speed & Tradition', beschreibung: 'Ob Anfänger oder Vereinsspieler – schnelle Ballwechsel, gute Stimmung und gemeinsamer Sport in der Halle. Hobbyrunde und Wettkampf.', href: '/badminton' },
      { name: 'Tischtennis', motto: 'Schnell & Präzise', beschreibung: 'Tischtennis begeistert Jung und Alt gleichermaßen. Unser Verein spielt in der Bezirksliga und bietet Trainingszeiten für alle Niveaus.', href: '/tischtennis' },
      { name: 'Fußball', motto: 'Tradition seit 1944', beschreibung: 'Fußball verbindet – 1. Mannschaft, Reserve und Alte Herren. Für alle, die das runde Leder und den Teamgeist lieben.', href: '/fussball' },
    ],
  },
];

export default function KursangebotSection() {
  const [activeKey, setActiveKey] = useState('kinder');

  const active = KATEGORIEN.find((k) => k.key === activeKey) ?? KATEGORIEN[0];

  return (
    <section id="kursangebot" className="py-12 bg-[#052856]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display font-extrabold uppercase leading-none text-white" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            Für jeden das{' '}
            <br />
            <span style={{ WebkitTextStrokeWidth: '2px', WebkitTextStrokeColor: '#fde000', color: '#fde000' }}>
              RICHTIGE ANGEBOT
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-8">
          {KATEGORIEN.map((kat) => (
            <button
              key={kat.key}
              onClick={() => setActiveKey(kat.key)}
              className={`text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-lg transition-colors ${
                kat.key === activeKey
                  ? 'bg-[#fde000] text-[#052856]'
                  : 'text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {kat.label}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.kurse.map((kurs) => (
            <Link
              key={kurs.name}
              href={kurs.href}
              className="p-8 flex flex-col h-full rounded-lg bg-white hover:shadow-lg transition-shadow"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5388AF' }}>
                {kurs.motto}
              </span>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#052856' }}>{kurs.name}</h3>
              <p className="text-sm mb-10 leading-relaxed line-clamp-3" style={{ color: '#1b1c1c' }}>{kurs.beschreibung}</p>
              <span className="mt-auto text-[10px] font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: '#052856' }}>
                Mehr erfahren
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
