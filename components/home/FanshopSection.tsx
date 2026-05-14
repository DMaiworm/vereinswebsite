'use client';

import Link from 'next/link';

const PRODUCTS = [
  {
    name: 'Allwetter-Jacke "Pro"',
    sub: 'Deep Blue Legacy Design',
    price: '79,90 €',
    badge: 'Bestseller',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2V573FaaC-lVusVrI44uQ4b8GywIhs4Pv0YY4uVEcQjsfykdHlJ-3ZMSIeq3S64XdL0FCElOAV6zVUGd7s1jTe443LBiv2DLff75lhUr14QiT4FeN6Qh96s6W2wFEpZX3QhOiHyw48c3dtFldd14dli3cmS76ZXS5wW9IYsevyF1vFDiUo-YADYAW_s99PcHaRs7glmpNMEkTJiChfx1e2Rtrmh2rDCm23aZFYayg5B7mDjFyEGGbn4HVw8XEZdSK1LjID0ig-Tg',
  },
  {
    name: 'Fan-Schal "Hünstetten"',
    sub: '100% Tradition',
    price: '14,90 €',
    badge: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q0bbCYYA1o_fEJC1eE-OLtre38sf5ox-Bg7V6gWKq15a0uG4Yimd7dc7otaKOcYE1z0Re6QIyPMZxd1FIkNnJ-rAGWHi7sxUa_w9I60zy6XjW8fOVTx8WyM_UM4mdRV5MpDa2T2kQyGE7YzclOTBuk9wxzWFxW5tuSL2mzsp4Mes8pjXVEkNfJOp7gdMnGdy8xvUR_cL7c7OaLt0RL-1OdK-PWvwaS_j_G4LYcJVsjpmbKdQOss3Q0hSpHd3UyKMGhes1Ht4hLs',
  },
  {
    name: 'Wintermütze Classic',
    sub: 'Hält den Kopf warm',
    price: '19,90 €',
    badge: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXGmiO1y7_Xe7gdB9MBN9J5DQW9dXxZ3cdiLKr6I',
  },
  {
    name: 'Polo-Shirt Vereinsliebe',
    sub: 'Pikée-Qualität',
    price: '34,90 €',
    badge: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv0I899I6DiERhzC4IisiBfNU5ZLu-IClwoxh8ARV2DAO1CCk9re4gyyv9mzxrw2wT_PwxspLBwvkUUn4wtmZbJieXKFZNaz6mWwAARsLfCl6mqwPDsCyDVWSNKxu0jXT7RR5Qbkj4WUvdpQVmclOWkOa8_zR-3ZyiZ2AkCvwnCocgrWzMe8d_3Um-Jfkc1mw0Oi3w54CvMdM61IekryK3sikL075v7rJdTdt2AIMcMnL9YPy2oUL_PCjUv4gJ9NRpaScXzgqd-8',
  },
];

export default function FanshopSection() {
  return (
    <section className="py-10 bg-[#f6f3f2]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-display font-black text-[#052856] tracking-tighter uppercase">
              SG Hünstetten Fan-Shop
            </h2>
            <p className="text-[#44474f] mt-2 text-lg italic">Zeig Flagge für deinen Verein.</p>
          </div>
          <Link
            href="./shop"
            className="flex items-center gap-3 px-8 py-4 bg-[#052856] text-white rounded-xl font-display font-bold hover:bg-[#0a3568] transition-all label-cap"
          >
            Alle Artikel
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-white p-6 rounded-[2rem] group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-square rounded-2xl bg-[#f0eded] overflow-hidden mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={p.name}
                  src={p.img}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background =
                      'repeating-linear-gradient(45deg,#1a3260 0,#1a3260 2px,#223e6d 2px,#223e6d 14px)';
                  }}
                />
                {p.badge && (
                  <span className="absolute top-4 right-4 bg-[#fde000] text-[#052856] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {p.badge}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-[#052856] text-xl">{p.name}</h4>
              <p className="text-[#747780] text-sm mt-1">{p.sub}</p>
              <div className="flex justify-between items-center mt-6">
                <span className="text-2xl font-black text-[#052856]">{p.price}</span>
                <div className="w-10 h-10 rounded-full bg-[#f0eded] flex items-center justify-center hover:bg-[#fde000] transition-colors">
                  <span className="material-symbols-outlined text-[#052856] text-sm">add_shopping_cart</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
