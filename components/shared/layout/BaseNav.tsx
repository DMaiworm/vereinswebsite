'use client'

import { useEffect, useRef, useState } from 'react'

export interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface ParentDepartment {
  label: string
  href: string
  siblings: NavItem[]
}

interface BaseNavProps {
  logoUrl?: string | null
  clubName?: string | null
  departmentLabel?: string
  navItems: NavItem[]
  ctaLabel?: string | null
  ctaHref?: string
  homeHref?: string
  parentDepartment?: ParentDepartment
}

const ABTEILUNGEN = [
  { label: 'Badminton',          href: '../badminton' },
  { label: 'Fitness',            href: '../fitness' },
  { label: 'Fußball',            href: '../fussball' },
  { label: 'Gesundheitssport',   href: '../gesundheitssport' },
  { label: 'Jugendfußball (JFV)',href: '../JFV' },
  { label: 'Kinderturnen',       href: '../kinderturnen' },
  { label: 'Leichtathletik',     href: '../leichtathletik' },
  { label: 'Tischtennis',        href: '../tischtennis' },
]

const VEREINSSEITEN = [
  { label: 'Shop',            href: '../shop' },
  { label: 'Fundgrube',       href: '../fundgrube' },
  { label: 'Rechtliches',     href: '../impressum' },
  { label: 'Chronik',         href: '../geschichte' },
  { label: 'Mitgliedschaft',  href: '../mitgliedschaft' },
  { label: 'Vorstand',        href: '../vorstand' },
  { label: 'Sponsoring',      href: '../sponsoren' },
]

const VEREINSSEITEN_LABELS = new Set(VEREINSSEITEN.map(r => r.label))

function composeWordmark(clubName?: string | null) {
  const full = (clubName ?? 'SG Hünstetten').trim() || 'SG Hünstetten'
  const words = full.split(/\s+/)
  if (words.length > 1) {
    return { prefix: words[0].toUpperCase(), rest: words.slice(1).join(' ').toUpperCase() }
  }
  return { prefix: 'SG', rest: full.toUpperCase() }
}

export default function BaseNav({
  logoUrl,
  clubName,
  departmentLabel,
  navItems,
  ctaLabel = 'Probetraining',
  ctaHref,
  homeHref = '../',
  parentDepartment,
}: BaseNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false)
  const deptRef = useRef<HTMLDivElement>(null)

  const wordmark = composeWordmark(clubName)

  const dropdownList = departmentLabel
    ? VEREINSSEITEN_LABELS.has(departmentLabel)
      ? VEREINSSEITEN.filter(a => a.label !== departmentLabel)
      : ABTEILUNGEN.filter(a => a.label !== departmentLabel)
    : []

  useEffect(() => {
    if (!deptOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [deptOpen])

  const ctaButtonClass = 'label-cap text-navy bg-gold px-5 py-2 rounded-sm hover:bg-gold-dim active:scale-95 transition-all inline-block text-center'

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="flex items-center justify-between px-6 md:px-10 py-1.5 max-w-screen-2xl mx-auto">

        <div className="flex items-center gap-4">
          <a href={homeHref} className="flex items-center gap-4 no-underline">
            {logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={clubName ?? 'Vereinslogo'} className="h-16 w-auto object-contain" />
            )}
            <span className="font-display text-base leading-none uppercase">
              <span className="font-black text-gold">{wordmark.prefix}</span>
              <span className="font-semibold text-chalk ml-0.5">{wordmark.rest}</span>
            </span>
          </a>
          {departmentLabel && (
            <div className="relative hidden sm:block" ref={deptRef}>
              <button
                type="button"
                onClick={() => setDeptOpen(v => !v)}
                aria-haspopup="true"
                aria-expanded={deptOpen}
                className="flex items-center gap-1 font-display font-light text-chalk/40 text-base uppercase tracking-wide cursor-pointer hover:text-chalk/70 transition-colors bg-transparent border-0 p-0"
              >
                {departmentLabel}
                <span
                  className="material-symbols-outlined text-base transition-transform"
                  style={{ transform: deptOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {deptOpen && (
                <div className="absolute left-0 top-full pt-2 z-50">
                  <div className="bg-[rgba(5,40,86,0.97)] backdrop-blur-xl border border-white/[0.08] py-1.5 min-w-[220px]">
                    {parentDepartment && (
                      <>
                        <a
                          href={parentDepartment.href}
                          className="flex items-center gap-1 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold/80 hover:text-gold hover:bg-white/5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">arrow_back</span>
                          {parentDepartment.label}
                        </a>
                        {parentDepartment.siblings.map(s => (
                          <a
                            key={s.href}
                            href={s.href}
                            className="block px-4 py-2 pl-8 text-[10px] font-bold uppercase tracking-widest text-chalk/40 hover:text-chalk hover:bg-white/5 transition-colors"
                          >
                            {s.label}
                          </a>
                        ))}
                        <div className="my-1 border-t border-white/[0.08]" />
                      </>
                    )}
                    {dropdownList.map(a => (
                      <a
                        key={a.href}
                        href={a.href}
                        className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-chalk/40 hover:text-chalk hover:bg-white/5 transition-colors"
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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
          {ctaLabel && ctaHref && (
            <a href={ctaHref} className={`hidden md:block ${ctaButtonClass}`}>
              {ctaLabel}
            </a>
          )}
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

          {departmentLabel && (
            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setMobileDeptOpen(v => !v)}
                aria-expanded={mobileDeptOpen}
                className="flex items-center justify-between w-full label-cap text-chalk/60 bg-transparent border-0 p-0"
              >
                Alle Abteilungen
                <span
                  className="material-symbols-outlined text-base transition-transform"
                  style={{ transform: mobileDeptOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {mobileDeptOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-2">
                  {parentDepartment && (
                    <>
                      <a href={parentDepartment.href} className="label-cap text-gold/80">
                        ← {parentDepartment.label}
                      </a>
                      {parentDepartment.siblings.map(s => (
                        <a key={s.href} href={s.href} className="label-cap text-chalk/50 pl-3">
                          {s.label}
                        </a>
                      ))}
                    </>
                  )}
                  {dropdownList.map(a => (
                    <a key={a.href} href={a.href} className="label-cap text-chalk/50">
                      {a.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {ctaLabel && ctaHref && (
            <a href={ctaHref} className={`${ctaButtonClass} mt-2`}>
              {ctaLabel}
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
