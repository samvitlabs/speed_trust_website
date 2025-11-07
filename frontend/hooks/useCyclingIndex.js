import { useCallback, useEffect, useState } from 'react';

/**
 * Reusable auto-advancing index helper for sliders/carousels.
 * Handles interval lifecycle and provides helpers for manual navigation.
 */
export default function useCyclingIndex(length, delay) {
  const safeLength = Math.max(0, length);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeLength <= 1 || !delay) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeLength);
    }, delay);

    return () => clearInterval(timer);
  }, [safeLength, delay]);

  const cycle = useCallback(
    (step) => {
      if (!safeLength) return;
      setIndex((prev) => (prev + step + safeLength) % safeLength);
    },
    [safeLength]
  );

  const goTo = useCallback(
    (position) => {
      if (!safeLength) return;
      const normalized = ((position % safeLength) + safeLength) % safeLength;
      setIndex(normalized);
    },
    [safeLength]
  );

  return { index, cycle, goTo };
}
