import { useMemo, useState } from 'react';

const guidanceColumns = [
  {
    title: 'Entrepreneurship Guidance',
    copy:
      'Blueprint regenerative enterprises with mentors who understand grassroots supply chains, impact finance, and collective ownership.',
  },
  {
    title: 'Education Guidance',
    copy:
      'Co-design immersive learning journeys for schools, colleges, and community labs that weave science, culture, and local stewardship.',
  },
  {
    title: 'Career Guidance',
    copy:
      'Chart purposeful career pathways in climate action, policy, data, and creative storytelling rooted in the Western Ghats.',
  },
];

const domainMap = {
  Entrepreneurship: ['Farmer Producer Co-ops', 'Eco-Tourism Labs', 'Circular Craft Ventures'],
  Education: ['Schools & Colleges', 'Community Science Labs', 'Curriculum Design'],
  Career: ['Early Career', 'Mid Career', 'Fellowships'],
};

const initialForm = {
  name: '',
  email: '',
  datetime: '',
  domain: '',
  subdomain: '',
  message: '',
};

export default function Guidance() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const subdomains = useMemo(() => domainMap[formData.domain] || [], [formData.domain]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'domain' ? { subdomain: '' } : {}),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.datetime) newErrors.datetime = 'Preferred date and time is required';
    if (!formData.domain) newErrors.domain = 'Select a domain';
    if (!formData.subdomain) newErrors.subdomain = 'Select a subdomain';
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
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus({ type: 'success', message: 'Thanks! Our team will reach out shortly.' });
      setFormData(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const scrollToForm = () => {
    const node = document.getElementById('consultation-form');
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section
        className="relative h-[60vh] min-h-[420px] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-white/70">Expert Guidance</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
            Bespoke mentoring for institutions, entrepreneurs, and changemakers
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/80">
            Work with Speed Trust mentors across ecology, education, and livelihoods to design roadmaps that honor people and the planet.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 rounded-full bg-[#D93B3B] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#b73030]"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {guidanceColumns.map((column) => (
            <article key={column.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#458C96]">{column.title}</h2>
              <p className="mt-4 text-sm text-slate-600">{column.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="consultation-form" className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-[#458C96]">Consultation Request</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Tell us about your goals</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-600">
                Name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </label>
              <label className="text-sm font-medium text-slate-600">
                Email
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
              </label>
            </div>
            <label className="text-sm font-medium text-slate-600">
              Preferred date &amp; time
              <input
                type="datetime-local"
                value={formData.datetime}
                onChange={(e) => handleChange('datetime', e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
              />
              {errors.datetime && <span className="text-sm text-red-600">{errors.datetime}</span>}
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-600">
                Domain
                <select
                  value={formData.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                >
                  <option value="">Select domain</option>
                  {Object.keys(domainMap).map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                {errors.domain && <span className="text-sm text-red-600">{errors.domain}</span>}
              </label>
              <label className="text-sm font-medium text-slate-600">
                Subdomain
                <select
                  value={formData.subdomain}
                  onChange={(e) => handleChange('subdomain', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                  disabled={!subdomains.length}
                >
                  <option value="">{subdomains.length ? 'Select subdomain' : 'Select a domain first'}</option>
                  {subdomains.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.subdomain && <span className="text-sm text-red-600">{errors.subdomain}</span>}
              </label>
            </div>
            <label className="text-sm font-medium text-slate-600">
              Message
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
              />
              {errors.message && <span className="text-sm text-red-600">{errors.message}</span>}
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-[#D93B3B] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#b73030]"
            >
              Submit Request
            </button>
            {status.message && (
              <p className={`text-center text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
