# S-012 – TopNav-Konsolidierung: Funktionsfehler, Inkonsistenzen & Kurs-Kontext

## Meta
- **Status:** review
- **Bereich:** `components/shared/layout/BaseNav.tsx`, `components/athletics/AthleticsNav.tsx`, `components/badminton/BadmintonNav.tsx`, `components/jfv/JFVNav.tsx`, alle ~27 `page.tsx` mit `<BaseNav>`
- **Typ:** Bugfix + UX-Konsolidierung (kein visueller Neuentwurf, Farben/Layout bleiben)

## Ziel

Die TopNav (`BaseNav.tsx` + 2 Wrapper-Komponenten + 1 toter Nav-Zweig) ist auf allen Seiten
im Einsatz, aber Audit des Codes zeigt: der CTA-Button ist auf jeder einzelnen Seite komplett
funktionslos, das Abteilungs-Dropdown zeigt auf allen Kurs-Unterseiten falsche/irrelevante
Inhalte, es fehlt jegliche Mobile-Unterstützung für die Abteilungsnavigation, und es existiert
toter sowie unnötig dupliziertes Code. Diese Story bringt die TopNav funktional und konsistent
auf ein einheitliches Niveau.

## Ist-Zustand (konkrete Befunde aus Code-Audit)

| # | Befund | Betroffen |
|---|--------|-----------|
| B1 | CTA-Button in `BaseNav.tsx` (Desktop **und** Mobile) hat weder `onClick` noch `href` – der Button tut buchstäblich nichts, auf **jeder** Seite der Website | alle ~27 Seiten |
| B2 | `departmentLabel`-Span hat `cursor-default select-none`, obwohl per Hover ein Dropdown öffnet – falsches Signifikat, kein Chevron/Icon zeigt an, dass hier ein Menü existiert | alle Seiten mit `departmentLabel` |
| B3 | Dropdown öffnet nur per `onMouseEnter`/`onMouseLeave` – kein Klick-, Touch- oder Keyboard-Support, kein `aria-haspopup`/`aria-expanded` | alle Seiten mit `departmentLabel` |
| B4 | Dropdown ist `hidden sm:block` (nicht auf Mobile) **und** im Mobile-Flyout (`mobileOpen`) wird nur `navItems` gerendert – die Abteilungsliste fehlt auf Mobile komplett | alle Seiten mit `departmentLabel` |
| B5 | Auf allen Kurs-Unterseiten (Achtsamkeit, Pilates, Rücken-Fit, Qi-Gong, LadyFit, ManFit, Step-Aerobic, Tanzfitness, Workout, SkiGym, Fit-durchs-Jahr, Früh übt sich I/II, Kids in Bewegung, Grundschulturnen) matcht der übergebene `departmentLabel` (z.B. `"Pilates & BodyART"`) **keinen** Eintrag in `ABTEILUNGEN`/`RECHTLICHES`. Der Filter `.filter(a => a.label !== departmentLabel)` greift dadurch nicht – das Dropdown zeigt die 8 Top-Level-Abteilungen, aber weder die Geschwisterkurse (z.B. Rücken-Fit, Qi-Gong von Pilates aus) noch einen Rücksprung zur Abteilungsübersicht (z.B. Gesundheitssport) | 14 Kurs-Unterseiten |
| B6 | Leichtathletik und Badminton laufen über eigene Wrapper-Komponenten (`AthleticsNav`, `BadmintonNav`), die nur `BaseNav` mit fest einprogrammierten `NAV_ITEMS` aufrufen – unnötige Indirektion, zwei zusätzliche Pflegestellen ohne Mehrwert gegenüber direktem `<BaseNav>`-Aufruf wie bei allen anderen Abteilungen | leichtathletik, badminton |
| B7 | `components/jfv/JFVNav.tsx` ist eine vollständig eigenständige Nav-Implementierung (andere Hintergrundfarbe, andere Gold-Farbe `#FDE000` statt Design-Token, Wortmarke "JFV" statt "SG", andere Logo-Größe) – **wird nirgends importiert**, totaler toter Code | components/jfv/ |
| B8 | In `AthleticsNav.tsx`: "Lauftreff" und "Early Birds" verlinken beide auf denselben Anker `#lauftreff` (einer der beiden Links führt garantiert ins Leere); "News" und "Fan-Shop" verlinken auf `#` (kein Ziel) | leichtathletik |
| B9 | Wortmarke "SG HÜNSTETTEN" ist in `BaseNav.tsx` hart kodiert statt aus `clubName` zusammengesetzt – die `clubName`-Prop wird nur als Bild-`alt`-Text verwendet und hat sonst keine Funktion | BaseNav.tsx |
| B10 | CTA-Label uneinheitlich ohne erkennbares System: "Jetzt Anmelden" / "Jetzt Buchen" / "Probetraining" / `null` / "Mitglied werden" / "Partner werden" auf gleichrangigen Seitentypen | diverse |
| B11 | Das Array `RECHTLICHES` in `BaseNav.tsx` enthält neben Impressum auch Shop, Fundgrube, Chronik, Mitgliedschaft, Sponsoring – der Name ist irreführend für zukünftige Wartung | BaseNav.tsx |

