import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Gauge,
  Menu,
  PlugZap,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, AnimatedText } from "@/components/motion";
import portraitImage from "@/assets/hero-boneco.png";
import irisLeft from "@/assets/iris-L.png";
import irisRight from "@/assets/iris-R.png";
import imgDashboard from "@/assets/project-dashboard.jpg";
import imgAutomation from "@/assets/project-automation.jpg";
import imgNlp from "@/assets/project-nlp.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vinicius Passos — Analista de Sistemas & Dados" },
      { name: "description", content: "Análise de dados, automação com n8n, Python, SQL, Power BI e IA. Salvador, BA." },
      { property: "og:title", content: "Vinicius Passos — Analista de Sistemas & Dados" },
      { property: "og:description", content: "Transformo dados em decisões e processos em automações inteligentes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LINKEDIN = "https://www.linkedin.com/in/andr%C3%A9-vin%C3%ADcius-de-oliveira-passos-7117b71b6/";

function ContactButton({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href={LINKEDIN} target="_blank" rel="noreferrer"
      className={`btn-cta ${inverse ? "btn-cta--inverse" : ""} inline-block rounded-md px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-transform hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base`}>
      Fale comigo
    </a>
  );
}

function GhostButton({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? LINKEDIN} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:border-ember hover:text-ember sm:px-8 sm:py-3">
      {label} <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#projetos", label: "Portfólio" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/75 px-5 py-3 shadow-[0_8px_32px_rgb(0_0_0/35%)] backdrop-blur-xl sm:px-7">
        <a
          href="#contato"
          className="inline-flex items-center gap-2.5 rounded-full border border-ember/35 bg-black/70 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-ember sm:text-xs"
        >
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          Disponível para projetos
        </a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:text-ember ${
                href === "#contato"
                  ? "rounded-full border border-ember/50 px-4 py-2 text-ember"
                  : "text-white/65"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-ember hover:text-ember md:hidden"
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navegação principal"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            className="mt-2 flex flex-col gap-1 rounded-3xl border border-white/10 bg-black/90 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white/75 transition-colors hover:bg-white/5 hover:text-ember"
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* O retrato permanece estático; apenas os olhos acompanham o cursor e a rolagem. */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function DataCharacter() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 90, damping: 28 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", move);
    window.addEventListener("blur", reset);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset); };
  }, [pointerX, pointerY, shouldReduceMotion]);

  // olhar: varre a página de um lado a outro e "puxa" na direção da rolagem
  const gazeX = useTransform([scrollYProgress, velocity, pointerX], ([p = 0, v = 0, mx = 0]: number[]) => {
    const keys = [0, 0.2, 0.4, 0.6, 0.8, 1];
    const vals = [0, 8, -7, 7, -8, 0];
    let k = 0;
    while (k < keys.length - 2 && p > (keys[k + 1] ?? 1)) k++;
    const k0 = keys[k] ?? 0;
    const k1 = keys[k + 1] ?? 1;
    const t = clamp((p - k0) / (k1 - k0), 0, 1);
    const eased = t * t * (3 - 2 * t);
    const v0 = vals[k] ?? 0;
    const v1 = vals[k + 1] ?? 0;
    const base = v0 + (v1 - v0) * eased;
    return clamp(mx * 7 + base * 0.45 + clamp(v / 700, -2, 2), -8.5, 8.5);
  });
  const gazeY = useTransform([scrollYProgress, velocity, pointerY], ([p = 0, v = 0, my = 0]: number[]) =>
    clamp(my * 3 + p * 2 + clamp(v / 900, -1.5, 1.8), -3.5, 3.5),
  );
  const eyeX = useSpring(gazeX, { stiffness: 120, damping: 22, mass: 0.4 });
  const eyeY = useSpring(gazeY, { stiffness: 120, damping: 22, mass: 0.4 });

  return (
    <motion.div
      animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
      transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 640 577"
        role="img"
        aria-label="Retrato de Vinicius Passos"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="eye-clip-left"><ellipse cx="267.5" cy="208.7" rx="21" ry="10.5" /></clipPath>
          <clipPath id="eye-clip-right"><ellipse cx="368" cy="208" rx="22" ry="10.5" /></clipPath>
        </defs>
        <image href={portraitImage} width="640" height="577" />
        {/* íris originais do boneco, acompanhando a rolagem */}
        <g clipPath="url(#eye-clip-left)">
          <motion.image href={irisLeft} x="254" y="193" width="30" height="30" style={{ x: shouldReduceMotion ? 0 : eyeX, y: shouldReduceMotion ? 0 : eyeY }} />
        </g>
        <g clipPath="url(#eye-clip-right)">
          <motion.image href={irisRight} x="352" y="193" width="30" height="30" style={{ x: shouldReduceMotion ? 0 : eyeX, y: shouldReduceMotion ? 0 : eyeY }} />
        </g>
      </svg>
    </motion.div>
  );
}

