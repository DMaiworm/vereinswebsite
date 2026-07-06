# WebAPI-Guide: Öffentliche `public-*` API (v1) — Integrations-Handbuch für externe Vereine

> **Spec-/Integrations-Dokument** · Stand: 2026-07-06 (S-493: Getting-Started, Datenmodell, vollständige Feld-Referenz
> mit Live-Beispielen, Seiten-Rezepte, TS-Typen + OpenAPI, Glossar, Changelog) · Gehört zu
> `docs/spec/website-publishing.md`.
>
> **Zweck:** Eigenständiges Handbuch, mit dem **ein Web-Entwickler eines anderen Vereins ohne KlubHaus-Vorwissen**
> das Datenmodell versteht und eine Vereinswebsite anbindet — **ohne** Zugriff auf den KlubHaus-Quellcode oder die
> Referenz-Website. Verbindlicher Vertrag für alle `public-*` Edge Functions.
>
> **Maschinenlesbar (S-493):** Typisierter Contract in [`docs/api/public-api.types.ts`](../api/public-api.types.ts)
> (TypeScript, für Next.js/Node) **und** [`docs/api/openapi.yaml`](../api/openapi.yaml) (OpenAPI 3.1, sprach­unabhängig,
> Codegen). **Pflegeregel:** Ändert sich der Contract, ändern sich Guide **und** beide `docs/api/`-Artefakte im selben Commit.

---

## Inhalt

- **0. Getting Started / Onboarding** — Voraussetzungen, Schlüssel, Smoke-Test
- 1. Grundprinzipien
- 2. Basis, Auth & Mandanten (eine Instanz für alle Vereine)
- 3. Identifier-Strategie
- 4. Envelope · 5. Pagination · 6. Caching · 7. Modul-Gating · 8. Datenschutz/Consent · 9. Fehler-Codes
- **10. Datenmodell** — Diagramm + „Inhalt · Quell-Modul · gepflegt von · Endpoint"
- **11. Endpoint- & Feld-Referenz** — vollständige Shapes + Live-Beispiel je Endpoint
- **12. Seiten-Rezepte** — Call-Reihenfolge je Website-Seite
- **13. Glossar** — deutsche Domänenbegriffe
- 14. Maschinenlesbarer Contract (TS-Typen + OpenAPI)
- **15. Versionierung & Changelog**
- 16. Umsetzungs-Bezug (Stories)

---

## 0. Getting Started / Onboarding

Eine Vereinswebsite spricht **ausschließlich** die `public-*`-Endpunkte an (read-only, öffentlich). Bevor der erste
Call gelingt, muss die KlubHaus-Seite eingerichtet sein.

### 0.1 Voraussetzungs-Checkliste

| ✓ | Voraussetzung | Wer / Woher |
|---|---|---|
| ☐ | **Verein in KlubHaus angelegt** und ein **`slug`** vergeben (z.B. `sg-huenstetten`) | KlubHaus-**Operator** legt den Verein an; der `slug` steht in den Vereins-Stammdaten. |
| ☐ | Modul **`website`** ist für den Verein **aktiv** | Operator (Modul-Verwaltung je Verein). Ohne `website` liefert **jeder** Content-Endpunkt `module_disabled`. |
| ☐ | Benötigte **Quellmodule** aktiv: `trainer` (Trainer/Trainingszeiten/Spiele), `booking` (Trainingszeiten aus Buchungen), `sponsoren` (Sponsorenliste) | Operator. Ist ein Quellmodul aus, fehlen die zugehörigen Felder/Listen (s. §7). |
| ☐ | **`SUPABASE_ANON_KEY`** (öffentlicher Gateway-Key) vorhanden | Operator gibt den Anon-Key heraus. Er ist **nicht** geheim (rein öffentlich), aber Supabase-Gateway-Pflicht. |
| ☐ | Inhalte **veröffentlicht** (`ist_oeffentlich`, Publish-Fenster) und ggf. **Consent** gesetzt | Redaktion/Trainer in KlubHaus. „Nicht veröffentlicht" ⇒ Ressource fehlt (siehe §8/§10). |
| ☐ | Nur falls die Website **Event-Anmeldungen (RSVP)** anbietet: **Turnstile-Sitekey** | Operator hinterlegt serverseitig `TURNSTILE_SECRET`; du bekommst den **Sitekey** fürs Frontend-Widget. |
| ☐ | Nur falls die Website eine **Redaktions-Vorschau** rendert: `website_base_url` gepflegt | Operator/Redaktion (je Verein in KlubHaus). Steuert, wohin der „Vorschau"-Button zeigt (s. §8, §12.9). |

> **Kurz:** Du brauchst vom Operator genau **drei** Dinge — den **`slug`**, den **`ANON_KEY`** und (nur bei RSVP) den
> **Turnstile-Sitekey**. Alles andere ist Redaktions-Pflege in KlubHaus.

### 0.2 Zwei Umgebungsvariablen genügen

