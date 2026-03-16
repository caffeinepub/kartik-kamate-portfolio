import { Badge } from "@/components/ui/badge";
import {
  Award,
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useTypingEffect(text: string, speed = 55, delay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return { displayed, done };
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Contact",
];

const TECH_STACK = ["Java", "Spring Boot", "MySQL", "REST APIs", "Python"];

const SKILLS: { category: string; icon: React.ReactNode; items: string[] }[] = [
  {
    category: "Languages",
    icon: <Terminal className="w-4 h-4" />,
    items: ["Java", "C", "C++", "Python"],
  },
  {
    category: "Backend",
    icon: <Layers className="w-4 h-4" />,
    items: [
      "Core Java",
      "JDBC",
      "Spring Core",
      "Spring MVC",
      "Spring Boot",
      "REST APIs",
    ],
  },
  {
    category: "Databases",
    icon: <Code2 className="w-4 h-4" />,
    items: ["MySQL", "JPA", "Hibernate"],
  },
  {
    category: "Web",
    icon: <Code2 className="w-4 h-4" />,
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Tools & Platforms",
    icon: <Terminal className="w-4 h-4" />,
    items: ["Git", "GitHub", "Maven"],
  },
  {
    category: "Core Concepts",
    icon: <Layers className="w-4 h-4" />,
    items: ["Data Structures", "Operating Systems", "MVC Architecture"],
  },
];

const PROJECTS = [
  {
    title: "Employee Management System",
    tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    desc: "A backend-driven employee management system supporting secure CRUD operations, leave approval workflows, and role-based access control.",
    bullets: [
      "Secure CRUD operations with leave approval workflows",
      "Scalable REST APIs for onboarding and role-based access control",
      "MySQL via JPA/Hibernate for efficient data persistence",
      "Layered MVC architecture (Controller–Service–Repository)",
    ],
  },
  {
    title: "AI Powered Resume Fraud Detection",
    tech: ["Java", "Python", "NLP", "Machine Learning"],
    desc: "A machine learning system to detect fraudulent resume data using NLP, integrating Java backend with Python ML models.",
    bullets: [
      "ML system detecting fraudulent resume data using NLP",
      "Java backend integrated with Python ML models",
      "Automated screening reducing manual verification effort",
      "Structured data processing pipeline for improved accuracy",
    ],
  },
  {
    title: "Virtual Assistant for Desktop",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "An interactive desktop-based virtual assistant for web search and task automation with a responsive UI.",
    bullets: [
      "Interactive assistant for web search and automation",
      "Event-driven programming for real-time user interaction",
      "Responsive and user-friendly interface design",
      "Optimised client-side scripting for performance",
    ],
  },
];

// ─── Nav ────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { displayed, done } = useTypingEffect(
    "Bridging Java backend expertise with clean system design.",
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.toLowerCase());
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans">
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-blue { text-shadow: 0 0 40px rgba(96,165,250,0.4); }
        .card-hover {
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
        }
        .card-hover:hover {
          border-color: rgba(96,165,250,0.3);
          background: rgba(96,165,250,0.04);
          transform: translateY(-2px);
        }
        .skill-pill {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s ease;
        }
        .skill-pill:hover {
          background: rgba(96,165,250,0.12);
          border-color: rgba(96,165,250,0.4);
          color: #93c5fd;
        }
        .section-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }
        .photo-ring {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          padding: 3px;
          border-radius: 9999px;
        }
        .dot-grid {
          background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
        .nav-active {
          color: #60a5fa;
        }
        .timeline-dot {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          box-shadow: 0 0 12px rgba(96,165,250,0.5);
        }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl gradient-text cursor-default">
            KK.
          </span>

          <ul className="hidden md:flex gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  type="button"
                  data-ocid={`nav.${link.toLowerCase()}.link`}
                  onClick={() => scrollTo(link)}
                  className={`px-4 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                    activeSection === link.toLowerCase()
                      ? "nav-active font-medium"
                      : "text-gray-400 hover:text-gray-100"
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <a
            href="/assets/uploads/Kartik_Kamate-CSE-2026-1-1.pdf"
            download
            data-ocid="nav.resume.button"
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-md border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5">
            <ul className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    data-ocid={`nav.mobile.${link.toLowerCase()}.link`}
                    onClick={() => scrollTo(link)}
                    className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/assets/uploads/Kartik_Kamate-CSE-2026-1-1.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400"
                >
                  <Download className="w-3.5 h-3.5" /> Download Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center dot-grid overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <p className="fade-in delay-100 text-blue-400 text-sm font-medium mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-blue-400" />
              Salutations, Recruiter 👋
            </p>

            <h1 className="fade-in delay-200 font-display text-5xl sm:text-6xl font-bold leading-tight mb-2">
              Kartik
            </h1>
            <h1 className="fade-in delay-300 font-display text-5xl sm:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text glow-blue">Kamate</span>
            </h1>

            <p className="fade-in delay-400 text-gray-400 text-base sm:text-lg leading-relaxed mb-2 min-h-[3rem]">
              {displayed}
              {!done && (
                <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse" />
              )}
            </p>

            <p className="fade-in delay-500 text-gray-500 text-sm mb-8 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Nipani, Karnataka · CSE 2026
            </p>

            <div className="fade-in delay-500 mb-8">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                Current tech focus
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    className="skill-pill text-xs px-3 py-1 rounded-full text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="fade-in delay-600 flex flex-wrap gap-3">
              <button
                type="button"
                data-ocid="hero.projects.primary_button"
                onClick={() => scrollTo("Projects")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                }}
              >
                View Projects
              </button>
              <a
                href="/assets/uploads/Kartik_Kamate-CSE-2026-1-1.pdf"
                download
                data-ocid="hero.resume.secondary_button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-white/10 text-gray-300 hover:border-white/20 hover:text-white transition-all"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
            </div>

            <div className="fade-in delay-600 flex gap-3 mt-6">
              {[
                {
                  ocid: "hero.github.link",
                  href: "https://github.com",
                  icon: <Github className="w-4 h-4" />,
                },
                {
                  ocid: "hero.linkedin.link",
                  href: "https://www.linkedin.com",
                  icon: <Linkedin className="w-4 h-4" />,
                },
                {
                  ocid: "hero.email.link",
                  href: "mailto:kartikkamate00@gmail.com",
                  icon: <Mail className="w-4 h-4" />,
                },
              ].map((s) => (
                <a
                  key={s.ocid}
                  data-ocid={s.ocid}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="p-2 rounded-md border border-white/8 text-gray-500 hover:text-white hover:border-white/20 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="fade-in delay-300 relative">
              <div className="photo-ring">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-14-at-4.31.08-PM-2.jpeg"
                  alt="Kartik Kamate"
                  className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-4 bg-[#0f0f1a] border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-300 font-medium">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <RevealSection id="about">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader label="About Me" title="Who I am" />
          <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a{" "}
                <span className="text-white font-medium">
                  Computer Science Engineering
                </span>{" "}
                student specializing in{" "}
                <span className="text-blue-400 font-medium">
                  Java Backend Development
                </span>
                . Experienced in building scalable RESTful APIs using Spring
                Boot and integrating MySQL databases.
              </p>
              <p>
                Passionate about writing clean, maintainable code and solving
                real-world problems using efficient system design principles.
                Currently pursuing BE at Sri Sairam College of Engineering.
              </p>
              <div className="pt-4 space-y-3">
                {[
                  {
                    icon: <Mail className="w-4 h-4 text-blue-400" />,
                    val: "kartikkamate00@gmail.com",
                  },
                  {
                    icon: <Phone className="w-4 h-4 text-purple-400" />,
                    val: "7259720546",
                  },
                  {
                    icon: <MapPin className="w-4 h-4 text-pink-400" />,
                    val: "Nipani, Karnataka",
                  },
                ].map(({ icon, val }) => (
                  <div key={val} className="flex items-center gap-3 text-sm">
                    {icon}
                    <span className="text-gray-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "8.34", label: "CGPA", sub: "Academic Score" },
                { value: "3+", label: "Projects", sub: "Built & Deployed" },
                { value: "1", label: "Internship", sub: "Motion Cut" },
                {
                  value: "2",
                  label: "Certifications",
                  sub: "Microsoft & HackerRank",
                },
              ].map((s) => (
                <div key={s.label} className="card-hover rounded-xl p-5">
                  <div className="text-3xl font-display font-bold gradient-text mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {s.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <hr className="section-divider" />

      {/* ── Experience ─────────────────────────────────────────────── */}
      <RevealSection id="experience">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <SectionHeader label="Work" title="Experience" />
          <div className="mt-12 space-y-6">
            <ExperienceCard
              jobTitle="Java Backend Intern"
              company="Motion Cut"
              period="Aug 2025 – Sep 2025"
              bullets={[
                "Assisted in backend feature development using Java and MySQL.",
                "Applied Object-Oriented Programming (OOP) principles to improve modularity and maintainability.",
                "Participated in debugging, API testing, and agile development workflows.",
              ]}
            />
          </div>
        </div>
      </RevealSection>

      <hr className="section-divider" />

      {/* ── Projects ───────────────────────────────────────────────── */}
      <RevealSection id="projects">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader label="Work" title="Featured Projects" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </RevealSection>

      <hr className="section-divider" />

      {/* ── Skills ─────────────────────────────────────────────────── */}
      <RevealSection id="skills">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader label="Tools" title="Skills & Technologies" />
          <p className="text-gray-500 text-sm mt-2 max-w-xl">
            A backend-focused engineer with hands-on experience across the Java
            ecosystem, databases, and web fundamentals.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((g) => (
              <SkillGroup key={g.category} group={g} />
            ))}
          </div>
        </div>
      </RevealSection>

      <hr className="section-divider" />

      {/* ── Education + Certs ──────────────────────────────────────── */}
      <RevealSection id="education">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Education */}
            <div>
              <SectionHeader label="Study" title="Education" />
              <div className="card-hover rounded-xl p-6 mt-8 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Sri Sairam College of Engineering
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    BE – Computer Science Engineering
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      CSE 2026
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      CGPA 8.34
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <SectionHeader label="Credentials" title="Certifications" />
              <div className="mt-8 space-y-3">
                {[
                  {
                    title: "Microsoft AZ-900",
                    sub: "Cloud Computing Fundamentals",
                    issuer: "Microsoft",
                    color: "#3b82f6",
                  },
                  {
                    title: "Java Basics",
                    sub: "Programming Certification",
                    issuer: "HackerRank",
                    color: "#22c55e",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="card-hover rounded-xl p-4 flex gap-3 items-center"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}18` }}
                    >
                      <Award className="w-4 h-4" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {c.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {c.sub} · {c.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-12">
            <SectionHeader label="Recognition" title="Achievements" />
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                {
                  title: "5 Star Java",
                  platform: "HackerRank",
                  stars: 5,
                  color: "#f59e0b",
                },
                {
                  title: "4 Star C & SQL",
                  platform: "HackerRank",
                  stars: 4,
                  color: "#f59e0b",
                },
              ].map((a) => (
                <div
                  key={a.title}
                  className="card-hover rounded-xl p-5 flex gap-4 items-center"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${a.color}15` }}
                  >
                    <Star className="w-5 h-5" style={{ color: a.color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {a.title}
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {(["s1", "s2", "s3", "s4", "s5"] as const).map(
                        (sk, si) => (
                          <Star
                            key={sk}
                            className="w-3 h-3"
                            style={{
                              color: si < a.stars ? a.color : "#374151",
                              fill: si < a.stars ? a.color : "transparent",
                            }}
                          />
                        ),
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {a.platform}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <hr className="section-divider" />

      {/* ── Contact ────────────────────────────────────────────────── */}
      <RevealSection id="contact">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <SectionHeader label="Reach out" title="Get in Touch" centered />
          <p className="text-gray-500 text-sm mt-3 mb-10">
            Currently open to backend engineering roles and internship
            opportunities. Feel free to drop me a message.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              {
                ocid: "contact.email.link",
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                value: "kartikkamate00@gmail.com",
                href: "mailto:kartikkamate00@gmail.com",
                color: "#f472b6",
              },
              {
                ocid: "contact.phone.link",
                icon: <Phone className="w-5 h-5" />,
                label: "Phone",
                value: "+91 7259720546",
                href: "tel:7259720546",
                color: "#34d399",
              },
              {
                ocid: "contact.linkedin.link",
                icon: <Linkedin className="w-5 h-5" />,
                label: "LinkedIn",
                value: "linkedin.com/in/kartik",
                href: "https://www.linkedin.com",
                color: "#60a5fa",
              },
              {
                ocid: "contact.github.link",
                icon: <Github className="w-5 h-5" />,
                label: "GitHub",
                value: "github.com/kartik",
                href: "https://github.com",
                color: "#a78bfa",
              },
            ].map((c) => (
              <a
                key={c.label}
                data-ocid={c.ocid}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card-hover rounded-xl p-5 flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}15`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500">{c.label}</div>
                  <div className="text-sm font-medium text-white">
                    {c.value}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 ml-auto group-hover:text-gray-300 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-display font-bold gradient-text">KK.</span>
            <div className="flex gap-6 text-xs text-gray-600">
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => scrollTo(l)}
                  className="hover:text-gray-300 transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {[
                {
                  href: "https://github.com",
                  icon: <Github className="w-4 h-4" />,
                },
                {
                  href: "https://www.linkedin.com",
                  icon: <Linkedin className="w-4 h-4" />,
                },
                {
                  href: "mailto:kartikkamate00@gmail.com",
                  icon: <Mail className="w-4 h-4" />,
                },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-300 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-6">
            © {new Date().getFullYear()} Kartik Vishnu Kamate. Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="gradient-text hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── Shared components ───────────────────────────────────────────────────────
function RevealSection({
  id,
  children,
}: { id: string; children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  label,
  title,
  centered,
}: { label: string; title: string; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}

function ExperienceCard({
  jobTitle,
  company,
  period,
  bullets,
}: { jobTitle: string; company: string; period: string; bullets: string[] }) {
  return (
    <div className="card-hover rounded-xl p-6 relative pl-8">
      <div className="absolute left-0 top-8 -translate-x-1/2 w-3 h-3 rounded-full timeline-dot" />
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-white font-semibold">{jobTitle}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 text-sm">{company}</span>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-gray-400">
          {period}
        </span>
      </div>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: { project: (typeof PROJECTS)[0]; index: number }) {
  const { ref, visible } = useReveal();
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];
  const color = COLORS[(index - 1) % COLORS.length];
  return (
    <div
      ref={ref}
      data-ocid={`projects.item.${index}`}
      style={{
        transitionDelay: `${(index - 1) * 100}ms`,
        borderTopColor: visible ? color : "transparent",
      }}
      className={`card-hover rounded-xl p-6 flex flex-col transition-all duration-500 border-t-2 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h3 className="text-white font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-4">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="skill-pill text-[10px] px-2 py-0.5 rounded-full text-gray-400"
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="space-y-1.5 flex-1 mb-5">
        {project.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-xs text-gray-500">
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: color }}
            />
            {b}
          </li>
        ))}
      </ul>
      <a
        data-ocid={`projects.github.link.${index}`}
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors mt-auto"
      >
        <Github className="w-3.5 h-3.5" /> View on GitHub{" "}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

function SkillGroup({ group }: { group: (typeof SKILLS)[0] }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card-hover rounded-xl p-5 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
          {group.icon}
        </div>
        <span className="text-white font-semibold text-sm">
          {group.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="skill-pill text-xs px-2.5 py-1 rounded-md text-gray-400"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
