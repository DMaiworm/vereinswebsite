import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Kinderturnen | SG Hünstetten',
}

export default function KinderturnenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
