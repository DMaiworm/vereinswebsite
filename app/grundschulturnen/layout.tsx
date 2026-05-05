import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Grundschulturnen | SG Hünstetten',
}

export default function GrundschulturnenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
