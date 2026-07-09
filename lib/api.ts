/**
 * API-Wrapper für die öffentliche `public-*` API (Ziel-Contract v1).
 * Siehe website-publishing-api-guide.md.
 *
 * Konfiguration via .env.local:
 *   NEXT_PUBLIC_CLUB_SLUG  = Vereins-Slug (z.B. "sg-huenstetten")  → ?club=<slug>
 *   NEXT_PUBLIC_API_BASE   = https://xxx.supabase.co/functions/v1
 *
 * Grundprinzipien (Guide §1):
 *   - Ein Envelope für alles: { data, meta, error }
 *   - camelCase in allen Feldern
 *   - Slug-zentriert: vereinsweite Endpunkte ?club=<slug>, Sub-Ressourcen ?id=
 *   - Modul-bewusst: error.code === 'module_disabled' ⇒ leeres Ergebnis, kein Crash
 */

const API_BASE  = process.env.NEXT_PUBLIC_API_BASE!;
const CLUB_SLUG = process.env.NEXT_PUBLIC_CLUB_SLUG!;

// ─── Envelope ─────────────────────────────────────────────────────────────────

export interface Meta {
  total: number;
  limit: number;
  offset: number;
  next: number | null;
}

interface ApiError {
  code: string;
  message: string;
}

interface Envelope<T> {
  data: T | null;
  meta: Meta | null;
  error: ApiError | null;
}

/** Fehlercodes, die als „leeres Ergebnis" statt als Crash behandelt werden (Modul-Gating, Guide §7/§9). */
function isSoftError(code: string): boolean {
  return code === 'module_disabled' || code === 'not_found';
}

async function request<T>(endpoint: string, params: Record<string, string>, cache?: RequestCache): Promise<Envelope<T>> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    cache: cache ?? (process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache'),
  });
  // v1-Fehler (inkl. 404 module_disabled/not_found) tragen den Envelope im Body.
  const body = await res.json().catch(() => null);
  if (body && typeof body === 'object' && ('data' in body || 'error' in body)) {
    return body as Envelope<T>;
  }
  throw new Error(`${endpoint} failed: HTTP ${res.status}`);
}

/** Objekt-Ressource: gibt `data` oder — bei Soft-Error — `null` zurück. */
async function getObject<T>(endpoint: string, params: Record<string, string>): Promise<T | null> {
  const env = await request<T>(endpoint, params);
  if (env.error) {
    if (isSoftError(env.error.code)) return null;
    throw new Error(`${endpoint}: ${env.error.code} – ${env.error.message}`);
  }
  return env.data;
}

/** Listen-Ressource: gibt `{ data, meta }` zurück; Soft-Error ⇒ leere Liste. */
async function getList<T>(endpoint: string, params: Record<string, string>, cache?: RequestCache): Promise<{ data: T[]; meta: Meta | null }> {
  const env = await request<T[]>(endpoint, params, cache);
  if (env.error) {
    if (isSoftError(env.error.code)) return { data: [], meta: null };
    throw new Error(`${endpoint}: ${env.error.code} – ${env.error.message}`);
  }
  return { data: env.data ?? [], meta: env.meta };
}

// ─── Types (camelCase, `data`-Form aus Guide §10) ──────────────────────────────

export interface Department {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
}

export interface ClubConfig {
  clubId: string;
  slug: string;
  name: string;
  shortName: string | null;
  colors: { primary: string; secondary: string };
  logoUrl: string | null;
  logoWebUrl: string | null;
  gruendungsjahr?: number | null;
  social: { instagram: string | null; facebook: string | null };
  homepage: {
    tagline: string | null;
    heroImageUrl: string | null;
    heroImageAlt: string | null;
    ctaLabel: string | null;
    aboutText: string | null;
    aboutText2: string | null;
  };
  stats: {
    mitglieder?: string | null;
    kurseProWoche?: string | null;
    lizenzierteTrainer?: string | null;
  };
  departments: Department[];
}

