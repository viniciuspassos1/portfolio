import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, BarChart3, Bot, Code2, Database, FileSpreadsheet, Gauge, GitMerge,
  HardDrive, MessageSquareText, Plug, Sparkles, Workflow, type LucideIcon,
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

function ContactButton() {
  return (
    <a href={LINKEDIN} target="_blank" rel="noreferrer"
      className="btn-cta inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest transition-transform hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base">
      Fale comigo
    </a>
  );
}

function GhostButton({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? LINKEDIN} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:bg-foreground/10 sm:px-8 sm:py-3">
      {label} <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

/* Retrato fixo ao fundo: a imagem não se move; só os olhos reagem ao mouse e à rolagem. */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function DataCharacter() {
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 90, damping: 28 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", move);
    window.addEventListener("blur", reset);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset); };
  }, [pointerX, pointerY]);

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
        <motion.image href={irisLeft} x="254" y="193" width="30" height="30" style={{ x: eyeX, y: eyeY }} />
      </g>
      <g clipPath="url(#eye-clip-right)">
        <motion.image href={irisRight} x="352" y="193" width="30" height="30" style={{ x: eyeX, y: eyeY }} />
      </g>
    </svg>
  );
}

function FixedCharacter() {
  return (
    <div aria-hidden={false} className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] flex justify-center">
      <div style={{ width: "min(78vw, 66vh)", aspectRatio: "640 / 577" }}>
        <DataCharacter />
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: "clip" }}>
      <div className="overflow-hidden px-4 pt-6 md:pt-8">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[10vw] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-2 lg:text-[10.2vw]">
            Vinicius Passos
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex flex-col gap-5 px-6 pb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[260px] font-semibold uppercase leading-snug tracking-wide sm:max-w-[300px] md:max-w-[340px]" style={{ fontSize: "clamp(1rem, 1.9vw, 1.9rem)" }}>
            Analista de Dados & Desenvolvedor de Sistemas
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <p className="max-w-[300px] text-[0.8rem] leading-relaxed text-foreground/70 sm:max-w-[300px] sm:text-sm md:max-w-[380px]">
            Desenvolvimento de sistemas personalizados que integram sites, gestão e análise financeira, automações e agentes de inteligência artificial, oferecendo soluções inteligentes para otimizar processos, gerar insights e facilitar a tomada de decisões.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
type Tile = { icon: LucideIcon; label: string };
const row1: Tile[] = [
  { icon: BarChart3, label: "Power BI" }, { icon: Code2, label: "Python" }, { icon: Workflow, label: "n8n" },
  { icon: Database, label: "SQL" }, { icon: MessageSquareText, label: "PLN" }, { icon: FileSpreadsheet, label: "Excel" },
];
const row2: Tile[] = [
  { icon: HardDrive, label: "Big Data" }, { icon: Sparkles, label: "IA Generativa" }, { icon: GitMerge, label: "ETL" },
  { icon: Gauge, label: "KPIs" }, { icon: Bot, label: "Automação" }, { icon: Plug, label: "APIs" },
];

function TileCard({ t }: { t: Tile }) {
  const Icon = t.icon;
  return (
    <div className="flex h-[150px] w-[260px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card sm:h-[190px] sm:w-[340px]">
      <Icon className="h-10 w-10 sm:h-14 sm:w-14" strokeWidth={1.5} style={{ color: "#ff7a2f" }} />
      <span className="hero-heading text-xl font-black uppercase tracking-wide sm:text-3xl">{t.label}</span>
    </div>
  );
}

function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const on = () => {
      const top = ref.current?.offsetTop ?? 0;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section ref={ref} className="relative z-10 flex flex-col gap-3 bg-background/70 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex gap-3" style={{ transform: `translateX(${offset - 900}px)`, willChange: "transform" }}>
        {[...row1, ...row1, ...row1].map((t, i) => <TileCard key={i} t={t} />)}
      </div>
      <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}>
        {[...row2, ...row2, ...row2].map((t, i) => <TileCard key={i} t={t} />)}
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="sobre" className="relative z-10 bg-background/70 flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Sobre mim</h2>
        </FadeIn>
        <AnimatedText
          className="max-w-[600px] text-center font-medium leading-relaxed"
          text="Sou de Salvador e trabalho com análise de dados, automação de processos e inteligência artificial. Hoje atuo como assistente de dados na Just Travel, criando controles inteligentes e relatórios que apoiam decisões. Já passei pelo suporte técnico na Solutis e pelo ensino de programação e robótica. Vamos transformar seus dados em resultado?"
        />
      </div>
      <FadeIn><ContactButton /></FadeIn>
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const target = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, target]);
  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div style={{ scale, top: `calc(6rem + ${i * 28}px)` }}
        className="sticky rounded-[40px] border-2 border-border bg-background p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-5">
            <span className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 7vw, 100px)" }}>0{i + 1}</span>
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">{p.cat}</p>
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}>{p.name}</h3>
            </div>
          </div>
          <GhostButton label="Ver detalhes" />
        </div>
        <div className="flex gap-3">
          <div className="flex w-[40%] flex-col gap-3">
            <div className="flex items-end rounded-[30px] bg-card p-6 md:rounded-[50px]" style={{ height: "clamp(130px, 16vw, 230px)" }}>
              <p className="font-medium uppercase" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)" }}>{p.a}</p>
            </div>
            <div className="flex items-end rounded-[30px] bg-secondary p-6 md:rounded-[50px]" style={{ height: "clamp(160px, 22vw, 340px)" }}>
              <p className="hero-heading font-black uppercase" style={{ fontSize: "clamp(1rem, 2.4vw, 2.4rem)" }}>{p.b}</p>
            </div>
          </div>
          <img src={p.img} alt={p.name} loading="lazy" width={1280} height={960}
            className="w-[60%] rounded-[30px] object-cover md:rounded-[50px]" />
        </div>
      </motion.div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projetos" className="relative z-10 -mt-10 rounded-t-[40px] bg-background px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28">
      <FadeIn y={40}>
        <h2 className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Projetos</h2>
      </FadeIn>
      <div className="mx-auto max-w-6xl">
        {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} total={projects.length} />)}
      </div>
      <div className="mt-10 flex flex-col items-center gap-8 text-center">
        <p className="hero-heading font-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 120px)" }}>Vamos conversar?</p>
        <ContactButton />
        <p className="mt-10 text-sm text-muted-foreground">© 2026 André Vinícius de Oliveira Passos · Salvador, BA</p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-background" style={{ overflowX: "clip" }}>
      <FixedCharacter />
      <Hero />
      <Marquee />
      <About />
      <Projects />
    </main>
  );
}
