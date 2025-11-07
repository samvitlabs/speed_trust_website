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

const guidingStatements = [
  {
    label: 'Mission',
    title: 'Hold space for communities to heal land and livelihoods',
    body:
      'As a registered public trust we convene farmers, teachers, and youth to co-create data-informed stewardship plans. We pair ecological science with cultural memory so every program restores rivers, soils, and dignity in equal measure.',
  },
  {
    label: 'Vision',
    title: 'Western Ghats commons stewarded by trusted local guardians',
    body:
      'We imagine a future where every panchayat hosts its own learning commons, where transparent trust-led governance unlocks green entrepreneurship, and where intergenerational councils keep forests, careers, and culture in balance.',
  },
];

export default function About() {
  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
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
        <div className="mx-auto max-w-4xl space-y-10">
          {guidingStatements.map((statement) => (
            <div key={statement.label} className="space-y-3 text-center">
              <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">{statement.label}</h2>
              <p className="text-lg font-medium text-[var(--color-brand-slate)]">{statement.title}</p>
              <p className="text-base text-[var(--color-brand-muted)]">{statement.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">How we influence society</p>
            <h2 className="text-3xl font-bold text-[var(--color-brand-green)]">
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
          <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Journey Timeline</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-brand-green)]">Milestones rooted in community trust</h2>
          <div className="mt-10 space-y-6 border-l-2 border-[var(--color-brand-green)]/40 pl-6">
            {timeline.map((entry) => (
              <article key={entry.year} className="relative pl-6">
                <span className="absolute -left-[37px] top-2 h-4 w-4 rounded-full border-4 border-[var(--color-brand-cream)] bg-[var(--color-brand-green)]" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-green)]">{entry.year}</p>
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
