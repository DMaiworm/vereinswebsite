# S-013 – TopNav-Regression: Dropdown-Merge & Wortmark-Kollision beheben

## Meta
- **Status:** review
- **Bereich:** `components/shared/layout/BaseNav.tsx`
- **Typ:** Bugfix (Regression aus S-012)

## Ziel

S-012 sollte pro Kurs-Unterseite **zwei getrennte** Dropdowns liefern (Top-Level-Abteilungen +
ein zweites, eigenes Element für Kurs-Geschwister/Rücksprung – so in S-012 explizit als
Entscheidung festgehalten: „ggf. als eigener kleinerer Trigger neben dem Abteilungsnamen").
Stattdessen wurden beide Listen in **einem** Dropdown unter einem einzigen Trigger
zusammengemischt. Zusätzlich bricht das `departmentLabel` bei mittleren Viewport-Breiten
um und kollidiert optisch mit der Wortmarke „SG HÜNSTETTEN". Beides wird in dieser Story
behoben, bevor S-012 als abgeschlossen gilt.

## Ist-Zustand (reproduziert)

### Befund 1 – Ein Dropdown statt zwei
`components/shared/layout/BaseNav.tsx` (aktueller Stand, Zeile ~128–163): Der einzige
Dropdown-Container rendert nacheinander `parentDepartment.siblings` (Kurs-Geschwister +
Rücksprung-Link) **und** direkt darunter (nur durch einen dünnen Trenner abgesetzt) die
komplette `dropdownList` mit allen 8 Top-Level-Abteilungen – alles unter demselben
`departmentLabel`-Button/Trigger. Auf Kurs-Unterseiten entsteht dadurch ein einziges,
langes Menü aus Kurs-Geschwistern + 8 Abteilungen statt zwei separat bedienbarer,
klar unterscheidbarer Dropdowns.

### Befund 2 – Wortmarke kollidiert mit umbrechendem departmentLabel
Reproduziert per Playwright-Screenshot auf `/pilates/` und `/achtsamkeit/`:
- Bei **1024px** Breite bricht `departmentLabel` (z.B. „Pilates & BodyART") auf zwei Zeilen
  um und drängt sich eng an die Nav-Items („Kontakt" wird fast berührt).
- Bei **900px** Breite überlappt die zweite Zeile des umgebrochenen `departmentLabel`
  („BODYART") sichtbar mit der Zeile der Wortmarke „SG HÜNSTETTEN" – der Text liegt
  optisch übereinander/verschachtelt.
- Ursache: Der `departmentLabel`-Button hat kein `whitespace-nowrap`, und der äußere
  Flex-Container reserviert keinen Mindestplatz für die Wortmarke.
- **Wichtig:** Bei 1440px (dem in `CLAUDE.md` als Standard-Screenshot-Viewport genutzten
  Breakpoint) tritt der Fehler nicht auf – deshalb ist er in der S-012-QA-Stichprobe
  (nur 1440×900 getestet) durchgerutscht.

## Akzeptanzkriterien

### AC-1: Zwei getrennte Dropdowns auf Kurs-Unterseiten
- Auf allen 14 Kurs-Unterseiten existieren zwei unabhängig voneinander bedienbare
  Dropdown-Trigger nebeneinander:
  1. **Kurs-Kontext-Dropdown** (bestehender `departmentLabel`-Trigger, z.B. „Pilates & BodyART ▾"):
     zeigt **nur** `parentDepartment.siblings` + Rücksprung-Link zur Abteilungsübersicht.
  2. **Abteilungs-Dropdown**: ein zweiter, kompakterer Trigger (z.B. Icon-Button oder kurzes
     Label wie „Abteilungen ▾") zeigt die 8 Top-Level-Abteilungen (bisherige `dropdownList`).
- Beide Trigger haben eigene, unabhängige `aria-haspopup`/`aria-expanded`-Zustände und
  öffnen/schließen unabhängig voneinander (Klick + Click-outside wie bisher).

### AC-2: Einzelnes Dropdown bleibt auf Abteilungs-Übersichtsseiten
- Seiten ohne `parentDepartment` (Top-Level-Abteilungen, Vereinsseiten) zeigen weiterhin
  nur den einen bestehenden Dropdown mit den 8 Top-Level-Abteilungen bzw. den
  Vereinsseiten – keine Verhaltensänderung hier.

### AC-3: Keine Kollision zwischen Wortmarke und departmentLabel
- `departmentLabel` bricht bei keiner Viewport-Breite zwischen 375px und 1920px mehr um
  und überlappt nie mit der Wortmarke.
- Lösung z.B.: `whitespace-nowrap` auf dem Label, plus definiertes Verhalten bei zu wenig
  Platz (z.B. Label ab einem sinnvollen Breakpoint ausblenden/kürzen und stattdessen nur
  im Mobile-Menü zeigen) – konkrete Umsetzung liegt bei `/dev`, Hauptsache keine visuelle
  Kollision mehr.

### AC-4: Playwright-Stichprobe über mehrere Breakpoints
- Screenshot-Vergleich auf `/pilates/` (Kurs-Unterseite, zwei Dropdowns) und
  `/gesundheitssport/` (Abteilungsseite, ein Dropdown) bei **375px, 900px, 1024px, 1440px**.
- Keine Text-Umbrüche/-Kollisionen bei Wortmarke oder departmentLabel in keinem der
  vier Breakpoints.

### AC-5: Keine Regression der S-012-Funktionalität
- CTA-Buttons (Anchor-Verhalten), Klick-Handling, ARIA-Attribute, Mobile-Flyout mit
  „Alle Abteilungen"-Abschnitt bleiben unverändert funktional erhalten.
- `npm run build` weiterhin fehlerfrei.

## Technische Notizen

- Betrifft ausschließlich `components/shared/layout/BaseNav.tsx` – keine der 27 Seiten
  muss ihre Props ändern (`parentDepartment` liefert weiterhin dieselben Daten, nur die
  Darstellung im Nav muss auf zwei Trigger aufgeteilt werden).
- Platz-Constraint beachten: zwei Dropdown-Trigger + Wortmarke + Nav-Items + CTA-Button
  müssen auch auf kleineren Desktop-Breiten (~1024–1280px) nebeneinander passen. Ggf.
  Nav-Items (`navItems`) ab einem Breakpoint stärker einklappen oder Abteilungs-Trigger
  als reines Icon ohne Text darstellen, um Platz zu sparen.
- Empfehlung für künftige TopNav-Änderungen: Playwright-Stichprobe nicht nur bei 1440×900
  (CLAUDE.md-Standard-Viewport), sondern zusätzlich bei einer schmaleren Desktop-Breite
  (z.B. 1024px) fahren, da genau dort Umbrüche im Nav zuerst auftreten.

## Betroffene Dateien

**Geändert:**
- `components/shared/layout/BaseNav.tsx` (zwei getrennte Dropdown-Trigger, whitespace-nowrap/Kollisionsfix)

**Nicht geändert:**
- Alle `page.tsx`-Aufrufe von `BaseNav` (Props bleiben gleich, nur die interne Darstellung ändert sich)
