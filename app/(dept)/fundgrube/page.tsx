import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import FundgrubeClient from './FundgrubeClient'

const FUNDGRUBE_NAV = [
  { label: 'Fundgrube', href: '#', active: true },
  { label: 'Verlust melden', href: '#verlust' },
]

export default async function FundgrubePage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav
        logoUrl={logoUrl}
        clubName="Hünstetten"
        departmentLabel="Fundgrube"
        navItems={FUNDGRUBE_NAV}
        ctaLabel={null}
        homeHref="../"
      />
      <main className="pt-20">
        <FundgrubeClient />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Fundgrube" variant="light" />
    </div>
  )
}