```env
NEXT_PUBLIC_API_BASE=https://zqjheewhgrmcwzjurjlg.supabase.co/functions/v1
NEXT_PUBLIC_CLUB_SLUG=sg-huenstetten
# nicht öffentlich benannt, aber nicht geheim — Supabase-Gateway-Pflicht:
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

Kein Service-Role-Key im Frontend — die Functions nutzen ihn **intern**.

### 0.3 Smoke-Test in 3 Schritten

**Schritt 1 — Call absetzen** (der Bootstrap-Endpunkt zuerst):

```bash
curl -s \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  "$NEXT_PUBLIC_API_BASE/public-config?club=$NEXT_PUBLIC_CLUB_SLUG"
```

**Schritt 2 — erwartete Antwort** (gekürzt; Envelope + Branding + Abteilungen + Startseiten-Sektionen):

```json
{
  "data": {
    "clubId": "20000000-0000-0000-0000-000000000001",
    "slug": "sg-huenstetten",
    "name": "SG Hünstetten",
    "shortName": "SGH",
    "colors": { "primary": "#003399", "secondary": "#FFD700" },
    "departments": [ { "id": "d0ad41ec-…", "name": "Tischtennis", "icon": "🏓", "…": "…" } ],
    "sections": [ { "typ": "hero", "sortOrder": 0, "config": {} } ]
  },
  "meta": null,
  "error": null
}
```

**Schritt 3 — typische Fehlerbilder** (Diagnose):

| Antwort | Ursache | Fix |
|---|---|---|
| `401`/Gateway-Fehler, kein Envelope | `apikey`-Header fehlt/falsch | Anon-Key vom Operator in den `apikey`-Header setzen. |
| `{ "error": { "code": "not_found", "message": "Club not found" } }` (404) | `slug` unbekannt/vertippt | `slug` beim Operator verifizieren. |
| `{ "error": { "code": "module_disabled", … } }` (404) | Modul `website` inaktiv | Operator aktiviert das `website`-Modul für den Verein. |
| `200`, aber `departments: []` / leere Listen | Inhalte nicht angelegt/nicht veröffentlicht | Redaktion pflegt Inhalte + setzt `ist_oeffentlich`. |
| `{ "error": { "code": "bad_request", … } }` (400) | Pflicht-Parameter (`club`) fehlt | `?club=<slug>` anhängen. |

Läuft `public-config`, funktioniert die Anbindung — alle weiteren Endpunkte folgen demselben Muster (§11).

---

## 1. Grundprinzipien

1. **Read-only & öffentlich:** Nur `GET` (Ausnahme: `POST` bei `public-event-rsvp` + `public-track-view`),
   `verify_jwt: false`, CORS `*`. Keine sonstigen Mutationen über `public-*`.
2. **Slug-zentriert:** Eine Website kennt **einen** Verein über seinen `slug`. Alle vereinsweiten Endpunkte nehmen
   `?club=<slug>`. Sub-Ressourcen über ihre **`id`** (aus vorherigen Antworten). **Kein** `operator_id`/`club_id`/
   `team_id`-Mischmasch im Contract.
3. **Ein Envelope für alles:** Jede JSON-Antwort ist `{ data, meta, error }` (s. §4). Einzige Ausnahme:
   `public-track-view` (s. §11).
4. **Ein Casing:** **camelCase** in allen JSON-Feldern. Storage-URLs sind absolute, fertige URLs (Feldnamen enden auf `Url`).
5. **Cachebar:** Jede Antwort trägt `Cache-Control` + `ETag` (s. §6).
6. **Modul-bewusst:** Inaktive Module liefern keinen Content (s. §7) — „Modul aus ⇒ kein Output".
7. **Datensparsam:** PII (E-Mail/Telefon) nur mit explizitem Consent-Flag (s. §8).
8. **Redaktions-Textfelder = Markdown (S-407):** Längere redaktionelle Felder sind **Markdown**-Strings (nicht HTML).
   Betroffen: News-`body`, Abteilung-`langbeschreibung`/`description`, Team-`description`, Homepage-`aboutText`/`aboutText2`.
   Plain-Text ohne Markup ist gültiges Markdown (abwärtskompatibel). **Consumer-Pflicht:** Markdown → HTML rendern und
   **sanitisieren** (Allowlist: `p/br/strong/em/h2-h4/ul/ol/li/a/img/blockquote/code/pre/hr`; nur `http/https/mailto`).
   Referenz-Implementierung im KlubHaus-Repo: `src/utils/markdown.ts` (`renderMarkdown` = marked + DOMPurify). Kurze
   Felder (Tagline, Motto, USP-Texte, Stats) bleiben Plain-Text.

---

## 2. Basis, Auth & Mandanten

```
BASE = https://zqjheewhgrmcwzjurjlg.supabase.co/functions/v1
GET {BASE}/public-<resource>?<params>
Header: apikey: <SUPABASE_ANON_KEY>     (Supabase-Gateway-Pflicht; KEINE User-Auth)
```

**Eine Instanz für alle Vereine (AC-8):** Es gibt **eine** gemeinsame KlubHaus-Instanz (`BASE` oben) und **einen**
gemeinsamen `ANON_KEY`. Die **Mandanten-Trennung läuft ausschließlich über den `slug`** (`?club=<slug>`) — serverseitig
löst die Function `slug → club_id → operator_id` auf und liefert **nur** die Daten dieses einen Vereins (club-scoped).
Ein zweiter Verein bekommt **keine** eigene URL/Datenbank, sondern einen anderen `slug`. Die Website setzt daher nur
`NEXT_PUBLIC_CLUB_SLUG` und `NEXT_PUBLIC_API_BASE`.

---

## 3. Identifier-Strategie

| Ebene | Parameter | Beispiel |
|---|---|---|
| Verein | `club` (slug) | `?club=sg-huenstetten` |
| Abteilung | `id` bzw. Filter `department` | `?id=<deptId|slug>` / `?club=…&department=<deptId>` |
| Mannschaft | `id` bzw. Filter `team` | `?id=<teamId|slug>` / `?club=…&team=<teamId>` |
| Person (Trainer) | `id` | `?id=<trainerId>` (UUID) |

`?id=` bei **Team, Abteilung, News** akzeptiert **UUID oder sprechenden Slug** (S-412); `public-trainer` nur UUID. Die
`id`s/Slugs liefert immer ein übergeordneter Aufruf (`public-config` → `departments[].id`; `public-abteilung` →
`mannschaften[].id`; `public-team`/`public-trainers` → `trainer[].id`; `public-sitemap` → alle Detail-Pfade). Der
Consumer muss **nie** selbst `club_id`/`operator_id` kennen.

---

## 4. Envelope

**Erfolg (Objekt):**
```json
{ "data": { /* Ressource */ }, "meta": null, "error": null }
```
**Erfolg (Liste, paginiert):**
```json
{ "data": [ /* … */ ], "meta": { "total": 42, "limit": 20, "offset": 0, "next": 20 }, "error": null }
```
**Fehler:**
```json
{ "data": null, "meta": null, "error": { "code": "not_found", "message": "Resource not found" } }
```

`meta.next` ist der `offset` der nächsten Seite oder `null` am Ende. Bei Objekt-Ressourcen ist `meta: null`. Bei 5xx
enthält `error` zusätzlich eine `correlationId` (serverseitig geloggt, für Support).

---

## 5. Pagination

- Listen-Endpunkte akzeptieren `?limit=` (Default **20**, Max **100**) und `?offset=` (Default 0).
- `meta.total` = Gesamtzahl (für „Seite x von y"); `meta.next` = nächster Offset oder `null`.

---

## 6. Caching

Jede Antwort:
```
Cache-Control: public, max-age=<m>, s-maxage=<s>, stale-while-revalidate=<swr>
ETag: "<hash>"
```
Bei passendem `If-None-Match` → `304 Not Modified` (leerer Body). Richtwerte:

| Datenklasse | Endpunkte | max-age | s-maxage | swr |
|---|---|---|---|---|
| **config** | config, home*, geschichte, vorstand, sitemap | 300 | 600 | 86400 |
| **entity** | team, abteilung, trainer(s), sponsors | 120 | 300 | 86400 |
| **news** | news, spiele, events, lostfound, home | 60 | 120 | 3600 |

> \* `public-home` nutzt die **news**-Klasse (kurzlebigste enthaltene Daten). Preview-Antworten und die POST-Endpunkte
> liefern `Cache-Control: no-store`.

**Bild-Transform (S-399):** Storage-Bilder sind absolute URLs. Für responsive `srcset` baut der Consumer optional
**Transform-URLs**: `…/storage/v1/render/image/public/<bucket>/<path>?width=<px>&quality=<q>`. Setzt aktivierte
Image-Transformation im Supabase-Projekt voraus; ohne sie die `…/object/public/…`-Originale verwenden.

---

## 7. Modul-Gating

- Ist das Modul **`website`** des Vereins inaktiv → **jeder** Content-Endpunkt antwortet `error.code: "module_disabled"`
  (HTTP 404) bzw. leere Liste. **Ausnahme:** `public-lostfound` hat **kein** `website`-Gate (eigenes Gating, s. §11).
- **Quellmodul-Gating:** Felder, die fachlich an ein anderes Modul gebunden sind, fehlen/leeren, wenn dessen Modul
  inaktiv ist: `trainingSlots` (Modul `booking`), Trainer-Felder/-Listen (Modul `trainer`), Sponsoren (Modul `sponsoren`),
  Spiele (Modul `trainer`).
- Operator-aggregierende Endpunkte gelten als aktiv, wenn das Modul für **mind. einen** Verein des Operators aktiv ist.

---

## 8. Datenschutz / Field-Level-Consent

- **Trainer:** `email`/`telefon` nur bei `kontaktVeroeffentlichen=true`; Profil erscheint nur bei
  `profilVeroeffentlichen=true` (sonst fehlt der Trainer ganz).
- **Vorstand/Funktionäre:** `email` nur bei `emailOeffentlich=true`.
- **Trainingsort/-zeit:** nur wenn das Team es freigibt (`trainingszeitenOeffentlich`).
- Interne Felder (IBAN, Dokumente, Notizen, Pipeline, Beträge) werden **nie** ausgegeben.
- **Redaktions-Vorschau (S-401):** Ein berechtigter Pfleger erzeugt in KlubHaus ein signiertes, 15-Min-Token.
  `public-team?id=…&preview=<token>`, `public-abteilung?id=…&preview=<token>` bzw. `public-news?id=…&preview=<token>`
  geben dann die **eine** im Token kodierte, noch unveröffentlichte Ressource aus — `Cache-Control: no-store`,
  `X-Robots-Tag: noindex`. Ungültig/abgelaufen/falscher Scope ⇒ normales Verhalten (`not_found`).
- **Editor-Render-Kopplung (S-411):** In KlubHaus ist je Verein `clubs.website_base_url` hinterlegt. Der
  „Website-Vorschau"-Button öffnet `<website_base_url>/<pfad>?preview=<token>`. **Vertrag an die Website:** den
  `?preview=`-Query an die zugehörige `public-*`-Detail-API durchreichen (`?id=<slug|uuid>&preview=<token>`); das Token
  ist an die **echte UUID** gebunden. Vorschau-Seiten **nicht** cachen/indexieren.

---

## 9. Fehler-Codes

| HTTP | `error.code` | Wann |
|---|---|---|
| 400 | `bad_request` | Pflicht-Parameter fehlt/ungültig (auch: RSVP-Consent fehlt, Captcha fehlt) |
| 404 | `not_found` | Ressource existiert nicht / nicht öffentlich |
| 404 | `module_disabled` | Quell-/Website-Modul inaktiv |
| 409 | `bad_request` | RSVP: keine freien Plätze mehr (Kapazität erschöpft) |
| 429 | `rate_limited` | Per-IP-Burst-Limit bzw. Event-Flood-Limit überschritten — kurz warten, erneut |
| 500 | `server_error` | interner Fehler — **generisch**, kein DB-Text; mit `correlationId` geloggt |

> **Abuse-Schutz (S-417/R5):** `public-*` haben einen leichten Per-IP-Burst-Schutz (best-effort je Edge-Instanz).
> **Primärschutz = Gateway/CDN.** Legitime ISR-Revalidierung liegt weit unter der Schwelle.

---

## 10. Datenmodell

Das öffentliche Datenmodell ist eine Baumstruktur **Verein → Abteilungen → Mannschaften → Trainer**, quer dazu liegen
News (auf 3 Ebenen), Events, Sponsoren, Vorstand/Funktionäre, Geschichte, Spiele und die Fundgrube.

```
                         ┌─────────────────────────── Verein (club, slug) ───────────────────────────┐
                         │   public-config · public-home                                             │
                         │                                                                            │
   quer zum Baum:        ├── Sponsoren        (public-sponsors)      Modul: sponsoren                 │
   (vereinsweit,         ├── Vorstand/Funkt.  (public-vorstand)      Consent: emailOeffentlich        │
    scope=verein)        ├── Geschichte       (public-geschichte)                                     │
                         ├── News verein      (public-news scope=verein)                              │
                         ├── Events verein    (public-events)  → RSVP (public-event-rsvp)             │
                         ├── Fundgrube        (public-lostfound)     eigenes Gating, kein website     │
                         └── Spiele           (public-spiele, +iCal) Modul: trainer                   │
                         │
        ┌────────────────┴───────────────────┐
        ▼                                     ▼
   Abteilung (department, slug)         News abteilung / Events abteilung
   public-abteilung                     (scope=abteilung, department=<id>)
        │  Leitung, Trainer[], Stats, USPs, Prävention
        ▼
   Mannschaft (team, slug)              News team / Events team
   public-team                          (scope=team, team=<id>)
        │  trainingSlots, ergebnisse, spielplan, galerie, links
        ▼
   Trainer (person)                     public-trainer (Einzel) · public-trainers (Liste)
        Consent: profilVeroeffentlichen (Opt-in) · kontaktVeroeffentlichen (E-Mail/Telefon)
