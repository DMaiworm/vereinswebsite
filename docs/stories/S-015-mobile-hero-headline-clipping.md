# S-015 – Mobile: Hero-Headlines werden am rechten Rand abgeschnitten statt umzubrechen

## Meta
- **Status:** review
- **Bereich:** `components/shared/sections/AbteilungHero.tsx` (und/oder Hero-Varianten für
  dunkle Vereinsseiten), betroffene Seiten: Gesundheitssport, Kinderturnen, Sponsoren, JFV
- **Typ:** Bugfix (Responsive/Mobile)

## Vorgeschichte

Im Rahmen der TopNav-Arbeiten (S-014) wurde ein Mobile-Screenshot-Audit über alle ~30 Seiten bei
390px Viewportbreite (iPhone 12/13/14) gefahren, um systematisch Mobile-Designfehler zu
katalogisieren. Dieser Bug ist einer von vier daraus entstandenen Stories (siehe auch S-016,
S-017, S-018).

## Ist-Zustand (reproduziert)

Auf mehreren Abteilungs-/Vereinsseiten läuft die große, fette Hero-Headline bei 390px Breite über
den rechten Bildschirmrand hinaus und wird dort hart abgeschnitten, statt in eine neue Zeile
umzubrechen:

- **Gesundheitssport** (`/gesundheitssport/`): „Gesundheitssport: Balance für Körper & Geist"
  rendert als „Gesundheitsspo…" — der Rest ist unsichtbar. Screenshot:
  `docs/Screenshots/screen-mobile-hero-clipping-gesundheitssport.png`
- **Kinderturnen** (`/kinderturnen/`): „Kinderturnen: Bewegungsfreude von Anfang an" rendert als
  „Kinderturnen: Bewegungsfreu…" — mitten im Wort abgeschnitten. Zusätzlich ist hier die gesamte
  Seite 426px statt 390px breit (horizontaler Overflow, nicht nur die Headline betroffen).
  Screenshot: `docs/Screenshots/screen-mobile-hero-clipping-kinderturnen.png`
- **Sponsoren** (`/sponsoren/`): „Gemeinsam zum Erfolg" rendert als „Gemeinsam" mit abgeschnittenem
  „Zum Erfolg" — bzw. das M in „GEMEINSAM" selbst läuft bereits über den rechten Rand hinaus.
- **JFV** (`/JFV/`): Hero-Fließtext „Vom ersten Ballkontakt bis zur Meisterschaft" und „Wir formen
  echte Teamplayer auf und neben dem Platz" werden mitten im Wort abgeschnitten. Zusätzlich
  überlappen die beiden CTA-Buttons im Hero („Probetraining vereinbaren" / „Unterstützer werden")
  den rechten Bildschirmrand, der zweite Button ist nur noch teilweise sichtbar.
- **Vorstand** (`/vorstand/`): Seite ist 414px statt 390px breit — vermutlich verursacht durch
  einen sich wiederholenden Wasserzeichen-Text-Hintergrund im Hero, der nicht auf die
  Viewportbreite begrenzt ist.

Reproduzierbar mit: `npx playwright screenshot --browser chromium "http://localhost:3000/<seite>/"
/tmp/screen.png --viewport-size "390,844" --full-page`

## Ziel

Auf allen betroffenen Seiten bricht die Hero-Headline (und ggf. Hero-Fließtext/CTA-Buttons) bei
schmalen Viewports sauber in mehrere Zeilen um, ohne den Bildschirmrand zu verlassen oder
horizontalen Scroll auf der Gesamtseite zu erzeugen.

## Akzeptanzkriterien

### AC-1: Keine abgeschnittenen Hero-Headlines
- Auf `/gesundheitssport/`, `/kinderturnen/`, `/sponsoren/` ist die komplette Hero-Headline bei
  375px und 390px Viewportbreite vollständig lesbar (kein abgeschnittenes Wort, kein Text jenseits
  des sichtbaren Bereichs).

### AC-2: Kein horizontaler Overflow der Gesamtseite
- Auf `/kinderturnen/` und `/vorstand/` ist die gerenderte Seitenbreite bei 390px Viewport exakt
  390px (± wenige px durch Scrollbar-Kompensation), nicht 426px bzw. 414px. Body/Container dürfen
  keinen horizontalen Scroll erzeugen.
- Prüfen: `document.documentElement.scrollWidth` entspricht `window.innerWidth` auf allen vier
  betroffenen Seiten bei 390px.

### AC-3: JFV Hero-Fließtext und CTA-Buttons
- Die beiden Absätze im JFV-Hero brechen sauber um, kein abgeschnittenes Wort am rechten Rand.
- Beide CTA-Buttons („Probetraining vereinbaren", „Unterstützer werden") sind bei 375–390px
  entweder vollständig nebeneinander sichtbar (falls Platz reicht) oder stapeln sich sauber
  untereinander — keiner ragt über den Bildschirmrand hinaus.

### AC-4: Keine Regression auf Desktop
- Bei 1440px sehen alle vier Hero-Bereiche unverändert aus wie vor dem Fix (Playwright-Screenshot
  1440×900 vergleichen).

### AC-5: Build fehlerfrei
- `npm run build` ohne Fehler.

## Technische Notizen

- Wahrscheinliche Root Cause: Hero-Headlines nutzen vermutlich `whitespace-nowrap` oder eine feste
  `font-size`/`clamp()`-Untergrenze, die bei 390px nicht mehr in eine Zeile mit angemessenem
  Zeilenumbruch passt, kombiniert mit fehlendem `break-words`/`hyphens-auto` und/oder fehlendem
  `max-width` auf dem Text-Container.
- Kinderturnen und Vorstand zeigen zusätzlich echten Seiten-Overflow (Canvas > Viewport) — hier
  vermutlich nicht nur die Headline, sondern ein Container/Hintergrundelement (z.B. Hero-Bild,
  Badge, oder bei Vorstand ein wiederholtes Wasserzeichen) ohne `overflow-hidden`/`max-w-full`.
  Vor dem Fix mit DevTools/Playwright genau lokalisieren, welches Element die Breite sprengt
  (`document.querySelectorAll('*')` durchsuchen nach `scrollWidth > innerWidth` oder Screenshot
  mit `--full-page` + visuellem Vergleich).
- Betrifft vermutlich eine gemeinsame Hero-Komponente (`AbteilungHero` oder eine dunkle Variante
  für Vereinsseiten) — Fix an einer Stelle sollte alle vier Seiten gleichzeitig lösen, aber jede
  einzeln nachprüfen, da JFV und Vorstand eigene Hero-Layouts ohne die gemeinsame Komponente haben
  könnten (vor Fix-Beginn verifizieren).
- Referenz-Screenshots liegen unter `docs/Screenshots/screen-mobile-hero-clipping-*.png`.

## Betroffene Dateien

**Vermutlich geändert (vor Implementierung verifizieren):**
- `components/shared/sections/AbteilungHero.tsx` (falls gemeinsam genutzt)
- `app/(dept)/gesundheitssport/page.tsx`
- `app/(dept)/kinderturnen/page.tsx`
- `app/(dept)/sponsoren/page.tsx`
- `app/(dept)/JFV/page.tsx`
- `app/(dept)/vorstand/page.tsx`
