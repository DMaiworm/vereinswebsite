# Backlog – SG Hünstetten Vereinswebsite

| ID | Titel | Status | Bereich |
|----|-------|--------|---------|
| [S-001](S-001-design-theme-konsolidierung.md) | Design-Theme-Konsolidierung: designBlau.ts & designHell.ts | done | lib/, Layouts |
| [S-002](S-002-hell-design-komponenten-baukasten.md) | Hell-Design Komponenten-Baukasten (StatsBar, TeamRow, Hero, CTA, InfoBox) | done | components/shared/sections/ |
| [S-003](S-003-ballsport-komponenten-audit.md) | Ballsport Komponenten-Audit: Tischtennis & Fußball | done | app/(dept)/tischtennis/, app/(dept)/fussball/, components/fussball/, components/tischtennis/ |
| [S-004](S-004-kurs-unterseiten-baukasten.md) | Kurs-Unterseiten Komponenten-Baukasten (KursHero, InfoGrid, Trainer, CTA, Bento, Konzept) | done | components/shared/sections/, 11× app/ |
| [S-005](S-005-kinderturnen.md) | Kinderturnen: Abteilungsseite + 4 Kurs-Unterseiten (Früh übt sich I+II, Kids in Bewegung, Grundschulturnen) | done | app/kinderturnen/, 4× app/, components/kinderturnen/ |
| [S-006](S-006-vereinsseiten-konsistenz.md) | Vereinsseiten Design-Konsistenz: CSS-Klassen, Imports und Nav-Links auf allen 5 Vereinsseiten vereinheitlichen | done | app/impressum/, app/vorstand/, app/mitgliedschaft/, app/geschichte/, app/sponsoren/, lib/ |
| [S-007](S-007-tailwind-v4-migration.md) | Tailwind-v4-Migration: CDN-Boilerplate aus allen 25 Layouts entfernen, lib/design*.ts löschen | done | 25× app/*/layout.tsx, app/globals.css, app/layout.tsx, lib/ |
| [S-008](S-008-css-vereinfachung.md) | CSS-Vereinfachung: Font-Alias-Collapse + Route Group `(dept)` für zentrales Hell-Thema | done | app/globals.css, app/(dept)/, 24× layout.tsx |
| [S-009](S-009-abteilungen-bereich-klubhaus.md) | Abteilungen-Bereich in der Klubhaus-App: CRUD für Abteilung, Teams & Trainer mit RLS | ready | Klubhaus-App, Supabase Auth, RLS |
| [S-010](S-010-db-schema-audit-erweiterung.md) | DB-Schema-Audit & Erweiterung: fehlende Verein/Team/Trainer-Felder in Supabase + api.ts | ready | Supabase DB, Edge Functions, lib/api.ts |
