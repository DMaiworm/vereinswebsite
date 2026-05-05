export type StatsBarItem = {
  value: string
  label: string
  accent: 'primary' | 'secondary'
}

export default function StatsBar({ items }: { items: StatsBarItem[] }) {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.label}
              className={`text-center p-6 bg-surface-container-low rounded-2xl border-b-4 ${
                item.accent === 'primary' ? 'border-primary' : 'border-secondary'
              }`}
            >
              <div className="font-headline font-black text-4xl text-primary mb-1">{item.value}</div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
