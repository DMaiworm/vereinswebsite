import type { Trainer } from '@/lib/api'

interface TeamIntro2Props {
  trainers: Trainer[]
  theme?: 'dark' | 'light'
  rolePrimary?: string
  roleSecondary?: string
  className?: string
}

export default function TeamIntro2({
  trainers,
  theme = 'light',
  rolePrimary = 'Trainer',
  roleSecondary = 'Co-Trainer',
  className = '',
}: TeamIntro2Props) {
  const isDark = theme === 'dark'

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {trainers.map((t) => {
        const role = t.is_primary ? rolePrimary : roleSecondary
        return (
          <div
            key={t.id}
            className={`rounded-lg p-7 flex gap-6 items-center transition-colors ${
              isDark
                ? 'bg-navy-mid/30 border border-white/10'
                : 'bg-chalk border border-wire/30 hover:border-navy/20'
            }`}
          >
            <div
              className={`w-20 h-20 rounded-md overflow-hidden shrink-0 ring-1 ring-gold/20 ${
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
            <div>
              <p className="label-cap text-gold mb-1.5">{role}</p>
              <h3
                className={`font-display font-black text-xl tracking-display mb-2 ${
                  isDark ? 'text-chalk' : 'text-navy'
                }`}
              >
                {t.vorname} {t.nachname}
              </h3>
              {t.email && (
                <a
                  href={`mailto:${t.email}`}
                  className={`label-cap flex items-center gap-1.5 transition-colors ${
                    isDark ? 'text-chalk/40 hover:text-chalk' : 'text-ink-soft/40 hover:text-navy'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">mail</span> Kontakt
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
