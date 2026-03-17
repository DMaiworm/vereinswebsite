import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { fetchClubConfig } from '@/lib/api';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await fetchClubConfig();
    return { title: config.name, description: `Offizielle Website des ${config.name}` };
  } catch {
    return { title: 'Vereinswebsite' };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let primary   = '#003399';
  let secondary = '#FFD700';

  try {
    const config = await fetchClubConfig();
    primary   = config.primary_color;
    secondary = config.secondary_color;
  } catch {
    // Fallback-Farben bleiben aktiv
  }

  return (
    <html
      lang="de"
      className={inter.variable}
      style={{
        '--club-primary':   primary,
        '--club-secondary': secondary,
      } as React.CSSProperties}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
