'use client';

const NEWS_BIG_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEW12x43wlBcxUzb24JqvEESnUc6M0Noxf15GlwByQy7IwAodrihrKTteKlNKqzKt1L8QfBNQzu_eyaZt-_J9qmr4hqkDEZVl38j4gjjC-Hye62QWqyfxtMGNMddgv7QnphjHmGlAEpSo1ZKd5_WRNch5seVBuDKgY2fGZipOd5PaP_W1OO4u7zXh_7LHshtmc-ihtaFLcNX3D2oneac_8t5AxafQPiUmrf7n-oWM00r3wLF1IRvYGVQDqt7UxcISZG1Leo_FlXzM';
const NEWS_SECOND_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHvVAleUYJuzPYEJLha9Mltwo3iwaT9oBgo3mEwObzsZoanwYaw01L-KbX3TIRuOVq2XwRtuklNU8uwJXsv5RNoKW9dPZN0F7C04pxnTGPE8SYCZkwBKG_R9oBuK_TI2umowvmVNXm9VU1QcN_B8DjxP2IVZcXRnOFd8UYxNtkHViFHXMn3b8yWMuuz1MHb317fpziGXFfGHZhunvvp2LLDw4QyMYSa-XRDsesuYe2QhSPbEC9kt8BZvZKddVlJ5vXPV8cojxLm8c';
const NEWS_THIRD_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDroGgypJqh_NjO26ER5fmmp56PlgowMJOWIjKMLS20CbTtiIvvdTTjCQPD5xtD_MUoRMSSf8h_9ZIVaVI4wVror7hxPPuNUX1KyTCgYEI6VChhP0klIMolspXmr74ZahILL0CrTKN2bkdDa3bdcpplic8sH8H6rwfww_DPytZQYFpXx8rqu61lgYgIYuF60sZBkCOYaGZ8It84tCZIESow35BN00zmMJoVridedgX9DiyPF3sSA2NA2HzayUsxJql5EvP360LmCog';

interface AktuellesSectionProps {
  instagramUsername?: string | null;
}

export default function AktuellesSection({ instagramUsername }: AktuellesSectionProps) {
  const igHandle = instagramUsername ? `@${instagramUsername}` : '@SGHünstetten';
  const igHref = instagramUsername ? `https://instagram.com/${instagramUsername}` : '#';

  return (
    <section className="py-10 px-6 bg-chalk">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-display font-extrabold uppercase italic text-[#052856]">
            News &amp; Updates
          </h2>
          <a href="#" className="text-sm font-bold text-[#052856]/60 hover:text-[#052856] transition-colors">
            Alle News →
          </a>
        </div>

        {/* Main grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1 – big (spans 2 cols) */}
          <div className="md:col-span-2 relative h-[400px] group overflow-hidden rounded-lg cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NEWS_BIG_SRC}
              alt="Starker Auftakt in die Rückrunde"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[#fde000] text-xs font-bold uppercase mb-2">Spielbericht</span>
              <h3 className="text-3xl font-bold mb-4">Starker Auftakt in die Rückrunde</h3>
              <span className="text-sm text-white/60">❤ 124 Likes</span>
            </div>
          </div>

          {/* Card 2 – secondary */}
          <div className="relative h-[400px] group overflow-hidden rounded-lg cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NEWS_SECOND_SRC}
              alt="Qi-Gong Kurs startet im September"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[#fde000] text-xs font-bold uppercase mb-2">Neues Angebot</span>
              <h3 className="text-2xl font-bold mb-4">Qi-Gong Kurs startet im September</h3>
            </div>
          </div>

          {/* Social cards (2 cols) */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2">

            {/* Instagram */}
            <div className="bg-[#052856] p-8 text-white flex flex-col justify-between h-[300px] border border-white/10 rounded-lg">
              <div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 mb-4" />
                <p className="font-bold text-lg mb-1">{igHandle}</p>
                <p className="text-sm text-white/60">Fotos • Highlights • Stories</p>
              </div>
              <a href={igHref} className="text-[#fde000] font-bold text-sm hover:underline">
                Folgen →
              </a>
            </div>

            {/* Facebook */}
            <div className="bg-[#052856] p-8 text-white flex flex-col justify-between h-[300px] border border-white/10 rounded-lg">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-600 mb-4" />
                <p className="font-bold text-lg mb-1">SG Hünstetten</p>
                <p className="text-sm text-white/60">Events • News • Community</p>
              </div>
              <a href="#" className="text-[#fde000] font-bold text-sm hover:underline">
                Folgen →
              </a>
            </div>
          </div>

          {/* Event card */}
          <div className="relative h-[300px] group overflow-hidden rounded-lg cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NEWS_THIRD_SRC}
              alt="Sommerfest 2025"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[#fde000] text-xs font-bold uppercase mb-2">Event</span>
              <h3 className="text-xl font-bold">Sommerfest 2025 – Wir feiern 80 Jahre SG!</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
