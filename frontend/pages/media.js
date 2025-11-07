import { useMemo } from 'react';
import useCyclingIndex from '../hooks/useCyclingIndex';
import { chunkArray } from '../utils/array';

const mediaSlides = [
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534291571-a029db8c74c3?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469474203909-7f1481f54c1d?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1451187858650-f581b0b0f076?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469474816006-0176045eaa4c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534621370-158a17f03b89?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
];

const publications = [
  {
    title: 'Annual Report 2023–24',
    summary: 'Impact metrics, financials, and narratives from watershed, education, and enterprise programs.',
    link: '#',
  },
  {
    title: 'Community Consultation Toolkit',
    summary: 'Templates and facilitation guides for panchayats hosting ecology-led dialogues.',
    link: '#',
  },
  {
    title: 'Entrepreneurship Playbook',
    summary: 'Case studies and checklists for regenerative business incubation with rural partners.',
    link: '#',
  },
];

export default function Media() {
  const slides = useMemo(() => chunkArray(mediaSlides, 3), []);
  const { index, cycle, goTo } = useCyclingIndex(slides.length, 6000);

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Media</p>
          <h1 className="text-4xl font-bold">Fieldwork in Motion</h1>
          <p className="text-base text-[var(--color-brand-muted)]">
            A living reel of rivers, classrooms, and makers that shape Southern Pothigai stories, along with the
            publications that chronicle them.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="relative mx-auto max-w-6xl">
          <button
            type="button"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-3 text-white backdrop-blur md:flex"
            onClick={() => cycle(-1)}
            aria-label="Previous media slide"
          >
            ‹
          </button>
          <div className="overflow-hidden rounded-[48px] border border-white/40 bg-white/10 shadow-[0_40px_70px_rgba(12,28,20,0.18)] backdrop-blur">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((group, slideIndex) => (
                <div key={`media-slide-${slideIndex}`} className="flex w-full flex-shrink-0 gap-4 p-4">
                  {group.map((src) => (
                    <div
                      key={src}
                      className="h-72 flex-1 rounded-3xl bg-cover bg-center shadow-[0_25px_45px_rgba(12,28,20,0.25)]"
                      style={{ backgroundImage: `url(${src})` }}
                      role="img"
                      aria-label="Media highlight"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-3 text-white backdrop-blur md:flex"
            onClick={() => cycle(1)}
            aria-label="Next media slide"
          >
            ›
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, dotIndex) => (
              <button
                key={`media-dot-${dotIndex}`}
                type="button"
                onClick={() => goTo(dotIndex)}
                className={`h-2.5 w-8 rounded-full ${
                  dotIndex === index ? 'bg-[var(--color-brand-green)]' : 'bg-slate-300'
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
                aria-pressed={dotIndex === index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-[var(--color-brand-slate)] text-center">Reports &amp; Toolkits</h2>
          <div className="space-y-4">
            {publications.map((doc) => (
              <details
                key={doc.title}
                className="group overflow-hidden rounded-[32px] border border-[var(--color-brand-green)]/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(12,28,20,0.08)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left">
                  <h3 className="text-xl font-semibold text-[var(--color-brand-slate)]">{doc.title}</h3>
                  <span className="text-2xl text-[var(--color-brand-green)] transition group-open:rotate-45">+</span>
                </summary>
                <div className="mt-3 space-y-3 border-t border-[var(--color-brand-green)]/10 pt-4 text-sm text-[var(--color-brand-muted)]">
                  <p>{doc.summary}</p>
                  <a href={doc.link} className="cta-primary inline-flex" target="_blank" rel="noreferrer">
                    Download
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
