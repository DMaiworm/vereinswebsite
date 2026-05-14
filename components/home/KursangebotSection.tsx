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
  const [activeKey, setActiveKey] = useState('fitness');

  const active = KATEGORIEN.find((k) => k.key === activeKey) ?? KATEGORIEN[0];

  return (
    <section id="kursangebot" className="py-20 bg-chalk">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-12">
          <p className="sec-num text-ink-soft/40 mb-3">03 — Kursangebot</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Für jeden das <span className="text-gold" style={{ WebkitTextStroke: '1px #052856' }}>Richtige</span>
            </h2>
            <p className="text-ink-soft/50 text-sm max-w-sm leading-relaxed font-body">
              Wähle deine Kategorie und entdecke alle Kurse und Sportarten der SG Hünstetten.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-navy/10 pb-4">
          {KATEGORIEN.map((kat) => (
            <button
              key={kat.key}
              onClick={() => setActiveKey(kat.key)}
              className={`label-cap px-5 py-2.5 rounded-sm transition-all ${
                kat.key === activeKey
                  ? 'bg-navy text-chalk'
                  : 'text-navy/50 hover:text-navy hover:bg-navy/5'
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
              className="group relative overflow-hidden rounded-2xl border border-navy/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(5,40,86,0.04), transparent 70%)' }}
              />
              <div className="relative">
                <span className="label-cap mb-4 block text-gold">{kurs.motto}</span>
                <h3 className="mb-3 font-display font-black text-navy text-lg tracking-display">{kurs.name}</h3>
                <p className="text-sm leading-relaxed text-ink-soft/50 font-body line-clamp-3">{kurs.beschreibung}</p>
                <div
                  className="mt-5 h-px w-10 transition-all duration-300 group-hover:w-16"
                  style={{ background: '#fde000' }}
                />
                <span className="mt-4 label-cap flex items-center gap-1.5 text-navy/40 group-hover:text-navy transition-colors">
                  Mehr erfahren <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
