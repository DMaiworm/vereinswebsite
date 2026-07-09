# Claude Code – Projektregeln & Lessons Learned

## Claude Design Entwurf übernehmen (1:1 Port)

### Grundregel
**Nie** Tokens remappen, Shared Components einbauen oder Design-Entscheidungen ändern. Erst 1:1 portieren, danach refactoren. Wenn der User sagt "übernimm das Design", bedeutet das: pixel-perfect, keine kreativen Abweichungen.

---

### Setup für neue Abteilungsseiten (Tailwind v4 — kein CDN mehr)

Seit S-007 laufen alle Seiten auf **Project Tailwind v4**. Das Root-Layout und `globals.css` stellen alles bereit — neue Layouts brauchen kein CDN-Boilerplate.

**Neues Minimal-Layout (`app/<abteilung>/layout.tsx`):**
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abteilung | SG Hünstetten',
}

export default function AbteilungLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**Was das Root-Layout global bereitstellt:**
- Fonts: Lexend (`--font-lexend`), Plus Jakarta Sans (`--font-jakarta`) via `next/font/google`
- Icons: Material Symbols Outlined via Google Fonts
- Image-Fallback-Script (`.broken` CSS-Klasse bei Ladefehler)

**Was `globals.css` global bereitstellt:**
- Alle MD3-Farbtoken via `@theme inline` → Tailwind v4 generiert `bg-primary`, `text-on-surface`, `border-outline` etc. automatisch
- Unlayered Overrides für BaseNav/SiteFooter: `bg-navy`, `text-gold`, `text-chalk`
- Typography-Utilities: `.font-display`, `.font-body`, `.font-headline`, `.font-lexend`
- `.vanguard-gradient`, `.kinetic-gradient`, `.no-scrollbar`, `.py-xl`, `.p-lg`
- `.text-display-lg` bis `.text-label-sm`

**Page-spezifisches CSS** (z.B. `@keyframes`, Pseudo-Element-Regeln) bleibt als `<style dangerouslySetInnerHTML>` im jeweiligen Layout:
```tsx
const CSS = `@keyframes marquee { ... }`

export default function Layout({ children }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  )
}
```

---

### ~~CDN Tailwind v3 Pattern~~ (veraltet seit S-007)

> **Nicht mehr verwenden.** `lib/brandCss.ts`, `lib/designBlau.ts`, `lib/designHell.ts` wurden in S-007 gelöscht.
>
> Das CDN-Pattern war nötig, weil CDN Tailwind v3 seinen Preflight als unlayered CSS injiziert und damit Tailwind v4 `@layer utilities` überschreibt. Seit alle Seiten auf v4 laufen, gibt es keinen CDN-Preflight-Konflikt mehr.

---

### Weitere Fallstricke

#### Gradient mit Opacity auf custom colors
`from-primary/90` funktioniert **nicht** wenn `--color-primary` über `var()` aufgelöst wird und der Compiler keinen RGB-Kanal extrahieren kann. **Immer** rgba verwenden wenn unsicher:
```
✗ from-primary/90   (riskant bei dynamisch aufgelösten Farben)
✓ from-[rgba(5,40,86,0.92)]
```

#### Arbitrary Values mit Dezimalpunkten
`h-[4.8rem]` — Tailwind v4's Content-Scanner erkennt Dezimalpunkte in Arbitrary Values nicht zuverlässig → Klasse wird nicht generiert. **Immer** Standard-Scale-Werte oder ganzzahlige px-Werte verwenden:
```
✗ h-[4.8rem]
✓ h-20  (5rem, nächster Standardwert)
✓ h-[76px]
```

#### Material Symbols Icons
Werden im Root-Layout (`app/layout.tsx`) geladen – einmalig, gilt für alle Seiten. Nicht nochmals in Kind-Layouts laden.

#### Google Fonts (Lexend, Plus Jakarta Sans)
Werden im Root-Layout via `next/font/google` als `--font-lexend` / `--font-jakarta` CSS-Variablen bereitgestellt. Nicht nochmals in Kind-Layouts deklarieren.

#### `<img>` statt `<Image>`
Claude Design verwendet `<img>`. Für 1:1-Ports `<img>` behalten, ESLint-Warning mit `{/* eslint-disable-next-line @next/next/no-img-element */}` suppressen.

#### Logo immer aus DB
Nie hardcoded `lh3.googleusercontent.com`-URLs für das Vereinslogo verwenden. Stattdessen:
```tsx
const config = await fetchClubConfig()
const logoSrc = config.logoWebUrl ?? config.logoUrl ?? '/fallback-logo.png'
```

---

## TopNav CTA-Label-Konvention (BaseNav, seit S-012)

Der CTA-Button in `BaseNav` (`ctaLabel` + `ctaHref`) folgt einer festen Konvention je Seitentyp
— kein freies Texten pro Seite:

| Seitentyp | `ctaLabel` | Beispiel |
|-----------|-----------|----------|
| Kurs-Unterseiten (14 Kurse unter Fitness/Gesundheitssport/Kinderturnen) | `"Jetzt Anmelden"` | Pilates, LadyFit, Früh übt sich I |
| Abteilungs-Übersichten, Erwachsenensport (Fitness, Gesundheitssport) | `"Jetzt Buchen"` | Fitness, Gesundheitssport |
| Abteilungs-Übersichten, Mannschafts-/Kindersport (Kinderturnen, Fußball, JFV, Leichtathletik, Badminton, Tischtennis) | `"Probetraining"` | Fußball, JFV |
| Vereinsseiten (Chronik, Mitgliedschaft, Vorstand, Rechtliches) | `"Mitglied werden"` | Impressum, Vorstand |
| Sponsoring | `"Partner werden"` | Sponsoren |
| Shop, Fundgrube | `ctaLabel={null}` (kein CTA) | Shop, Fundgrube |

