import useReveal from '../hooks/useReveal';

const actions = [
  {
    title: 'Volunteer Opportunities',
    body: 'Join on-ground drives, tree plantations, data collection, and community events.',
  },
  {
    title: 'Partner With Us',
    body: 'Schools, colleges, NGOs, CSR teams, and government bodies can co-create programs and research.',
  },
  {
    title: 'Support & Donate',
    body: 'Fuel sapling drives, training workshops, and field labs with your contributions.',
  },
  {
    title: 'Join Friends of Nature Club',
    body: 'Become part of a growing network of students, youth, and nature enthusiasts championing local ecosystems.',
  },
];

export default function GetInvolved() {
  useReveal();

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/awareness.png')" }} data-reveal>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-5xl flex-col justify-center gap-3 px-6 py-16 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Get Involved</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Take action with SPEED Trust</h1>
          <p className="text-lg text-white/85">Simple ways to contribute to greener, resilient communities.</p>
        </div>
      </section>

      <section className="px-6 py-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Opportunities</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-brand-slate)]">Choose how you want to help</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {actions.map((action) => (
              <div
                key={action.title}
                data-reveal
                className="surface-card rounded-2xl px-6 py-6 transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-[var(--color-brand-slate)]">{action.title}</h3>
                <p className="mt-3 text-base text-[var(--color-brand-muted)]">{action.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
