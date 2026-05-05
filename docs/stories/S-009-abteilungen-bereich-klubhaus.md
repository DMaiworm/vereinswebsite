# S-009 – Abteilungen-Bereich in der Klubhaus-App

**Status:** ready  
**Erstellt:** 2026-05-05  
**Bereich:** Klubhaus-App (Backend/Admin) · Supabase Auth · RLS Policies

---

## Problem

Testuser-Feedback hat gezeigt, dass Trainer nicht die nötige digitale Affinität haben, um Inhalte selbst zu pflegen. Die Aufgabe fällt an Abteilungsleiter. Die Klubhaus-App hat noch keinen Bereich, in dem ein Abteilungsleiter seine Abteilung, Teams/Kurse und Trainer selbstständig verwalten kann – und das rollenbasiert (jeder sieht und bearbeitet nur seine eigene Abteilung).

---

## Ziel

Ein eigenständiger „Abteilungen"-Bereich in der Klubhaus-App, über den ein Abteilungsleiter:

1. Die **Texte und Inhalte seiner Abteilungsseite** pflegt (Hero, Beschreibungen, Stats, CTAs)
2. Seine **Teams / Kurse** anlegt, bearbeitet und mit Trainingszeiten versieht
3. **Trainer** seiner Abteilung zuordnet und deren Profildaten pflegt
4. **Keine** Daten anderer Abteilungen sehen oder bearbeiten kann (Row-Level Security)

---

## Rollen & Zugriffsrechte

| Rolle | Kann sehen | Kann bearbeiten |
|-------|-----------|----------------|
| `vereinsadmin` | Alle Abteilungen | Alle Abteilungen |
| `abteilungsleiter` | Nur eigene Abteilung | Nur eigene Abteilung |
| `trainer` | Nur eigenes Profil | Nur eigenes Profil (separates Ticket) |

Die Zuordnung `abteilungsleiter → abteilung` wird in einer Verknüpfungstabelle `abteilung_leiter` gepflegt (user_id + abteilung_id). RLS-Policies auf `abteilungen`, `mannschaften`, `trainer` greifen darauf zurück.

---

## Funktionaler Scope

### Modul 1 – Abteilungs-Stammdaten (`D`-Felder)

Formular für die Abteilungsseite. Jedes Feld entspricht einem `D`-Label aus der Textelement-Analyse (S-009 Vorstufe).

| Feldgruppe | Felder | Komponente |
|-----------|--------|-----------|
| **Hero** | Badge-Text, H1 Zeile 1, H1 Zeile 2, Subtitel, Primär-CTA-Label, Sekundär-CTA-Label | Formular-Section |
| **Stats** | 4× (Wert + Label + Akzentfarbe) | Wiederholbare Zeilen |
| **Intro-Sektion** | Heading, Text (Absatz 1+2), Feature-Card 1 (Icon + Titel + Text), Feature-Card 2 | Formular-Section |
| **Kursplan** | Intro-Text, InfoBox-Titel, InfoBox-Text, InfoBox-CTA-Label | Formular-Section |
| **Prävention/Philosophie** | Heading, Text, 3× Checklist-Punkt, Link-Label | Formular-Section |
| **Abschluss-CTA** | Titel, Subtitel, Primär-Label, Sekundär-Label | Formular-Section |
| **Social / Recruiting** | 2× Social-Handle (Plattform + Name), Recruiting-Headline, Recruiting-Text | Formular-Section |

### Modul 2 – Teams & Kurse (`T`-Felder)

Liste aller Mannschaften/Kurse der Abteilung. Pro Eintrag ein Bearbeitungsformular:

| Feldgruppe | Felder |
|-----------|--------|
| **Basisdaten** | Name, Kurzname, Altersgruppe (von/bis), Liga, Farbe |
| **Kurs-Hero** | Badge-Text, Kurs-Subtitel, Primär-CTA-Label, Sekundär-CTA-Label |
| **KursInfoGrid** | Kurszeit (Freitext-Override), Ort, Mitzubringen, Gruppen-Label (optional) |
| **Beschreibung** | Content-Titel, Absatz 1, Absatz 2, Checkpunkt 1, Checkpunkt 2 |
| **Schwerpunkte** | Bento-Titel, 2× Featured (Icon + Titel + Text), 3× Small (Icon + Titel + Text) |
| **Konzept** | Overlay-Quote, Konzept-Absatz 1, Konzept-Absatz 2, Blockquote |
| **Kurs-CTA** | CTA-Titel, CTA-Beschreibung |
| **Team-Foto** | Foto-URL (Upload oder Link), Overlay-Text, Motto |
| **Trainingszeiten** | N× (Wochentag, Von, Bis, Raum/Ort) |

### Modul 3 – Trainer-Verwaltung (`P`-Felder)

Liste aller Trainer, die der Abteilung zugeordnet sind. Zuordnung zu Teams per Checkbox/Dropdown.

