// Run from the project ROOT after phase3.mjs:  node phase4.mjs
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
const WAVE_IMPORT = [`import Container from "@/components/ui/Container";`, `import Container from "@/components/ui/Container";\nimport Wave from "@/components/ui/Wave";`];

/* ============ 1. WAVE DIVIDER ============ */
// Placed at the TOP of a section, painted in the PREVIOUS section's colour (text-navy / text-white ...).
put("src/components/ui/Wave.tsx", `import { cn } from "@/lib/utils";

export default function Wave({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 -top-px block h-10 w-full fill-current sm:h-16", className)}>
      <path d="M0,0H1440V50C1320,95 1200,95 1080,50C960,5 840,5 720,50C600,95 480,95 360,50C240,5 120,5 0,50Z" />
    </svg>
  );
}
`);

/* ---- Home ---- */
patch("src/components/home/ServiceStrip.tsx", [WAVE_IMPORT,
  [`<section ref={root} className="bg-white py-14">`, `<section ref={root} className="relative bg-white pt-24 pb-14"><Wave className="text-navy" />`]]);
patch("src/components/home/FrictionSection.tsx", [WAVE_IMPORT,
  [`overflow-hidden bg-navy py-20">`, `overflow-hidden bg-navy pt-32 pb-20"><Wave className="text-white" />`]]);
patch("src/components/home/Pillars.tsx", [WAVE_IMPORT,
  [`relative bg-navy py-24">`, `relative bg-navy pt-32 pb-24">`],
  [`<div className="bg-white-layer absolute inset-0 bg-white opacity-0" />`, `<div className="bg-white-layer absolute inset-0 bg-white opacity-0" /><Wave className="text-navy" />`]]);
patch("src/components/home/CTAPortal.tsx", [WAVE_IMPORT,
  [`<section ref={root} className="bg-navy py-24">`, `<section ref={root} className="relative bg-navy pt-32 pb-24"><Wave className="text-white" />`]]);
patch("src/components/services/ArchitectureBlueprint.tsx", [WAVE_IMPORT,
  [`<section className="bg-navy py-20">`, `<section className="relative bg-navy pt-32 pb-20"><Wave className="text-slate-50" />`]]);

