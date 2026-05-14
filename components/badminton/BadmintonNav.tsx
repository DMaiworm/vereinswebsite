'use client'

import BaseNav from '@/components/shared/layout/BaseNav'
import type { NavItem } from '@/components/shared/layout/BaseNav'

const NAV_ITEMS: NavItem[] = [
  { label: 'Erwachsene', href: '#erwachsene', active: true },
  { label: 'Jugend', href: '#jugend' },
]

interface BadmintonNavProps {
  logoUrl?: string | null
  clubName?: string | null
}

export default function BadmintonNav({ logoUrl, clubName }: BadmintonNavProps) {
  return (
    <BaseNav
      logoUrl={logoUrl}
      clubName={clubName}
      departmentLabel="Badminton"
      navItems={NAV_ITEMS}
      homeHref="../"
    />
  )
}