| Feld | Typ |
|------|-----|
| Vorname, Nachname | Text |
| Rolle / Rollenbezeichnung | Text (z.B. „Head Coach", „Übungsleiterin") |
| Bio | Textarea |
| Skills | Wiederholbare Tags (bis 6) |
| Foto | Upload |
| E-Mail, Telefon | Text (optional, sichtbar auf Website wenn befüllt) |
| is_primary | Checkbox (Haupttrainer des Teams) |
| Zuordnung zu Team(s) | Multi-Select |

---

## Akzeptanzkriterien

**Navigation & Auth:**
- AC-1: Ein eingeloggter `abteilungsleiter` sieht im Sidebar-Menü den Eintrag „Meine Abteilung"
- AC-2: Ein `vereinsadmin` sieht alle Abteilungen als Liste und kann jede öffnen
- AC-3: Ein `abteilungsleiter` kann keine andere Abteilung aufrufen (403 / Not Found)

**Modul 1 – Abteilungs-Stammdaten:**
- AC-4: Alle D-Felder sind als Formular editierbar und werden bei Speichern in die DB geschrieben
- AC-5: Hero-Badge, -Titel und -Subtitel sind Pflichtfelder (Validierung)
- AC-6: Stats-Zeilen können hinzugefügt und gelöscht werden (min. 1, max. 6)

**Modul 2 – Teams:**
- AC-7: Abteilungsleiter kann neue Teams/Kurse anlegen und bestehende bearbeiten
- AC-8: Alle T-Felder sind editierbar; nur Kurs-Hero, KursInfoGrid und Basisdaten sind Pflichtfelder
- AC-9: Trainingszeiten-Einträge können N-fach hinzugefügt / gelöscht werden
- AC-10: Trainer können einem Team aus der Abteilungs-Trainerliste zugeordnet werden

**Modul 3 – Trainer:**
- AC-11: Abteilungsleiter kann Trainer anlegen, bearbeiten und aus seiner Abteilung entfernen
- AC-12: Skills sind als Tag-Chips editierbar (Freitexteingabe + Enter)
- AC-13: Foto-Upload funktioniert (Supabase Storage, öffentliche URL landet in `foto_url`)

**RLS:**
- AC-14: RLS-Policy auf `abteilungen`: `abteilungsleiter` darf nur Rows lesen/schreiben, bei denen er in `abteilung_leiter` eingetragen ist
- AC-15: RLS-Policy auf `mannschaften` und `trainer`: analog über abteilung_id-Join

---

## Technische Notizen

### DB-Schema-Abhängigkeit
Diese Story **setzt S-010 voraus** (DB-Schema-Erweiterung). S-010 muss zuerst abgeschlossen sein, damit alle Felder in der DB existieren.

### Auth-Stack
- Supabase Auth mit JWT
- Custom Claim `role: 'abteilungsleiter' | 'vereinsadmin'` + `abteilung_ids: string[]` im JWT (via Auth Hook oder `app_metadata`)
- RLS-Policies lesen `auth.jwt() -> app_metadata -> abteilung_ids`

### Neue Tabelle: `abteilung_leiter`
```sql
create table abteilung_leiter (
  user_id  uuid references auth.users(id) on delete cascade,
  abteilung_id uuid references abteilungen(id) on delete cascade,
  primary key (user_id, abteilung_id)
);
```

### Felder als JSONB vs. eigene Spalten
- **Eigene Spalten** für häufig gefilterte Felder: `name`, `beschreibung`, `liga`, `alter_von`, `alter_bis`
- **JSONB** für strukturierte Blöcke, die nur auf der Website gerendert werden: `bento_schwerpunkte`, `konzept`, `hero_config`, `stats_config`, `cta_config`

### Keine Implementierung in dieser Story
- News-Verwaltung (separates CMS-Ticket)
- Galerie-Upload (separates Ticket)
- Spielplan / Ergebnisse (bereits anderer Bereich)

---

## Betroffene Bereiche (Klubhaus-App)

**Neu:**
- `src/pages/abteilung/` (oder entsprechender App-Router-Pfad)
- `src/components/abteilung/AbteilungForm.tsx`
- `src/components/abteilung/TeamList.tsx` + `TeamForm.tsx`
- `src/components/abteilung/TrainerList.tsx` + `TrainerForm.tsx`
- `src/lib/rls-policies.sql` (neue Policies)
- `src/lib/abteilung-leiter-table.sql` (neue Tabelle)

**Geändert:**
- Sidebar-Navigation (neuer Eintrag „Meine Abteilung")
- Auth-Middleware (Role-Check)

---

## Out of Scope

- News-Artikel verfassen
- Galerie-Bilder hochladen (eigene Story)
- Sponsoren verwalten (Vereinsadmin-Bereich)
- Shop-Produkte (eigene Story)
- Vorstandsmitglieder (Vereinsadmin-Bereich)
