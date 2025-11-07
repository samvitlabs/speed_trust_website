import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

const pastEventSlides = [
  {
    title: 'Sembar River Revival Drive',
    description: 'Volunteers, fisherfolk, and students removed invasive weeds and planted native grasses along the banks.',
    image: 'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Living Soil Discovery Lab',
    description: 'Farm collectives explored compost teas, microbial microscopy, and regenerative crop planning.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Tamarai Wetland Day',
    description: 'Citizen scientists mapped bird sightings and curated an outdoor exhibit on wetland folklore.',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Green Corridors Bicycle Rally',
    description: 'Youth fellows cycled 60 km to document sacred groves and interview elders about seed saving.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Forest-Edge Story Circle',
    description: 'Art educators and storytellers held a dusk gathering to archive oral histories of the Ghats.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
];

const completedEvents = [
  {
    title: 'Watershed Guardians Residency',
    date: 'May 2024',
    location: 'Courtallam',
    summary: 'Six-month field labs covering hydrology, GIS, and Panchayat facilitation for 38 fellows.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    slug: 'watershed-guardians-residency',
  },
  {
    title: 'Eco-Edu Hackathon',
    date: 'March 2024',
    location: 'Tenkasi',
    summary: 'Educators reimagined curriculum kits using indigenous stories, robotics, and citizen science.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    slug: 'eco-edu-hackathon',
  },
  {
    title: 'Riparian Weave Festival',
    date: 'January 2024',
    location: 'Ambasamudram',
    summary: 'Weaving cooperatives and youth created public art installations narrating river care traditions.',
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=900&q=80',
    slug: 'riparian-weave-festival',
  },
  {
    title: 'Agroforestry Learning Walks',
    date: 'November 2023',
    location: 'Punalur belt',
    summary: 'Farmers explored multilayer polyculture plots and designed smallholder transition plans.',
    image: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=80',
    slug: 'agroforestry-learning-walks',
  },
  {
    title: 'Community Air Quality Lab',
    date: 'October 2023',
    location: 'Shencottai',
    summary: 'Makerspaces prototyped low-cost sensors and visual dashboards for school air audits.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    slug: 'community-air-quality-lab',
  },
];

const upcomingEvents = [
  {
    title: 'Sacred Groves Listening Camp',
    date: 'August 18, 2024',
    location: 'Kalakkad',
    summary: 'Co-creating interpretive trails with elders and nature clubs.',
    slug: 'sacred-groves-listening-camp',
  },
  {
    title: 'Blue Schools Exchange',
    date: 'September 9, 2024',
    location: 'Multiple campuses',
    summary: 'Students prototype water stewardship projects and share toolkits.',
    slug: 'blue-schools-exchange',
  },
  {
    title: 'Climate Justice Story Lab',
    date: 'October 2, 2024',
    location: 'Tirunelveli',
    summary: 'Artists mentor youth to craft audio walks about frontline defenders.',
    slug: 'climate-justice-story-lab',
  },
];

export default function Events() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [page, setPage] = useState(0);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(completedEvents.length / eventsPerPage);

  const paginatedEvents = useMemo(() => {
    const start = page * eventsPerPage;
    return completedEvents.slice(start, start + eventsPerPage);
  }, [page]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % pastEventSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideNav = (direction) => {
    setSlideIndex((prev) => (prev + direction + pastEventSlides.length) % pastEventSlides.length);
  };

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {pastEventSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-hidden={index !== slideIndex}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full items-end px-6 pb-12 text-white">
              <div className="max-w-3xl space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Past Events</p>
                <h1 className="text-3xl font-bold sm:text-4xl">{slide.title}</h1>
                <p className="text-base text-white/80">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="absolute left-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 p-3 text-white backdrop-blur md:flex"
          onClick={() => handleSlideNav(-1)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 p-3 text-white backdrop-blur md:flex"
          onClick={() => handleSlideNav(1)}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {pastEventSlides.map((_, index) => (
            <button
              key={`slide-dot-${index}`}
              type="button"
              onClick={() => setSlideIndex(index)}
              className={`h-3 w-3 rounded-full ${index === slideIndex ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === slideIndex}
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-brand-green)]">Collective journeys for ecological justice</h2>
          <p className="mt-4 text-base text-slate-600">
            From riparian clean-ups to maker festivals, Speed Trust gatherings blend science, indigenous wisdom, art, and policy action so every participant returns home as an ambassador for the Western Ghats.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_1.3fr]">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Completed Events</p>
                <h3 className="text-3xl font-semibold text-slate-900">What we accomplished together</h3>
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {paginatedEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-green)]"
                >
                  <div
                    className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${event.image})` }}
                    role="img"
                    aria-label={`${event.title} image`}
                  />
                  <div className="space-y-3 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-green)]">
                      {event.date} • {event.location}
                    </p>
                    <h4 className="text-xl font-semibold text-slate-900">{event.title}</h4>
                    <p className="text-sm text-slate-600">{event.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="rounded-full border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === 0}
              >
                Prev
              </button>
              <span className="text-slate-500">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                className="rounded-full border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>

          <aside className="rounded-[32px] border border-[var(--color-brand-green)]/15 bg-white/90 p-6 text-[var(--color-brand-slate)] shadow-[0_25px_45px_rgba(12,28,20,0.08)] backdrop-blur">
            <div className="space-y-2 text-left">
              <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]/80">Upcoming</p>
              <h3 className="text-2xl font-semibold text-[var(--color-brand-green)]">Join the next wave</h3>
            </div>
            <div className="mt-4 space-y-5">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.slug}
                  className="space-y-3 rounded-2xl border border-[var(--color-brand-green)]/10 bg-[var(--color-brand-cream)]/70 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-green)]/70">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-green)]/10 text-sm text-[var(--color-brand-green)]">
                      {index + 1}
                    </span>
                    <span className="font-sans text-[0.9rem] tracking-[0.2em] text-[var(--color-brand-green)]">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-[var(--color-brand-slate)]">{event.title}</p>
                  <p className="text-sm text-[var(--color-brand-muted)]">{event.location}</p>
                  <p className="text-sm text-[var(--color-brand-muted)]">{event.summary}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
