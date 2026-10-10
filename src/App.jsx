import { useEffect, useRef, useState } from "react";

/* ───────────────────────────── Config ───────────────────────────── */

const PROFILE = {
  name: "Cameron Caswell",
  role: "Software Engineer",
  email: "cameron.caswell@outlook.com",
  github: "https://github.com/Caswell30",
  linkedin: "https://www.linkedin.com/in/cameron-caswell-53391a331/",
  location: "Scottish Borders, UK",
};

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "Ledgerly",
    kind: "Full-stack · Live",
    featured: true,
    visual: "bars",
    summary:
      "A personal finance app that turns raw transactions into clear monthly insight — budgets, category breakdowns and alerts, behind secure authentication.",
    points: [
      "Spring Boot REST API on PostgreSQL with stateless JWT auth",
      "Spending dashboards, monthly budget limits with alerts, CSV export",
      "Containerised with Docker Compose; frontend shipped on Vercel",
    ],
    stack: ["React", "Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
    links: [{ label: "Live app", href: "https://ledgerly-caswell.vercel.app" }],
  },
  {
    title: "GlucoGuide",
    kind: "iOS · MEng dissertation",
    featured: true,
    visual: "line",
    summary:
      "A diabetes management app for iOS that brings glucose readings, logging and trends into one calm, accessible interface.",
    points: [
      "Native Swift integration with Apple HealthKit",
      "On-device persistence with CoreData — private by default",
      "Cross-platform UI layer built in React Native",
    ],
    stack: ["React Native", "Swift", "HealthKit", "CoreData"],
    links: [{ label: "Source", href: "https://github.com/Caswell30/GlucoGuide" }],
  },
  {
    title: "DynamicIslandW11",
    kind: "Desktop · Systems",
    summary:
      "A Dynamic Island–style desktop overlay showing live Spotify playback and Discord presence in a minimal, always-on-top widget.",
    points: ["Async Spotify OAuth server on Tokio", "Lightweight Tauri shell — small binary, low memory"],
    stack: ["Rust", "Tauri", "Spotify API", "Discord IPC"],
    links: [{ label: "Source", href: "https://github.com/Caswell30/DynamicIslandW11" }],
  },
  {
    title: "Ada-SPARK Lift System",
    kind: "Formal methods · Safety-critical",
    summary:
      "A five-package lift controller mathematically proven free of runtime errors and correct against its safety contracts.",
    points: ["Platinum-level GNATprove verification", "107 / 107 proof obligations discharged"],
    stack: ["Ada", "SPARK", "GNATprove"],
    links: [],
    note: "Coursework · available on request",
  },
  {
    title: "Secure Banking App",
    kind: "Application security",
    summary:
      "Hardened a deliberately vulnerable Java banking application against the OWASP Top 10, with every fix verified by targeted tests.",
    points: ["Fixed SQLi, XSS, CSRF, path traversal and broken access control", "Secured session handling and file uploads"],
    stack: ["Java", "Spring Boot", "OWASP Top 10"],
    links: [],
    note: "Coursework · available on request",
  },
  {
    title: "DE-Store",
    kind: "Architecture · Multi-tier",
    summary:
      "A multi-tier e-commerce system with cleanly separated presentation, business and data layers.",
    points: ["Layered architecture with a modular Gradle build", "Relational schema for products, stock and orders"],
    stack: ["Java", "Gradle", "SQL"],
    links: [{ label: "Source", href: "https://github.com/Caswell30/DE-Store" }],
  },
];

