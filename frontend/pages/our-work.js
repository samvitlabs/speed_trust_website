import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

const focusAreas = [
  'Climate Change Mitigation',
  'Employment Generation',
  'Technological Integration',
  'Sustainability & Community Development',
];

const initiatives = [
  {
    title: 'Friends of Nature Club',
    summary: 'A volunteer network under SPEED Trust, comprising students, youth, and nature enthusiasts.',
    points: [
      'Tree plantation and green cover development.',
      'Restoration and rejuvenation of rivers, ponds, and lakes.',
      'Awareness campaigns on environmental protection and biodiversity conservation.',
      'Afforestation drives and maintenance of plantation zones with NGOs and Government Departments.',
    ],
    image: '/images/about/awareness.png',
  },
  {
    title: 'Rural Youth Engagement Program',
    summary: 'Focused on empowering rural and underprivileged youth through skills and opportunities.',
    points: [
      'Skill development training in collaboration with educational institutions and corporate sectors.',
      'Entrepreneurship guidance and mentorship programs.',
      'Facilitation of employment opportunities in local industries and enterprises.',
    ],
    image: '/images/about/workshop.png',
  },
];

export default function OurWork() {
  useReveal();

  return (
    <>
      <SEO
        title="Our Work - SPEED Trust Initiatives & Programs"
        description="Discover SPEED Trust's environmental initiatives including Friends of Nature Club, rural youth engagement, tree plantation drives, and sustainable agriculture programs."
        canonical="/our-work"
      />
      <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/new_practices.png')" }} data-reveal>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-4 px-6 py-16 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Our Work</p>
          <h1 className="text-4xl font-bold sm:text-5xl">How SPEED Trust creates impact on the ground</h1>
          <p className="text-lg text-white/85">Focused programs that blend ecology, education, and livelihoods.</p>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#fffaf3]" data-reveal>
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Initiatives</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Programs that deliver</p>
          </div>
          <div className="space-y-14">
            {initiatives.map((initiative, idx) => (
              <section
                key={initiative.title}
                data-reveal
                className={`flex flex-col gap-6 lg:items-center lg:gap-10 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-1/2 w-full overflow-hidden rounded-3xl shadow-[0_18px_40px_rgba(12,28,20,0.18)]">
                  <div
                    className="h-64 w-full bg-cover bg-center sm:h-72 lg:h-80"
                    style={{ backgroundImage: `url('${initiative.image}')` }}
                    aria-label={initiative.title}
                  />
                </div>
                <div className="lg:w-1/2 w-full space-y-4">
                  <h3 className="text-3xl font-bold text-[var(--color-brand-slate)]">{initiative.title}</h3>
                  <p className="text-base leading-relaxed text-[var(--color-brand-muted)]">{initiative.summary}</p>
                  <ul className="space-y-3 text-base text-[var(--color-brand-slate)]">
                    {initiative.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-brand-green)]" aria-hidden />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center pt-2">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Core Focus Areas</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">What we prioritize</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {focusAreas.map((item) => (
              <div
                key={item}
                data-reveal
                className="surface-card rounded-2xl px-6 py-5 text-lg font-semibold text-[var(--color-brand-slate)] transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