```

### 10.1 „Inhalt · Quell-Modul · gepflegt von · Endpoint" (warum Inhalte fehlen können)

| Inhalt | Quell-Modul (muss aktiv sein) | Gepflegt von (in KlubHaus) | Endpoint | Fehlt, wenn … |
|---|---|---|---|---|
| Branding, Farben, Logo, Stats, Startseiten-Blöcke | `website` | Verein/Operator (Website-Tab) | `public-config` / `public-home` | `website` aus. |
| Abteilungs-Landingpage | `website` | Abteilungsleitung (Website-Editor) | `public-abteilung` | nicht `ist_oeffentlich`; `website` aus. |
| Mannschaftsprofil | `website` | Trainer/Team („Meine Teams") | `public-team` | nicht `ist_oeffentlich`; `website` aus. |
| Trainer-Profil, Lizenzen, Erfolge | `website` **+** `trainer` | Trainer (Self-Service) | `public-trainer(s)`, in Team/Abteilung eingebettet | `profilVeroeffentlichen=false`; `trainer` aus. |
| Trainer-Kontakt (E-Mail/Telefon) | `trainer` | Trainer (Consent-Toggle) | in Trainer-Shapes | `kontaktVeroeffentlichen=false`. |
| Trainingszeiten | `booking` (bzw. kuratiert) | Trainer/Team | `trainingSlots` in Team/Abteilung | Team-Opt-out; keine kuratierten Zeiten **und** `booking` aus. |
| News (3 Ebenen) | `website` | Redaktion je Ebene (`news.verein`/`news.abteilung`) | `public-news` | nicht `ist_oeffentlich`; außerhalb `sichtbarAb/bis`; `website` aus. |
| Events + RSVP | `website` | Redaktion (`/verein/events`) | `public-events`, `public-event-rsvp` | nicht `ist_oeffentlich`; außerhalb Publish-Fenster. |
| Sponsoren | `website` **+** `sponsoren` | Sponsoren-Verwaltung | `public-sponsors` | nicht `ist_oeffentlich`; `sponsoren` aus. |
| Vorstand/Funktionäre | `website` | Vereinsverwaltung (Personen/Funktionäre) | `public-vorstand` | nicht `is_public`/`is_active`. |
| Geschichte (Ären/Meilensteine) | `website` | Vereinsverwaltung | `public-geschichte` | keine Ären/Meilensteine gepflegt. |
| Spiele (Ergebnisse/Spielplan) | `website` **+** `trainer` | Import (fussball.de) / Team | `public-spiele` (+iCal) | nicht `ist_oeffentlich`; `trainer` aus. |
| Fundgrube | **kein** `website`-Gate | Fundsachen-Verwaltung | `public-lostfound` | nicht `status='aktiv'`/`ist_oeffentlich`. |
| View-Zähler | `website` | — (Website ruft auf) | `public-track-view` | — |

---

## 11. Endpoint- & Feld-Referenz

> Alle Antworten im Envelope (§4), camelCase. **Nullable/Optional-Semantik:** `T | null` = Feld **immer vorhanden**,
> kann `null` sein · `feld?` = Feld **kann fehlen** (modul-/consent-gated, im Kommentar erklärt). `*Url` = fertige,
> absolute URL oder `null`. Detail-Endpunkte liefern zusätzlich `og: { title, description, imageUrl }`.
> Jedes Beispiel ist **live** gegen `?club=sg-huenstetten` erhoben (PII geprüft: `email`/`telefon` sind `null`; die
> gezeigten Namen sind bereits öffentlich publizierte Funktionärs-/Trainerdaten). Lange Arrays sind mit
> `/* … gekürzt */` markiert.

### 11.1 `GET public-config?club=<slug>` — Bootstrap · Cache: config

```jsonc
{
  clubId, slug, name, shortName,
  colors: { primary, secondary },            // Fallback #003399/#FFD700
  logoUrl, logoWebUrl,                        // beide URL|null
  gruendungsjahr,                             // number|null
  social: { instagram, facebook },           // string|null
  homepage: { tagline, heroImageUrl, heroImageAlt, ctaLabel, aboutText, aboutText2 },  // aboutText* = Markdown
  stats: { mitglieder, kurseProWoche, lizenzierteTrainer },   // string|null (frei, z.B. "840+")
  departments: [ { id, name, icon, description, heroImageUrl, heroImageAlt } ],  // description = Markdown
  sections: [ { typ, sortOrder, config } ]   // geordnete, SICHTBARE Startseiten-Blöcke (§11.1.1)
}
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "clubId": "20000000-0000-0000-0000-000000000001", "slug": "sg-huenstetten",
  "name": "SG Hünstetten", "shortName": "SGH",
  "colors": { "primary": "#003399", "secondary": "#FFD700" },
  "logoUrl": null,
  "logoWebUrl": "https://…/storage/v1/object/public/vereins-logos/2000…/web-logo.png?t=1777558853618",
  "gruendungsjahr": 1947,
  "social": { "instagram": null, "facebook": null },
  "homepage": { "tagline": "SG Hünstetten 1947 e.V. …", "heroImageUrl": "https://…/homepage-hero.jpeg",
                "heroImageAlt": null, "ctaLabel": "Werde Teil der Gemeinschaft!", "aboutText": null, "aboutText2": null },
  "stats": { "mitglieder": "840+", "kurseProWoche": "35+", "lizenzierteTrainer": null },
  "departments": [ { "id": "d0ad41ec-…", "name": "Tischtennis", "icon": "🏓",
                     "description": "Tischtennis, ein Sport voller Energie …", "heroImageUrl": null, "heroImageAlt": null }
                   /* … 6 weitere gekürzt */ ],
  "sections": [ { "typ": "hero", "sortOrder": 0, "config": {} }, { "typ": "about", "sortOrder": 1, "config": {} },
                { "typ": "abteilungen", "sortOrder": 2, "config": {} }, { "typ": "news", "sortOrder": 3, "config": {} },
                { "typ": "sponsoren", "sortOrder": 4, "config": {} } ]
}, "meta": null, "error": null }
```

#### 11.1.1 `sections[].config`-Katalog (Startseiten-Komposition, S-414)

`sections` ist die **geordnete, sichtbare** Blockliste der Startseite. Die Website rendert je `typ` eine
Block-Komponente in `sortOrder`-Reihenfolge. `config` ist ein **flaches String-Objekt**; nur **nicht-leere** Felder
sind enthalten (leerer Block ⇒ `config: {}`, Block zieht seine Daten aus den passenden Endpunkten). Vollständiger
Katalog (jedes Feld ist ein `string`):

| `typ` | `config`-Felder | Datenquelle des Blocks |
|---|---|---|
| `hero` | `titleOverride`, `tagline`, `ctaLabel`, `ctaUrl` | `config.homepage.*` (Fallback) |
| `about` | `titleOverride`, `text` | `config.homepage.aboutText` (Fallback) |
| `cta` | `title`, `text`, `ctaLabel`, `ctaUrl` | nur `config` |
| `banner` | `text`, `imageUrl`, `ctaLabel`, `ctaUrl` | nur `config` |
| `abteilungen` | `titleOverride` | `config.departments` |
| `news` | `titleOverride` | `public-news`/`public-home.news` |
| `sponsoren` | `titleOverride` | `public-sponsors`/`public-home.sponsors` |
| `events` | `titleOverride` | `public-events` |
| `vorstand` | `titleOverride` | `public-vorstand`/`public-home.vorstandTeaser` |
| `geschichte` | `titleOverride` | `public-geschichte` |
| `spiele` | `titleOverride` | `public-spiele` |

### 11.2 `GET public-home?club=<slug>` — Startseiten-Aggregat · Cache: news

Ein Call statt n. `config` ist die **Kern-Config ohne `sections`**; `sections` steht daneben.

```jsonc
{
  config: { /* wie §11.1, aber OHNE sections */ },
  sections: [ { typ, sortOrder, config } ],
  news: [ /* NewsListItem, max 5, scope=verein — s. §11.4 */ ],
  sponsors: [ /* SponsorBase OHNE kategorie, max 30 — s. §11.9 */ ],
  vorstandTeaser: [ { id, name, bezeichnung, fotoUrl } ]  // max 6
}
```

**Live-Beispiel** (Top-Level gekürzt):
```json
{ "data": {
  "config": { "clubId": "2000…", "name": "SG Hünstetten", "…": "wie public-config, ohne sections" },
  "sections": [ { "typ": "hero", "sortOrder": 0, "config": {} } /* … */ ],
  "news": [ { "id": "6876a152-…", "slug": "starker-auftakt-in-die-ruckrunde", "title": "Starker Auftakt in die Rückrunde", "…": "…" } ],
  "sponsors": [ { "id": "b70a27e0-…", "firmenname": "AREHA - Athletik & Reha-Zentrum", "logoWebUrl": "https://…/web.png" } ],
  "vorstandTeaser": [ { "id": "68576eba-…", "name": "Daniel Maiworm", "bezeichnung": "1.Vorsitzender", "fotoUrl": "https://…/profil.webp" } ]
}, "meta": null, "error": null }
```

### 11.3 `GET public-news?club=<slug>[&scope=verein|abteilung|team][&department=][&team=][&limit&offset]` — Liste · Cache: news

Envelope-**Liste**. `scope`-Default `verein`; für `abteilung`/`team` ist `department`/`team` Pflicht. Zeitfenster
`sichtbarAb/bis` serverseitig angewandt.

```jsonc
data: [ {
  id, slug, title,
  body,                         // Markdown → sanitisieren
  imageUrl, imageAlt,           // Titelbild + Alt-Text (A11y/SEO)
  publishedAt,                  // ISO-Timestamp
  scope,                        // "verein" | "abteilung" | "team"
  context,                      // aufgelöster Verein-/Abteilungs-/Team-Name | null
  authorName                    // string | null
} ]  + meta-Pagination
```

**Live-Beispiel:**
```json
{ "data": [
  { "id": "6876a152-e5f3-45d8-b25b-d9fbcf03b600", "slug": "starker-auftakt-in-die-ruckrunde",
    "title": "Starker Auftakt in die Rückrunde", "body": "Die Mannschaften der SG Hünstetten sind stark …",
    "imageUrl": null, "imageAlt": null, "publishedAt": "2026-01-15T10:00:00+00:00",
    "scope": "verein", "context": "SG Hünstetten", "authorName": null }
  /* … */ ],
  "meta": { "total": 3, "limit": 2, "offset": 0, "next": 2 }, "error": null }
