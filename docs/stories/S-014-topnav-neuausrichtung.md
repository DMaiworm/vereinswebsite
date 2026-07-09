# S-014 – TopNav-Neuausrichtung: Ein globales Abteilungen-Dropdown, Kurse direkt in der Nav, keine Intrapage-Deko

## Meta
- **Status:** review
- **Bereich:** `components/shared/layout/BaseNav.tsx`, 14× Kurs-Unterseiten unter `app/(dept)/`
- **Typ:** IA-Neuentwurf (ersetzt den Ansatz aus S-012/S-013 vollständig)

## Vorgeschichte

S-012 hat ein Kurs-Kontext-Dropdown eingeführt, S-013 hat versucht dessen Vermischung mit dem
Abteilungs-Dropdown zu entflechten. Beide Ergebnisse gehen am eigentlichen Bedarf vorbei: die
TopNav ist inzwischen eine komplexe Zwei-Dropdown-Konstruktion, während der eigentliche Bedarf
denkbar einfach ist. Diese Story verwirft den bisherigen Ansatz und definiert die TopNav-Struktur
neu, von Grund auf.

## Ziel

1. **Ein einziges, global immer sichtbares "Abteilungen"-Dropdown** auf jeder Seite der Website
   (Kurs-Unterseiten, Abteilungs-Übersichten, Mannschaftssport-Seiten, Vereinsseiten) — zeigt
   konstant die 8 Sport-Abteilungen, unabhängig von der aktuellen Seite. Keine Kurs-Links, keine
   Geschwisterkurse, keine Vereinsseiten darin.
2. **Kurse direkt als TopNav-Links auf Abteilungs-Übersichtsseiten** (Fitness, Gesundheitssport,
   Kinderturnen) — kein Dropdown, solange die Anzahl überschaubar ist. Erst wenn eine Abteilung
   mehr als 4 Kurse hat (aktuell nur Fitness mit 7), wandern **alle** Kurse dieser Abteilung
   gemeinsam in ein eigenes "Kurse"-Dropdown statt einzeln inline.
3. **Kurs-Unterseiten radikal vereinfacht**: keine Intrapage-Anker-Navigation (Ablauf/Trainer/
   Kursplan/Kontakt o.ä.) mehr in der TopNav — das ist reine Deko, Nutzer scrollen. Keine
   Geschwisterkurse-Liste, kein Rücksprung-Element. Nur Logo + globales Abteilungen-Dropdown + CTA.

## Entscheidungen (mit User geklärt)

- **Overflow-Schwelle:** feste Zahl — bis 4 Kurse inline, ab 5 Kursen wandert die gesamte
  Kursliste dieser Abteilung in ein eigenes Dropdown (kein Teil-Inline/Teil-Dropdown-Mix).
- **Kurs-Unterseiten-Kontext:** kein Extra-Hinweis auf die übergeordnete Abteilung (kein
  Text-Link, kein Breadcrumb) — der Rücksprung läuft ausschließlich über das globale
  Abteilungen-Dropdown.
- **Vereinsseiten:** bleiben außerhalb des globalen Abteilungen-Dropdowns (nur die 8
  Sport-Abteilungen dort), Vereinsseiten sind weiterhin nur über den Footer erreichbar.

## Akzeptanzkriterien

### AC-1: Globales Abteilungen-Dropdown, immer sichtbar
- Auf jeder Seite (jeder Breakpoint ab 375px) ist ein Dropdown-Trigger für die Abteilungen
  erreichbar — auf Mobile mindestens im Flyout-Menü, auf Desktop inline in der TopNav (keine
  Verschiebung hinter einen unrealistisch hohen Breakpoint wie in S-013 geschehen).
- Inhalt ist konstant: Badminton, Fitness, Fußball, Gesundheitssport, Jugendfußball (JFV),
  Kinderturnen, Leichtathletik, Tischtennis — unabhängig von der aktuellen Seite. Kein Filtern
  des aktuellen Eintrags mehr nötig (globale, kontextunabhängige Liste).