/** Sponsor-Tier (`public-sponsors`). `'keine'` bzw. fehlend ⇒ neutral/kein Tier. */
export type SponsorTier = 'gold' | 'silber' | 'bronze' | 'partner' | 'keine';

export interface Sponsor {
  id: string;
  firmenname: string;
  logoWebUrl: string | null;
  logoDruckUrl: string | null;
  logoAlt: string | null;
  websiteUrl: string | null;
  /** Tier für die Sponsoren-Seite (Gold/Silber/Bronze). `public-sponsors` liefert dies mit. */
  kategorie: SponsorTier;
}

export interface TrainingSlot {
  wochentag: string;
  wochentagNr: number;
  startTime: string;
  endTime: string;
  ort: string;
}

export interface Trainer {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;
  telefon: string | null;
  bio: string | null;
  fotoUrl: string | null;
  isPrimary: boolean;
  lizenzen?: string[];
  erfolge?: string[];
}

export interface Spielergebnis {
  datum: string;
  gegner: string;
  toreHeimisch: number | null;
  toreGegner: number | null;
  istHeimspiel: boolean;
  wettbewerb: string | null;
}

export interface Spielplan {
  datum: string;
  uhrzeit: string | null;
  gegner: string;
  istHeimspiel: boolean;
  wettbewerb: string | null;
  ort: string | null;
}

export interface GalerieItem {
  titel: string | null;
  fotoUrl: string | null;
  fotoAlt: string | null;
  aufnahmeDatum?: string | null;
  testimonialText: string | null;
  testimonialAutor: string | null;
}

export interface Mannschaft {
  id: string;
  name: string;
  shortName: string | null;
  color: string;
  liga: string | null;
  photoUrl: string | null;
  photoAlt: string | null;
  motto?: string | null;
  description?: string | null;
  zielgruppe?: string | null;
  alterVon?: number | null;
  alterBis?: number | null;
  trainer: Trainer[];
  trainingSlots: TrainingSlot[];
  galerie?: GalerieItem[];
}

export interface TeamProfile {
  id: string;
  slug?: string;
  name: string;
  shortName: string | null;
  color: string;
  liga: string | null;
  photoUrl: string | null;
  photoAlt: string | null;
  motto: string | null;
  description: string | null;
  alterVon: number | null;
  alterBis: number | null;
  trainer: Trainer[];
  trainingSlots: TrainingSlot[];
  ergebnisse: Spielergebnis[];
  spielplan: Spielplan[];
  galerie: GalerieItem[];
}

export interface AbteilungProfile {
  id: string;
  slug?: string;
  name: string;
  icon: string | null;
  description: string | null;
  langbeschreibung?: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  leitung: Trainer | null;
  trainer: Trainer[];
  mannschaften: Mannschaft[];
}

export interface VorstandEintrag {
  id: string;
  name: string;
  bezeichnung: string;
  gruppe: 'vorstand' | 'abteilungsleitung';
  fotoUrl: string | null;
  email: string | null;
  abteilung: string | null;
}

export interface VorstandResponse {
  vorstand: VorstandEintrag[];
  abteilungsleiter: VorstandEintrag[];
}

export interface NewsEintrag {
  id: string;
  slug?: string;
  title: string;
  body: string;
  imageUrl: string | null;
  imageAlt: string | null;
  publishedAt: string;
  scope: 'verein' | 'abteilung' | 'team';
  context: string | null;
  authorName: string | null;
}

export interface GeschichteMeilenstein {
  id: string;
  jahr: number;
  titel: string;
  beschreibung: string | null;
  fotoUrl: string | null;
  sortOrder?: number;
}

export interface GeschichteAera {
  id: string;
  titel: string;
  zeitraum: string | null;
  sortOrder?: number;
  meilensteine: GeschichteMeilenstein[];
}

export interface GeschichteResponse {
  aeren: GeschichteAera[];
  sonstige: GeschichteMeilenstein[];
}

