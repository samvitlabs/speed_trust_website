import { useEffect, useState } from 'react';
import Link from 'next/link';
import useReveal from '../hooks/useReveal';

const heroSlides = [
                '/images/about/reforestation.png',
                '/images/about/cleaning.png',
                '/images/about/workshop.png',
                '/images/about/advisory.png',
                '/images/about/awareness.png',
                '/images/about/new_practices.png'

    ];
const focusHighlights = [
  {
    title: 'Environmental Protection & Ecosystem Restoration',
    description: 'Tree plantations, waterbody rejuvenation, and habitat conservation that restore ecological balance.',
    image: '/images/about/cleaning.png',
  },
  {
    title: 'Skill Development & Youth Empowerment',
    description: 'Training, mentorship, and placements that help rural youth build sustainable careers.',
    image: '/images/about/workshop.png',
  },
  {
    title: 'Sustainable Agriculture & Technological Integration',
    description: 'Tech-enabled advisory for farmers to improve yields while protecting soil and water.',
    image: '/images/about/advisory.png',
  },
  {
    title: 'Community Awareness & Value-Based Education',
    description: 'Campaigns and learning programs that build climate consciousness and responsible practices.',
    image: '/images/about/awareness.png',
  },
];

const impactTargets = [
  { title: 'Plant and nurture 1 million trees' },
  { title: 'Train 10,000 rural youth' },
  { title: 'Rejuvenate 100+ water bodies' },
  { title: 'Establish sustainable livelihood clusters' },
];

export default function Home() {
  useReveal();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative overflow-hidden bg-cover bg-center hero-fade" data-reveal>
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-700 ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${slide}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-hidden={index !== heroIndex}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">SPEED Trust</p>
          <h1 className="max-w-4xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Southern Pothigai Environmental and Educational Development (SPEED) Trust
          </h1>
          <p className="max-w-3xl text-lg text-white/85">
            Promoting environmental sustainability, value-based education, and livelihood development across South India.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="rounded-full bg-[var(--color-brand-coral)] px-6 py-3 text-base font-semibold text-white transition transform hover:scale-105 hover:shadow-lg hover:bg-white/10"
            >
              Learn More
            </Link>
            <Link
              href="/our-work"
              className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[var(--color-brand-slate)] transition transform hover:scale-105 hover:shadow-lg hover:bg-white/80"
            >
              Our Work
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setHeroIndex(index)}
              className={`h-3 w-3 rounded-full transition ${index === heroIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-16" data-reveal>
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <h2 className="text-3xl font-bold text-[var(--color-brand-slate)]">About SPEED Trust</h2>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Who we are</p>
          <p className="text-lg leading-relaxed text-[var(--color-brand-slate)]">
            SPEED Trust is a non-profit organization managed by senior professionals in environmental management, technical
            consultancy, and community development. The Trust focuses on environmental protection, rural youth skill development,
            and sustainable agriculture through technology-driven solutions.
          </p>
        </div>
      </section>

      <div className="mx-auto mb-12 h-px w-11/12 max-w-5xl bg-black/10 shadow-[0_10px_24px_rgba(0,0,0,0.08)]" data-reveal aria-hidden />

      <section className="px-6 pb-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-brand-slate)]">Focus Highlights</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">What we prioritize</p>
          </div>
          <div className="space-y-12">
            {focusHighlights.map((item, idx) => (
              <article
                key={item.title}
                data-reveal
                className={`flex flex-col gap-6 lg:items-center lg:gap-10 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-1/2 w-full overflow-hidden rounded-3xl shadow-[0_10px_28px_rgba(12,28,20,0.18)]">
                  <div
                    className="h-64 w-full bg-cover bg-center sm:h-72 lg:h-80"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    aria-label={item.title}
                  />
                </div>
                <div className="lg:w-1/2 w-full space-y-3 text-left">
                  <h3 className="text-2xl font-bold text-[var(--color-brand-slate)]">{item.title}</h3>
                  <p className="text-base leading-relaxed text-[var(--color-brand-muted)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto mb-12 h-px w-11/12 max-w-5xl bg-black/10 shadow-[0_10px_24px_rgba(0,0,0,0.08)]" data-reveal aria-hidden />

      <section className="px-6 pb-16" data-reveal>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-brand-slate)]">Impact Targets</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Where we are heading</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactTargets.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="rounded-2xl border border-[var(--color-brand-green)]/12 bg-[var(--color-surface-warm)] px-5 py-6 text-center text-base font-semibold text-[var(--color-brand-slate)] shadow-[0_12px_30px_rgba(12,28,20,0.08)] transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
