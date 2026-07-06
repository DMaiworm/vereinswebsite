/**
 * public-api.types.ts — Typisierter Contract der öffentlichen KlubHaus-`public-*`-API (v1)
 * ============================================================================================
 *
 * Copy-paste-fähige TypeScript-Typen für die Anbindung einer Vereinswebsite an KlubHaus.
 * **Keine** KlubHaus-Imports nötig — diese Datei ist eigenständig und kann direkt in ein
 * Next.js-/React-/Node-Projekt kopiert werden.
 *
 * Quelle der Wahrheit: die Mapper in `supabase/functions/<name>/index.ts` + `_shared/loaders.ts`
 * + `_shared/trainers.ts`. Diese Typen sind daraus abgeleitet, **nicht** geraten.
 *
 * PFLEGEREGEL (verbindlich): Ändert sich der Contract (neues/geändertes Feld in einem
 * Edge-Function-Mapper), ändert sich **diese Datei im selben Commit** — ebenso `openapi.yaml`.
 *
 * Konventionen:
 * - Alle JSON-Felder sind **camelCase**.
 * - `T | null`  = Feld ist **immer vorhanden**, kann aber leer sein (`null`).
 * - `field?: T`  = Feld **kann fehlen** (nicht im Objekt) — i.d.R. modul-/consent-gated (s. Kommentar).
 * - Alle `*Url`-Felder sind fertige, absolute URLs (oder `null`).
 * - Redaktionelle Langtexte (`body`, `langbeschreibung`, `description` bei Team/Abteilung,
 *   `aboutText`) sind **Markdown** — Consumer muss sanitisiert nach HTML rendern.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. Envelope — jede JSON-Antwort (Ausnahme: public-track-view, s. unten)
// ─────────────────────────────────────────────────────────────────────────────

/** Fehlercodes der API (`error.code`). */
export type ApiErrorCode =
  | 'bad_request'      // 400 – Pflicht-Parameter fehlt/ungültig
  | 'not_found'        // 404 – Ressource existiert nicht / nicht öffentlich
  | 'module_disabled'  // 404 – Quell-/Website-Modul inaktiv
  | 'rate_limited'     // 429 – Per-IP-Burst-Limit überschritten
  | 'server_error';    // 500 – interner Fehler (generisch, mit correlationId)

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  /** Nur bei 5xx: serverseitig geloggte Korrelations-ID für den Support. */
  correlationId?: string;
}

/** Pagination-Meta bei Listen-Antworten. `next` = Offset der nächsten Seite oder `null` am Ende. */
export interface PageMeta {
  total: number;
  limit: number;
  offset: number;
  next: number | null;
}

/** Erfolg (Objekt-Ressource): `meta` immer `null`. */
export interface ApiObjectResponse<T> { data: T;   meta: null;     error: null; }
/** Erfolg (paginierte Liste). */
export interface ApiListResponse<T>   { data: T[]; meta: PageMeta;  error: null; }
/** Fehler: `data`/`meta` immer `null`. */
export interface ApiErrorResponse     { data: null; meta: null;     error: ApiError; }

/** Diskriminierte Union über den `error`-Zweig — praktisch fürs Consumer-Handling. */
export type ApiResponse<T> = ApiObjectResponse<T> | ApiListResponse<T> | ApiErrorResponse;

// ─────────────────────────────────────────────────────────────────────────────
// 2. Gemeinsame Bausteine
// ─────────────────────────────────────────────────────────────────────────────

/** Open-Graph-Block (Detail-Endpunkte) für `<meta og:*>`; Override > abgeleiteter Wert. */
export interface OpenGraph {
  title: string;
  description: string | null;
  imageUrl: string | null;
}

/** Ein Trainingszeit-Slot (kuratiert > aus Buchungen abgeleitet). `wochentagNr`: 0=So … 6=Sa. */
export interface TrainingSlot {
  wochentag: string;      // dt. Wochentagsname, z.B. "Montag"
  wochentagNr: number;    // 0–6 (JS getDay: 0=Sonntag)
  startTime: string;      // "HH:mm" bzw. "HH:mm:ss"
  endTime: string;
  ort: string;            // Ressourcen-/Ortsname; "Unbekannt" wenn unbekannt
}

/** Vergangenes Spielergebnis. `tore*` sind `null`, solange kein Ergebnis erfasst ist. */
export interface Spielergebnis {
  datum: string;                  // YYYY-MM-DD
  gegner: string;
  toreHeimisch: number | null;
  toreGegner: number | null;
  istHeimspiel: boolean;
  wettbewerb: string | null;
}