```

### 11.4 `GET public-news?id=<newsId|slug>[&preview=<token>]` — Detail · Cache: news

`?id=` akzeptiert **UUID oder Slug**. Wie ein Listen-Item **plus** `og`. `?preview=<token>` (15 Min) zeigt zusätzlich
**Unveröffentlichtes** (`no-store`, `noindex`). Die Listen-Karten verlinken auf `slug`.

```jsonc
{ id, slug, title, body /* Markdown */, imageUrl, imageAlt, publishedAt, scope, context, authorName,
  og: { title, description, imageUrl } }   // og: Override > abgeleitet (description = body-Auszug)
```

**Live-Beispiel:**
```json
{ "data": {
  "id": "6876a152-…", "slug": "starker-auftakt-in-die-ruckrunde", "title": "Starker Auftakt in die Rückrunde",
  "body": "Die Mannschaften der SG Hünstetten sind stark in die Rückrunde gestartet.",
  "imageUrl": null, "imageAlt": null, "publishedAt": "2026-01-15T10:00:00+00:00",
  "scope": "verein", "context": "SG Hünstetten", "authorName": null,
  "og": { "title": "Starker Auftakt in die Rückrunde", "description": "Die Mannschaften der SG Hünstetten …", "imageUrl": null }
}, "meta": null, "error": null }
```

### 11.5 `GET public-team?id=<teamId|slug>[&preview=<token>]` — Mannschaftsprofil · Cache: entity

```jsonc
{
  id, slug, name, shortName, color, liga,
  photoUrl, photoAlt, motto,
  description,                   // Markdown
  warumWir, zielgruppe, alterVon, alterBis,   // zielgruppe: string|null; alter*: number|null
  trainer: [ { id, vorname, nachname, email, telefon, bio, fotoUrl, isPrimary } ],
    //  email/telefon consent-gated (null ohne Consent); leer, wenn trainer-Modul aus
  trainingSlots: [ { wochentag, wochentagNr, startTime, endTime, ort } ],  // wochentagNr 0=So..6=Sa
  ergebnisse: [ { datum, gegner, toreHeimisch, toreGegner, istHeimspiel, wettbewerb } ],  // max 5; tore*=null bis Ergebnis
  spielplan:  [ { datum, uhrzeit, gegner, istHeimspiel, wettbewerb, ort } ],               // max 5, kommend
  galerie:    [ { titel, fotoUrl, fotoAlt, aufnahmeDatum, testimonialText, testimonialAutor } ],  // max 20
  links:      [ { name, url } ],
  og: { title, description, imageUrl }
}
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "id": "6d2244d9-…", "slug": "1-mannschaft", "name": "1. Mannschaft", "shortName": "SGH-Erste",
  "color": "#0056d6", "liga": null, "photoUrl": null, "photoAlt": null, "motto": null,
  "description": null, "warumWir": null, "zielgruppe": null, "alterVon": null, "alterBis": null,
  "trainer": [], "trainingSlots": [],
  "ergebnisse": [ { "datum": "2026-07-05", "gegner": "SpVgg Igstadt II", "toreHeimisch": null,
                    "toreGegner": null, "istHeimspiel": true, "wettbewerb": null } /* … */ ],
  "spielplan": [ { "datum": "2026-07-10", "uhrzeit": "20:00:00", "gegner": "SG Sossenheim",
                   "istHeimspiel": true, "wettbewerb": "Kreisfreundschaftsspiele", "ort": null } /* … */ ],
  "galerie": [], "links": [],
  "og": { "title": "1. Mannschaft", "description": null, "imageUrl": null }
}, "meta": null, "error": null }
```

### 11.6 `GET public-abteilung?id=<deptId|slug>[&preview=<token>]` — Abteilungs-Landingpage · Cache: entity

Reichere Landingpage-Felder (Tagline, Langbeschreibung, Hero-CTAs, Stats, USPs, Prävention). Leere Kacheln/USPs/
Vorteile sind serverseitig gefiltert.

```jsonc
{
  id, slug, name, icon,
  description,                   // Markdown (Langbeschreibung > Teaser)
  tagline,
  langbeschreibung,             // Markdown | null
  heroCta: { primaer, sekundaer },
  stats: [ { wert, label } ],
  usps:  [ { titel, text } ],
  praevention: { text, vorteile: [ ... ] } | null,
  heroImageUrl, heroImageAlt,
  leitung: { id, vorname, nachname, email, fotoUrl } | null,   // email consent-gated; null wenn keine/trainer aus
  trainer: [ { id, vorname, nachname, bio, fotoUrl, lizenzen: [ ...Bezeichnung ], teams: [ ...Name ] } ],
  mannschaften: [ {
    id, name, shortName, color, liga, photoUrl, photoAlt,
    trainer: [ { id, vorname, nachname, bio, fotoUrl, lizenzen: [ ... ], isPrimary } ],
    trainingSlots: [ { wochentag, wochentagNr, startTime, endTime, ort } ]
  } ],
  og: { title, description, imageUrl }
}
```

**Live-Beispiel** (gekürzt, Abteilung „Gesundheitssport"):
```json
{ "data": {
  "id": "86f116c6-…", "slug": "gesundheitssport", "name": "Gesundheitssport", "icon": null,
  "description": "Gesundheitssport bei SG Hünstetten ist weit mehr als nur Training. …",
  "tagline": "Balance für Körper & Geist",
  "langbeschreibung": "Gesundheitssport bei SG Hünstetten ist weit mehr als nur Training. …",
  "heroCta": { "primaer": "Jetzt Kurs buchen", "sekundaer": "Mehr erfahren" },
  "stats": [ { "wert": "", "label": "Kurse pro Woche" } /* … */ ],
  "usps": [ { "titel": "", "text": "Alle Altersgruppen – von dynamischen Übungen bis zur Sturzprophylaxe" } /* … */ ],
  "praevention": { "text": "Unser Angebot … muskuläre Dysbalancen …",
                   "vorteile": [ "Zertifizierte Präventionskurse", "Individuelle Betreuung in Kleingruppen", "Krankenkassen-Bezuschussung möglich" ] },
  "heroImageUrl": null, "heroImageAlt": null, "leitung": null, "trainer": [],
  "mannschaften": [ { "id": "cd977d89-…", "name": "Achtsamkeit & Entspannung", "shortName": "Achtsamkeit",
                      "color": "#3b82f6", "liga": null, "photoUrl": null, "photoAlt": null,
                      "trainer": [], "trainingSlots": [] } /* … */ ],
  "og": { "title": "Gesundheitssport", "description": "Gesundheitssport bei SG Hünstetten …", "imageUrl": null }
}, "meta": null, "error": null }
```

### 11.7 `GET public-trainer?id=<trainerId>` — Einzelprofil · Cache: entity

Nur bei `profilVeroeffentlichen=true` und aktivem `trainer`-Modul; sonst `not_found`/`module_disabled`.

```jsonc
{
  id, vorname, nachname,
  email, telefon,               // consent-gated (null ohne kontaktVeroeffentlichen)
  bio, fotoUrl,
  lizenzen:     [ { bezeichnung, ausstellendeOrg, ausstellungsdatum, ablaufdatum } ],
  erfolge:      [ { jahr, mannschaft, titel } ],
  mannschaften: [ { teamId, teamName, isPrimary } ],
  og: { title, description, imageUrl }
}
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "id": "79f7f4e7-…", "vorname": "Norman", "nachname": "Eby", "email": null, "telefon": null,
  "bio": "Wer sich verbessern will, kann von Norman Eby, ehemaligem Bundesliga-Spieler …",
  "fotoUrl": "https://www.sg-huenstetten.de/wp-content/uploads/2020/03/…Norman-Eby-450x675.jpg",
  "lizenzen": [], "erfolge": [],
  "mannschaften": [ { "teamId": "d5ba7e63-…", "teamName": "Badminton - Erwachsene", "isPrimary": true } ],
  "og": { "title": "Norman Eby", "description": "Wer sich verbessern will …", "imageUrl": "https://…Norman-Eby-450x675.jpg" }
}, "meta": null, "error": null }
```

### 11.8 `GET public-trainers?club=<slug>[&department=][&limit&offset]` — Trainer-Liste · Cache: entity

Envelope-**Liste**. Items **ohne** `og` (sonst wie §11.7). Club-genau über die Assignment-Kette (kein Fremd-Vereins-Bleed).

```jsonc
data: [ { id, vorname, nachname, email, telefon, bio, fotoUrl, lizenzen:[…], erfolge:[…], mannschaften:[…] } ] + meta
```

### 11.9 `GET public-sponsors?club=<slug>[&limit&offset]` — Sponsoren · Cache: entity

Envelope-**Liste**. Module `website` **+** `sponsoren`.

```jsonc
data: [ { id, firmenname, logoWebUrl, logoDruckUrl, logoAlt, websiteUrl,
          kategorie } ] + meta
