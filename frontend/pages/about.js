import { useState, useEffect, useRef } from 'react';
import { Users, TreePine, Waves,GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';


const aboutText = `A non-profit organization committed to promoting environmental sustainability, value-based education, and livelihood development. Established by experienced professionals in environmental management and technical consultancy, the Trust aims to build harmony between nature and human progress.`;

const missionCards = [
  {
    title: 'Environment Issues',
    description: 'Promote environmental awareness and responsible practices among students and the public',
    icon: 'tree'
  },
  {
    title: 'Rehabilitation of Water Bodies',
    description: 'Conserve and rejuvenate natural ecosystems through participatory environmental initiatives',
    icon: 'water'
  },
  {
    title: 'Youth Education and Skill Development',
    description: 'Enhance the employability of rural youth through education, technical training, and entrepreneurship support',
    icon: 'education'
  },
  {
    title: 'Entrepreneurship and Social Empowerment',
    description: 'Our Approach Section: Add a suitable text here.',
    icon: 'empowerment'
  }
];

// Placeholder data - replace with actual trustee information
const trustees = [
  { name: 'Trustee Name 1', role: 'Chairman', description: 'An experienced leader with over 20 years in environmental management and sustainable development. Passionate about creating positive change through community-driven initiatives and innovative solutions.', image: '/images/profile.svg' },
  { name: 'Trustee Name 2', role: 'Secretary', description: 'Dedicated professional with expertise in organizational management and strategic planning. Committed to fostering partnerships and ensuring transparency in all trust operations.', image: '/images/profile.svg' },
  { name: 'Trustee Name 3', role: 'Treasurer', description: 'Financial expert with strong background in resource management and fiscal planning. Ensures responsible stewardship of trust funds to maximize impact.', image: '/images/profile.svg' },
  { name: 'Trustee Name 4', role: 'Member', description: 'Environmental scientist specializing in ecosystem restoration and biodiversity conservation. Works tirelessly to promote sustainable practices in rural communities.', image: '/images/profile.svg' },
  { name: 'Trustee Name 5', role: 'Member', description: 'Education specialist focused on skill development and capacity building for youth. Believes in empowering the next generation through quality education.', image: '/images/profile.svg' },
  { name: 'Trustee Name 6', role: 'Member', description: 'Social entrepreneur with deep understanding of rural development challenges. Advocates for inclusive growth and community participation.', image: '/images/profile.svg' },
  { name: 'Trustee Name 7', role: 'Member', description: 'Technology innovator bringing modern solutions to traditional problems. Passionate about leveraging technology for environmental and social impact.', image: '/images/profile.svg' },
];

// Placeholder data - replace with actual advisor information
const advisors = [
  { name: 'Advisor Name 1', role: 'Technical Advisor', description: 'Brief description of advisor 1', image: '/images/profile.svg' },
  { name: 'Advisor Name 2', role: 'Legal Advisor', description: 'Brief description of advisor 2', image: '/images/profile.svg' },
  { name: 'Advisor Name 3', role: 'Environmental Advisor', description: 'Brief description of advisor 3', image: '/images/profile.svg' },
  { name: 'Advisor Name 4', role: 'Financial Advisor', description: 'Brief description of advisor 4', image: '/images/profile.svg' },
  { name: 'Advisor Name 5', role: 'Strategic Advisor', description: 'Brief description of advisor 5', image: '/images/profile.svg' },
  { name: 'Advisor Name 6', role: 'Education Advisor', description: 'Brief description of advisor 6', image: '/images/profile.svg' },
  { name: 'Advisor Name 7', role: 'Agriculture Advisor', description: 'Brief description of advisor 7', image: '/images/profile.svg' },
  
];

const MissionIcon = ({ type }) => {
  const iconProps = {
    className: "w-16 h-16 mx-auto",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch(type) {
   case 'tree':
      return (
        <TreePine
          className="w-16 h-16 mx-auto text-[var(--color-brand-green)]"
          strokeWidth={2}
        />
      );
    case 'water':
      return (
        <Waves
          className="w-16 h-16 mx-auto text-[var(--color-brand-green)]"
          strokeWidth={2}
        />
      );
    case 'education':
      return (
        <GraduationCap
          className="w-16 h-16 mx-auto text-[var(--color-brand-green)]"
          strokeWidth={2}
        />
      );

    case 'empowerment':
      return (
        <Users
          className="w-16 h-16 mx-auto text-[var(--color-brand-green)]"
          strokeWidth={2}
        />
      );

    default:
      return null;
  }
};

// Static grid layout for Trustees (no carousel)
const TeamGrid = ({ members, title, subtitle }) => (
  <section className="bg-[#f4efe6] px-6 py-16" data-reveal>
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">{subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="w-[260px] bg-white rounded-xl p-6 text-center shadow-lg hover:-translate-y-2 transition"
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[var(--color-brand-green)]/20">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-[var(--color-brand-green)] font-semibold">{member.role}</p>
            <p className="text-sm mt-2 opacity-80">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================
   ADVISORS CAROUSEL — CORRECT PUSH ANIMATION
============================ */

const TeamCarouselAnimated = ({ members, title, subtitle }) => {
  const VISIBLE = 4;
  const SLIDE_INTERVAL = 2000;
  const ANIMATION_DURATION = 700; // must match CSS transition

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const trackRef = useRef(null);
  const maxIndex = members.length - VISIBLE;

  /* =====================
     AUTO SLIDE (ONE SLIDE AT A TIME)
  ===================== */
  useEffect(() => {
    if (isHovered || isAnimating || isResetting) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        // Stop when last slide is fully visible
        if (prev >= maxIndex) {
          setIsResetting(true);
          return prev;
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
        return prev + 1;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered, isAnimating, isResetting, maxIndex]);

  /* =====================
     TRACK TRANSFORM (GEOMETRY FIXED)
  ===================== */
  useEffect(() => {
    if (!trackRef.current) return;

    if (isResetting) {
      trackRef.current.style.transition = 'transform 0.8s ease-in-out';
      trackRef.current.style.transform = 'translateX(0%)';

      setTimeout(() => {
        setIsResetting(false);
        setIndex(0);
      }, 800);
    } else {
      trackRef.current.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      trackRef.current.style.transform = `translateX(-${index * 25}%)`;
    }
  }, [index, isResetting]);

  /* =====================
     MANUAL CONTROLS
  ===================== */
  const next = () => {
    if (isAnimating || index >= maxIndex) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    setIndex(index + 1);
  };

  const prev = () => {
    if (isAnimating || index <= 0) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    setIndex(index - 1);
  };

  return (
    <section className="bg-[#fffaf3] px-6 py-16" data-reveal>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">
            {title}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">
            {subtitle}
          </p>
        </div>

        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-[var(--color-brand-green)] hover:text-white transition"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-[var(--color-brand-green)] hover:text-white transition"
            aria-label="Next"
          >
            ›
          </button>

          {/* VIEWPORT */}
          <div className="overflow-x-hidden overflow-y-visible py-6">
            <div
              ref={trackRef}
              className="flex w-full"
            >
              {members.map((member, i) => (
                <div
                  key={i}
                  className="basis-1/4 min-w-0 flex-shrink-0"
                >
                  <div className="px-4">
                    <div
                      onMouseEnter={() => {
                        setIsHovered(true);
                        setHoveredCard(i);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setHoveredCard(null);
                      }}
                      className={`bg-white rounded-xl p-6 text-center shadow-lg transition-all duration-300 ${
                        hoveredCard === i
                          ? 'scale-110 -translate-y-4 shadow-2xl z-20'
                          : ''
                      }`}
                    >
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[var(--color-brand-green)]/20">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--color-brand-slate)]">
                        {member.name}
                      </h3>
                      <p className="text-sm text-[var(--color-brand-green)] font-semibold">
                        {member.role}
                      </p>
                      <p className="text-sm mt-2 opacity-80">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




export default function About() {
  useReveal();

  return (
    <>
      <SEO
        title="About SPEED Trust - Mission, Vision & Objectives"
        description="Learn about SPEED Trust's mission to conserve ecosystems, empower rural youth, and promote sustainable agriculture across South India."
        canonical="/about"
      />
      <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-cover bg-center hero-fade" style={{ backgroundImage: "url('/images/about/cleaning.png')" }} data-reveal>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-4 px-6 py-16 text-white">
            <h1 className="text-4xl font-bold sm:text-5xl">About SPEED Trust</h1>
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">Southern Pothigai Environmental and Educational Development</p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="px-6 py-16 bg-[#fffaf3]" data-reveal>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)] mb-12 text-center">About Us</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-4 flex items-center min-h-full">
                <p className="text-lg leading-relaxed text-[var(--color-brand-slate)]">
                  {aboutText}
                </p>
              </div>
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/about/about.png"
                  alt="About SPEED Trust"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-[#f4efe6] px-6 py-16" data-reveal>
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[var(--color-brand-slate)]">Mission</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[var(--color-brand-green)]">Our Mission Pillars</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((card) => (
                <div
                  key={card.title}
                  data-reveal
                  className="rounded-xl border border-[var(--color-brand-green)]/25 bg-white/90 p-6 shadow-[0_10px_26px_rgba(12,28,20,0.08)] transition transform hover:-translate-y-1 hover:shadow-xl text-center space-y-4"
                >
                  <div className="py-4">
                    <MissionIcon type={card.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-brand-slate)]">{card.title}</h3>
                  <p className="text-sm text-[var(--color-brand-slate)]/80 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-6 py-16 bg-[#fffaf3]" data-reveal>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-[var(--color-brand-slate)] text-center mb-8">Vision</h2>
            <div className="bg-gradient-to-br from-[#e8f5ea] to-[#f0f9f1] rounded-2xl p-10 shadow-lg border border-[var(--color-brand-green)]/20">
              <p className="text-2xl font-bold leading-relaxed text-[var(--color-brand-slate)] text-center">
                To build a sustainable and environmentally conscious society by empowering communities through education, technology, and ecological restoration.
              </p>
            </div>
          </div>
        </section>

        {/* Trustees Section */}
        <TeamGrid
          members={trustees}
          title="Our Trustees"
          subtitle="Leadership & Governance"
        />

        {/* Advisors Section */}
        <TeamCarouselAnimated
          members={advisors}
          title="Our Advisors"
          subtitle="Expert Guidance & Support"
        />
      </main>
    </>
  );
}
