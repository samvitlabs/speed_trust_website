import { useEffect, useRef } from 'react';

export default function useReveal(selector = '[data-reveal]') {
  const observerRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const nodes = document.querySelectorAll(selector);

    if (nodes.length === 0) return undefined;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: '50px' }
    );

    nodes.forEach((node) => observerRef.current?.observe(node));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [selector]);
}
