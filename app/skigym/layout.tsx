import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'SkiGym | SG Hünstetten',
}

export default function SkiGymLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
