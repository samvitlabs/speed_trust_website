import { useState } from 'react';
import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

const info = {
  address: ['Southern Pothigai Environmental & Educational Trust',
    '11-12, Premalayam, Sri Jeyanthi Nagar,(Near Sarada College)', 
    'KTC Nagar, Tirunelveli - 627007', 
    'Tamil Nadu, India'],
  phone: '9xxxxxxxxx',
  email: 'contact@speedtrust.org.in',
};

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  useReveal();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed submission');
      setStatus({ type: 'success', message: 'Thanks for reaching out! We will get back soon.' });
      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to send. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - SPEED Trust | Get in Touch"
        description="Contact SPEED Trust for environmental consultancy, partnerships, or volunteer opportunities. Located in Tirunelveli, Tamil Nadu."
        canonical="/contact"
      />
      <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="px-6 py-16" data-reveal>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Contact</p>
          <h1 className="mt-4 text-4xl font-bold">Connect with Southern Pothigai Trust</h1>
          <p className="mt-4 text-base text-slate-600">
            Share your ideas on conservation, collaborations, or community learning—we would love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16" data-reveal>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-6 surface-card rounded-3xl p-8 transition transform hover:-translate-y-1 hover:shadow-xl" data-reveal>
            <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Address</p>
            <div className="mt-2 space-y-1 text-base text-slate-600">
              {info.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-6 text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Phone</p>
            <a href={`tel:${info.phone}`} className="mt-2 block text-base font-semibold text-slate-900">
              {info.phone}
            </a>
            <p className="mt-6 text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Email</p>
            <a href={`mailto:${info.email}`} className="mt-2 block text-base font-semibold text-slate-900">
              {info.email}
            </a>
          </article>

          <article className="rounded-3xl surface-card p-8 transition transform hover:-translate-y-1 hover:shadow-2xl" data-reveal>
            <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Write to us</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="text-sm font-medium text-slate-600">
                Name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </label>
              <label className="text-sm font-medium text-slate-600">
                Email
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
              </label>
              <label className="text-sm font-medium text-slate-600">
                Subject
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                />
              </label>
              <label className="text-sm font-medium text-slate-600">
                Message
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <span className="text-sm text-red-600">{errors.message}</span>}
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--color-brand-coral)] px-6 py-3 text-base font-semibold text-white transition transform hover:scale-105 hover:shadow-lg hover:bg-[var(--color-brand-coral)]/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              {status.message && (
                <p className={`text-center text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </article>
        </div>
      </section>
    </main>
    </>
  );
}
