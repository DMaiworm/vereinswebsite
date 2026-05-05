# S-010 – DB-Schema-Audit & Erweiterung: Verein, Team, Trainer

**Status:** ready  
**Erstellt:** 2026-05-05  
**Bereich:** Supabase DB (Tabellen + Edge Functions) · `lib/api.ts` · alle Abteilungsseiten

---

## Problem

Die bestehenden Supabase-Tabellen und Edge Functions (`public-abteilung`, `public-config`, `public-team`) liefern nur einen Bruchteil der Felder, die die Website tatsächlich benötigt. Der Großteil der Texte ist deshalb heute im Code hardcodiert.

Vor der Implementierung des Abteilungsleiter-Backends (S-009) und der Anbindung der Seiten an echte Daten muss das Schema vollständig und korrekt sein.

---

## Ist-Zustand (Analyse `lib/api.ts`)

### Was bereits existiert

**`Trainer`:** `id`, `vorname`, `nachname`, `email`, `telefon`, `bio`, `foto_url`, `is_primary`

**`AbteilungProfile`:** `id`, `name`, `icon`, `beschreibung`, `leitung`, `mannschaften[]`

**`Mannschaft` (in AbteilungProfile):** `id`, `name`, `short_name`, `color`, `liga`, `foto_url`, `motto`, `beschreibung`, `alter_von`, `alter_bis`, `trainer[]`, `galerie[]`, `training_slots[]`

**`TrainingSlot`:** `wochentag`, `wochentag_nr`, `start_time`, `end_time`, `resource`

**`ClubConfig`:** `name`, `short_name`, `primary_color`, `secondary_color`, `logo_url`, `logo_web_pfad`, `departments[]`

---

## Fehlende Felder (Gap-Analyse)

### A – Trainer (`P`-Scope)

| Feld | Typ | Verwendung auf Website |
|------|-----|----------------------|
| `rolle` | `text` | Rollenbezeichnung auf TrainerCard / StaffSection (z.B. „Head Coach", „Übungsleiterin") |
| `skills` | `text[]` | Skill-Chips auf TrainerCard (z.B. „Funktionsgymnastik", „Eltern-Kind-Turnen") |

### B – Abteilung (`D`-Scope)

Alle folgenden Felder kommen neu zur Tabelle `abteilungen` bzw. werden im Edge-Function-Response ergänzt.

| Feld | Typ | Verwendung |
|------|-----|-----------|
| `badge_text` | `text` | Hero-Badge (z.B. „SG Hünstetten", „Tradition seit 1944") |
| `hero_title` | `text` | AbteilungHero H1 |
| `hero_subtitle` | `text` | AbteilungHero Subtitel |
| `hero_cta_primary` | `text` | Primär-CTA-Label |
| `hero_cta_secondary` | `text` | Sekundär-CTA-Label |
| `stats_config` | `jsonb` | StatsBar: `[{value, label, accent}]` (max. 6) |
| `intro_heading` | `text` | „Was ist X?"-Heading |
| `intro_paragraphs` | `text[]` | „Was ist X?"-Absätze (2) |
| `feature_cards` | `jsonb` | `[{icon, title, text}]` (2 Karten) |
| `kursplan_intro` | `text` | Text unter „Aktueller Kursplan"-Heading |
| `infobox_title` | `text` | KursInfoBox-Titel |
| `infobox_text` | `text` | KursInfoBox-Beschreibung |
| `infobox_cta_label` | `text` | KursInfoBox-CTA-Label |
| `prevention_heading` | `text` | Prävention/Philosophie-Heading |
| `prevention_paragraphs` | `text[]` | Prävention-Absätze (1–2) |
| `prevention_items` | `text[]` | Checklist-Punkte (max. 5) |
| `prevention_link_label` | `text` | Link-Label unterhalb Checklist |
| `cta_title` | `text` | AbteilungCta-Titel |
| `cta_subtitle` | `text` | AbteilungCta-Subtitel |
| `cta_primary_label` | `text` | AbteilungCta-Primär-Button |
| `cta_secondary_label` | `text` | AbteilungCta-Sekundär-Button |
| `social_handles` | `jsonb` | `[{platform, handle}]` (max. 4) |
| `recruiting_headline` | `text` | „Trainer gesucht"-Headline |
| `recruiting_text` | `text` | Beschreibungstext Recruiting-Block |

### C – Mannschaft / Kurs (`T`-Scope)

