import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

// Event photos from photos subfolder
const eventPhotos = [
  { src: '/images/media/photos/3.jpeg', alt: 'SPEED Trust Event 1', id: 1 },
  { src: '/images/media/photos/4.jpeg', alt: 'SPEED Trust Event 2', id: 2 },
  { src: '/images/media/photos/5.jpeg', alt: 'SPEED Trust Event 3', id: 3 },
  { src: '/images/media/photos/6.jpeg', alt: 'SPEED Trust Event 4', id: 4 },
  { src: '/images/media/photos/7.jpeg', alt: 'SPEED Trust Event 5', id: 5 },
  { src: '/images/media/photos/10.jpeg', alt: 'SPEED Trust Event 6', id: 6 },
];

// News articles from news subfolder
const newsArticles = [
  { src: '/images/media/news/1.jpeg', alt: 'SPEED Trust News Article 1', id: 1 },
  { src: '/images/media/news/2.jpeg', alt: 'SPEED Trust News Article 2', id: 2 },
  { src: '/images/media/news/8.jpeg', alt: 'SPEED Trust News Article 3', id: 3 },
  { src: '/images/media/news/9.jpeg', alt: 'SPEED Trust News Article 4', id: 4 },
];

// Reusable Carousel Component
function MediaCarousel({ images, title, subtitle, aspectRatio = "aspect-video" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  }, [images.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[var(--color-brand-teal)]">{title}</h2>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-pink)]">
          {subtitle}
        </p>
      </div>

      {/* Large Carousel */}
      <div
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-2xl bg-gray-100 shadow-2xl mb-8`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Images */}
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1400px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[var(--color-brand-teal)] p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[var(--color-brand-teal)] p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-[var(--color-brand-teal)] p-3 rounded-full shadow-lg transition-all"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
              index === currentIndex
                ? 'ring-4 ring-[var(--color-brand-pink)] scale-105'
                : 'opacity-60 hover:opacity-100 hover:scale-105'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              quality={60}
              sizes="(max-width: 768px) 33vw, 16vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[var(--color-brand-pink)] transition-colors"
            aria-label="Close fullscreen"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 90vw"
              style={{ objectFit: 'contain' }}
              priority
              loading="eager"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function Media() {
  useReveal();

  return (
    <>
      <SEO
        title="Media Gallery - SPEED Trust"
        description="Explore photos and moments from SPEED Trust's environmental initiatives, community programs, and impactful work across South India."
        canonical="/media"
      />
      {/* Preload first images for faster loading */}
      <link
        rel="preload"
        as="image"
        href={eventPhotos[0].src}
        imageSrcSet={`/_next/image?url=${encodeURIComponent(eventPhotos[0].src)}&w=640&q=85 640w, /_next/image?url=${encodeURIComponent(eventPhotos[0].src)}&w=1080&q=85 1080w`}
      />
      <link
        rel="preload"
        as="image"
        href={newsArticles[0].src}
        imageSrcSet={`/_next/image?url=${encodeURIComponent(newsArticles[0].src)}&w=640&q=85 640w, /_next/image?url=${encodeURIComponent(newsArticles[0].src)}&w=1080&q=85 1080w`}
      />
      <main className="bg-white text-[var(--color-brand-text-dark)]">
        {/* Event Photos Section */}
        <section className="px-6 py-16" data-reveal>
          <div className="mx-auto max-w-3xl">
            <MediaCarousel
              images={eventPhotos}
              title="Event Photos"
              subtitle="Moments from our community events"
              aspectRatio="aspect-[16/10]"
            />
            <div className="text-center text-sm text-[var(--color-brand-text-muted)]">
              <p>Use arrow keys, swipe, or click thumbnails to navigate • Click image to view fullscreen</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto mb-12 h-px w-11/12 max-w-5xl bg-black/10 shadow-[0_10px_24px_rgba(0,0,0,0.08)]" data-reveal aria-hidden />

        {/* News Articles Section */}
        <section className="px-6 pb-16" data-reveal>
          <div className="mx-auto max-w-2xl">
            <MediaCarousel
              images={newsArticles}
              title="News & Articles"
              subtitle="Coverage and media features"
              aspectRatio="aspect-[4/5]"
            />
            <div className="text-center text-sm text-[var(--color-brand-text-muted)]">
              <p>Use arrow keys, swipe, or click thumbnails to navigate • Click image to view fullscreen</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