const EXPERIENCE = [
  {
    role: "Computer Engineer",
    org: "Border Computing",
    period: "Dec 2025 — Present",
    place: "Scottish Borders",
    current: true,
    points: [
      "Diagnose, repair and build systems for business and home clients",
      "Set up and support hardware, software and networks on site",
      "Own the client relationship from fault report through to resolution",
    ],
  },
  {
    role: "BI Analyst Intern",
    org: "The Craneware Group",
    sub: "Saltire Scholars Programme",
    period: "Jun — Sep 2025",
    place: "Edinburgh",
    points: [
      "Built reporting and dashboards for a healthcare software business",
      "Wrote SQL to extract, clean and model data for stakeholders",
      "Selected through Scotland's competitive Saltire Scholars internship programme",
    ],
  },
  {
    role: "Child Practitioner",
    org: "Scoosh",
    period: "2022 — 2025",
    place: "Scottish Borders",
    points: [
      "Three years in a role built on trust, responsibility and clear communication",
      "Stayed calm and decisive under pressure — skills I bring to every team",
    ],
  },
];

const SKILLS = [
  { group: "Languages", icon: "code", items: ["Java", "TypeScript", "JavaScript", "Rust", "Swift", "Ada / SPARK", "SQL"] },
  { group: "Frameworks", icon: "layers", items: ["React", "React Native", "Spring Boot", "Tauri", "Tailwind CSS"] },
  { group: "Data & Platform", icon: "db", items: ["PostgreSQL", "CoreData", "Docker", "Gradle", "Git", "Vercel"] },
  { group: "Practice", icon: "shield", items: ["REST API design", "JWT auth", "OWASP Top 10", "Formal verification", "Testing"] },
];

/* ───────────────────────────── Icons ───────────────────────────── */