/* ---------------- HERO ---------------- */
const HERO_ROLES = [
  "Analista de Sistemas",
  "Analista de Desenvolvimento de Sistemas",
  "Professor de Robótica e IA",
  "Desenvolvedor RPA",
];

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heading = "Vinicius Passos";
  const [roleIndex, setRoleIndex] = useState(0);
  const currentRole = HERO_ROLES[roleIndex] ?? HERO_ROLES[0] ?? "Analista de Sistemas";

  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervalId = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % HERO_ROLES.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.2,
        staggerChildren: shouldReduceMotion ? 0 : 0.035,
      },
    },
  };
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 22,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="inicio" className="relative flex min-h-[100svh] scroll-mt-24 flex-col overflow-x-clip border-t border-border">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-6 pb-8 pt-28 sm:px-10 sm:pt-32 md:px-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 lg:pb-12 lg:pt-32">
        <div className="relative z-20 flex flex-col items-start">
          <motion.h1
            aria-label={heading}
            variants={headingVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="mt-3 flex flex-col items-start text-left text-[clamp(4rem,11vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.065em] text-white"
          >
            {heading.split(" ").map((word) => (
              <span key={word} aria-hidden="true" className="inline-flex whitespace-nowrap">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${letter}-${letterIndex}`}
                    variants={letterVariants}
                    className={`inline-block ${word === "Passos" ? "text-ember" : ""}`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <FadeIn delay={0.35} y={16}>
            <div className="mt-6 flex items-center gap-3 sm:mt-8">
              <span aria-hidden="true" className="h-px w-8 bg-ember sm:w-12" />
              <div className="min-h-7">
                <AnimatePresence initial={false} mode="wait">
                  <motion.p
                    key={currentRole}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    className="text-sm font-semibold uppercase leading-snug tracking-[0.12em] text-white/80 sm:text-base"
                  >
                    {currentRole}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-ember sm:text-sm">
            Dados · Sistemas · Agentes de IA
          </p>

          <FadeIn delay={0.5} y={18}>
            <p className="mt-5 max-w-[480px] text-sm leading-relaxed text-foreground/70 sm:text-base">
              Desenvolvimento de sistemas personalizados que integram sites, gestão e análise financeira, automações e agentes de IA para otimizar processos, gerar insights e facilitar decisões.
            </p>
          </FadeIn>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias em destaque">
            {["Python", "SQL", "Power BI", "n8n", "IA"].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-border px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-white/70 sm:text-xs"
              >
                {technology}
              </span>
            ))}
          </div>

          <a
            href="#projetos"
            className="mt-8 inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-ember"
          >
            Explore meus projetos
            <ArrowDown aria-hidden="true" className="h-4 w-4 text-ember" />
          </a>
        </div>

        <FadeIn delay={0.3} y={24} className="relative z-10 mx-auto w-[min(78vw,440px)] lg:ml-auto lg:w-full lg:max-w-[540px]">
          <DataCharacter />
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="sobre" className="relative z-10 grid min-h-[80vh] scroll-mt-24 items-center gap-12 border-t border-border px-6 py-24 sm:px-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-14">
      <FadeIn y={40}>
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-ember">Perfil profissional</p>
          <h2 className="hero-heading font-black uppercase leading-[0.9] tracking-[-0.06em]" style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}>
            Sobre mim
          </h2>
        </div>
      </FadeIn>
      <div className="flex flex-col items-start gap-8">
        <AnimatedText
          className="max-w-[680px] text-base font-medium leading-relaxed text-white/75 sm:text-lg"
          text="Formado em Análise de Sistemas, com pós-graduação em Ciência de Dados e Inteligência Artificial. Transformo dados em insights estratégicos, desenvolvo automações inteligentes e soluções tecnológicas que otimizam processos e impulsionam resultados. Uno análise de dados, desenvolvimento de sistemas e inteligência artificial para transformar informações em oportunidades e desafios em soluções."
        />
        <FadeIn>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const projects = [
  { cat: "Just Travel", name: "Controles Inteligentes", img: imgDashboard, a: "Relatórios automáticos", b: "Python · SQL · Excel" },
  { cat: "Automação", name: "Fluxos com n8n + IA", img: imgAutomation, a: "Integração de sistemas", b: "n8n · APIs · LLMs" },
  { cat: "Pós-graduação", name: "Análise de Texto com PLN", img: imgNlp, a: "Big Data & PLN", b: "Python · NLP" },
];

function ProjectCard({ p, i, total }: { p: (typeof projects)[number]; i: number; total: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const target = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, target]);
  return (
    <div ref={ref} className="h-auto min-h-[85svh] lg:h-[calc(85vh+13rem)]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ scale: shouldReduceMotion ? 1 : scale, top: `calc(6rem + ${i * 28}px)` }}
        className="project-card rounded-2xl border border-border bg-background p-4 sm:p-6 md:p-8 lg:sticky"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-5">
            <span className="font-black leading-none text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 100px)" }}>0{i + 1}</span>
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">{p.cat}</p>
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}>{p.name}</h3>
            </div>
          </div>
          <GhostButton label="Ver detalhes" />
        </div>
        <div className="flex flex-col gap-3 lg:h-[clamp(220px,42vh,400px)] lg:flex-row">
          <div className="flex w-full flex-row gap-3 lg:h-full lg:w-[40%] lg:flex-col">
            <div className="flex min-h-28 flex-1 items-end rounded-xl bg-card p-4 sm:p-6">
              <p className="font-medium uppercase" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)" }}>{p.a}</p>
            </div>
            <div className="flex min-h-28 flex-1 items-end rounded-xl bg-secondary p-4 sm:p-6">
              <p className="hero-heading font-black uppercase" style={{ fontSize: "clamp(1rem, 2.4vw, 2.4rem)" }}>{p.b}</p>
            </div>
          </div>
          <img src={p.img} alt={p.name} loading="lazy" width={1280} height={960}
            className="h-[clamp(14rem,40vw,24rem)] w-full rounded-xl object-cover lg:h-full lg:w-[60%]" />
        </div>
      </motion.div>
    </div>
  );
}

const showcaseTabs = [
  { id: "projects", label: "Projetos" },
  { id: "education", label: "Formação" },
  { id: "technology", label: "Tech Stack" },
] as const;

type ShowcaseTab = (typeof showcaseTabs)[number]["id"];

type TechnologyGroupId = "data" | "fullstack" | "tools";

const technologyGroups: {
  id: TechnologyGroupId;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    id: "data",
    label: "01 / Dados",
    title: "Análise de Dados",
    description: "Ferramentas para explorar dados, criar visualizações e comunicar resultados.",
  },
  {
    id: "fullstack",
    label: "02 / Desenvolvimento",
    title: "Desenvolvimento Full-Stack",
    description: "Tecnologias para criar interfaces, aplicações web e experiências interativas.",
  },
  {
    id: "tools",
    label: "03 / Ecossistema",
    title: "IA, Cloud & Ferramentas",
    description: "Serviços e ferramentas que apoiam aplicações, integrações e fluxos de trabalho.",
  },
];

const technologies: {
  name: string;
  icon: LucideIcon;
  color: string;
  group: TechnologyGroupId;
  logo?: string;
}[] = [
  { name: "Python", icon: Code2, color: "#3776ab", group: "data" },
  { name: "Pandas", icon: Code2, color: "#150458", group: "data", logo: "pandas" },
  { name: "SQL", icon: Database, color: "#e38c35", group: "data" },
  { name: "Jupyter", icon: Code2, color: "#f37626", group: "data", logo: "jupyter" },
  { name: "Power BI", icon: Gauge, color: "#f2c811", group: "data" },
  { name: "Python", icon: Code2, color: "#3776ab", group: "fullstack" },
  { name: "TypeScript", icon: Code2, color: "#3178c6", group: "fullstack", logo: "typescript" },
  { name: "JavaScript", icon: Code2, color: "#f7df1e", group: "fullstack", logo: "javascript" },
  { name: "React", icon: Code2, color: "#61dafb", group: "fullstack", logo: "react" },
  { name: "Next.js", icon: Code2, color: "#ffffff", group: "fullstack", logo: "nextdotjs" },
  { name: "Node.js", icon: Code2, color: "#5fa04e", group: "fullstack", logo: "nodedotjs" },
  { name: "Tailwind", icon: Code2, color: "#06b6d4", group: "fullstack", logo: "tailwindcss" },
  { name: "HTML", icon: Code2, color: "#e34f26", group: "fullstack", logo: "html5" },
  { name: "CSS", icon: Code2, color: "#1572b6", group: "fullstack", logo: "css3" },
  { name: "LLM APIs", icon: BrainCircuit, color: "#9b6bdb", group: "tools" },
  { name: "PostgreSQL", icon: Database, color: "#4169e1", group: "tools", logo: "postgresql" },
  { name: "Supabase", icon: Database, color: "#3fcf8e", group: "tools", logo: "supabase" },
  { name: "Docker", icon: Database, color: "#2496ed", group: "tools", logo: "docker" },
  { name: "Vercel", icon: Database, color: "#ffffff", group: "tools", logo: "vercel" },
  { name: "Git", icon: Code2, color: "#f05032", group: "tools", logo: "git" },
  { name: "GitHub", icon: Code2, color: "#ffffff", group: "tools", logo: "github" },
  { name: "Postman", icon: PlugZap, color: "#ff6c37", group: "tools", logo: "postman" },
  { name: "n8n", icon: Workflow, color: "#ea4b71", group: "tools", logo: "n8n" },
  { name: "Arduino", icon: Code2, color: "#00979d", group: "tools", logo: "arduino" },
];

function StackLogo({ name, icon: Icon, color, logo }: (typeof technologies)[number]) {
  const [logoFailed, setLogoFailed] = useState(false);

  if (name === "Power BI") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-5 w-5">
        <path d="M20 5a2 2 0 0 1 2 2v26a2 2 0 0 1-4 0V7a2 2 0 0 1 2-2Z" fill={color} />
        <path d="M29 12a2 2 0 0 1 2 2v19a2 2 0 0 1-4 0V14a2 2 0 0 1 2-2ZM11 19a2 2 0 0 1 2 2v12a2 2 0 0 1-4 0V21a2 2 0 0 1 2-2ZM36 22a2 2 0 0 1 2 2v9a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2Z" fill={color} opacity=".7" />
      </svg>
    );
  }

  if (name === "Python") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-5 w-5">
        <path d="M19.6 4c-8.5 0-8 3.7-8 3.7v5h8.2v1.6H8.4S4 13.8 4 21.3c0 7.4 3.8 7.2 3.8 7.2h4.5v-5.2s-.2-4.3 4.2-4.3h7.2s4 .1 4-3.9V8.6S28.3 4 19.6 4Zm-4.5 3.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" fill="#3776ab" />
        <path d="M20.4 36c8.5 0 8-3.7 8-3.7v-5h-8.2v-1.6h11.4s4.4.5 4.4-7c0-7.4-3.8-7.2-3.8-7.2h-4.5v5.2s.2 4.3-4.2 4.3h-7.2s-4-.1-4 3.9v6.5s-.6 4.6 8.1 4.6Zm4.5-3.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" fill="#ffd343" />
      </svg>
    );
  }

  if (logo && !logoFailed) {
    return (
      <img
        aria-hidden="true"
        src={`https://cdn.simpleicons.org/${logo}/${color.replace("#", "")}`}
        alt=""
        className="h-5 w-5 object-contain"
        loading="lazy"
        onError={() => setLogoFailed(true)}
      />
    );
  }

  return (
    <Icon
      aria-hidden="true"
      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
      strokeWidth={1.7}
      style={{ color }}
    />
  );
}

function Projects() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("projects");

  return (
    <section id="projetos" className="relative z-10 scroll-mt-24 border-t border-border px-6 pb-20 pt-24 sm:px-10 md:px-14 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn y={40}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ember">Portfólio em destaque</p>
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="hero-heading font-black uppercase leading-[0.9] tracking-[-0.06em]" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
              Projetos
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              Projetos, formação e conhecimentos técnicos aplicados a dados, sistemas e automação.
            </p>
          </div>
        </FadeIn>

        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4" role="group" aria-label="Categorias do portfólio">
          {showcaseTabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                activeTab === id
                  ? "border-ember bg-ember text-white"
                  : "border-border text-white/55 hover:border-white/35 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "projects" && (
          <div className="mx-auto max-w-6xl">
            {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} total={projects.length} />)}
          </div>
        )}

        {activeTab === "education" && (
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-ember">Formação</p>
              <h3 className="text-2xl font-bold uppercase leading-tight sm:text-3xl">Análise de Sistemas</h3>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-ember">Pós-graduação</p>
              <h3 className="text-2xl font-bold uppercase leading-tight sm:text-3xl">Ciência de Dados e Inteligência Artificial</h3>
            </article>
          </div>
        )}

        {activeTab === "technology" && (
          <div className="stack-showcase grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologyGroups.map(({ id, label, title, description }, index) => (
              <FadeIn key={id} delay={index * 0.08} y={12}>
                <article className="stack-group-card h-full rounded-2xl border border-transparent bg-[#0c0c0c] p-5 transition-colors duration-300 sm:p-6 md:p-7">
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ember">
                    {label}
                  </p>
                  <h3 className="mb-3 text-xl font-black uppercase leading-tight tracking-[-0.04em] text-white sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mb-6 min-h-12 text-sm leading-relaxed text-white/60">
                    {description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {technologies
                      .filter((technology) => technology.group === id)
                      .map(({ name, icon: Icon, color, logo }) => (
                        <li
                          key={name}
                          className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85 transition-colors hover:border-ember/50 hover:bg-white/[0.06]"
                        >
                          <span className="transition-transform duration-300 group-hover:scale-110" style={{ color }}>
                            <StackLogo name={name} icon={Icon} color={color} logo={logo} />
                          </span>
                          {name}
                        </li>
                      ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ClosingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["rgba(0, 0, 0, 0)", "rgba(26, 8, 13, 0.84)", "rgba(26, 8, 13, 0.84)", "rgba(0, 0, 0, 0)"],
  );

  return (
    <motion.section
      ref={sectionRef}
      id="contato"
      aria-labelledby="closing-title"
      style={{ backgroundColor: shouldReduceMotion ? "rgba(26, 8, 13, 0.84)" : backgroundColor }}
      className="flex min-h-[55vh] flex-col items-center justify-center gap-8 px-5 py-20 text-center sm:px-8 md:min-h-[65vh] md:py-28"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">Contato</p>
      <h2
        id="closing-title"
        className="font-black uppercase leading-none tracking-tight text-white"
        style={{ fontSize: "clamp(2.5rem, 8vw, 120px)" }}
      >
        Vamos conversar?
      </h2>
      <p className="max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
        Quer conversar sobre dados, tecnologia ou um novo projeto? Entre em contato.
      </p>
      <ContactButton inverse />
      <p className="mt-8 text-sm text-white/70">
        © 2026 André Vinícius de Oliveira Passos · Salvador, BA
      </p>
    </motion.section>
  );
}

function ScrollContours() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = Boolean(shouldReduceMotion);
    const clusters = [
      { x: -0.07, y: 0.16, rx: 0.39, ry: 0.32, seed: 0.4, rate: 0.71 },
      { x: 0.88, y: 0.12, rx: 0.34, ry: 0.36, seed: 2.1, rate: 0.93 },
      { x: 0.18, y: 0.86, rx: 0.43, ry: 0.3, seed: 4.3, rate: 0.58 },
      { x: 1.04, y: 0.79, rx: 0.37, ry: 0.4, seed: 5.8, rate: 0.82 },
    ];
    let width = 0;
    let height = 0;
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let scrollVelocity = 0;
    let lastFrameTime = 0;
    let frameId: number | null = null;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(currentScroll, scrollVelocity);
    };

    const draw = (scrollPosition: number, velocity: number) => {
      context.clearRect(0, 0, width, height);
      const scrollPhase = scrollPosition / Math.max(height * 0.62, 1);

      clusters.forEach(({ x, y, rx, ry, seed, rate }) => {
        const phase = scrollPhase * rate + seed + velocity * 0.8;
        const centerX = width * (x + Math.sin(phase * 0.19 + seed) * 0.018);
        const centerY = height * (y + Math.cos(phase * 0.16 + seed) * 0.022);
        const scaleShift = 1 + Math.sin(phase * 0.23 + seed * 1.7) * 0.045;

        for (let ring = 0; ring < 6; ring += 1) {
          const radiusScale = (0.3 + ring * 0.135) * scaleShift;
          const points = 144;
          context.beginPath();

          for (let point = 0; point <= points; point += 1) {
            const angle = (point / points) * Math.PI * 2;
            const angleWarp = angle + Math.sin(angle * 2 + phase * 0.31 + seed) * 0.065;
            const organicEdge =
              1 +
              Math.sin(angle * 3 + phase * 0.37 + seed) * 0.07 +
              Math.cos(angle * 5 - phase * 0.29 + seed * 1.4) * 0.035 +
              Math.sin(angle * 2 + phase * 0.53 + seed * 2.2) * 0.022;
            const xOffset =
              Math.cos(angleWarp) * width * rx * radiusScale * organicEdge +
              Math.sin(angle * 3 + phase * 0.24 + seed) * width * rx * 0.025;
            const yOffset =
              Math.sin(angleWarp) * height * ry * radiusScale * organicEdge +
              Math.cos(angle * 4 - phase * 0.2 + seed) * height * ry * 0.022;
            const px = centerX + xOffset;
            const py = centerY + yOffset;

            if (point === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          }

          context.closePath();
          context.strokeStyle = `rgba(179, 19, 62, ${0.18 - ring * 0.014})`;
          context.lineWidth = 0.9;
          context.stroke();
        }
      });
    };

    const animate = (time: number) => {
      frameId = null;
      const elapsed = lastFrameTime ? time - lastFrameTime : 16;
      lastFrameTime = time;
      const easing = reduceMotion ? 1 : 1 - Math.exp(-elapsed / 115);
      currentScroll += (targetScroll - currentScroll) * easing;
      scrollVelocity *= reduceMotion ? 0 : Math.exp(-elapsed / 190);
      draw(currentScroll, scrollVelocity);

      if (Math.abs(targetScroll - currentScroll) > 0.1 || Math.abs(scrollVelocity) > 0.01) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const scheduleFrame = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const nextScroll = window.scrollY;
      const delta = nextScroll - targetScroll;
      targetScroll = nextScroll;
      if (reduceMotion) {
        currentScroll = targetScroll;
        draw(currentScroll, 0);
        return;
      }
      scrollVelocity = Math.max(-1, Math.min(1, scrollVelocity + delta / 100));
      scheduleFrame();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="scroll-contours" />;
}

function Index() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen" style={{ overflowX: "clip" }}>
      <ScrollContours />
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-ember"
        style={{ scaleX: shouldReduceMotion ? 0 : scrollYProgress }}
      />
      <SiteHeader />
      <Hero />
      <About />
      <Projects />
      <ClosingCTA />
    </main>
  );
}