//  kategorie = Tier ∈ "gold"|"silber"|"bronze"|"partner"|"keine"  ("keine"/fehlend ⇒ kein Tier)
```

**Live-Beispiel** (gekürzt):
```json
{ "data": [
  { "id": "fed7b1d3-…", "firmenname": "Biogrund", "logoWebUrl": "https://…/web.png", "logoDruckUrl": null,
    "logoAlt": null, "websiteUrl": null, "kategorie": "gold" },
  { "id": "b70a27e0-…", "firmenname": "AREHA - Athletik & Reha-Zentrum", "logoWebUrl": "https://…/web.png",
    "logoDruckUrl": null, "logoAlt": null, "websiteUrl": "https://areha.de", "kategorie": "silber" }
  /* … */ ],
  "meta": { "total": 9, "limit": 20, "offset": 0, "next": null }, "error": null }
```
> **Hinweis:** In `public-home.sponsors` fehlt `kategorie` (Basis-Shape ohne Tier).

### 11.10 `GET public-vorstand?club=<slug>` — Vorstand & Funktionäre · Cache: config

```jsonc
{
  vorstand:         [ { id, name, bezeichnung, gruppe, fotoUrl, email, abteilung } ],  // gruppe="vorstand"
  abteilungsleiter: [ { id, name, bezeichnung, gruppe, fotoUrl, email, abteilung } ]   // gruppe="abteilungsleitung"
}  // email consent-gated (emailOeffentlich); abteilung: Name | null
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "vorstand": [ { "id": "68576eba-…", "name": "Daniel Maiworm", "bezeichnung": "1.Vorsitzender",
                  "gruppe": "vorstand", "fotoUrl": "https://…/profil.webp", "email": null, "abteilung": null } /* … */ ],
  "abteilungsleiter": [ { "id": "428f9fb5-…", "name": "Norman Eby", "bezeichnung": "Badminton",
                          "gruppe": "abteilungsleitung", "fotoUrl": "https://…Norman-Eby-450x675.jpg",
                          "email": null, "abteilung": "Badminton" } /* … */ ]
}, "meta": null, "error": null }
```

### 11.11 `GET public-geschichte?club=<slug>` — Vereinsgeschichte · Cache: config

```jsonc
{
  aeren:    [ { id, titel, zeitraum, meilensteine: [ { id, jahr, titel, beschreibung, fotoUrl } ] } ],
  sonstige: [ { id, jahr, titel, beschreibung, fotoUrl } ]   // Meilensteine ohne Ära-Zuordnung
}
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "aeren": [ { "id": "5fd4ddbd-…", "titel": "Die Gründungsjahre", "zeitraum": "1947–1959",
               "meilensteine": [ { "id": "e6fa9003-…", "jahr": 1947, "titel": "Offizielle Gründung",
                                   "beschreibung": "Gründung der SG Görsroth unter US-Aufsicht. …", "fotoUrl": null } /* … */ ] } /* … */ ],
  "sonstige": []
}, "meta": null, "error": null }
```

### 11.12 `GET public-spiele?club=<slug>[&department=][&team=][&limit&offset][&format=ical]` · Cache: news

Envelope mit **Objekt-`data`** (zwei Listen) + Pagination-`meta`. `format=ical` → `text/calendar`-Feed (abonnierbar).

```jsonc
data: {
  ergebnisse: [ { id, teamId, teamName, datum, gegner, toreHeimisch, toreGegner, istHeimspiel, wettbewerb } ],
  spielplan:  [ { id, teamId, teamName, datum, uhrzeit, gegner, istHeimspiel, wettbewerb, ort } ]
}  + meta-Pagination
```

**Live-Beispiel** (gekürzt):
```json
{ "data": {
  "ergebnisse": [ { "id": "50eb97b7-…", "teamId": "6d2244d9-…", "teamName": "1. Mannschaft",
                    "datum": "2026-07-05", "gegner": "SpVgg Igstadt II", "toreHeimisch": null,
                    "toreGegner": null, "istHeimspiel": true, "wettbewerb": null } /* … */ ],
  "spielplan": [ /* … */ ]
}, "meta": { "total": 12, "limit": 3, "offset": 0, "next": 3 }, "error": null }
```

**iCal-Beispiel** (`&format=ical`, `Content-Type: text/calendar`):
```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KlubHaus//Spielplan//DE
X-WR-CALNAME:Spielplan
BEGIN:VEVENT
UID:spiel.9f872d94-…@klubhaus
DTSTART;TZID=Europe/Berlin:20260710T200000
DTEND;TZID=Europe/Berlin:20260710T220000
SUMMARY:1. Mannschaft – SG Sossenheim
DESCRIPTION:Kreisfreundschaftsspiele · Heimspiel
END:VEVENT
END:VCALENDAR
```

### 11.13 `GET public-events?club=<slug>[&scope=verein|abteilung|team][&department=][&team=][&limit&offset]` · Cache: news

Envelope-**Liste**. Kommende öffentliche Events (`datum >= heute`, `ist_oeffentlich`, im Publish-Fenster).

```jsonc
data: [ {
  id, scope, departmentId, teamId,        // scope="verein"|"abteilung"|"team"; *Id: uuid|null
  title, description, datum, uhrzeit, ort,
  anmeldungAktiv,                         // boolean
  maxTeilnehmer,                          // number|null
  angemeldet,                             // number (Summe bestätigter Anmeldungen)
  freiePlaetze                            // number|null (null = unbegrenzt)
} ] + meta
```

### 11.14 `POST public-event-rsvp` — Anmeldung (Schreiben) · no-store

```jsonc
// Request-Body:
{ eventId, name, email, anzahl?, consent: true, captchaToken? }
// Erfolg: { "data": { "ok": true }, "meta": null, "error": null }
```

- **`consent: true` ist Pflicht** (DSGVO; `consent_at` wird gespeichert).
- `anzahl` 1–20 (Default 1).
- `captchaToken` (Cloudflare Turnstile) **erforderlich, sobald serverseitig `TURNSTILE_SECRET` gesetzt** ist.
- Nur bei `ist_oeffentlich` + `anmeldungAktiv`. Schutz: E-Mail-Format, **atomare** Kapazität (`maxTeilnehmer`) +
  Eindeutigkeit (`UNIQUE(event, lower(email))`), Event-Flood-Limit (max. 10 Anmeldungen/Event in 60 s → `429`).
- **Enumeration entschärft:** Doppelanmeldung liefert dieselbe generische Bestätigung wie eine neue (kein Leak, keine
  erneute Mail). Kapazität erschöpft → HTTP **409** (`bad_request`, „Keine freien Plätze mehr").
- Sendet Bestätigungs-Mail (Text aus `email_templates`, `module_key='events'`/`event_key='rsvp_confirm'`).

### 11.15 `GET public-sitemap?club=<slug>` — SEO · Cache: config

```jsonc
{ urls: [ { loc, lastmod, changefreq } ] }
//  loc = RELATIVER Pfad ("/", "/abteilung/<slug>", "/mannschaft/<slug>", "/trainer/<uuid>", "/news/<slug>", …)
//  lastmod: YYYY-MM-DD | null   ·   Consumer stellt die eigene Domain voran
```

**Live-Beispiel** (gekürzt):
```json
{ "data": { "urls": [
  { "loc": "/", "lastmod": null, "changefreq": "weekly" },
  { "loc": "/geschichte", "lastmod": null, "changefreq": "yearly" },
  { "loc": "/abteilung/gesundheitssport", "lastmod": null, "changefreq": "monthly" },
  { "loc": "/mannschaft/1-mannschaft", "lastmod": null, "changefreq": "weekly" }
  /* … */ ] }, "meta": null, "error": null }
