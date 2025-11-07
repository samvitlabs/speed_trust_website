import { useState } from 'react';
import events from '../../data/events.json';

const formatICSDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const generateICSDataUri = (event) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Southern Pothigai Trust//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.slug}@southernpothigai.org`,
    `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
    event.startDate ? `DTSTART:${formatICSDate(event.startDate)}` : '',
    event.endDate ? `DTEND:${formatICSDate(event.endDate)}` : '',
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);

  return `data:text/calendar;charset=utf8,${encodeURIComponent(lines.join('\r\n'))}`;
};

const GalleryCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return null;
  }

  const goTo = (direction) => {
    setCurrent((prev) => (prev + direction + images.length) % images.length);
  };

  return (
    <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-200">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden={index !== current}
        >
          <span className="sr-only">Gallery image {index + 1}</span>
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      <div className="relative z-10 flex h-full items-center justify-between px-4">
        <button
          type="button"
          className="pointer-events-auto hidden rounded-full border border-white/50 bg-white/10 p-3 text-white backdrop-blur md:flex"
          onClick={() => goTo(-1)}
          aria-label="Previous gallery image"
        >
          ‹
        </button>
        <button
          type="button"
          className="pointer-events-auto hidden rounded-full border border-white/50 bg-white/10 p-3 text-white backdrop-blur md:flex"
          onClick={() => goTo(1)}
          aria-label="Next gallery image"
        >
          ›
        </button>
      </div>
      <div className="relative z-10 flex justify-center gap-2 pb-4">
        {images.map((_, index) => (
          <button
            key={`gallery-dot-${index}`}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-8 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`View gallery image ${index + 1}`}
            aria-pressed={index === current}
          />
        ))}
      </div>
    </div>
  );
};

export default function EventDetail({ event }) {
  const icsHref = generateICSDataUri(event);

  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section
        className="relative h-[60vh] min-h-[420px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${event.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-end px-6 pb-12">
          <div className="max-w-4xl text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Speed Trust Event</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{event.title}</h1>
            <p className="mt-4 text-lg text-white/80">
              {event.location} • {event.date}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_1fr]">
          <article className="space-y-6">
            <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Overview</p>
            <p className="text-lg leading-relaxed text-slate-700">{event.description}</p>
            <GalleryCarousel images={event.gallery} />
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-[#2C5F2D]">Participate</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Be part of the next edition</h2>
            <p className="mt-4 text-sm text-slate-600">
              We welcome volunteers, storytellers, and field researchers to co-create every gathering.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://forms.gle/placeholder"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#D93B3B] px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#b33030]"
              >
                Join Volunteer
              </a>
              <a
                href={icsHref}
                download={`${event.slug}.ics`}
                className="rounded-full border border-[#2C5F2D] px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#2C5F2D] transition hover:bg-[#2C5F2D] hover:text-white"
              >
                Add to Calendar
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: events.map((event) => ({ params: { slug: event.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const event = events.find((item) => item.slug === params.slug);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event,
    },
  };
}
