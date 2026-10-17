// Run from the ROOT of your Vite project:  node scaffold.mjs
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const put = (p, c, force = false) => {
  mkdirSync(dirname(p), { recursive: true });
  if (force || !existsSync(p)) writeFileSync(p, c);
};

/* ---------- 1. STUBS (built in later phases) ---------- */
const S = "src/";
const stubs = [
  "content/types.ts", "content/estimatorConfig.ts",
  ...["Badge","GlassCard","SectionHeading","IconBox","Input","Select","Tabs"].map(n => "components/ui/" + n + ".tsx"),
  ...["MobileMenu","PageTransition"].map(n => "components/layout/" + n + ".tsx"),
  ...["FrictionSection","Pillars","EcosystemShowcase","ImpactMetrics","TrustedBy","CTAPortal"].map(n => "components/home/" + n + ".tsx"),
  ...["ServiceLayer","TechStackGrid","ArchitectureBlueprint"].map(n => "components/services/" + n + ".tsx"),
  ...["OriginStory","TeamSection","TeamCard","PhilosophyBanner","HorizontalTimeline"].map(n => "components/about/" + n + ".tsx"),
  ...["ShowcaseMatrix","ProjectCard","FilterTabs","EstimatorWidget","ContactForm","WhatsAppButton"].map(n => "components/work/" + n + ".tsx"),
  "animations/useReveal.ts", "animations/useMagnetic.ts", "animations/useMouseParallax.ts",
  ...["heroTimeline","frictionTimeline","pillarsTimeline","showcaseTimeline"].map(n => "animations/timelines/" + n + ".ts"),
  "lib/api/leads.ts", "lib/api/estimator.ts",
];
stubs.forEach(p => put(S + p, "export {};\n"));

[["Services", "Solutions & Tech Stack"], ["About", "The Thauma Engine"], ["Work", "Work & Contact"]].forEach(([n, t]) =>
  put(S + "pages/" + n + ".tsx",
    "export default function " + n + '() {\n  return <main className="min-h-screen px-6 pt-32 text-white">' + t + " - coming in next phase</main>;\n}\n"));

put(".env", "VITE_API_URL=\nVITE_WHATSAPP=233000000000\nVITE_CAL_LINK=https://cal.com/your-link\n");

/* ---------- 2. CONFIG ---------- */
put("vite.config.ts", `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
`, true);

// add "@/*" path alias to tsconfig.app.json
const tsPath = "tsconfig.app.json";
if (existsSync(tsPath)) {
  let t = readFileSync(tsPath, "utf8");
  if (!t.includes('"@/*"')) {
    t = t.replace('"compilerOptions": {', '"compilerOptions": {\n    "paths": { "@/*": ["./src/*"] },');
    writeFileSync(tsPath, t);
  }
}

put("index.html", `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Thauma Digital Solutions. Engineering wonder, unlocking growth." />
    <title>Thauma Digital Solutions | Engineering wonder, unlocking growth.</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`, true);

/* ---------- 3. SRC FOUNDATION ---------- */
put("src/index.css", `@import "tailwindcss";

@theme {
  --color-navy: #0F172A;
  --color-brand: #FF5A1F;
  --color-slate-body: #475569;
  --color-slate-mute: #64748B;
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-heading: "Space Grotesk Variable", system-ui, sans-serif;
}

html { scroll-behavior: auto; }
body { margin: 0; background: #0F172A; color: #fff; font-family: var(--font-sans); }
h1, h2, h3, h4 { font-family: var(--font-heading); }
a, button, [role="button"], summary, select, label[for] { cursor: pointer; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`, true);

put("src/main.tsx", `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/space-grotesk/index.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
`, true);

put("src/App.tsx", `import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LenisProvider from "@/animations/LenisProvider";
import { ScrollTrigger } from "@/animations/registerGsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Work from "@/pages/Work";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LenisProvider>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
      </Routes>
      <Footer />
    </LenisProvider>
  );
}
`, true);

put("src/pages/Home.tsx", `import Hero from "@/components/home/Hero";
import ServiceStrip from "@/components/home/ServiceStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceStrip />
      {/* Phase 2: FrictionSection, Pillars, EcosystemShowcase, ImpactMetrics, TrustedBy, CTAPortal */}
    </main>
  );
}
`, true);

put("src/lib/utils.ts", `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`, true);

put("src/lib/env.ts", `export const env = {
  apiUrl: (import.meta.env.VITE_API_URL as string) ?? "",
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) ?? "",
  calLink: (import.meta.env.VITE_CAL_LINK as string) ?? "",
};
`, true);

