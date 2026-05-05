import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'ManFit | SG Hünstetten',
}

export default function ManFitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
