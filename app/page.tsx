import { fetchClubConfig, fetchSponsors } from '@/lib/api';
import Hero from '@/components/Hero';
import AbteilungenGrid from '@/components/AbteilungenGrid';
import SponsorBand from '@/components/shared/layout/SponsorBand';
import SiteFooter from '@/components/shared/layout/SiteFooter';
import AktuellesSection from '@/components/home/AktuellesSection';
import KursangebotSection from '@/components/home/KursangebotSection';
import KursDerWocheSection from '@/components/home/KursDerWocheSection';
import ZahlenTraditionSection from '@/components/home/ZahlenTraditionSection';
import JfvSection from '@/components/home/JfvSection';

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
          tagline="Dein Sportverein in Hünstetten"
          ctaLabel="Kurs finden"
          ctaHref="#kursangebot"
        />

        {/* 2 – Aktuelles (chalk/light) */}
        <AktuellesSection />

        {/* 3 – Unsere Abteilungen (dark body) */}
        <AbteilungenGrid departments={config.departments} />

        {/* 4 – Kursangebot mit Tabs (chalk/light) */}
        <KursangebotSection />

        {/* 5 – Kurs der Woche (navy noise/dark) */}
        <KursDerWocheSection />

        {/* 6 – Zahlen & Tradition (mist/light) */}
        <ZahlenTraditionSection />

        {/* 7 – JFV Hünstetten (navy noise/dark) */}
        <JfvSection />

        {/* 8 – Sponsoren */}
        <SponsorBand sponsors={sponsors} />
      </main>

      <SiteFooter logoUrl={config.logo_web_pfad ?? config.logo_url} />
    </>
  );
}
