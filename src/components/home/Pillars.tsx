import { useRef } from "react";
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
