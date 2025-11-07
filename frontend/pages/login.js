import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const initialForm = { email: '', password: '' };

export default function Login() {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, login, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && user) {
      router.replace('/user');
    }
  }, [hydrated, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || 'Invalid email or password');
      }

      const nextUser = payload.user ?? { email: formData.email.trim() };
      login(nextUser);
      router.push('/user');
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = !formData.email || !formData.password || isSubmitting;

  return (
    <main className="bg-[#F9F9F9] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.35em] text-[#458C96]">Account</p>
        <h1 className="mt-4 text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use the credentials shared by Speed Trust to access your dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="text-sm font-medium text-slate-600">
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
              required
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base"
              required
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition ${
              disabled ? 'bg-slate-400' : 'bg-[#D93B3B] hover:bg-[#b73030]'
            }`}
          >
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
