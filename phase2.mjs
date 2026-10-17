// Run from the project ROOT after scaffold.mjs:  node phase2.mjs
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const put = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

/* ---- 1. Patch content store (adds keys before "footer") ---- */
const cp = "src/content/siteContent.ts";
let c = readFileSync(cp, "utf8");
if (!c.includes("friction:")) {
  c = c.replace("  footer: {", `  friction: {
    title: "Running a business manually is chaos.",
    sub: "Scroll to watch Thauma turn the mess into a system.",
    after: "Structured. Automated. Scaling.",
    cards: [
      "Lost DM leads", "Manual inventory tracking", "Unpolished phone videos",
      "Missed payments", "Slow customer replies", "Scattered spreadsheets",
    ],
  },

  pillars: {
    title: "Two pillars. One growth engine.",
    left: {
      title: "Media & Visual Identity",
      items: ["High-definition video reels", "Studio product photography", "Brand storytelling"],
    },
    right: {
      title: "AI & Cloud Infrastructure",
      items: ["Serverless web apps", "Autonomous AI agents", "Automated order tracking", "Custom analytics", "MoMo & card gateways"],
    },
  },

  ecosystem: {
    title: "See the whole engine in motion.",
    sub: "From first impression to automated fulfilment.",
    phases: [
      { id: "brand", label: "Branding", title: "Raw footage becomes a studio-graded reel", lines: ["Raw clip imported", "Colour graded and sound mixed", "Reel published to Instagram and TikTok"] },
      { id: "commerce", label: "Commerce", title: "Customers pay in seconds with MoMo", lines: ["Order placed on your web app", "MoMo prompt sent to customer", "Payment confirmed: GHS 450.00"] },
      { id: "ai", label: "AI & Automation", title: "Your AI agent handles the follow-up", lines: ["Payment webhook received", "WhatsApp delivery alert sent", "CRM and analytics updated"] },
    ],
  },

  cta: {
    title: "Ready to scale your business?",
    sub: "Tell us where you are. We will show you where the tech and media can take you.",
    fields: { name: "Your name", contact: "Phone or email", message: "What are you trying to grow?" },
    submit: "Send My Details",
    sending: "Sending...",
    success: "Thank you! We will reach out shortly.",
    error: "Something went wrong. Please try again.",
    bookLabel: "Book a 15-Min Strategy Call",
  },

  footer: {`);
  writeFileSync(cp, c);
}

/* ---- 2. Friction (pinned chaos -> order) ---- */
put("src/components/home/FrictionSection.tsx", `import { useRef } from "react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";

const chaos = [
  { x: -220, y: -110, r: -14 }, { x: 160, y: 90, r: 10 }, { x: -80, y: 150, r: -7 },
  { x: 240, y: -140, r: 15 }, { x: -170, y: 110, r: 8 }, { x: 110, y: -80, r: -11 },
];

export default function FrictionSection() {
  const { friction } = siteContent;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1600", scrub: 1, pin: true },
        });
        tl.fromTo(".chaos-card",
          { x: (i) => chaos[i % chaos.length].x, y: (i) => chaos[i % chaos.length].y, rotation: (i) => chaos[i % chaos.length].r },
          { x: 0, y: 0, rotation: 0, stagger: 0.06, duration: 1, ease: "power2.inOut" }, 1)
          .fromTo(".beam", { left: "-25%" }, { left: "120%", duration: 1.6, ease: "none" }, 0.6)
          .to(".chaos-card", { borderColor: "#FF5A1F", backgroundColor: "rgba(255,90,31,0.08)", duration: 0.4, stagger: 0.05 }, 1.6)
          .fromTo(".friction-after", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 2.2);
      });
      mm.add("(max-width: 767px)", () => {
        gsap.from(".chaos-card", { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 70%" } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-screen items-center overflow-hidden bg-navy py-20">
      <div className="beam pointer-events-none absolute inset-y-0 z-10 w-40 bg-gradient-to-r from-transparent via-brand/70 to-transparent blur-md" style={{ left: "-25%" }} />
      <Container className="relative">
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-5xl">{friction.title}</h2>
        <p className="mt-3 text-slate-400">{friction.sub}</p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {friction.cards.map((t) => (
            <div key={t} className="chaos-card rounded-xl border border-white/15 bg-white/5 px-5 py-6 text-sm font-medium backdrop-blur sm:text-base">{t}</div>
          ))}
        </div>
        <p className="friction-after mt-10 font-heading text-xl font-semibold text-brand md:opacity-0">{friction.after}</p>
      </Container>
    </section>
  );
}
`);

/* ---- 3. Pillars (navy -> white morph, split slide-in) ---- */
put("src/components/home/Pillars.tsx", `import { useRef } from "react";
import { Clapperboard, Cloud, Check } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";

export default function Pillars() {
  const { pillars } = siteContent;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: root.current, start: "top 85%", end: "top 25%", scrub: true };
      gsap.fromTo(root.current, { backgroundColor: "#0F172A" }, { backgroundColor: "#FFFFFF", ease: "none", scrollTrigger: st });
      gsap.fromTo(".pillar-title", { color: "#FFFFFF" }, { color: "#0F172A", ease: "none", scrollTrigger: st });
      const reveal = { trigger: root.current, start: "top 55%" };
      gsap.from(".pillar-left", { x: -120, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: reveal });
      gsap.from(".pillar-right", { x: 120, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: reveal });
    },
    { scope: root }
  );

  const card = "rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-transform hover:-translate-y-1";
  const list = (items: readonly string[]) => (
    <ul className="mt-5 space-y-3">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 text-slate-body"><Check size={18} className="mt-0.5 shrink-0 text-brand" />{i}</li>
      ))}
    </ul>
  );

  return (
    <section ref={root} className="bg-navy py-24">
      <Container>
        <h2 className="pillar-title mb-14 max-w-2xl font-heading text-3xl font-bold sm:text-5xl">{pillars.title}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={card + " pillar-left"}>
            <Clapperboard className="text-brand" size={32} />
            <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">{pillars.left.title}</h3>
            {list(pillars.left.items)}
          </div>
          <div className={card + " pillar-right"}>
            <Cloud className="text-brand" size={32} />
            <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">{pillars.right.title}</h3>
            {list(pillars.right.items)}
          </div>
        </div>
      </Container>
    </section>
  );
}
`);

