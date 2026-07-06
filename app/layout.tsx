import type { Metadata } from 'next';
import { Inter, Lexend, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { fetchClubConfig } from '@/lib/api';

const inter   = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lexend  = Lexend({ subsets: ['latin'], variable: '--font-lexend', weight: ['300','400','600','700','800','900'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['300','400','500','600','700'] });

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
    primary   = config.colors.primary;
    secondary = config.colors.secondary;
  } catch {
    // Fallback-Farben bleiben aktiv
  }

  return (
    <html
      lang="de"
      className={`${inter.variable} ${lexend.variable} ${jakarta.variable}`}
      suppressHydrationWarning
      style={{
        '--club-primary':   primary,
        '--club-secondary': secondary,
      } as React.CSSProperties}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="antialiased">
        {children}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('img').forEach(function(img){img.addEventListener('error',function(){this.classList.add('broken');this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';});});});` }} />
      </body>
    </html>
  );
}
