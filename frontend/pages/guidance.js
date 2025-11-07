import { useMemo, useState } from 'react';

const guidanceAreas = [
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

const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
];

const faqItems = [
  {
    question: 'How soon will the team respond after submitting a request?',
    answer: 'We respond within two working days to schedule a briefing call and finalize the right mentor cohort.',
  },
  {
    question: 'Do consultations happen online or on site?',
    answer:
      'Most discovery calls happen over video first. For deeper engagements we can co-locate at partner campuses or community labs.',
  },
  {
    question: 'Can multiple domains be covered in one session?',
    answer:
      'Yes. Share your blended needs in the message field and we will curate a pod of entrepreneurship, education, or career mentors accordingly.',
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
  date: '',
  time: '',
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
    if (!formData.date) newErrors.date = 'Select a date';
    if (!formData.time) newErrors.time = 'Select a time';
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
      const { date, time, ...rest } = formData;
      const payload = { ...rest, datetime: `${date}T${time}` };
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
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
          <button type="button" onClick={scrollToForm} className="mt-8 cta-primary">
            Schedule Consultation
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          {guidanceAreas.map((column) => (
            <div key={column.title} className="space-y-3">
              <h2 className="text-3xl font-bold tracking-wide text-[var(--color-brand-slate)]">{column.title}</h2>
              <p className="text-base leading-relaxed text-[var(--color-brand-muted)]">{column.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="consultation-form" className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-[40px] border border-[var(--color-brand-green)]/15 bg-white/85 p-8 shadow-[0_35px_60px_rgba(12,28,20,0.12)] backdrop-blur">
          <p className="text-sm uppercase tracking-wide text-[var(--color-brand-green)]">Consultation Request</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--color-brand-slate)]">Tell us about your goals</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
                Name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </label>
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
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
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
                Preferred date
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                />
                {errors.date && <span className="text-sm text-red-600">{errors.date}</span>}
              </label>
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
                Preferred time
                <select
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                {errors.time && <span className="text-sm text-red-600">{errors.time}</span>}
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
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
              <label className="text-sm font-medium text-[var(--color-brand-muted)]">
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
            <label className="text-sm font-medium text-[var(--color-brand-muted)]">
              Message
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
              />
              {errors.message && <span className="text-sm text-red-600">{errors.message}</span>}
            </label>
            <button type="submit" className="cta-primary w-full justify-center">
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

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">FAQs</p>
          <h2 className="text-3xl font-bold text-[var(--color-brand-slate)]">Guidance Support</h2>
          <div className="mt-6 space-y-4 text-left">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="rounded-3xl border border-[var(--color-brand-green)]/10 bg-white/80 p-6 shadow-sm"
              >
                <summary className="cursor-pointer text-lg font-semibold text-[var(--color-brand-slate)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-[var(--color-brand-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
