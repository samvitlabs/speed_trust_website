import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCyclingIndex from '../hooks/useCyclingIndex';
import newsData from '../data/news';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Working with Western Ghats communities to restore forests, rivers, and livelihoods.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Hands-on eco-literacy labs that bring science, indigenous knowledge, and art together.',
  },
  {
    image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Training educators, farmers, and youth to champion regenerative futures.',
  },
];

const alternatingSections = [
  {
    title: 'Events',
    copy:
      'Seasonal treks, clean-up drives, and data jams connect volunteers with field scientists to co-create local climate action.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    cta: '/events',
  },
  {
    title: 'Courses',
    copy:
      'From micro-credentials to year-long fellowships, our courses blend agroecology, indigenous knowledge, and maker education.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    cta: '/courses',
  },
  {
    title: 'Expert Guidance',
    copy:
      'Institutions tap our advisory pods for watershed planning, carbon baselining, and community engagement toolkits.',
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80',
    cta: '/guidance',
  },
];

const impactMetrics = [
  { label: 'Native Trees Planted', value: 180000, suffix: '+' },
  { label: 'Rivers & Streams Revived', value: 14, suffix: '' },
  { label: 'Courses Delivered', value: 120, suffix: '+' },
];

const partnerLogos = [
  { name: 'IIT Madras CSR', logo: '/images/partners/iit-madras.svg' },
  { name: 'ATREE', logo: '/images/partners/atree.svg' },
  { name: 'TNAU', logo: '/images/partners/tnau.svg' },
  { name: 'Azim Premji University', logo: '/images/partners/azim-premji.svg' },
  { name: 'Keystone Foundation', logo: '/images/partners/keystone.svg' },
  { name: 'IUCN India', logo: '/images/partners/iucn.svg' },
];

const teamMembers = [
  {
    name: 'Dr. Lalitha Nadarajan',
    role: 'Founder & Ecologist',
    bio: 'Forest hydrologist with 18 years of watershed restoration work across the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Arvind Seshadri',
    role: 'Programs Director',
    bio: 'Designs immersive curricula blending ethnobotany, systems thinking, and maker education.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Parvathi Raj',
    role: 'Community Partnerships',
    bio: 'Facilitates panchayat alliances and youth fellowships across five districts.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sameer Khan',
    role: 'Impact & Data Lead',
    bio: 'Tracks ecological baselines and builds open data dashboards for shared accountability.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Kavya Menon',
    role: 'Learning Experience Lead',
    bio: 'Architects playful learning journeys that connect classrooms with field labs.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Ravi Subramanian',
    role: 'Operations & Logistics',
    bio: 'Keeps our mobile labs, nurseries, and maker vans humming across three states.',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Mira Thomas',
    role: 'Storytelling Lead',
    bio: 'Transforms monitoring data into accessible narratives for donors and communities.',
    image: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dhanush Kumar',
    role: 'Field Technologist',
    bio: 'Deploys IoT sensors and open-source dashboards for watershed guardians.',
    image: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=600&q=80',
  },
];

const testimonials = [
  {
    name: 'Bhavana Devi',
    role: 'Teacher Fellow, Tirunelveli',
    message:
      'The fellowship reframed my science classroom—students now map soil microbes and document native lore with grandparents.',
  },
  {
    name: 'Nikhil Krishnan',
    role: 'Watershed Cohort Alum',
    message:
      'Mentors helped us build an aquifer atlas that convinced our panchayat to invest in recharge wells.',
  },
  {
    name: 'Sahana Iyer',
    role: 'Design Strategist, Partner Org',
    message:
      'Speed Trust translates complex field data into narratives communities can own and celebrate.',
  },
  {
    name: 'Farmer Producer Co-op, Sengottai',
    role: 'Course Participant',
    message:
      'Our growers shifted to regenerative rotations after the mobile lab demystified soil testing.',
  },
  {
    name: 'Dr. Rahul Menon',
    role: 'Hydrologist Mentor',
    message:
      'They connect academia with local stewards better than any organization I have mentored.',
  },
  {
    name: 'Ayesha Parameshwar',
    role: 'Youth Fellow',
    message:
      'I found my purpose working on riparian storytelling projects that center indigenous voices.',
  },
];

