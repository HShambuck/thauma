// Run from the project ROOT after phase2.mjs:  node phase3.mjs
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const put = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };
const patch = (f, pairs) => {
  let s = readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) { console.warn("! skipped in " + f + ": " + a.slice(0, 60)); continue; }
    s = s.replace(a, () => b);
  }
  writeFileSync(f, s);
};

/* =============== PART A: PERFORMANCE FIXES =============== */

// 1. CSS: cheap glass (blur only on desktop), flow animation for blueprint
let css = readFileSync("src/index.css", "utf8");
if (!css.includes(".glass")) {
  css += `
/* Perf: backdrop blur is GPU-expensive, so only on capable desktops */
.glass { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); }
@media (min-width: 1024px) and (hover: hover) {
  .glass { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
}
@keyframes flow { to { stroke-dashoffset: -24; } }
.flow-line { stroke-dasharray: 6 6; animation: flow 1s linear infinite; }
`;
  writeFileSync("src/index.css", css);
}

// 2. ScrollTrigger config: fewer callbacks, no refresh on mobile URL-bar resize
patch("src/animations/registerGsap.ts", [[
  "gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);",
  "gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);\nScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });",
]]);

// 3. Hero: no giant blur filter, quickTo for mouse, pause idle float offscreen
patch("src/components/home/Hero.tsx", [
  [`import { gsap, SplitText, useGSAP } from "@/animations/registerGsap";`,
   `import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/animations/registerGsap";`],
  [`bg-brand/20 blur-[140px]" />`, `bg-[radial-gradient(circle,rgba(255,90,31,0.28),transparent_70%)]" />`],
  [`"float-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl"`,
   `"float-card glass rounded-2xl p-4 will-change-transform"`],
  [`gsap.to(".float-card", { y: "+=12", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });`,
   `const floats = gsap.to(".float-card", { y: "+=12", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
        ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", onToggle: (s) => (s.isActive ? floats.play() : floats.pause()) });`],
  [`const move = (e: MouseEvent) => {`,
   `const qx = gsap.quickTo(".parallax", "x", { duration: 0.8, ease: "power2.out" });
          const qy = gsap.quickTo(".parallax", "y", { duration: 0.8, ease: "power2.out" });
          const move = (e: MouseEvent) => {`],
  [`gsap.to(".parallax", { x: x * 30, y: y * 20, duration: 0.8, ease: "power2.out" });`, `qx(x * 30); qy(y * 20);`],
]);

// 4. Friction: animate transforms/opacity only (no layout, no paint-heavy blur)
patch("src/components/home/FrictionSection.tsx", [
  [`<div className="beam pointer-events-none absolute inset-y-0 z-10 w-40 bg-gradient-to-r from-transparent via-brand/70 to-transparent blur-md" style={{ left: "-25%" }} />`,
   `<div className="beam pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-40 bg-gradient-to-r from-transparent via-brand/70 to-transparent will-change-transform md:block" />`],
  [`.fromTo(".beam", { left: "-25%" }, { left: "120%", duration: 1.6, ease: "none" }, 0.6)`,
   `.fromTo(".beam", { x: -200 }, { x: () => (root.current?.offsetWidth ?? 1400) + 200, duration: 1.6, ease: "none" }, 0.6)`],
  [`.to(".chaos-card", { borderColor: "#FF5A1F", backgroundColor: "rgba(255,90,31,0.08)", duration: 0.4, stagger: 0.05 }, 1.6)`,
   `.to(".node-glow", { opacity: 1, duration: 0.4, stagger: 0.05 }, 1.6)`],
  [`<div key={t} className="chaos-card rounded-xl border border-white/15 bg-white/5 px-5 py-6 text-sm font-medium backdrop-blur sm:text-base">{t}</div>`,
   `<div key={t} className="chaos-card relative rounded-xl border border-white/15 bg-white/5 px-5 py-6 text-sm font-medium will-change-transform sm:text-base"><span className="node-glow pointer-events-none absolute inset-0 rounded-xl border border-brand bg-brand/10 opacity-0" />{t}</div>`],
]);

// 5. Pillars: fade a white overlay (compositor) instead of animating background-color on a huge section
patch("src/components/home/Pillars.tsx", [
  [`gsap.fromTo(root.current, { backgroundColor: "#0F172A" }, { backgroundColor: "#FFFFFF", ease: "none", scrollTrigger: st });`,
   `gsap.fromTo(".bg-white-layer", { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: st });`],
  [`<section ref={root} className="bg-navy py-24">`,
   `<section ref={root} className="relative bg-navy py-24"><div className="bg-white-layer absolute inset-0 bg-white opacity-0" />`],
  [`<Container>`, `<Container className="relative">`],
]);

