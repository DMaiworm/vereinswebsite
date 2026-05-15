'use client'

import { useState, useEffect, useRef } from 'react'

/* ===== Types ===== */
interface Product {
  id: string
  name: string
  cat: string
  sport: string
  price: number
  oldPrice?: number
  sizes: string[]
  rating: number
  reviews: number
  badge?: string | null
  new?: boolean
  stock: boolean
  color: string
  desc: string
}

interface CartItem {
  id: string
  qty: number
  size: string
}

/* ===== Product catalog ===== */
const PRODUCTS: Product[] = [
  { id: 'trikot-home',      name: 'Heimtrikot Anniversary 26/27',  cat: 'trikots',       sport: 'fußball',      price: 69.90, oldPrice: 79.90, sizes: ['S','M','L','XL','XXL'], rating: 4.9, reviews: 128, badge: 'NEU',        new: true,  stock: true,  color: '#052856', desc: 'Limited 80-Jahre-Edition mit gesticktem Wappen.' },
  { id: 'trikot-away',      name: 'Auswärtstrikot 26/27',          cat: 'trikots',       sport: 'fußball',      price: 64.90,               sizes: ['S','M','L','XL'],       rating: 4.7, reviews: 64,  badge: null,         new: true,  stock: true,  color: '#FDE000', desc: 'Helles Gold mit blauen Akzenten.' },
  { id: 'trikot-keeper',    name: 'Torwart-Trikot 26/27',          cat: 'trikots',       sport: 'fußball',      price: 59.90,               sizes: ['M','L','XL'],           rating: 4.5, reviews: 21,  badge: null,                     stock: true,  color: '#2E4150', desc: 'Atmungsaktiv, mit Polsterung an Ellbogen.' },
  { id: 'trainings-anzug',  name: 'Trainingsanzug Pro',            cat: 'trainingsanzug',sport: 'fußball',      price: 99.00,               sizes: ['S','M','L','XL','XXL'], rating: 4.8, reviews: 87,  badge: null,                     stock: true,  color: '#223E6D', desc: 'Slim-Fit, Reflektorstreifen, Reißverschlusstaschen.' },
  { id: 'short-home',       name: 'Spielshort Heim',               cat: 'trikots',       sport: 'fußball',      price: 24.90,               sizes: ['S','M','L','XL'],       rating: 4.6, reviews: 42,  badge: null,                     stock: true,  color: '#052856', desc: 'Leicht & atmungsaktiv.' },
  { id: 'stutzen',          name: 'Vereinsstutzen',                cat: 'trikots',       sport: 'fußball',      price: 14.90,               sizes: ['S','M','L'],            rating: 4.4, reviews: 33,  badge: null,                     stock: true,  color: '#FDE000', desc: 'Gestrickt, hoher Tragekomfort.' },
  { id: 'hoodie-classic',   name: 'Hoodie "80 Jahre"',             cat: 'hoodies',       sport: 'general',      price: 54.90,               sizes: ['XS','S','M','L','XL','XXL'], rating: 4.9, reviews: 201, badge: 'BESTSELLER',         stock: true,  color: '#052856', desc: '400g Premium-Baumwolle, gefüttert.' },
  { id: 'tee-classic',      name: 'T-Shirt Vereinslogo',           cat: 'hoodies',       sport: 'general',      price: 24.90,               sizes: ['S','M','L','XL'],       rating: 4.7, reviews: 154, badge: null,                     stock: true,  color: '#FFFFFF', desc: 'Weich, mit großem Print auf der Brust.' },
  { id: 'tee-vintage',      name: 'T-Shirt Vintage 1944',          cat: 'vintage',       sport: 'general',      price: 29.90,               sizes: ['S','M','L','XL'],       rating: 4.8, reviews: 67,  badge: 'RETRO',                  stock: true,  color: '#3B2A1A', desc: 'Heritage-Print im 70er-Stil.' },
  { id: 'cap-classic',      name: 'Snapback Cap "SGH"',            cat: 'caps',          sport: 'general',      price: 24.90,               sizes: ['M','L'],                rating: 4.6, reviews: 78,  badge: null,                     stock: true,  color: '#052856', desc: '6-Panel Snapback, plastisch besticktes Logo.' },
  { id: 'cap-bucket',       name: 'Bucket Hat Sommer',             cat: 'caps',          sport: 'general',      price: 22.90,               sizes: ['M','L'],                rating: 4.3, reviews: 18,  badge: null,         new: true,  stock: true,  color: '#FDE000', desc: 'Leicht, perfekt für die Auswärtsfahrt.' },
  { id: 'beanie',           name: 'Beanie Wintergold',             cat: 'caps',          sport: 'general',      price: 18.90,               sizes: ['M'],                    rating: 4.5, reviews: 44,  badge: null,                     stock: true,  color: '#FDE000', desc: 'Gestrickt, mit gewebtem Etikett.' },
  { id: 'schal-classic',    name: 'Schal "Hünstetten Forever"',    cat: 'schals',        sport: 'general',      price: 19.90,               sizes: ['M'],                    rating: 4.9, reviews: 212, badge: 'BESTSELLER',             stock: true,  color: '#052856', desc: 'Doppelseitig gewebt, 145cm.' },
  { id: 'flagge',           name: 'Vereinsflagge 150x90cm',        cat: 'schals',        sport: 'general',      price: 24.90,               sizes: ['M'],                    rating: 4.8, reviews: 36,  badge: null,                     stock: true,  color: '#052856', desc: 'Wetterfest, mit Ösen.' },
  { id: 'fan-banner',       name: 'Fan-Banner XXL',                cat: 'schals',        sport: 'fußball',      price: 39.90,               sizes: ['M'],                    rating: 4.6, reviews: 14,  badge: null,                     stock: true,  color: '#052856', desc: '2x4m, für die Kurve.' },
  { id: 'tasche-sport',     name: 'Sporttasche 50L',               cat: 'taschen',       sport: 'general',      price: 49.90,               sizes: ['M'],                    rating: 4.7, reviews: 88,  badge: null,                     stock: true,  color: '#1B1C1C', desc: 'Wasserabweisend, Schuhfach.' },
  { id: 'rucksack',         name: 'Rucksack Athlete',              cat: 'taschen',       sport: 'general',      price: 59.90,               sizes: ['M'],                    rating: 4.8, reviews: 62,  badge: null,         new: true,  stock: true,  color: '#052856', desc: 'Laptopfach, Brustgurt, gepolstert.' },
  { id: 'gym-bag',          name: 'Gym-Bag Drawstring',            cat: 'taschen',       sport: 'pilates',      price: 14.90,               sizes: ['M'],                    rating: 4.4, reviews: 25,  badge: null,                     stock: true,  color: '#FDE000', desc: 'Leichter Beutel mit Kordelzug.' },
  { id: 'fußball',          name: 'Trainingsball Match',           cat: 'bälle',         sport: 'fußball',      price: 34.90,               sizes: ['M'],                    rating: 4.6, reviews: 54,  badge: null,                     stock: true,  color: '#FFFFFF', desc: 'Größe 5, FIFA Quality.' },
  { id: 'tt-schläger',      name: 'Tischtennis-Set Pro',           cat: 'bälle',         sport: 'tischtennis',  price: 44.90,               sizes: ['M'],                    rating: 4.7, reviews: 31,  badge: null,                     stock: true,  color: '#BA1A1A', desc: '2 Schläger, 3 Bälle, Hülle.' },
  { id: 'badmi-set',        name: 'Badminton Starter-Set',         cat: 'bälle',         sport: 'badminton',    price: 39.90,               sizes: ['M'],                    rating: 4.5, reviews: 19,  badge: null,                     stock: false, color: '#FDE000', desc: '2 Schläger, 6 Federbälle, Tasche.' },
  { id: 'kids-trikot',      name: 'Kindertrikot Future Star',      cat: 'kids',          sport: 'fußball',      price: 34.90,               sizes: ['kids'],                 rating: 4.8, reviews: 46,  badge: 'KIDS',                   stock: true,  color: '#052856', desc: 'Größen 116-164, mit Wunschnamen.' },
  { id: 'kids-hoodie',      name: 'Kinder-Hoodie Mini-Star',       cat: 'kids',          sport: 'general',      price: 34.90,               sizes: ['kids'],                 rating: 4.7, reviews: 29,  badge: null,                     stock: true,  color: '#FDE000', desc: 'Kuschelig, mit großem Wappen.' },
  { id: 'kids-trinkflasche',name: 'Trinkflasche Junior',           cat: 'kids',          sport: 'general',      price: 9.90,                sizes: ['M'],                    rating: 4.6, reviews: 71,  badge: null,                     stock: true,  color: '#FDE000', desc: '500ml, BPA-frei, mit Sticker-Set.' },
]

