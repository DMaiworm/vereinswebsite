'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Department } from '@/lib/api';

const DEPT_SLUGS: Record<string, string> = {
  'Badminton':           'badminton',
  'Tischtennis':         'tischtennis',
  'Leichtathetik':       'leichtathletik',
  'Leichtathletik':      'leichtathletik',
  'Fußball':             'fussball',
  'Fussball':            'fussball',
  'Fussball - Senioren': 'fussball',
  'Gesundheitssport':    'gesundheitssport',
  'Yoga':                'gesundheitssport',
  'Fitness':             'fitness',
};

// Display name overrides
const DEPT_LABELS: Record<string, string> = {
  'Yoga': 'Gesundheitssport',
};

// One-paragraph description overrides (keeps cards uniform)
const DEPT_DESC: Record<string, string> = {
  'Badminton':      'Ob Anfänger oder Vereinsspieler – bei uns findest du den passenden Rahmen für schnelle Ballwechsel, gute Stimmung und gemeinsamen Sport.',
  'Tischtennis':    'Schnell, präzise und für alle Altersklassen geeignet. Unser Tischtennissport begeistert Jung und Alt gleichermaßen.',
  'Leichtathletik': 'Laufen, Springen, Werfen – Leichtathletik ist der Ursprung des Sports. Trainiere mit uns Technik, Kraft und Ausdauer.',
  'Leichtathetik':  'Laufen, Springen, Werfen – Leichtathletik ist der Ursprung des Sports. Trainiere mit uns Technik, Kraft und Ausdauer.',
  'Fußball':        'Fußball verbindet – in unserem Verein spielen Kinder, Jugendliche und Erwachsene gemeinsam für den Sport und die Gemeinschaft.',
  'Fussball':       'Fußball verbindet – in unserem Verein spielen Kinder, Jugendliche und Erwachsene gemeinsam für den Sport und die Gemeinschaft.',
  'Fussball - Senioren': 'Fußball verbindet – in unserem Verein spielen Kinder, Jugendliche und Erwachsene gemeinsam für den Sport und die Gemeinschaft.',
  'Gesundheitssport': 'Pilates, Qi-Gong, Rücken-Fit und mehr – unsere Gesundheitskurse stärken Körper und Geist, schonend und nachhaltig.',
  'Yoga':           'Pilates, Qi-Gong, Rücken-Fit und mehr – unsere Gesundheitskurse stärken Körper und Geist, schonend und nachhaltig.',
  'Fitness':        'LadyFit, ManFit, Tanzfitness, Step-Aerobic und Workout – sieben Kurse für alle, die gemeinsam fit bleiben wollen.',
};

const FITNESS_CARD: Department = {
  id: 'fitness-static',
  name: 'Fitness',
  icon: '💪',
  beschreibung: DEPT_DESC['Fitness'],
};

gsap.registerPlugin(ScrollTrigger);

interface AbteilungenGridProps {
  departments: Department[];
}

export default function AbteilungenGrid({ departments }: AbteilungenGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dept-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
      });

      gsap.from('.dept-headline', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (departments.length === 0) return null;

  const hasFitness = departments.some((d) => d.name === 'Fitness');
  const cards = hasFitness ? departments : [...departments, FITNESS_CARD];

  return (
    <section id="abteilungen" ref={sectionRef} className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">

        <div className="dept-headline mb-12 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--club-secondary)' }}
          >
            Unser Verein
          </p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">Abteilungen</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((dept) => {
            const slug = DEPT_SLUGS[dept.name];
            const label = DEPT_LABELS[dept.name] ?? dept.name;
            const desc = DEPT_DESC[dept.name] ?? dept.beschreibung;
            const Wrapper = slug ? Link : 'div';
            const wrapperProps = slug ? { href: `/${slug}` } : {};
            return (
            <Wrapper
              key={dept.id}
              {...(wrapperProps as Record<string, string>)}
              className="dept-card group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.06]"
            >
              {/* Hover-Glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--club-primary) 15%, transparent), transparent 70%)',
                }}
              />

              <div className="relative z-10">
                {dept.icon && (
                  <span className="mb-4 block text-4xl">{dept.icon}</span>
                )}
                <h3 className="mb-2 text-xl font-bold text-white">{label}</h3>
                {desc && (
                  <p className="text-sm leading-relaxed text-white/50">{desc}</p>
                )}
                <div
                  className="mt-6 h-px w-12 transition-all duration-300 group-hover:w-20"
                  style={{ background: 'var(--club-secondary)' }}
                />
              </div>
            </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
