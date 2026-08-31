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
  MessageCircle,
} from "lucide-react";
import previewVideo from "../assets/preview.mp4";

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
    id: "forest",
    title: "Forest",
    year: "2026",
    description:
      "Projeto com foco na aplicação prática do Tailwind CSS, explorando a construção de interfaces modernas, responsivas e reutilizáveis.",
    stack: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    url: "https://github.com/Pimentazx/forest",
    deployUrl: "https://forest-liard-eta.vercel.app/",
  },
  {
    id: "restaurant-system",
    title: "Restaurant System",
    year: "2026",
    description:
      "API REST completa para gerenciamento de restaurantes, reservas e avaliações. Arquitetura de microsserviços com deploy na AWS.",
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Docker", "AWS EC2"],
    url: "https://github.com/Pimentazx/restaurant-system",
    deployUrl: null,
  },
  {
    id: "bikcraft",
    title: "Bikcraft",
    year: "2025",
    description:
      "Site de bicicletas elétricas personalizadas com foco em UX/UI Design, acessibilidade e experiência de produto imersiva.",
    stack: ["HTML", "CSS", "JavaScript", "UX/UI Design"],
    url: "https://github.com/Pimentazx/Bikcraft",
    deployUrl: "https://pimentazx.github.io/Bikcraft/",
  },
  {
    id: "docker-compose-api",
    title: "Docker Compose API",
    year: "2025",
    description:
      "Aplicação containerizada com Docker Compose, exposta à internet. Demonstra orquestração de serviços e deploy em ambiente real.",
    stack: ["Docker", "Express.js", "PostgreSQL"],
    url: "https://github.com/Pimentazx/docker-compose-api",
    deployUrl: null,
  },
  {
    id: "wildbeast",
    title: "Wildbeast",
    year: "2025",
    description:
      "Layout responsivo construído com CSS Grid puro — sem frameworks. Implementação prática dos conceitos do curso Origamid.",
    stack: ["HTML", "CSS Grid"],
    url: "https://github.com/Pimentazx/wildbeast",
    deployUrl: "https://pimentazx.github.io/wildbeast/",
  },
  {
    id: "notifica-o-app",
    title: "Notificação App",
    year: "2025",
    description:
      "Aplicação web para gerenciamento de notificações: criar, listar e excluir. API REST com Node.js e Express.",
    stack: ["JavaScript", "Node.js", "Express.js"],
    url: "https://github.com/Pimentazx/notifica-o-app",
    deployUrl: null,
  },
];

const EDUCATION = [
  {
    degree: "Bacharelado em Engenharia de Software",
    school: "Universidade São Judas Tadeu",
    year: "AGO.2026–DEZ.2028",
    status: "cursando",
  },
  {
    degree: "Pós-graduação Lato Sensu Full-Stack Developer",
    school: "FIAP",
    year: "MAR.2025–FEV.2026",
    status: "concluído",
  },
  {
    degree: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    school: "Faculdade de Mecatrônica SENAI",
    year: "JAN.2023–DEZ.2024",
    status: "concluído",
  },
  {
    degree: "Técnico em Redes de Computadores",
    school: 'SENAI "Roberto Simonsen"',
    year: "JAN.2020–JUN.2022",
    status: "concluído",
  },
];

const EXPERIENCE = [
  {
    title: "Desenvolvedor Full Stack",
    company: "Freelancer",
    period: "JAN. 2026 – presente",
    description:
      "Desenvolvimento completo de aplicações web para clientes — do front-end ao back-end e banco de dados. React, TypeScript, Node.js, Java e integração com serviços externos. Destaque para projetos reais em produção, como o site institucional da Mérito Formaturas.",
  },
  {
    title: "Estagiário de TI",
    company: "SESI 379 Vila Carrão",
    period: "MAR. 2023 – NOV. 2024",
    description:
      "Manutenção de equipamentos (computadores, projetores, monitores), suporte técnico, resolução de problemas de software e conectividade. Desenvolvimento de aulas de TI e mentoria na equipe de robótica escolar.",
  },
];

