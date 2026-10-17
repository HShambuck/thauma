import { Check, Sparkles } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useReveal } from "@/animations/useReveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Wave from "@/components/ui/Wave";
import { cn } from "@/lib/utils";

export default function PackagesSection() {
  const { packages, cta } = siteContent.servicesPage;
  const ref = useReveal<HTMLElement>(".pkg-card");
  return (
    <section ref={ref} className="relative bg-navy pt-32 pb-24">
      <Wave className="text-white" />
      <Container>
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-5xl">{packages.title}</h2>
        <p className="mt-4 max-w-xl text-slate-300">{packages.sub}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.items.map((p) => (
            <div key={p.id} className={cn("pkg-card flex flex-col rounded-3xl border bg-white/5 p-7", "featured" in p && p.featured ? "border-brand" : "border-white/10")}>
              <span className="w-fit rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">{p.tag}</span>
              <h3 className="mt-4 font-heading text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{i}</li>
                ))}
              </ul>
              {"conditional" in p && (
                <div className="mt-5 rounded-2xl border border-dashed border-white/20 p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand"><Sparkles size={14} />{p.conditionalLabel}</p>
                  <ul className="space-y-1.5">
                    {p.conditional.map((i) => <li key={i} className="text-sm text-slate-300">{i}</li>)}
                  </ul>
                </div>
              )}
              <div className="mt-auto pt-6"><Button href={cta.href} variant="outline" className="w-full">{cta.label}</Button></div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-400">{packages.note}</p>
      </Container>
    </section>
  );
}
