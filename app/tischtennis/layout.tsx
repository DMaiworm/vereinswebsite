import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tischtennis Abteilung | SG Hünstetten',
}

export default function TischtennisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