- Keine Kurs-Links, keine Geschwisterkurse-Einträge, keine Vereinsseiten in diesem Dropdown.

### AC-2: Kurse direkt in der TopNav auf Abteilungs-Übersichtsseiten
- Fitness, Gesundheitssport, Kinderturnen zeigen ihre Kurse als einzelne, direkt klickbare
  Links in der TopNav, solange die Abteilung ≤4 Kurse hat (aktuell: Gesundheitssport 4,
  Kinderturnen 4 — beide bleiben inline).
- Fitness (7 Kurse) bekommt ein eigenes "Kurse"-Dropdown mit allen 7 Kursen statt 7 einzelnen
  Inline-Links.
- Der Schwellenwert (4) ist als benannte Konstante in `BaseNav.tsx` hinterlegt, nicht pro
  Abteilung hartkodiert dupliziert — wächst eine Abteilung künftig über 4 Kurse, kippt sie
  automatisch ins Dropdown.

### AC-3: Kurs-Unterseiten zeigen nur noch Logo, Abteilungen-Dropdown, CTA
- Alle 14 Kurs-Unterseiten (Achtsamkeit, Pilates, Rücken-Fit, Qi-Gong, LadyFit, ManFit,
  Step-Aerobic, Tanzfitness, Workout, SkiGym, Fit-durchs-Jahr, Früh übt sich I, Früh übt sich II,
  Kids in Bewegung, Grundschulturnen) übergeben an `BaseNav` keine Intrapage-Anker mehr als
  `navItems` und keine `parentDepartment`-Prop.
- Intrapage-Anker-Ziele (z.B. `#kontakt`, `#kursplan`) bleiben als Inhalt/Buttons **auf der
  Seite selbst** bestehen (z.B. im Hero oder InfoGrid) — nur die Duplizierung in der TopNav
  entfällt.
- Mobile-Flyout auf Kurs-Unterseiten zeigt entsprechend nur noch Abteilungen-Dropdown + CTA,
  keine leeren Anker-Reste.

### AC-4: `parentDepartment` vollständig entfernt
- Prop-Definition, State und Rendering-Zweige für das zweite Dropdown aus S-012/S-013
  (`parentDepartment`, zugehöriger `deptOpen`/`abtOpen`-Doppel-State, Geschwisterkurse-Liste)
  werden aus `BaseNav.tsx` entfernt.
- Alle 14 Kurs-Unterseiten verlieren die `parentDepartment`-Prop-Übergabe ersatzlos.

### AC-5: Andere Seiten unverändert
- Mannschafts-/Einzelseiten (Fußball, JFV, Leichtathletik, Badminton, Tischtennis) und
  Vereinsseiten (Shop, Impressum, Mitgliedschaft, Vorstand, Chronik, Sponsoring, Fundgrube)
  behalten ihre bestehenden `navItems` (Seiten-interne Anker) unverändert in der TopNav,
  zusätzlich zum neuen globalen Abteilungen-Dropdown (AC-1).
- CTA-Label-Konvention aus `CLAUDE.md` bleibt unverändert gültig, keine Regression.

### AC-6: Keine Wortmarken-/Element-Kollision (Lehre aus S-013)
- Bei keiner Viewport-Breite zwischen 375px–1920px überlappt oder umbricht die Wortmarke mit
  einem anderen TopNav-Element.
- Playwright-Stichprobe bei 375/768/1024/1440px auf: 1 Kurs-Unterseite (Pilates), 1
  Abteilungs-Übersicht mit ≤4 Kursen (Gesundheitssport), 1 Abteilungs-Übersicht mit >4 Kursen
  (Fitness), 1 Mannschaftssport-Seite (Fußball). Keine Kollisionen, keine Text-Umbrüche.
- Das globale Abteilungen-Dropdown (AC-1) muss auf **allen** vier Testseiten bereits ab 375px
  erreichbar sein (nicht erst ab einem hohen Desktop-Breakpoint wie zuletzt in S-013).