/** Kommendes Spiel (Spielplan). */
export interface Spiel {
  datum: string;                  // YYYY-MM-DD
  uhrzeit: string | null;         // "HH:mm[:ss]"
  gegner: string;
  istHeimspiel: boolean;
  wettbewerb: string | null;
  ort: string | null;
}

/** Galerie-Foto eines Teams. */
export interface GalerieFoto {
  titel: string | null;
  fotoUrl: string | null;
  fotoAlt: string | null;         // Alt-Text (A11y/SEO)
  aufnahmeDatum: string | null;   // YYYY-MM-DD
  testimonialText: string | null;
  testimonialAutor: string | null;
}

/** Externer Link eines Teams (Social, Sponsor, o.Ä.). */
export interface TeamLink { name: string; url: string; }

// ─────────────────────────────────────────────────────────────────────────────
// 3. public-config?club=<slug>  — Bootstrap (Cache: config-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/** Homepage-Blocktypen (Startseiten-Komposition). Die Website rendert je `typ` einen Block. */
export type HomepageSectionType =
  | 'hero' | 'about' | 'abteilungen' | 'news' | 'sponsoren'
  | 'events' | 'vorstand' | 'geschichte' | 'spiele' | 'cta' | 'banner';

/**
 * `config`-Shape je Blocktyp. **Alle Felder optional** (nur nicht-leer Gepflegtes ist enthalten)
 * und immer `string`. Leeres `config` = `{}` (Block rendert seine Defaults / eigene Datenquelle).
 * Quelle: `HomepageSectionsEditor.tsx` (SECTION_FIELDS, S-414).
 */
export interface HeroConfig    { titleOverride?: string; tagline?: string; ctaLabel?: string; ctaUrl?: string; }
export interface AboutConfig   { titleOverride?: string; text?: string; }
export interface CtaConfig     { title?: string; text?: string; ctaLabel?: string; ctaUrl?: string; }
export interface BannerConfig  { text?: string; imageUrl?: string; ctaLabel?: string; ctaUrl?: string; }
/** abteilungen | news | sponsoren | events | vorstand | geschichte | spiele: nur Titel-Override. */
export interface TitleOverrideConfig { titleOverride?: string; }

/** Diskriminierte Union: `config` hängt am `typ`. */
export type HomepageSection =
  | { typ: 'hero';        sortOrder: number; config: HeroConfig }
  | { typ: 'about';       sortOrder: number; config: AboutConfig }
  | { typ: 'cta';         sortOrder: number; config: CtaConfig }
  | { typ: 'banner';      sortOrder: number; config: BannerConfig }
  | { typ: 'abteilungen'; sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'news';        sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'sponsoren';   sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'events';      sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'vorstand';    sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'geschichte';  sortOrder: number; config: TitleOverrideConfig }
  | { typ: 'spiele';      sortOrder: number; config: TitleOverrideConfig };

export interface ClubColors { primary: string; secondary: string; }
export interface ClubSocial { instagram: string | null; facebook: string | null; }

export interface HomepageFields {
  tagline: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  ctaLabel: string | null;
  aboutText: string | null;   // Markdown
  aboutText2: string | null;  // Markdown
}

/** Frei pflegbare Kennzahlen (Strings, z.B. "840+"). */
export interface ClubStats {
  mitglieder: string | null;
  kurseProWoche: string | null;
  lizenzierteTrainer: string | null;
}

/** Abteilung im Config-/Home-Kontext (Teaser). */
export interface DepartmentTeaser {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;   // Markdown
  heroImageUrl: string | null;
  heroImageAlt: string | null;
}

/** Kern-Config ohne Sektionen (in `public-home` als `config` eingebettet). */
export interface ClubConfig {
  clubId: string;
  slug: string | null;
  name: string;
  shortName: string | null;
  colors: ClubColors;
  logoUrl: string | null;
  logoWebUrl: string | null;
  gruendungsjahr: number | null;
  social: ClubSocial;
  homepage: HomepageFields;
  stats: ClubStats;
  departments: DepartmentTeaser[];
}

