'use client';

import { useState, useEffect } from 'react';
import type { Sponsor } from '@/lib/api';

interface HeroProps {
  name: string;
  shortName: string | null;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroBildUrl?: string | null;
  sponsors?: Sponsor[];
}

const ROTATING_WORDS = ['SPORT', 'GEMEINSCHAFT', 'HÜNSTETTEN'];

export default function Hero({ tagline, ctaLabel, ctaHref, heroBildUrl, sponsors = [] }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sponsorItems = sponsors.length > 0 ? [...sponsors, ...sponsors] : [];

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#223e6d]">
      <style>{`
        @keyframes fade-rotate {
          0%, 10% { opacity: 0; transform: translateY(10px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes hero-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-marquee-track {
          display: flex;
          animation: hero-marquee 30s linear infinite;
          width: max-content;
        }
        .hero-marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Hero background image */}
      {heroBildUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroBildUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,40,86,0.3) 0%, rgba(5,40,86,0.55) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10 px-6 md:px-16 pt-72 pb-16">

        {/* Left: Headline + Tagline */}
        <div className="max-w-2xl">
          <h1 className="font-display font-black text-white tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}>
            <span className="block">WIR SIND</span>
            <span className="block mt-2">
              <span
                className={`text-[#052856] bg-[#fde000] px-4 py-2 -rotate-1 inline-block whitespace-nowrap transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/70 mt-8">
            {tagline ?? '80 Jahre Tradition, Leidenschaft und Gemeinschaft im Herzen der Region.'}
          </p>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-col gap-4 shrink-0">
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="label-cap bg-[#fde000] text-[#052856] px-10 py-5 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl text-center"
            >
              {ctaLabel}
            </a>
          )}
          <a
            href="#abteilungen"
            className="label-cap bg-white/10 border-2 border-white/30 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-white/20 transition-all text-center"
          >
            UNSER VEREIN
          </a>
        </div>
      </div>

      {/* Sponsor marquee – transparent, bottom of hero */}
      {sponsorItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-sm border-t border-white/10 overflow-hidden py-3">
          <div className="hero-marquee-track gap-12 px-8">
            {sponsorItems.map((s, i) => (
              <div key={`${s.id}-${i}`} className="shrink-0 flex items-center justify-center">
                {s.logoWebUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.logoWebUrl}
                    alt={s.firmenname}
                    style={{ maxHeight: '28px', maxWidth: '100px', width: 'auto' }}
                    className="object-contain brightness-0 invert opacity-60"
                  />
                ) : (
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                    {s.firmenname}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
