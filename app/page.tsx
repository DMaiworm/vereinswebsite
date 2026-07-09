import { fetchClubConfig, fetchSponsors, fetchPublicNews } from '@/lib/api';
import type { NewsEintrag } from '@/lib/api';
import { asset, internalHref } from '@/lib/assetPath';
import BaseNav from '@/components/shared/layout/BaseNav';
import Hero from '@/components/Hero';
import AbteilungenGrid from '@/components/AbteilungenGrid';
import SponsorBand from '@/components/shared/layout/SponsorBand';
import SiteFooter from '@/components/shared/layout/SiteFooter';
import AktuellesSection from '@/components/home/AktuellesSection';
import KursangebotSection from '@/components/home/KursangebotSection';
import KursDerWocheSection from '@/components/home/KursDerWocheSection';
import ZahlenTraditionSection from '@/components/home/ZahlenTraditionSection';
import ShopGrid, { type ShopProduct } from '@/components/shared/sections/ShopGrid';

const HOME_PRODUCTS: ShopProduct[] = [
  { name: 'Allwetter-Jacke "Pro"',   sub: 'Deep Blue Legacy Design', price: '79,90 €', badge: 'Bestseller', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2V573FaaC-lVusVrI44uQ4b8GywIhs4Pv0YY4uVEcQjsfykdHlJ-3ZMSIeq3S64XdL0FCElOAV6zVUGd7s1jTe443LBiv2DLff75lhUr14QiT4FeN6Qh96s6W2wFEpZX3QhOiHyw48c3dtFldd14dli3cmS76ZXS5wW9IYsevyF1vFDiUo-YADYAW_s99PcHaRs7glmpNMEkTJiChfx1e2Rtrmh2rDCm23aZFYayg5B7mDjFyEGGbn4HVw8XEZdSK1LjID0ig-Tg', alt: 'Allwetter-Jacke' },
  { name: 'Fan-Schal "Hünstetten"',  sub: '100% Tradition',          price: '14,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q0bbCYYA1o_fEJC1eE-OLtre38sf5ox-Bg7V6gWKq15a0uG4Yimd7dc7otaKOcYE1z0Re6QIyPMZxd1FIkNnJ-rAGWHi7sxUa_w9I60zy6XjW8fOVTx8WyM_UM4mdRV5MpDa2T2kQyGE7YzclOTBuk9wxzWFxW5tuSL2mzsp4Mes8pjXVEkNfJOp7gdMnGdy8xvUR_cL7c7OaLt0RL-1OdK-PWvwaS_j_G4LYcJVsjpmbKdQOss3Q0hSpHd3UyKMGhes1Ht4hLs', alt: 'Fan-Schal' },
  { name: 'Wintermütze Classic',     sub: 'Hält den Kopf warm',       price: '19,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXGmiO1y7_Xe7gdB9MBN9J5DQW9dXxZ3cdiLKr6I', alt: 'Wintermütze' },
  { name: 'Polo-Shirt Vereinsliebe', sub: 'Pikée-Qualität',           price: '34,90 €', badge: null,         src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv0I899I6DiERhzC4IisiBfNU5ZLu-IClwoxh8ARV2DAO1CCk9re4gyyv9mzxrw2wT_PwxspLBwvkUUn4wtmZbJieXKFZNaz6mWwAARsLfCl6mqwPDsCyDVWSNKxu0jXT7RR5Qbkj4WUvdpQVmclOWkOa8_zR-3ZyiZ2AkCvwnCocgrWzMe8d_3Um-Jfkc1mw0Oi3w54CvMdM61IekryK3sikL075v7rJdTdt2AIMcMnL9YPy2oUL_PCjUv4gJ9NRpaScXzgqd-8', alt: 'Polo-Shirt' },
]

const HOME_NAV = [
  { label: 'Aktuelles',   href: '#aktuelles' },
  { label: 'Kursangebot', href: '#kursangebot' },
  { label: 'Abteilungen', href: '#abteilungen' },
  { label: 'Shop',        href: './shop' },
];

export default async function HomePage() {
  const config   = await fetchClubConfig();
  const sponsors = await fetchSponsors().catch(() => []);
  const vereinsNews: NewsEintrag[] = await fetchPublicNews({ scope: 'verein' })
    .then(r => r.data)
    .catch(() => []);
  const logoUrl = config.logoWebUrl ?? config.logoUrl;

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        clubName={config.name}
        navItems={HOME_NAV}
        ctaLabel="Mitglied werden"
        ctaHref="./mitgliedschaft"
      />

      <main>
        {/* 1 – Hero */}
        <Hero
          name={config.name}
          shortName={config.shortName}
          logoUrl={logoUrl}
          primaryColor={config.colors.primary}
          secondaryColor={config.colors.secondary}
          tagline={config.homepage.tagline ?? '80 Jahre Tradition, Leidenschaft und Gemeinschaft im Herzen der Region.'}
          ctaLabel={config.homepage.ctaLabel ?? 'JETZT DURCHSTARTEN'}
          ctaHref="#kursangebot"
          heroBildUrl={config.homepage.heroImageUrl}
          sponsors={sponsors}
        />

        {/* 2 – Aktuelles */}
        <div id="aktuelles">
          <AktuellesSection instagramUsername={config.social.instagram} news={vereinsNews} />
        </div>

        {/* 3 – Kursangebot mit Tabs */}
        <KursangebotSection />

        {/* 4 – Unsere Abteilungen */}
        <AbteilungenGrid departments={config.departments} />

        {/* 5 – Kurs der Woche */}
        <KursDerWocheSection />

        {/* JFV Hero Banner */}
        <div className="relative overflow-hidden" style={{ height: '500px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIQu-mMb6znKt8RaFJN6N2-7uNWTYi6ao7w82x0rS6IBWpCrcPxHMMsTWHOcfae8qkElbCYCp19rDditLj45xsKtcxHeltn7ZonJ4XCkJP2-DRSCboPlukYhf9ORtKpRE_GykkbnulyTOceuDnZREwpD5C8WvEk9CTUho96Jbjlzb7Yia0tMk2THriDKnHU5lXDlZjz9pMNMnc2G4pHBV8SOLozDPXso1KC0v63dgA9xiOMSpKWha3AgDhkFQgqOs23j_iixlPhLQ"
            alt="JFV Hünstetten Jugendfußball"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(83,136,175,0.5) 0%, rgba(5,40,86,0.75) 100%)' }} />
          <div className="absolute inset-0 flex flex-row items-end justify-between px-10 md:px-16 pb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FDE000' }}>Jugendfußball</p>
              <h3 className="font-display font-black uppercase leading-none mb-3" style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', color: '#FDE000' }}>
                JFV HÜNSTETTEN
              </h3>
              <p className="text-white mb-6" style={{ fontSize: '1rem', maxWidth: '560px' }}>
                Vom ersten Ballkontakt bis zur Meisterschaft — Bambinis bis A-Jugend.<br />
                Wir formen echte Teamplayer auf und neben dem Platz.
              </p>
              <div className="flex flex-row gap-4">
                <a href={internalHref('/JFV')} className="px-6 py-3 rounded-xl font-display font-black italic uppercase text-sm shadow-xl hover:scale-105 transition-transform" style={{ backgroundColor: '#5388AF', color: '#fff' }}>
                  Mehr Informationen...
                </a>
                </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/jfv-logo.png')} alt="JFV Hünstetten Logo" className="hidden md:block shrink-0 drop-shadow-2xl" style={{ width: 'clamp(140px,14vw,220px)', marginBottom: '-8px' }} />
          </div>
        </div>

        {/* 6 – Zahlen & Tradition */}
        <ZahlenTraditionSection
          aboutText={config.homepage.aboutText}
          aboutText2={config.homepage.aboutText2}
          statsMitglieder={config.stats.mitglieder}
          statsKurseProWoche={config.stats.kurseProWoche}
          statsLizenziertTrainer={config.stats.lizenzierteTrainer}
        />

        {/* 7 – Fan-Shop */}
        <ShopGrid variant="md3" products={HOME_PRODUCTS} />

        {/* 8 – Sponsoren */}
        <SponsorBand sponsors={sponsors} />
      </main>

      <SiteFooter logoUrl={logoUrl} />
    </>
  );
}
