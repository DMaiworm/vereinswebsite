type KursInfoBoxProps = {
  title: string
  description: string
  ctaLabel: string
}

export default function KursInfoBox({ title, description, ctaLabel }: KursInfoBoxProps) {
  return (
    <div className="mt-12 p-8 bg-surface-container-low rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
      <div className="p-4 bg-surface-container-lowest rounded-2xl">
        <span className="material-symbols-outlined text-4xl text-primary">info</span>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="font-headline font-bold text-primary text-xl mb-1">{title}</h4>
        <p className="text-on-surface-variant text-sm">{description}</p>
      </div>
      <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-xl font-headline font-extrabold text-sm hover:scale-105 transition-transform shadow-md">
        {ctaLabel}
      </button>
    </div>
  )
}
