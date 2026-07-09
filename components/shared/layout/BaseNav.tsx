'use client'

import { useEffect, useRef, useState } from 'react'

export interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface BaseNavProps {
  logoUrl?: string | null
  clubName?: string | null
  /** Zeigt den Namen der aktuellen Abteilung als Trigger-Label statt des generischen
   *  "Abteilungen"-Texts. Rein kosmetisch — filtert NICHT den aktuellen Eintrag aus der
   *  Dropdown-Liste heraus (die bleibt immer die vollständigen 8 Abteilungen, siehe S-014).
   *  Auf Kurs-Unterseiten und Vereinsseiten bewusst weglassen (kein Kontext-Hinweis dort). */
  departmentLabel?: string
  navItems?: NavItem[]
  /** Ab mehr als COURSE_OVERFLOW_THRESHOLD Einträgen wandert navItems geschlossen in ein
   *  eigenes "Kurse"-Dropdown statt einzeln inline zu erscheinen. Nur für Abteilungs-
   *  Übersichtsseiten mit Kurslinks (Fitness, Gesundheitssport, Kinderturnen) relevant –
   *  andere Seiten mit >4 navItems (z.B. Mannschaftsseiten) bleiben unverändert inline. */
  groupCoursesIfOverflow?: boolean
  ctaLabel?: string | null
  ctaHref?: string
  homeHref?: string
}

const COURSE_OVERFLOW_THRESHOLD = 4

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
  navItems = [],
  groupCoursesIfOverflow = false,
  ctaLabel = 'Probetraining',
  ctaHref,
  homeHref = '../',
}: BaseNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false)
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false)
  const deptRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)

  const wordmark = composeWordmark(clubName)

  const showCoursesDropdown = groupCoursesIfOverflow && navItems.length > COURSE_OVERFLOW_THRESHOLD
  const inlineNavItems = showCoursesDropdown ? [] : navItems

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

  useEffect(() => {
    if (!coursesOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
        setCoursesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [coursesOpen])

  const ctaButtonClass = 'label-cap text-navy bg-gold px-5 py-2 rounded-sm hover:bg-gold-dim active:scale-95 transition-all text-center whitespace-nowrap'

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="flex items-center justify-between px-6 md:px-10 py-1.5 max-w-screen-2xl mx-auto">

        <div className="flex items-center gap-4 min-w-0">
          <a href={homeHref} className="flex items-center gap-4 no-underline shrink-0">
            {logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={clubName ?? 'Vereinslogo'} className="h-16 w-auto object-contain shrink-0" />
            )}
            <span className="font-display text-base leading-none uppercase whitespace-nowrap">
              <span className="font-black text-gold">{wordmark.prefix}</span>
              <span className="font-semibold text-chalk ml-0.5">{wordmark.rest}</span>
            </span>
          </a>
          <div className="relative hidden xl:block" ref={deptRef}>
            <button
              type="button"
              onClick={() => setDeptOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={deptOpen}
              className="flex items-center gap-1 font-display font-light text-chalk/40 text-base uppercase tracking-wide cursor-pointer hover:text-chalk/70 transition-colors bg-transparent border-0 p-0 whitespace-nowrap"
            >
              {departmentLabel ?? 'Abteilungen'}
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
                  {ABTEILUNGEN.map(a => (
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
        </div>

        <div className="hidden xl:flex items-center gap-8">
          {inlineNavItems.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={item.active
                ? 'label-cap text-gold border-b border-gold pb-0.5 hover:opacity-80 transition-opacity whitespace-nowrap'
                : 'label-cap text-chalk/60 hover:text-chalk transition-colors whitespace-nowrap'
              }
            >
              {item.label}
            </a>
          ))}
          {showCoursesDropdown && (
            <div className="relative" ref={coursesRef}>
              <button
                type="button"
                onClick={() => setCoursesOpen(v => !v)}
                aria-haspopup="true"
                aria-expanded={coursesOpen}
                className="flex items-center gap-1 label-cap text-chalk/60 hover:text-chalk transition-colors bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap"
              >
                Kurse
                <span
                  className="material-symbols-outlined text-base transition-transform"
                  style={{ transform: coursesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {coursesOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="bg-[rgba(5,40,86,0.97)] backdrop-blur-xl border border-white/[0.08] py-1.5 min-w-[220px]">
                    {navItems.map(item => (
                      <a
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-chalk/40 hover:text-chalk hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {ctaLabel && ctaHref && (
            <a href={ctaHref} className={`hidden xl:block ${ctaButtonClass}`}>
              {ctaLabel}
            </a>
          )}
          <button
            className="xl:hidden text-chalk/70 p-1"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menü öffnen"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-navy border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {inlineNavItems.map((item) => (
            <a
              key={`mob-${item.href}-${item.label}`}
              href={item.href}
              className={item.active ? 'label-cap text-gold' : 'label-cap text-chalk/60'}
            >
              {item.label}
            </a>
          ))}

          {showCoursesDropdown && (
            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setMobileCoursesOpen(v => !v)}
                aria-expanded={mobileCoursesOpen}
                className="flex items-center justify-between w-full label-cap text-chalk/60 bg-transparent border-0 p-0"
              >
                Kurse
                <span
                  className="material-symbols-outlined text-base transition-transform"
                  style={{ transform: mobileCoursesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {mobileCoursesOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-2">
                  {navItems.map(item => (
                    <a key={item.href} href={item.href} className="label-cap text-chalk/50">
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setMobileDeptOpen(v => !v)}
              aria-expanded={mobileDeptOpen}
              className="flex items-center justify-between w-full label-cap text-chalk/60 bg-transparent border-0 p-0"
            >
              {departmentLabel ?? 'Abteilungen'}
              <span
                className="material-symbols-outlined text-base transition-transform"
                style={{ transform: mobileDeptOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </button>
            {mobileDeptOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-2">
                {ABTEILUNGEN.map(a => (
                  <a key={a.href} href={a.href} className="label-cap text-chalk/50">
                    {a.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {ctaLabel && ctaHref && (
            <a href={ctaHref} className={`block ${ctaButtonClass} mt-2`}>
              {ctaLabel}
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