## Entscheidungen (mit User geklärt)

- **CTA-Verhalten (B1):** Button scrollt zur bestehenden CTA-/Kontakt-Sektion der jeweiligen Seite (kein neues Zielsystem, kein externes Formular).
- **Dropdown-Struktur (B5):** Die bestehende Top-Level-Abteilungsliste bleibt der Haupt-Dropdown-Inhalt. Zusätzlich bekommt jede Kurs-Unterseite ein **zweites** Dropdown/Menüelement für die Geschwisterkurse + Rücksprung zur Abteilungsübersicht (Platz-Constraint beachten – ggf. als eigener kleinerer Trigger neben dem Abteilungsnamen).
- **Mobile (B4):** Mobile-Menü wird um die vollständige Abteilungsliste ergänzt (Recommended-Option), damit auch dort volle Navigation möglich ist.

## Akzeptanzkriterien

### AC-1: CTA-Button ist funktional (B1)
- CTA-Button (Desktop + Mobile) ist ein Anchor-Link (kein leerer `<button>`), der zur CTA-/Kontakt-Sektion der aktuellen Seite scrollt.
- Jede Seite mit CTA-Button braucht eine passende Ziel-`id` an ihrer bestehenden Kurs-/Kontakt-CTA-Sektion (z.B. `KursCtaSection`, `AbteilungCta`, `KursInfoBox`). Wo eine solche Sektion fehlt, wird `ctaLabel={null}` explizit gesetzt (analog Shop/Fundgrube) statt eines toten Buttons.
- `BaseNav` erhält eine neue Prop `ctaHref` (Pflicht, sobald `ctaLabel` gesetzt ist).

### AC-2: Dropdown ist erkennbar & bedienbar (B2, B3)
- Chevron-Icon neben `departmentLabel` signalisiert ein Dropdown.
- `cursor-pointer` statt `cursor-default`.
- Dropdown öffnet zusätzlich per Klick (nicht nur Hover) und schließt bei Klick außerhalb.
- `aria-haspopup="true"` und `aria-expanded` korrekt gesetzt.

### AC-3: Kontextuelles zweites Dropdown auf Kurs-Unterseiten (B5)
- Neue optionale Prop an `BaseNav`, z.B. `parentDepartment?: { label: string; href: string; siblings: NavItem[] }`.
- Alle 14 Kurs-Unterseiten (Liste oben) übergeben diese Prop mit ihren Geschwisterkursen + Link zur Abteilungsübersicht.
- Bestehendes Top-Level-Dropdown bleibt unverändert erhalten (Entscheidung: beide Ebenen nebeneinander, nicht ersetzt).

### AC-4: Mobile-Menü zeigt Abteilungen (B4)
- Mobile-Flyout (`mobileOpen`) rendert zusätzlich zur bestehenden `navItems`-Liste die kontextuelle Abteilungsliste (Top-Level + ggf. Geschwisterkurse aus AC-3), z.B. als aufklappbarer Unterabschnitt "Alle Abteilungen".

### AC-5: `departmentLabel`-Matching robust (B5 Fortsetzung)
- Sicherstellen, dass kein Seiten-`departmentLabel` mehr "ins Leere" filtert – entweder über die neue `parentDepartment`-Prop (AC-3) oder durch Korrektur der bestehenden Top-Level-Filterlogik.