const FEATURED_PROJECT = {
  title: "Mérito Formaturas",
  year: "2026",
  site: "meritoformaturas.com.br",
  summary:
    "Projeto entregue em produção para um cliente real, com foco em experiência do usuário, apresentação de serviços, galeria multimídia e conversão de leads por meio de um formulário personalizado de solicitação de álbum de formatura.",
  description:
    "Além do visual institucional, o projeto envolveu arquitetura de front-end e back-end, integração com Cloudinary, SMTP e APIs externas, além da publicação e configuração de serviços em produção.",
  stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "NestJS", "Cloudinary", "SMTP", "APIs"],
  preview: [
    "Landing Page",
  ],
  videoUrl: previewVideo,
  url: "http://meritoformaturas.com.br",
};

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
  { name: "React Completo", issuer: "Origamid", year: "2026", url: "https://www.origamid.com/certificate/660fd87d" },
  { name: "JavaScript Completo ES6", issuer: "Origamid", year: "2026", url: "https://www.origamid.com/certificate/e69a60b3" },
  { name: "UI Design Avançado", issuer: "Origamid", year: "2026", url: "https://www.origamid.com/certificate/d94f7a8c" },
  { name: "Go: crie Métodos, Generics e Interface", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/5816a23f-a50a-4b01-808a-f2edc4d6fcb5?lang" },
  { name: "Go: use concorrência para otimizar sua aplicação", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/5670c2c6-a2c6-4c5c-a893-817c2f02f859?lang" },
  { name: "Go: gerenciando e otimizando sua API ", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/0f6771f9-b22a-4599-b185-ce35826ecbbb?lang" },
  { name: "Go: criando uma API Rest", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/be87c9a2-f489-424c-ac30-2ebb705fd129?lang" },
  { name: "Linux: gerenciando diretórios, arquivos, permissões e processos", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/97ed4456-87a6-4ce2-b1ba-587207375e81?lang" },
  { name: "Lógica de programação: praticando com desafios", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/fdf76c3c-bcf3-4ffe-88dd-abf70639c7a1?lang" },
  { name: "Git e GitHub: compartilhando e colaborando em projetos", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/0e59677d-01a3-44ec-a520-c38d7160fbd1?lang" },
  { name: "Lógica de programação: explore funções e listas", issuer: "Alura", year: "2026", url: "https://cursos.alura.com.br/certificate/87b1d63e-9fe3-4b98-bce3-1357f9c9931b?lang" },
  { name: "Lógica de programação: mergulhe em programação com JavaScript", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/776cc307-793e-499f-a4e2-802eb32b4eb8?lang" },
  { name: "MongoDB: conhecendo um banco de dados NoSQL", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/f939bf7f-d7d5-4a48-81a6-b85e2561bfcf?lang" },
  { name: "Começando em Programação: carreira e primeiros passos", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/3a36ec3c-ad16-49cf-9df9-b341fbaab59f?lang" },
  { name: "HTML e CSS: praticando HTML/CSS", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/19f4bf42-0e47-436b-b79b-8abbac81a50b?lang" },
  { name: "HTML e CSS: responsividade com mobile-first", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/d5854b0c-c80b-4cd2-8bad-0fb1e1f7b6e8?lang" },
  { name: "HTML e CSS: trabalhando com responsividade e publicação de projetos", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/f9971106-f177-4bd2-ba7e-57576de08bad?lang" },
  { name: "HTML e CSS: Classes, posicionamento e Flexbox", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/713bc245-3cf4-4942-a58f-9c6e0a604baa?lang" },
  { name: "HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/113e460b-0c02-44e4-b033-f91a6fdaade5?lang" },
  { name: "HTML e CSS: cabeçalho, footer e variáveis CSS", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/403508c2-8e1e-4845-ad6a-d5abd72a9edd?lang" },
  { name: "Algoritmos com JavaScript II: aprofundando em algoritmos de ordenação e busca", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/00643fc2-ce0e-41b6-b28a-6b1e03f1ce68?lang" },
  { name: "JavaScript I: algoritmos de ordenação", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/490fac77-94b2-4bcb-ba52-c245314d1adf?lang" },
  { name: "JavaScript: programação orientada a objetos", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/02057dcf-ae56-46ad-be83-71bcaf411729?lang" },
  { name: "Node.js: criando sua primeira biblioteca", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/62ed47e8-5b4b-4562-a593-8fedb4fe4990?lang" },
  { name: "JavaScript: Arrays", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/96221858-df80-4c1c-b5eb-2c9102e86958?lang" },
  { name: "JavaScript: objetos", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/9e95eeb4-37f3-4fa1-9566-d6dd7a2fc913?lang" },
  { name: "JavaScript: tipos, variáveis e funções", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/525994bf-8600-40e8-895a-5ab5be4ff2fa?lang" },
  { name: "UI Design para Iniciantes", issuer: "Origamid", year: "2025", url: "https://www.origamid.com/certificate/48fc7a49" },
  { name: "CSS Grid Layout", issuer: "Origamid", year: "2025", url: "https://www.origamid.com/certificate/37979006" },
  { name: "Modelagem de banco de dados relacional: modelagem lógica e física", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/ee2de79f-7c39-48b4-b384-d2af4c05f4bc?lang" },
  { name: "MongoDB: conhecendo um banco de dados NoSQL", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/f939bf7f-d7d5-4a48-81a6-b85e2561bfcf?lang" },
  { name: "Node.js: Testes Unitários e de Integração", issuer: "Alura", year: "2025", url: "https://cursos.alura.com.br/certificate/6c0c1314-4bc8-4636-ae8b-55a13234c975" },
  { name: "CSS Flexbox", issuer: "Origamid", year: "2025", url: "https://www.origamid.com/certificate/f41b5053" },
  { name: "HTML e CSS para Iniciantes", issuer: "Origamid", year: "2025", url: "https://www.origamid.com/certificate/3486591e" },
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
    { label: "Destaque", href: "#destaque" },
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
          React, TypeScript, Node.js, NestJS, PostgreSQL.
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
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href="mailto:guilhermepimenteldev@gmail.com"
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
          <a
            href="https://wa.me/5511951939957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            <MessageCircle size={13} /> WhatsApp
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
                Desenvolvedor full stack de 22 anos, nascido em São Paulo. Formado
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

// ─── Featured Project ─────────────────────────────────────────────────────────

function FeaturedProject() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="destaque" className="py-6 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="overflow-hidden border border-border bg-card/40"
        >
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8">
              <SectionLabel text="Destaque" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                {FEATURED_PROJECT.year}
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:gap-10 items-start lg:items-center">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                  <span className="font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                    {FEATURED_PROJECT.title}
                  </span>
                  <a
                    href={FEATURED_PROJECT.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
                  >
                    {FEATURED_PROJECT.site} <ArrowUpRight size={11} />
                  </a>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl">
                  {FEATURED_PROJECT.summary}
                </p>

                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm mb-6 sm:mb-8 max-w-2xl">
                  {FEATURED_PROJECT.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {FEATURED_PROJECT.stack.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] tracking-[0.08em] uppercase border border-border px-2.5 py-1.5 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-none border border-border bg-background p-2 sm:p-3 md:p-4">
                <div className="border border-border bg-card overflow-hidden">
                  <div className="relative h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden">
                    <video
                      className="h-full w-full object-cover"
                      src={FEATURED_PROJECT.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                  </div>
                </div>
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
              <motion.article
                key={proj.id}
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

                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2.5 hover:bg-primary/85 transition-colors"
                  >
                    Repositório <Github size={12} />
                  </a>
                  {proj.deployUrl ? (
                    <a
                      href={proj.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border text-foreground font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2.5 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      Projeto Online <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 border border-border/60 text-muted-foreground/60 font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2.5 cursor-not-allowed"
                    >
                      Projeto Online <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              </motion.article>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
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
                  label: "WhatsApp",
                  value: "+55 (11) 95193-9957",
                  href: "https://wa.me/5511951939957",
                },
                {
                  label: "Email",
                  value: "guilhermepimenteldev@gmail.com",
                  href: "mailto:guilhermepimenteldev@gmail.com",
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
  const [visibleCount, setVisibleCount] = useState(6);
  const visible = CERTS.slice(0, visibleCount);

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
              <motion.a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group bg-background p-5 flex items-center justify-between gap-4 hover:bg-card transition-colors"
              >
                <div>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">{cert.name}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-primary">{cert.year}</span>
                  <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>

          {CERTS.length > 6 && (
            <button
              onClick={() => setVisibleCount((count) => count >= CERTS.length ? 6 : Math.min(count + 6, CERTS.length))}
              className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors uppercase flex items-center gap-2"
            >
              {visibleCount >= CERTS.length ? "Ver menos" : "Ver mais"}
              <ArrowUpRight size={11} className={`transition-transform ${visibleCount >= CERTS.length ? "rotate-90" : ""}`} />
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
    <footer className="border-t border-border py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
        <span className="font-mono text-xs text-muted-foreground">
          © 2026 Guilherme de Souza Pimentel
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          React · TypeScript · Node.js · NestJS · PostgreSQL
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
      <FeaturedProject />
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
