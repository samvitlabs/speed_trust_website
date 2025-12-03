import useReveal from '../hooks/useReveal';

const missionItems = [
  'To conserve and rejuvenate natural ecosystems through participatory environmental initiatives.',
  'To promote environmental awareness and responsible practices among students and the public.',
  'To enhance the employability of rural youth through education, technical training, and entrepreneurship support.',
  'To facilitate sustainable agricultural and rural development through technological and financial advisory services.',
];

const objectives = [
  'Environmental Protection and Restoration',
  'Youth Empowerment and Employment',
  'Sustainable Agriculture and Technology Integration',
  'Community Awareness',
  'Partnerships and Collaborations',
];

const futurePlans = [
  'Expand into multiple villages and districts through a franchise/cooperative model.',
  'Launch a mobile app to provide farmers with real-time assistance, training, and market access.',
  'Export agro products under the SPEED Trust brand to promote quality rural produce globally.',
  'Partner with universities, colleges, and research organizations for ongoing innovation and tech transfer.',
  'Develop Green Training Centers for hands-on environmental education and sustainable practice demonstrations.',
];

const goal =
  'SPEED Trust envisions a green, sustainable, and self-reliant society where environmental preservation and livelihood creation go hand in hand. Through community-driven initiatives and technical expertise, SPEED aims to bring long-term ecological and socio-economic transformation across South India.';

export default function About() {
  useReveal();

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/cleaning.png')" }} data-reveal>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-4 px-6 py-16 text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">About SPEED Trust</h1>
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Southern Pothigai Environmental and Educational Development</p>
          <p className="text-lg text-white/85">
            A non-profit organization committed to promoting environmental sustainability, value-based education, and livelihood development. Established by experienced
            professionals in environmental management and technical consultancy, the Trust aims to build harmony between nature
            and human progress.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#fffaf3]" data-reveal>
        <div className="mx-auto max-w-6xl space-y-12 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Vision</h2>
            <p className="text-lg leading-relaxed text-[var(--color-brand-slate)] max-w-4xl mx-auto">
              To build a sustainable and environmentally conscious society by empowering communities through education, technology, and ecological restoration.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Mission</h2>
            <ul className="mt-2 space-y-3 text-base text-[var(--color-brand-slate)] max-w-4xl mx-auto text-left">
              {missionItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-[var(--color-brand-green)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-6 py-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Objectives</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">What guides our work</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {objectives.map((item) => (
              <div
                key={item}
                data-reveal
                className="rounded-xl border border-[var(--color-brand-green)]/25 bg-white/90 px-5 py-4 text-base font-semibold text-[var(--color-brand-slate)] shadow-[0_10px_26px_rgba(12,28,20,0.08)] transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" data-reveal style={{ background: 'linear-gradient(135deg, #edf3ee 0%, #f7f0e6 100%)' }}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Future Plans</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Scaling our reach</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {futurePlans.map((item) => (
              <div key={item} className="rounded-2xl bg-[var(--color-surface-warm)] px-5 py-4 text-base text-[var(--color-brand-slate)] shadow-[0_10px_26px_rgba(12,28,20,0.08)] transition transform hover:-translate-y-1 hover:shadow-xl">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16" data-reveal style={{ background: 'radial-gradient(circle at 20% 20%, rgba(58,122,76,0.08), transparent 35%), #fdfaf4' }}>
        <div className="mx-auto max-w-5xl text-center space-y-6 pt-6">
          <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Goal</h2>
          <p className="text-lg leading-relaxed text-[var(--color-brand-muted)]">{goal}</p>
        </div>
      </section>
    </main>
  );
}
