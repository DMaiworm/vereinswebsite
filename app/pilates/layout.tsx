import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Pilates & BodyART | SG Hünstetten',
}

export default function PilatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
