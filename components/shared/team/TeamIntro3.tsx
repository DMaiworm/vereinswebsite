import type { Trainer } from '@/lib/api'

interface TeamIntro3Props {
  trainers: Trainer[]
  theme?: 'dark' | 'light'
  rolePrimary?: string
  roleSecondary?: string
  className?: string
}

export default function TeamIntro3({
  trainers,
  theme = 'light',
  rolePrimary = 'Trainer',
  roleSecondary = 'Co-Trainer',
  className = '',
}: TeamIntro3Props) {
  const isDark = theme === 'dark'

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {trainers.map((t) => {
        const role = t.isPrimary ? rolePrimary : roleSecondary
        return (
          <div key={t.id} className="group cursor-default">
            <div
              className={`img-zoom aspect-[3/4] rounded-lg overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700 ${
                isDark ? 'bg-navy-mid' : 'bg-mist-mid'
              }`}
            >
              {t.fotoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={`${t.vorname} ${t.nachname}`}
                  className="w-full h-full object-cover object-top"
                  src={t.fotoUrl}
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
    </div>
  )
}
