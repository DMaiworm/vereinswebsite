'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Sponsor } from '@/lib/api';

interface SponsorBandProps {
  sponsors?: Sponsor[]
  variant?: 'dark' | 'grey'
}

const FALLBACK: Pick<Sponsor, 'id' | 'firmenname' | 'logoWebUrl' | 'websiteUrl'>[] = [
  { id: '1', firmenname: 'BIOGRUND',   logoWebUrl: null, websiteUrl: null },
  { id: '2', firmenname: 'ROSENBAUM',  logoWebUrl: null, websiteUrl: null },
  { id: '3', firmenname: 'VOLKSBANK',  logoWebUrl: null, websiteUrl: null },
  { id: '4', firmenname: 'SPARKASSE',  logoWebUrl: null, websiteUrl: null },
  { id: '5', firmenname: 'SPORT-ECKE', logoWebUrl: null, websiteUrl: null },
]

export default function SponsorBand({ sponsors = [], variant = 'dark' }: SponsorBandProps) {
  const grey = variant === 'grey'
  const items    = sponsors.length > 0 ? sponsors : FALLBACK
  const doubled  = [...items, ...items]
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!trackRef.current || items.length === 0) return;

    let tween: gsap.core.Tween;
    const el = sectionRef.current;

    const start = () => {
      const dist = trackRef.current!.scrollWidth / 2;
      if (dist === 0) return;
      tween = gsap.to(trackRef.current!, {
        x: -dist,
        duration: dist / 15,   // 15px pro Sekunde
        ease: 'none',
        repeat: -1,
      });
      const pause  = () => tween.pause();
      const resume = () => tween.resume();
      el?.addEventListener('mouseenter', pause);
      el?.addEventListener('mouseleave', resume);
    };

    // Warten bis Bilder geladen sind, damit scrollWidth korrekt ist
    const imgs = trackRef.current.querySelectorAll('img');
    if (imgs.length === 0) {
      start();
    } else {
      let loaded = 0;
      const onLoad = () => { if (++loaded === imgs.length) start(); };
      imgs.forEach(img => {
        if (img.complete) onLoad();
        else img.addEventListener('load', onLoad);
      });
    }

    return () => {
      tween?.kill();
      el?.removeEventListener('mouseenter', () => tween?.pause());
      el?.removeEventListener('mouseleave', () => tween?.resume());
    };
  }, [items.length]);

  const sectionCls = grey
    ? 'bg-white py-6 border-t border-[#e4e2e1]'
    : 'bg-navy-mid py-6 border-t border-white/5'
  const labelCls = grey
    ? 'text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#44474f]/50 mb-5'
    : 'text-center text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-5'
  const itemCls = 'group shrink-0 flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300'
  const imgCls  = grey
    ? 'object-contain grayscale'
    : 'object-contain brightness-0 invert'
  const textCls = grey
    ? 'whitespace-nowrap text-sm font-semibold text-[#44474f]/70'
    : 'whitespace-nowrap text-sm font-semibold text-white/60'

  return (
    <section ref={sectionRef} className={sectionCls}>
      <p className={labelCls}>Starke Partner für den Erfolg</p>
      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track gap-8 px-8">
          {doubled.map((s, i) => {
            const Tag = s.websiteUrl ? 'a' : 'div'
            const linkProps = s.websiteUrl
              ? { href: s.websiteUrl, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Tag
                key={`${s.id}-${i}`}
                {...(linkProps as Record<string, string>)}
                className={itemCls}
                style={{ cursor: s.websiteUrl ? 'pointer' : 'default' }}
              >
                {s.logoWebUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.logoWebUrl}
                    alt={s.firmenname}
                    style={{ maxWidth: '171px', maxHeight: '96px', width: 'auto', height: 'auto' }}
                    className={imgCls}
                  />
                ) : (
                  <span className={textCls}>{s.firmenname}</span>
                )}
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
