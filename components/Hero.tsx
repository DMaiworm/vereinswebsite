'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface HeroProps {
  name: string;
  shortName: string | null;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Hero({ name, shortName, logoUrl, tagline, ctaLabel, ctaHref }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Logo
      tl.fromTo(logoRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Vereinsname
      tl.fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );

      // Subtitle
      tl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );

      // Scroll-Indikator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '+=0.3'
      );

      // Scroll-Indicator pulsieren
      gsap.to(scrollRef.current, {
        y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const abbr = shortName || name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

  return (
    <section
      ref={containerRef}
      className="hero-gradient relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Subtile Lichtpunkte */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Logo / Vereins-Avatar */}
        <div ref={logoRef}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${name} Logo`}
              width={120}
              height={120}
              className="rounded-2xl object-contain drop-shadow-2xl"
              priority
            />
          ) : (
            <div
              className="flex h-28 w-28 items-center justify-center rounded-2xl text-3xl font-black tracking-tight shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--club-primary), color-mix(in srgb, var(--club-primary) 70%, var(--club-secondary)))',
                color: 'var(--club-secondary)',
                boxShadow: '0 0 60px color-mix(in srgb, var(--club-primary) 40%, transparent)',
              }}
            >
              {abbr}
            </div>
          )}
        </div>

        {/* Vereinsname */}
        <h1
          ref={headlineRef}
          className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-white sm:text-7xl"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
        >
          {name}
        </h1>

        {/* Trennlinie in Vereinsfarbe */}
        <div
          className="h-1 w-24 rounded-full"
          style={{ background: 'var(--club-secondary)' }}
        />

        <p
          ref={subRef}
          className="max-w-md text-lg text-white/60"
        >
          {tagline ?? 'Offizieller Webauftritt'}
        </p>

        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="label-cap inline-flex items-center gap-3 rounded-sm px-8 py-3.5 transition-all active:scale-95"
            style={{ background: 'var(--club-secondary)', color: 'var(--club-primary)' }}
          >
            {ctaLabel}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        )}
      </div>

      {/* Scroll-Indikator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30 cursor-pointer hover:text-white/60 transition-colors duration-300"
        onClick={() => document.getElementById('abteilungen')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Entdecken</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-60">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="7" y="5" width="2" height="5" rx="1" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
