// Run from the project ROOT after phase4.mjs:  node phase5.mjs
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

/* ===== 1. Waves removed (component stays so imports don't break) ===== */
put("src/components/ui/Wave.tsx", `export default function Wave(_props: { className?: string }) {
  return null;
}
`);

/* ===== 2. CONTENT ===== */
patch("src/content/siteContent.ts", [
  [`headlineLead: "We Build Media & Digital Systems That",`, `headlineLead: "Engineering Wonder,",`],
  [`headlineHighlight: "Scale Businesses.",`, `headlineHighlight: "Unlocking Growth.",`],
  [`sub: "Thauma is a tech and creative agency helping African brands turn ideas into powerful digital products, stunning visuals and scalable solutions.",`,
   `sub: "Thauma fuses high-end media branding with custom cloud and AI engineering, so your business gets seen, trusted and run smoothly.",`],
  [`secondaryCta: { label: "Watch Showreel" },`, `secondaryCta: { label: "Explore Solutions", href: "/services" },`],
  [`title: "Media & Visual Identity",
      items: ["High-definition video reels", "Studio product photography", "Brand storytelling"],`,
   `title: "Media, Socials & Branding",
      items: ["High-production video content", "Professional photography", "Strategic social media management", "Targeted advertising campaigns", "Brand identity that builds instant trust"],`],
  [`title: "AI & Cloud Infrastructure",
      items: ["Serverless web apps", "Autonomous AI agents", "Automated order tracking", "Custom analytics", "MoMo & card gateways"],`,
   `title: "Custom Tech & AI Engineering",
      items: ["Serverless cloud architecture (AWS)", "Custom web and mobile applications", "Automated order tracking", "Mobile Money and card payment integrations", "AI agents that automate business workflows"],`],
  [`    cta: { label: "Discuss your project", href: "/work#contact" },`,
   `    cta: { label: "Discuss your project", href: "/work#contact" },
    chapters: [
      { id: "media", step: "Service 01", label: "Creative Media & Branding", title: "Authority from the very first impression.",
        story: "High-production video content, professional photography, and visual brand identity that establish immediate market authority. We also run your socials, so that authority shows up every single day.",
        points: ["Video production", "Professional photography", "Visual brand identity", "Social media management and ads"], visual: "media" },
      { id: "web", step: "Service 02", label: "Custom Web & Application Development", title: "Software built around the way you run.",
        story: "High-performance, SEO-optimized web applications with integrated payment gateways (Mobile Money and cards), automated order tracking, and custom features tailored to your operations.",
        points: ["SEO-optimised web apps", "Mobile Money and card payments", "Automated order tracking", "Custom features for your business"], visual: "web" },
      { id: "ops", step: "Service 03", label: "Automated Account Operations", title: "Consistent engagement. Minimal manual friction.",
        story: "Internal AI-driven workflows that streamline content scheduling, lead triaging and social media analytics, so your audience stays engaged without your team chasing every task.",
        points: ["Content scheduling", "Lead triaging", "Social media analytics", "AI agents for routine tasks"], visual: "ops" },
    ],`],
]);