```

### 11.16 `GET public-lostfound?club=<slug>[&limit&offset]` — Fundgrube · Cache: news

Envelope-**Liste**. Gating: `status='aktiv'` ∧ `ist_oeffentlich` ∧ nicht gelöscht — **kein** `website`-Modul-Gate.

```jsonc
data: [ {
  id, beschreibung,
  kategorieName, fundortName,    // bereits AUFGELÖSTE Namen (string|null), KEINE IDs
  erfasstAm,                     // ISO-Timestamp
  fotoUrls                       // string[] SIGNIERTER, kurzlebiger URLs (TTL ~1 h, privater Bucket)
} ] + meta
```

- **`fotoUrls` = `string[]`** (Plural/Array, **nicht** `fotoUrl`), signiert & zeitlich begrenzt gültig. **Nicht
  cachen/persistieren** — bei jedem Render frisch aus der API beziehen. Leeres Array, wenn kein Foto.

**Live-Beispiel** (gekürzt):
```json
{ "data": [
  { "id": "f0000000-…", "beschreibung": "Blaue Regenjacke (Kindergröße 140), gefunden nach dem Training",
    "kategorieName": "Trikot / Sportbekleidung", "fundortName": "Dorfgemeinschaftshaus Görsroth",
    "erfasstAm": "2026-07-04T17:21:59.841499+00:00",
    "fotoUrls": [ "https://…/storage/v1/object/sign/fundsachen-fotos/…?token=eyJ…" ] }
  /* … */ ],
  "meta": { "total": 2, "limit": 20, "offset": 0, "next": null }, "error": null }
