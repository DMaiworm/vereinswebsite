import type { Trainer } from '@/lib/api'

interface TeamIntro1Props {
  trainers: Trainer[]
  theme?: 'dark' | 'light'
  rolePrimary?: string
  roleSecondary?: string
  className?: string
}

export default function TeamIntro1({
  trainers,
  theme = 'dark',
  rolePrimary = 'Trainer',
  roleSecondary = 'Co-Trainer',
  className = '',
}: TeamIntro1Props) {
  const t = trainers[0]
  if (!t) return null
  const isDark = theme === 'dark'
  const role = t.isPrimary ? rolePrimary : roleSecondary

  return (
    <div
      className={`rounded-lg p-8 flex gap-7 items-start ${
        isDark
          ? 'border border-white/10 bg-navy-mid/30'
          : 'bg-chalk border border-wire/30 hover:border-navy/20 transition-colors'
      } ${className}`}
    >
      <div
        className={`w-28 h-28 rounded-md overflow-hidden shrink-0 ring-1 ring-gold/20 ${
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

      <div className="flex-1 min-w-0">
        <p className="label-cap text-gold mb-2">{role}</p>
        <h3
          className={`font-display font-black text-2xl tracking-display mb-3 ${
            isDark ? 'text-chalk' : 'text-navy'
          }`}
        >
          {t.vorname} {t.nachname}
        </h3>
        {t.bio && (
          <p
            className={`text-sm leading-relaxed mb-5 line-clamp-4 ${
              isDark ? 'text-chalk/50' : 'text-ink-soft/60'
            }`}
          >
            {t.bio}
          </p>
        )}
        <div className={`rule mb-5 ${isDark ? 'bg-white' : 'bg-navy/10'}`} />
        {t.email && (
          <a
            href={`mailto:${t.email}`}
            className={`label-cap flex items-center gap-2 transition-colors ${
              isDark ? 'text-chalk/50 hover:text-chalk' : 'text-ink-soft/40 hover:text-navy'
            }`}
          >
            <span className="material-symbols-outlined text-base">mail</span> Kontakt
          </a>
        )}
      </div>
    </div>
  )
}
