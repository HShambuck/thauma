import { useRef, useState } from "react";
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