let c = readFileSync("src/content/siteContent.ts", "utf8");
if (!c.includes("  home: {")) {
  c = c.replace("  footer: {", () => `  home: {
    statement: {
      kicker: "THE THAUMA MODEL",
      text: "Great businesses need to be seen and trusted, and to run smoothly. Thauma builds both.",
      highlight: ["trusted,", "smoothly.", "both."],
    },
    chapters: [
      { id: "media", step: "Step 01", label: "Credibility & Visibility", title: "We manage your brand and socials, so your business looks as good as it is.",
        story: "Customers decide in seconds whether to trust you. We handle your branding, content and social media so your business shows up professional, consistent and impossible to ignore.",
        points: ["High-production video content", "Professional photography", "Visual brand identity", "Social media management and targeted ads"],
        visual: "media", cta: { label: "See our media services", href: "/services" } },
      { id: "tech", step: "Step 02", label: "Custom Solutions", title: "We are also a tech company. We build the systems your business runs on.",
        story: "Visibility brings customers to the door. We do not stop at a website: we engineer custom software around the real bottlenecks in your operations.",
        points: ["High-performance, SEO-optimised web apps", "Mobile Money and card payments built in", "Automated order tracking", "Custom features tailored to how you operate"],
        visual: "web", cta: { label: "See our tech services", href: "/services" } },
      { id: "hybrid", step: "Step 03", label: "Hybrid Packages", title: "Media and tech, combined to fit your business.",
        story: "Most businesses start with a professional website linked to their socials. If your operations need more, and only if we deem it necessary, we add MoMo checkout, order tracking, AI integration or a custom AI agent.",
        points: ["Professional website linked to your socials", "Mobile Money and card payments", "Order tracking and custom analytics", "AI integrations and agents, only where they help"],
        visual: "packages", cta: { label: "Explore packages", href: "/services" } },
      { id: "standalone", step: "Step 04", label: "Standalone Services", title: "Just need one thing? We do that too.",
        story: "No retainer required. Hire us for a single job and get the same standard of work.",
        points: ["Event photography and videography", "Graphic design", "Video and sound editing", "Custom software builds, project by project"],
        visual: "standalone", cta: { label: "Discuss your project", href: "/work#contact" } },
    ],
  },

  footer: {`);
  writeFileSync("src/content/siteContent.ts", c);
}

/* ===== 3. VISUALS (illustrated mockups; pass image="/images/x.jpg" to use a real photo) ===== */
put("src/components/ui/MediaVisual.tsx", `import { Aperture, Film, Smartphone, Bot, MessageCircle, CalendarClock, BarChart3, Camera, Share2, PenTool, Music, Code2, Check } from "lucide-react";

const card = "absolute rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-xs text-white shadow-xl";
const shell = "rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-navy shadow-2xl";

function Browser({ small }: { small?: boolean }) {
  return (
    <div className={shell + " w-full overflow-hidden"}>
      <div className="flex gap-1.5 border-b border-white/10 p-3">
        <i className="h-2.5 w-2.5 rounded-full bg-brand" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        <div className={"col-span-3 rounded-lg bg-gradient-to-r from-brand/50 to-transparent " + (small ? "h-14" : "h-20")} />
        {[0, 1, 2].map((i) => <div key={i} className={"rounded-lg bg-white/10 " + (small ? "h-10" : "h-16")} />)}
      </div>
    </div>
  );
}

export default function MediaVisual({ kind, image }: { kind: string; image?: string }) {
  if (image) return <img src={image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />;

  if (kind === "media")
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
        <div className={shell + " absolute inset-0 grid place-items-center"}><Aperture className="text-brand" size={120} strokeWidth={1.2} /></div>
        <div className={card + " -left-3 top-6"}><p className="flex items-center gap-2 font-semibold"><Film size={14} className="text-brand" />Brand reel</p><p className="text-slate-400">12.4K views</p></div>
        <div className={card + " -right-3 bottom-16"}><p className="font-semibold">Post scheduled</p><p className="text-slate-400">Today, 6:00 PM</p></div>
        <div className="absolute bottom-5 left-6 flex gap-2"><i className="h-6 w-6 rounded-full bg-brand" /><i className="h-6 w-6 rounded-full bg-white" /><i className="h-6 w-6 rounded-full bg-slate-500" /></div>
      </div>
    );

  if (kind === "web")
    return (
      <div className="relative mx-auto w-full max-w-lg pb-8">
        <Browser />
        <div className="absolute -bottom-0 -right-2 w-44 rounded-2xl border border-white/10 bg-navy p-3 text-white shadow-2xl">
          <p className="flex items-center gap-2 text-xs text-slate-400"><Smartphone size={14} />Pay with MoMo</p>
          <p className="mt-1 font-heading text-xl font-bold">GHS 450.00</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400"><Check size={12} />Payment confirmed</p>
        </div>
      </div>
    );

  if (kind === "ops") {
    const rows = [[MessageCircle, "New DM from a customer", "Lead qualified"], [CalendarClock, "Content queue", "Posts scheduled"], [BarChart3, "Weekly analytics", "Report ready"]] as const;
    return (
      <div className={shell + " mx-auto w-full max-w-lg space-y-3 p-5 text-white"}>
        <p className="flex items-center gap-2 text-sm font-semibold"><Bot className="text-brand" size={18} />Thauma agent <span className="ml-auto text-xs text-emerald-400">running</span></p>
        {rows.map(([Icon, a, b]) => (
          <div key={a} className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><Icon size={18} className="text-brand" /><span className="text-sm">{a}</span><span className="ml-auto text-xs text-slate-400">{b}</span></div>
        ))}
      </div>
    );
  }

  if (kind === "packages")
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1"><Browser small /></div>
          <div className="h-px w-6 border-t border-dashed border-brand" />
          <div className="flex flex-col gap-3">
            {[Camera, Share2, MessageCircle].map((I, i) => <span key={i} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-800 text-brand shadow-xl"><I size={20} /></span>)}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Website", "Socials", "MoMo", "Order tracking", "AI (if needed)"].map((t) => <span key={t} className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{t}</span>)}
        </div>
      </div>
    );

  const tiles = [[Camera, "Event coverage"], [PenTool, "Graphic design"], [Music, "Video & sound"], [Code2, "Custom systems"]] as const;
  return (
    <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
      {tiles.map(([Icon, t]) => (
        <div key={t} className={shell + " flex aspect-square flex-col items-center justify-center gap-3 text-white"}><Icon className="text-brand" size={34} /><span className="text-sm font-semibold">{t}</span></div>
      ))}
    </div>
  );
}
`);

