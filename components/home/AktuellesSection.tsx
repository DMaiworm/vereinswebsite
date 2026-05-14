import NewsGrid from '@/components/shared/sections/NewsGrid';
import type { NewsCard, SocialHandle } from '@/components/shared/sections/NewsGrid';

const NEWS_BIG: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEW12x43wlBcxUzb24JqvEESnUc6M0Noxf15GlwByQy7IwAodrihrKTteKlNKqzKt1L8QfBNQzu_eyaZt-_J9qmr4hqkDEZVl38j4gjjC-Hye62QWqyfxtMGNMddgv7QnphjHmGlAEpSo1ZKd5_WRNch5seVBuDKgY2fGZipOd5PaP_W1OO4u7zXh_7LHshtmc-ihtaFLcNX3D2oneac_8t5AxafQPiUmrf7n-oWM00r3wLF1IRvYGVQDqt7UxcISZG1Leo_FlXzM',
  category: 'Spielbericht',
  title: 'Starker Auftakt in die Rückrunde',
  likes: 124,
};

const NEWS_SECOND: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHvVAleUYJuzPYEJLha9Mltwo3iwaT9oBgo3mEwObzsZoanwYaw01L-KbX3TIRuOVq2XwRtuklNU8uwJXsv5RNoKW9dPZN0F7C04pxnTGPE8SYCZkwBKG_R9oBuK_TI2umowvmVNXm9VU1QcN_B8DjxP2IVZcXRnOFd8UYxNtkHViFHXMn3b8yWMuuz1MHb317fpziGXFfGHZhunvvp2LLDw4QyMYSa-XRDsesuYe2QhSPbEC9kt8BZvZKddVlJ5vXPV8cojxLm8c',
  category: 'Neues Angebot',
  title: 'Qi-Gong Kurs startet im September',
};

const NEWS_THIRD: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDroGgypJqh_NjO26ER5fmmp56PlgowMJOWIjKMLS20CbTtiIvvdTTjCQPD5xtD_MUoRMSSf8h_9ZIVaVI4wVror7hxPPuNUX1KyTCgYEI6VChhP0klIMolspXmr74ZahILL0CrTKN2bkdDa3bdcpplic8sH8H6rwfww_DPytZQYFpXx8rqu61lgYgIYuF60sZBkCOYaGZ8It84tCZIESow35BN00zmMJoVridedgX9DiyPF3sSA2NA2HzayUsxJql5EvP360LmCog',
  category: 'Event',
  title: 'Sommerfest 2025 – Wir feiern 80 Jahre SG!',
};

const SOCIAL_HANDLES: SocialHandle[] = [
  { platform: 'instagram', name: '@SGHuenstetten' },
  { platform: 'facebook', name: 'SG Hünstetten' },
];

export default function AktuellesSection() {
  return (
    <NewsGrid
      sectionNum="01 — Aktuelles"
      theme="light"
      bigCard={NEWS_BIG}
      secondCard={NEWS_SECOND}
      thirdCard={NEWS_THIRD}
      socialHandles={SOCIAL_HANDLES}
    />
  );
}
