import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tanzfitness | SG Hünstetten',
}

export default function TanzfitnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
