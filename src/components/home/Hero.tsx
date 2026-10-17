import { useRef } from "react";
import { ArrowDown, Zap, Camera as CamIcon } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/animations/registerGsap";
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
        const floats = gsap.to(".float-card", { y: "+=12", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
        ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", onToggle: (s) => (s.isActive ? floats.play() : floats.pause()) });

        // mouse parallax (desktop pointer only)
        if (window.matchMedia("(pointer: fine)").matches) {
          const qx = gsap.quickTo(".parallax", "x", { duration: 0.8, ease: "power2.out" });
          const qy = gsap.quickTo(".parallax", "y", { duration: 0.8, ease: "power2.out" });
          const move = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            qx(x * 30); qy(y * 20);
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        }
      });
    },
    { scope: root }
  );

  const glass = "float-card glass rounded-2xl p-4 will-change-transform";

  return (
    <section ref={root} className="relative overflow-hidden bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.28),transparent_70%)]" />
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
            <Button href={hero.secondaryCta.href} variant="ghost" className="px-2">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30"><ArrowDown size={14} /></span>
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
