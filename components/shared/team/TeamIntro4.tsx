import type { Trainer } from '@/lib/api'

interface TeamIntro4Props {
  trainers: Trainer[]
  theme?: 'dark' | 'light'
  rolePrimary?: string
  roleSecondary?: string
  showRecruitingSlot?: boolean
  className?: string
}

export default function TeamIntro4({
  trainers,
  theme = 'light',
  rolePrimary = 'Trainer',
  roleSecondary = 'Co-Trainer',
  showRecruitingSlot = true,
  className = '',
}: TeamIntro4Props) {
  const isDark = theme === 'dark'

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {trainers.map((t) => {
        const role = t.is_primary ? rolePrimary : roleSecondary
        return (
          <div key={t.id} className="group cursor-default">
            <div
              className={`img-zoom aspect-[3/4] rounded-lg overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700 ${
                isDark ? 'bg-navy-mid' : 'bg-mist-mid'
              }`}
            >
              {t.foto_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={`${t.vorname} ${t.nachname}`}
                  className="w-full h-full object-cover object-top"
                  src={t.foto_url}
                />
              )}
            </div>
            <p className="label-cap text-gold mb-1">{role}</p>
            <h4
              className={`font-display font-black text-lg tracking-display ${
                isDark ? 'text-chalk' : 'text-navy'
              }`}
            >
              {t.vorname} {t.nachname}
            </h4>
            {t.email && (
              <a
                href={`mailto:${t.email}`}
                className={`label-cap flex items-center gap-1 mt-2 transition-colors ${
                  isDark ? 'text-chalk/40 hover:text-chalk' : 'text-ink-soft/30 hover:text-navy'
                }`}
              >
                <span className="material-symbols-outlined text-sm">mail</span> Kontakt
              </a>
            )}
          </div>
        )
      })}

      {showRecruitingSlot && (
        <div className="border border-dashed border-navy/20 rounded-lg aspect-[3/4] flex flex-col items-center justify-center text-center p-6 hover:bg-mist-mid transition-colors cursor-pointer group mb-4">
          <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-navy text-3xl">add_circle</span>
          </div>
          <p className="font-display font-black text-navy text-base tracking-display leading-tight mb-1">
            Werde Teil<br />des Teams
          </p>
          <p className="label-cap text-navy/40 mt-2">Wir suchen Trainer</p>
        </div>
      )}
    </div>
  )
}
