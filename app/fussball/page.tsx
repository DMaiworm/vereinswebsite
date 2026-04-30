import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import ShopGrid, { type ShopProduct } from '@/components/shared/sections/ShopGrid'
import NewsGrid, { type NewsPostMd3 } from '@/components/shared/sections/NewsGrid'
import AlteHerrenBanner from '@/components/fussball/AlteHerrenBanner'
import ZweiteSection from '@/components/fussball/ZweiteSection'
import SpieltagsZentraleHorizontal from '@/components/fussball/SpieltagsZentraleHorizontal'

const FUSSBALL_PRODUCTS: ShopProduct[] = [
  { name: 'Allwetter-Jacke "Pro"',    sub: 'Deep Blue Legacy Design', price: '79,90 €', badge: 'Bestseller', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2V573FaaC-lVusVrI44uQ4b8GywIhs4Pv0YY4uVEcQjsfykdHlJ-3ZMSIeq3S64XdL0FCElOAV6zVUGd7s1jTe443LBiv2DLff75lhUr14QiT4FeN6Qh96s6W2wFEpZX3QhOiHyw48c3dtFldd14dli3cmS76ZXS5wW9IYsevyF1vFDiUo-YADYAW_s99PcHaRs7glmpNMEkTJiChfx1e2Rtrmh2rDCm23aZFYayg5B7mDjFyEGGbn4HVw8XEZdSK1LjID0ig-Tg', alt: 'Blue club rain jacket with logo' },
  { name: 'Fan-Schal "Hünstetten"',   sub: '100% Tradition',          price: '14,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q0bbCYYA1o_fEJC1eE-OLtre38sf5ox-Bg7V6gWKq15a0uG4Yimd7dc7otaKOcYE1z0Re6QIyPMZxd1FIkNnJ-rAGWHi7sxUa_w9I60zy6XjW8fOVTx8WyM_UM4mdRV5MpDa2T2kQyGE7YzclOTBuk9wxzWFxW5tuSL2mzsp4Mes8pjXVEkNfJOp7gdMnGdy8xvUR_cL7c7OaLt0RL-1OdK-PWvwaS_j_G4LYcJVsjpmbKdQOss3Q0hSpHd3UyKMGhes1Ht4hLs', alt: 'Yellow and blue striped scarf' },
  { name: 'Wintermütze Classic',      sub: 'Hält den Kopf warm',       price: '19,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXWCGJ56x1UUt8159dza99Z5DXkt_3rgmKeNiZo', alt: 'Navy blue beanie with yellow embroidery' },
  { name: 'Polo-Shirt Vereinsliebe',  sub: 'Pikée-Qualität',           price: '34,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv0I899I6DiERhzC4IisiBfNU5ZLu-IClwoxh8ARV2DAO1CCk9re4gyyv9mzxrw2wT_PwxspLBwvkUUn4wtmZbJieXKFZNaz6mWwAARsLfCl6mqwPDsCyDVWSNKxu0jXT7RR5Qbkj4WUvdpQVmclOWkOa8_zR-3ZyiZ2AkCvwnCocgrWzMe8d_3Um-Jfkc1mw0Oi3w54CvMdM61IekryK3sikL075v7rJdTdt2AIMcMnL9YPy2oUL_PCjUv4gJ9NRpaScXzgqd-8', alt: 'White polo shirt with blue club crest' },
]

const FUSSBALL_NEWS: NewsPostMd3[] = [
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHvVAleUYJuzPYEJLha9Mltwo3iwaT9oBgo3mEwObzsZoanwYaw01L-KbX3TIRuOVq2XwRtuklNU8uwJXsv5RNoKW9dPZN0F7C04pxnTGPE8SYCZkwBKG_R9oBuK_TI2umowvmVNXm9VU1QcN_B8DjxP2IVZcXRnOFd8UYxNtkHViFHXMn3b8yWMuuz1MHb317fpziGXFfGHZhunvvp2LLDw4QyMYSa-XRDsesuYe2QhSPbEC9kt8BZvZKddVlJ5vXPV8cojxLm8c', alt: 'Action from last weekend match', title: 'Historischer Heimsieg', likes: 124, tag: 'Spielbericht lesen', icon: 'photo_library' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDroGgypJqh_NjO26ER5fmmp56PlgowMJOWIjKMLS20CbTtiIvvdTTjCQPD5xtD_MUoRMSSf8h_9ZIVaVI4wVror7hxPPuNUX1KyTCgYEI6VChhP0klIMolspXmr74ZahILL0CrTKN2bkdDa3bdcpplic8sH8H6rwfww_DPytZQYFpXx8rqu61lgYgIYuF60sZBkCOYaGZ8It84tCZIESow35BN00zmMJoVridedgX9DiyPF3sSA2NA2HzayUsxJql5EvP360LmCog', alt: 'New training equipment arriving', title: 'Fokus auf Derby-Woche', likes: 89, tag: 'Trainings-Update', icon: 'videocam' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPIYsb43XGuYJPaQPMsMkUxdP1MiQ-2FS6AfGfmI272VB6MSI11yEgJX0PyxIIqiBcy_AmskdhJwP_824zxujCJiqdAIBXlCVl3LT9cTQS31cJsVUnjQ4Hy402hjpa7VK8xfj12ihI3hJkQlDpw6JGah09c25k9erGCUErHwVhE0mVBdplggsrrhTrrfF1fY6yZYqLxUYkFVVioMYieixqVTHE9i2_MAe368jFMQzvu3bG4sTNCba8ZxQ02fLPn1lf-HOwt7TxHVc', alt: 'Fans celebrate together', title: 'Danke für den Support', likes: 210, tag: 'Fan-Galerie', icon: 'image' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg19QyLYNyYlt7Lxm0rcY_e3vrfthaqQnGTam4_dPbWeIC7lDPq_rl5IlkB6RsM6j_U71wEjmhRt5onNLHV9_WZzyxyagrj4YEz8aiBCcDdJuPSprLfwAdnnoBPmglJiAZjQI1eAOgN-P8KlcbSSDRqsS_fwpjfrVTH6a1G1grMti7B3EDcxcs9Zq2oK8ZfTIH_u84k5i1O4rTgupjttwATpmZggyaMuDY6Xep5pD6j7WAlX4NAQdfGMvB7qoiA76SknEbaopAeN0', alt: 'Ball in mid-air during match', title: 'Transfer-Update', likes: 156, tag: 'Neuverpflichtung', icon: 'notifications' },
]

