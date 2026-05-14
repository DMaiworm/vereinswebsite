import { fetchClubConfig, fetchSponsors } from '@/lib/api';
import { asset } from '@/lib/assetPath';
import BaseNav from '@/components/shared/layout/BaseNav';
import Hero from '@/components/Hero';
import AbteilungenGrid from '@/components/AbteilungenGrid';
import SponsorBand from '@/components/shared/layout/SponsorBand';
import SiteFooter from '@/components/shared/layout/SiteFooter';
import AktuellesSection from '@/components/home/AktuellesSection';
import KursangebotSection from '@/components/home/KursangebotSection';
import KursDerWocheSection from '@/components/home/KursDerWocheSection';
import ZahlenTraditionSection from '@/components/home/ZahlenTraditionSection';
import FanshopSection from '@/components/home/FanshopSection';

const HOME_NAV = [
  { label: 'Aktuelles',   href: '#aktuelles' },
  { label: 'Kursangebot', href: '#kursangebot' },
  { label: 'Abteilungen', href: '#abteilungen' },
  { label: 'Shop',        href: './shop' },
];

export default async function HomePage() {
  const config   = await fetchClubConfig();
  const sponsors = config.operator_id
    ? await fetchSponsors(config.operator_id).catch(() => [])
    : [];

  return (
    <>
      <BaseNav
        logoUrl={config.logo_web_pfad ?? config.logo_url}
        clubName={config.name}
        navItems={HOME_NAV}
        ctaLabel="Mitglied werden"
        homeHref="."
      />

      <main>
        {/* 1 – Hero */}
        <Hero
          name={config.name}
          shortName={config.short_name}
          logoUrl={config.logo_web_pfad ?? config.logo_url}
          primaryColor={config.primary_color}
          secondaryColor={config.secondary_color}
          tagline={config.homepage_tagline ?? '80 Jahre Tradition, Leidenschaft und Gemeinschaft im Herzen der Region.'}
          ctaLabel={config.homepage_cta_label ?? 'JETZT DURCHSTARTEN'}
          ctaHref="#kursangebot"
          heroBildUrl={config.homepage_hero_bild_url}
          sponsors={sponsors}
        />

        {/* 2 – Aktuelles */}
        <div id="aktuelles">
          <AktuellesSection instagramUsername={config.instagram_username} />
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
                <a href="./JFV" className="px-6 py-3 rounded-xl font-display font-black italic uppercase text-sm shadow-xl hover:scale-105 transition-transform" style={{ backgroundColor: '#5388AF', color: '#fff' }}>
                  Probetraining vereinbaren
                </a>
                <a href="./JFV" className="px-6 py-3 rounded-xl font-display font-black italic uppercase text-sm shadow-xl hover:scale-105 transition-transform" style={{ backgroundColor: '#C0392B', color: '#fff' }}>
                  Unterstützer werden
                </a>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/jfv-logo.png')} alt="JFV Hünstetten Logo" className="hidden md:block shrink-0 drop-shadow-2xl" style={{ width: 'clamp(140px,14vw,220px)', marginBottom: '-8px' }} />
          </div>
        </div>

        {/* 6 – Zahlen & Tradition */}
        <ZahlenTraditionSection
          aboutText={config.homepage_about_text}
          aboutText2={config.homepage_about_text_2}
          statsMitglieder={config.stats_mitglieder}
          statsKurseProWoche={config.stats_kurse_pro_woche}
          statsLizenziertTrainer={config.stats_lizenzierte_trainer}
        />

        {/* 7 – Fan-Shop */}
        <FanshopSection />

        {/* 8 – Sponsoren */}
        <SponsorBand sponsors={sponsors} />
      </main>

      <SiteFooter logoUrl={config.logo_web_pfad ?? config.logo_url} linkPrefix="./" />
    </>
  );
}
