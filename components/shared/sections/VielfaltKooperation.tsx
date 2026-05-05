export default function VielfaltKooperation() {
  return (
    <section className="py-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-sm">Möglichkeiten</span>
          <h2 className="text-5xl font-black text-primary uppercase tracking-tighter font-headline mt-2">Vielfalt der Kooperation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          {/* Namensrechte */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-primary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="Modern sports facility entrance with branding" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZfH3ftuxyeHmpW2a3hOy6PA5JHqN9_rO-F_wfUzuOEbZP0CPOHQS-kfH-Q_gZPIcEwRht1diGwLTe7KZ3h0ZVEKoqlZGaJyLYc3t0uq-V7bmEwSDGZB17THXXIGbIlrGIG1VlboFU6w-O21AvoNevpcC40ZL4DCEBK1BwhvZnA1xDHfzC5x4OKNx51hKl_2MANvIe4BroL_enQY3GR5k646IZ2t2GQxOPhaoZBhm8LAHXcUydMPOTvpXTNa26tj7GVCzzWFXyhjQ" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
            <div className="relative h-full p-8 flex flex-col justify-end">
              <h4 className="text-3xl font-black text-white uppercase font-headline">Namensrechte</h4>
              <p className="text-white/80 font-medium">Anlagen, Räume, Events – Machen Sie Ihren Namen zum Begriff.</p>
            </div>
          </div>
          {/* Bandenwerbung */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-secondary-container">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/10 text-[180px] font-black" style={{ transform: 'skewX(-12deg)' }}>ad_units</span>
            </div>
            <div className="relative h-full p-8 flex flex-col justify-end">
              <h4 className="text-2xl font-black text-primary uppercase font-headline">Bandenwerbung</h4>
              <p className="text-primary/70 font-bold">Klassische Sichtbarkeit am Spielfeldrand.</p>
            </div>
          </div>
          {/* Trikotwerbung */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="Athletic jersey fabric with branding" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4w8fFEmxuON-7o_rh8oZ-dI5mc-Mx0yVvZiEmpsq1bvt0uax-J3_W0-axaEu4HEuXzYis_Q7Wdi8Jf-e6m9kbs1Rq8fHpHzUP6N2OTmFXSOJypKWnsDWCAFAFPWRmAGGCP4eutjDbXUDq2zlciUQFZpJlCeX02RCUjeRHVs8YAWk43YAwuvQ3y17leH8VHXZNU2mGL3YuSpvKmdQuMjgXHpJfA3CZTxrZ8pQ4piK2-nrY9-C3SfcuVSUFeSpqEE5R4nCErxzwEB8" />
            <div className="relative h-full p-8 flex flex-col justify-end">
              <h4 className="text-2xl font-black text-primary uppercase font-headline">Trikotwerbung</h4>
              <p className="text-on-surface-variant font-medium">Direkt am Herzschlag des Spiels dabei.</p>
            </div>
          </div>
          {/* Event- & Spieltag */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl vanguard-gradient shadow-2xl">
            <div className="relative h-full p-8 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-secondary-container text-5xl mb-4">celebration</span>
              <h4 className="text-2xl font-black text-white uppercase font-headline">Event- &amp; Spieltag</h4>
              <p className="text-white/70 font-medium">Emotionen pur bei unseren Highlights.</p>
            </div>
          </div>
          {/* Geld- & Sachspenden */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-highest">
            <div className="relative h-full p-8 flex flex-col justify-end border-2 border-primary/10 rounded-3xl">
              <h4 className="text-2xl font-black text-primary uppercase font-headline">Geld- &amp; Sachspenden</h4>
              <p className="text-on-surface-variant font-medium">Unbürokratische Hilfe, die dort ankommt, wo sie gebraucht wird.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
