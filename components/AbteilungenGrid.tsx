'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Department } from '@/lib/api';

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
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.dept-headline', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (departments.length === 0) return null;

  return (
    <section ref={sectionRef} className="px-6 py-24 sm:py-32">
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
          {departments.map((dept) => (
            <div
              key={dept.id}
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
                <h3 className="mb-2 text-xl font-bold text-white">{dept.name}</h3>
                {dept.beschreibung && (
                  <p className="text-sm leading-relaxed text-white/50">{dept.beschreibung}</p>
                )}
                <div
                  className="mt-6 h-px w-12 transition-all duration-300 group-hover:w-20"
                  style={{ background: 'var(--club-secondary)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
