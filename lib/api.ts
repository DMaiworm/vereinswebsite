/**
 * API-Wrapper für alle öffentlichen Supabase Edge Functions.
 * Konfiguration via .env.local:
 *   NEXT_PUBLIC_CLUB_SLUG  = Vereins-Slug (z.B. "sg-huenstetten")
 *   NEXT_PUBLIC_API_BASE   = https://xxx.supabase.co/functions/v1
 */

const API_BASE  = process.env.NEXT_PUBLIC_API_BASE!;
const CLUB_SLUG = process.env.NEXT_PUBLIC_CLUB_SLUG!;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  icon: string | null;
  beschreibung: string | null;
  hero_foto_pfad?: string | null;
}

export interface ClubConfig {
  club_id: string;
  slug: string;
  name: string;
  short_name: string | null;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  logo_web_pfad: string | null;
  operator_id: string | null;
  gruendungsjahr?: number | null;
  instagram_username?: string | null;
  facebook_url?: string | null;
  homepage_tagline?: string | null;
  homepage_hero_bild_url?: string | null;
  homepage_cta_label?: string | null;
  homepage_about_text?: string | null;
  homepage_about_text_2?: string | null;
  stats_mitglieder?: string | null;
  stats_kurse_pro_woche?: string | null;
  stats_lizenzierte_trainer?: string | null;
  departments: Department[];
}

export interface Sponsor {
  id: string;
  firmenname: string;
  logo_web_url: string | null;
  logo_druck_url: string | null;
  website_url: string | null;
  club_id: string | null;
  kategorie: 'gold' | 'silber' | 'bronze' | 'partner' | 'keine' | null;
}

export interface TrainingSlot {
  wochentag: string;
  wochentag_nr: number;
  start_time: string;
  end_time: string;
  resource: string;
}

export interface Trainer {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;
  telefon: string | null;
  bio: string | null;
  foto_url: string | null;
  is_primary: boolean;
}

export interface Spielergebnis {
  datum: string;
  gegner: string;
  tore_heimisch: number | null;
  tore_gegner: number | null;
  ist_heimspiel: boolean;
  wettbewerb: string | null;
}

export interface Spielplan {
  datum: string;
  uhrzeit: string | null;
  gegner: string;
  ist_heimspiel: boolean;
  wettbewerb: string | null;
  ort: string | null;
}

export interface TeamProfile {
  id: string;
  name: string;
  short_name: string | null;
  color: string;
  liga: string | null;
  foto_url: string | null;
  trainer: Trainer[];
  training_slots: TrainingSlot[];
  ergebnisse: Spielergebnis[];
  spielplan: Spielplan[];
}

export interface GalerieItem {
  titel: string | null;
  foto_url: string | null;
  testimonial_text: string | null;
  testimonial_autor: string | null;
}

export interface AbteilungProfile {
  id: string;
  name: string;
  icon: string | null;
  beschreibung: string | null;
  leitung: Trainer | null;
  mannschaften: Array<{
    id: string;
    name: string;
    short_name: string | null;
    color: string;
    liga: string | null;
    foto_url: string | null;
    motto: string | null;
    beschreibung: string | null;
    alter_von: number | null;
    alter_bis: number | null;
    trainer: Trainer[];
    galerie: GalerieItem[];
    training_slots: TrainingSlot[];
  }>;
}

// ─── Fetch-Helpers ──────────────────────────────────────────────────────────

async function get<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
  });
  if (!res.ok) throw new Error(`${endpoint} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function fetchClubConfig(): Promise<ClubConfig> {
  return get<ClubConfig>('public-config', { slug: CLUB_SLUG });
}

export async function fetchSponsors(operatorId: string): Promise<Sponsor[]> {
  return get<Sponsor[]>('public-sponsors', { operator_id: operatorId });
}

export async function fetchAbteilung(departmentId: string): Promise<AbteilungProfile> {
  return get<AbteilungProfile>('public-abteilung', { department_id: departmentId });
}

export async function fetchTeam(teamId: string): Promise<TeamProfile> {
  return get<TeamProfile>('public-team', { team_id: teamId });
}

export async function fetchTrainers(operatorId: string): Promise<Trainer[]> {
  return get<Trainer[]>('public-trainers', { operator_id: operatorId });
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

export async function fetchVorstand(clubId: string): Promise<VorstandResponse> {
  return get<VorstandResponse>('public-vorstand', { club_id: clubId });
}

// ─── Supabase REST (public tables) ──────────────────────────────────────────

const SUPABASE_URL  = API_BASE.replace('/functions/v1', '')
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamhlZXdoZ3JtY3d6anVyamxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MjQwNTIsImV4cCI6MjA4NjUwMDA1Mn0.9nIbptqMo6ot1FWrhaywFT8NJfgIL6oJInKP0R8AnZ0'

async function restGet<T>(table: string, query: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`REST ${table} failed: ${res.status}`)
  return res.json() as Promise<T>
}

export interface Fundsache {
  id: string
  beschreibung: string
  status: string
  erfasst_am: string | null
  foto_pfad: string | null
  kategorie_id: string | null
  fundort_anlage_id: string | null
}

export interface FundsacheKategorie {
  id: string
  name: string
  sort_order: number | null
}

export interface Facility {
  id: string
  name: string
}

export async function fetchFundsachen(): Promise<Fundsache[]> {
  return restGet<Fundsache[]>(
    'fundsachen',
    'select=id,beschreibung,status,erfasst_am,foto_pfad,kategorie_id,fundort_anlage_id&status=eq.aktiv&order=erfasst_am.desc'
  )
}

export async function fetchFundsachenKategorien(): Promise<FundsacheKategorie[]> {
  return restGet<FundsacheKategorie[]>(
    'fundsachen_kategorien',
    'select=id,name,sort_order&ist_aktiv=eq.true&order=sort_order'
  )
}

export async function fetchFacilities(): Promise<Facility[]> {
  return restGet<Facility[]>('facilities', 'select=id,name&order=name')
}
