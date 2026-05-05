import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Fitness | SG Hünstetten',
}

export default function GesundheitssportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
