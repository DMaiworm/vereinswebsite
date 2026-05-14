import { fetchClubConfig, fetchSponsors } from '@/lib/api';
import Hero from '@/components/Hero';
import AbteilungenGrid from '@/components/AbteilungenGrid';
import SponsorBand from '@/components/shared/layout/SponsorBand';
import SiteFooter from '@/components/shared/layout/SiteFooter';
import AktuellesSection from '@/components/home/AktuellesSection';
import KursangebotSection from '@/components/home/KursangebotSection';
import KursDerWocheSection from '@/components/home/KursDerWocheSection';
import ZahlenTraditionSection from '@/components/home/ZahlenTraditionSection';

export default async function HomePage() {
  const config   = await fetchClubConfig();
  const sponsors = config.operator_id
    ? await fetchSponsors(config.operator_id).catch(() => [])
    : [];

  return (
    <>
      <main>
        {/* 1 – Hero */}
        <Hero
          name={config.name}
          shortName={config.short_name}
          logoUrl={config.logo_url}
          primaryColor={config.primary_color}
          secondaryColor={config.secondary_color}
          tagline="80 Jahre Tradition, Leidenschaft und Gemeinschaft im Herzen der Region."
          ctaLabel="JETZT DURCHSTARTEN"
          ctaHref="#kursangebot"
        />

        {/* 2 – Aktuelles */}
        <AktuellesSection />

        {/* 3 – Kursangebot mit Tabs */}
        <KursangebotSection />

        {/* 4 – Unsere Abteilungen */}
        <AbteilungenGrid departments={config.departments} />

        {/* 5 – Kurs der Woche */}
        <KursDerWocheSection />

        {/* 6 – Zahlen & Tradition */}
        <ZahlenTraditionSection />

        {/* 7 – Sponsoren */}
        <SponsorBand sponsors={sponsors} />
      </main>

      <SiteFooter logoUrl={config.logo_web_pfad ?? config.logo_url} />
    </>
  );
}
