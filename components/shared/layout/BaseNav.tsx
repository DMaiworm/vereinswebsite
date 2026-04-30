'use client'

import { useState } from 'react'

export interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface BaseNavProps {
  logoUrl?: string | null
  clubName?: string | null
  departmentLabel?: string
  navItems: NavItem[]
  ctaLabel?: string
  homeHref?: string
}

export default function BaseNav({
  logoUrl,
  clubName,
  departmentLabel,
  navItems,
  ctaLabel = 'Probetraining',
  homeHref = '../',
}: BaseNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="flex items-center justify-between px-6 md:px-10 py-1.5 max-w-screen-2xl mx-auto">

        <a href={homeHref} className="flex items-center gap-4 no-underline">
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={clubName ?? 'Vereinslogo'} className="h-16 w-auto object-contain" />
          )}
          <span className="font-display text-base leading-none uppercase">
            <span className="font-black text-gold">SG</span>
            <span className="font-semibold text-chalk ml-0.5">HÜNSTETTEN</span>
          </span>
          {departmentLabel && (
            <span className="font-display font-light text-chalk/40 text-base uppercase tracking-wide hidden sm:inline">
              {departmentLabel}
            </span>
          )}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={item.active
                ? 'label-cap text-gold border-b border-gold pb-0.5 hover:opacity-80 transition-opacity'
                : 'label-cap text-chalk/60 hover:text-chalk transition-colors'
              }
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="label-cap text-navy bg-gold px-5 py-2 rounded-sm hover:bg-gold-dim active:scale-95 transition-all">
            {ctaLabel}
          </button>
          <button
            className="md:hidden text-chalk/70 p-1"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menü öffnen"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={`mob-${item.href}-${item.label}`}
              href={item.href}
              className={item.active ? 'label-cap text-gold' : 'label-cap text-chalk/60'}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
