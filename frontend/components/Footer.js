import Link from 'next/link';

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Courses', href: '/courses' },
  { label: 'Guidance', href: '/guidance' },
  { label: 'Impact', href: '/impact' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
];

function SocialIcon({ name }) {
  const strokeProps = {
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  };

  switch (name) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
          <path d="M15 8h-2c-.6 0-1 .4-1 1v2h3l-.5 3h-2.5v7h-3v-7H7v-3h2.5V8.5C9.5 6 11 4 13.5 4H15v4z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
          <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17" cy="7" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'linkedin':
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
          <path d="M6.5 9.5V19" />
          <path d="M6.5 5.5a1 1 0 100 2 1 1 0 000-2z" />
          <path d="M10.5 19v-6.2c0-1.5 1.1-2.7 2.6-2.8 1.6-.2 2.9 1.1 2.9 2.7V19" />
        </svg>
      );
  }
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-green)] text-white">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr,1fr,1fr]">
        <section className="space-y-4">
          <p className="text-lg font-semibold">Speed Trust</p>
          <p className="text-sm text-white/80 leading-none">
            Southern Pothigai Environmental &amp; Educational Trust
          </p>
          <p className="text-sm text-white/80 leading-none">
            11-12, Premalayam, Sri Jeyanthi Nagar,
          </p>
            <p className="text-sm text-white/80 leading-none">
            KTC Nagar, Tirunelveli - 627007, Tamil Nadu, India
          </p>
            <p className="text-sm text-white/80 leading-none">
            Tamil Nadu, India
          </p>
          {/* <p className="text-sm text-white/80">
            +91-98765-43210<br />contact@southernpothigai.org
          </p> */}
        </section>

        <section className="space-y-4">
          <p className="text-lg font-semibold">Quick Links</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#F4F4F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <p className="text-lg font-semibold">Connect</p>
          <p className="text-sm text-white/80">Follow our restoration stories and course drops.</p>
          <div className="flex gap-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={`${social.label} profile`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[var(--color-brand-green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon name={social.icon} />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-white/20">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Southern Pothigai Environmental &amp; Educational Trust. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
