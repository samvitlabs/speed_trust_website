import { useEffect, useMemo, useState } from 'react';
import courseCatalog from '../data/courses.json';

const sortOptions = [
  { value: 'title-asc', label: 'Title (A–Z)' },
  { value: 'title-desc', label: 'Title (Z–A)' },
  { value: 'institution', label: 'Institution' },
  { value: 'domain', label: 'Domain' },
];

function CourseFilters({ filters, onChange, options }) {
  const updateField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  const clearFilters = () => {
    onChange({ domain: '', subdomain: '', institution: '', sort: 'title-asc' });
  };

  return (
    <aside className="self-start rounded-[32px] border border-[var(--color-brand-green)]/15 bg-white/80 p-6 shadow-sm shadow-[rgba(12,28,20,0.05)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Filter</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">Find the right pathway</h2>

      <div className="mt-6 space-y-6 text-sm font-medium text-slate-600">
        <label className="block space-y-2">
          <span>Domain</span>
          <select
            value={filters.domain}
            onChange={updateField('domain')}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800"
          >
            <option value="">All domains</option>
            {options.domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span>Subdomain</span>
          <select
            value={filters.subdomain}
            onChange={updateField('subdomain')}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800"
          >
            <option value="">All focus areas</option>
            {options.subdomains.map((subdomain) => (
              <option key={subdomain} value={subdomain}>
                {subdomain}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span>Institution</span>
          <select
            value={filters.institution}
            onChange={updateField('institution')}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800"
          >
            <option value="">All partners</option>
            {options.institutions.map((institution) => (
              <option key={institution} value={institution}>
                {institution}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span>Sort</span>
          <select
            value={filters.sort}
            onChange={updateField('sort')}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="mt-6 w-full rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)]"
      >
        Reset filters
      </button>
    </aside>
  );
}

function CourseGrid({ courses }) {
  if (!courses.length) {
    return (
      <p className="rounded-3xl bg-white/70 px-6 py-20 text-center text-base text-slate-500 shadow-inner">
        No courses match the current filters. Try adjusting the focus.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <article
          key={course.id}
          className="flex flex-col overflow-hidden rounded-3xl border border-[var(--color-brand-green)]/10 bg-white shadow-[0_25px_50px_rgba(12,28,20,0.08)]"
        >
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image})` }}
            role="img"
            aria-label={`${course.title} image`}
          />
          <div className="flex flex-1 flex-col space-y-4 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-green)]">
                {course.domain}
              </p>
              <p className="text-sm text-[var(--color-brand-muted)]">{course.subdomain}</p>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">{course.title}</h3>
            <p className="text-sm text-slate-600">{course.description}</p>
            <p className="text-sm font-medium text-slate-500">Offered by {course.institution}</p>
            <div className="flex flex-1 items-end">
              <a
                href={course.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full justify-center rounded-full bg-[var(--color-brand-coral)] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#a4522f]"
              >
                Enroll
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Courses() {
  const [filters, setFilters] = useState({ domain: '', subdomain: '', institution: '', sort: 'title-asc' });
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const domains = useMemo(
    () => Array.from(new Set(courseCatalog.map((course) => course.domain))).sort(),
    []
  );
  const subdomains = useMemo(
    () => Array.from(new Set(courseCatalog.map((course) => course.subdomain))).sort(),
    []
  );
  const institutions = useMemo(
    () => Array.from(new Set(courseCatalog.map((course) => course.institution))).sort(),
    []
  );

  useEffect(() => {
    setPage(0);
  }, [filters.domain, filters.subdomain, filters.institution, filters.sort]);

  const sortedCourses = useMemo(() => {
    const results = courseCatalog.filter((course) => {
      const domainCheck = filters.domain ? course.domain === filters.domain : true;
      const subdomainCheck = filters.subdomain ? course.subdomain === filters.subdomain : true;
      const institutionCheck = filters.institution ? course.institution === filters.institution : true;
      return domainCheck && subdomainCheck && institutionCheck;
    });

    const sorted = [...results];
    sorted.sort((a, b) => {
      switch (filters.sort) {
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'institution':
          return a.institution.localeCompare(b.institution);
        case 'domain':
          return a.domain.localeCompare(b.domain);
        case 'title-asc':
        default:
          return a.title.localeCompare(b.title);
      }
    });
    return sorted;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / pageSize));

  useEffect(() => {
    setPage((prev) => Math.min(prev, Math.max(totalPages - 1, 0)));
  }, [sortedCourses.length, totalPages]);

  const paginatedCourses = useMemo(() => {
    const start = page * pageSize;
    return sortedCourses.slice(start, start + pageSize);
  }, [page, sortedCourses]);

  return (
    <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
      <section className="relative overflow-hidden bg-[var(--color-brand-mist)] px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Courses</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Learning pathways for ecological leadership</h1>
          <p className="mt-4 text-base text-slate-600">
            Speed Trust and partners curate modular programs that merge scientific rigor, field practice, and cultural stewardship so every participant can champion regenerative futures.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(220px,260px),1fr]">
          <CourseFilters
            filters={filters}
            onChange={setFilters}
            options={{ domains, subdomains, institutions }}
          />
          <div className="space-y-6">
            <CourseGrid courses={paginatedCourses} />
            <div className="flex items-center justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="rounded-full border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === 0}
              >
                Prev
              </button>
              <span className="text-slate-500">
                Page {Math.min(page + 1, totalPages)} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                className="rounded-full border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
