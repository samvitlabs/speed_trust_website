import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

const services = [
  'Soil Testing & Crop Advisory',
  'Horticulture Consultancy & Farm Planning',
  'Advisory on Quality Seeds and Organic Pesticides',
  'Facilitation of Refinance & Low-Interest Financial Assistance',
  'Technical Guidance for Agro-Processing & Value Addition',
  'Automation & Quality Segregation Advice',
  'Training & Capacity Building for Youth & Farmers',
  'Solid & Liquid Waste Management',
  'Structural Consultancy for Environmental Infrastructure',
  'Technical Design for Eco-friendly Civil Structures',
  'Monitoring, Auditing & Environmental Compliance Support',
];

export default function Services() {
  useReveal();

  return (
    <>
      <SEO
        title="Services - Agricultural & Environmental Consultancy | SPEED Trust"
        description="SPEED Trust offers soil testing, crop advisory, horticulture consultancy, technical training, environmental compliance, and sustainable agriculture services across South India."
        canonical="/services"
      />
      <main className="bg-white text-[var(--color-brand-text-dark)]">
      <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/advisory.png')" }} data-reveal>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-5xl flex-col justify-center gap-3 px-6 py-16 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-white)]">Services Offered</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Practical support for communities and farmers</h1>
          <p className="text-lg text-white">Specialized advisory and training to unlock sustainable growth.</p>
        </div>
      </section>

      <section className="px-6 py-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-brand-teal)]">Services</h2>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-pink)]">How we help</p>

          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                data-reveal
                className="surface-card rounded-2xl px-6 py-5 text-base font-semibold text-[var(--color-brand-slate)] transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
