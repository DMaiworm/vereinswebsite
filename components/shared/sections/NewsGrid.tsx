// ── MD3 variant types ─────────────────────────────────────────────────────────

export interface NewsPostMd3 {
  src: string
  alt: string
  title: string
  likes: number
  tag: string
  icon: string  // material symbol name
}

export interface SocialLinkMd3 {
  platform: 'instagram' | 'facebook' | 'whatsapp'
  handle: string
  href?: string
}

interface NewsGridMd3Props {
  variant: 'md3'
  title?: string
  departmentLabel?: string
  posts: NewsPostMd3[]
  socialLinks?: SocialLinkMd3[]
}

// ── Classic variant types ──────────────────────────────────────────────────────

export interface SocialHandle {
  platform: 'instagram' | 'facebook'
  name: string
  href?: string
  subtext?: string
}

export interface NewsCard {
  src: string
  category: string
  title: string
  likes?: number
}

interface NewsGridClassicProps {
  variant?: 'classic'
  sectionNum?: string
  theme?: 'dark' | 'light'
  bigCard: NewsCard
  secondCard: NewsCard
  thirdCard: NewsCard
  socialHandles: SocialHandle[]
}

type NewsGridProps = NewsGridMd3Props | NewsGridClassicProps

export default function NewsGrid(props: NewsGridProps) {
  if (props.variant === 'md3') {
    const { title = 'NEWS', departmentLabel, posts, socialLinks = [] } = props

    const PLATFORM_META = {
      instagram: {
        label: 'Instagram',
        bg: 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
        icon: (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
      },
      facebook: {
        label: 'Facebook',
        bg: 'bg-[#1877F2]',
        icon: (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ),
      },
      whatsapp: {
        label: 'WhatsApp',
        bg: 'bg-[#25D366]',
        icon: (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        ),
      },
    }

    return (
      <section className="py-8 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-5xl font-headline tracking-tighter uppercase">
              <span className="font-black text-gold" style={{ fontWeight: 900, WebkitTextStroke: '1.5px #052856' }}>SG</span><span className="font-bold text-primary ml-[3px]" style={{ fontWeight: 600, WebkitTextStroke: '1.5px #052856' }}>{title}</span>
              {departmentLabel && <span className="font-light text-primary ml-4 text-4xl">{departmentLabel.toUpperCase()}</span>}
            </h2>
            <a className="bg-primary text-white px-6 py-2 rounded-lg font-headline font-bold uppercase tracking-wider text-xs hover:bg-primary-container transition-all flex items-center gap-2" href="#">
              Zur News-Übersicht <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.title} className="group relative aspect-square bg-surface-container rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={post.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={post.src} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-white font-headline font-bold text-lg mb-2">{post.title}</h4>
                  <p className="text-white/80 text-xs font-bold mb-3 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">favorite</span> {post.likes} Likes
                  </p>
                  <span className="text-secondary-container text-[10px] font-black uppercase tracking-widest">{post.tag}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-1.5 text-white">
                  <span className="material-symbols-outlined text-sm">{post.icon}</span>
                </div>
              </div>
            ))}
          </div>
          {socialLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-2xl bg-surface-container">
              <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Folge uns auf</span>
              {socialLinks.map((link) => {
                const meta = PLATFORM_META[link.platform]
                return (
                  <a
                    key={link.platform}
                    href={link.href ?? '#'}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <span className={`w-6 h-6 rounded-full ${meta.bg} flex items-center justify-center shrink-0`}>
                      {meta.icon}
                    </span>
                    <span className="text-primary font-bold text-xs">{link.handle}</span>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>
    )
  }

  const {
    sectionNum,
    theme = 'light',
    bigCard,
    secondCard,
    thirdCard,
    socialHandles,
  } = props as NewsGridClassicProps
  const isDark = theme === 'dark'
  const resolvedSectionNum = sectionNum ?? (isDark ? '02 — Aktuelles' : '01 — Aktuelles')

  return (
    <section className={`py-20 ${isDark ? 'bg-navy noise relative overflow-hidden' : 'bg-chalk'}`}>
      {isDark && (
        <div className="absolute top-0 left-0 pointer-events-none overflow-hidden w-full" style={{ zIndex: 0 }}>
          <span
            className="text-outline-chalk font-display font-black uppercase leading-none select-none block"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', letterSpacing: '-0.04em', opacity: 0.05, marginTop: '-0.1em', whiteSpace: 'nowrap' }}
          >
            NEWS
          </span>
        </div>
      )}

      <div className={`max-w-screen-xl mx-auto px-6 md:px-10 ${isDark ? 'relative z-10' : ''}`}>

        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className={`sec-num mb-3 ${isDark ? 'text-chalk/40' : ''}`}>{resolvedSectionNum}</p>
            <h2 className={`display-giant ${isDark ? 'text-chalk' : 'text-navy'}`} style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              News &amp;{' '}
              {isDark ? <span className="text-gold">Updates</span> : 'Updates'}
            </h2>
          </div>
          <a
            href="#"
            className={`hidden md:flex label-cap items-center gap-2 transition-colors ${isDark ? 'text-chalk/40 hover:text-chalk' : 'text-navy/50 hover:text-navy'}`}
          >
            Alle News <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Big card — top left */}
          <div className="lg:col-span-3 img-zoom relative rounded-lg overflow-hidden cursor-pointer" style={{ height: 400 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={bigCard.title} className="w-full h-full object-cover" src={bigCard.src} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent flex flex-col justify-end p-8">
              <span className="label-cap text-gold mb-3">{bigCard.category}</span>
              <h3 className="font-display font-black text-chalk text-2xl md:text-3xl leading-tight tracking-display">
                {bigCard.title}
              </h3>
              {bigCard.likes !== undefined && (
                <p className="label-cap text-chalk/40 mt-3 flex items-center gap-2">
                  <span className="material-symbols-outlined fill-icon text-xs">favorite</span> {bigCard.likes} Likes
                </p>
              )}
            </div>
          </div>

          {/* Second card — top right */}
          <div className="lg:col-span-2 img-zoom relative rounded-lg overflow-hidden cursor-pointer" style={{ height: 400 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={secondCard.title} className="w-full h-full object-cover" src={secondCard.src} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent flex flex-col justify-end p-6">
              <span className="label-cap text-gold mb-1.5">{secondCard.category}</span>
              <h4 className="font-display font-bold text-chalk text-lg tracking-display">{secondCard.title}</h4>
            </div>
          </div>

          {/* Social box — bottom left */}
          <div className={`lg:col-span-3 rounded-lg p-6 grid grid-cols-2 gap-4 ${isDark ? 'bg-navy-mid/60 border border-white/10' : 'bg-navy'}`}>
            {socialHandles.slice(0, 2).map((handle) => (
              <a
                key={handle.platform}
                href={handle.href ?? '#'}
                className="group flex flex-col gap-3 border border-white/10 rounded-md p-5 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {handle.platform === 'instagram' ? (
                    <span className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="w-8 h-8 rounded-sm bg-[#1877F2] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </span>
                  )}
                  <p className="label-cap text-chalk/40 capitalize">{handle.platform}</p>
                </div>
                <p className="font-display font-bold text-chalk text-sm tracking-display leading-snug">{handle.name}</p>
                <p className="label-cap text-chalk/30 text-[10px] mt-auto">
                  {handle.subtext ?? (handle.platform === 'instagram' ? 'Fotos · Highlights · Stories' : 'Events · News · Community')}
                </p>
                <span className="label-cap text-gold text-[10px] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Folgen <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </a>
            ))}
          </div>

          {/* Third card — bottom right */}
          <div className="lg:col-span-2 img-zoom relative rounded-lg overflow-hidden cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={thirdCard.title} className="w-full h-full object-cover" src={thirdCard.src} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent flex flex-col justify-end p-6">
              <span className="label-cap text-gold mb-1.5">{thirdCard.category}</span>
              <h4 className="font-display font-bold text-chalk text-lg tracking-display">{thirdCard.title}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