```

### 11.17 `POST public-track-view` — View-Zähler · **SONDERFALL: nicht enveloped**

```jsonc
// Request-Body:
{ entityType: "news" | "team" | "abteilung", entityId: "<uuid>" }
// Erfolg: { "ok": true }        (KEIN Envelope!)
// Fehler: { "error": "bad_request" | "not_found" | "server_error" }
```

Erhöht den **aggregierten** Zähler (`content_views`) um 1 — **keine** PII (keine IP/UA/Cookies). Die Website ruft dies
beim Aufruf einer Detailseite auf. `entityId` muss eine UUID sein (kein Slug).

---

## 12. Seiten-Rezepte

Je Website-Seite die Calls in Reihenfolge. `slug` = `NEXT_PUBLIC_CLUB_SLUG`.

### 12.1 Startseite `/`
```
1) GET public-home?club=<slug>     → config + sections + news(≤5) + sponsors + vorstandTeaser (1 Call)
2) sections[] in sortOrder rendern; je typ die Block-Komponente (§11.1.1). Leere config ⇒ Block zieht Daten aus (1).
3) POST public-track-view NICHT auf der Startseite (nur Detailseiten).
```
> Alternativ statt (1): `public-config` (nur Branding/Struktur) + separate Listen-Calls — aber `public-home` spart Round-Trips.

### 12.2 Abteilungsseite `/abteilung/[slug]`
```
1) GET public-abteilung?id=<slug>  → Landingpage (Hero, Stats, USPs, Prävention, Leitung, trainer[], mannschaften[])
2) Optional News der Abteilung:  GET public-news?club=<slug>&scope=abteilung&department=<deptId>
3) POST public-track-view { entityType:"abteilung", entityId:<deptUuid> }
```

### 12.3 Mannschaftsseite `/mannschaft/[slug]`
```
1) GET public-team?id=<slug>       → Profil, trainer[], trainingSlots[], ergebnisse[], spielplan[], galerie[], links[], og
2) POST public-track-view { entityType:"team", entityId:<teamUuid> }   // team.id aus (1)
```

### 12.4 Trainerseite `/trainer/[id]`
```
1) GET public-trainer?id=<uuid>    → Profil + lizenzen/erfolge/mannschaften + og
   (Liste vorher via GET public-trainers?club=<slug>[&department=])
```

### 12.5 News-Liste `/news` + Detail `/news/[slug]`
```
Liste:   GET public-news?club=<slug>[&scope=&department=&team=]&limit=20&offset=0   → Karten verlinken auf item.slug
Detail:  GET public-news?id=<slug>                                                  → body (Markdown → sanitisieren!) + og
         POST public-track-view { entityType:"news", entityId:<newsUuid> }
Paginierung: solange meta.next !== null, offset=meta.next nachladen.
```

### 12.6 Events-Liste + RSVP-Formular
```
Liste:   GET public-events?club=<slug>[&scope=&department=&team=]  → nur anmeldungAktiv + freiePlaetze!==0 als buchbar
Formular (nur wenn anmeldungAktiv):
  1) Turnstile-Widget einbinden (Sitekey vom Operator); Consent-Checkbox (Pflicht).
  2) POST public-event-rsvp { eventId, name, email, anzahl, consent:true, captchaToken }
  3) Fehlerbilder abfangen:
     - 400 bad_request "Einwilligung …"        → Consent-Checkbox erzwingen
     - 400 bad_request "Captcha …"             → Turnstile-Token fehlt/abgelaufen → Widget neu
     - 409 bad_request "Keine freien Plätze"   → als „ausgebucht" anzeigen
     - 429 rate_limited                        → „bitte kurz warten", Retry mit Backoff
     - 200 { ok:true }                         → Erfolgs-/Bestätigungshinweis (Mail folgt). Gilt AUCH bei Doppelanmeldung.
