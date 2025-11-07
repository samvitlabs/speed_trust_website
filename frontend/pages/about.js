const timeline = [
  {
    year: '2014',
    title: 'Seeds of Stewardship',
    description:
      'A group of ecologists and educators co-founded Speed Trust to reconnect classrooms in Tenkasi with the living laboratory of the Western Ghats.',
  },
  {
    year: '2017',
    title: 'Watershed Collaboratives',
    description:
      'Scaled community-led surveys across eight rivers, combining GIS, indigenous lore, and youth fellowships to co-create water security plans.',
  },
  {
    year: '2020',
    title: 'Living Soil Mobile Labs',
    description:
      'Equipped solar vans to deliver diagnostics, storytelling exhibits, and regenerative farming toolkits to village clusters during the pandemic.',
  },
  {
    year: '2023',
    title: 'Regional Learning Commons',
    description:
      'Opened open-source climate resilience hubs that share curricula, craft labs, and data dashboards for civic groups and schools.',
  },
];

export default function About() {
  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section
        className="relative h-[60vh] min-h-[420px] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">About Speed Trust</p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Southern Pothigai Environmental and Educational Trust
            </h1>
            <p className="text-lg text-white/80">
              Powering regenerative futures by pairing place-based science with intergenerational learning across the Western Ghats.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-white/60 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Mission</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2C5F2D]">Cultivate ecological guardianship</h2>
            <p className="mt-4 text-base text-slate-600">
              We design joyful, data-informed experiences that help communities read their landscapes, revive biodiversity, and center indigenous knowledge in every decision. Our mission is to weave science, art, and civic action so that each watershed becomes its own mentor.
            </p>
          </article>
          <article className="rounded-2xl border border-white/60 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Vision</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2C5F2D]">Resilient Western Ghats communities</h2>
            <p className="mt-4 text-base text-slate-600">
              We envision a bio-cultural corridor where schools, farms, and panchayats share open knowledge, restore commons, and nurture livelihoods that honor rivers, forests, and people equally.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">How we influence society</p>
            <h2 className="text-3xl font-bold text-[#2C5F2D]">
              Learning labs that ripple into policy, livelihoods, and culture
            </h2>
            <p className="text-base text-slate-600">
              We convene educators, elders, artists, and scientists to create open curricula, regenerative farming pilots, and storytelling archives. By embedding co-created data into local decision-making, we inspire citizens to advocate for healthier commons.
            </p>
            <p className="text-base text-slate-600">
              From mobile soil labs to youth river crews, our programs demonstrate how participatory science can shift budgets, bylaws, and behaviors toward ecological justice.
            </p>
          </div>
          <div
            className="h-80 w-full rounded-3xl bg-cover bg-center shadow-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1400&q=80')",
            }}
            role="img"
            aria-label="Community members restoring a riverbank"
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Journey Timeline</p>
          <h2 className="mt-3 text-3xl font-bold text-[#2C5F2D]">Milestones rooted in community trust</h2>
          <div className="mt-10 space-y-6 border-l-2 border-[#2C5F2D]/40 pl-6">
            {timeline.map((entry) => (
              <article key={entry.year} className="relative pl-6">
                <span className="absolute -left-[37px] top-2 h-4 w-4 rounded-full border-4 border-[#F9F9F9] bg-[#2C5F2D]" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-wide text-[#2C5F2D]">{entry.year}</p>
                <h3 className="text-2xl font-semibold text-slate-900">{entry.title}</h3>
                <p className="mt-2 text-base text-slate-600">{entry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
