import AthleticsNav from '@/components/athletics/AthleticsNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import NewsGrid from '@/components/shared/sections/NewsGrid'
import GalerieGrid from '@/components/shared/sections/GalerieGrid'
import ShopGrid from '@/components/shared/sections/ShopGrid'
import TeamIntro from '@/components/shared/team/TeamIntro'
import { fetchClubConfig, fetchAbteilung, fetchSponsors } from '@/lib/api'
import type { Trainer, AbteilungProfile, TrainingSlot } from '@/lib/api'
import type { ShopProduct } from '@/components/shared/sections/ShopGrid'
import type { SocialHandle, NewsCard } from '@/components/shared/sections/NewsGrid'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatShortSlot(slot: TrainingSlot): string {
  return `${slot.wochentag.substring(0, 2)}. ${slot.start_time.slice(0, 5)} Uhr`
}

function formatBadgeSlot(slot: TrainingSlot): string {
  return `Jeden ${slot.wochentag} · ${slot.start_time.slice(0, 5)}`
}

// ─── Static content ──────────────────────────────────────────────────────────

const NEWS_BIG: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwdaRMnVCm4SoGM5pd2i2-ByBhgbjpKoA9grMx7emDzVA4XoYnQt7xhtENonpt7NvMY_uynJ7GaX46kKpf6epqz8FBeJsO8077PCfXTejbPEZ4_wDNjinSzQhjOskhnrkOLi3IHzzOH59E6JzfImjepWaw5sCBaLUrN81v5LbHnzvwEul4NVrGCxGWWl0MGfcu1ZXYm6ZOIV9krafAJOm3iP59_-Mm79GCFTvtFWw2A5NL15Renxd_HfJ95cZ_RFI_kDnHEJopIIY',
  category: 'Wettkampf',
  title: 'Erfolg beim Stadtwaldlauf 2025',
  likes: 84,
}
const NEWS_SECOND: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtPUJv_zozKMS-2LFk_keuuVUPqXup-ol7l1unriWokZ096F6UqnIyJBlvCvV7U3pQm4n_0DrfnWHmDkpbR14V-SBpWOTN7MYZD_xq2oZ2CmQD3pzGQOnr3Spdbx38AK_hP48ctBBuPLVlqDKxasHBAcnXrumBNDPm0UnxNNWIiFrC7zwEJSQqIYf6DcxSJIgPEF1eAISgXegEhW-QHn5TxIyJkrzxuFfaqsfATZhoBwxdoPgOHWhuVDxfpKXOhtsOUuhMR2T3taI',
  category: 'Team',
  title: 'KiLa Sommerfest 2025',
}
const NEWS_THIRD: NewsCard = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjA0lrFWe5f5V9MmsokEgcCvZehu-zttrvha4K1qZXsXBDuCYv3e_LnktJVL1aWSU2AxCIJU9fCmZzjFbHjF-EL-fI6dceQOYNFDDGC9fasb3-assvvTdnUUa68Ex_K34HSYlA8djme2kTU7JSdhyBozYojLordp4NmDCh2L8Q0M5CQXLrVM5cEocVjp0lTCXdMZuo5tGUFYuqWLcEt46mrhI6w_ixy9LLdjjbwCr3Nr6lCrNrknl-EdZiM8w2iGqlHdHc9Xg_nM8',
  category: 'Update',
  title: 'Neue Ausrüstung eingetroffen',
}
const SOCIAL_HANDLES: SocialHandle[] = [
  { platform: 'instagram', name: '@sgh_leichtathletik' },
  { platform: 'facebook', name: 'SG Hünstetten Leichtathletik' },
]