/** `public-config` = ClubConfig + geordnete, sichtbare Sektionsliste. */
export interface PublicConfig extends ClubConfig {
  sections: HomepageSection[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. public-home?club=<slug>  — Aggregat für die Startseite (Cache: news-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/** Vorstands-Teaser (Kurzform ohne E-Mail/Abteilung). */
export interface VorstandTeaser {
  id: string;
  name: string;
  bezeichnung: string;
  fotoUrl: string | null;
}

/**
 * 1 Call statt n. `config` ist die Kern-Config **ohne** `sections`; `sections` steht daneben.
 * `sponsors` hier **ohne** `kategorie` (nur `public-sponsors` liefert das Tier).
 */
export interface PublicHome {
  config: ClubConfig;
  sections: HomepageSection[];
  news: NewsListItem[];          // max. 5, scope=verein
  sponsors: SponsorBase[];       // max. 30 (ohne kategorie)
  vorstandTeaser: VorstandTeaser[]; // max. 6
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. News  (public-news)
// ─────────────────────────────────────────────────────────────────────────────

/** News-Ebene. */
export type NewsScope = 'verein' | 'abteilung' | 'team';

/** Listen-Item (`?club=…`). */
export interface NewsListItem {
  id: string;
  slug: string | null;
  title: string;
  body: string;                  // Markdown
  imageUrl: string | null;
  imageAlt: string | null;
  publishedAt: string;           // ISO-Timestamp
  scope: NewsScope;
  context: string | null;        // aufgelöster Verein-/Abteilungs-/Team-Name
  authorName: string | null;
}

/** Detail (`?id=<uuid|slug>`) = Listen-Item + Open-Graph. */
export interface NewsDetail extends NewsListItem {
  og: OpenGraph;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Team  (public-team?id=<uuid|slug>)  (Cache: entity-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Optionale Zielgruppe eines Teams (Freitext/Enum-Rohwert aus der DB, z.B. Mädchen/Damen/Jungen/
 * Herren/Gemischt). Als `string | null` typisiert, um an die konkreten DB-Werte nicht zu präjudizieren.
 */
export type Zielgruppe = string | null;

/** Trainer im Team-Kontext (kompakt; Kontakt consent-gated). */
export interface TeamTrainer {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;          // nur bei kontaktVeroeffentlichen, sonst null
  telefon: string | null;        // dito
  bio: string | null;
  fotoUrl: string | null;
  isPrimary: boolean;
}

export interface PublicTeam {
  id: string;
  slug: string | null;
  name: string;
  shortName: string | null;
  color: string | null;
  liga: string | null;
  photoUrl: string | null;
  photoAlt: string | null;
  motto: string | null;
  description: string | null;    // Markdown
  warumWir: string | null;
  zielgruppe: Zielgruppe;
  alterVon: number | null;
  alterBis: number | null;
  trainer: TeamTrainer[];        // leer, wenn trainer-Modul inaktiv
  trainingSlots: TrainingSlot[]; // leer, wenn opt-out oder booking-Modul inaktiv
  ergebnisse: Spielergebnis[];   // max. 5
  spielplan: Spiel[];            // max. 5, kommend
  galerie: GalerieFoto[];        // max. 20
  links: TeamLink[];
  og: OpenGraph;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Abteilung  (public-abteilung?id=<uuid|slug>)  (Cache: entity-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/** Abteilungsleitung (E-Mail consent-gated, Foto nur bei profilVeroeffentlichen). */
export interface AbteilungLeitung {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;
  fotoUrl: string | null;
}

/** Trainer auf Abteilungs-Ebene (dedupliziert, mit Lizenz-Titeln + Team-Namen). */
export interface AbteilungTrainer {
  id: string;
  vorname: string;
  nachname: string;
  bio: string | null;
  fotoUrl: string | null;
  lizenzen: string[];            // nur Bezeichnungen
  teams: string[];               // Team-Namen
}

/** Trainer im Mannschafts-Teaser der Abteilung. */
export interface AbteilungMannschaftTrainer {
  id: string;
  vorname: string;
  nachname: string;
  bio: string | null;
  fotoUrl: string | null;
  lizenzen: string[];
  isPrimary: boolean;
}

/** Mannschaft im Abteilungs-Kontext. */
export interface AbteilungMannschaft {
  id: string;
  name: string;
  shortName: string | null;
  color: string | null;
  liga: string | null;
  photoUrl: string | null;
  photoAlt: string | null;
  trainer: AbteilungMannschaftTrainer[]; // leer, wenn trainer-Modul inaktiv
  trainingSlots: TrainingSlot[];
}

export interface StatKachel { wert: string; label: string; }
export interface Usp        { titel: string; text: string; }
export interface HeroCta    { primaer: string | null; sekundaer: string | null; }
export interface Praevention { text: string | null; vorteile: string[]; }

export interface PublicAbteilung {
  id: string;
  slug: string | null;
  name: string;
  icon: string | null;
  description: string | null;        // Markdown (Langbeschreibung > Teaser)
  tagline: string | null;
  langbeschreibung: string | null;   // Markdown
  heroCta: HeroCta;
  stats: StatKachel[];               // leere Kacheln bereits gefiltert
  usps: Usp[];
  praevention: Praevention | null;   // null, wenn weder Text noch Vorteile gepflegt
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  leitung: AbteilungLeitung | null;  // null, wenn keine/Modul inaktiv
  trainer: AbteilungTrainer[];
  mannschaften: AbteilungMannschaft[];
  og: OpenGraph;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Trainer  (public-trainer?id= / public-trainers?club=)  (Cache: entity-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export interface TrainerLizenz {
  bezeichnung: string;
  ausstellendeOrg: string | null;
  ausstellungsdatum: string | null; // YYYY-MM-DD
  ablaufdatum: string | null;
}

export interface TrainerErfolg {
  jahr: number | null;
  mannschaft: string | null;
  titel: string;
}

export interface TrainerMannschaft {
  teamId: string;
  teamName: string | null;
  isPrimary: boolean;
}

/** Volles Trainerprofil (Liste + Einzel teilen dieses Shape). */
export interface Trainer {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;          // nur bei kontaktVeroeffentlichen
  telefon: string | null;        // dito
  bio: string | null;
  fotoUrl: string | null;
  lizenzen: TrainerLizenz[];
  erfolge: TrainerErfolg[];
  mannschaften: TrainerMannschaft[];
}

/** Einzelprofil = Trainer + Open-Graph. */
export interface TrainerDetail extends Trainer {
  og: OpenGraph;
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Sponsoren  (public-sponsors?club=)  (Cache: entity-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/** Sponsor-Tier. `'keine'` bzw. fehlend ⇒ neutral/kein Tier. */
export type SponsorTier = 'gold' | 'silber' | 'bronze' | 'partner' | 'keine';

/** Basis-Sponsor (public-home, ohne Tier). */
export interface SponsorBase {
  id: string;
  firmenname: string;
  logoWebUrl: string | null;
  logoDruckUrl: string | null;
  logoAlt: string | null;
  websiteUrl: string | null;
}

/** public-sponsors = Basis + Tier. */
export interface Sponsor extends SponsorBase {
  kategorie: SponsorTier;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Vorstand & Funktionäre  (public-vorstand?club=)  (Cache: config-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export type FunktionaerGruppe = 'vorstand' | 'abteilungsleitung';

export interface Funktionaer {
  id: string;
  name: string;
  bezeichnung: string;
  gruppe: FunktionaerGruppe;
  fotoUrl: string | null;
  email: string | null;          // nur bei emailOeffentlich
  abteilung: string | null;
}

export interface PublicVorstand {
  vorstand: Funktionaer[];
  abteilungsleiter: Funktionaer[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Geschichte  (public-geschichte?club=)  (Cache: config-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export interface Meilenstein {
  id: string;
  jahr: number;
  titel: string;
  beschreibung: string | null;
  fotoUrl: string | null;
}

export interface Aera {
  id: string;
  titel: string;
  zeitraum: string | null;
  meilensteine: Meilenstein[];
}

export interface PublicGeschichte {
  aeren: Aera[];
  sonstige: Meilenstein[];       // Meilensteine ohne Ära
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. Spiele  (public-spiele?club=…)  (Cache: news-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

/** Ergebnis/Spiel mit Team-Zuordnung (club-/abteilungs-/teamweit). */
export interface SpielMitTeam extends Spiel { id: string; teamId: string; teamName: string | null; }
export interface ErgebnisMitTeam extends Spielergebnis { id: string; teamId: string; teamName: string | null; }

export interface PublicSpiele {
  ergebnisse: ErgebnisMitTeam[];
  spielplan: SpielMitTeam[];
}
// Hinweis: `?format=ical` liefert stattdessen `text/calendar` (kein JSON-Envelope).

// ─────────────────────────────────────────────────────────────────────────────
// 13. Events / RSVP  (public-events, public-event-rsvp)  (Cache: news-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export interface EventItem {
  id: string;
  scope: NewsScope;              // verein | abteilung | team
  departmentId: string | null;
  teamId: string | null;
  title: string;
  description: string | null;
  datum: string;                 // YYYY-MM-DD
  uhrzeit: string | null;
  ort: string | null;
  anmeldungAktiv: boolean;
  maxTeilnehmer: number | null;
  angemeldet: number;            // Summe bestätigter Anmeldungen
  freiePlaetze: number | null;   // null = unbegrenzt
}

/** Request-Body für POST public-event-rsvp. */
export interface EventRsvpRequest {
  eventId: string;
  name: string;
  email: string;
  anzahl?: number;               // 1–20, Default 1
  consent: true;                 // DSGVO-Pflicht
  captchaToken?: string;         // Pflicht, wenn serverseitig Turnstile aktiv ist
}

/** Antwort: `{ data: { ok: true }, meta: null, error: null }` (no-store). */
export interface EventRsvpResult { ok: true; }

// ─────────────────────────────────────────────────────────────────────────────
// 14. Sitemap  (public-sitemap?club=)  (Cache: config-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export interface SitemapUrl {
  loc: string;                   // relativer Pfad, z.B. "/mannschaft/1-mannschaft"
  lastmod: string | null;        // YYYY-MM-DD
  changefreq: 'weekly' | 'monthly' | 'yearly' | string;
}

export interface PublicSitemap { urls: SitemapUrl[]; }

// ─────────────────────────────────────────────────────────────────────────────
// 15. Fundgrube / Lost & Found  (public-lostfound?club=)  (Cache: news-Klasse)
// ─────────────────────────────────────────────────────────────────────────────

export interface LostFoundItem {
  id: string;
  beschreibung: string;
  kategorieName: string | null;  // bereits aufgelöster Name (keine ID)
  fundortName: string | null;
  erfasstAm: string;             // ISO-Timestamp
  /**
   * Signierte, **zeitlich begrenzt gültige** URLs (TTL ~1 h) aus einem privaten Bucket.
   * NICHT cachen/persistieren — bei jedem Render frisch aus der API beziehen.
   */
  fotoUrls: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. Track-View  (public-track-view)  — SONDERFALL: NICHT enveloped
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackViewRequest {
  entityType: 'news' | 'team' | 'abteilung';
  entityId: string;              // UUID
}
/** Erfolg: `{ ok: true }`. Fehler: `{ error: 'bad_request' | 'not_found' | 'server_error' }`. */
export type TrackViewResult = { ok: true } | { error: string };

// ─────────────────────────────────────────────────────────────────────────────
// 17. Endpoint → Response-Typ (Referenz-Map)
// ─────────────────────────────────────────────────────────────────────────────

/**
 *  GET  public-config?club=<slug>            → ApiObjectResponse<PublicConfig>
 *  GET  public-home?club=<slug>              → ApiObjectResponse<PublicHome>
 *  GET  public-news?club=<slug>&…            → ApiListResponse<NewsListItem>
 *  GET  public-news?id=<uuid|slug>[&preview] → ApiObjectResponse<NewsDetail>
 *  GET  public-team?id=<uuid|slug>[&preview] → ApiObjectResponse<PublicTeam>
 *  GET  public-abteilung?id=<uuid|slug>[&…]  → ApiObjectResponse<PublicAbteilung>
 *  GET  public-trainer?id=<uuid>             → ApiObjectResponse<TrainerDetail>
 *  GET  public-trainers?club=<slug>&…        → ApiListResponse<Trainer>
 *  GET  public-sponsors?club=<slug>&…        → ApiListResponse<Sponsor>
 *  GET  public-vorstand?club=<slug>          → ApiObjectResponse<PublicVorstand>
 *  GET  public-geschichte?club=<slug>        → ApiObjectResponse<PublicGeschichte>
 *  GET  public-spiele?club=<slug>&…          → { data: PublicSpiele, meta: PageMeta, error: null }
 *  GET  public-spiele?club=<slug>&format=ical→ text/calendar (kein JSON)
 *  GET  public-events?club=<slug>&…          → ApiListResponse<EventItem>
 *  POST public-event-rsvp                    → ApiObjectResponse<EventRsvpResult>
 *  GET  public-sitemap?club=<slug>           → ApiObjectResponse<PublicSitemap>
 *  GET  public-lostfound?club=<slug>&…       → ApiListResponse<LostFoundItem>
 *  POST public-track-view                    → TrackViewResult (NICHT enveloped)
 */
