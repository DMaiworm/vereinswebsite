import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Früh übt sich (II) | SG Hünstetten',
}

export default function FruehUebtSich2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
