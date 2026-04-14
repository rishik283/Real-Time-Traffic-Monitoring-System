import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaArrowUp,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaPhoneAlt,
  FaSun,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";

const profile = {
  name: "Rishik",
  role: "Full Stack Developer (MERN)",
  tagline: "Building Scalable and Modern Applications",
  phone: "9267969891",
  email: "rishikrishik077@gmail.com",
  location: "Gurugram, Haryana (122001)",
  github: "https://github.com/rishik283",
  linkedin:
    "https://www.linkedin.com/in/rishik-tiwari-02698435a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  resume:
    "https://drive.google.com/file/d/1y5ndbWYKXbf-QcmT9QhUQCkSqv_BGvvg/view?usp=drivesdk",
};

const skills = [
  { name: "JavaScript", progress: 92, icon: SiJavascript, color: "text-yellow-400" },
  { name: "React.js", progress: 90, icon: SiReact, color: "text-cyan-400" },
  { name: "Node.js", progress: 88, icon: SiNodedotjs, color: "text-green-500" },
  { name: "Express.js", progress: 85, icon: SiExpress, color: "text-zinc-400" },
  { name: "MongoDB", progress: 86, icon: SiMongodb, color: "text-emerald-500" },
  { name: "HTML, CSS, Tailwind", progress: 91, icon: SiTailwindcss, color: "text-sky-400" },
  { name: "Git & GitHub", progress: 89, icon: SiGit, color: "text-orange-500" },
];

const projects = [
  {
    title: "Scribble.io Clone",
    description:
      "A real-time multiplayer drawing and guessing game where players join rooms, sketch prompts, and compete through live score updates.",
    tech: "React, Node.js, Socket.io",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com/rishik283/skribble.io-clone",
    live: "https://example.com/scribble-demo",
  },
  {
    title: "Real-Time Traffic Monitoring System",
    description:
      "Tracks congestion and route delays with live API updates, giving users quick visibility into traffic patterns and hotspots.",
    tech: "MERN, External APIs",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com/rishik283",
    live: "https://example.com/traffic-demo",
  },
  {
    title: "Portfolio Website",
    description:
      "A premium personal portfolio featuring animated UI, contact integration, and polished responsive sections for projects and skills.",
    tech: "React, Tailwind CSS, Node.js",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com/rishik283/Personal-portfolio",
    live: "https://example.com/portfolio-demo",
  },
];

const sectionAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");

    const loaderTimer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 450);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const coverLetter = useMemo(
    () =>
      `Dear Hiring Manager,\n\nI am Rishik, a Full Stack Developer specializing in the MERN stack. I build scalable and modern applications with a strong focus on clean architecture, responsive interfaces, and real-world usability.\n\nThrough hands-on projects, I have developed practical experience in JavaScript, React.js, Node.js, Express.js, and MongoDB. I enjoy solving complex problems, collaborating in fast-paced environments, and continuously improving my craft by learning new technologies.\n\nI am actively seeking an internship or full-time opportunity where I can contribute to impactful products while growing with a strong engineering team. I would love the opportunity to discuss how my skills and motivation can add value to your organization.\n\nThank you for your time and consideration.\n\nSincerely,\nRishik`,
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send message");
      setStatus({ type: "success", message: "Message sent successfully. Thank you!" });
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <motion.div
          className="h-20 w-20 rounded-full border-4 border-cyan-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-indigo-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-slate-900/40 border-b border-white/20 dark:border-slate-700/40">
        <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
            {profile.name}
          </a>
          <div className="hidden md:flex gap-6 text-sm">
            {["About", "Skills", "Projects", "Cover Letter", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-cyan-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button onClick={toggleTheme} className="rounded-full p-3 glass-card" aria-label="Toggle theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-20">
        <section id="home" className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial="hidden" animate="show" variants={sectionAnim}>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-600 dark:text-cyan-400">Hello, I am</p>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3">{profile.name}</h1>
            <h2 className="text-xl md:text-2xl text-violet-600 dark:text-violet-300 mt-2">{profile.role}</h2>
            <p className="mt-6 text-lg font-medium">
              <Typewriter words={[profile.tagline, "Turning Ideas Into Scalable Products"]} loop />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary">
                <FaDownload /> Download Resume
              </a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </div>
          </motion.div>
          <motion.div className="glass-card p-6 md:p-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="space-y-3">
              <p><strong>Location:</strong> {profile.location}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <div className="pt-4 flex gap-4">
                <a href={profile.github} target="_blank" rel="noreferrer" className="social-link"><FaGithub /> GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-link"><FaLinkedin /> LinkedIn</a>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section id="about" className="glass-card p-6 md:p-8" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="section-title">About</h3>
          <p className="leading-7 text-slate-700 dark:text-slate-300">
            I am a passionate MERN Stack developer who enjoys building modern web applications that solve real-world
            problems. My development approach combines strong fundamentals in JavaScript, React, Node.js, Express, and
            MongoDB with a product mindset focused on usability and performance. I thrive on problem-solving, continuous
            learning, and turning ideas into scalable digital experiences.
          </p>
        </motion.section>

        <motion.section id="skills" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="section-title">Skills</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="flex items-center gap-2 font-semibold"><Icon className={skill.color} /> {skill.name}</p>
                    <span className="text-sm">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-300/50 dark:bg-slate-700 rounded-full">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section id="projects" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="section-title">Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <article key={project.title} className="glass-card overflow-hidden flex flex-col">
                <img src={project.image} alt={project.title} className="h-44 w-full object-cover" />
                <div className="p-4 space-y-3">
                  <h4 className="font-bold text-lg">{project.title}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{project.description}</p>
                  <p className="text-sm"><strong>Tech:</strong> {project.tech}</p>
                  <div className="flex gap-2">
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary text-sm">GitHub</a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="btn-secondary text-sm">Live Demo</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="cover-letter" className="glass-card p-6 md:p-8" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="section-title">Cover Letter</h3>
          <p className="whitespace-pre-line mt-4 leading-7 text-slate-700 dark:text-slate-300">{coverLetter}</p>
        </motion.section>

        <motion.section id="contact" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="section-title">Contact</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                required
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
                className="input-field"
              />
              <textarea
                rows="4"
                placeholder="Message"
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                required
                className="input-field"
              />
              <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
              {status.message && (
                <p className={status.type === "success" ? "text-green-500" : "text-red-500"}>{status.message}</p>
              )}
            </form>
            <div className="glass-card p-6 space-y-4">
              <p className="flex items-center gap-3"><FaEnvelope /> {profile.email}</p>
              <p className="flex items-center gap-3"><FaPhoneAlt /> {profile.phone}</p>
              <a href={profile.github} target="_blank" rel="noreferrer" className="social-link w-fit"><FaGithub /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-link w-fit"><FaLinkedin /> LinkedIn</a>
            </div>
          </div>
        </motion.section>
      </main>

      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-cyan-500 text-white shadow-lg hover:bg-cyan-600"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
