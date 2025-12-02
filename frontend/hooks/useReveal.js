import { useEffect } from 'react';

export default function useReveal(selector = '[data-reveal]') {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const nodes = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [selector]);
}
