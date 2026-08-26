import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Github,
  Mail,
  ExternalLink,
  ChevronDown,
  MapPin,
  Calendar,
  ArrowUpRight,
  Star,
  Linkedin,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const GITHUB_USERNAME = "Pimentazx";

const PROJECTS = [
  {
    id: "restaurant-system",
    title: "Restaurant System",
    year: "2025",
    description:
      "API REST completa para gerenciamento de restaurantes, reservas e avaliações. Arquitetura de microsserviços com deploy na AWS.",
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Docker", "AWS EC2"],
    url: "https://github.com/Pimentazx/restaurant-system",
  },
  {
    id: "gnpfit",
    title: "GNP FIT",
    year: "2023",
    description:
      "Plataforma fitness full stack — front-end em HTML/CSS, back-end em Java Spring Boot com persistência em MySQL e MongoDB.",
    stack: ["Java", "Spring Boot", "MySQL", "MongoDB", "HTML", "CSS"],
    url: "https://github.com/Pimentazx/GNPFit",
  },
  {
    id: "bikcraft",
    title: "Bikcraft",
    year: "2025",
    description:
      "Site de bicicletas elétricas personalizadas com foco em UX/UI Design, acessibilidade e experiência de produto imersiva.",
    stack: ["HTML", "CSS", "JavaScript", "UX/UI Design"],
    url: "https://github.com/Pimentazx/Bikcraft",
  },
  {
    id: "docker-compose-api",
    title: "Docker Compose API",
    year: "2025",
    description:
      "Aplicação containerizada com Docker Compose, exposta à internet. Demonstra orquestração de serviços e deploy em ambiente real.",
    stack: ["Docker", "Express.js", "PostgreSQL"],
    url: "https://github.com/Pimentazx/docker-compose-api",
  },
  {
    id: "wildbeast",
    title: "Wildbeast",
    year: "2025",
    description:
      "Layout responsivo construído com CSS Grid puro — sem frameworks. Implementação prática dos conceitos do curso Origamid.",
    stack: ["HTML", "CSS Grid"],
    url: "https://github.com/Pimentazx/wildbeast",
  },
  {
    id: "notifica-o-app",
    title: "Notificação App",
    year: "2025",
    description:
      "Aplicação web para gerenciamento de notificações: criar, listar e excluir. API REST com Node.js e Express.",
    stack: ["JavaScript", "Node.js", "Express.js"],
    url: "https://github.com/Pimentazx/notifica-o-app",
  },
];

const EDUCATION = [
  {
    degree: "Bacharelado em Engenharia de Software",
    school: "Universidade São Judas Tadeu",
    year: "2026–2028",
    status: "cursando",
  },
  {
    degree: "Pós-graduação Lato Sensu Full-Stack Developer",
    school: "FIAP",
    year: "mar.2025–jan.2026",
    status: "concluído",
  },
  {
    degree: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    school: "Faculdade de Mecatrônica SENAI",
    year: "jan.2023–dez.2024",
    status: "concluído",
  },
  {
    degree: "Técnico em Redes de Computadores",
    school: 'SENAI "Roberto Simonsen"',
    year: "jan.2020–jun.2022",
    status: "concluído",
  },
];

const EXPERIENCE = [
  {
    title: "Desenvolvedor Full Stack",
    company: "Freelancer",
    period: "Jan. 2026 – presente",
    description:
      "Desenvolvimento completo de aplicações web para clientes — do front-end ao back-end e banco de dados. React, TypeScript, Node.js e Java. Manutenção, correção de bugs e entrega de novas funcionalidades.",
  },
  {
    title: "Estagiário de TI",
    company: "SESI 379 Vila Carrão",
    period: "Mar. 2023 – Nov. 2024",
    description:
      "Manutenção de equipamentos (computadores, projetores, monitores), suporte técnico, resolução de problemas de software e conectividade. Desenvolvimento de aulas de TI e mentoria na equipe de robótica escolar.",
  },
];

const TECH_STACK = [
  { name: "React", cat: "frontend" },
  { name: "Angular", cat: "frontend" },
  { name: "TypeScript", cat: "frontend" },
  { name: "JavaScript", cat: "frontend" },
  { name: "HTML / CSS", cat: "frontend" },
  { name: "Tailwind CSS", cat: "frontend" },
  { name: "Java", cat: "backend" },
  { name: "Spring Boot", cat: "backend" },
  { name: "Node.js", cat: "backend" },
  { name: "Go", cat: "backend" },
  { name: "Python", cat: "backend" },
  { name: "PostgreSQL", cat: "database" },
  { name: "MySQL", cat: "database" },
  { name: "MongoDB", cat: "database" },
  { name: "Docker", cat: "tools" },
  { name: "Git / GitHub", cat: "tools" },
  { name: "REST API", cat: "tools" },
  { name: "AWS EC2", cat: "tools" },
];