**`ctaHref` ist Pflicht sobald `ctaLabel` gesetzt ist** — der Button ist ein Anchor-Link zur
bestehenden CTA-/Kontakt-Sektion der Seite (z.B. `#kontakt`, `#cta`, `#anmeldung`), kein neues
Zielsystem. Fehlt eine solche Sektion auf der Seite komplett, verlinkt `ctaHref` auf die
bestehende Zielseite (z.B. `../mitgliedschaft`) statt eines toten Buttons.

---

## TopNav-IA (BaseNav, seit S-014)

S-014 hat die TopNav-Struktur grundlegend neu aufgesetzt (löst das Zwei-Dropdown-Muster aus
S-012/S-013 ab). Aktuelle Struktur:

- **Globales "Abteilungen"-Dropdown**: immer sichtbar, auf jeder Seite. Die Dropdown-**Liste**
  ist konstant und ungefiltert (`ABTEILUNGEN`-Konstante in `BaseNav.tsx`, 8 Sport-Abteilungen) —
  der aktuelle Eintrag wird nicht mehr herausgefiltert. Vereinsseiten sind absichtlich **nicht**
  in der Liste enthalten (nur über den Footer erreichbar). `parentDepartment` wurde ersatzlos
  entfernt.
- **Trigger-Label zeigt IMMER den aktuellen Standort** — kein Fallback auf generisches
  "Abteilungen". Jede Seite übergibt ihr `departmentLabel` (identischer String wie das
  `departmentLabel` an `SiteFooter` auf derselben Seite) an `BaseNav`; das Label ersetzt nur den
  Trigger-Text, filtert aber nichts aus der Dropdown-Liste heraus. Einzige Ausnahme: die
  Homepage (`app/page.tsx`) hat keine eigene Abteilung und lässt `departmentLabel` entsprechend
  weg (zeigt "Abteilungen") — das spiegelt exakt, dass auch `SiteFooter` dort ohne
  `departmentLabel` aufgerufen wird.
- **Kurse inline vs. Overflow-Dropdown**: Abteilungs-Übersichtsseiten mit Kurslinks (Fitness,
  Gesundheitssport, Kinderturnen) übergeben weiterhin ihre Kurse als `navItems`-Prop. Zusätzlich
  das neue Flag `groupCoursesIfOverflow` setzen. Ab mehr als `COURSE_OVERFLOW_THRESHOLD` (aktuell
  4) Einträgen wandert die komplette Liste automatisch in ein eigenes "Kurse"-Dropdown statt
  einzeln inline zu erscheinen (aktuell nur Fitness mit 7 Kursen betroffen). Ohne das Flag bleiben
  `navItems` immer inline, unabhängig von der Länge — wichtig für Mannschaftsseiten wie Fußball
  (5 Anker-Links), die trotz `>4` **nicht** gruppiert werden sollen.
- **Kurs-Unterseiten radikal einfach**: übergeben nur noch `logoUrl`, `clubName`,
  `departmentLabel`, `ctaLabel`, `ctaHref`, `homeHref` an `BaseNav` — keine `navItems`, kein
  `parentDepartment`. Intrapage-Anker (`#kontakt`, `#kursplan`) bleiben als Buttons/Sections auf
  der Seite selbst bestehen, nur die Duplizierung in der TopNav entfällt.
- **Breakpoint**: Desktop-Nav (Dropdown, `navItems`, CTA) bleibt hinter `xl` (1280px) versteckt,
  darunter greift durchgehend das Mobile-Flyout (inkl. "Abteilungen"-Sektion) — das global
  reachable von 375px an ist. Ein niedrigerer Breakpoint (`lg`/1024px) wurde getestet und verworfen:
  bei Seiten mit mehr `navItems` (z.B. Fußball mit 5 Ankern) kollidiert der Abteilungen-Trigger
  dort mit dem ersten Nav-Item.

---

## Visuelle Prüfung mit Playwright

`playwright` ist **nicht** als npm-Package installiert. Nur der CLI via `npx` funktioniert.

```bash
# Ganze Seite (Dev-Server auf Port 3002 wenn 3000 belegt)
npx playwright screenshot --browser chromium "http://localhost:3000/pfad/" /tmp/screen.png --full-page --viewport-size "1440,900"

# Ausschnitt (z.B. Footer: x=0, y=5720, w=1552, h=700)
# → erst full-page machen, Bildgröße notieren, dann clip berechnen
npx playwright screenshot --browser chromium "http://localhost:3000/pfad/" /tmp/crop.png --clip 0,5720,1552,700
```

**Nie** `playwright` oder `@playwright/test` per `require`/`import` in Node-Scripts nutzen → `MODULE_NOT_FOUND`.

**Dev-Server Cache-Fehler**: Bei Turbopack-Fehlern (`Unable to open static sorted file`) → `rm -rf .next` und neu starten.

---

### Checkliste vor dem ersten Browser-Check

- [ ] Kein CDN-Script und keine `CDN_CSS`-Importe im Layout
- [ ] Keine `from-primary/90` Syntax → `from-[rgba(...)]`
- [ ] Keine Arbitrary Values mit Dezimalpunkten (z.B. `h-[4.8rem]`) → Standard-Scale
- [ ] Logo via `fetchClubConfig()`, nicht hardcoded
- [ ] Seite ist `async`, falls API-Calls nötig
