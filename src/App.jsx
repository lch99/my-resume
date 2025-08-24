import { useMemo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// === Helper components ===
const Section = ({ id, title, children }) => (
    <section id={id} className="relative scroll-mt-24 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
            <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
                {title}
            </motion.h2>
            <div className="mt-8">{children}</div>
        </div>
    </section>
);

const Chip = ({ children }) => (
    <span className="inline-flex items-center rounded-2xl border border-slate-200/60 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur px-3 py-1 text-sm shadow-sm mr-2 mb-2">
    {children}
  </span>
);

// === Data (edit freely) ===
const profile = {
    name: "Lee Chee Hoe (Jonathan)",
    title: "Senior QA Engineer",
    location: "Petaling Jaya, Selangor (Klang Valley)",
    email: "leecheehoe0620@gmail.com",
    phone: "017-2838618",
    links: {
        linkedin: "#",
        github: "#",
    },
    summary:
        "Senior QA Engineer with 3+ years across development and QA. Builds robust automation (Playwright, Selenium), drives performance & API testing, and integrates CI/CD. Mentors 3 juniors and develops custom simulators to cut testing time and boost reliability.",
};

const experience = [
    {
        role: "Senior QA Engineer",
        company: "Confidential Company",
        location: "Petaling Jaya, Malaysia",
        period: "Mar 2024 – Present (1 year 5 months)",
        bullets: [
            "Lead QA efforts; mentor and guide > 3 QA engineers.",
            "Present QA test analysis prior to project kick-off to align stakeholders.",
            "Designed and maintained automation frameworks using Playwright & Selenium.",
            "Reduced testing time by fully adopting Jira workflows and dashboards.",
            "Built Java-based simulators for stress & load testing; used JMeter as needed.",
            "Performed API testing (functional/integration) and integrated tests into CI/CD.",
        ],
    },
    {
        role: "Software Developer",
        company: "Confidential Company",
        location: "Petaling Jaya, Malaysia",
        period: "Aug 2021 – Mar 2024 (2 years 7 months)",
        bullets: [
            "Developed and maintained a back-office portal for internal operations.",
            "Built backend APIs to support gaming systems, including funds transactions.",
            "Collaborated with QA to improve testability, observability, and reliability.",
        ],
    },
    {
        role: "QA Intern",
        company: "RW Tech Labs Sdn Bhd",
        location: "Kuala Lumpur, Malaysia",
        period: "Jan 2021 – Jun 2021 (6 months)",
        bullets: [
            "Developed automation tools for web, mobile, and desktop applications from scratch.",
            "Used Selenium, Appium, TestNG, and WinAppDriver with Java for automation.",
            "Reduced manual testing efforts by creating reusable and scalable test scripts.",
            "Contributed to faster release cycles by integrating automation into CI/CD pipelines.",
        ],
    },
];

const projects = [
    {
        name: "Automation Framework (Playwright + Java)",
        description:
            "Designed a scalable framework for functional & regression testing with reusable fixtures, reporting, and CI hooks.",
        tags: ["Playwright", "Java", "TestNG/JUnit"],
    },
    {
        name: "WebSocket Stress-Testing Simulator",
        description:
            "Custom Java-based simulator to emulate concurrent users, protocol flows, and collect latency metrics for load/stress.",
        tags: ["Java", "WebSocket", "JMeter", "Performance", "Metrics"],
    },
    {
        name: "Back Office Portal",
        description:
            "Designed and developed a scalable Back Office Portal to manage client operations, including user management, reporting dashboards, and transaction monitoring. Implemented modular architecture and role-based access control to improve maintainability and security. Successfully reduced manual administrative tasks by 40% through automation.",
        tags: ["PHP", "MySQL", "REST API", "Role-Based Access Control", "Third-Party Integration"],
    },
    {
        name: "Back-End API",
        description:
            "Engineered a suite of high-performance back-end APIs to support gaming system transactions, fund transfers, and user account operations. Integrated multiple third-party services while ensuring secure data handling and compliance with internal security standards. Optimized API response time by ~30% through query tuning and caching strategies.",
        tags: ["PHP", "REST API", "MySQL", "Third-Party Integration", "Performance Optimization"],
    },
];

const skills = {
    automation: ["Playwright", "Selenium", "TestNG", "JUnit"],
    programming: ["Java", "JavaScript", "Laravel", "SQL"],
    api: ["Postman", "REST Assured", "MQTT"],
    performance: ["JMeter", "Java Simulators", "Stress/Load"],
    cicd: ["Jenkins", "GitHub Actions", "GitLab CI"],
    methods: ["Jira", "Agile/Scrum", "Test Analysis", "Test Planning"],
    languages: ["English", "Malay", "Mandarin", "Cantonese"],
};

const education = [
    {
        school: "Tunku Abdul Rahman University College, KL",
        program:
            "Bachelor of Computer Science (Honours) in Software Engineering (Dual Award)",
        details: [
            "Dual Award with Campbell University, North Carolina (B.Sc. in Software Engineering)",
            "CGPA: 3.65 (TAR UC) | 3.56 (Campbell)",
            "May 2019 – Jun 2021",
        ],
    },
    {
        school: "Tunku Abdul Rahman University College, KL",
        program:
            "Diploma in Science (Computer Science & Computer Mathematics)",
        details: [
            "CGPA: 3.65",
            "Key Courses: OOP, Web Design & Development",
            "May 2017 – May 2019",
        ],
    },
];

// === Animated Background Blobs ===
const Blobs = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-400 via-sky-400 to-teal-300 animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-fuchsia-400 via-rose-400 to-amber-300 animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full blur-[80px] opacity-20 bg-gradient-to-tr from-sky-300 to-violet-400 animate-float" />
    </div>
);

