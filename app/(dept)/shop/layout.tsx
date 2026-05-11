import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fan-Shop | SG Hünstetten',
}

const CSS = `
  .shop-kinetic-slant { transform: skewX(-12deg); }
  .shop-kinetic-rotate { transform: rotate(-2deg); }
  .shop-placeholder-img { background: repeating-linear-gradient(45deg,#1a3260 0,#1a3260 2px,#223e6d 2px,#223e6d 14px); }
  .shop-product-card { transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease; }
  .shop-product-card:hover { transform: translateY(-6px); }
  .shop-product-card:hover .shop-product-img { transform: scale(1.04); }
  .shop-product-img { transition: transform .6s cubic-bezier(.2,.8,.2,1); }
  .shop-chip-active { background:#052856 !important; color:#FDE000 !important; }
  .shop-step-dot.active { background:#FDE000; }
  .shop-step-dot.done { background:#052856; }
  .shop-heart-active { color:#BA1A1A !important; font-variation-settings:'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24; }
  .shop-drawer { transform: translateX(100%); transition: transform .35s cubic-bezier(.2,.8,.2,1); }
  .shop-drawer.open { transform: translateX(0); }
  .shop-modal-bg { opacity: 0; pointer-events: none; transition: opacity .25s ease; }
  .shop-modal-bg.open { opacity: 1; pointer-events: auto; }
`

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  )
}
