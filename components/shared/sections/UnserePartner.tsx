import type { Sponsor } from '@/lib/api'

interface Props {
  sponsors?: Sponsor[]
}

const FALLBACK_GOLD: Sponsor[] = [
  { id: 'f1', firmenname: 'BIOGRUND',  logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'gold' },
  { id: 'f2', firmenname: 'ROSENBAUM', logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'gold' },
  { id: 'f3', firmenname: 'AREHA',     logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'gold' },
]
const FALLBACK_SILBER: Sponsor[] = [
  { id: 'f4', firmenname: 'VOLKSBANK',  logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'silber' },
  { id: 'f5', firmenname: 'SPARKASSE',  logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'silber' },
  { id: 'f6', firmenname: 'SPORT-ECKE', logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'silber' },
  { id: 'f7', firmenname: 'MAIN-REHA',  logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'silber' },
]
const FALLBACK_BRONZE: Sponsor[] = [
  { id: 'f8',  firmenname: 'Metzgerei Schmitt',   logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'bronze' },
  { id: 'f9',  firmenname: 'Auto-Haus Maier',     logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'bronze' },
  { id: 'f10', firmenname: 'Bäckerei Müller',     logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'bronze' },
  { id: 'f11', firmenname: 'Getränke Hoffmann',   logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'bronze' },
  { id: 'f12', firmenname: 'Apotheke Hünstetten', logo_web_url: null, logo_druck_url: null, website_url: null, club_id: null, kategorie: 'bronze' },
]

function SponsorLogo({ sponsor, size }: { sponsor: Sponsor; size: 'lg' | 'md' | 'sm' }) {
  const Wrapper = sponsor.website_url ? 'a' : 'div'
  const linkProps = sponsor.website_url
    ? { href: sponsor.website_url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const containerClass = size === 'lg'
    ? 'bg-surface-container-lowest p-12 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[220px] group border border-outline-variant/10'
    : size === 'md'
    ? 'bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center min-h-[160px] group border border-outline-variant/10'
    : ''

  if (size === 'sm') {
    return (
      <Wrapper {...(linkProps as Record<string, string>)} className="hover:opacity-100 transition-opacity">
        {sponsor.logo_web_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logo_web_url} alt={sponsor.firmenname} className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
        ) : (
          <span className="text-primary font-bold text-2xl">{sponsor.firmenname}</span>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper {...(linkProps as Record<string, string>)} className={containerClass}>
      {sponsor.logo_web_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logo_web_url}
          alt={sponsor.firmenname}
          className={`object-contain grayscale group-hover:grayscale-0 transition-all ${size === 'lg' ? 'max-h-24 max-w-[200px]' : 'max-h-16 max-w-[160px]'}`}
        />
      ) : (
        <span className={`text-primary font-black italic grayscale group-hover:grayscale-0 transition-all ${size === 'lg' ? 'text-3xl' : 'text-2xl font-bold'}`}>
          {sponsor.firmenname}
        </span>
      )}
    </Wrapper>
  )
}

export default function UnserePartner({ sponsors = [] }: Props) {
  let gold:   Sponsor[]
  let silber: Sponsor[]
  let bronze: Sponsor[]

  if (sponsors.length === 0) {
    gold   = FALLBACK_GOLD
    silber = FALLBACK_SILBER
    bronze = FALLBACK_BRONZE
  } else {
    gold   = sponsors.filter(s => s.kategorie === 'gold')
    silber = sponsors.filter(s => s.kategorie === 'silber')
    // bronze + partner + keine + null → alle ins Bronze-Tier
    bronze = sponsors.filter(s => !s.kategorie || !['gold', 'silber'].includes(s.kategorie))
  }

  return (
    <section id="partner" className="py-16 bg-surface-container">
      <div className="container mx-auto px-8">
        <div className="mb-10 text-center">
          <h2 className="text-primary font-headline font-black uppercase text-5xl tracking-tight">Unsere Partner</h2>
        </div>

        {/* Gold */}
        {gold.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-secondary font-headline font-black uppercase text-2xl flex items-center gap-2 shrink-0">
                <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                Gold Sponsoren
              </h3>
              <div className="h-px bg-secondary-container flex-grow"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 items-stretch">
              {gold.map(s => (
                <div key={s.id} className="w-full md:w-[calc(33.333%-1.5rem)] min-w-[240px] max-w-sm flex-grow-0">
                  <SponsorLogo sponsor={s} size="lg" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silber */}
        {silber.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-outline font-headline font-black uppercase text-xl flex items-center gap-2 shrink-0">
                <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Silber Sponsoren
              </h3>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 items-stretch">
              {silber.map(s => (
                <div key={s.id} className="w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] min-w-[180px] max-w-xs flex-grow-0">
                  <SponsorLogo sponsor={s} size="md" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bronze */}
        {bronze.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-outline/70 font-headline font-bold uppercase text-lg shrink-0">Bronze &amp; Lokale Partner</h3>
              <div className="h-px bg-outline-variant/50 flex-grow"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60">
              {bronze.map(s => <SponsorLogo key={s.id} sponsor={s} size="sm" />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