| Feld | Typ | Verwendung |
|------|-----|-----------|
| `badge` | `text` | KursHero-Badge (z.B. „BLEIB IN BEWEGUNG") |
| `kurs_subtitle` | `text` | KursHero-Subtitel |
| `kurs_cta_primary` | `text` | KursHero Primär-CTA-Label |
| `kurs_cta_secondary` | `text` | KursHero Sekundär-CTA-Label |
| `mitzubringen` | `text` | KursInfoGrid – Was mitzubringen |
| `mitzubringen_icon` | `text` | Material-Symbol-Icon-Name (optional, Default: `backpack`) |
| `group_label` | `text` | Gruppen-Label bei geteilten Kursen (z.B. „Gruppe 1 (ab 3,5 Jahren)") |
| `target_group` | `text` | Zielgruppe-Label in Kursplan-Tabelle |
| `content_title` | `text` | ContentSplit-Zwischenheading |
| `content_paragraphs` | `text[]` | ContentSplit-Absätze (2) |
| `check_items` | `text[]` | ContentSplit-Checkpunkte (2–4) |
| `bento_config` | `jsonb` | `{title, featured: [{icon,title,desc}×2], small: [{icon,title,desc}×3]}` |
| `konzept_config` | `jsonb` | `{overlay_quote, paragraphs: [text×2], blockquote}` |
| `kurs_cta_title` | `text` | KursCtaSection-Titel |
| `kurs_cta_description` | `text` | KursCtaSection-Beschreibungstext |
| `foto_overlay_text` | `text` | Text-Overlay auf Teamfoto (z.B. „Kader Saison 2024/25") |

### D – ClubConfig (`A`-Scope, kleinere Ergänzungen)

| Feld | Typ | Verwendung |
|------|-----|-----------|
| `gruendungsjahr` | `integer` | Für Heritage-Badge-Berechnung (z.B. „80 Jahre") |
| `slogan` | `text` | Vereins-Slogan für Startseiten-Hero (optional) |

---

## Akzeptanzkriterien

**DB-Schema:**
- AC-1: Alle neuen Felder aus Gap-Analyse existieren als Spalten (oder JSONB-Felder) in den korrekten Tabellen in Supabase
- AC-2: JSONB-Felder haben ein JSON-Schema-Kommentar/Check, das die Struktur dokumentiert
- AC-3: Alle neuen Spalten sind `nullable` – kein bestehender Datensatz wird durch die Migration ungültig
- AC-4: Bestehende Datensätze (Badminton, Leichtathletik) sind nach der Migration unverändert abrufbar

**Edge Functions:**
- AC-5: `public-abteilung` liefert alle neuen `D`-Felder im Response
- AC-6: `public-abteilung` liefert für jede Mannschaft alle neuen `T`-Felder
- AC-7: `public-config` liefert `gruendungsjahr` und `slogan`
- AC-8: Trainer-Response (über `public-abteilung` und `public-trainers`) enthält `rolle` und `skills`

**TypeScript-Typen (`lib/api.ts`):**
- AC-9: `Trainer`-Interface um `rolle: string | null` und `skills: string[]` ergänzt
- AC-10: `AbteilungProfile`-Interface um alle neuen `D`-Felder ergänzt
- AC-11: Mannschafts-Inline-Typ in `AbteilungProfile` um alle neuen `T`-Felder ergänzt
- AC-12: `ClubConfig` um `gruendungsjahr` und `slogan` ergänzt
- AC-13: Neue JSONB-Strukturen haben eigene exportierte TypeScript-Interfaces (z.B. `BentoConfig`, `KonzeptConfig`, `StatItem`, `FeatureCard`, `SocialHandle`)

**Regressionssicherheit:**
- AC-14: `npm run build` läuft fehlerfrei durch (alle optionalen neuen Felder mit `| null` / `?` getyped)
- AC-15: Badminton- und Leichtathletik-Seiten zeigen weiterhin korrekt an (bestehende DB-Felder unverändert)

---

## Reihenfolge der Umsetzung

1. **Migration schreiben** – SQL-Migration für alle neuen Spalten (nullable, kein Breaking Change)
2. **Edge Functions aktualisieren** – neue Felder in SELECT und Response einbauen
3. **`lib/api.ts` anpassen** – Interfaces erweitern, neue JSONB-Typen anlegen
4. **`npm run build`** – TypeScript prüfen

---

## Betroffene Dateien

**Supabase (außerhalb des Website-Repos):**
- Migration: `supabase/migrations/YYYYMMDD_schema_erweiterung.sql`
- Edge Function: `supabase/functions/public-abteilung/index.ts`
- Edge Function: `supabase/functions/public-config/index.ts`
- Edge Function: `supabase/functions/public-trainers/index.ts`

**Im Website-Repo:**
- `lib/api.ts` – Interfaces erweitern

**Nicht anfassen:**
- Alle `app/` und `components/` Seiten – die nutzen neue Felder erst in S-011ff. (Content-Anbindung)

---

## Abhängigkeiten

- **Blockiert S-009**: Abteilungsleiter-Backend braucht die Felder, um sie editieren zu können
- **Blockiert S-011** (zukünftig): Anbindung der statischen Seiten an DB-Daten

---

## Out of Scope

- News/Galerie-Upload-Felder (eigene Story)
- Spielplan/Ergebnisse (existieren bereits)
- Vorstandsmitglieder-Tabelle (Vereinsadmin-Bereich, eigene Story)
- Sponsoren-Schema (existiert bereits)
