# S-013 – TopNav-Regression: Dropdown-Merge & Wortmark-Kollision beheben

> **Superseded durch [S-014](S-014-topnav-neuausrichtung.md).** Der hier gebaute Zwei-Dropdown-
> Ansatz (Kurs-Kontext-Dropdown + separates Abteilungs-Dropdown) entsprach nicht dem tatsächlichen
> Bedarf und wird in S-014 durch eine grundlegend andere TopNav-Struktur ersetzt (ein globales
> Abteilungen-Dropdown, Kurse direkt inline in der Nav, keine Intrapage-Deko auf Kurs-Seiten).
> Diese Story-Datei bleibt als Dokumentation der Vorgeschichte erhalten.

## Meta
- **Status:** superseded
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

## Umsetzung (Dev-Notizen)

- **AC-1/AC-2**: `departmentLabel`-Dropdown zeigt jetzt nur noch `parentDepartment`-Inhalte (Rücksprung +
  Siblings) ODER — falls kein `parentDepartment` — die bisherige `dropdownList` direkt (unverändert für
  Abteilungs-Übersichtsseiten). Ein zweiter, eigener Trigger (reines Icon `grid_view`, `aria-label="Abteilungen"`)
  erscheint nur wenn `parentDepartment` gesetzt ist und zeigt ausschließlich die 8 Top-Level-Abteilungen.
  Eigener State (`abtOpen`/`abtRef`) + eigener Click-outside-Handler, unabhängig vom bestehenden `deptOpen`.
- **AC-3/AC-4**: `whitespace-nowrap` auf Wortmarke und `departmentLabel`-Trigger verhindert Umbrüche. Der volle
  Desktop-Nav-Bereich (departmentLabel-Trigger, Abteilungs-Icon, navItems, CTA) ist jetzt einheitlich hinter dem
  `xl`-Breakpoint (1280px) versteckt statt vorher inkonsistent bei `sm`/`md` — bei 6 Kurs-navItems + zwei Dropdown-
  Triggern reicht der Platz unterhalb von 1280px nicht für eine Desktop-Darstellung ohne Überlappung. Zwischen
  375–1279px greift durchgängig das Mobile-Flyout (bereits vorhandenes „Alle Abteilungen"-Muster, unverändert).
  Playwright-Stichprobe bei 375/900/1024/1280/1440 auf `/pilates/`, `/qi-gong/` und `/gesundheitssport/` zeigt
  keine Kollision mehr.
- **Nebenbefund (behoben)**: Der CTA-Button hatte zusätzlich zur bedingten `hidden xl:block`-Klasse ein
  unconditional `inline-block` im gemeinsamen `ctaButtonClass`-String. Da beide Utilities in derselben
  Tailwind-Layer landen und `inline-block` im generierten CSS nach `hidden` steht, gewann `inline-block` immer
  über `hidden` — der CTA war dadurch auf **allen** Breakpoints sichtbar (auch Mobile), unabhängig vom Wrapper.
  Das hat die Wortmark-Kollision bei 375px zusätzlich verschärft. Fix: `inline-block` aus `ctaButtonClass`
  entfernt, Display-Utility jetzt nur noch am jeweiligen Verwendungsort (`hidden xl:block` Desktop,
  `block` im Mobile-Flyout).
- Icon-Wahl: `apps` (Material Symbols) wurde durch `grid_view` ersetzt, da `apps` im geladenen Font-Subset
  nicht sichtbar gerendert wurde (Ligatur ohne Glyph-Ausgabe).
