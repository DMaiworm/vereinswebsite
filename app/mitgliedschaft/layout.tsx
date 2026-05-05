import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Mitgliedschaft | SG Hünstetten',
}

export default function MitgliedschaftLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
