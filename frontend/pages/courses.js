import { useMemo, useState } from 'react';
import courseCatalog from '../data/courses.json';

function FilterBar({ filters, onChange, domains, institutions }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <label className="flex flex-1 flex-col text-sm font-medium text-slate-600">
        Domain
        <select
          value={filters.domain}
          onChange={(e) => onChange({ ...filters, domain: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-800"
        >
          <option value="">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-1 flex-col text-sm font-medium text-slate-600">
        Institution
        <select
          value={filters.institution}
          onChange={(e) => onChange({ ...filters, institution: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-800"
        >
          <option value="">All Institutions</option>
          {institutions.map((institution) => (
            <option key={institution} value={institution}>
              {institution}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => onChange({ domain: '', institution: '' })}
        className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#458C96] hover:text-[#458C96]"
      >
        Clear Filters
      </button>
    </div>
  );
}

function CourseGrid({ courses }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <article key={course.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image})` }}
            role="img"
            aria-label={`${course.title} image`}
          />
          <div className="flex flex-1 flex-col space-y-4 p-5">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#458C96]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#458C96]" />
              {course.domain}
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">{course.title}</h3>
            <p className="text-sm text-slate-600">{course.description}</p>
            <p className="text-sm font-medium text-slate-500">Offered by {course.institution}</p>
            <div className="flex flex-1 items-end">
              <a
                href={course.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full justify-center rounded-full bg-[#D93B3B] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#b02d2d]"
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
  const [filters, setFilters] = useState({ domain: '', institution: '' });

  const domains = useMemo(
    () => Array.from(new Set(courseCatalog.map((course) => course.domain))).sort(),
    []
  );
  const institutions = useMemo(
    () => Array.from(new Set(courseCatalog.map((course) => course.institution))).sort(),
    []
  );

  const filteredCourses = useMemo(() => {
    return courseCatalog.filter((course) => {
      const domainCheck = filters.domain ? course.domain === filters.domain : true;
      const institutionCheck = filters.institution ? course.institution === filters.institution : true;
      return domainCheck && institutionCheck;
    });
  }, [filters]);

  return (
    <main className="bg-[#F9F9F9] text-slate-900">
      <section className="relative overflow-hidden bg-[#458C96]/10 px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#458C96]">Courses</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Learning pathways for ecological leadership</h1>
          <p className="mt-4 text-base text-slate-600">
            Speed Trust and partners curate modular programs that merge scientific rigor, field practice, and cultural stewardship so every participant can champion regenerative futures.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            domains={domains}
            institutions={institutions}
          />
          <CourseGrid courses={filteredCourses} />
          {!filteredCourses.length && (
            <p className="text-center text-sm text-slate-500">No courses match the selected filters.</p>
          )}
        </div>
      </section>
    </main>
  );
}
