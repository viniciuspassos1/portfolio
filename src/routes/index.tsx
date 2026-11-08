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
  Bot,
  Code2,
  Database,
  Gauge,
  Menu,
  Network,
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
      <div aria-hidden="true" className="editorial-grid pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-6 pb-8 pt-10 sm:px-10 md:px-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 lg:pb-12 lg:pt-28">
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
    <section id="sobre" className="relative z-10 grid min-h-[80vh] scroll-mt-24 items-center gap-12 border-t border-border bg-background px-6 py-24 sm:px-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-14">
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
    <div ref={ref} className="h-[85vh]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ scale: shouldReduceMotion ? 1 : scale, top: `calc(6rem + ${i * 28}px)` }}
        className="project-card sticky rounded-2xl border border-border bg-background p-4 sm:p-6 md:p-8"
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
        <div className="flex gap-3">
          <div className="flex w-[40%] flex-col gap-3">
            <div className="flex items-end rounded-xl bg-card p-6" style={{ height: "clamp(130px, 16vw, 230px)" }}>
              <p className="font-medium uppercase" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)" }}>{p.a}</p>
            </div>
            <div className="flex items-end rounded-xl bg-secondary p-6" style={{ height: "clamp(160px, 22vw, 340px)" }}>
              <p className="hero-heading font-black uppercase" style={{ fontSize: "clamp(1rem, 2.4vw, 2.4rem)" }}>{p.b}</p>
            </div>
          </div>
          <img src={p.img} alt={p.name} loading="lazy" width={1280} height={960}
            className="w-[60%] rounded-xl object-cover" />
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

const technologies: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "Power BI", icon: Gauge, color: "#f2c811" },
  { name: "Python", icon: Code2, color: "#3776ab" },
  { name: "n8n", icon: Workflow, color: "#ea4b71" },
  { name: "SQL", icon: Database, color: "#e38c35" },
  { name: "PLN", icon: BrainCircuit, color: "#9b6bdb" },
  { name: "Big Data", icon: Network, color: "#48a9c5" },
  { name: "ETL", icon: Workflow, color: "#59b6a4" },
  { name: "KPIs", icon: Gauge, color: "#f2c811" },
  { name: "Automação", icon: Bot, color: "#ea4b71" },
  { name: "APIs", icon: PlugZap, color: "#78a9ff" },
];

function StackLogo({ name, icon: Icon, color }: (typeof technologies)[number]) {
  if (name === "Power BI") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 sm:h-9 sm:w-9">
        <path d="M20 5a2 2 0 0 1 2 2v26a2 2 0 0 1-4 0V7a2 2 0 0 1 2-2Z" fill={color} />
        <path d="M29 12a2 2 0 0 1 2 2v19a2 2 0 0 1-4 0V14a2 2 0 0 1 2-2ZM11 19a2 2 0 0 1 2 2v12a2 2 0 0 1-4 0V21a2 2 0 0 1 2-2ZM36 22a2 2 0 0 1 2 2v9a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2Z" fill={color} opacity=".7" />
      </svg>
    );
  }

  if (name === "Python") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 sm:h-9 sm:w-9">
        <path d="M19.6 4c-8.5 0-8 3.7-8 3.7v5h8.2v1.6H8.4S4 13.8 4 21.3c0 7.4 3.8 7.2 3.8 7.2h4.5v-5.2s-.2-4.3 4.2-4.3h7.2s4 .1 4-3.9V8.6S28.3 4 19.6 4Zm-4.5 3.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" fill="#3776ab" />
        <path d="M20.4 36c8.5 0 8-3.7 8-3.7v-5h-8.2v-1.6h11.4s4.4.5 4.4-7c0-7.4-3.8-7.2-3.8-7.2h-4.5v5.2s.2 4.3-4.2 4.3h-7.2s-4-.1-4 3.9v6.5s-.6 4.6 8.1 4.6Zm4.5-3.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" fill="#ffd343" />
      </svg>
    );
  }

  if (name === "n8n") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 sm:h-9 sm:w-9" fill="none" stroke={color} strokeWidth="3">
        <path d="M9 20h8m6 0h8M20 9v8m0 6v8" />
        <circle cx="7" cy="20" r="4" fill="#0c0c0c" />
        <circle cx="33" cy="20" r="4" fill="#0c0c0c" />
        <circle cx="20" cy="7" r="4" fill="#0c0c0c" />
        <circle cx="20" cy="33" r="4" fill="#0c0c0c" />
        <circle cx="20" cy="20" r="4" fill={color} stroke="none" />
      </svg>
    );
  }

  return (
    <Icon
      aria-hidden="true"
      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
      strokeWidth={1.7}
      style={{ color }}
    />
  );
}

function Projects() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("projects");

  return (
    <section id="projetos" className="relative z-10 scroll-mt-24 border-t border-border bg-background px-6 pb-20 pt-24 sm:px-10 md:px-14 md:pt-32">
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
          <div className="stack-showcase grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {technologies.map(({ name, icon: Icon, color }, index) => (
              <FadeIn key={name} delay={index * 0.045} y={12}>
                <div className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-[22px] border border-white/10 bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ember/50 hover:bg-[#1d1d1d] sm:min-h-40">
                  <div
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{ color }}
                  >
                    <StackLogo name={name} icon={Icon} color={color} />
                  </div>
                  <h3 className="text-center text-sm font-semibold tracking-tight text-white/85 transition-colors group-hover:text-white sm:text-base">
                    {name}
                  </h3>
                </div>
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
    ["#000000", "#1a080d", "#1a080d", "#000000"],
  );

  return (
    <motion.section
      ref={sectionRef}
      id="contato"
      aria-labelledby="closing-title"
      style={{ backgroundColor: shouldReduceMotion ? "#1a080d" : backgroundColor }}
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

function Index() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-background" style={{ overflowX: "clip" }}>
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