const shopProducts: ShopProduct[] = [
  { name: 'Team-Trainingsjacke', sub: 'Offizielle Kollektion', price: '59 €', badge: 'Premium',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUPH2RHEgwO8DlixCFn8gsIpQR5Oa4CpApu7gR__IK7OjlRJMApQA9eNa26JHTS04U-5P9R_Hz6K8Ho8WbJA4YK9snYqjdSDz5NMmjf3XiEfl_J7KlFznOVrPb2TVMYjfK8sdBKrSmmvBcgob49HDmARvCoxMRlLK20WcbYzdkWsTe4JFTLyFx9lWuyf3_PBNw3JajOwynzDrB3gVD5ZhAWajL69scO6Lch4i0-zRZjnvJZrj0RSK0wYJUVQLt4zAa2m8pUregsgg' },
  { name: 'Fan-Schal "Traditional"', sub: 'Kinetic Tradition', price: '15 €', badge: 'Bestseller',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Z5lobJo4YXLPO3ZD_NpYBCY3_m8SacseDXBUT629ybiPqQq1PkIVNJPW7eCsf-hct0nT663dwRPfiUpYoBgic9E-oZ0F2jsUOIuM53CQtavlggR2H7yZWM6110e5pJXMXbiNYDEaQpzDefp2hWr0XaPitcoHBdYIp_T2nI-b_8Q-8yaNkNbs5oRXWyoa3Ncu_wKNSuOr5FKf2w4WdqQggrOdMab3QoWiWK-f87i4ewsd47kH39vJDCaBGvMwQ8bXatI-E5GgA8U' },
  { name: 'Club Beanie', sub: 'Kinetic Blue / Gold', price: '19 €', badge: null,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_uOxMMD-QsuxiN6EUZ7BPlvMT1ZTCSG82ZZVeFC3bke10Qrb0OZsm6jXY2ViWokrvCK2SshcojZbMSTmFCYvGTTtJSpVemZ6rISwHO4BsEIMgJZd7Ei79iB4lbVy9aPv7zN9zgCyqbNIifEAJMwUYBSheklHfS1wnsbvT_CC5FQuMhIXD7k5Ac8XloTM0xa6QJ5DrSJEa1mjOaWUZu3ItCG1_u9syKyTu29vrbUS_jgk89R4cCJmvX3hxqmypn4JhzJg1j9vngiA' },
  { name: 'Polo-Shirt Kinetic', sub: 'Premium Performance', price: '34,90 €', badge: null,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfQNN6jYJHUubYw0nhgGfvG931u63ao_8vgPJzK4R9_YLx9GCqp_jEgjolWoRnsduLvSzSMUtWKruA_qpdM1shVBjq73HoPGm_GB2qViS-pfVhXg_MIbEulKR6IxVy54gdgDy4MYgPhKmtBzIgMdN4VwsL13Dqn6Qq6t_k3v10wL9zGunyDtwnzaisMaIgDG-8I_xGkfo7gagXW4d0Qn5B2mFgn8C6VfxPIMknQQggY6XDs5xrbeeO4avJXDGRAx5ihpixfz1SPBE' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AthleticsPage() {
  const config = await fetchClubConfig().catch(() => null)

  const athleticsDept = config?.departments.find(d =>
    d.name.toLowerCase().includes('leichtat') || d.name.toLowerCase().includes('athletic')
  )

  const abteilung: AbteilungProfile | null = athleticsDept
    ? await fetchAbteilung(athleticsDept.id).catch(() => null)
    : null

  const sponsors = config?.operator_id
    ? await fetchSponsors(config.operator_id).catch(() => [])
    : []

  const kilaTeams = abteilung?.mannschaften.filter(m =>
    m.name.toLowerCase().includes('kinder') || m.name.toLowerCase().includes('jugend')
  ) ?? []

  const lauftreffTeam = abteilung?.mannschaften.find(m =>
    m.name.toLowerCase().includes('lauftreff')
  )
  const earlyBirdsTeam = abteilung?.mannschaften.find(m =>
    m.name.toLowerCase().includes('early')
  )

  const allTrainers = deduplicateTrainers(abteilung?.mannschaften ?? [])

  return (
    <>
      <AthleticsNav
        logoUrl={config?.logo_web_pfad ?? config?.logo_url}
        clubName={config?.short_name ?? config?.name}
      />
      <main>
        <Hero
          lauftreffSlot={lauftreffTeam?.training_slots?.[0] ? formatShortSlot(lauftreffTeam.training_slots[0]) : undefined}
          earlyBirdsSlot={earlyBirdsTeam?.training_slots?.[0] ? formatShortSlot(earlyBirdsTeam.training_slots[0]) : undefined}
        />
        <KilaSection teams={kilaTeams} />
        <NewsGrid
          bigCard={NEWS_BIG}
          secondCard={NEWS_SECOND}
          thirdCard={NEWS_THIRD}
          socialHandles={SOCIAL_HANDLES}
          sectionNum="02 — Aktuelles"
          theme="dark"
        />
        <TrainerSection trainers={allTrainers} />
        <GalerieGrid
          sectionNum="04 — Galerie"
          title={<>Wettkampf-<span className="text-outline-navy">Momente</span></>}
          background="bg-mist"
          staticMain={{
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDxhW_ew0aQrdh_eW92O77N1NoEjcxplYW71KiGWXGmmy95Y1GXs63gsEmyF2AbgYxehFDVrukQFeOUJER4R-YVI9Ef_e1MIeUos3S8ap16zn4OzghVPF_RJkN3_m4r6OqL5VeIfaSCIvns0aXx5SXzQ3E90TkLleDs2-N1sCNWAO4CPsqwM3efM5mLMCyew3ofD_YrHyhbIdkF170ME0bMT4R5TpAiFu6rRwOVmdultukKmDYCn4moLHbskSU_m4chnEtCWhT1ko',
            caption: 'Saisonauftakt: Voller Fokus auf die Ziellinie',
          }}
          staticSecondary={{
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMHvAtR_RAfLgnPHhlSuHl52tHFQZzk7tE1kGBr5XuUCEbb8HkrZt4EqFt4042XFjDD-3gZwudwZ3-NXFxaZPcOucgWgGW1ZxOvmScuMFoioJMEjmXFD_YBs6jdsqrRW-TZiNlAo4y1rRioCd5G2-zgN-mxOhC1O9-63Hbye0yBR4ngIo-4GqtgUuGIJMrnA6reyu0nMZn9EIjzUq6bxVLPIE4m4be5nVU4G2dqEp2s8A0vzw9oAY9fI24WUcFqcENnDiq1cdJAuI',
          }}
          height={460}
        />
        <LauftreffsSection
          lauftreffLeitung={lauftreffTeam?.trainer.find(t => t.is_primary) ?? null}
          earlyBirdsLeitung={earlyBirdsTeam?.trainer.find(t => t.is_primary) ?? null}
          lauftreffBadge={lauftreffTeam?.training_slots?.[0] ? formatBadgeSlot(lauftreffTeam.training_slots[0]) : undefined}
          earlyBirdsBadge={earlyBirdsTeam?.training_slots?.[0] ? formatBadgeSlot(earlyBirdsTeam.training_slots[0]) : undefined}
        />
        <ShopGrid variant="md3" products={shopProducts} />
        <SponsorBand sponsors={sponsors} />
      </main>
      <SiteFooter logoUrl={config?.logo_web_pfad ?? config?.logo_url} departmentLabel="Leichtathletik" />
    </>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function deduplicateTrainers(mannschaften: AbteilungProfile['mannschaften']): Trainer[] {
  const seen = new Set<string>()
  const result: Trainer[] = []
  for (const m of mannschaften) {
    for (const t of m.trainer) {
      if (!seen.has(t.id)) {
        seen.add(t.id)
        result.push(t)
      }
    }
  }
  return result
}

function ageLabel(team: { name: string; alter_von: number | null; alter_bis: number | null }): string {
  if (team.alter_bis && team.alter_bis > 0) return `U${team.alter_bis}`
  const match = team.name.match(/(\d+)-(\d+)/)
  if (match) return `U${match[2]}`
  return team.name.split(' ')[0]
}

function ageSubtitle(upperAge: number): string {
  if (upperAge <= 8)  return 'Die Minis'
  if (upperAge <= 10) return 'Die Starter'
  if (upperAge <= 12) return 'Die Talente'
  return 'Aufbauphase'
}

function ageDescription(upperAge: number): string {
  if (upperAge <= 8)  return 'Spielerischer Einstieg in die Welt des Laufens, Springens und Werfens.'
  if (upperAge <= 10) return 'Erste koordinative Grundlagen und vielseitige Entdeckungen im Sport.'
  if (upperAge <= 12) return 'Vielseitigkeitstraining und Vorbereitung auf erste Wettkämpfe.'
  return 'Spezialisierung und gezielte Leistungsförderung. Werde Teil des Teams!'
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

function Hero({ lauftreffSlot, earlyBirdsSlot }: { lauftreffSlot?: string; earlyBirdsSlot?: string }) {
  return (
    <header className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-navy noise">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Leichtathletik – SG Hünstetten"
          className="w-full h-full object-cover object-center"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8_vjhjlyMmKmB0SNINyUArRLwwqgVeS5N0hAcpuwKqaTc-abwJjK5KMah6SpWNwk7QjD5CHYOSOFDTBapqB1Y91ChZhU_ra_A0mgcBPQNIOcYfHwcE1rLOEfgZFvEjIv-vel2-x__ocTw0GCp4EaSxCmbsWOrOhnaFOla3_h2zVGgb5QdRJT-ow7ExY9_twMEWAn_PQPIIAd1VuoyxSeWKeITDO_CQj4yeDtmBS5UGG6QUW3RQgMS6FfN_BjcRUmC3KmSJVtifkE"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent" />
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none pr-4 md:pr-12 overflow-hidden">
        <span
          className="text-outline-chalk font-display font-black uppercase leading-none select-none"
          style={{ fontSize: 'clamp(70px, 16vw, 240px)', letterSpacing: '-0.04em', opacity: 0.25, whiteSpace: 'nowrap' }}
        >
          ATHLETIK
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-10 pb-0">
        <div className="anim-up mb-6">
          <span className="inline-flex items-center gap-2 border border-gold/40 text-gold label-cap px-3 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            80 Jahre Kinetic Heritage
          </span>
        </div>

        <h1 className="anim-up-2 display-giant text-chalk mb-8" style={{ fontSize: 'clamp(52px, 9vw, 140px)' }}>
          Dynamik<br />
          <span style={{ WebkitTextStroke: '2px #fde000', color: 'transparent' }}>&amp;</span>
          <span className="text-gold"> Gemeinschaft</span>
        </h1>

        <div className="anim-up-3 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15 mt-2">
          <a href="#kila" className="py-5 pr-4 px-4 hover:bg-white/5 transition-colors">
            <p className="label-cap text-gold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon text-sm">child_care</span>KiLa Kids
            </p>
            <p className="text-chalk font-display font-semibold text-sm tracking-display">U8 bis U14</p>
          </a>
          <a href="#lauftreff" className="py-5 px-4 hover:bg-white/5 transition-colors hidden md:block">
            <p className="label-cap text-gold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon text-sm">directions_run</span>Lauftreff
            </p>
            <p className="text-chalk font-display font-semibold text-sm tracking-display">{lauftreffSlot ?? 'Do. 18:30 Uhr'}</p>
          </a>
          <a href="#lauftreff" className="py-5 px-4 hover:bg-white/5 transition-colors hidden md:block">
            <p className="label-cap text-gold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon text-sm">wb_sunny</span>Early Birds
            </p>
            <p className="text-chalk font-display font-semibold text-sm tracking-display">{earlyBirdsSlot ?? 'Di. 06:00 Uhr'}</p>
          </a>
          <div className="py-5 pl-4 flex items-center">
            <button className="group flex items-center gap-3 bg-gold text-navy font-display font-bold label-cap px-6 py-3 rounded-sm hover:bg-gold-dim active:scale-95 transition-all w-full justify-center md:w-auto">
              Probetraining
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── KiLa Kids ─────────────────────────────────────────────────────────────── */

function KilaSection({ teams }: { teams: AbteilungProfile['mannschaften'] }) {
  return (
    <section className="py-16 bg-chalk" id="kila">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="mb-14">
          <p className="sec-num mb-3">01 — Kinder-Leichtathletik</p>
          <div className="flex items-end gap-8 flex-wrap">
            <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(36px, 5.5vw, 88px)' }}>
              KiLa <span className="text-gold">Kids</span>
            </h2>
            <p className="text-ink-soft/50 text-sm max-w-sm leading-relaxed mb-2 font-body">
              Vom spielerischen Einstieg bis zum gezielten Leistungstraining — wir fördern Talente mit Herz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="img-zoom relative rounded-lg overflow-hidden min-h-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="KiLa Kids Training"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSZwcMYmNoEevX_qsM07zHf19Wt7TL0Dp6Y8n8tWwnkunbOQPsONRlMl3tZY_xxVHa13oa14ZS_FryV25I_j3QNA76m7swG5EFakJ7GcANgrjMIprPRMfaRNwKpBUhxfqQftjjup4cl7o3eLHhqr0jmuVeoOJ7JJd-iAmtC8DkHdIIwF1Sk81YM7htuzJu7GFjXV9PGKpKW7oZqUeQU_FcT94-QT5fdhQR6k8oWWSCoYo0YAW2EpRotLP40Sk7y7yBYrNA-HzK40c"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex flex-col justify-end p-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined fill-icon text-gold text-sm">star</span>
                <span className="label-cap text-gold">Sponsored by Biogrund</span>
              </div>
              <p className="text-chalk/70 text-sm max-w-xs leading-relaxed">
                Spielerisches Laufen, Springen und Werfen. Kinder werden hier zu Athleten.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {teams.length > 0 ? teams.slice(0, 4).map((team, i) => {
              const label = ageLabel(team)
              const upperAge = parseInt(label.replace('U', '')) || 0
              const isLight = i === teams.length - 1 || upperAge > 12
              return (
                <div
                  key={team.id}
                  className={`rounded-lg p-7 hover:-translate-y-1 transition-transform cursor-default ${
                    isLight ? 'bg-mist-mid border border-dashed border-navy/20' : 'bg-navy text-chalk'
                  }`}
                >
                  <p
                    className={`font-display font-black mb-1 ${isLight ? 'text-navy' : 'text-gold'}`}
                    style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}
                  >
                    {label}
                  </p>
                  <p className={`label-cap mb-3 ${isLight ? 'text-navy/40' : 'text-chalk/40'}`}>
                    {upperAge > 0 ? ageSubtitle(upperAge) : team.name}
                  </p>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-ink-soft/50' : 'text-chalk/60'}`}>
                    {team.motto ?? (upperAge > 0 ? ageDescription(upperAge) : '')}
                  </p>
                </div>
              )
            }) : (
              <>
                <div className="bg-navy rounded-lg p-7 text-chalk hover:-translate-y-1 transition-transform cursor-default">
                  <p className="font-display font-black text-gold mb-1" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>U8</p>
                  <p className="label-cap text-chalk/40 mb-3">Die Minis</p>
                  <p className="text-chalk/60 text-xs leading-relaxed">Spielerischer Einstieg in die Welt des Laufens, Springens und Werfens.</p>
                </div>
                <div className="bg-navy rounded-lg p-7 text-chalk hover:-translate-y-1 transition-transform cursor-default">
                  <p className="font-display font-black text-gold mb-1" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>U10</p>
                  <p className="label-cap text-chalk/40 mb-3">Die Starter</p>
                  <p className="text-chalk/60 text-xs leading-relaxed">Erste koordinative Grundlagen und vielseitige Entdeckungen im Sport.</p>
                </div>
                <div className="bg-navy rounded-lg p-7 text-chalk hover:-translate-y-1 transition-transform cursor-default">
                  <p className="font-display font-black text-gold mb-1" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>U12</p>
                  <p className="label-cap text-chalk/40 mb-3">Die Talente</p>
                  <p className="text-chalk/60 text-xs leading-relaxed">Vielseitigkeitstraining und Vorbereitung auf erste Wettkämpfe.</p>
                </div>
                <div className="bg-mist-mid border border-dashed border-navy/20 rounded-lg p-7 hover:-translate-y-1 transition-transform cursor-default">
                  <p className="font-display font-black text-navy mb-1" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>U14</p>
                  <p className="label-cap text-navy/40 mb-3">Aufbauphase</p>
                  <p className="text-ink-soft/50 text-xs leading-relaxed">Spezialisierung und gezielte Leistungsförderung. Werde Teil des Teams!</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Trainer ───────────────────────────────────────────────────────────────── */

function TrainerSection({ trainers }: { trainers: Trainer[] }) {
  return (
    <section className="py-16 bg-chalk">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="sec-num mb-3">03 — Trainer &amp; Experten</p>
          <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
            Das Team <span className="text-outline-navy">hinter</span><br />
            dem Team
          </h2>
        </div>
        <TeamIntro trainers={trainers} theme="light" showRecruitingSlot />
      </div>
    </section>
  )
}

/* ─── Lauftreff & Early Birds ───────────────────────────────────────────────── */

function LauftreffsSection({
  lauftreffLeitung,
  earlyBirdsLeitung,
  lauftreffBadge,
  earlyBirdsBadge,
}: {
  lauftreffLeitung?: Trainer | null
  earlyBirdsLeitung?: Trainer | null
  lauftreffBadge?: string
  earlyBirdsBadge?: string
}) {
  return (
    <section className="py-16 bg-navy noise relative overflow-hidden" id="lauftreff">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        <div className="mb-14">
          <p className="sec-num text-chalk/40 mb-3">05 — Laufgruppen</p>
          <h2 className="display-giant text-chalk" style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
            Gemeinsam <span className="text-gold">Laufen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="group relative rounded-lg overflow-hidden flex flex-col justify-end" style={{ minHeight: 480 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Lauftreff Hünstetten"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBEr4POvA7MLnJ9APJ970nR1rwt-CsILsu8jA7nikNSeL3WtRPurKnpv-n20CeipI18w3ixYT4OfxDV0q6QCZeDVJT0lFYC8PrlGtBilUJYaZs1cmQaMi9uFGuHl2EukjZeI3CrTDr2TYAVA5a4g9II33X_Gtw9US2yJGbYpuUuJ-MhO4HFn3CmTYszsV9qPxKLrREJDAFlT1lr7ur1IAiC-FiEumm1w9marGpeR82WTjFgaT9KUWWxRg1zSoHY0SvcUZmLo0JdvY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-10">
              <span className="label-cap text-gold border border-gold/40 px-3 py-1.5 rounded-sm inline-block mb-5">
                {lauftreffBadge ?? 'Jeden Donnerstag · 18:30'}
              </span>
              <h3 className="display-giant text-chalk mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                Lauftreff<br />Hünstetten
              </h3>
              <p className="text-chalk/60 text-sm max-w-xs leading-relaxed mb-5">
                Gemeinsam durch Wald und Flur. Verschiedene Tempogruppen bei jedem Wetter.
              </p>
              {lauftreffLeitung && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-navy-mid ring-1 ring-gold/20 shrink-0">
                    {lauftreffLeitung.foto_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={`${lauftreffLeitung.vorname} ${lauftreffLeitung.nachname}`} className="w-full h-full object-cover object-top" src={lauftreffLeitung.foto_url} />
                    )}
                  </div>
                  <div>
                    <p className="label-cap text-gold/70">Leitung</p>
                    <p className="font-display font-semibold text-chalk text-sm tracking-display">
                      {lauftreffLeitung.vorname} {lauftreffLeitung.nachname}
                    </p>
                  </div>
                </div>
              )}
              <button className="bg-chalk text-navy label-cap px-7 py-3 rounded-sm hover:bg-gold active:scale-95 transition-all flex items-center gap-2">
                Jetzt Mitmachen <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="group relative rounded-lg overflow-hidden flex flex-col justify-end" style={{ minHeight: 480 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Early Birds Run"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYN8TEPs02fKnHIPVKmMPycrSqTaFh98DOUDcTYl3aTfYSZoxj9MgIXiDTUnovy2vuIV-MxwKMf-4p-ZcRHnEM9dIfMUJZTz0rp92RtkJNx3sNqOmxhiykihlpaELUEJhpjzIJo5ETn92dBnmKNdBMeOYIyLqIQCV-ScQKQcUN2aZVUc4egxOT72P3pHBKVW2j88mq9DWkfhKUOW8cQrpUilpPik7Q2bPyZP_OdUZS_99A6c_2qYVNAzecnZ0D0mFjDcHjO2Oa4lI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-10">
              <span className="label-cap text-gold border border-gold/40 px-3 py-1.5 rounded-sm inline-block mb-5">
                {earlyBirdsBadge ?? 'Jeden Dienstag · 06:00'}
              </span>
              <h3 className="display-giant text-chalk mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                Early Birds<br />Run
              </h3>
              <p className="text-chalk/60 text-sm max-w-xs leading-relaxed mb-5">
                Für alle, die den Tag mit Energie beginnen wollen. Ein kraftvoller Start in den Morgen.
              </p>
              {earlyBirdsLeitung && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-navy-mid ring-1 ring-gold/20 shrink-0">
                    {earlyBirdsLeitung.foto_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={`${earlyBirdsLeitung.vorname} ${earlyBirdsLeitung.nachname}`} className="w-full h-full object-cover object-top" src={earlyBirdsLeitung.foto_url} />
                    )}
                  </div>
                  <div>
                    <p className="label-cap text-gold/70">Leitung</p>
                    <p className="font-display font-semibold text-chalk text-sm tracking-display">
                      {earlyBirdsLeitung.vorname} {earlyBirdsLeitung.nachname}
                    </p>
                  </div>
                </div>
              )}
              <button className="bg-chalk text-navy label-cap px-7 py-3 rounded-sm hover:bg-gold active:scale-95 transition-all flex items-center gap-2">
                Jetzt Mitmachen <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
