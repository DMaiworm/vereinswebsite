'use client'

import BaseNav from '@/components/shared/layout/BaseNav'
import type { NavItem } from '@/components/shared/layout/BaseNav'

const NAV_ITEMS: NavItem[] = [
  { label: 'KiLa Kids', href: '#kila', active: true },
  { label: 'Lauftreff & Early Birds', href: '#lauftreff' },
  { label: 'News', href: '#news' },
  { label: 'Fan-Shop', href: '#shop' },
]

interface AthleticsNavProps {
  logoUrl?: string | null
  clubName?: string | null
}

export default function AthleticsNav({ logoUrl, clubName }: AthleticsNavProps) {
  return (
    <BaseNav
      logoUrl={logoUrl}
      clubName={clubName}
      departmentLabel="Leichtathletik"
      navItems={NAV_ITEMS}
      ctaHref="#lauftreff"
      homeHref="../"
    />
  )
}