const FUSSBALL_NAV = [
  { label: '1. Mannschaft', href: '#',        active: true },
  { label: '2. Mannschaft', href: '#zweite' },
  { label: 'Alte Herren',   href: '#alte-herren' },
  { label: 'Fan-Shop',      href: '#shop' },
]

export default async function FussballPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* render without logo/sponsors */ }

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        departmentLabel="Fußball"
        navItems={FUSSBALL_NAV}
        ctaLabel="Probetraining"
      />

      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative h-[65vh] max-h-[700px] flex items-center overflow-hidden kinetic-gradient">
          <div className="absolute inset-0 opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover mix-blend-overlay" alt="Dynamic football action under floodlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0F7zNmUEL80ymp_mO1kHgTtn8at44ijkh1HejnBBpBLT2EmwbvhzPrqTvcF0EJLJ7cxEdAeNASPc5UxzWJmeI7FLxwRcc6wVM4arIY2V9Zs0yFLXzd52jAYL5HSIMICM_GHdlPziSwoZx0EpE2Vbm7A-o7_Ik0EaTn5ZqaIjyKIwvtkwvLLWLz7bb-aw9qhAebQ3GNQ1dmey1uWcdMrd7g-AcKr-p1USlZJotBVQVRkxNiPgMrRyk2ClNkHPPW2ZReNdykyNo034" />
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
            <div className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase animate-pulse">
              Tradition seit 1944
            </div>
            <h1 className="font-headline font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-4xl tracking-tighter">
              Fußball: <br />
              <span className="text-secondary-container italic">Tradition &amp; Leidenschaft</span>
            </h1>
            <p className="mt-8 text-on-primary-container text-xl md:text-2xl max-w-xl font-medium leading-relaxed">
              Willkommen im sportlichen Herzstück von Hünstetten. Wo Kameradschaft auf Leistung trifft.
            </p>
          </div>
        </section>

        <SponsorBand sponsors={sponsors} />

        {/* 1. Mannschaft */}
        <section className="pt-24 pb-12 bg-surface overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-primary font-headline font-bold text-lg">Regionalklasse West</span>
                <h2 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-primary mt-2 uppercase">1. MANNSCHAFT</h2>
              </div>
              <div className="flex gap-4">
                <div className="bg-surface-container-highest px-6 py-4 rounded-xl">
                  <span className="block text-xs uppercase font-bold text-outline">Platzierung</span>
                  <span className="text-3xl font-black text-primary">3.</span>
                </div>
                <div className="bg-surface-container-highest px-6 py-4 rounded-xl">
                  <span className="block text-xs uppercase font-bold text-outline">Punkte</span>
                  <span className="text-3xl font-black text-primary">42</span>
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Official team photo of 20+ soccer players" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmGvdf7JDjKnmgfYvXuXRth7cILXlDs1LXnWD3Maf8e9IddvQ9ffKI0IhM01mg7P4y1cUrYpQSL8zaI_FXKqLy1Zgbirtnrn0bgUdvO6tq9EYsYn6wAFgjOIL-7MrTt773dRbOVoBA96QFO4wdqdc5gUTAWpvwwheA5TeggTkH4mdBKedgQv4zVkUO_9RZrGHpvKzoXZchZzOg_4OIP4ho7APFMGiR5eX3ptXKYLNWjTl2KTJhuI1r5K02eKHq7iO6E44JiYsWHmU" />
              {/* from-primary/80 → rgba fix per CLAUDE.md */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,40,86,0.8)] to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-xl font-headline font-bold">Kader Saison 2024/25</p>
              </div>
            </div>
            <SpieltagsZentraleHorizontal />
          </div>
        </section>

        <NewsGrid
          variant="md3"
          departmentLabel="Fußball"
          posts={FUSSBALL_NEWS}
          socialLinks={[
            { platform: 'facebook',  handle: 'SG Hünstetten Fußball' },
            { platform: 'instagram', handle: '@SGHuenstetten_Fussball' },
            { platform: 'whatsapp',  handle: 'WhatsApp Channel' },
          ]}
        />

        {/* Staff Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8">
            <h2 className="text-3xl font-headline font-black tracking-tighter text-primary uppercase mb-10 border-b-2 border-primary pb-4 inline-block">STAFF</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Head Coach Timo Jung */}
              <div className="lg:col-span-7 bg-surface-container-low rounded-3xl p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:shadow-xl transition-all duration-500">
                <div className="w-full md:w-64 h-80 shrink-0 relative overflow-hidden rounded-2xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Head Coach Timo Jung" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRtgEWaCizGCs8T14xnJy9wrtUwtKi8dNCD9JeBZWodzAmAwKEqqNQ4dK4vTVAbyY62pTrPkdjxhYw1psQCEK4fUEnRAAhpuJBeOU-MgmFw8Y8F1_x2KtwvcY8RYFHWBQLlvcuvwtXhLs2IO7cuI7CGm153IzPBor5M7We228_P8xqjO0rdM2EvRBagQRQYTrWs7aR75SG_jrvgpqTyiVPsx7Rt-BQ2Y4lCfDeT3eQTfY4Mwe3aoDvGY0V33N8xiO6FfOzPaZjhj4" />
                  {/* from-primary/40 → rgba fix per CLAUDE.md */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,40,86,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">Head Coach</div>
                  <h3 className="text-4xl font-headline font-black text-primary mb-4 uppercase tracking-tighter">Timo Jung</h3>
                  <p className="text-base text-on-surface-variant leading-relaxed mb-6 font-medium">
                    Strategischer Vordenker mit einer klaren Vision für attraktiven Offensivfußball. Seit 2018 prägt er die sportliche Identität der SG Hünstetten und fördert konsequent junge Talente aus dem eigenen Unterbau.
                  </p>
                  <div className="flex gap-4">
                    <a className="inline-flex items-center gap-2 font-headline font-bold text-white bg-primary px-6 py-2.5 rounded-full shadow-md hover:bg-primary-container transition-all text-sm" href="#">
                      Vita &amp; Erfolge
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Additional Staff 2×2 */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {/* Nikolaij Melcher */}
                <div className="bg-surface-container rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                  <div className="w-28 h-28 mb-4 relative overflow-hidden rounded-xl shadow-md border-2 border-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portrait of Nikolaij Melcher" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAedbn3SHC539gw2MCq4odTyjIiR3FQNhBbnAdzBRODDJI9VKQRnpkbevE8B031iGcVOvn4EeRh0fZfRLTxPWi96rpYNylzDdWkuUWMBoCrNZmwJJEBxo7CkycgUj55Uu8Eo62R0XPTR14iKC8va4L2I8x_ougR_rGJK7aSWc8382HBcVbx8bvZiRr1iIByhuFkVBq0Yp_xE-Yg7qamYWJ0NK2_pu2JiZm2aPbvXbhvt20HpWcmwszU1R2JGblp_1SKVQT3FVQPBLg" />
                  </div>
                  <span className="text-secondary font-bold tracking-widest uppercase text-[9px] mb-1">Co-Trainer</span>
                  <h3 className="text-sm font-headline font-extrabold text-primary uppercase leading-tight">Nikolaij Melcher</h3>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium opacity-80">Spielende Unterstützung</p>
                </div>
                {/* Arno Grosmann */}
                <div className="bg-surface-container rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                  <div className="w-28 h-28 mb-4 relative overflow-hidden rounded-xl shadow-md border-2 border-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portrait of Arno Grosmann" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgNKSFNoWCARbYt6ThP0e4r9n8IieNXTyZxbFVsho_zyX67lFEIHgt5Ml0wdQRfxIeFtX-W9n58zQe3fef3aBRb3jN0RX2dx9HJxwtD-aDjvnUNyHL7HnL7HnNL7HnML-aDjvnUNyHL7HnNHL7Hnr9n8IieNXTyZxbFVsho_zyX67lFEIHgt5Ml0wdQRfxIeFtX-W9n58zQe3fef3aBRb3jN0RX2dx9HJxwtD-aDjvnUNyHL7Hn" />
                  </div>
                  <span className="text-secondary font-bold tracking-widest uppercase text-[9px] mb-1">Torwart-Trainer</span>
                  <h3 className="text-sm font-headline font-extrabold text-primary uppercase leading-tight">Arno Grosmann</h3>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium opacity-80">Torwartspiel &amp; Reflexe</p>
                </div>
                {/* Marcel Faust */}
                <div className="bg-surface-container rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                  <div className="w-28 h-28 mb-4 relative overflow-hidden rounded-xl shadow-md border-2 border-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portrait of Marcel Faust" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtx6GiUJCVRcwS_ca-s-ZNzUH_jkucyU7oANcb522AlyJcBoZ17O_LLcRQJDsFx_RgEq1zAF272QDa-AYvF9xKKT8kp_Yd9tNQ8tuBSCcxIsUu3eONIRxqqIhsqTeA8X-zIMl4Hk9IBQH833ZuEDNkJBs8pn3uqpaPqDxy-Kj8IGCI6e3aBr0Ri9YU-XYyNTz2zZEAg5PsI_zdV9Hc4wbvDZVB1gOxevfUMAYz65aVW02QZ_xEzZkQdGksblRUmB7r-oIMuC_OBao" />
                  </div>
                  <span className="text-secondary font-bold tracking-widest uppercase text-[9px] mb-1">Teammanager</span>
                  <h3 className="text-sm font-headline font-extrabold text-primary uppercase leading-tight">Marcel Faust</h3>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium opacity-80">Organisation &amp; Logistik</p>
                </div>
                {/* Hans Jung */}
                <div className="bg-surface-container rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                  <div className="w-28 h-28 mb-4 relative overflow-hidden rounded-xl shadow-md border-2 border-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portrait of Hans Jung" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhew3JHMhDdgHYu_tiHKNPxK3hyCX91YHEvo0Bmd7YHUl1V1X48Loo4kJA9wUjHnYW0fElIgySm6LQPQRcc5DfUTIQED5V8bItcRFgmHn7wISNkPOrdrkkGMV-TtilEnhn2bjoUqlFW62QOBAeTVc0WAOEEajW9iC4wzCfv5VJQl7IjFGZ04H1UBYaMnCNLlj-29NrIP7VU4xOBzEqXYKQ-cwPewAolDkKyzc9LnXhBiEoz3Zb1AQlwZJ5jq9ysz1hnh87NRzNgV8" />
                  </div>
                  <span className="text-secondary font-bold tracking-widest uppercase text-[9px] mb-1">Sportl. Leiter</span>
                  <h3 className="text-sm font-headline font-extrabold text-primary uppercase leading-tight">Hans Jung</h3>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium opacity-80">Kaderplanung &amp; Vision</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SponsorBand sponsors={sponsors} />

        <ZweiteSection />

        <AlteHerrenBanner />

        <ShopGrid variant="md3" products={FUSSBALL_PRODUCTS} />

      </main>

      <SponsorBand sponsors={sponsors} />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Fußball" />
    </>
  )
}
