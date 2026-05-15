type TrainerCardProps = {
  role: string
  name: string
  bio: string
  skills: string[]
  imageSrc: string
  imageAlt: string
}

export default function TrainerCard({ role, name, bio, skills, imageSrc, imageAlt }: TrainerCardProps) {
  return (
    <section className="py-12 max-w-[1200px] mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-6 rounded-2xl border border-surface-container-high">
        <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" alt={imageAlt} src={imageSrc} />
        </div>
        <div className="text-center md:text-left">
          <span className="text-secondary font-label-lg tracking-widest uppercase">{role}</span>
          <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">{name}</h2>
          <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">{bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
