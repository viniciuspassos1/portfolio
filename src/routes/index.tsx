import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, Magnet, AnimatedText } from "@/components/motion";
import heroObject from "@/assets/hero-object.png";
import imgDashboard from "@/assets/project-dashboard.jpg";
import imgAutomation from "@/assets/project-automation.jpg";
import imgNlp from "@/assets/project-nlp.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "André Vinícius — Analista de Sistemas & Dados" },
      { name: "description", content: "Análise de dados, automação com n8n, Python, SQL, Power BI e IA. Salvador, BA." },
      { property: "og:title", content: "André Vinícius — Analista de Sistemas & Dados" },
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

/* ---------------- HERO ---------------- */
function Hero() {
  const links = [["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Projetos", "#projetos"], ["Contato", LINKEDIN]];
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: "clip" }}>
      <FadeIn y={-20}>
        <nav className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]">{l}</a>
          ))}
        </nav>
      </FadeIn>
      <div className="overflow-hidden px-4">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[13vw] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-2 lg:text-[13.5vw]">
            Oi, sou André
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[340px] sm:translate-y-0 md:w-[420px] lg:w-[480px]">
        <Magnet padding={150} strength={3}>
          <img src={heroObject} alt="Escultura 3D de gráfico de dados" width={1024} height={1024} className="w-full drop-shadow-2xl" />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[170px] font-light uppercase leading-snug tracking-wide sm:max-w-[230px] md:max-w-[280px]" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            Analista de sistemas & dados que transforma números em decisões
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
type Tile = { img?: string; label: string };
const row1: Tile[] = [
  { img: imgDashboard, label: "Power BI" }, { label: "Python" }, { img: imgAutomation, label: "n8n" },
  { label: "SQL" }, { img: imgNlp, label: "PLN" }, { label: "Excel" },
];
const row2: Tile[] = [
  { label: "Big Data" }, { img: imgNlp, label: "IA Generativa" }, { label: "ETL" },
  { img: imgDashboard, label: "KPIs" }, { label: "Automação" }, { img: imgAutomation, label: "APIs" },
];

function TileCard({ t }: { t: Tile }) {
  return (
    <div className="relative h-[200px] w-[310px] shrink-0 overflow-hidden rounded-2xl bg-card sm:h-[270px] sm:w-[420px]">
      {t.img && <img src={t.img} alt={t.label} loading="lazy" width={1280} height={960} className="h-full w-full object-cover opacity-70" />}
      <span className={`absolute ${t.img ? "bottom-5 left-6 text-2xl" : "inset-0 flex items-center justify-center text-5xl hero-heading"} font-black uppercase`}>{t.label}</span>
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
    <section ref={ref} className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40">
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
    <section id="sobre" className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
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

/* ---------------- SERVICES ---------------- */
const services = [
  ["Análise de Dados", "Coleta, tratamento e análise de dados com Python e SQL para revelar padrões e apoiar decisões estratégicas."],
  ["Automação de Processos", "Fluxos com n8n e scripts que eliminam tarefas repetitivas, integram sistemas e reduzem erros operacionais."],
  ["Dashboards & BI", "Painéis em Power BI e Excel que transformam indicadores em uma visão clara para gestores e equipes."],
  ["IA & Linguagem Natural", "Soluções com modelos de linguagem e PLN para classificar, resumir e extrair informação de textos."],
  ["Bancos de Dados", "Modelagem, manutenção e qualidade de bases de dados, garantindo informação consistente e confiável."],
];

function Services() {
  return (
    <section id="servicos" className="rounded-t-[40px] bg-paper px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 className="mb-16 text-center font-black uppercase leading-none sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Serviços</h2>
      <div className="mx-auto max-w-5xl">
        {services.map(([name, desc], i) => (
          <FadeIn key={name} delay={i * 0.1}>
            <div className="flex items-center gap-6 border-t border-ink/15 py-8 sm:gap-10 sm:py-10 md:py-12">
              <span className="font-black leading-none" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>0{i + 1}</span>
              <div>
                <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>{name}</h3>
                <p className="mt-2 max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>{desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
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
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Projects />
    </main>
  );
}
