import { useState } from 'react';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Volunteers planting native saplings along a stream',
    caption: 'Riparian planting drive in Sengottai',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534291571-a029db8c74c3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Students observing soil microbes through microscopes',
    caption: 'Living Soils mobile lab workshop',
  },
  {
    src: 'https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Women weaving colorful installations for a festival',
    caption: 'Riparian weave festival art build',
  },
  {
    src: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80',
    alt: 'Forest trail with community guides',
    caption: 'Forest commons learning walk',
  },
  {
    src: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wetland with birds at sunrise',
    caption: 'Wetland monitoring at Tamarai marsh',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474203909-7f1481f54c1d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Students collaborating on water model',
    caption: 'Blue Schools climate lab',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Volunteers trekking across hills with survey gear',
    caption: 'Watershed guardians field trek',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187858650-f581b0b0f076?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hands holding soil seedlings',
    caption: 'Nursery propagation training',
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const moveLightbox = (direction) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const nextIndex = (prev + direction + galleryItems.length) % galleryItems.length;
      return nextIndex;
    });
  };

  const moveMobile = (direction) => {
    setMobileIndex((prev) => (prev + direction + galleryItems.length) % galleryItems.length);
  };

  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#458C96]">Gallery</p>
          <h1 className="mt-4 text-4xl font-bold">Stories from the Western Ghats</h1>
          <p className="mt-4 text-base text-slate-600">
            Glimpses from restoration drives, youth fellowships, and learning labs co-created with communities across Southern Pothigai landscapes.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 md:hidden">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
          {galleryItems.map((item, index) => (
            <div
              key={item.src}
              className={`absolute inset-0 transition-opacity duration-500 ${index === mobileIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <button
                type="button"
                className="h-full w-full"
                onClick={() => openLightbox(index)}
                aria-label={`Open image ${index + 1}`}
              >
                <img src={item.src} alt={item.alt} className="h-80 w-full rounded-3xl object-cover" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-black/60 p-4 text-white">
                <p className="text-sm font-semibold">{item.caption}</p>
                <p className="text-xs text-white/70">{item.alt}</p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => moveMobile(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => moveMobile(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={`mobile-dot-${index}`}
                type="button"
                className={`h-2.5 w-2.5 rounded-full ${index === mobileIndex ? 'bg-white' : 'bg-white/40'}`}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setMobileIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hidden px-6 pb-16 md:block">
        <div className="mx-auto max-w-6xl">
          <div className="columns-2 gap-4 lg:columns-3">
            {galleryItems.map((item, index) => (
              <figure
                key={item.src}
                className="mb-4 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm break-inside-avoid"
              >
                <button type="button" className="w-full" onClick={() => openLightbox(index)}>
                  <img src={item.src} alt={item.alt} className="w-full object-cover" />
                </button>
                <figcaption className="p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.caption}</p>
                  <p className="text-xs text-slate-500">{item.alt}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-white"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            ✕
          </button>
          <button
            type="button"
            className="absolute left-6 text-white"
            onClick={() => moveLightbox(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="max-h-[90vh] max-w-4xl">
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              className="max-h-[80vh] w-full rounded-3xl object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="text-lg font-semibold">{galleryItems[lightboxIndex].caption}</p>
              <p className="text-sm text-white/70">{galleryItems[lightboxIndex].alt}</p>
            </div>
          </div>
          <button
            type="button"
            className="absolute right-6 text-white"
            onClick={() => moveLightbox(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