/* ============ 2. SERVICES CONTENT ============ */
const cp = "src/content/siteContent.ts";
let c = readFileSync(cp, "utf8");
if (!c.includes("packages:")) {
  const block = `    hero: {
      eyebrow: "WHAT WE DO",
      title: "Credibility that gets you seen. Technology that gets you sales.",
      sub: "We manage your branding and socials, and we build custom tech solutions. Use one, or combine both.",
    },
    cta: { label: "Discuss your project", href: "/work#contact" },
    services: [
      { id: "media", icon: "clapper", title: "Creative Media & Branding",
        desc: "High-production video content, professional photography, and visual brand identity that establish immediate market authority.",
        points: ["Video production", "Professional photography", "Visual brand identity", "Social media management"] },
      { id: "web", icon: "code", title: "Custom Web & Application Development",
        desc: "High-performance, SEO-optimized web applications with integrated payment gateways (Mobile Money and Cards), automated order tracking, and custom features tailored to your operations.",
        points: ["SEO-optimised web apps", "Mobile Money and card payments", "Automated order tracking", "Custom features for your business"] },
      { id: "ops", icon: "bot", title: "Automated Account Operations",
        desc: "Internal AI-driven workflows that streamline content scheduling, lead triaging, and social media analytics, ensuring consistent audience engagement with minimal manual friction.",
        points: ["Content scheduling", "Lead triaging", "Social media analytics", "AI agents for routine tasks"] },
    ],
    packages: {
      title: "Packages that combine media and tech",
      sub: "Brands grow fastest when creative and technology work together. Every package is tailored to your business.",
      note: "We only recommend advanced features when they will genuinely streamline your processes.",
      items: [
        { id: "brand", name: "Brand & Socials", tag: "Media-led",
          desc: "We manage your branding and social presence so your business looks credible and gets seen.",
          includes: ["Visual brand identity", "Professional photo and video content", "Social media management", "Content scheduling and analytics"] },
        { id: "web", name: "Professional Website", tag: "Media + Web",
          desc: "A professional website built around your brand and linked to your socials.",
          includes: ["Custom, SEO-optimised website", "Linked to your social channels", "Brand-consistent design", "Fast, mobile-first build"] },
        { id: "eco", name: "Full Growth Ecosystem", tag: "Media + Web App + Automation", featured: true,
          desc: "A custom web application backed by your branding and socials, built around how your business actually runs.",
          includes: ["Everything in Professional Website", "Custom web app for your operations"],
          conditionalLabel: "Added only if your business needs it",
          conditional: ["AI integration", "Mobile Money and card payments", "Order tracking", "AI agent to automate tasks"] },
      ],
    },
    oneOff: {
      title: "Need just one thing? We do standalone work too.",
      sub: "No package required. Pay for exactly what you need.",
      items: [
        { icon: "code", title: "Custom Systems", desc: "A tailor-made system or application built for your operations." },
        { icon: "camera", title: "Event Photography & Videography", desc: "Professional coverage for your event, launch or shoot." },
        { icon: "pen", title: "Graphic Design", desc: "Flyers, logos, social graphics and more as a one-time job." },
        { icon: "music", title: "Video & Sound Editing", desc: "Polished edits, colour grading and audio clean-up for your footage." },
      ],
    },
`;
  c = c.replace(/    hero: \{[\s\S]*?\n    layers: \[[\s\S]*?\n    techStack: \{/, () => block + "    techStack: {");
  writeFileSync(cp, c);
}

/* ============ 3. SERVICES COMPONENTS ============ */
put("src/animations/useReveal.ts", `import { useRef } from "react";
import { gsap, useGSAP } from "./registerGsap";

// Staggered fade-up for any section. Usage: const ref = useReveal<HTMLElement>(".item");
export function useReveal<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null);
  useGSAP(() => {
    gsap.from(selector, { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" } });
  }, { scope: ref });
  return ref;
}
`);

put("src/components/services/ServiceLayer.tsx", "export {};\n"); // replaced by CoreServices

put("src/components/services/CoreServices.tsx", `import { Clapperboard, Code2, Bot, Check } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useReveal } from "@/animations/useReveal";
import Container from "@/components/ui/Container";
import Wave from "@/components/ui/Wave";

const icons = { clapper: Clapperboard, code: Code2, bot: Bot } as const;

export default function CoreServices() {
  const ref = useReveal<HTMLElement>(".svc-card");
  return (
    <section ref={ref} className="relative bg-white pt-28 pb-20">
      <Wave className="text-navy" />
      <Container className="grid gap-6 lg:grid-cols-3">
        {siteContent.servicesPage.services.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <div key={s.id} className="svc-card flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <Icon className="text-brand" size={32} />
              <h2 className="mt-4 font-heading text-xl font-bold text-navy">{s.title}</h2>
              <p className="mt-3 text-sm text-slate-body">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-navy"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{p}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
`);

put("src/components/services/PackagesSection.tsx", `import { Check, Sparkles } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useReveal } from "@/animations/useReveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Wave from "@/components/ui/Wave";
import { cn } from "@/lib/utils";

export default function PackagesSection() {
  const { packages, cta } = siteContent.servicesPage;
  const ref = useReveal<HTMLElement>(".pkg-card");
  return (
    <section ref={ref} className="relative bg-navy pt-32 pb-24">
      <Wave className="text-white" />
      <Container>
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-5xl">{packages.title}</h2>
        <p className="mt-4 max-w-xl text-slate-300">{packages.sub}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.items.map((p) => (
            <div key={p.id} className={cn("pkg-card flex flex-col rounded-3xl border bg-white/5 p-7", "featured" in p && p.featured ? "border-brand" : "border-white/10")}>
              <span className="w-fit rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">{p.tag}</span>
              <h3 className="mt-4 font-heading text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{i}</li>
                ))}
              </ul>
              {"conditional" in p && (
                <div className="mt-5 rounded-2xl border border-dashed border-white/20 p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand"><Sparkles size={14} />{p.conditionalLabel}</p>
                  <ul className="space-y-1.5">
                    {p.conditional.map((i) => <li key={i} className="text-sm text-slate-300">{i}</li>)}
                  </ul>
                </div>
              )}
              <div className="mt-auto pt-6"><Button href={cta.href} variant="outline" className="w-full">{cta.label}</Button></div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-400">{packages.note}</p>
      </Container>
    </section>
  );
}
`);

put("src/components/services/OneOffServices.tsx", `import { Code2, Camera, PenTool, Music } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useReveal } from "@/animations/useReveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Wave from "@/components/ui/Wave";

const icons = { code: Code2, camera: Camera, pen: PenTool, music: Music } as const;

export default function OneOffServices() {
  const { oneOff, cta } = siteContent.servicesPage;
  const ref = useReveal<HTMLElement>(".oneoff-card");
  return (
    <section ref={ref} className="relative bg-white pt-32 pb-20">
      <Wave className="text-navy" />
      <Container>
        <h2 className="max-w-2xl font-heading text-3xl font-bold text-navy sm:text-5xl">{oneOff.title}</h2>
        <p className="mt-4 text-slate-body">{oneOff.sub}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {oneOff.items.map((i) => {
            const Icon = icons[i.icon as keyof typeof icons];
            return (
              <div key={i.title} className="oneoff-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="text-brand" size={26} />
                <h3 className="mt-3 font-heading font-semibold text-navy">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{i.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10"><Button href={cta.href}>{cta.label} &rarr;</Button></div>
      </Container>
    </section>
  );
}
`);

put("src/pages/Services.tsx", `import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import CoreServices from "@/components/services/CoreServices";
import PackagesSection from "@/components/services/PackagesSection";
import OneOffServices from "@/components/services/OneOffServices";
import TechStackGrid from "@/components/services/TechStackGrid";
import ArchitectureBlueprint from "@/components/services/ArchitectureBlueprint";

export default function Services() {
  const { hero } = siteContent.servicesPage;
  return (
    <main>
      <section className="bg-navy pt-36 pb-20">
        <Container>
          <p className="text-xs tracking-[0.2em] text-brand">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold sm:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-slate-300">{hero.sub}</p>
        </Container>
      </section>
      <CoreServices />
      <PackagesSection />
      <OneOffServices />
      <TechStackGrid />
      <ArchitectureBlueprint />
    </main>
  );
}
`);

console.log("Phase 4 complete: wave dividers + restructured Services page.");
