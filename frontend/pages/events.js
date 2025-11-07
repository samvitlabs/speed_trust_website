import { useState, useEffect } from 'react';
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
    <main className="bg-[#F9F9F9] text-slate-900">
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
          <h2 className="text-3xl font-bold text-[#2C5F2D]">Collective journeys for ecological justice</h2>
          <p className="mt-4 text-base text-slate-600">
            From riparian clean-ups to maker festivals, Speed Trust gatherings blend science, indigenous wisdom, art, and policy action so every participant returns home as an ambassador for the Western Ghats.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Completed Events</p>
                <h3 className="text-3xl font-semibold text-slate-900">What we accomplished together</h3>
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {completedEvents.map((event) => (
                <article key={event.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                    role="img"
                    aria-label={`${event.title} image`}
                  />
                  <div className="space-y-3 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#2C5F2D]">
                      {event.date} • {event.location}
                    </p>
                    <h4 className="text-xl font-semibold text-slate-900">{event.title}</h4>
                    <p className="text-sm text-slate-600">{event.summary}</p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-[#2C5F2D]"
                    >
                      Learn More
                      <span className="ml-2" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Upcoming</p>
              <h3 className="text-2xl font-semibold text-slate-900">Join the next wave</h3>
            </div>
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.slug} className="rounded-xl border border-slate-100 bg-brand-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2C5F2D]">{event.date}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{event.title}</p>
                  <p className="text-sm text-slate-500">{event.location}</p>
                  <p className="mt-2 text-sm text-slate-600">{event.summary}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-3 inline-flex items-center text-sm font-semibold text-[#2C5F2D]"
                  >
                    Learn More
                    <span className="ml-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
