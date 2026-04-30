import type { Trainer } from '@/lib/api'
import TeamIntro1 from './TeamIntro1'
import TeamIntro2 from './TeamIntro2'
import TeamIntro3 from './TeamIntro3'
import TeamIntro4 from './TeamIntro4'

export interface TeamIntroProps {
  trainers: Trainer[]
  theme?: 'dark' | 'light'
  rolePrimary?: string
  roleSecondary?: string
  showRecruitingSlot?: boolean
  className?: string
}

export default function TeamIntro({ trainers, ...props }: TeamIntroProps) {
  const n = trainers.length
  if (n === 0) return null
  if (n === 1) return <TeamIntro1 trainers={trainers} {...props} />
  if (n === 2) return <TeamIntro2 trainers={trainers} {...props} />
  if (n === 3) return <TeamIntro3 trainers={trainers} {...props} />
  return <TeamIntro4 trainers={trainers} {...props} />
}