// 6. Navbar: transition only colors; App: lazy-load pages (smaller first load)
patch("src/components/layout/Navbar.tsx", [[`z-50 transition-all"`, `z-50 transition-colors"`]]);
patch("src/App.tsx", [
  [`import { useEffect } from "react";`, `import { lazy, Suspense, useEffect } from "react";`],
  [`import Services from "@/pages/Services";`, `const Services = lazy(() => import("@/pages/Services"));`],
  [`import About from "@/pages/About";`, `const About = lazy(() => import("@/pages/About"));`],
  [`import Work from "@/pages/Work";`, `const Work = lazy(() => import("@/pages/Work"));`],
  [`<Routes>`, `<Suspense fallback={null}>\n        <Routes>`],
  [`</Routes>`, `</Routes>\n      </Suspense>`],
]);

/* =============== PART B: SERVICES PAGE =============== */

const cp = "src/content/siteContent.ts";
let c = readFileSync(cp, "utf8");
if (!c.includes("servicesPage:")) {
  c = c.replace("  footer: {", `  servicesPage: {
    hero: {
      eyebrow: "SOLUTIONS & TECH STACK",
      title: "Engineering and media depth.",
      sub: "Serious infrastructure, intelligent automation and studio-grade media, built to work as one system.",
    },
    layers: [
      { id: "ai", icon: "bot", tone: "dark", title: "AI & Operational Automation Layer",
        blurb: "Software that works while you sleep.",
        items: [
          { title: "Custom Business AI Agents", desc: "Autonomous agents that manage social handles, post content, parse DMs, triage support and alert team leads." },
          { title: "Intelligent Chatbots & NLP", desc: "Assistants trained on your catalogue, price list and business logic for instant lead qualification." },
        ] },
      { id: "cloud", icon: "cloud", tone: "light", title: "Cloud Architecture & Engineering (AWS Serverless)",
        blurb: "Fast, secure and billed only for what you use.",
        items: [
          { title: "High-Performance Web Apps & PWAs", desc: "Fast, SEO-optimised web systems built with modern frameworks." },
          { title: "Custom Analytics & Order Tracking", desc: "Real-time dashboards for inventory, fulfilment speed and customer retention." },
          { title: "Omnichannel Payment Gateways", desc: "Mobile Money (MTN, Telecel, AT) and card processing through Paystack and Hubtel." },
        ] },
      { id: "media", icon: "film", tone: "dark", title: "Media Production & Brand Identity",
        blurb: "Content that makes your brand impossible to ignore.",
        items: [
          { title: "Studio Videography & Editing", desc: "Commercial-grade product videos, brand documentaries and high-converting ad reels." },
          { title: "Visual Brand Identity Systems", desc: "Logos, typography, packaging design and visual guidelines." },
        ] },
    ],
    techStack: {
      title: "The stack behind the wonder",
      groups: [
        { group: "Frontend", chips: ["React", "Vite", "TypeScript", "Tailwind CSS", "GSAP", "PWA"] },
        { group: "Cloud", chips: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront"] },
        { group: "AI & Automation", chips: ["LLM Agents", "NLP", "WhatsApp API", "Webhooks"] },
        { group: "Payments", chips: ["MTN MoMo", "Telecel Cash", "AT Money", "Paystack", "Hubtel"] },
        { group: "Media", chips: ["Studio Video", "Motion Graphics", "Colour Grading", "Photography"] },
      ],
    },
    blueprint: {
      title: "Architecture Blueprint",
      sub: "Hover or tap a node to see how data flows from your media campaign to the serverless backend.",
      connected: "Connected to",
      idle: "Select a node to explore the flow.",
      nodes: [
        { id: "video", label: "Media", x: 110, y: 90, desc: "Reels and brand content drive traffic into your web app." },
        { id: "payments", label: "Payments", x: 110, y: 310, desc: "MoMo and card payments confirm orders instantly." },
        { id: "cloud", label: "Serverless", x: 400, y: 200, desc: "API Gateway and Lambda run the backend, scaling with demand." },
        { id: "ai", label: "AI Agent", x: 690, y: 90, desc: "Handles DMs, qualifies leads, triages support and alerts your team." },
        { id: "analytics", label: "Analytics", x: 690, y: 310, desc: "Live dashboards for inventory, fulfilment speed and retention." },
      ],
      edges: [["video", "cloud"], ["payments", "cloud"], ["ai", "cloud"], ["analytics", "cloud"], ["ai", "analytics"]],
    },
  },

  footer: {`);
  writeFileSync(cp, c);
}

