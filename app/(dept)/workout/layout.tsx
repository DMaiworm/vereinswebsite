import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Workout | SG Hünstetten',
}

export default function WorkoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