/* ---- 4. Ecosystem (3-phase device: scroll on desktop, tabs everywhere) ---- */
put("src/components/home/EcosystemShowcase.tsx", `import { useRef, useState } from "react";
import { Film, CreditCard, Bot } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const icons = [Film, CreditCard, Bot];

export default function EcosystemShowcase() {
  const { ecosystem } = siteContent;
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = ecosystem.phases.length;

  // Desktop: pin and let scroll drive the phase
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current, start: "top top", end: "+=1800", pin: true,
            onUpdate: (self) => setActive(Math.min(total - 1, Math.floor(self.progress * total))),
          },
        });
      });
    },
    { scope: root }
  );

  // Animate lines whenever the phase changes
  useGSAP(
    () => {
      gsap.fromTo(".phase-line", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 });
      gsap.fromTo(".phase-bar", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.out", transformOrigin: "left" });
    },
    { scope: root, dependencies: [active] }
  );

  const phase = ecosystem.phases[active];

  return (
    <section ref={root} className="flex min-h-screen items-center bg-white py-20">
      <Container>
        <h2 className="font-heading text-3xl font-bold text-navy sm:text-5xl">{ecosystem.title}</h2>
        <p className="mt-3 text-slate-body">{ecosystem.sub}</p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            {ecosystem.phases.map((p, i) => {
              const Icon = icons[i];
              return (
                <button key={p.id} onClick={() => setActive(i)}
                  className={cn("flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                    i === active ? "border-brand bg-brand/5" : "border-slate-200 hover:border-slate-300")}>
                  <Icon className={i === active ? "text-brand" : "text-slate-mute"} />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-mute">0{i + 1} {p.label}</span>
                    <span className="block font-heading font-semibold text-navy">{p.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-lg rounded-[2rem] border-8 border-navy bg-navy p-6 shadow-2xl">
            <div className="mb-5 flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand" /><span className="h-2.5 w-2.5 rounded-full bg-white/30" /><span className="h-2.5 w-2.5 rounded-full bg-white/30" /></div>
            <p className="mb-4 font-heading text-lg font-semibold text-white">{phase.title}</p>
            <div className="space-y-3">
              {phase.lines.map((l) => (
                <div key={l} className="phase-line rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-emerald-300/90 sm:text-sm">&gt; {l}</div>
              ))}
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="phase-bar h-full w-full rounded-full bg-brand" /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
`);

/* ---- 5. CTA Portal (expanding card + lead form) ---- */
put("src/components/home/CTAPortal.tsx", `import { useRef, useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import { apiPost } from "@/lib/api/client";
import { env } from "@/lib/env";
import Container from "@/components/ui/Container";

type Status = "idle" | "loading" | "success" | "error";

export default function CTAPortal() {
  const { cta } = siteContent;
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      gsap.fromTo(".cta-card", { scale: 0.85, borderRadius: 64 }, {
        scale: 1, borderRadius: 24, ease: "none",
        scrollTrigger: { trigger: ".cta-card", start: "top 95%", end: "top 40%", scrub: true },
      });
    },
    { scope: root }
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    try {
      await apiPost("/lead", Object.fromEntries(new FormData(form)));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-brand";

  return (
    <section ref={root} className="bg-navy py-24">
      <Container>
        <div className="cta-card grid gap-10 border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">{cta.title}</h2>
            <p className="mt-4 text-slate-300">{cta.sub}</p>
            <a href={env.calLink} target="_blank" rel="noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold hover:bg-[#ff7240]">
              <CalendarCheck size={18} />{cta.bookLabel}
            </a>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" required placeholder={cta.fields.name} className={input} />
            <input name="contact" required placeholder={cta.fields.contact} className={input} />
            <textarea name="message" rows={4} placeholder={cta.fields.message} className={input} />
            <button type="submit" disabled={status === "loading"}
              className="w-full cursor-pointer rounded-xl bg-brand py-3 text-sm font-semibold hover:bg-[#ff7240] disabled:cursor-not-allowed disabled:opacity-60">
              {status === "loading" ? cta.sending : cta.submit}
            </button>
            {status === "success" && <p className="text-sm text-emerald-400">{cta.success}</p>}
            {status === "error" && <p className="text-sm text-red-400">{cta.error}</p>}
          </form>
        </div>
      </Container>
    </section>
  );
}
`);

/* ---- 6. Wire into Home ---- */
put("src/pages/Home.tsx", `import Hero from "@/components/home/Hero";
import ServiceStrip from "@/components/home/ServiceStrip";
import FrictionSection from "@/components/home/FrictionSection";
import Pillars from "@/components/home/Pillars";
import EcosystemShowcase from "@/components/home/EcosystemShowcase";
import CTAPortal from "@/components/home/CTAPortal";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceStrip />
      <FrictionSection />
      <Pillars />
      <EcosystemShowcase />
      {/* Later: ImpactMetrics, TrustedBy */}
      <CTAPortal />
    </main>
  );
}
`);

console.log("Phase 2 complete. Home page now has Friction, Pillars, Ecosystem and CTA.");
