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
        'brand-forest': 'var(--color-brand-forest)',
        'brand-canopy': 'var(--color-brand-canopy)',
        'brand-moss': 'var(--color-brand-moss)',
        'brand-earth': 'var(--color-brand-earth)',
        'brand-clay': 'var(--color-brand-clay)',
        'brand-river': 'var(--color-brand-river)',
        'brand-sand': 'var(--color-brand-sand)',
        'brand-mist': 'var(--color-brand-mist)',
        'brand-green': 'var(--color-brand-green)',
        'brand-gold': 'var(--color-brand-gold)',
        'brand-coral': 'var(--color-brand-coral)',
        'brand-teal': 'var(--color-brand-teal)',
        'brand-cream': 'var(--color-brand-cream)',
        'brand-slate': 'var(--color-brand-slate)',
        'brand-muted': 'var(--color-brand-muted)',
      },
      backgroundColor: {
        'brand-background': 'var(--color-brand-cream)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
