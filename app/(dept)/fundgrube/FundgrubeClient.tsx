'use client'

import { useState, useEffect, useMemo } from 'react'
import { fetchFundsachen } from '@/lib/api'
import type { Fundsache } from '@/lib/api'

interface FilterOption { id: string; name: string }

const KATEGORIE_ICONS: Record<string, string> = {
  'Trikot / Sportbekleidung': 'shirt',
  'Schuhe / Stollenschuhe':   'footprint',
  'Rucksack / Tasche':        'backpack',
  'Schlüssel / Ausweis':      'key',
  'Sonstiges':                'help_outline',
}

function formatDatum(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function FundgrubeClient() {
  const [fundsachen, setFundsachen] = useState<Fundsache[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    fetchFundsachen()
      .then(setFundsachen)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Kategorien & Sportstätten werden aus den gelieferten Fundsachen abgeleitet
  // (public-lostfound liefert bereits aufgelöste Namen mit, keine IDs → nach Namen filtern).
  const kategorien = useMemo<FilterOption[]>(() => {
    const names = new Set<string>()
    fundsachen.forEach(f => { if (f.kategorieName) names.add(f.kategorieName) })
    return [...names].sort((a, b) => a.localeCompare(b)).map(name => ({ id: name, name }))
  }, [fundsachen])

  const sportstätten = useMemo<FilterOption[]>(() => {
    const names = new Set<string>()
    fundsachen.forEach(f => { if (f.fundortName) names.add(f.fundortName) })
    return [...names].sort((a, b) => a.localeCompare(b)).map(name => ({ id: name, name }))
  }, [fundsachen])

  // ── Filter state (nach Namen) ──
  const [filterKat, setFilterKat] = useState('')
  const [filterOrt, setFilterOrt] = useState('')
  const [sortDir,   setSortDir]   = useState<'desc' | 'asc'>('desc')

  // ── Verlust-Formular ──
  const [verlustSent, setVerlustSent] = useState(false)
  const [verlustForm, setVerlustForm] = useState({ name: '', email: '', beschreibung: '', kategorie: '', fundort: '' })

  // ── "Gehört mir"-Modal ──
  const [claimItem, setClaimItem] = useState<Fundsache | null>(null)
  const [claimForm, setClaimForm] = useState({ name: '', email: '', hinweis: '' })
  const [claimSent, setClaimSent] = useState(false)

  const items = useMemo(() => {
    let list = fundsachen.filter(f => {
      if (filterKat && f.kategorieName !== filterKat) return false
      if (filterOrt && f.fundortName !== filterOrt) return false
      return true
    })
    return [...list].sort((a, b) => {
      const ta = new Date(a.erfasstAm ?? 0).getTime()
      const tb = new Date(b.erfasstAm ?? 0).getTime()
      return sortDir === 'desc' ? tb - ta : ta - tb
    })
  }, [fundsachen, filterKat, filterOrt, sortDir])

  function handleVerlustSubmit(e: React.FormEvent) { e.preventDefault(); setVerlustSent(true) }
  function handleClaimSubmit(e: React.FormEvent)   { e.preventDefault(); setClaimSent(true) }

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1 bg-white/10 text-white/70 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Gefundene Gegenstände
          </span>
          <h1 className="font-headline text-5xl font-black text-white mb-4">Fundgrube</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Hier findest du alle Gegenstände, die bei uns abgegeben wurden. Erkennst du etwas? Meld dich!
          </p>
        </div>
      </section>

      {/* ── Verlust melden ── */}
      <section id="verlust" className="py-12 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-2xl text-primary">report_problem</span>
            <h2 className="font-headline font-black text-xl text-primary">Verlust melden</h2>
          </div>
          <p className="text-on-surface-variant text-sm mb-6">
            Etwas verloren? Beschreib uns deinen Gegenstand – wir schauen ob er bei uns gelandet ist.
          </p>

          {verlustSent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4 max-w-2xl">
              <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
              <div>
                <p className="font-headline font-bold text-green-800">Meldung erhalten!</p>
                <p className="text-green-700 text-sm">Wir melden uns bei dir, sobald wir etwas gefunden haben.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerlustSubmit} className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: contact + filters */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Name</label>
                      <input required value={verlustForm.name} onChange={e => setVerlustForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        placeholder="Dein Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">E-Mail</label>
                      <input required type="email" value={verlustForm.email} onChange={e => setVerlustForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        placeholder="deine@email.de" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Typ</label>
                      <select value={verlustForm.kategorie} onChange={e => setVerlustForm(p => ({ ...p, kategorie: e.target.value }))}
                        className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white">
                        <option value="">— Alle —</option>
                        {kategorien.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sportstätte</label>
                      <select value={verlustForm.fundort} onChange={e => setVerlustForm(p => ({ ...p, fundort: e.target.value }))}
                        className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white">
                        <option value="">— Unbekannt —</option>
                        {sportstätten.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right: description + submit */}
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Beschreibung</label>
                    <textarea required rows={5} value={verlustForm.beschreibung} onChange={e => setVerlustForm(p => ({ ...p, beschreibung: e.target.value }))}
                      className="w-full h-full min-h-[120px] border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                      placeholder="Beschreib den Gegenstand so genau wie möglich..." />
                  </div>
                  <button type="submit"
                    className="label-cap px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors self-start">
                    Verlust melden
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="bg-surface sticky top-20 z-30 border-b border-outline-variant/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Filtern:</span>

          <select value={filterKat} onChange={e => setFilterKat(e.target.value)}
            className="border border-outline-variant rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary">
            <option value="">Alle Typen</option>
            {kategorien.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
          </select>

          <select value={filterOrt} onChange={e => setFilterOrt(e.target.value)}
            className="border border-outline-variant rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary">
            <option value="">Alle Sportstätten</option>
            {sportstätten.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select value={sortDir} onChange={e => setSortDir(e.target.value as 'desc' | 'asc')}
            className="border border-outline-variant rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary">
            <option value="desc">Neueste zuerst</option>
            <option value="asc">Älteste zuerst</option>
          </select>

          {(filterKat || filterOrt) && (
            <button onClick={() => { setFilterKat(''); setFilterOrt('') }}
              className="text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">close</span>
              Zurücksetzen
            </button>
          )}

          <span className="ml-auto text-xs text-on-surface-variant font-medium">
            {loading ? '…' : `${items.length} ${items.length === 1 ? 'Gegenstand' : 'Gegenstände'}`}
          </span>
        </div>
      </section>

      {/* ── Item grid ── */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-24">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 animate-spin">progress_activity</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 block mb-4">search_off</span>
              <p className="text-on-surface-variant font-headline font-bold text-xl">Nichts gefunden</p>
              <p className="text-on-surface-variant text-sm mt-2">Versuch andere Filter oder melde deinen Verlust oben.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map(item => (
                <FundItem
                  key={item.id}
                  item={item}
                  kategorieName={item.kategorieName ?? 'Sonstiges'}
                  fundortName={item.fundortName}
                  onClaim={() => { setClaimItem(item); setClaimSent(false); setClaimForm({ name: '', email: '', hinweis: '' }) }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── "Gehört mir"-Modal ── */}
      {claimItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setClaimItem(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <button onClick={() => setClaimItem(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
            {claimSent ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-5xl text-green-500 block mb-4">check_circle</span>
                <p className="font-headline font-black text-xl text-primary mb-2">Meldung eingegangen!</p>
                <p className="text-on-surface-variant text-sm">Wir prüfen deine Angaben und melden uns per E-Mail.</p>
                <button onClick={() => setClaimItem(null)}
                  className="mt-6 label-cap px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Schließen
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-headline font-black text-xl text-primary mb-1">Gehört mir!</h2>
                <p className="text-on-surface-variant text-sm mb-6">
                  „{claimItem.beschreibung}" — gib uns deine Kontaktdaten und einen kurzen Hinweis, warum der Gegenstand dir gehört.
                </p>
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Name</label>
                    <input required value={claimForm.name} onChange={e => setClaimForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      placeholder="Dein Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">E-Mail</label>
                    <input required type="email" value={claimForm.email} onChange={e => setClaimForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      placeholder="deine@email.de" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Warum gehört er dir?</label>
                    <textarea required rows={3} value={claimForm.hinweis} onChange={e => setClaimForm(p => ({ ...p, hinweis: e.target.value }))}
                      className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                      placeholder="z.B. Größe, Farbe, Besonderheiten..." />
                  </div>
                  <button type="submit"
                    className="w-full label-cap py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Anspruch melden
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function FundItem({ item, kategorieName, fundortName, onClaim }: {
  item: Fundsache
  kategorieName: string
  fundortName: string | null
  onClaim: () => void
}) {
  const icon = KATEGORIE_ICONS[kategorieName] ?? 'help_outline'

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      <div className="h-48 bg-surface-container-low flex items-center justify-center relative overflow-hidden">
        {item.fotoUrls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.fotoUrls[0]} alt={item.beschreibung}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/20"
            style={{ fontVariationSettings: "'FILL' 0" }}>
            {icon}
          </span>
        )}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          {kategorieName}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-headline font-bold text-primary text-base mb-2 leading-snug">{item.beschreibung}</p>
        <div className="space-y-1.5 mb-4 flex-1">
          {fundortName && (
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {fundortName}
            </p>
          )}
          <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Gefunden am {formatDatum(item.erfasstAm)}
          </p>
        </div>
        <button onClick={onClaim}
          className="w-full label-cap py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">hand_gesture</span>
          Gehört mir!
        </button>
      </div>
    </div>
  )
}