```
**Turnstile-Skizze (clientseitig):**
```html
<div class="cf-turnstile" data-sitekey="<SITEKEY_VOM_OPERATOR>"></div>
<!-- window.turnstile.getResponse() → captchaToken in den POST-Body -->
```

### 12.7 Sponsoren `/sponsoren` (Tier-Gruppierung)
```
1) GET public-sponsors?club=<slug>
2) Nach kategorie gruppieren: gold → silber → bronze → partner → (Rest "keine" = neutral, ohne Tier-Badge)
```

### 12.8 Fundgrube `/fundgrube`
```
1) GET public-lostfound?club=<slug>
2) fotoUrls sind SIGNIERT & kurzlebig (TTL ~1 h): NICHT in ISR/CDN cachen, NICHT in DB speichern.
   → Seite mit kurzer Revalidate (≤ TTL) oder client-seitig frisch laden.
```

### 12.9 Redaktions-Vorschau (Query-Durchreichung)
```
Der KlubHaus-Vorschau-Button öffnet:  <website_base_url>/<pfad>?preview=<token>
Die Website reicht ?preview an die passende Detail-API durch:
  /news/[slug]?preview=T       → GET public-news?id=<slug>&preview=T
  /mannschaft/[slug]?preview=T → GET public-team?id=<slug>&preview=T
  /abteilung/[slug]?preview=T  → GET public-abteilung?id=<slug>&preview=T
Regeln: KEIN Caching (API liefert no-store), <meta name="robots" content="noindex"> setzen.
```

### 12.10 Sitemap / SEO
```
1) GET public-sitemap?club=<slug>  → urls[] mit relativen Pfaden
2) Eigene Domain voranstellen, als /sitemap.xml serialisieren (loc, lastmod, changefreq).
3) Pro Detailseite og:{title,description,imageUrl} in <meta og:*> (kommt aus den Detail-Endpunkten).
```

### 12.11 Spiele `/spiele` + iCal-Abo
```
1) GET public-spiele?club=<slug>[&team=&department=]  → ergebnisse[] + spielplan[]
2) iCal-Abo-Button:  <BASE>/public-spiele?club=<slug>&format=ical   (webcal://-Variante für Kalender-Apps)
```

---

## 13. Glossar

| Begriff | Bedeutung |
|---|---|
| **Verein** (club) | Oberste Einheit; Website-Mandant, adressiert über `slug`. |
| **Abteilung** (department) | Sparte/Sportart innerhalb des Vereins (z.B. Badminton). Eigene Landingpage. |
| **Mannschaft** (team) | Konkretes Team/Kurs innerhalb einer Abteilung. |
| **Trainer / Übungsleiter** | Person mit Team-Zuordnung; öffentlich nur mit Opt-in (`profilVeroeffentlichen`). |
| **Funktionär** (Vorstand/Abteilungsleitung) | Person mit Vereinsrolle; `gruppe` ∈ `vorstand`/`abteilungsleitung`. |
| **Fundgrube** (Lost & Found) | Öffentliche Liste gefundener Gegenstände; Foto-URLs signiert & kurzlebig. |
| **Ära / Meilenstein** | Zeitabschnitt bzw. datiertes Ereignis der Vereinsgeschichte. |
| **Sektion / Block** (`sections[]`) | Startseiten-Baustein (`typ`) mit optionaler `config`; in `sortOrder` gerendert. |
| **Tier** (Sponsor `kategorie`) | Sponsoring-Stufe: `gold`/`silber`/`bronze`/`partner`/`keine`. |
| **Modul** | Aktivierbare Fachfunktion (`website`, `trainer`, `booking`, `sponsoren` …); steuert, ob Inhalt ausgeliefert wird. |
| **Consent** | Ausdrückliche Freigabe eines PII-Felds (E-Mail/Telefon) durch die Person. |
| **Preview-Token** | Signiertes 15-Min-Token; zeigt eine unveröffentlichte Ressource (`no-store`/`noindex`). |
| **Slug** | Sprechender URL-Bezeichner (Verein/Abteilung/Team/News); alternativ zur UUID nutzbar. |
| **Envelope** | Einheitlicher Antwort-Rahmen `{ data, meta, error }`. |

> **Gemischte DE/EN-Feldnamen:** Der Contract mischt bewusst deutsche Domänenbegriffe (`vorname`, `titel`,
> `mannschaften`, `beschreibung`, `firmenname`, `kategorie`, `datum`, `uhrzeit`, `ort`, `wettbewerb`) mit englischen
> generischen Namen (`id`, `name`, `slug`, `title`, `body`, `og`, `*Url`, `isPrimary`, `sortOrder`). Das ist Absicht
> und stabil — die Typen in `docs/api/public-api.types.ts` bilden es 1:1 ab.

---

## 14. Maschinenlesbarer Contract

| Artefakt | Zielgruppe | Datei |
|---|---|---|
| **TypeScript-Typen** | Next.js/Node-Consumer (copy-paste, keine Imports) | [`docs/api/public-api.types.ts`](../api/public-api.types.ts) |
| **OpenAPI 3.1** | sprachunabhängige Consumer, Codegen, Mock-Server | [`docs/api/openapi.yaml`](../api/openapi.yaml) |

Beide sind aus den Edge-Function-Mappern abgeleitet (nicht geraten). **Pflegeregel (verbindlich):** Ändert sich der
Contract, ändern sich Guide **und** beide Artefakte im **selben Commit**. OpenAPI wird per `npx @redocly/cli lint
docs/api/openapi.yaml` geprüft (0 Fehler/0 Warnungen).

---

## 15. Versionierung & Changelog

- **v1** ist die saubere Baseline (kein Legacy). Erweiterungen sind **additiv** (neue Felder/Endpunkte), keine stillen
  Bruch-Änderungen. Breaking → neuer Endpunkt-Suffix. Quelle der Feld-Semantik bleibt `docs/spec/website-publishing.md`;
  dieser Guide ist der **Contract**.

| Datum | Version | Änderung |
|---|---|---|
| 2026-06-21 | v1.0 | v1-Baseline live: Envelope, camelCase, `slug`/`id`, Pagination, ETag/304, Modul-Gating, Consent, alle `public-*`-Endpunkte (config/home/news/team/abteilung/trainer(s)/sponsors/vorstand/geschichte/spiele+iCal/sitemap/events+RSVP/lostfound/track-view). |
| 2026-07-06 | v1.1 | **S-492:** Sponsor-`kategorie` (Tier) additiv in `public-sponsors`; Lostfound `fotoUrls` = signierte URLs (privater Bucket). |
| 2026-07-06 | v1.1 | **S-493 (Doku, keine Verhaltensänderung):** Getting-Started, Datenmodell-Kapitel, vollständige Feld-Referenz inkl. `sections[].config`-Katalog, Live-Beispiele je Endpoint, Seiten-Rezepte, Glossar, TS-Typen + OpenAPI (`docs/api/`). |

---

## 16. Umsetzungs-Bezug (Stories)

| Thema | Story |
|---|---|
| Envelope + camelCase + Identifier `slug`/`id` + Pagination | **S-396** |
| `_shared`, Caching/ETag, Fehlerhygiene | S-393 |
| Modul-Gating | S-390 |
| Aggregat `public-home` | S-397 |
| Einzel-Trainer + News-Archiv/Detail | S-398 |
| SEO/Sitemap/OG + Bild-Transform | S-399 |
| iCal-Spiele | S-400 |
| Redaktions-Vorschau | S-401 |
| `_shared`-Tests + Doku | S-402 |
| Events/Veranstaltungen + RSVP-Härtung | S-403 / S-405 |
| Startseiten-Komposition (`sections`) | S-414 |
| Sponsor-Tier + Lostfound-Shape | S-492 |
| Externer-Vereins-Guide + TS-Typen + OpenAPI | **S-493** |
