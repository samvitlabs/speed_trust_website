'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about'},
  { label: 'Our Work', href: '/our-work' },
  { label: 'Services', href: '/services' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
];
const languages = [
  { code: 'en', label: 'EN', ariaLabel: 'English' },
  { code: 'ta', label: 'த', ariaLabel: 'Tamil' },
];

export default function Header() {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en');

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

    return navLinks.map((item) => {
      const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
      const baseClasses = `block rounded-md border-b-2 transition-colors duration-150 ${compact ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-base'}`;
      const activeClasses = isActive
        ? 'text-[var(--color-brand-gold)] border-[var(--color-brand-gold)]'
        : 'text-white/80 border-transparent hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]';

      return (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`${baseClasses} ${activeClasses}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={onClick}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  const compact = isScrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full border-b border-white/10 text-white transition-all duration-300 ${
        compact ? 'py-1.5 shadow-lg bg-[var(--color-brand-green)]' : 'py-4 bg-[var(--color-brand-green)]'
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Speed Trust home">
            <Image
              src="/images/logo.png"
              alt="Speed Trust logo"
              width={compact ? 54 : 72}
              height={compact ? 54 : 72}
              className={`${compact ? 'h-[54px] w-[54px]' : 'h-[72px] w-[72px]'} rounded-full bg-white/10 p-2 transition-all duration-200`}
              priority
            />
            <span className={`font-semibold tracking-wide transition-all duration-200 ${compact ? 'text-base' : 'text-lg'}`}>
              SPEED Trust
            </span>
          </Link>

          <div className="ml-auto hidden items-start gap-6 lg:flex">
            <nav aria-label="Primary navigation" className="flex-1">
              <ul className="flex items-center gap-4 font-medium">{renderNavLinks(undefined, { compact: true })}</ul>
            </nav>
            {/* <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 text-xs font-semibold" role="group" aria-label="Select language">
              {languages.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setLanguage(option.code)}
                  className={`rounded-full px-3 py-1 transition ${
                    language === option.code
                      ? 'bg-white text-[var(--color-brand-green)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-pressed={language === option.code}
                  aria-label={option.ariaLabel}
                >
                  {option.label}
                </button>
              ))}
            </div> */}
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
          <div
            className={`flex flex-col gap-3 overflow-hidden text-base font-medium text-white transition-all duration-300 ${
              menuOpen ? 'max-h-[600px] pb-4' : 'max-h-0'
            }`}
          >
            {/* <div className="flex gap-2 rounded-full bg-white/10 p-1 text-xs font-semibold" role="group" aria-label="Select language">
              {languages.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setLanguage(option.code)}
                  className={`rounded-full px-3 py-1 transition ${
                    language === option.code
                      ? 'bg-white text-[var(--color-brand-green)]'
                      : 'text-white/70'
                  }`}
                  aria-pressed={language === option.code}
                  aria-label={option.ariaLabel}
                >
                  {option.label}
                </button>
              ))}
            </div> */}
            <ul className="flex flex-col gap-1">
              {renderNavLinks(() => setMenuOpen(false), { isMobile: true })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
