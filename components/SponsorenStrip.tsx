'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import type { Sponsor } from '@/lib/api';

interface SponsorenStripProps {
  sponsors: Sponsor[];
}

export default function SponsorenStrip({ sponsors }: SponsorenStripProps) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const tweenRef    = useRef<gsap.core.Tween | null>(null);

  // Logos doppeln für nahtlosen Loop
  const doubled = [...sponsors, ...sponsors];

  useEffect(() => {
    if (!trackRef.current || sponsors.length === 0) return;

    // Warte bis DOM gerendert, dann Breite berechnen
    const tween = gsap.to(trackRef.current, {
      x: () => -(trackRef.current!.scrollWidth / 2),
      duration: sponsors.length * 4,
      ease: 'none',
      repeat: -1,
    });
    tweenRef.current = tween;

    // Pause on hover
    const el = sectionRef.current;
    const pause  = () => tween.pause();
    const resume = () => tween.resume();
    el?.addEventListener('mouseenter', pause);
    el?.addEventListener('mouseleave', resume);

    return () => {
      tween.kill();
      el?.removeEventListener('mouseenter', pause);
      el?.removeEventListener('mouseleave', resume);
    };
  }, [sponsors.length]);

  if (sponsors.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/5 py-16"
    >
      <div className="mb-8 text-center">
        <p
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: 'var(--club-secondary)' }}
        >
          Unsere Sponsoren
        </p>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track gap-12 px-6">
          {doubled.map((s, i) => (
            <a
              key={`${s.id}-${i}`}
              href={s.website_url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center justify-center opacity-40 transition-opacity duration-300 hover:opacity-90"
              aria-label={s.firmenname}
              style={{ cursor: s.website_url ? 'pointer' : 'default' }}
            >
              {s.logo_web_url ? (
                <Image
                  src={s.logo_web_url}
                  alt={s.firmenname}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="whitespace-nowrap text-sm font-semibold text-white/60">
                  {s.firmenname}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
