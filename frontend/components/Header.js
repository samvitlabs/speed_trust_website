'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  'Home',
  'About',
  'Events',
  'Courses',
  'Guidance',
  'Impact',
  'Gallery',
  'Contact',
  'Login',
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLinks = (onClick, options = {}) => {
    const { compact = false } = options;

    return navLinks.map((label) => (
      <li key={label}>
        {label === 'Login' ? (
          <Link
            href="/login"
            className={`block rounded-full bg-[var(--color-brand-gold)] text-center font-semibold text-[var(--color-brand-green)] transition-colors hover:bg-[#f97316] ${
              compact ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base'
            }`}
            onClick={onClick}
          >
            {label}
          </Link>
        ) : (
          <Link
            href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
            className={`block rounded-md transition-colors hover:text-[var(--color-brand-gold)] ${
              compact ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-base'
            } ${label === 'Home' ? 'text-white' : 'text-white/80'}`}
            aria-current={label === 'Home' ? 'page' : undefined}
            onClick={onClick}
          >
            {label}
          </Link>
        )}
      </li>
    ));
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-[var(--color-brand-green)] text-white transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Speed Trust home">
            <Image
              src="/images/logo.png"
              alt="Speed Trust logo"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full bg-white/10 p-2"
              priority
            />
            <span className="text-lg font-semibold tracking-wide">SPEED Trust</span>
          </Link>

          <div className="ml-auto hidden lg:block">
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-4 font-medium">{renderNavLinks(undefined, { compact: true })}</ul>
            </nav>
          </div>

          <button
            className="ml-auto inline-flex items-center justify-center rounded-md border border-white/30 px-3 py-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav id="primary-navigation" className={`lg:hidden ${isScrolled ? 'pt-2' : 'pt-3'}`} aria-label="Mobile primary navigation">
          <ul
            className={`flex flex-col gap-1 overflow-hidden text-base font-medium text-white transition-all duration-300 ${
              menuOpen ? 'max-h-[600px]' : 'max-h-0'
            }`}
          >
            {renderNavLinks(() => setMenuOpen(false))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
