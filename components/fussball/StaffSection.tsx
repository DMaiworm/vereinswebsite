export default function StaffSection() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-8">
        <h2 className="text-3xl font-headline font-black tracking-tighter text-primary uppercase mb-10 border-b-2 border-primary pb-4 inline-block">STAFF</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Head Coach Timo Jung */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-3xl p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:shadow-xl transition-all duration-500">
            <div className="w-full md:w-64 h-80 shrink-0 relative overflow-hidden rounded-2xl shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Head Coach Timo Jung"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRtgEWaCizGCs8T14xnJy9wrtUwtKi8dNCD9JeBZWodzAmAwKEqqNQ4dK4vTVAbyY62pTrPkdjxhYw1psQCEK4fUEnRAAhpuJBeOU-MgmFw8Y8F1_x2KtwvcY8RYFHWBQLlvcuvwtXhLs2IO7cuI7CGm153IzPBor5M7We228_P8xqjO0rdM2EvRBagQRQYTrWs7aR75SG_jrvgpqTyiVPsx7Rt-BQ2Y4lCfDeT3eQTfY4Mwe3aoDvGY0V33N8xiO6FfOzPaZjhj4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,40,86,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">Head Coach</div>
              <h3 className="text-4xl font-headline font-black text-primary mb-4 uppercase tracking-tighter">Timo Jung</h3>
              <p className="text-base text-on-surface-variant leading-relaxed mb-6 font-medium">
                Strategischer Vordenker mit einer klaren Vision für attraktiven Offensivfußball. Seit 2018 prägt er die sportliche Identität der SG Hünstetten und fördert konsequent junge Talente aus dem eigenen Unterbau.
              </p>
              <div className="flex gap-4">
                <a className="inline-flex items-center gap-2 font-headline font-bold text-white bg-primary px-6 py-2.5 rounded-full shadow-md hover:bg-primary-container transition-all text-sm" href="#">
                  Vita &amp; Erfolge
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Staff 2×2 */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { role: 'Co-Trainer',    name: 'Nikolaij Melcher', desc: 'Spielende Unterstützung', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAedbn3SHC539gw2MCq4odTyjIiR3FQNhBbnAdzBRODDJI9VKQRnpkbevE8B031iGcVOvn4EeRh0fZfRLTxPWi96rpYNylzDdWkuUWMBoCrNZmwJJEBxo7CkycgUj55Uu8Eo62R0XPTR14iKC8va4L2I8x_ougR_rGJK7aSWc8382HBcVbx8bvZiRr1iIByhuFkVBq0Yp_xE-Yg7qamYWJ0NK2_pu2JiZm2aPbvXbhvt20HpWcmwszU1R2JGblp_1SKVQT3FVQPBLg' },
              { role: 'Torwart-Trainer', name: 'Arno Grosmann',   desc: 'Torwartspiel & Reflexe',   src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgNKSFNoWCARbYt6ThP0e4r9n8IieNXTyZxbFVsho_zyX67lFEIHgt5Ml0wdQRfxIeFtX-W9n58zQe3fef3aBRb3jN0RX2dx9HJxwtD-aDjvnUNyHL7HnNL7HnML-aDjvnUNyHL7Hn' },
              { role: 'Teammanager',   name: 'Marcel Faust',     desc: 'Organisation & Logistik',  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtx6GiUJCVRcwS_ca-s-ZNzUH_jkucyU7oANcb522AlyJcBoZ17O_LLcRQJDsFx_RgEq1zAF272QDa-AYvF9xKKT8kp_Yd9tNQ8tuBSCcxIsUu3eONIRxqqIhsqTeA8X-zIMl4Hk9IBQH833ZuEDNkJBs8pn3uqpaPqDxy-Kj8IGCI6e3aBr0Ri9YU-XYyNTz2zZEAg5PsI_zdV9Hc4wbvDZVB1gOxevfUMAYz65aVW02QZ_xEzZkQdGksblRUmB7r-oIMuC_OBao' },
              { role: 'Sportl. Leiter', name: 'Hans Jung',        desc: 'Kaderplanung & Vision',    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhew3JHMhDdgHYu_tiHKNPxK3hyCX91YHEvo0Bmd7YHUl1V1X48Loo4kJA9wUjHnYW0fElIgySm6LQPQRcc5DfUTIQED5V8bItcRFgmHn7wISNkPOrdrkkGMV-TtilEnhn2bjoUqlFW62QOBAeTVc0WAOEEajW9iC4wzCfv5VJQl7IjFGZ04H1UBYaMnCNLlj-29NrIP7VU4xOBzEqXYKQ-cwPewAolDkKyzc9LnXhBiEoz3Zb1AQlwZJ5jq9ysz1hnh87NRzNgV8' },
            ].map(({ role, name, desc, src }) => (
              <div key={name} className="bg-surface-container rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                <div className="w-28 h-28 mb-4 relative overflow-hidden rounded-xl shadow-md border-2 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Portrait of ${name}`} src={src} />
                </div>
                <span className="text-secondary font-bold tracking-widest uppercase text-[9px] mb-1">{role}</span>
                <h3 className="text-sm font-headline font-extrabold text-primary uppercase leading-tight">{name}</h3>
                <p className="text-[10px] text-on-surface-variant mt-2 font-medium opacity-80">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