// === Nav ===
const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
    return (
        <>
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 z-40" />
            <nav className="sticky top-0 z-30 backdrop-blur bg-white/60 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <a href="#home" className="font-semibold tracking-tight">{profile.name}</a>
                    <div className="hidden md:flex gap-6 text-sm">
                        <a href="#about" className="hover:underline">About</a>
                        <a href="#experience" className="hover:underline">Experience</a>
                        <a href="#projects" className="hover:underline">Projects</a>
                        <a href="#skills" className="hover:underline">Skills</a>
                        <a href="#education" className="hover:underline">Education</a>
                        <a href="#contact" className="hover:underline">Contact</a>
                    </div>
                </div>
            </nav>
        </>
    );
};

// === Hero ===
const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], [0, 80]);
    return (
        <header id="home" className="relative">
            <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
                <motion.div style={{ y }} className="">
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100"
                    >
                        {profile.name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="mt-3 text-lg md:text-xl text-slate-600 dark:text-slate-300"
                    >
                        {profile.title} · {profile.location}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mt-6 flex flex-wrap items-center gap-3"
                    >
                        <a
                            href={`mailto:${profile.email}`}
                            className="rounded-2xl px-5 py-2.5 text-sm font-medium shadow-md bg-slate-900 text-white hover:shadow-lg hover:scale-[1.02] active:scale-100 transition"
                        >
                            {profile.email}
                        </a>
                        <a
                            href={`tel:${profile.phone}`}
                            className="rounded-2xl px-5 py-2.5 text-sm font-medium shadow bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 hover:shadow-lg transition"
                        >
                            {profile.phone}
                        </a>
                        {profile.links.github !== "#" && (
                            <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-sm underline opacity-80 hover:opacity-100">
                                GitHub
                            </a>
                        )}
                        {profile.links.linkedin !== "#" && (
                            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-sm underline opacity-80 hover:opacity-100">
                                LinkedIn
                            </a>
                        )}
                        <button
                            onClick={() => window.print()}
                            className="rounded-2xl px-5 py-2.5 text-sm font-medium shadow bg-gradient-to-r from-sky-400 to-violet-500 text-white hover:shadow-lg"
                        >
                            Print / Save PDF
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
};

// === Experience Timeline ===
const Experience = () => {
    return (
        <Section id="experience" title="Experience">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3">
                {experience.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="pl-6 pb-10 relative"
                    >
                        <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-tr from-sky-400 to-violet-500 shadow" />
                        <h3 className="text-xl font-semibold">{item.role}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.company} • {item.location}</p>
                        <p className="text-sm mt-0.5 text-slate-500">{item.period}</p>
                        <ul className="mt-3 list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                            {item.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

// === Projects Grid ===
const Projects = () => (
    <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-700 bg-white/70 dark:bg-slate-800/60 backdrop-blur shadow hover:shadow-xl"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-sky-100/60 via-transparent to-fuchsia-100/60 dark:from-sky-900/20 dark:to-fuchsia-900/20" />
                    <div className="p-6">
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                        <div className="mt-4">
                            {p.tags.map((t, j) => (
                                <Chip key={j}>{t}</Chip>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </Section>
);

// === Skills ===
const Skills = () => (
    <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([group, items], idx) => (
                <motion.div
                    key={group}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className="rounded-3xl border border-slate-200/70 dark:border-slate-700 bg-white/70 dark:bg-slate-800/60 backdrop-blur p-6"
                >
                    <h4 className="capitalize font-semibold text-slate-800 dark:text-slate-100">{group}</h4>
                    <div className="mt-3">
                        {items.map((it, i) => (
                            <Chip key={i}>{it}</Chip>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    </Section>
);

// === Education ===
const Education = () => (
    <Section id="education" title="Education">
        <div className="grid md:grid-cols-2 gap-6">
            {education.map((e, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="rounded-3xl border border-slate-200/70 dark:border-slate-700 bg-white/70 dark:bg-slate-800/60 backdrop-blur p-6"
                >
                    <h3 className="font-semibold">{e.school}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{e.program}</p>
                    <ul className="mt-2 list-disc pl-4 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {e.details.map((d, j) => (
                            <li key={j}>{d}</li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    </Section>
);

// === About ===
const About = () => (
    <Section id="about" title="About">
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl"
        >
            {profile.summary}
        </motion.p>
    </Section>
);

// === Contact ===
const Contact = () => (
    <Section id="contact" title="Contact">
        <div className="rounded-3xl border border-slate-200/70 dark:border-slate-700 bg-white/70 dark:bg-slate-800/60 backdrop-blur p-6">
            <p className="text-slate-700 dark:text-slate-300">Feel free to reach out for roles around Klang Valley, Malaysia, or remote opportunities.</p>
            <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="rounded-2xl px-5 py-2.5 text-sm font-medium shadow bg-slate-900 text-white hover:shadow-lg">{profile.email}</a>
                <a href={`tel:${profile.phone}`} className="rounded-2xl px-5 py-2.5 text-sm font-medium shadow bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">{profile.phone}</a>
            </div>
        </div>
    </Section>
);

// === Root ===
export default function Portfolio() {
    // Enable dark mode preference
    const prefersDark = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }, []);

    return (
        <div className={"min-h-screen font-['Inter',system-ui,sans-serif] bg-gradient-to-b from-white via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-900 dark:text-slate-100"}>
            <style>{`
        @keyframes float { 0%,100%{ transform: translateY(-6px) } 50%{ transform: translateY(6px) } }
        .animate-float { animation: float 10s ease-in-out infinite; }
        @keyframes pulse-slow { 0%,100%{ opacity: .25 } 50%{ opacity: .5 } }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slow 12s ease-in-out infinite; }
        @media print { nav, #contact button, .no-print { display:none !important } body { background: #fff } }
      `}</style>
            <Blobs />
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
            <footer className="py-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} {profile.name}. Built with ❤</footer>
        </div>
    );
}