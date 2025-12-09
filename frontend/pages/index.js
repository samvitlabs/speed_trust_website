import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SEO from '../components/SEO';
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
    <>
      <SEO
        title="SPEED Trust - Environmental Sustainability & Youth Empowerment in South India"
        description="Southern Pothigai Environmental and Educational Development Trust promotes environmental protection, tree plantation, rural youth skill development, and sustainable agriculture across Tamil Nadu."
        canonical="/"
      />
      <main className="bg-white text-[var(--color-brand-text-dark)]">
        <section className="relative overflow-hidden bg-cover bg-center hero-fade" data-reveal>
          {heroSlides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-700 ${index === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              aria-hidden={index !== heroIndex}
            >
              <Image
                src={slide}
                alt={`SPEED Trust initiative ${index + 1}`}
                fill
                priority={index === 0}
                quality={85}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60 z-20" />
        <div className="relative z-30 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-white)]">SPEED Trust</p>
          <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Southern Pothigai Environmental and Educational Development (SPEED) Trust
          </h1>
          <p className="max-w-3xl text-lg text-white">
            Promoting environmental sustainability, value-based education, and livelihood development across South India.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="rounded-full bg-[var(--color-brand-pink)] px-6 py-3 text-base font-semibold text-white transition transform hover:scale-105 hover:shadow-lg hover:bg-[var(--color-brand-pink-bright)]"
            >
              Learn More
            </Link>
            <Link
              href="/our-work"
              className="rounded-full bg-[var(--color-brand-pink)] px-6 py-3 text-base font-semibold text-white transition transform hover:scale-105 hover:shadow-lg hover:bg-[var(--color-brand-pink-bright)]"
            >
              Our Work
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-30">
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
          <h2 className="text-3xl font-bold text-[var(--color-brand-teal)]">About SPEED Trust</h2>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-pink)]">Who we are</p>
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
            <h2 className="text-3xl font-bold text-[var(--color-brand-teal)]">Focus Highlights</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-pink)]">What we prioritize</p>
          </div>
          <div className="space-y-12">
            {focusHighlights.map((item, idx) => (
              <article
                key={item.title}
                data-reveal
                className={`flex flex-col gap-6 lg:items-center lg:gap-10 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-1/2 w-full overflow-hidden rounded-3xl shadow-[0_10px_28px_rgba(12,28,20,0.18)] relative h-64 sm:h-72 lg:h-80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    quality={85}
                  />
                </div>
                <div className="lg:w-1/2 w-full space-y-3 text-left">
                  <h3 className="text-2xl font-bold text-[var(--color-brand-teal)]">{item.title}</h3>
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
            <h2 className="text-3xl font-bold text-[var(--color-brand-teal)]">Impact Targets</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-pink)]">Where we are heading</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactTargets.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="rounded-2xl border border-[var(--color-brand-green)]/12 bg-[var(--color-surface-warm)] px-5 py-6 text-center text-base font-semibold text-[var(--color-brand-muted)] shadow-[0_12px_30px_rgba(12,28,20,0.08)] transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
