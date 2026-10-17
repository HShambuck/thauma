import { Clapperboard, Code2, Bot, Check } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useReveal } from "@/animations/useReveal";
import Container from "@/components/ui/Container";
import Wave from "@/components/ui/Wave";

const icons = { clapper: Clapperboard, code: Code2, bot: Bot } as const;

export default function CoreServices() {
  const ref = useReveal<HTMLElement>(".svc-card");
  return (
    <section ref={ref} className="relative bg-white pt-28 pb-20">
      <Wave className="text-navy" />
      <Container className="grid gap-6 lg:grid-cols-3">
        {siteContent.servicesPage.services.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <div key={s.id} className="svc-card flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <Icon className="text-brand" size={32} />
              <h2 className="mt-4 font-heading text-xl font-bold text-navy">{s.title}</h2>
              <p className="mt-3 text-sm text-slate-body">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-navy"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{p}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
