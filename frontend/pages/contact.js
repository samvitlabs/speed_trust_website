import { useState } from 'react';

const info = {
  address: '45, Evergreen Road, Tenkasi District, Tamil Nadu 627412',
  phone: '+91-98765-43210',
  email: 'contact@southernpothigai.org',
  hours: 'Mon – Sat, 9:00 AM – 6:00 PM IST',
};

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed submission');
      setStatus({ type: 'success', message: 'Thanks for reaching out! We will get back soon.' });
      setFormData(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to send. Please try again.' });
    }
  };

  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#458C96]">Contact</p>
          <h1 className="mt-4 text-4xl font-bold">Connect with Southern Pothigai Trust</h1>
          <p className="mt-4 text-base text-slate-600">
            Share your ideas on conservation, collaborations, or community learning—we would love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-wide text-[#458C96]">Visit us</p>
              <p className="mt-2 text-base text-slate-600">{info.address}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-[#458C96]">Call</p>
              <a href={`tel:${info.phone}`} className="mt-2 block text-base font-semibold text-slate-900">
                {info.phone}
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-[#458C96]">Email</p>
              <a href={`mailto:${info.email}`} className="mt-2 block text-base font-semibold text-slate-900">
                {info.email}
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-[#458C96]">Office Hours</p>
              <p className="mt-2 text-base text-slate-600">{info.hours}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Map</p>
              <div className="mt-3 flex h-48 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                Map placeholder (embed your preferred map service)
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <p className="text-sm uppercase tracking-wide text-[#458C96]">Write to us</p>
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
                className="w-full rounded-full bg-[#D93B3B] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#b73030]"
              >
                Send Message
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
  );
}
