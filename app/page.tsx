import { fetchClubConfig, fetchSponsors } from '@/lib/api';
import Hero from '@/components/Hero';
import AbteilungenGrid from '@/components/AbteilungenGrid';
import SponsorenStrip from '@/components/SponsorenStrip';

export default async function HomePage() {
  const config    = await fetchClubConfig();
  const sponsors  = config.operator_id
    ? await fetchSponsors(config.operator_id).catch(() => [])
    : [];

  return (
    <main>
      <Hero
        name={config.name}
        shortName={config.short_name}
        logoUrl={config.logo_url}
        primaryColor={config.primary_color}
        secondaryColor={config.secondary_color}
      />
      <AbteilungenGrid departments={config.departments} />
      {sponsors.length > 0 && <SponsorenStrip sponsors={sponsors} />}
    </main>
  );
}