const SPORT_ACCENTS: Record<string, string> = {
  fußball: '#052856', leichtathletik: '#BA1A1A', badminton: '#2E7D32',
  tischtennis: '#0a408a', pilates: '#FDE000', general: '#223E6D',
}

/* ===== SVG Swatch ===== */
function swatchSVG(p: Product): string {
  const c = p.color
  const accent = c === '#052856' ? '#FDE000' : '#052856'
  if (p.cat === 'trikots' || (p.cat === 'kids' && p.id === 'kids-trikot')) {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <path d="M40 50 L70 30 L130 30 L160 50 L180 70 L160 90 L150 90 L150 200 L50 200 L50 90 L40 90 L20 70 Z" fill="${c}"/>
      <path d="M85 30 Q100 50 115 30" fill="${c === '#FFFFFF' ? '#E4E2E1' : '#000'}" opacity=".2"/>
      <rect x="80" y="120" width="40" height="40" fill="${accent}" rx="4"/>
      <text x="100" y="148" text-anchor="middle" fill="${c}" font-family="Lexend" font-weight="900" font-style="italic" font-size="22">SGH</text>
      ${p.id === 'trikot-home' ? `<rect x="50" y="180" width="100" height="6" fill="#FDE000"/>` : ''}
    </svg>`
  }
  if (p.cat === 'hoodies' || p.cat === 'vintage') {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <path d="M40 60 L70 30 L80 50 Q100 60 120 50 L130 30 L160 60 L185 90 L165 110 L155 100 L155 200 L45 200 L45 100 L35 110 L15 90 Z" fill="${c}"/>
      <path d="M85 50 Q100 80 115 50 L115 90 L85 90 Z" fill="${c === '#FFFFFF' ? '#E4E2E1' : '#000'}" opacity=".25"/>
      <text x="100" y="155" text-anchor="middle" fill="${accent}" font-family="Lexend" font-weight="900" font-style="italic" font-size="14">${p.id === 'tee-vintage' ? 'EST.1944' : 'SG HÜNSTETTEN'}</text>
    </svg>`
  }
  if (p.cat === 'caps') {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <ellipse cx="100" cy="130" rx="80" ry="20" fill="${c}" opacity=".4"/>
      <path d="M30 130 Q30 70 100 60 Q170 70 170 130 Z" fill="${c}"/>
      <ellipse cx="100" cy="130" rx="80" ry="14" fill="${c}"/>
      <path d="M30 130 L185 130 Q185 145 100 145 Q15 145 30 130 Z" fill="${c}" opacity=".7"/>
      <rect x="85" y="85" width="30" height="20" fill="${accent}" rx="3"/>
      <text x="100" y="100" text-anchor="middle" fill="${c}" font-family="Lexend" font-weight="900" font-style="italic" font-size="13">SGH</text>
    </svg>`
  }
  if (p.cat === 'schals') {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <rect x="20" y="40" width="160" height="160" fill="${c}" transform="rotate(-8 100 110)"/>
      <rect x="20" y="60" width="160" height="6" fill="${accent}" transform="rotate(-8 100 110)"/>
      <rect x="20" y="170" width="160" height="6" fill="${accent}" transform="rotate(-8 100 110)"/>
      <text x="100" y="125" text-anchor="middle" fill="${accent}" font-family="Lexend" font-weight="900" font-style="italic" font-size="20" transform="rotate(-8 100 125)">SGH</text>
    </svg>`
  }
  if (p.cat === 'taschen') {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <path d="M70 70 Q100 50 130 70 L130 80 L120 80 L120 75 Q100 65 80 75 L80 80 L70 80 Z" fill="${c}"/>
      <rect x="30" y="80" width="140" height="100" rx="10" fill="${c}"/>
      <rect x="30" y="120" width="140" height="6" fill="${accent}"/>
      <circle cx="160" cy="105" r="3" fill="${accent}"/>
    </svg>`
  }
  if (p.cat === 'bälle') {
    if (p.sport === 'fußball') {
      return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
        <circle cx="100" cy="110" r="65" fill="#FFFFFF" stroke="#1B1C1C" stroke-width="2"/>
        <polygon points="100,75 115,90 110,108 90,108 85,90" fill="#1B1C1C"/>
        <polygon points="65,100 80,105 80,125 70,135 60,120" fill="#1B1C1C"/>
        <polygon points="135,100 140,120 130,135 120,125 120,105" fill="#1B1C1C"/>
        <polygon points="85,135 105,135 110,150 95,160 80,150" fill="#1B1C1C"/>
      </svg>`
    }
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <ellipse cx="80" cy="100" rx="55" ry="18" fill="${c}" transform="rotate(-25 80 100)"/>
      <rect x="105" y="115" width="60" height="8" fill="#3B2A1A" transform="rotate(-25 135 119)"/>
    </svg>`
  }
  if (p.cat === 'trainingsanzug') {
    return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
      <path d="M55 40 L75 25 L125 25 L145 40 L155 70 L150 105 L130 105 L130 200 L70 200 L70 105 L50 105 L45 70 Z" fill="${c}"/>
      <line x1="100" y1="40" x2="100" y2="105" stroke="${accent}" stroke-width="3"/>
      <line x1="60" y1="50" x2="60" y2="95" stroke="${accent}" stroke-width="2"/>
      <line x1="140" y1="50" x2="140" y2="95" stroke="${accent}" stroke-width="2"/>
    </svg>`
  }
  return `<svg viewBox="0 0 200 220" style="width:100%;height:100%"><rect width="200" height="220" fill="#F0EDED"/>
    <circle cx="100" cy="110" r="60" fill="${c}"/>
    <text x="100" y="118" text-anchor="middle" fill="${accent}" font-family="Lexend" font-weight="900" font-style="italic" font-size="32">SGH</text>
  </svg>`
}

