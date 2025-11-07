import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const myEvents = [
  {
    title: 'Watershed Guardians Residency',
    date: 'May 2024',
    status: 'Completed',
  },
  {
    title: 'Riparian Weave Festival',
    date: 'Jan 2024',
    status: 'Registered',
  },
  {
    title: 'Blue Schools Exchange',
    date: 'Sep 2024',
    status: 'Upcoming',
  },
];

const myCourses = [
  {
    title: 'Living Soils Intensive',
    progress: 'Module 4 of 6',
  },
  {
    title: 'Climate Story Lab',
    progress: 'Starts Oct 2024',
  },
  {
    title: 'Youth Earth Exchange',
    progress: 'Completed',
  },
];

export default function UserDashboard() {
  const router = useRouter();
  const { user, hydrated, logout } = useAuth();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace('/login');
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F9F9F9] text-slate-600">
        Loading dashboard…
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="bg-[#F9F9F9] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-[#458C96]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold">Namaste, {user.name}</h1>
            <p className="mt-2 text-sm text-slate-600">
              Track your registered events, ongoing courses, and upcoming opportunities with Speed Trust.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="self-start rounded-full border border-[#D93B3B] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#D93B3B] transition hover:bg-[#D93B3B] hover:text-white"
          >
            Log Out
          </button>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">My Events</h2>
            <p className="text-sm text-slate-500">{myEvents.length} engagements</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {myEvents.map((event) => (
              <article key={event.title} className="rounded-2xl border border-slate-100 bg-[#F9F9F9] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#458C96]">{event.status}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-500">{event.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">My Courses</h2>
            <p className="text-sm text-slate-500">{myCourses.length} enrollments</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {myCourses.map((course) => (
              <article key={course.title} className="rounded-2xl border border-slate-100 bg-[#F4F4F4] p-5">
                <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{course.progress}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