// All network calls go through here. Empty VITE_API_URL = mock mode.
put("src/lib/api/client.ts", `import { env } from "@/lib/env";

export async function apiPost<T = { ok: boolean }>(path: string, body: unknown): Promise<T> {
  if (!env.apiUrl) {
    // MOCK mode: simulates latency. Set VITE_API_URL to your API Gateway URL to go live.
    console.log("[mock POST]", path, body);
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true } as T;
  }
  const res = await fetch(env.apiUrl + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Request failed: " + res.status);
  return res.json() as Promise<T>;
}
`, true);

put("src/content/siteContent.ts", `// SINGLE SOURCE OF TRUTH for all copy. Do not hardcode text in components.
// Anything marked // REPLACE is placeholder data.

export const siteContent = {
  brand: {
    name: "Thauma Digital Solutions",
    short: "Thauma",
    motto: "Engineering wonder, unlocking growth.",
    vision:
      "To be the premier digital growth partner for African businesses, empowering everyday enterprises to achieve extraordinary scale through the seamless fusion of intelligent technology and creative media.",
    mission:
      "To help growing businesses unlock their full potential by providing integrated software tools, AI automation, and high-impact visual media that drive visibility, operational efficiency, and sustainable sales.",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/work#contact" },
  ],
  navCta: { label: "Get Started", href: "/work#contact" },

  hero: {
    eyebrow: ["TECH", "CREATIVE", "IMPACT"],
    headlineLead: "We Build Media & Digital Systems That",
    headlineHighlight: "Scale Businesses.",
    sub: "Thauma is a tech and creative agency helping African brands turn ideas into powerful digital products, stunning visuals and scalable solutions.",
    primaryCta: { label: "Supercharge Your Business", href: "/work#contact" },
    secondaryCta: { label: "Watch Showreel" },
    cards: {
      growth: { label: "Total Growth", value: "+248%", note: "Last 30 days" }, // REPLACE
      momo: {
        title: "MoMo Webhook",
        lines: ["POST /payments/momo", "status: SUCCESS", "GHS 450.00 received"], // REPLACE
      },
      code: {
        title: "order-agent.ts",
        lines: ["const order = await track(id);", "await notify.whatsapp(order);", "analytics.update(order);"],
      },
      output: { label: "Creative Output", value: "98%" }, // REPLACE
    },
  },

  serviceStrip: [
    { icon: "code", title: "Web & Software Development", desc: "Robust, scalable and modern web applications tailored to your needs.", href: "/services" },
    { icon: "camera", title: "Creative Media Production", desc: "High-quality video, photo and graphic content that tells your story.", href: "/services" },
    { icon: "cloud", title: "Cloud & AI Automation", desc: "Secure, serverless cloud systems and autonomous AI agents.", href: "/services" },
    { icon: "bulb", title: "Branding & Digital Strategy", desc: "Strategic design and digital solutions to grow your brand.", href: "/services" },
  ],

  philosophy:
    "We handle the tech complexity and creative heavy lifting so you can focus entirely on perfecting your product and service.",

  team: [
    { name: "Halifax Shambuck Addo Yeboah", role: "Chief Executive Officer", focus: "Lead Cloud & Software Engineer. Full-Stack, AWS Serverless Architectures, AI Agent Engineering." },
    { name: "Richard Yeboah", role: "Creative Media & Production Director", focus: "High-end Studio Videography, Motion Graphics, Visual Storytelling." },
    { name: "Pietro Carletto Bonaldi", role: "Business Branding & Social Media Marketing Director", focus: "Brand Strategy, Client Relations, Campaign Direction." },
    { name: "Derrick Aduama", role: "Marketing & Growth Strategist", focus: "Market Acquisition, Advertising Funnels, Client Growth." },
  ],

  footer: {
    blurb: "Engineering wonder, unlocking growth.",
    copyright: "Thauma Digital Solutions. All rights reserved.",
  },
} as const;

export type SiteContent = typeof siteContent;
`, true);

put("src/animations/registerGsap.ts", `import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register plugins ONCE for the whole app.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
`, true);

put("src/animations/LenisProvider.tsx", `import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./registerGsap";

// Lenis drives ScrollTrigger through GSAP's ticker (no duplicate rAF loops).
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
`, true);

put("src/components/ui/Container.tsx", `import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}
`, true);

put("src/components/ui/Button.tsx", `import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const styles = {
  primary: "bg-brand text-white hover:bg-[#ff7240] shadow-lg shadow-brand/20",
  ghost: "text-white hover:text-brand",
  outline: "border border-white/20 text-white hover:border-brand hover:text-brand",
};

export default function Button({ href, variant = "primary", className, children, onClick }: Props) {
  const cls = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    styles[variant],
    className
  );
  if (href) return <Link to={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}
`, true);