const eur = (n: number) => n.toFixed(2).replace('.', ',') + '€'

/* ===== Main Component ===== */
export default function ShopClient() {
  const [cat, setCat] = useState('all')
  const [sport, setSport] = useState('all')
  const [size, setSize] = useState('all')
  const [maxPrice, setMaxPrice] = useState(120)
  const [onlyStock, setOnlyStock] = useState(false)
  const [onlyNew, setOnlyNew] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [wishlist, setWishlist] = useState(new Set<string>())
  const [shipping, setShipping] = useState(4.90)
  const [member, setMember] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  /* ===== body overflow lock ===== */
  useEffect(() => {
    const locked = cartOpen || wishlistOpen || checkoutOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen, wishlistOpen, checkoutOpen])

  /* ===== keyboard shortcuts ===== */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') { setSearchOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [searchOpen])

  /* ===== Toast ===== */
  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 1800)
  }

  /* ===== Filter ===== */
  function getFiltered() {
    let list = PRODUCTS.filter(p => {
      if (cat !== 'all' && p.cat !== cat) return false
      if (sport !== 'all' && p.sport !== sport) return false
      if (size !== 'all' && !p.sizes.includes(size)) return false
      if (p.price > maxPrice) return false
      if (onlyStock && !p.stock) return false
      if (onlyNew && !p.new) return false
      if (searchInput) {
        const q = searchInput.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q) && !p.cat.includes(q)) return false
      }
      return true
    })
    switch (sortBy) {
      case 'price-asc':  list = list.slice().sort((a, b) => a.price - b.price); break
      case 'price-desc': list = list.slice().sort((a, b) => b.price - a.price); break
      case 'rating':     list = list.slice().sort((a, b) => b.rating - a.rating); break
      case 'new':        list = list.slice().sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break
    }
    return list
  }

  /* ===== Cart ===== */
  function addToCart(id: string) {
    const p = PRODUCTS.find(x => x.id === id)
    if (!p) return
    setCart(prev => {
      const next = { ...prev }
      if (!next[id]) next[id] = { id, qty: 0, size: p.sizes[0] }
      next[id] = { ...next[id], qty: next[id].qty + 1 }
      return next
    })
    showToast(`${p.name} im Warenkorb`)
  }

  function removeFromCart(id: string) {
    setCart(prev => { const next = { ...prev }; delete next[id]; return next })
  }

  function changeQty(id: string, delta: number) {
    setCart(prev => {
      const next = { ...prev }
      if (!next[id]) return next
      const qty = next[id].qty + delta
      if (qty <= 0) delete next[id]
      else next[id] = { ...next[id], qty }
      return next
    })
  }

  function cartArr() {
    return Object.values(cart).map(c => ({ ...c, p: PRODUCTS.find(x => x.id === c.id)! })).filter(c => c.p)
  }

  function cartSubtotal() { return cartArr().reduce((s, c) => s + c.p.price * c.qty, 0) }
  const cartCount = Object.values(cart).reduce((s, c) => s + c.qty, 0)

  /* ===== Wishlist ===== */
  function toggleWishlist(id: string) {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else { next.add(id); showToast('Auf Merkliste') }
      return next
    })
  }

  /* ===== Checkout ===== */
  function openCheckout() {
    if (cartArr().length === 0) { showToast('Warenkorb ist leer'); return }
    setCartOpen(false)
    setStep(1)
    setCheckoutOpen(true)
  }

  /* ===== Chip helper ===== */
  function chipCls(active: boolean) {
    return active
      ? 'shop-chip-active px-4 py-2 rounded-full bg-surface-container-high text-primary font-headline font-bold italic text-sm uppercase tracking-wider whitespace-nowrap'
      : 'px-4 py-2 rounded-full bg-surface-container-high text-primary font-headline font-bold italic text-sm uppercase tracking-wider whitespace-nowrap'
  }

  function smallChipCls(active: boolean) {
    return active
      ? 'shop-chip-active px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-high text-primary'
      : 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-high text-primary'
  }

  function sizeChipCls(active: boolean, extra = '') {
    return (active
      ? 'shop-chip-active py-2 rounded-lg text-xs font-bold uppercase bg-surface-container-high text-primary'
      : 'py-2 rounded-lg text-xs font-bold uppercase bg-surface-container-high text-primary')
      + (extra ? ' ' + extra : '')
  }

  const filtered = getFiltered()
  const sub = cartSubtotal()
  const disc = member ? sub * 0.1 : 0
  const total = Math.max(0, sub + (cartArr().length === 0 ? 0 : shipping) - disc)

  /* ===== Checkout totals ===== */
  const coSub = sub
  const coDisc = disc
  const coTotal = Math.max(0, sub + shipping - disc)

  /* ===== Step dot class ===== */
  function stepDotCls(n: number) {
    let cls = 'shop-step-dot w-3 h-3 rounded-full bg-outline-variant'
    if (n < step) cls += ' done'
    else if (n === step) cls += ' active'
    return cls
  }

  return (
    <>
      {/* ===== Fixed Cart/Wishlist overlay buttons ===== */}
      <div className="fixed top-0 right-0 z-[60] flex items-center gap-2 px-6 py-5">
        <button
          onClick={() => setWishlistOpen(true)}
          className="relative py-2 px-2 rounded-sm bg-white/10 hover:bg-white/20 text-white grid place-items-center backdrop-blur active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">favorite</span>
          {wishlist.size > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#FDE000] text-[#052856] text-[10px] font-black rounded-full grid place-items-center">
              {wishlist.size}
            </span>
          )}
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="relative label-cap text-navy bg-gold px-5 py-2 rounded-sm flex items-center gap-1 hover:bg-gold-dim active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base leading-none">shopping_bag</span>
          <span>Warenkorb</span>
          {cartCount > 0 && (
            <span className="min-w-5 h-5 px-1 bg-primary text-[#FDE000] text-[10px] font-black rounded-full grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <main className="pt-20 bg-surface text-on-surface">

        {/* ===== HERO ===== */}
        <section className="relative h-[480px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 shop-placeholder-img opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,40,86,1), rgba(5,40,86,0.8), rgba(5,40,86,0.4))' }} />
          <div className="absolute -right-12 top-12 opacity-10 font-headline font-black italic text-[16rem] leading-none text-white select-none shop-kinetic-slant pointer-events-none">
            SHOP
          </div>
          <div className="max-w-screen-xl mx-auto px-8 w-full relative z-10">
            <span className="inline-block bg-[#FDE000] text-[#052856] px-4 py-1 rounded-full font-label font-black text-xs tracking-[0.25em] uppercase mb-6 shop-kinetic-rotate">
              OFFICIAL FAN STORE · 80 YEARS
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-black italic text-white uppercase leading-none tracking-tight mb-4">
              Trag die <br /><span className="text-[#FDE000]">Farben.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium">
              Trikots, Fanartikel und Vereinsmerchandise — direkt vom Verein, mit jedem Kauf unterstützt du die Jugendarbeit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-widest font-bold">
              <span className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">local_shipping</span>Versand 4,90€
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">storefront</span>Abholung Diehlenhof gratis
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified</span>Mitglieder −10%
              </span>
            </div>
          </div>
        </section>

        {/* ===== CATEGORY STRIP ===== */}
        <section className="bg-surface-container-lowest border-b border-outline-variant/40">
          <div className="max-w-screen-xl mx-auto px-8 py-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant shrink-0 mr-2">Kategorien</span>
            {[
              { key: 'all', label: 'Alle' },
              { key: 'trikots', label: 'Trikots' },
              { key: 'trainingsanzug', label: 'Trainingsanzug' },
              { key: 'hoodies', label: 'Hoodies & Tees' },
              { key: 'caps', label: 'Caps & Mützen' },
              { key: 'schals', label: 'Schals & Fanartikel' },
              { key: 'taschen', label: 'Taschen' },
              { key: 'bälle', label: 'Bälle & Equipment' },
              { key: 'kids', label: 'Kids' },
              { key: 'vintage', label: 'Vintage 1944' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setCat(key)} className={chipCls(cat === key)}>{label}</button>
            ))}
          </div>
          <div className="max-w-screen-xl mx-auto px-8 pb-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-3 bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant px-5 py-4 rounded-2xl border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-primary">search</span>
              <span className="text-sm uppercase tracking-widest font-bold">Suche Trikots, Caps, Schals…</span>
              <span className="ml-auto text-[10px] px-2 py-1 bg-surface-container-high text-primary rounded font-black tracking-wider">⌘K</span>
            </button>
          </div>
        </section>

        {/* ===== CATALOG ===== */}
        <section className="max-w-screen-xl mx-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Filter Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="bg-surface-container-lowest rounded-3xl p-6 lg:sticky lg:top-28 border border-outline-variant/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-black italic uppercase text-primary text-lg">Filter</h3>
                  <button
                    onClick={() => { setCat('all'); setSport('all'); setSize('all'); setMaxPrice(120); setOnlyStock(false); setOnlyNew(false); setSearchInput('') }}
                    className="text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary"
                  >
                    Zurücksetzen
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Sport</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'all', label: 'Alle' },
                      { key: 'fußball', label: 'Fußball' },
                      { key: 'leichtathletik', label: 'Leichtathletik' },
                      { key: 'badminton', label: 'Badminton' },
                      { key: 'tischtennis', label: 'Tischtennis' },
                      { key: 'pilates', label: 'Pilates' },
                      { key: 'general', label: 'Vereinsfans' },
                    ].map(({ key, label }) => (
                      <button key={key} onClick={() => setSport(key)} className={smallChipCls(sport === key)}>{label}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Größe</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <button onClick={() => setSize('all')} className={sizeChipCls(size === 'all', 'col-span-4')}>Alle Größen</button>
                    {['XS','S','M','L','XL','XXL'].map(s => (
                      <button key={s} onClick={() => setSize(s)} className={sizeChipCls(size === s)}>{s}</button>
                    ))}
                    <button onClick={() => setSize('kids')} className={sizeChipCls(size === 'kids', 'col-span-2')}>Kids 116-164</button>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
                    Preis · max <span className="text-primary">{maxPrice}</span>€
                  </h4>
                  <input
                    type="range" min="5" max="120" value={maxPrice}
                    onChange={e => setMaxPrice(+e.target.value)}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="mb-2">
                  <h4 className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Sonstiges</h4>
                  <label className="flex items-center gap-3 py-1 text-sm">
                    <input type="checkbox" checked={onlyStock} onChange={e => setOnlyStock(e.target.checked)} className="accent-primary w-4 h-4 rounded" />
                    <span>Nur lieferbare Artikel</span>
                  </label>
                  <label className="flex items-center gap-3 py-1 text-sm">
                    <input type="checkbox" checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)} className="accent-primary w-4 h-4 rounded" />
                    <span>Nur Neuheiten</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary">Sortiment</span>
                  <h2 className="text-3xl md:text-4xl font-headline font-black italic text-primary uppercase mt-1">{filtered.length} Artikel</h2>
                </div>
                <div className="flex items-center gap-3">
                  <label className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Sortieren</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm font-bold focus:ring-primary"
                  >
                    <option value="featured">Empfohlen</option>
                    <option value="new">Neuheiten zuerst</option>
                    <option value="price-asc">Preis aufsteigend</option>
                    <option value="price-desc">Preis absteigend</option>
                    <option value="rating">Beste Bewertung</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">search_off</span>
                  <h3 className="font-headline font-black italic text-2xl text-primary uppercase mt-4">Nichts gefunden</h3>
                  <p className="text-on-surface-variant mt-2">Probier andere Filter oder setze sie zurück.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(p => {
                    const accent = SPORT_ACCENTS[p.sport] || '#052856'
                    return (
                      <article key={p.id} className="shop-product-card group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-outline-variant/30 flex flex-col">
                        <div className="relative overflow-hidden bg-surface-container" style={{ aspectRatio: '4/5' }}>
                          <div className="shop-product-img absolute inset-0" dangerouslySetInnerHTML={{ __html: swatchSVG(p) }} />
                          {p.badge && (
                            <span className="absolute top-4 left-4 bg-[#FDE000] text-[#052856] px-3 py-1 rounded-full font-label font-black text-[10px] tracking-[0.25em] uppercase shop-kinetic-rotate">
                              {p.badge}
                            </span>
                          )}
                          {!p.stock && (
                            <span className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full font-label font-black text-[10px] tracking-[0.25em] uppercase">
                              Ausverkauft
                            </span>
                          )}
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur grid place-items-center hover:scale-110 transition-transform"
                          >
                            <span className={`material-symbols-outlined text-on-surface ${wishlist.has(p.id) ? 'shop-heart-active' : ''}`}>favorite</span>
                          </button>
                          <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest" style={{ background: accent }}>
                            {p.sport === 'general' ? 'Vereinsfans' : p.sport}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-headline font-black italic text-primary text-lg leading-tight uppercase mb-1 line-clamp-2">{p.name}</h3>
                          <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{p.desc}</p>
                          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
                            <span className="material-symbols-outlined text-base" style={{ color: '#FDE000', fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="font-bold">{p.rating}</span>
                            <span>·</span>
                            <span>{p.reviews} Reviews</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {p.sizes.map(s => (
                              <span key={s} className="px-2 py-0 bg-surface-container rounded text-[10px] font-bold uppercase">{s === 'kids' ? '116-164' : s}</span>
                            ))}
                          </div>
                          <div className="mt-auto flex items-end justify-between gap-3">
                            <div>
                              {p.oldPrice && <div className="text-[11px] text-on-surface-variant line-through">{eur(p.oldPrice)}</div>}
                              <div className="font-headline font-black italic text-2xl text-primary leading-none">{eur(p.price)}</div>
                            </div>
                            <button
                              onClick={() => addToCart(p.id)}
                              disabled={!p.stock}
                              className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl font-headline font-black italic uppercase text-xs tracking-wider hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                              {p.stock ? 'In Bag' : 'Sold Out'}
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== EDITORIAL ===== */}
        <section className="bg-primary text-white py-12 overflow-hidden relative">
          <div className="absolute -left-12 -bottom-20 opacity-10 font-headline font-black italic text-[18rem] leading-none select-none pointer-events-none">SGH</div>
          <div className="max-w-screen-xl mx-auto px-8 relative z-10 grid md:grid-cols-3 gap-10">
            <div>
              <span className="material-symbols-outlined text-[#FDE000] text-4xl mb-4 block">verified</span>
              <h3 className="font-headline font-black italic uppercase text-2xl mb-2">100% Original</h3>
              <p className="text-white/70">Alle Trikots offiziell lizenziert mit Vereinswappen und Stickerei vom Hauptausrüster.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-[#FDE000] text-4xl mb-4 block">favorite</span>
              <h3 className="font-headline font-black italic uppercase text-2xl mb-2">Zweck statt Profit</h3>
              <p className="text-white/70">Jeder Euro fließt zurück in Jugendabteilung, Plätze und Trainerausbildung.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-[#FDE000] text-4xl mb-4 block">undo</span>
              <h3 className="font-headline font-black italic uppercase text-2xl mb-2">30 Tage Rückgabe</h3>
              <p className="text-white/70">Größe nicht gepasst? Tausch unkompliziert im Vereinsheim oder per Versand.</p>
            </div>
          </div>
        </section>

      </main>

      {/* ===== CART DRAWER ===== */}
      <div
        className={`shop-modal-bg fixed inset-0 z-40 backdrop-blur-sm ${cartOpen ? 'open' : ''}`}
        style={{ background: 'rgba(5,40,86,0.6)' }}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`shop-drawer fixed top-0 right-0 h-full w-full max-w-md bg-surface z-50 shadow-2xl flex flex-col ${cartOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">
          <div>
            <span className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary">Warenkorb</span>
            <h3 className="font-headline font-black italic uppercase text-primary text-2xl">Dein Bag</h3>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-xl bg-surface-container grid place-items-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartArr().length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">shopping_bag</span>
              <h4 className="font-headline font-black italic uppercase text-primary text-xl mt-4">Noch leer</h4>
              <p className="text-sm text-on-surface-variant mt-2">Stöber durch unsere Trikots, Hoodies und Fanartikel.</p>
            </div>
          ) : cartArr().map(c => (
            <div key={c.id} className="flex gap-4 py-4 border-b border-outline-variant/30">
              <div className="w-20 h-24 rounded-xl bg-surface-container overflow-hidden shrink-0" dangerouslySetInnerHTML={{ __html: swatchSVG(c.p) }} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-headline font-bold italic text-primary text-sm leading-tight uppercase">{c.p.name}</h4>
                  <button onClick={() => removeFromCart(c.id)} className="text-on-surface-variant hover:text-error">
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
                <div className="text-xs text-on-surface-variant mt-1">Größe {c.size === 'kids' ? '116-164' : c.size} · {c.p.sport === 'general' ? 'Vereinsfans' : c.p.sport}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-surface-container rounded-lg">
                    <button onClick={() => changeQty(c.id, -1)} className="w-8 h-8 grid place-items-center font-bold">−</button>
                    <span className="font-headline font-bold text-sm">{c.qty}</span>
                    <button onClick={() => changeQty(c.id, 1)} className="w-8 h-8 grid place-items-center font-bold">+</button>
                  </div>
                  <div className="font-headline font-black italic text-primary">{eur(c.p.price * c.qty)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-outline-variant/40 p-6 bg-surface-container-lowest">
          <div className="flex justify-between text-sm mb-2"><span>Zwischensumme</span><span>{eur(sub)}</span></div>
          <div className="flex justify-between text-sm mb-2"><span>Versand</span><span>{eur(cartArr().length === 0 ? 0 : shipping)}</span></div>
          <div className="flex justify-between text-sm mb-4 text-[#2E7D32]">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">verified</span>Mitgliederrabatt 10%</span>
            <span>−{eur(disc)}</span>
          </div>
          <div className="flex justify-between font-headline font-black italic text-2xl text-primary mb-5">
            <span>GESAMT</span><span>{eur(total)}</span>
          </div>
          <button
            onClick={openCheckout}
            className="w-full bg-[#FDE000] text-[#052856] py-4 rounded-xl font-headline font-black italic uppercase tracking-wider text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-transform"
          >
            Zur Kasse
          </button>
          <p className="mt-3 text-xs text-on-surface-variant text-center">Sichere Bezahlung · 30 Tage Rückgabe · Lieferung in 2-4 Werktagen</p>
        </div>
      </aside>

      {/* ===== WISHLIST DRAWER ===== */}
      <div
        className={`shop-modal-bg fixed inset-0 z-40 backdrop-blur-sm ${wishlistOpen ? 'open' : ''}`}
        style={{ background: 'rgba(5,40,86,0.6)' }}
        onClick={() => setWishlistOpen(false)}
      />
      <aside className={`shop-drawer fixed top-0 right-0 h-full w-full max-w-md bg-surface z-50 shadow-2xl flex flex-col ${wishlistOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">
          <div>
            <span className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-primary">Merkliste</span>
            <h3 className="font-headline font-black italic uppercase text-primary text-2xl">Wishlist</h3>
          </div>
          <button onClick={() => setWishlistOpen(false)} className="w-10 h-10 rounded-xl bg-surface-container grid place-items-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlist.size === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">favorite</span>
              <h4 className="font-headline font-black italic uppercase text-primary text-xl mt-4">Keine Favoriten</h4>
              <p className="text-sm text-on-surface-variant mt-2">Tippe auf das Herz, um Produkte zu speichern.</p>
            </div>
          ) : [...wishlist].map(id => {
            const p = PRODUCTS.find(x => x.id === id)!
            return (
              <div key={id} className="flex gap-4 py-4 border-b border-outline-variant/30">
                <div className="w-20 h-24 rounded-xl bg-surface-container overflow-hidden shrink-0" dangerouslySetInnerHTML={{ __html: swatchSVG(p) }} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline font-bold italic text-primary text-sm leading-tight uppercase">{p.name}</h4>
                  <div className="text-xs text-on-surface-variant mt-1">{p.sport === 'general' ? 'Vereinsfans' : p.sport}</div>
                  <div className="font-headline font-black italic text-primary mt-2">{eur(p.price)}</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => addToCart(p.id)} className="bg-primary text-white px-3 py-1 rounded-lg font-headline font-black italic uppercase text-[10px] tracking-wider">In Bag</button>
                    <button onClick={() => toggleWishlist(p.id)} className="px-3 py-1 rounded-lg border border-outline-variant/40 text-[10px] font-bold uppercase">Entfernen</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </aside>

      {/* ===== SEARCH OVERLAY ===== */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0" style={{ background: 'rgba(5,40,86,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setSearchOpen(false)} />
          <div className="relative max-w-2xl mx-auto mt-32 bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-outline-variant/30">
              <span className="material-symbols-outlined text-primary">search</span>
              <input
                ref={searchRef}
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Suche Trikots, Caps, Schals…"
                className="flex-1 bg-transparent outline-none text-lg font-bold placeholder:font-medium placeholder:text-on-surface-variant"
              />
              <button onClick={() => setSearchOpen(false)} className="text-xs uppercase tracking-widest font-bold text-on-surface-variant px-2 py-1 bg-surface-container rounded">ESC</button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {(() => {
                const q = searchInput.toLowerCase()
                const results = q
                  ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cat.includes(q))
                  : PRODUCTS.slice(0, 6)
                return results.length === 0
                  ? <div className="p-8 text-center text-on-surface-variant">Keine Treffer für &quot;{searchInput}&quot;</div>
                  : results.slice(0, 8).map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setSearchOpen(false) }}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container text-left"
                    >
                      <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden" dangerouslySetInnerHTML={{ __html: swatchSVG(p) }} />
                      <div className="flex-1">
                        <div className="font-headline font-bold italic text-primary text-sm uppercase">{p.name}</div>
                        <div className="text-xs text-on-surface-variant">{p.sport === 'general' ? 'Vereinsfans' : p.sport} · {p.cat}</div>
                      </div>
                      <div className="font-headline font-black italic text-primary">{eur(p.price)}</div>
                    </button>
                  ))
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ===== CHECKOUT ===== */}
      <div
        className={`shop-modal-bg fixed inset-0 z-50 overflow-y-auto ${checkoutOpen ? 'open' : ''}`}
        style={{ background: 'rgba(5,40,86,0.8)', backdropFilter: 'blur(4px)' }}
      >
        <div className="min-h-full grid place-items-center py-10 px-4">
          <div className="bg-surface w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/40 bg-primary text-white">
              <div className="flex items-center gap-3">
                <span className="font-headline font-black italic text-2xl text-[#FDE000]">SG</span>
                <span className="font-headline font-black italic uppercase">Checkout</span>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Stepper */}
            <div className="px-8 py-6 border-b border-outline-variant/40 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {[{ n: 1, label: '1. Adresse' }, { n: 2, label: '2. Versand' }, { n: 3, label: '3. Bezahlung' }, { n: 4, label: '4. Bestätigung' }].map(({ n, label }, i) => (
                <div key={n} className="flex items-center gap-2">
                  {i > 0 && <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>}
                  <span className={stepDotCls(n)} />
                  <span className={`font-headline font-black italic uppercase text-sm ${n <= step ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-[1fr_400px] gap-0">
              {/* Step Forms */}
              <div className="p-8">
                {step === 1 && (
                  <>
                    <h3 className="font-headline font-black italic uppercase text-3xl text-primary mb-6">Wohin geht&apos;s?</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Vorname" defaultValue="Max" className="border-2 border-outline-variant/40 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                      <input type="text" placeholder="Nachname" defaultValue="Mustermann" className="border-2 border-outline-variant/40 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                    </div>
                    <input type="email" placeholder="E-Mail" defaultValue="max@example.de" className="w-full border-2 border-outline-variant/40 rounded-xl px-4 py-3 mb-4 focus:border-primary outline-none" />
                    <input type="text" placeholder="Straße & Hausnummer" defaultValue="Sportweg 1" className="w-full border-2 border-outline-variant/40 rounded-xl px-4 py-3 mb-4 focus:border-primary outline-none" />
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <input type="text" placeholder="PLZ" defaultValue="65510" className="border-2 border-outline-variant/40 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                      <input type="text" placeholder="Stadt" defaultValue="Hünstetten" className="col-span-2 border-2 border-outline-variant/40 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                    </div>
                    <label className="flex items-center gap-3 mt-4 text-sm">
                      <input type="checkbox" checked={member} onChange={e => setMember(e.target.checked)} className="accent-primary w-4 h-4" />
                      Ich bin SGH-Mitglied (Mitgliedsnummer im nächsten Schritt)
                    </label>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="font-headline font-black italic uppercase text-3xl text-primary mb-6">Wie soll&apos;s ankommen?</h3>
                    <div className="space-y-3">
                      {[
                        { value: 4.90, icon: 'local_shipping', label: 'DHL Paket', sub: '2-4 Werktage · klimaneutral', display: '4,90€' },
                        { value: 9.90, icon: 'bolt', label: 'DHL Express', sub: 'Nächster Werktag', display: '9,90€' },
                        { value: 0, icon: 'storefront', label: 'Abholung Diehlenhof', sub: 'Vereinsheim · ab Donnerstag', display: 'GRATIS' },
                      ].map(opt => (
                        <label key={opt.value} className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer ${shipping === opt.value ? 'border-primary bg-primary/5' : 'border-outline-variant/40 hover:border-primary'}`}>
                          <input type="radio" name="ship" checked={shipping === opt.value} onChange={() => setShipping(opt.value)} className="accent-primary" />
                          <span className="material-symbols-outlined text-primary">{opt.icon}</span>
                          <div className="flex-1">
                            <div className="font-headline font-bold italic text-primary">{opt.label}</div>
                            <div className="text-xs text-on-surface-variant">{opt.sub}</div>
                          </div>
                          {opt.value === 0
                            ? <span className="font-headline font-black italic text-[#052856] bg-[#FDE000] px-2 py-1 rounded-lg text-sm">{opt.display}</span>
                            : <span className="font-headline font-black italic text-primary">{opt.display}</span>
                          }
                        </label>
                      ))}
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h3 className="font-headline font-black italic uppercase text-3xl text-primary mb-6">Wie zahlst du?</h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {['SEPA Lastschrift', 'Kreditkarte', 'PayPal', 'Kauf auf Rechnung'].map((label, i) => (
                        <label key={label} className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer ${i === 0 ? 'border-primary bg-primary/5' : 'border-outline-variant/40 hover:border-primary'}`}>
                          <input type="radio" name="pay" defaultChecked={i === 0} className="accent-primary" />
                          <span className="font-headline font-bold italic text-primary">{label}</span>
                        </label>
                      ))}
                    </div>
                    <input type="text" placeholder="IBAN · DE12 3456 7890 1234 5678 90" className="w-full border-2 border-outline-variant/40 rounded-xl px-4 py-3 mb-3 focus:border-primary outline-none font-mono" />
                    <input type="text" placeholder="Mitgliedsnummer (optional, für 10% Rabatt)" className="w-full border-2 border-outline-variant/40 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                  </>
                )}
                {step === 4 && (
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-[#FDE000] grid place-items-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-[#052856] text-5xl">check</span>
                    </div>
                    <h3 className="font-headline font-black italic uppercase text-4xl text-primary mb-3">Danke!</h3>
                    <p className="text-on-surface-variant mb-6">Deine Bestellung <span className="font-bold text-primary">#SGH-2026-04219</span> ist eingegangen. Du erhältst eine Bestätigung per E-Mail.</p>
                    <div className="bg-surface-container rounded-2xl p-6 text-left max-w-md mx-auto">
                      <div className="flex justify-between text-sm mb-2"><span>Lieferung erwartet</span><span className="font-bold">12.–14. Mai 2026</span></div>
                      <div className="flex justify-between text-sm mb-2"><span>Tracking</span><span className="font-bold text-primary">Sobald verfügbar</span></div>
                      <div className="flex justify-between text-sm"><span>Status</span><span className="text-[#2E7D32] font-bold flex items-center gap-1"><span className="material-symbols-outlined text-base">verified</span>Bestätigt</span></div>
                    </div>
                    <button onClick={() => { setCheckoutOpen(false); setCart({}); }} className="mt-8 bg-primary text-white px-8 py-4 rounded-xl font-headline font-black italic uppercase tracking-wider">
                      Weiter shoppen
                    </button>
                  </div>
                )}

                {step < 4 && (
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(s => Math.max(1, s - 1))}
                      style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                      className="px-6 py-3 rounded-xl border-2 border-outline-variant/40 font-headline font-black italic uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary"
                    >
                      Zurück
                    </button>
                    <button
                      onClick={() => setStep(s => Math.min(4, s + 1))}
                      className="px-8 py-3 rounded-xl bg-[#FDE000] text-[#052856] font-headline font-black italic uppercase tracking-wider hover:scale-105 transition-transform"
                    >
                      {step === 3 ? 'Bestellung abschicken' : 'Weiter'}
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-surface-container-low p-8 border-l border-outline-variant/40">
                <h4 className="font-headline font-black italic uppercase text-primary text-lg mb-4">Deine Bestellung</h4>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2 mb-6 no-scrollbar">
                  {cartArr().map(c => (
                    <div key={c.id} className="flex gap-3 items-center text-sm">
                      <div className="w-12 h-14 rounded-lg bg-surface-container-lowest overflow-hidden shrink-0 border border-outline-variant/30" dangerouslySetInnerHTML={{ __html: swatchSVG(c.p) }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-primary truncate">{c.p.name}</div>
                        <div className="text-xs text-on-surface-variant">Größe {c.size === 'kids' ? '116-164' : c.size} · {c.qty}x</div>
                      </div>
                      <div className="font-headline font-black italic text-primary">{eur(c.p.price * c.qty)}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-outline-variant/40 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Zwischensumme</span><span>{eur(coSub)}</span></div>
                  <div className="flex justify-between"><span>Versand</span><span>{eur(shipping)}</span></div>
                  <div className="flex justify-between text-[#2E7D32]"><span>Mitgliederrabatt</span><span>−{eur(coDisc)}</span></div>
                  <div className="flex justify-between font-headline font-black italic text-2xl text-primary pt-3 border-t border-outline-variant/40 mt-3">
                    <span>GESAMT</span><span>{eur(coTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TOAST ===== */}
      <div
        className="fixed bottom-6 left-1/2 z-[60] bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 transition-all duration-300 pointer-events-none"
        style={{ transform: `translateX(-50%) translateY(${toastVisible ? '0' : '20px'})`, opacity: toastVisible ? 1 : 0 }}
      >
        <span className="material-symbols-outlined text-[#FDE000]">check_circle</span>
        <span>{toastMsg}</span>
      </div>
    </>
  )
}
