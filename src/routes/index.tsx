import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "André Vinícius — Analista de Sistemas & Dados | IA e Automação" },
      {
        name: "description",
        content:
          "Portfólio de André Vinícius: análise de dados, automação com n8n, Python, SQL, Power BI e inteligência artificial. Salvador, BA.",
      },
      { property: "og:title", content: "André Vinícius — Dados, IA & Automação" },
      {
        property: "og:description",
        content: "Transformando dados em decisões e processos em automações inteligentes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LINKEDIN =
  "https://www.linkedin.com/in/andr%C3%A9-vin%C3%ADcius-de-oliveira-passos-7117b71b6/";

const skills = ["Python", "SQL", "Power BI", "n8n", "Excel", "IA Generativa", "PLN", "Big Data", "Automação", "ETL"];

const experiences = [
  {
    period: "Abr 2026 — Atual",
    role: "Assistente de Dados",
    company: "JUST TRAVEL",
    text: "Coleta, organização e análise de dados para decisões. Controles inteligentes, relatórios, manutenção de bancos de dados e automação de rotinas para reduzir erros.",
  },
  {
    period: "Fev 2025",
    role: "Customer Support Analyst I",
    company: "Solutis Tecnologias",
    text: "Suporte técnico em uma das maiores empresas de TI do Brasil, resolvendo problemas e fortalecendo a ponte entre tecnologia e pessoas.",
  },
  {
    period: "Antes",
    role: "Instrutor de Programação & Robótica",
    company: "Educação em tecnologia",
    text: "Ensino de lógica, programação e robótica — base da minha comunicação clara e do pensamento estruturado.",
  },
];

const projects = [
  { n: "01", title: "Controle Inteligente", tag: "Python · SQL · Excel", text: "Painéis e controles automatizados que eliminam retrabalho e garantem consistência dos dados." },
  { n: "02", title: "Fluxos com n8n + IA", tag: "n8n · LLMs · APIs", text: "Automações ponta a ponta que conectam sistemas e usam IA para classificar e responder." },
  { n: "03", title: "Dashboards Estratégicos", tag: "Power BI · DAX", text: "Visualizações que transformam números em insights claros para a liderança." },
  { n: "04", title: "Análise de Texto (PLN)", tag: "NLP · Python", text: "Extração de padrões e sentimentos em textos, aplicada a dados reais de negócio." },
];

const education = [
  { title: "Pós-graduação — Dados & IA", items: "Big Data Analytics · Processamento de Linguagem Natural · Gestão de Projetos" },
  { title: "Formação em Sistemas", items: "Base em desenvolvimento, bancos de dados e análise de sistemas" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const ember = getComputedStyle(document.documentElement).getPropertyValue("--ember").trim();
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999 };
    const dpr = Math.min(window.devicePixelRatio, 2);
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const resize = () => {
      w = c.offsetWidth; h = c.offsetHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.floor((w * h) / 14000);
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 140) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
      }
      for (let i = 0; i < pts.length; i++) { const a = pts[i]!;
        for (let j = i + 1; j < pts.length; j++) { const b = pts[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = ember; ctx.globalAlpha = (1 - d / 120) * 0.35; ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.8; ctx.fillStyle = ember;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    resize(); tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move); loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-1.5 w-1.5 rounded-full bg-ember md:block" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-10 w-10 rounded-full border border-ember/60 md:block" />
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => setP(window.scrollY / (document.body.scrollHeight - window.innerHeight || 1));
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="fixed left-0 top-0 z-50 h-0.5 bg-ember" style={{ width: `${p * 100}%` }} />;
}

function Index() {
  useReveal();
  return (
    <main className="grain relative overflow-x-hidden">
      <Cursor />
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-12">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">AV<span className="text-ember">.</span></a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {["sobre", "experiência", "projetos", "contato"].map((s) => (
            <a key={s} href={`#${s}`} className="transition-colors hover:text-foreground">{s}</a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen flex-col justify-end px-6 pb-16 md:px-12">
        <NetworkCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,var(--color-ember)_0%,transparent_45%)] opacity-15" />
        <div className="relative">
          <p className="reveal mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ember" /> Salvador, BA — disponível para projetos
          </p>
          <h1 className="reveal font-display text-[13vw] font-extrabold leading-[0.85] tracking-tighter md:text-[10vw]">
            André<br />
            <span className="text-ember-gradient">Vinícius</span>
          </h1>
          <div className="reveal mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-lg text-muted-foreground">
              Analista de Sistemas & Dados. Transformo dados em decisões e processos em
              <span className="text-foreground"> automações inteligentes</span>.
            </p>
            <a href="#projetos" className="group flex items-center gap-4 font-display text-sm uppercase tracking-widest">
              Explorar
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition-all group-hover:bg-ember group-hover:text-primary-foreground">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-4xl font-bold md:text-6xl">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="flex items-center gap-12 text-muted-foreground/60">
              {s} <span className="text-ember">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" className="grid gap-12 px-6 py-32 md:grid-cols-12 md:px-12">
        <p className="reveal text-sm uppercase tracking-[0.3em] text-ember md:col-span-3">(01) Sobre</p>
        <div className="md:col-span-9">
          <h2 className="reveal font-display text-3xl font-semibold leading-tight md:text-5xl">
            Apaixonado por tecnologia, dados e inovação. Meu foco é <span className="text-ember-gradient">automatizar o repetitivo</span> e
            revelar o que os números escondem.
          </h2>
          <div className="reveal mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[["2+", "anos de experiência"], ["10+", "ferramentas no stack"], ["∞", "vontade de aprender"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl font-bold md:text-6xl">{n}</div>
                <div className="mt-2 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiência" className="px-6 py-32 md:px-12">
        <p className="reveal mb-16 text-sm uppercase tracking-[0.3em] text-ember">(02) Experiência</p>
        <div>
          {experiences.map((e) => (
            <article key={e.role} className="reveal group grid gap-4 border-t border-border py-10 transition-colors hover:bg-card md:grid-cols-12 md:px-6">
              <span className="text-sm text-muted-foreground md:col-span-2">{e.period}</span>
              <div className="md:col-span-5">
                <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-ember md:text-4xl">{e.role}</h3>
                <p className="mt-1 text-muted-foreground">{e.company}</p>
              </div>
              <p className="text-muted-foreground md:col-span-5">{e.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="px-6 py-32 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <p className="reveal text-sm uppercase tracking-[0.3em] text-ember">(03) Projetos</p>
          <h2 className="reveal font-display text-4xl font-bold md:text-7xl">Trabalhos<span className="text-ember">.</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Tilt key={p.n}>
              <span className="font-display text-7xl font-extrabold text-muted-foreground/20 transition-colors group-hover:text-ember">{p.n}</span>
              <h3 className="mt-16 font-display text-3xl font-bold">{p.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-ember">{p.tag}</p>
              <p className="mt-4 text-muted-foreground">{p.text}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* FORMAÇÃO */}
      <section className="grid gap-12 px-6 py-32 md:grid-cols-12 md:px-12">
        <p className="reveal text-sm uppercase tracking-[0.3em] text-ember md:col-span-3">(04) Formação</p>
        <div className="space-y-10 md:col-span-9">
          {education.map((e) => (
            <div key={e.title} className="reveal border-l-2 border-ember pl-6">
              <h3 className="font-display text-2xl font-bold md:text-3xl">{e.title}</h3>
              <p className="mt-2 text-muted-foreground">{e.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute h-[600px] w-[600px] animate-spin-slow rounded-full border border-dashed border-ember/20" />
        <p className="reveal text-sm uppercase tracking-[0.3em] text-muted-foreground">(05) Vamos conversar?</p>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="reveal group mt-6 font-display text-5xl font-extrabold tracking-tighter md:text-9xl">
          Fale <span className="text-ember-gradient transition-all group-hover:italic">comigo</span> ↗
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="reveal mt-12 rounded-full bg-ember px-8 py-4 font-display font-semibold text-primary-foreground shadow-ember transition-transform hover:scale-105">
          Conectar no LinkedIn
        </a>
      </section>

      <footer className="flex justify-between border-t border-border px-6 py-8 text-sm text-muted-foreground md:px-12">
        <span>© 2026 André Vinícius de Oliveira Passos</span>
        <span>Salvador — BR</span>
      </footer>
    </main>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current!.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => ref.current && (ref.current.style.transform = "")}
      className="reveal group rounded-[var(--radius-xl)] border border-border bg-card p-8 transition-[transform,box-shadow] duration-300 hover:shadow-ember md:p-10"
    >
      {children}
    </div>
  );
}
