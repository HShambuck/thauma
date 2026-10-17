import { useRef } from "react";
import { Bot, Cloud, Film } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Layer = (typeof siteContent.servicesPage.layers)[number];
const icons = { bot: Bot, cloud: Cloud, film: Film } as const;

export default function ServiceLayer({ layer }: { layer: Layer }) {
  const root = useRef<HTMLElement>(null);
  const dark = layer.tone === "dark";
  const Icon = icons[layer.icon as keyof typeof icons];

  useGSAP(() => {
    gsap.from(".svc-item", { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" } });
  }, { scope: root });

  return (
    <section ref={root} className={cn("py-20", dark ? "bg-navy text-white" : "bg-white text-navy")}>
      <Container>
        <Icon className="text-brand" size={34} />
        <h2 className="mt-4 max-w-3xl font-heading text-2xl font-bold sm:text-4xl">{layer.title}</h2>
        <p className={cn("mt-2", dark ? "text-slate-400" : "text-slate-body")}>{layer.blurb}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layer.items.map((i) => (
            <div key={i.title} className={cn("svc-item rounded-2xl border p-6", dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white shadow-sm")}>
              <h3 className="font-heading text-lg font-semibold">{i.title}</h3>
              <p className={cn("mt-2 text-sm", dark ? "text-slate-300" : "text-slate-body")}>{i.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