put("src/components/services/ServiceLayer.tsx", `import { useRef } from "react";
import { Bot, Cloud, Film } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Layer = (typeof siteContent.servicesPage.layers)[number];
const icons = { bot: Bot, cloud: Cloud, film: Film } as const;

export default function ServiceLayer({ layer }: { layer: Layer }) {
  const root = useRef<HTMLElement>(null);
  const dark = layer.tone === "dark";
  const Icon = icons[layer.icon as keyof typeof icons];

  useGSAP(() => {
    gsap.from(".svc-item", { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" } });
  }, { scope: root });

  return (
    <section ref={root} className={cn("py-20", dark ? "bg-navy text-white" : "bg-white text-navy")}>
      <Container>
        <Icon className="text-brand" size={34} />
        <h2 className="mt-4 max-w-3xl font-heading text-2xl font-bold sm:text-4xl">{layer.title}</h2>
        <p className={cn("mt-2", dark ? "text-slate-400" : "text-slate-body")}>{layer.blurb}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layer.items.map((i) => (
            <div key={i.title} className={cn("svc-item rounded-2xl border p-6", dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white shadow-sm")}>
              <h3 className="font-heading text-lg font-semibold">{i.title}</h3>
              <p className={cn("mt-2 text-sm", dark ? "text-slate-300" : "text-slate-body")}>{i.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
`);

put("src/components/services/TechStackGrid.tsx", `import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";

export default function TechStackGrid() {
  const { techStack } = siteContent.servicesPage;
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <h2 className="font-heading text-2xl font-bold text-navy sm:text-4xl">{techStack.title}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.groups.map((g) => (
            <div key={g.group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-navy">{chip}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
`);

put("src/components/services/ArchitectureBlueprint.tsx", `import { useState } from "react";
import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function ArchitectureBlueprint() {
  const bp = siteContent.servicesPage.blueprint;
  const [active, setActive] = useState<string | null>(null);
  const byId = Object.fromEntries(bp.nodes.map((n) => [n.id, n]));
  const connected = (id: string) =>
    bp.edges.filter((e) => e.includes(id)).map((e) => (e[0] === id ? e[1] : e[0]));
  const current = active ? byId[active] : null;
  const linked = active ? connected(active) : [];

  return (
    <section className="bg-navy py-20">
      <Container>
        <h2 className="font-heading text-2xl font-bold sm:text-4xl">{bp.title}</h2>
        <p className="mt-3 max-w-xl text-slate-400">{bp.sub}</p>

        <svg viewBox="0 0 800 400" className="mt-10 h-auto w-full" role="img" aria-label={bp.title}>
          {bp.edges.map(([a, b]) => {
            const on = active === a || active === b;
            return (
              <line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
                strokeWidth={2} className={cn(on ? "flow-line stroke-brand" : "stroke-white/15")} />
            );
          })}
          {bp.nodes.map((n) => {
            const hot = active === n.id || linked.includes(n.id);
            return (
              <g key={n.id} tabIndex={0} role="button" className="cursor-pointer outline-none"
                onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)} onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}>
                <circle cx={n.x} cy={n.y} r={38} className={cn("fill-slate-800 transition-colors", hot ? "stroke-brand" : "stroke-white/20")} strokeWidth={2} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-white text-[14px] font-semibold">{n.label}</text>
              </g>
            );
          })}
        </svg>

        <div className="mt-6 min-h-24 rounded-2xl border border-white/10 bg-white/5 p-6">
          {current ? (
            <>
              <h3 className="font-heading text-lg font-semibold text-brand">{current.label}</h3>
              <p className="mt-1 text-slate-300">{current.desc}</p>
              <p className="mt-3 text-xs text-slate-400">{bp.connected}: {linked.map((l) => byId[l].label).join(", ")}</p>
            </>
          ) : (
            <p className="text-slate-400">{bp.idle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
`);

put("src/pages/Services.tsx", `import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import ServiceLayer from "@/components/services/ServiceLayer";
import TechStackGrid from "@/components/services/TechStackGrid";
import ArchitectureBlueprint from "@/components/services/ArchitectureBlueprint";

export default function Services() {
  const { hero, layers } = siteContent.servicesPage;
  return (
    <main>
      <section className="bg-navy pt-36 pb-16">
        <Container>
          <p className="text-xs tracking-[0.2em] text-brand">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold sm:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-slate-300">{hero.sub}</p>
        </Container>
      </section>
      {layers.map((l) => <ServiceLayer key={l.id} layer={l} />)}
      <TechStackGrid />
      <ArchitectureBlueprint />
    </main>
  );
}
`);

console.log("Phase 3 complete: performance fixes applied and Services page built.");