/* ===== 4. STACKED CHAPTERS (pinned, cards slide over each other) ===== */
put("src/components/ui/StackedChapters.tsx", `import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/animations/registerGsap";
import MediaVisual from "@/components/ui/MediaVisual";
import { cn } from "@/lib/utils";

export type Chapter = {
  id: string; step: string; label: string; title: string; story: string;
  points: readonly string[]; visual: string; image?: string;
  cta?: { label: string; href: string };
};

export default function StackedChapters({ chapters }: { chapters: readonly Chapter[] }) {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const n = chapters.length;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".ch-panel");
      const words = panels.map((p) => SplitText.create(p.querySelector(".ch-title")!, { type: "words" }).words);
      gsap.set(panels.slice(1), { yPercent: 100 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "+=" + n * 1000, scrub: 0.6, pin: true,
          onUpdate: (s) => setIdx(Math.min(n - 1, Math.round(s.progress * (n - 1)))),
        },
      });
      panels.forEach((p, i) => {
        if (i === 0) return;
        const t = i - 1;
        tl.to(p, { yPercent: 0, ease: "power2.inOut", duration: 1 }, t)
          .to(panels[i - 1], { scale: 0.92, opacity: 0.45, ease: "none", duration: 1 }, t)
          .fromTo(words[i], { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", duration: 0.6 }, t + 0.45)
          .fromTo(p.querySelectorAll(".ch-in"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 }, t + 0.6);
      });
      tl.to({}, { duration: 0.6 });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>(".ch-in").forEach((el) => {
        gsap.from(el, { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative bg-navy lg:h-screen lg:overflow-hidden">
      {chapters.map((c, i) => {
        const light = i % 2 === 0;
        return (
          <article key={c.id} className={cn("ch-panel relative flex items-center rounded-t-[2rem] px-5 py-16 sm:px-8 lg:absolute lg:inset-0 lg:rounded-t-[2.5rem] lg:py-0 lg:pt-20",
            light ? "bg-white text-navy" : "bg-navy text-white border-t border-white/10")}>
            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="ch-in text-xs font-semibold tracking-[0.2em] text-brand">{c.step.toUpperCase()} &middot; {c.label.toUpperCase()}</p>
                <h2 className="ch-title mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{c.title}</h2>
                <p className={cn("ch-in mt-5 max-w-lg", light ? "text-slate-body" : "text-slate-300")}>{c.story}</p>
                <ul className="ch-in mt-6 space-y-2">
                  {c.points.map((p) => <li key={p} className="flex items-start gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{p}</li>)}
                </ul>
                {c.cta && <Link to={c.cta.href} className="ch-in mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-[#ff7240]">{c.cta.label} &rarr;</Link>}
              </div>
              <div className="ch-in"><MediaVisual kind={c.visual} image={c.image} /></div>
            </div>
          </article>
        );
      })}
      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {chapters.map((c, i) => <span key={c.id} className={cn("block w-1.5 rounded-full transition-all", i === idx ? "h-8 bg-brand" : "h-3 bg-slate-400/50")} />)}
      </div>
    </section>
  );
}
`);

