import { useRef } from "react";
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
