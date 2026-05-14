import { fetchClubConfig, fetchSponsors } from '@/lib/api';
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