const Icon = ({ name, className = "h-4 w-4" }) => {
  const p = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": true };
  switch (name) {
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );
    case "mail":
      return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
    case "arrow-up-right":
      return (<svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
    case "arrow-right":
      return (<svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
    case "sun":
      return (<svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>);
    case "moon":
      return (<svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>);
    case "menu":
      return (<svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
    case "close":
      return (<svg {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
    case "copy":
      return (<svg {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>);
    case "check":
      return (<svg {...p}><path d="m5 12 5 5L20 7" /></svg>);
    case "lock":
      return (<svg {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
    case "code":
      return (<svg {...p}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>);
    case "layers":
      return (<svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>);
    case "db":
      return (<svg {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></svg>);
    case "shield":
      return (<svg {...p}><path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
    default:
      return null;
  }
};

/* ───────────────────────────── Hooks ───────────────────────────── */

function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────── Primitives ─────────────────────────── */

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-navy-200/80 bg-navy-50 px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight text-navy-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-navy-200">
    {children}
  </span>
);

function SectionHeader({ index, label, title, intro }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wide text-navy-500 dark:text-navy-400">
        <span className="text-signal-600 dark:text-signal-400">{index}</span>
        <span className="h-px w-8 bg-navy-200 dark:bg-white/15" />
        <span className="uppercase">{label}</span>
      </div>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl dark:text-white">{title}</h2>
      {intro && <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-600 dark:text-navy-300">{intro}</p>}
    </Reveal>
  );
}

const IconLink = ({ href, label, icon }) => (
  <a
    href={href}
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel="noreferrer"
    aria-label={label}
    title={label}
    className="grid h-10 w-10 place-items-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-navy-400 hover:text-navy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-600 dark:border-white/10 dark:text-navy-300 dark:hover:border-white/30 dark:hover:text-white"
  >
    <Icon name={icon} className="h-[18px] w-[18px]" />
  </a>
);

/* ───────────────────────────── Nav ───────────────────────────── */

function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-navy-200/70 bg-mist/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-navy-950/80"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-950 text-[13px] font-bold tracking-tight text-white transition-transform group-hover:-rotate-6 dark:bg-white dark:text-navy-950">
            CC
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-navy-950 sm:block dark:text-white">Cameron Caswell</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                active === n.id
                  ? "text-navy-950 dark:text-white"
                  : "text-navy-500 hover:text-navy-950 dark:text-navy-400 dark:hover:text-white"
              }`}
            >
              {n.label}
              <span
                className={`absolute inset-x-3 -bottom-px h-px bg-signal-600 transition-transform duration-300 dark:bg-signal-400 ${
                  active === n.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="grid h-9 w-9 place-items-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:text-navy-950 dark:border-white/10 dark:text-navy-300 dark:hover:text-white"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="h-4 w-4" />
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden rounded-lg bg-navy-950 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 sm:inline-flex dark:bg-white dark:text-navy-950 dark:hover:bg-navy-100"
          >
            Get in touch
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-navy-200 text-navy-700 md:hidden dark:border-white/10 dark:text-navy-200"
          >
            <Icon name={open ? "close" : "menu"} className="h-4 w-4" />
          </button>
        </div>
      </Container>

      <div className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${open ? "max-h-80" : "max-h-0"}`}>
        <Container className="flex flex-col pb-4">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="border-b border-navy-100 py-3 text-[15px] text-navy-700 last:border-0 dark:border-white/[0.06] dark:text-navy-200"
            >
              {n.label}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  const facts = [
    ["Currently", "Computer Engineer, Border Computing"],
    ["Studying", "MEng Software Engineering, Edinburgh Napier"],
    ["Open to", "Graduate roles · Edinburgh · Glasgow · Germany"],
    ["Based in", PROFILE.location],
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 md:pb-28">
      {/* faint engineering grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] dark:opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <style>{`:root{--grid:rgba(47,127,122,.07)} .dark{--grid:rgba(111,195,184,.06)}`}</style>

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/70 py-1 pr-3 pl-2 text-xs font-medium text-navy-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-navy-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500/60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
                </span>
                Open to graduate roles for 2027
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-navy-950 sm:text-6xl md:text-7xl dark:text-white">
                Cameron Caswell
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 font-mono text-[13px] tracking-tight text-navy-500 sm:text-sm dark:text-navy-400">
                Software Engineer <span className="mx-1.5 text-navy-300 dark:text-navy-600">·</span> MEng Edinburgh Napier{" "}
                <span className="mx-1.5 text-navy-300 dark:text-navy-600">·</span> Graduating 2027
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-700 sm:text-xl dark:text-navy-200">
                I build software that has to be right — from production web apps to{" "}
                <span className="text-signal-700 dark:text-signal-300">formally verified, safety-critical systems</span>.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-lg bg-navy-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800 dark:bg-white dark:text-navy-950 dark:hover:bg-navy-100"
                >
                  View selected work
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <div className="flex items-center gap-2">
                  <IconLink href={PROFILE.github} label="GitHub" icon="github" />
                  <IconLink href={PROFILE.linkedin} label="LinkedIn" icon="linkedin" />
                  <IconLink href={`mailto:${PROFILE.email}`} label="Email" icon="mail" />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={380}>
            <dl className="divide-y divide-navy-200/80 rounded-2xl border border-navy-200/80 bg-white/60 backdrop-blur dark:divide-white/[0.06] dark:border-white/[0.08] dark:bg-white/[0.02]">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[88px_1fr] gap-4 px-5 py-4 sm:grid-cols-[104px_1fr]">
                  <dt className="font-mono text-[11px] tracking-wide text-navy-400 uppercase dark:text-navy-500">{k}</dt>
                  <dd className="text-sm text-navy-800 dark:text-navy-100">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────── About ───────────────────────────── */

function About() {
  const stats = [
    ["107/107", "proof obligations discharged at SPARK Platinum"],
    ["6", "projects across web, mobile, desktop and systems"],
    ["3", "roles alongside full-time study"],
  ];
  return (
    <section id="about" className="scroll-mt-20 border-t border-navy-200/70 py-24 md:py-32 dark:border-white/[0.06]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeader index="01" label="About" title="Engineer first. Student second." />
          <div className="lg:pt-10">
            <Reveal>
              <p className="text-lg leading-relaxed text-navy-700 dark:text-navy-200">
                I'm a final-stage MEng Software Engineering student at Edinburgh Napier, working as a Computer Engineer
                alongside my degree. I care about software that's correct, secure and pleasant to use — and I'm as
                comfortable proving a lift controller can't fail as I am shipping a React front end.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-navy-600 dark:text-navy-300">
                I'm looking for a graduate software engineering role from summer 2027 — in Edinburgh, Glasgow or Germany —
                on a team that takes engineering quality seriously.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-navy-200/80 bg-navy-200/80 sm:grid-cols-3 dark:border-white/[0.08] dark:bg-white/[0.08]">
              {stats.map(([n, l], i) => (
                <Reveal key={n} delay={150 + i * 80} className="bg-white p-5 dark:bg-navy-950">
                  <div className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">{n}</div>
                  <div className="mt-1 text-sm leading-snug text-navy-500 dark:text-navy-400">{l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────── Projects ───────────────────────────── */

function ProjectVisual({ type }) {
  if (type === "bars") {
    const bars = [38, 62, 45, 80, 56, 72, 50, 88, 64, 70, 46, 76];
    return (
      <div className="flex h-28 items-end gap-1.5" aria-hidden>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%`, transitionDelay: `${i * 25}ms` }}
            className={`flex-1 rounded-t-[3px] transition-all duration-500 group-hover:opacity-100 ${
              i === 7 ? "bg-signal-600 dark:bg-signal-400" : "bg-navy-200 opacity-80 dark:bg-white/15"
            }`}
          />
        ))}
      </div>
    );
  }
  return (
    <svg viewBox="0 0 300 112" className="h-28 w-full" preserveAspectRatio="none" aria-hidden>
      <rect x="0" y="34" width="300" height="38" className="fill-navy-100 dark:fill-white/[0.05]" />
      <path
        d="M0 70 C 25 66, 40 40, 65 44 S 105 82, 130 70 S 170 30, 195 38 S 240 74, 265 58 S 290 46, 300 48"
        fill="none"
        strokeWidth="2"
        className="stroke-signal-600 dark:stroke-signal-400"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="195" cy="38" r="3.5" className="fill-signal-600 dark:fill-signal-400" />
    </svg>
  );
}

