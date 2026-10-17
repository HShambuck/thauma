import { useRef } from "react";
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
          .fromTo(".beam", { x: -200 }, { x: () => (root.current?.offsetWidth ?? 1400) + 200, duration: 1.6, ease: "none" }, 0.6)
          .to(".node-glow", { opacity: 1, duration: 0.4, stagger: 0.05 }, 1.6)
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
      <div className="beam pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-40 bg-gradient-to-r from-transparent via-brand/70 to-transparent will-change-transform md:block" />
      <Container className="relative">
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-5xl">{friction.title}</h2>
        <p className="mt-3 text-slate-400">{friction.sub}</p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {friction.cards.map((t) => (
            <div key={t} className="chaos-card relative rounded-xl border border-white/15 bg-white/5 px-5 py-6 text-sm font-medium will-change-transform sm:text-base"><span className="node-glow pointer-events-none absolute inset-0 rounded-xl border border-brand bg-brand/10 opacity-0" />{t}</div>
          ))}
        </div>
        <p className="friction-after mt-10 font-heading text-xl font-semibold text-brand md:opacity-0">{friction.after}</p>
      </Container>
    </section>
  );
}