/* ===== 5. STATEMENT SCENE (words light up on scroll, like the reference) ===== */
put("src/components/home/StatementScene.tsx", `import { useRef } from "react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";

export default function StatementScene() {
  const { kicker, text, highlight } = siteContent.home.statement;
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".stmt-word", { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=1400", scrub: true, pin: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <p className="mb-8 text-xs tracking-[0.3em] text-brand">{kicker}</p>
      <p className="max-w-4xl font-heading text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
        {text.split(" ").map((w, i) => (
          <span key={i} className={"stmt-word inline-block pr-[0.25em] " + ((highlight as readonly string[]).includes(w) ? "text-brand" : "")}>{w}</span>
        ))}
      </p>
    </section>
  );
}
`);

/* ===== 6. HERO tweaks ===== */
patch("src/components/home/Hero.tsx", [
  [`import { Play, Zap, Camera as CamIcon } from "lucide-react";`, `import { ArrowDown, Zap, Camera as CamIcon } from "lucide-react";`],
  [`<Button variant="ghost" className="px-2">`, `<Button href={hero.secondaryCta.href} variant="ghost" className="px-2">`],
  [`<Play size={14} fill="currentColor" />`, `<ArrowDown size={14} />`],
]);

/* ===== 7. PAGES ===== */
put("src/pages/Home.tsx", `import { siteContent } from "@/content/siteContent";
import Hero from "@/components/home/Hero";
import StatementScene from "@/components/home/StatementScene";
import StackedChapters from "@/components/ui/StackedChapters";
import Pillars from "@/components/home/Pillars";
import CTAPortal from "@/components/home/CTAPortal";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatementScene />
      <StackedChapters chapters={siteContent.home.chapters} />
      <Pillars />
      <CTAPortal />
    </main>
  );
}
`);

put("src/pages/Services.tsx", `import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import StackedChapters from "@/components/ui/StackedChapters";
import PackagesSection from "@/components/services/PackagesSection";
import OneOffServices from "@/components/services/OneOffServices";
import TechStackGrid from "@/components/services/TechStackGrid";
import ArchitectureBlueprint from "@/components/services/ArchitectureBlueprint";

export default function Services() {
  const { hero, chapters } = siteContent.servicesPage;
  return (
    <main>
      <section className="bg-navy pt-36 pb-20">
        <Container>
          <p className="text-xs tracking-[0.2em] text-brand">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold sm:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-slate-300">{hero.sub}</p>
        </Container>
      </section>
      <StackedChapters chapters={chapters} />
      <PackagesSection />
      <OneOffServices />
      <TechStackGrid />
      <ArchitectureBlueprint />
    </main>
  );
}
`);

console.log("Phase 5 complete: cinematic Home and Services.");
