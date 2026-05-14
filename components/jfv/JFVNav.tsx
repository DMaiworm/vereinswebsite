'use client'

import { useState } from 'react'

interface JFVNavProps {
  logoUrl?: string | null
}

export default function JFVNav({ logoUrl }: JFVNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(83,136,175,0.97)', borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="flex items-center justify-between px-6 md:px-10 py-2 max-w-screen-2xl mx-auto">

        <a href="../" className="flex items-center gap-4 no-underline">
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="JFV Hünstetten" className="h-14 w-auto object-contain" />
          )}
          <span className="font-display text-base leading-none uppercase">
            <span className="font-black text-[#FDE000]">JFV</span>
            <span className="font-semibold text-white ml-0.5">HÜNSTETTEN</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Altersklassen', href: '#altersklassen' },
            { label: 'Highlights',    href: '#highlights' },
            { label: 'FAQ',           href: '#faq' },
          ].map(item => (
            <a key={item.href} href={item.href}
              className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#altersklassen"
            className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#052856] bg-[#FDE000] px-5 py-2 rounded-sm hover:scale-105 transition-transform">
            Probetraining
          </a>
          <button className="md:hidden text-white/70 p-1" onClick={() => setOpen(v => !v)} aria-label="Menü">
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-4" style={{ background: 'rgba(83,136,175,0.97)' }}>
          {[
            { label: 'Altersklassen', href: '#altersklassen' },
            { label: 'Highlights',    href: '#highlights' },
            { label: 'FAQ',           href: '#faq' },
          ].map(item => (
            <a key={item.href} href={item.href} className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              {item.label}
            </a>
          ))}
          <a href="#altersklassen" className="text-[10px] font-bold uppercase tracking-widest text-[#052856] bg-[#FDE000] px-5 py-2 rounded-sm mt-2 text-center">
            Probetraining
          </a>
        </div>
      )}
    </nav>
  )
}