### AC-6: Toter Code entfernt, Wrapper konsolidiert (B6, B7, B8)
- `components/jfv/JFVNav.tsx` wird gelöscht (unbenutzt).
- `AthleticsNav.tsx` und `BadmintonNav.tsx` bleiben bestehen, aber Duplikat-Link `#lauftreff`/"Early Birds" sowie tote `#`-Links ("News", "Fan-Shop") werden auf sinnvolle Ziele korrigiert oder entfernt, bis eine echte Zielsektion existiert.

### AC-7: Wortmarke aus `clubName` komponiert (B9)
- `BaseNav.tsx` setzt die Wortmarke aus der `clubName`-Prop zusammen (Fallback "SG HÜNSTETTEN" wenn nicht gesetzt), keine sichtbare Änderung für SG Hünstetten selbst.

### AC-8: CTA-Label-Konvention dokumentiert (B10)
- Feste Konvention pro Seitentyp in `CLAUDE.md` ergänzt: Kurs-Unterseiten → "Jetzt Anmelden", Abteilungs-Übersichten → "Jetzt Buchen"/"Probetraining", Vereinsseiten → "Mitglied werden", Sponsoring → "Partner werden", Shop/Fundgrube → kein CTA (`null`).
- Alle Seiten auf diese Konvention umgestellt.

### AC-9: Naming-Klarheit (B11)
- `RECHTLICHES` in `BaseNav.tsx` umbenannt zu treffenderem Namen (z.B. `VEREINSSEITEN`), keine funktionale Änderung.

### AC-10: Build & visuelle Prüfung
- `npm run build` fehlerfrei.
- Stichprobe per Playwright-Screenshot auf 1 Top-Level-Seite (Gesundheitssport) + 1 Kurs-Unterseite (Pilates) + 1 Vereinsseite (Impressum) vor/nach Vergleich – keine ungewollten visuellen Brüche außer den in dieser Story bewusst adressierten (Chevron-Icon, CTA-Anchor-Verhalten).

## Technische Notizen

### Reihenfolge (Vorschlag)
1. `BaseNav.tsx`: `ctaHref`-Prop, Chevron-Icon, Klick-Handling, ARIA-Attribute, Wortmarke aus `clubName`, `RECHTLICHES` → `VEREINSSEITEN` (kleine, isolierte Änderungen zuerst)
2. `BaseNav.tsx`: neue `parentDepartment`-Prop + zweites Dropdown-UI + Mobile-Flyout-Erweiterung
3. Alle 14 Kurs-Unterseiten: `parentDepartment` befüllen (Geschwister + Rücksprung)
4. Alle ~27 Seiten: `ctaHref` setzen (Ziel-Sektion-ID ermitteln/ergänzen), CTA-Label nach Konvention (AC-8) korrigieren
5. `JFVNav.tsx` löschen; `AthleticsNav.tsx` Link-Fixes
6. `CLAUDE.md` um CTA-Label-Konvention ergänzen
7. Build + Playwright-Stichprobe

### Risiken / offene technische Fragen für `/dev`
- Manche Seiten haben aktuell keine CTA-Zielsektion mit `id` (z.B. reine Info-Seiten) – hier braucht es pro Seite eine kurze Prüfung, ob eine bestehende Sektion eine `id` bekommt oder `ctaLabel={null}` gesetzt wird.
- Platz in der Nav-Leiste für zwei Dropdowns nebeneinander (Top-Level + Geschwister) ist auf kleineren Desktop-Breakpoints ggf. eng – responsives Verhalten (z.B. Zusammenklappen ab `md`) muss beim Bau geprüft werden.

## Betroffene Dateien

**Geändert:**
- `components/shared/layout/BaseNav.tsx` (Kernlogik: CTA-Href, Dropdown-UX, `parentDepartment`, Mobile-Flyout, Wortmarke, Naming)
- `components/athletics/AthleticsNav.tsx` (Link-Fixes)
- ~27× `app/(dept)/*/page.tsx` (`ctaHref`, ggf. `parentDepartment`, CTA-Label-Konvention)
- `app/page.tsx` (`ctaHref`)
- `CLAUDE.md` (neue CTA-Label-Konvention dokumentiert)

**Gelöscht:**
- `components/jfv/JFVNav.tsx`

**Nicht geändert:**
- Farben, Layout, Typo der TopNav (keine visuelle Neugestaltung)
- `components/badminton/BadmintonNav.tsx` (funktional bereits korrekt, keine toten Links gefunden)