put("src/components/layout/Navbar.tsx", `import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { nav, navCta, brand } = siteContent;
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled || open ? "border-b border-white/10 bg-navy/80 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-wide">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">T</span>
          {brand.short.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => {
            const active = n.href === pathname;
            return (
              <Link key={n.label} to={n.href} className={cn("relative py-2 text-sm transition-colors hover:text-brand", active ? "text-brand" : "text-white/90")}>
                {n.label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block"><Button href={navCta.href} className="py-2.5">{navCta.label} &rarr;</Button></div>

        <button className="cursor-pointer lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 px-5 pb-6 lg:hidden">
          {nav.map((n) => (
            <Link key={n.label} to={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg hover:bg-white/5 hover:text-brand">{n.label}</Link>
          ))}
          <Button href={navCta.href} className="mt-3">{navCta.label}</Button>
        </div>
      )}
    </header>
  );
}
`, true);

put("src/components/layout/Footer.tsx", `import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";

export default function Footer() {
  const { footer } = siteContent;
  return (
    <footer className="border-t border-white/10 bg-navy py-10">
      <Container className="flex flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>{footer.blurb}</p>
        <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
      </Container>
    </footer>
  );
}
`, true);

put("src/components/home/Hero.tsx", `import { useRef } from "react";
import { Play, Zap, Camera as CamIcon } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, SplitText, useGSAP } from "@/animations/registerGsap";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  const { hero } = siteContent;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".headline", { type: "words" });
        const tl = gsap.timeline();
        tl.from(split.words, { y: 100, opacity: 0, stagger: 0.05, duration: 0.9, ease: "power4.out" })
          .from(".hero-fade", { y: 24, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.5")
          .from(".float-card", { y: 60, opacity: 0, scale: 0.9, stagger: 0.15, duration: 1, ease: "power3.out" }, "-=0.8");

        // gentle idle float (all screens)
        gsap.to(".float-card", { y: "+=12", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });

        // mouse parallax (desktop pointer only)
        if (window.matchMedia("(pointer: fine)").matches) {
          const move = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            gsap.to(".parallax", { x: x * 30, y: y * 20, duration: 0.8, ease: "power2.out" });
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        }
      });
    },
    { scope: root }
  );

  const glass = "float-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl";

  return (
    <section ref={root} className="relative overflow-hidden bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[140px]" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="hero-fade mb-5 flex items-center gap-2 text-xs tracking-[0.2em] text-white/70">
            {hero.eyebrow.map((e, i) => (
              <span key={e} className="flex items-center gap-2">
                {e}
                {i < hero.eyebrow.length - 1 && <span className="text-brand">&times;</span>}
              </span>
            ))}
          </p>
          <h1 className="headline font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {hero.headlineLead} <span className="text-brand">{hero.headlineHighlight}</span>
          </h1>
          <p className="hero-fade mt-6 max-w-lg text-base text-slate-300">{hero.sub}</p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label} &rarr;</Button>
            <Button variant="ghost" className="px-2">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30"><Play size={14} fill="currentColor" /></span>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="parallax relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4">
          <div className={glass}>
            <p className="text-xs text-slate-400">{hero.cards.growth.label}</p>
            <p className="font-heading text-3xl font-bold">{hero.cards.growth.value}</p>
            <p className="text-xs text-slate-500">{hero.cards.growth.note}</p>
          </div>
          <div className={glass}>
            <p className="mb-2 flex items-center gap-2 text-xs text-brand"><Zap size={14} />{hero.cards.momo.title}</p>
            {hero.cards.momo.lines.map((l) => <p key={l} className="font-mono text-[11px] text-slate-300">{l}</p>)}
          </div>
          <div className={glass + " col-span-2"}>
            <p className="mb-2 text-xs text-slate-400">{hero.cards.code.title}</p>
            {hero.cards.code.lines.map((l) => <p key={l} className="font-mono text-xs text-emerald-300/90">{l}</p>)}
          </div>
          <div className={glass + " col-span-2 flex items-center justify-between"}>
            <div>
              <p className="text-xs text-slate-400">{hero.cards.output.label}</p>
              <p className="font-heading text-3xl font-bold">{hero.cards.output.value}</p>
            </div>
            <CamIcon className="text-brand" size={36} />
          </div>
        </div>
      </Container>
    </section>
  );
}
`, true);

put("src/components/home/ServiceStrip.tsx", `import { useRef } from "react";
import { Link } from "react-router-dom";
import { Code2, Camera, Cloud, Lightbulb } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";

const icons = { code: Code2, camera: Camera, cloud: Cloud, bulb: Lightbulb } as const;

export default function ServiceStrip() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(".strip-card", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-white py-14">
      <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {siteContent.serviceStrip.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <div key={s.title} className="strip-card rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl">
              <Icon className="mb-4 text-navy" size={28} />
              <h3 className="font-heading text-base font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-body">{s.desc}</p>
              <Link to={s.href} className="mt-4 inline-block text-xs font-semibold text-brand">Learn More &rarr;</Link>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
`, true);

console.log("Thauma (Vite) scaffold complete. Now run: npm run dev");
