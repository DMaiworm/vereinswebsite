import { fetchClubConfig, fetchSponsors, fetchPublicNews } from '@/lib/api'
import type { NewsEintrag } from '@/lib/api'
import BaseNav from '@/components/shared/layout/BaseNav'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import ShopGrid, { type ShopProduct } from '@/components/shared/sections/ShopGrid'
import GalerieSnapshots from '@/components/shared/sections/GalerieSnapshots'
import TrainerCta from '@/components/shared/sections/TrainerCta'
import AktuellesSection from '@/components/home/AktuellesSection'
import TrainerSection from '@/components/tischtennis/TrainerSection'

const TT_NAV = [
  { label: 'Teams',    href: '#',        active: true },
  { label: 'Trainer',  href: '#trainer' },
  { label: 'Galerie',  href: '#galerie' },
  { label: 'Fan-Shop', href: '#shop' },
]

export default async function TischtennisPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  let vereinsNews: NewsEintrag[] = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl
    {
      sponsors = await fetchSponsors().catch(() => [])
      vereinsNews = await fetchPublicNews({ scope: 'verein' }).then(r => r.data).catch(() => [])
    }
  } catch {
    // Fallback: hardcoded logo bleibt über src-Attribut
  }

  const logoSrc = logoUrl ?? 'https://lh3.googleusercontent.com/aida/ADBb0ugEHEH_SmWv3OWV3CakUjK1PrkqJfqepaRL2jyBXFrELhC3lfUsxJGewe38WdtjCp3o4W7uA8Q85UKm6wcDJ46IpBuqOQYpiI-nzBT83zl77I-kymLxRY44Qd_QhJoiMkvUHaSo-lG2jJzO48OZ1b5QVFKojKGXnSisRddfCeG9b9JJ6wLQYorc-SdGQDejUGj_aMy0gN-CD0vBvUBo9SHRhWhiOdAQ97Fav75TDcxQpTXhZznXTNMKu9yvVpG-r7prTDcPXIP4uw'


  const products: ShopProduct[] = [
    { name: 'Allwetter-Jacke "Pro"',    sub: 'Deep Blue Legacy Design', price: '79,90 €', badge: 'Bestseller', alt: 'Allwetter-Jacke', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2V573FaaC-lVusVrI44uQ4b8GywIhs4Pv0YY4uVEcQjsfykdHlJ-3ZMSIeq3S64XdL0FCElOAV6zVUGd7s1jTe443LBiv2DLff75lhUr14QiT4FeN6Qh96s6W2wFEpZX3QhOiHyw48c3dtFldd14dli3cmS76ZXS5wW9IYsevyF1vFDiUo-YADYAW_s99PcHaRs7glmpNMEkTJiChfx1e2Rtrmh2rDCm23aZFYayg5B7mDjFyEGGbn4HVw8XEZdSK1LjID0ig-Tg' },
    { name: 'Fan-Schal "Hünstetten"',    sub: '100% Tradition',          price: '14,90 €', alt: 'Fan-Schal',      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q0bbCYYA1o_fEJC1eE-OLtre38sf5ox-Bg7V6gWKq15a0uG4Yimd7dc7otaKOcYE1z0Re6QIyPMZxd1FIkNnJ-rAGWHi7sxUa_w9I60zy6XjW8fOVTx8WyM_UM4mdRV5MpDa2T2kQyGE7YzclOTBuk9wxzWFxW5tuSL2mzsp4Mes8pjXVEkNfJOp7gdMnGdy8xvUR_cL7c7OaLt0RL-1OdK-PWvwaS_j_G4LYcJVsjpmbKdQOss3Q0hSpHd3UyKMGhes1Ht4hLs' },
    { name: 'Wintermütze Classic',       sub: 'Hält den Kopf warm',       price: '19,90 €', alt: 'Wintermütze',    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXWCGJ56x1UUt8159dza99Z5DXkt_3rgmKeNiZo' },
    { name: 'Polo-Shirt Vereinsliebe',   sub: 'Pikée-Qualität',           price: '34,90 €', alt: 'Polo-Shirt',     src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv0I899I6DiERhzC4IisiBfNU5ZLu-IClwoxh8ARV2DAO1CCk9re4gyyv9mzxrw2wT_PwxspLBwvkUUn4wtmZbJieXKFZNaz6mWwAARsLfCl6mqwPDsCyDVWSNKxu0jXT7RR5Qbkj4WUvdpQVmclOWkOa8_zR-3ZyiZ2AkCvwnCocgrWzMe8d_3Um-Jfkc1mw0Oi3w54CvMdM61IekryK3sikL075v7rJdTdt2AIMcMnL9YPy2oUL_PCjUv4gJ9NRpaScXzgqd-8' },
  ]

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">

      <BaseNav logoUrl={logoSrc} clubName="Hünstetten" departmentLabel="Tischtennis" navItems={TT_NAV} homeHref="../" />

      <main className="pt-16">

        {/* Hero Section */}
        <header className="relative h-[65vh] min-h-[720px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Professional table tennis player mid-stroke" className="w-full h-full object-cover object-center scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfW7XVb14seI6O6Sra1jRcp8yoONHk7t9ArFhKbOBVr9AYe-rjig3eae0cadQhdesDXroTyaVeOOKs_AxTqzQxCMwF_kxv8sD_H3yUYBb78Nn-nxWMtPj5oO1qzFxBOzI0igxBBEBZ0TNsK7gppNV50OkmntpyEqsqrjc6hNRVm6KqaXLKVdE6CZoPtx3ClpTMKXU9himoBTqKvWid2sraywBTIOnHaaJwaV0iEieCObC-anYAL0HbRDGIoQPQ51k_84jA8tuoZ1E" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,0.92)] via-[rgba(5,40,86,0.45)] to-transparent" />
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6 animate-pulse">Sektion Tischtennis</span>
              <h1 className="font-headline font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl" style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}>
                Tischtennis <br /> <span className="text-secondary-container">in seiner ganzen</span> <br /> Pracht.
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mt-12">
                <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-xl font-headline font-extrabold text-xl shadow-2xl hover:translate-y-[-4px] transition-all flex items-center gap-3 group">
                  Auf Warteliste setzen
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
                <div className="flex items-center gap-4 text-white/80 cursor-pointer">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <span className="font-bold tracking-tight">Magazin Teaser ansehen</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <AktuellesSection news={vereinsNews} />

        <TrainerSection />

        {/* Senioren I Section */}
        <section className="py-12 bg-primary text-white relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-container opacity-30 transform skew-x-12" />
          <div className="max-w-[1440px] mx-auto px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-8">
              <div>
                <h2 className="font-headline font-black leading-none mb-4 text-white uppercase tracking-tighter" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>Unsere Senioren I</h2>
                <p className="text-xl text-white opacity-90 font-medium max-w-xl">Erfahrung trifft Leidenschaft. Mehr als nur ein Team – eine Gemeinschaft, die seit Jahrzehnten zusammenhält.</p>
              </div>
              <div className="text-right">
                <span className="text-8xl font-headline font-black text-secondary-container">#1</span>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Seniors team photo" className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCUUGbyb0MLFOOByEPT1Dhn2ZaFxjP3Ql_dWFSaBGMLF6gj9WHXQ2Nqw5WCDl5-O686ZDOAFeHrxnBF0QW3zNFTwHhYp8_tRbCYjaZfveFmr2CsprMAXIZRYX1iem5s2quopDHG2Dosqb5req5p_bXAt7SHCpo4YFdRKuVeH31_E45GQAJsND27iMgvf9F6Ffq2VATdaBFsTW7vvrt185uP9pZ9Q1XO2Hmo6rUFotQLFY3Rm2VaD-e9QI7xfqm1Zakp0Bz5Pwcl4A" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-12">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex -space-x-4">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATiTZMefLXC8urVTYGJvTCs-qht4PLlaDpYJbuQRiFKy4NQ6tG-wy1y_vPi4AdoWxegyBklhonrC6eN_0WU3qeLquLijI7MOOLN5-5izxKPcUju_Kesf9tk-cYPcPzdIsTC-CgEOMeco_Ui6uW4LVIbCd87rESRBvcofgAbxWB08LomWomEkwVqfqRucQGfaMcPt6PFGhNNjYVxAPuFdScNzNkQTIgN4yzG6kt6GWLYabBuCB0iPDixPFf0b9oBp81u4jYdnXibeo" />
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAMaGKixG2Ae8bYHEq2AMpOmlBP-_lX5KLPhFczQrm0Rum1BvUVPFazRFImZuLHRXoA-ZqpfAGiiinLGeCTH3f142HKv0pA4IvfCJc1R200vw62Z6668sTYi27HveeAMucJUTjY3y96HDCkLyYos6PE7O3qLHaMYgHub9y5qeC6uoXaUC3Z8XBPM4_rRvVkKHtGUMmk3aFDnlDgwwtbtcPchLk6dN8nXA1kkDXpRFw2qma0L_NJee4mOpRfW0WSDulkE4BcbjruN0" />
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCjsnVvngskWpomqABnIgqf9GLbDRixIZxEjM8hiFNltGqd6b7AeUATuYKCnHWe3-6OriHoqxBZh7Tutlplnz7agXhKUTMkBxmLUC5ciax7fPF_1P0VUG7Pvya7k6siyTibqcCHL9vjg9t3BhMmIIB-53b_f6UyR7YhSC6Z2Gn87AxIXsB_42sefr4-zoPoV5MRC01D4qgGQld0ETF_60K7QXAPktqzvU3FUYRYcRb2ir6pHkez5YRFo-ctV_VLnC9BinkiuOizUw" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-white">12 Aktive Mitglieder &amp; Wachsend</p>
                  <div className="flex items-center gap-4 ml-8 border-l border-white/20 pl-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary-container/80">Mannschaftspaten &amp; Partner</span>
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-lg">
                          <span className="text-[8px] font-black text-primary text-center leading-tight">LOGO SPONSOR 1</span>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-lg">
                          <span className="text-[8px] font-black text-primary text-center leading-tight">LOGO SPONSOR 2</span>
                        </div>
                        <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center p-2 backdrop-blur-sm">
                          <span className="text-[8px] font-black text-white text-center leading-tight uppercase">Support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GalerieSnapshots
          main={{ alt: 'Team celebration', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANC1Jmb3-v_58mdtC_yLYsU6xzUSAZQGkiwLgqDu8Hyrfmd2ul6sH4nMs3Om1Mn5E-YRMYTYO_JKoIQc6OPac9M01CXjEl2-doWkaPzDnhDjW56qB7ZRkZvas8ET29T_O__avPysestctDj9wTlwW6AUtW05GDt6qL27DhLTMcX16YCTbh-IxaBbxVO9W3RBi3HXC3Wbju2YR8V5gIDdO-jXAeL3-aEXRHRiPS190KysCJmAQAZxrvsgLhR44zStI57xAzieXcQg4' }}
          topRight1={{ alt: 'Concentrated player', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwcwyWIfVBNfEWGcTRBkPfs4ns9FGgfUnHHxHeQsBSFt3l3LkLdVQGQaFe5gyhXETm4L43a0OFc_MhHuppCcCY8K2Wy3O4VnqqUP3VGLkFZxl_vZ5YBScxlfofyqUM8au_JcdWpSENP-5KRqtGc4D7FMxzv1fr0-AadJoAa37IsseqgplXSWicB6AjV5pe_y1R3pZZH-MkG9xzZuy7cLXxLusPGfLn1T3kmNAlKBmDtzrzm7iQjRoF1MCaW1sqayKMSnDF9LkHIJ0' }}
          topRight2={{ alt: 'Fast movement', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5fiQCX0Vakkx-dhVwUsqe9ZQx7GpMt22uu_nR8o9jEWxQjR4EONB0gwvTaVGR4viWDTPcGvmPSg106oh1-konSs5bSv26AYJIbLpN6yoTUkoszw2bHNuHAIz_bpZr8fjAUVT-42GfBWo_C92vJfiw2FUkn3BH8G8p4_9qfnVTp5IvO9cAP4EElvhGUHnAVCX9eFzGJc3leJPwvsuQCE8gilbD2re9qE8P3uMA8EVWtOn8Gs2BIQuoa-X4Nf68IPWlSKFgpl3K4V0' }}
          bottom={{ alt: 'Training hall', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeWSlKVwKt1cCMQPdqXFEwCFRol5_tLAXFrEmUTTfge071ua6DXltEOUHT9V-7_IIZMYCeByJ5Yg6XppVHblbIlqzRZZ3Z7e8b7WLUBVtnPd4KmYtTe_WM3lLbcdIYoi45tF0FqPit-haZjBao9yVkxurDCr8KAmYprAKdS3UjUIE6_nIZOAGMVIj1PGKLFdh-FDOCZ3nFtccYk9RKYPYHTple1_s_EnONwobwSFqsmM2sWautlyKciWQRuNjRCksqHbnXvw40WdE' }}
        />

        <TrainerCta
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBtKhbowifKsn7oqE6E8TSJakwD7NAMLP08mHEhH2jbSpPXwzFHK8uYbs2N16Pzb7MlkoYqUTKUYISSaXa15bznoEF-8iLsYOJT432ZORNgjjSDrXUiD9knE7VZk2i9jNtHO_LcMhMWxfYvD2p44ciAI5ngTn8Em6ZhrEQo7DL8_Z8vjVabUpw2JdMbUNldql9YUZCTPhIFGH-djL5OiCi7XxbvDgVXWQspI3709WZVnPn5GnRv52ztvyWw6yc-NSYMjCj5fV3z5zQ"
          imageAlt="Coaching youth"
        />

        <ShopGrid variant="md3" products={products} />

      </main>

      <SponsorBand sponsors={sponsors} />

      <SiteFooter logoUrl={logoSrc} departmentLabel="Tischtennis" />

    </div>
  )
}
