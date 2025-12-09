import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <div className={`${inter.variable} flex min-h-screen flex-col bg-brand-background text-slate-900 overflow-x-hidden`} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-brand-coral)] focus:text-white focus:rounded-md">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-24 sm:pt-25">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

// Report Web Vitals
export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'production') {
    // Log to console in production (you can send to analytics service)
    console.log(metric);
  }
}
