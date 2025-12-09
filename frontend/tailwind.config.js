/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // All colors now reference CSS variables from globals.css
        // Change colors ONLY in styles/globals.css - they auto-sync here!
        'brand-teal': 'var(--color-brand-teal)',
        'brand-teal-dark': 'var(--color-brand-teal-dark)',
        'brand-teal-light': 'var(--color-brand-teal-light)',
        'brand-pink': 'var(--color-brand-pink)',
        'brand-pink-bright': 'var(--color-brand-pink-bright)',
        'brand-white': 'var(--color-brand-white)',
        'brand-gray-light': 'var(--color-brand-gray-light)',
        'brand-gray-lighter': 'var(--color-brand-gray-lighter)',
        'brand-text-dark': 'var(--color-brand-text-dark)',
        'brand-text-medium': 'var(--color-brand-text-medium)',
        'brand-text-muted': 'var(--color-brand-text-muted)',
        // Legacy color aliases for backwards compatibility
        'brand-blue': 'var(--color-brand-teal)',
        'brand-blue-deep': 'var(--color-brand-teal-dark)',
        'brand-pink-vibrant': 'var(--color-brand-pink-bright)',
        'brand-forest': 'var(--color-brand-teal)',
        'brand-canopy': 'var(--color-brand-teal)',
        'brand-moss': 'var(--color-brand-teal-light)',
        'brand-earth': 'var(--color-brand-pink)',
        'brand-clay': 'var(--color-brand-pink)',
        'brand-river': 'var(--color-brand-pink-bright)',
        'brand-sand': 'var(--color-brand-white)',
        'brand-mist': 'var(--color-brand-gray-lighter)',
        'brand-green': 'var(--color-brand-teal)',
        'brand-gold': 'var(--color-brand-pink)',
        'brand-coral': 'var(--color-brand-pink)',
        'brand-cream': 'var(--color-brand-white)',
        'brand-slate': 'var(--color-brand-text-dark)',
        'brand-muted': 'var(--color-brand-text-muted)',
      },
      backgroundColor: {
        'brand-background': 'var(--color-brand-white)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
