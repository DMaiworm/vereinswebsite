import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import type { NavItem } from '@/components/shared/layout/BaseNav'
import ShopClient from './ShopClient'

const SHOP_NAV: NavItem[] = [
  { label: 'Club',      href: '../' },
  { label: 'Teams',     href: '../' },
  { label: 'Heritage',  href: '../geschichte' },
  { label: 'Members',   href: '../mitgliedschaft' },
  { label: 'Shop',      href: '#', active: true },
]

export default async function ShopPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* render without logo/sponsors */ }

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        departmentLabel="Shop"
        navItems={SHOP_NAV}
        ctaLabel={null}
      />
      <ShopClient />
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Fan-Shop" />
    </>
  )
}