### AC-7: Build fehlerfrei
- `npm run build` ohne Fehler.

## Technische Notizen

- Hauptaufwand liegt in `components/shared/layout/BaseNav.tsx`: bestehende `dropdownList`-Logik
  (aktuell noch mit "aktuellen Eintrag rausfiltern") vereinfacht sich zu einer fixen,
  ungefilterten `ABTEILUNGEN`-Liste (8 Einträge), da das Dropdown jetzt global/kontextunabhängig
  ist.
- Für die Kurs-Übersichtsseiten: die Abteilungs-`page.tsx`-Dateien übergeben bereits heute ihre
  Kurse als `navItems`-Prop (siehe `GESUNDHEITSSPORT_NAV`, `FITNESS_NAV` in den jeweiligen
  `page.tsx`) — das muss **nicht** neu gebaut werden, nur die Overflow-Gruppierungslogik
  (`navItems.length > 4` → eigenes Dropdown rendern statt inline) ist neu in `BaseNav` zu
  ergänzen. Konkrete Prop-Schnittstelle (z.B. neues Flag `groupCoursesIfOverflow?: boolean` oder
  automatische Erkennung rein über `navItems.length`) liegt als Detailentscheidung bei `/dev`.
- 14 Kurs-Unterseiten unter `app/(dept)/{achtsamkeit,pilates,rueckenfit,qi-gong,ladyfit,manfit,
  step-aerobic,tanzfitness,workout,skigym,fitdurchsjahr,fruehuebtsich-1,fruehuebtsich-2,
  kids-in-bewegung,grundschulturnen}/page.tsx` müssen einzeln angefasst werden: `navItems`- und
  `parentDepartment`-Prop-Übergabe an `BaseNav` entfernen.
- Bei der Entfernung der Intrapage-Anker aus der TopNav prüfen, ob die Zielsektionen (z.B.
  `#kontakt`) weiterhin auf der Seite selbst sichtbar/erreichbar sind (z.B. über den bestehenden
  CTA-Button, der laut CLAUDE.md-Konvention ohnehin auf dieselben Anker zeigt) — keine toten
  Anker-IDs hinterlassen.
- Nach Abschluss: `CLAUDE.md` um einen kurzen Abschnitt zur neuen TopNav-IA ergänzen (globales
  Dropdown, 4-Kurse-Schwellenwert), damit künftige Abteilungen/Kurse dieses Muster kennen.
- S-013s Erkenntnis zur Wortmarken-Kollision (fehlendes `whitespace-nowrap`, Cascade-Konflikt
  zwischen `hidden` und unconditional `inline-block` auf demselben Element) bleibt relevant und
  sollte beim Neubau nicht wieder eingeführt werden.

## Betroffene Dateien

**Geändert:**
- `components/shared/layout/BaseNav.tsx` (Kernumbau: globales Dropdown, Kurs-Overflow-Logik,
  Entfernen von `parentDepartment`)
- 14× Kurs-Unterseiten `app/(dept)/*/page.tsx` (siehe Liste oben – `navItems`/`parentDepartment`
  aus dem `BaseNav`-Aufruf entfernen)
- `CLAUDE.md` (TopNav-IA dokumentieren)

**Nicht geändert:**
- Abteilungs-Übersichtsseiten `page.tsx` (Fitness/Gesundheitssport/Kinderturnen behalten ihre
  bestehende `navItems`-Prop mit Kurslinks unverändert — Overflow-Gruppierung passiert in
  `BaseNav`, nicht auf Page-Ebene)
- Mannschaftssport-/Vereinsseiten (keine Prop-Änderungen nötig)

## Verhältnis zu S-013

S-013 (Status: `review`) wird durch diese Story funktional überholt — die dort gebaute
Zwei-Dropdown-Lösung wird in AC-4 vollständig entfernt statt weiter gepatcht. S-013 wird auf
`superseded` gesetzt, sobald S-014 in Arbeit geht.
