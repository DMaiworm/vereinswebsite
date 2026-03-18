# vereinswebsite

Öffentlicher Vereins-Webauftritt als Next.js-App. Separates Deployment pro Verein —
Branding und Inhalte kommen dynamisch aus dem Buchungssystem via öffentliche Edge Functions.

---

## Konzept

- **Ein Fork pro Verein** — jeder Verein kontrolliert seine eigene Domain und sein Deployment
- **Kein gemeinsames Hosting** — ISP, Vercel, Netlify, shared hosting — alles möglich
- **Kein Login nötig** — rein öffentlich, alle Daten über `verify_jwt: false` Edge Functions
- **Branding automatisch** — Vereinsfarben und Logo via CSS Custom Properties aus der DB

---

## Quick Start

```bash
npm install
npm run dev     # Dev-Server auf localhost:3000
npm run build   # Production Build
```

`.env.local` anlegen:
```env
NEXT_PUBLIC_CLUB_SLUG=sg-huenstetten
NEXT_PUBLIC_API_BASE=https://zqjheewhgrmcwzjurjlg.supabase.co/functions/v1
```

---

## Tech Stack

| Layer | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animationen | GSAP 3 + ScrollTrigger |
| Images | next/image |

---

## Projektstruktur

```
app/
├── layout.tsx          # Lädt Club-Config, setzt CSS-Vars auf <html>
├── page.tsx            # Homepage: Hero + Abteilungen + Sponsoren
└── globals.css         # Tailwind v4, hero-gradient, marquee-track

components/
├── Hero.tsx            # GSAP Timeline: Logo → Headline → Scroll-Indicator
├── AbteilungenGrid.tsx # GSAP ScrollTrigger Cards
└── SponsorenStrip.tsx  # GSAP Marquee (endlos, pause on hover)

lib/
└── api.ts              # fetch-Wrapper für alle 5 Edge Functions
```

---

## Neuen Verein einrichten

1. Dieses Repo forken
2. `.env.local` mit dem `CLUB_SLUG` des Vereins anlegen
3. Im Buchungssystem sicherstellen dass für den Club `slug`, `primary_color`, `secondary_color` gesetzt sind
4. `npm run dev` → Vereinsfarben erscheinen automatisch
5. Auf beliebigem Hoster deployen

---

## API-Endpunkte

Alle Daten kommen aus dem Buchungssystem (`NEXT_PUBLIC_API_BASE`):

| Endpoint | Zweck |
|---|---|
| `public-config?slug=xxx` | Bootstrap: Name, Farben, Logo, Abteilungen |
| `public-sponsors?operator_id=xxx` | Öffentliche Sponsoren mit Logos |
| `public-trainers?operator_id=xxx` | Trainer mit `profil_veroeffentlichen=true` |
| `public-team?team_id=xxx` | Team-Profil mit Trainingszeiten + Ergebnissen |
| `public-abteilung?department_id=xxx` | Abteilung mit Teams |