const testimonialSlides = chunkArray(testimonials, 3);
const teamSlides = chunkArray(teamMembers, 4);

function chunkArray(items, size) {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

function AnimatedCounter({ value, duration = 1500, trigger = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trigger === 0) {
      return undefined;
    }

    let frame;
    setCount(0);
    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, trigger]);

  const formatted = useMemo(() => new Intl.NumberFormat('en-IN').format(count), [count]);
  return formatted;
}

export default function Home() {
  const [newsItems, setNewsItems] = useState(newsData);
  const newsSlides = useMemo(() => (newsItems.length ? chunkArray(newsItems, 3) : []), [newsItems]);
  const highlightRefs = useRef([]);
  const impactRef = useRef(null);
  const [impactTrigger, setImpactTrigger] = useState(0);

  const { index: heroIndex, goTo: goToHero } = useCyclingIndex(heroSlides.length, 6000);
  const {
    index: newsIndex,
    cycle: cycleNews,
    goTo: goToNews,
  } = useCyclingIndex(Math.max(newsSlides.length, 1), 0);
  const {
    index: testimonialIndex,
    cycle: cycleTestimonial,
    goTo: goToTestimonial,
  } = useCyclingIndex(testimonialSlides.length, 7000);
  const { index: teamIndex, goTo: goToTeam } = useCyclingIndex(teamSlides.length, 6000);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const payload = await response.json();
        if (isMounted && Array.isArray(payload.news)) {
          setNewsItems(payload.news);
        }
      } catch (error) {
        console.error('Unable to load news items', error);
      }
    };

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (newsSlides.length && newsIndex >= newsSlides.length) {
      goToNews(0);
    }
  }, [newsIndex, newsSlides.length, goToNews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    highlightRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = impactRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImpactTrigger((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleNewsNav = (direction) => {
    if (newsSlides.length <= 1) return;
    cycleNews(direction);
  };

  const handleTestimonialNav = (direction) => cycleTestimonial(direction);

  return (
    <main className="bg-[var(--color-brand-cream)] text-slate-900">
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden fade-in-up">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.tagline}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === heroIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-hidden={index !== heroIndex}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white fade-in-up" aria-live={index === heroIndex ? 'polite' : 'off'}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Western Ghats Stewardship</p>
              <h1 className="mt-4 max-w-4xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                Southern Pothigai Environmental and Educational Trust
              </h1>
              <p className="mt-6 max-w-3xl text-base text-white/80 sm:text-lg">{slide.tagline}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="rounded-full bg-[var(--color-brand-coral)] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/impact"
                  className="rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View Impact Stories
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              onClick={() => goToHero(index)}
              className={`h-3 w-3 rounded-full ${index === heroIndex ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to hero slide ${index + 1}`}
              aria-pressed={index === heroIndex}
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-16 fade-in-up">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">News &amp; Updates</h2>
        </div>
        <div className="relative mx-auto mt-10 max-w-6xl">
          <button
            type="button"
            onClick={() => handleNewsNav(-1)}
            className={`absolute left-0 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-lg transition ${
              newsSlides.length <= 1 ? 'cursor-not-allowed opacity-30' : 'hover:bg-white'
            }`}
            aria-label="Previous news story"
            disabled={newsSlides.length <= 1}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => handleNewsNav(1)}
            className={`absolute right-0 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-lg transition ${
              newsSlides.length <= 1 ? 'cursor-not-allowed opacity-30' : 'hover:bg-white'
            }`}
            aria-label="Next news story"
            disabled={newsSlides.length <= 1}
          >
            ›
          </button>

          {newsSlides.length ? (
            <div className="overflow-hidden rounded-3xl bg-transparent">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${newsIndex * 100}%)` }}
              >
                {newsSlides.map((slide, slideIndex) => (
                  <div key={`news-slide-${slideIndex}`} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {slide.map((item) => (
                        <article key={item.id} className="h-full">
                          <div className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="h-48 w-full overflow-hidden">
                              <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${item.image})` }}
                                role="img"
                                aria-label={item.title}
                              />
                            </div>
                            <div className="space-y-3 px-6 py-6">
                              <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">{item.date}</p>
                              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                              <p className="text-base text-slate-600">{item.summary}</p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-slate-500">News updates coming soon.</p>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-16 fade-in-up">
        <div className="mx-auto max-w-6xl space-y-16">
          {alternatingSections.map((section, index) => (
            <article
              key={section.title}
              ref={(element) => {
                if (element) {
                  highlightRefs.current[index] = element;
                }
              }}
              className={`reveal-card flex flex-col gap-10 lg:flex-row lg:items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-semibold text-slate-900">{section.title}</h3>
                <p className="text-base text-slate-600">{section.copy}</p>
                <Link
                  href={section.cta}
                  className="inline-flex items-center rounded-full bg-[var(--color-brand-green)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:-translate-y-0.5"
                >
                  Learn More
                  <span className="ml-2" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
              <div className="flex-1 overflow-hidden rounded-3xl shadow-lg">
                <div
                  className="h-72 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${section.image})` }}
                  role="img"
                  aria-label={`${section.title} visual`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={impactRef} className="px-6 py-16 fade-in-up">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-1"
              style={{ '--animation-delay': `${index * 60}ms` }}
            >
              <p className="text-4xl font-bold text-[var(--color-brand-green)]">
                <AnimatedCounter value={metric.value} trigger={impactTrigger} />
                {metric.suffix}
              </p>
              <p className="mt-3 text-sm uppercase tracking-wide text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 fade-in-up">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">Partners</h2>
          <div className="mt-12 overflow-hidden">
            <div className="partner-marquee flex min-w-full gap-8" aria-label="Partner logos marquee">
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-cream)] shadow-sm"
                >
                  <Image src={partner.logo} alt={partner.name} width={160} height={64} className="h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .partner-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </section>

      <section className="bg-[var(--color-brand-cream)] px-6 py-16 fade-in-up">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">Our Team</h2>
          <p className="mt-3 text-base text-slate-600">
            Multidisciplinary educators, ecologists, technologists, and community champions.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-6xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${teamIndex * 100}%)` }}
            >
              {teamSlides.map((slide, slideIndex) => (
                <div key={`team-slide-${slideIndex}`} className="w-full flex-shrink-0 px-2">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {slide.map((member) => (
                      <article
                        key={member.name}
                        className="rounded-3xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${member.image})` }}
                            role="img"
                            aria-label={member.name}
                          />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h3>
                        <p className="text-sm font-medium text-[var(--color-brand-green)]">{member.role}</p>
                        <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {teamSlides.map((_, index) => (
              <button
                key={`team-dot-${index}`}
                type="button"
                onClick={() => goToTeam(index)}
                className={`h-2.5 w-8 rounded-full ${
                  index === teamIndex ? 'bg-[var(--color-brand-green)]' : 'bg-slate-200'
                }`}
                aria-label={`Go to team slide ${index + 1}`}
                aria-pressed={index === teamIndex}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 fade-in-up">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">Testimonials</h2>
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleTestimonialNav(-1)}
              className="hidden rounded-full border border-slate-300 p-3 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] sm:flex"
              aria-label="Previous testimonial slide"
            >
              ‹
            </button>
            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {testimonialSlides.map((slide, slideIndex) => (
                  <div key={`testimonial-slide-${slideIndex}`} className="w-full flex-shrink-0 px-1">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {slide.map((testimonial, index) => (
                        <article
                          key={testimonial.name}
                          className="rounded-3xl bg-[var(--color-brand-cream)] p-6 text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1"
                          style={{ '--animation-delay': `${index * 60}ms` }}
                        >
                          <p className="text-base text-slate-600">“{testimonial.message}”</p>
                          <p className="mt-4 text-base font-semibold text-slate-900">{testimonial.name}</p>
                          <p className="text-sm text-slate-500">{testimonial.role}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleTestimonialNav(1)}
              className="hidden rounded-full border border-slate-300 p-3 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] sm:flex"
              aria-label="Next testimonial slide"
            >
              ›
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonialSlides.map((_, index) => (
              <button
                key={`testimonial-dot-${index}`}
                type="button"
                onClick={() => goToTestimonial(index)}
                className={`h-2.5 w-8 rounded-full ${index === testimonialIndex ? 'bg-[var(--color-brand-green)]' : 'bg-slate-200'}`}
                aria-label={`Go to testimonial slide ${index + 1}`}
                aria-pressed={index === testimonialIndex}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
