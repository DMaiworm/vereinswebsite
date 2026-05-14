'use client';

import { useState, useEffect } from 'react';

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
}

const ROTATING_WORDS = ['SPORT', 'GEMEINSCHAFT', 'HÜNSTETTEN'];

export default function Hero({ tagline, ctaLabel, ctaHref, heroBildUrl }: HeroProps) {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#223e6d]">
      <style>{`
        @keyframes fade-rotate {
          0%, 10% { opacity: 0; transform: translateY(10px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-rotate { animation: fade-rotate 8s infinite ease-in-out; }
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#052856]/60 to-[#052856]/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24">

        {/* Badge */}
        <span className="inline-block bg-[#fde000] text-[#052856] px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase animate-pulse">
          Seit 1944
        </span>

        {/* Headline */}
        <h1 className="font-display font-black text-6xl md:text-9xl text-white tracking-tighter leading-none mb-4">
          <span className="block">WIR SIND</span>
          <span className="block mt-2">
            <span
              className={`text-[#052856] bg-[#fde000] px-4 py-2 -rotate-1 inline-block whitespace-nowrap transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto mt-8 mb-10">
          {tagline ?? '80 Jahre Tradition, Leidenschaft und Gemeinschaft im Herzen der Region.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="label-cap bg-[#fde000] text-[#052856] px-10 py-5 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl"
            >
              {ctaLabel}
            </a>
          )}
          <a
            href="#abteilungen"
            className="label-cap bg-white/10 border-2 border-white/30 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-white/20 transition-all"
          >
            UNSER VEREIN
          </a>
        </div>
      </div>
    </section>
  );
}
