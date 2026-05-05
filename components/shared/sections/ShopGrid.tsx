export interface ShopProduct {
  name: string
  sub: string
  price: string
  badge?: string | null
  src: string
  alt?: string
}

// ── Classic variant (Badminton / Athletics — project Tailwind tokens) ─────────

interface ClassicProps {
  variant?: 'classic'
  products: ShopProduct[]
  sectionNum?: string
  titleBase?: string
  titleGold?: string
  background?: string
}

// ── MD3 variant (Tischtennis etc. — CDN Tailwind + MD3 tokens) ───────────────

interface Md3Props {
  variant: 'md3'
  products: ShopProduct[]
  title?: string
  subtitle?: string
}

type ShopGridProps = ClassicProps | Md3Props

export default function ShopGrid(props: ShopGridProps) {
  if (props.variant === 'md3') {
    const { products, title = 'SG Hünstetten Fan-Shop', subtitle = 'Zeig Flagge für deinen Verein.' } = props
    return (
      <section className="py-16" style={{ backgroundColor: '#dedad8' }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-5xl font-headline tracking-tighter uppercase">
                <span className="font-black text-gold" style={{ fontWeight: 900, WebkitTextStroke: '1.5px #052856' }}>SG</span><span className="font-bold text-primary ml-[3px]">HÜNSTETTEN</span>
                {' '}<span className="font-light text-primary">FANSHOP</span>
              </h2>
              <p className="text-on-surface-variant mt-2 text-lg italic">{subtitle}</p>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-4 bg-primary text-white rounded-xl font-headline font-bold flex items-center gap-3 hover:bg-primary-container transition-all uppercase tracking-widest shadow-md" type="button">
              Alle Artikel <span className="material-symbols-outlined">shopping_bag</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.name} className="bg-white p-6 rounded-[2rem] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-square rounded-2xl bg-surface-container overflow-hidden mb-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={p.alt ?? p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.src} />
                  {p.badge && (
                    <span className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {p.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-primary text-xl font-headline uppercase tracking-tighter">{p.name}</h4>
                <p className="text-outline text-sm mt-1 font-medium">{p.sub}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-2xl font-black text-primary">{p.price}</span>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary-container transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-primary text-sm">add_shopping_cart</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Classic
  const {
    products,
    sectionNum = '06 — Fan-Shop',
    titleBase = 'SG Hünstetten',
    titleGold = 'Shop',
    background = 'bg-mist',
  } = props as ClassicProps

  return (
    <section className={`py-16 ${background}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="sec-num mb-3">{sectionNum}</p>
            <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
              {titleBase} <span className="text-gold">{titleGold}</span>
            </h2>
          </div>
          <button className="label-cap text-navy border border-navy px-5 py-2.5 rounded-sm hover:bg-navy hover:text-chalk transition-all flex items-center gap-2">
            Alle Artikel <span className="material-symbols-outlined text-sm">shopping_bag</span>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="img-zoom aspect-square rounded-md overflow-hidden mb-4 relative bg-mist-mid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={p.alt ?? p.name} className="w-full h-full object-cover" src={p.src} />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-gold text-navy label-cap px-2.5 py-1 rounded-sm">{p.badge}</span>
                )}
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-display font-bold text-navy text-base tracking-display">{p.name}</h4>
                  <p className="label-cap text-ink-soft/30 mt-0.5">{p.sub}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-black text-navy text-lg tracking-tightest">{p.price}</p>
                  <button className="mt-1 w-8 h-8 rounded-sm bg-mist-mid flex items-center justify-center group-hover:bg-gold transition-colors ml-auto">
                    <span className="material-symbols-outlined text-base text-navy">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