const TECH_CATS: { id: string; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Banco de Dados" },
  { id: "tools", label: "Ferramentas" },
];

const CERTS = [
  { name: "React Completo", issuer: "Origamid", year: "2026" },
  { name: "UI Design Avançado", issuer: "Origamid", year: "2026" },
  { name: "Go: Métodos, Generics e Interface", issuer: "Alura", year: "2025" },
  { name: "Go: Concorrência e Otimização de API", issuer: "Alura", year: "2025" },
  { name: "Node.js: Testes Unitários e de Integração", issuer: "Alura", year: "2025" },
  { name: "MongoDB: Banco de Dados NoSQL", issuer: "Alura", year: "2025" },
  { name: "CSS Grid Layout", issuer: "Origamid", year: "2025" },
  { name: "Modelagem de Banco Relacional", issuer: "Alura", year: "2025" },
  { name: "JavaScript: POO, Arrays e Objetos", issuer: "Alura", year: "2025" },
  { name: "Fundamentos em Cibersegurança", issuer: "Cisco Networking Academy", year: "2021" },
];

// ─── Shared utilities ─────────────────────────────────────────────────────────

const useFadeUp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return { ref, inView };
};

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-10">
    <span className="w-6 h-px bg-primary block" />
    <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">{text}</span>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Stack", href: "#stack" },
    { label: "GitHub", href: "#github" },
    { label: "Certificações", href: "#certs" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-sm tracking-[0.25em] text-primary font-medium">
          GP_
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span
            className={`block h-px bg-current transition-all duration-200 ${open ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`}
          />
          <span
            className={`block h-px bg-current transition-all duration-200 ${open ? "opacity-0 w-6" : "w-4"}`}
          />
          <span
            className={`block h-px bg-current transition-all duration-200 ${open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`}
          />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 font-mono text-xs tracking-[0.15em] text-muted-foreground hover:text-primary hover:bg-card transition-colors uppercase border-b border-border last:border-0"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="min-h-screen flex flex-col justify-between px-6 pt-28 pb-10 max-w-6xl mx-auto">
      <div className="flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px bg-primary block" />
          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Full Stack Developer · São Paulo, BR
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 48 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="font-display font-bold uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)" }}
        >
          GUILHERME
          <br />
          <span className="text-primary">PIMENTEL</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 24 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-8 text-muted-foreground max-w-md text-base leading-relaxed font-sans"
        >
          Desenvolvedor full stack, 22 anos, São Paulo. Formado em ADS pelo
          SENAI, pós-graduado pela FIAP e cursando Engenharia de Software. Stack:
          React, Spring Boot, Node.js, Go e Docker.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:bg-primary/85 transition-colors"
          >
            Ver projetos <ArrowUpRight size={13} />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 border border-border text-foreground font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:border-foreground/40 transition-colors"
          >
            Entrar em contato
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center justify-between mt-16 pt-6 border-t border-border"
      >
        <div className="flex gap-6">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href="mailto:gui.pimentel2004@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            <Mail size={13} /> Email
          </a>
          <a
            href="https://linkedin.com/in/guilhermedespimentel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            <Linkedin size={13} /> LinkedIn
          </a>
        </div>
        <a
          href="#sobre"
          className="text-muted-foreground hover:text-primary transition-colors"
          style={{ animation: "bounce 2s infinite" }}
        >
          <ChevronDown size={18} />
        </a>
      </motion.div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="sobre" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Sobre" />

          <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
            {/* Bio */}
            <div>
              <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight mb-6">
                Construindo o digital com precisão
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Desenvolvedor full stack de 22 anos, baseado em São Paulo. Formado
                em Análise e Desenvolvimento de Sistemas pelo SENAI, com formação
                técnica em Redes de Computadores e pós-graduação Full-Stack pela
                FIAP. Atualmente cursando Engenharia de Software na São Judas Tadeu.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Experiência prática com React, Angular, Java, Spring Boot, Node.js,
                Go e bancos relacionais e NoSQL. Durante o estágio no SESI, atuei
                em suporte técnico e mentoria em robótica. Hoje trabalho como
                freelancer, entregando aplicações completas do zero à produção.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary" />
                São Paulo, Brasil
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-5">
                Formação
              </h3>
              <div className="space-y-3">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="border border-border p-5 hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-medium text-foreground leading-snug">
                            {edu.degree}
                          </p>
                          {edu.status === "cursando" && (
                            <span className="font-mono text-[9px] tracking-widest text-primary border border-primary/40 px-1.5 py-0.5 uppercase">
                              cursando
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-xs text-muted-foreground">
                          {edu.school}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-primary whitespace-nowrap shrink-0">
                        {edu.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="projetos" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Projetos" />

          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight">
              Case Studies
            </h2>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              Ver todos <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Grid with gap-px trick for flush borders */}
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {PROJECTS.map((proj, i) => (
              <motion.a
                key={proj.id}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group bg-background p-8 hover:bg-card transition-colors block"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {proj.year}
                  </span>
                </div>

                <h3 className="font-display font-bold uppercase text-2xl mb-3 group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-1 border border-border text-muted-foreground group-hover:border-border/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="experiencia" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Experiência" />
          <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight mb-16">
            Trajetória
          </h2>

          <div className="relative">
            {/* Vertical rule */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />

            <div className="space-y-14 pl-10">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="relative"
                >
                  {/* Diamond marker */}
                  <div className="absolute -left-[2.65rem] top-1.5 w-2.5 h-2.5 bg-primary rotate-45" />

                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="font-display font-bold uppercase text-xl">
                      {exp.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.1em] text-primary border border-primary/30 px-2 py-0.5 uppercase">
                      {exp.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-3">
                    <Calendar size={11} />
                    {exp.period}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

function TechStack() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="stack" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Tecnologias" />
          <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight mb-16">
            Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {TECH_CATS.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * ci }}
              >
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-5">
                  {cat.label}
                </h3>
                <div className="space-y-3">
                  {TECH_STACK.filter((t) => t.cat === cat.id).map((tech) => (
                    <div
                      key={tech.name}
                      className="font-mono text-sm text-foreground border-b border-border pb-2.5 hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── GitHub ───────────────────────────────────────────────────────────────────

function GitHubSection() {
  const { ref, inView } = useFadeUp();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [rRes, uRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);
        const rData = await rRes.json();
        const uData = await uRes.json();
        if (Array.isArray(rData)) setRepos(rData);
        if (uData?.public_repos !== undefined) setUser(uData);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="github" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="GitHub" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight">
              Atividade Recente
            </h2>

            {user && (
              <div className="flex gap-10">
                <div>
                  <div className="font-display font-bold text-3xl text-primary leading-none">
                    {user.public_repos}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                    Repos
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl text-primary leading-none">
                    {user.followers}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                    Seguidores
                  </div>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="font-mono text-xs text-muted-foreground py-8">
              Carregando repositórios...
            </div>
          ) : repos.length === 0 ? (
            <div className="font-mono text-xs text-muted-foreground py-8">
              Nenhum repositório encontrado.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  className="group bg-background p-6 hover:bg-card transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors"
                    />
                  </div>

                  {repo.description && (
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-auto">
                    {repo.language && (
                      <span className="font-mono text-[10px] text-primary">
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        <Star size={10} /> {repo.stargazers_count}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                      {new Date(repo.updated_at).toLocaleDateString("pt-BR", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <div className="mt-6 text-right">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              Ver perfil completo <ArrowUpRight size={11} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="contato" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Contato" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="font-display font-bold uppercase leading-none mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Vamos
                <br />
                <span className="text-primary">construir</span>
                <br />
                algo juntos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Aberto a oportunidades de emprego, projetos freelance e
                colaborações. Se você tem uma ideia, me conta.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Email",
                  value: "gui.pimentel2004@gmail.com",
                  href: "mailto:gui.pimentel2004@gmail.com",
                },
                {
                  label: "LinkedIn",
                  value: "guilhermedespimentel",
                  href: "https://linkedin.com/in/guilhermedespimentel",
                },
                {
                  label: "GitHub",
                  value: `@${GITHUB_USERNAME}`,
                  href: `https://github.com/${GITHUB_USERNAME}`,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 border border-border hover:border-primary/40 group transition-colors"
                >
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────

function Certifications() {
  const { ref, inView } = useFadeUp();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? CERTS : CERTS.slice(0, 6);

  return (
    <section id="certs" className="py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Certificações" />
          <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-tight mb-12">
            Aprendizado contínuo
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {visible.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="bg-background p-5 flex items-center justify-between gap-4 hover:bg-card transition-colors"
              >
                <div>
                  <p className="text-sm text-foreground">{cert.name}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                </div>
                <span className="font-mono text-xs text-primary shrink-0">{cert.year}</span>
              </motion.div>
            ))}
          </div>

          {CERTS.length > 6 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors uppercase flex items-center gap-2"
            >
              {expanded ? "Ver menos" : `Ver todas (${CERTS.length})`}
              <ArrowUpRight size={11} className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          © 2026 Guilherme de Souza Pimentel
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          React · TypeScript · Vite · Tailwind
        </span>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/15 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
      <GitHubSection />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