function ProjectCard({ p, i }) {
  const primary = p.links[0];
  return (
    <Reveal delay={(i % 2) * 90} className="h-full">
      <article className="group relative flex h-full flex-col rounded-2xl border border-navy-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal-500/40 hover:shadow-[0_18px_40px_-24px_rgba(11,18,36,0.35)] sm:p-7 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-signal-400/30 dark:hover:bg-white/[0.035] dark:hover:shadow-none">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] tracking-wide text-navy-400 uppercase dark:text-navy-500">{p.kind}</span>
          <span className="font-mono text-[11px] text-navy-300 dark:text-navy-600">{String(i + 1).padStart(2, "0")}</span>
        </div>

        {p.featured && (
          <div className="mt-6 rounded-xl border border-signal-100/70 bg-signal-50/50 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <ProjectVisual type={p.visual} />
          </div>
        )}

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy-950 dark:text-white">
          {primary ? (
            <a href={primary.href} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-navy-600 dark:text-navy-300">{p.summary}</p>

        <ul className="mt-5 space-y-2">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
              <span className="mt-[9px] h-px w-3 shrink-0 bg-navy-300 dark:bg-navy-600" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-5 border-t border-navy-100 pt-4 dark:border-white/[0.06]">
            {p.links.length ? (
              p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 dark:text-white"
                >
                  {l.label}
                  <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-navy-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-600 dark:group-hover:text-signal-400" />
                </a>
              ))
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-navy-400 dark:text-navy-500">
                <Icon name="lock" className="h-3.5 w-3.5" />
                {p.note}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-navy-200/70 py-24 md:py-32 dark:border-white/[0.06]">
      <Container>
        <SectionHeader
          index="02"
          label="Selected work"
          title="Things I've built"
          intro="A cross-section of production apps, systems work and security engineering."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
        <Reveal className="mt-10">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-signal-700 hover:text-signal-600 dark:text-signal-300 dark:hover:text-signal-400"
          >
            More on GitHub
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────────── Experience ───────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-navy-200/70 py-24 md:py-32 dark:border-white/[0.06]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeader index="03" label="Experience" title="Where I've worked" />
          <ol className="relative lg:pt-10">
            {EXPERIENCE.map((e, i) => (
              <Reveal as="li" key={e.org} delay={i * 90} className="relative grid gap-2 pb-12 pl-8 last:pb-0 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-0">
                {/* rail */}
                <span className="absolute top-2 bottom-0 left-[3px] w-px bg-navy-200 sm:left-[150px] dark:bg-white/10" aria-hidden />
                <span
                  aria-hidden
                  className={`absolute top-[7px] left-0 h-[7px] w-[7px] rounded-full ring-4 ring-mist sm:left-[147px] dark:ring-navy-950 ${
                    e.current ? "bg-signal-600 dark:bg-signal-400" : "bg-navy-300 dark:bg-navy-600"
                  }`}
                />
                <div className="font-mono text-xs leading-6 text-navy-500 dark:text-navy-400">
                  {e.period}
                  <div className="text-navy-400 dark:text-navy-500">{e.place}</div>
                </div>
                <div className="sm:pl-8">
                  <h3 className="text-lg font-semibold tracking-tight text-navy-950 dark:text-white">{e.role}</h3>
                  <p className="mt-0.5 text-[15px] text-navy-600 dark:text-navy-300">
                    {e.org}
                    {e.sub && <span className="text-navy-400 dark:text-navy-500"> · {e.sub}</span>}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-navy-300 dark:bg-navy-600" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────── Skills ───────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-navy-200/70 py-24 md:py-32 dark:border-white/[0.06]">
      <Container>
        <SectionHeader index="04" label="Toolkit" title="What I work with" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 80}>
              <div className="h-full rounded-2xl border border-navy-200/80 bg-white p-6 transition-colors hover:border-navy-300 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/20">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal-50 text-signal-700 ring-1 ring-signal-100 dark:bg-signal-400/10 dark:text-signal-300 dark:ring-signal-400/20">
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-navy-950 dark:text-white">{s.group}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-navy-200/80 px-2.5 py-1 text-[13px] text-navy-700 transition-colors hover:border-signal-500/60 hover:text-signal-700 dark:border-white/10 dark:text-navy-200 dark:hover:border-signal-400/50 dark:hover:text-signal-300"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────── Contact ───────────────────────────── */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-navy-200/70 py-24 md:py-32 dark:border-white/[0.06]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-white sm:px-12 sm:py-20 dark:border dark:border-white/[0.08] dark:bg-white/[0.03]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-signal-400/60" />
            <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wide text-navy-400">
              <span className="text-signal-400">05</span>
              <span className="h-px w-8 bg-white/15" />
              <span className="uppercase">Contact</span>
            </div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Let's build something reliable.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-300">
              Hiring for a 2027 graduate role, or just want to talk engineering? My inbox is open.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${PROFILE.email}`}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-navy-100"
              >
                <Icon name="mail" className="h-4 w-4" />
                <span className="truncate">{PROFILE.email}</span>
              </a>
              <button
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-navy-200 transition-colors hover:border-white/35 hover:text-white"
              >
                <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm">
              {[
                ["GitHub", PROFILE.github, "github"],
                ["LinkedIn", PROFILE.linkedin, "linkedin"],
              ].map(([label, href, icon]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-navy-300 transition-colors hover:text-white">
                  <Icon name={icon} className="h-4 w-4" />
                  {label}
                  <Icon name="arrow-up-right" className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
              <span className="inline-flex items-center gap-2 text-navy-400">{PROFILE.location}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────────── App ───────────────────────────── */

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="min-h-screen bg-mist font-sans text-navy-900 antialiased transition-colors duration-300 dark:bg-navy-950 dark:text-navy-100">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-navy-950 focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="py-10">
        <Container className="flex flex-col items-center justify-between gap-3 font-mono text-xs text-navy-400 sm:flex-row dark:text-navy-500">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>Built with React &amp; Tailwind · Deployed on Vercel</span>
        </Container>
      </footer>
    </div>
  );
}
