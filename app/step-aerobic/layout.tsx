import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Step-Aerobic | SG Hünstetten',
}

export default function StepAerobicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
      {children}
    </>
  )
}
