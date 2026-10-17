import { useRef } from "react";
import { Link } from "react-router-dom";
import { Code2, Camera, Cloud, Lightbulb } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import Container from "@/components/ui/Container";
import Wave from "@/components/ui/Wave";

const icons = { code: Code2, camera: Camera, cloud: Cloud, bulb: Lightbulb } as const;

export default function ServiceStrip() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(".strip-card", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-white pt-24 pb-14"><Wave className="text-navy" />
      <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {siteContent.serviceStrip.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <div key={s.title} className="strip-card rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl">
              <Icon className="mb-4 text-navy" size={28} />
              <h3 className="font-heading text-base font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-body">{s.desc}</p>
              <Link to={s.href} className="mt-4 inline-block text-xs font-semibold text-brand">Learn More &rarr;</Link>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
