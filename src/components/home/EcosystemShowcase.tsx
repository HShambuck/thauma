import { useRef, useState } from "react";
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
