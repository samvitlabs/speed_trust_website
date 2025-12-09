import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-cream)] px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-4xl font-bold text-[var(--color-brand-slate)]">Oops!</h1>
            <p className="text-lg text-[var(--color-brand-muted)]">
              Something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-[var(--color-brand-coral)] px-6 py-3 text-base font-semibold text-white transition transform hover:scale-105 hover:shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
