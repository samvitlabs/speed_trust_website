import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

const activities = [
  {
    title: 'Conservation and Rehabilitation of the Tamirabarani River Basin',
    points: [
      'Restoration of natural river flow and prevention of pollution',
      'Strengthening riverbanks and improving groundwater recharge',
      'Community participation in river protection and conservation awareness programs',
    ],
    image: '/images/plan_of_activities/river_conservation.webp',
  },
  {
    title: 'Afforestation Programme',
    points: [
      'Large-scale tree planting in Tenkasi, Tirunelveli, and Thoothukudi districts',
      'Use of native and climate-resilient tree species',
      'Promotion of community-driven maintenance of planted areas',
      'Increasing overall forest cover and enhancing biodiversity',
    ],
    image: '/images/plan_of_activities/afforestation.webp',
  },
  {
    title: 'Skill Development for Educated Youth',
    points: [
      'Training programs in innovative technologies',
      'Workshops on industry-relevant skills and soft skills',
      'Partnerships with companies for internships and job placements',
    ],
    image: '/images/plan_of_activities/skill_development.webp',
  },
  {
    title: 'Entrepreneurship Development for Youth and Women',
    points: [
      'Business training and mentorship programs',
      'Support for startup ideas, micro-enterprises, and local innovations',
      'Access to financial resources, market linkages, and government schemes',
      'Promoting sustainable and community-based enterprises',
    ],
    image: '/images/plan_of_activities/entrepreneurship.webp',
  },
  {
    title: 'Women Empowerment Through Financial Awareness',
    points: [
      'Financial literacy workshops on savings, budgeting, and investments',
      'Encouraging women to participate in income-generating activities',
      'Supporting self-help groups (SHGs) and micro-finance opportunities',
      'Enhancing economic independence and improving household income',
    ],
    image: '/images/plan_of_activities/women_empowerment.webp',
  },
];

export default function PlanOfActivities() {
  useReveal();

  return (
    <>
      <SEO
        title="Plan of Activities - SPEED Trust Programs"
        description="Explore SPEED Trust's planned activities including environmental programs, community development initiatives, and sustainable development projects."
        canonical="/plan-of-activities"
      />
      <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
        <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/new_practices.png')" }} data-reveal>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-4 px-6 py-16 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">Plan of Activities</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Our Strategic Activities</h1>
            <p className="text-lg text-white/85">Planned programs that drive sustainable impact.</p>
          </div>
        </section>

        <section className="px-6 py-16 bg-[#fffaf3]">
          <div className="mx-auto max-w-6xl space-y-20">
            {activities.map((activity, idx) => (
              <section
                key={activity.title}
                data-reveal
                className={`reveal flex flex-col gap-8 lg:items-center lg:gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-1/2 w-full overflow-hidden rounded-3xl shadow-[0_18px_40px_rgba(12,28,20,0.18)]">
                  <div
                    className="h-64 w-full bg-cover bg-center sm:h-72 lg:h-96"
                    style={{ backgroundImage: `url('${activity.image}')` }}
                    aria-label={activity.title}
                  />
                </div>
                <div className="lg:w-1/2 w-full space-y-4">
                  <div className="flex items-center gap-3">
                    {/* <span className="text-5xl font-bold text-[var(--color-brand-green)]/20">{String(idx + 1).padStart(2, '0')}</span> */}
                    <h3 className="text-2xl font-bold text-[var(--color-brand-slate)] leading-tight">{activity.title}</h3>
                  </div>
                  <ul className="space-y-3 text-base text-[var(--color-brand-slate)]">
                    {activity.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-brand-green)]" aria-hidden />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
