import { Code2, Camera, PenTool, Music } from "lucide-react";
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