/**
 * Fundgrube-Item (`public-lostfound`, = LostFoundItem des Contracts §15).
 * `kategorieName`/`fundortName` sind bereits aufgelöste Namen (keine IDs).
 * `fotoUrls` sind **signierte, kurzlebige** URLs (TTL ~1 h) — nicht cachen/persistieren.
 */
export interface Fundsache {
  id: string;
  beschreibung: string;
  kategorieName: string | null;
  fundortName: string | null;
  erfasstAm: string;
  fotoUrls: string[];
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Bootstrap – vereinsweite Konfiguration (`?club=<slug>`). */
export async function fetchClubConfig(): Promise<ClubConfig> {
  const config = await getObject<ClubConfig>('public-config', { club: CLUB_SLUG });
  if (!config) throw new Error('public-config: Verein nicht gefunden oder Website-Modul inaktiv');
  return config;
}

/** Sponsoren des Vereins (`?club=<slug>`; Modul `sponsoren`). */
export async function fetchSponsors(): Promise<Sponsor[]> {
  const { data } = await getList<Sponsor>('public-sponsors', { club: CLUB_SLUG });
  return data;
}

/** Abteilungs-Profil (`?id=<deptId>`). */
export async function fetchAbteilung(departmentId: string): Promise<AbteilungProfile> {
  const abteilung = await getObject<AbteilungProfile>('public-abteilung', { id: departmentId });
  if (!abteilung) throw new Error(`public-abteilung: ${departmentId} nicht gefunden`);
  return abteilung;
}

/** Mannschafts-Profil (`?id=<teamId>`). */
export async function fetchTeam(teamId: string): Promise<TeamProfile> {
  const team = await getObject<TeamProfile>('public-team', { id: teamId });
  if (!team) throw new Error(`public-team: ${teamId} nicht gefunden`);
  return team;
}

/** Trainerliste des Vereins (`?club=<slug>[&department=]`; Modul `trainer`). */
export async function fetchTrainers(departmentId?: string): Promise<Trainer[]> {
  const params: Record<string, string> = { club: CLUB_SLUG };
  if (departmentId) params.department = departmentId;
  const { data } = await getList<Trainer>('public-trainers', params);
  return data;
}

/** Vorstand & Abteilungsleiter (`?club=<slug>`). */
export async function fetchVorstand(): Promise<VorstandResponse> {
  const vorstand = await getObject<VorstandResponse>('public-vorstand', { club: CLUB_SLUG });
  return vorstand ?? { vorstand: [], abteilungsleiter: [] };
}

/** Vereinsgeschichte (`?club=<slug>`). */
export async function fetchGeschichte(): Promise<GeschichteResponse> {
  const geschichte = await getObject<GeschichteResponse>('public-geschichte', { club: CLUB_SLUG });
  return geschichte ?? { aeren: [], sonstige: [] };
}

/**
 * News (`?club=<slug>[&scope=][&department=][&team=][&limit&offset]`).
 * Gibt `{ data, meta }` zurück (Pagination). `body` ist Markdown (S-407).
 */
export async function fetchPublicNews(params: {
  scope?: 'verein' | 'abteilung' | 'team';
  departmentId?: string;
  teamId?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ data: NewsEintrag[]; meta: Meta | null }> {
  const p: Record<string, string> = { club: CLUB_SLUG };
  if (params.scope)        p.scope      = params.scope;
  if (params.departmentId) p.department = params.departmentId;
  if (params.teamId)       p.team       = params.teamId;
  if (params.limit  != null) p.limit  = String(params.limit);
  if (params.offset != null) p.offset = String(params.offset);
  return getList<NewsEintrag>('public-news', p);
}

/**
 * Fundgrube (`public-lostfound?club=<slug>`; ersetzt den früheren Direktzugriff).
 * `no-store`, da die `fotoUrls` signierte, kurzlebige URLs sind (nicht cachen).
 */
export async function fetchFundsachen(): Promise<Fundsache[]> {
  const { data } = await getList<Fundsache>('public-lostfound', { club: CLUB_SLUG }, 'no-store');
  return data;
}
