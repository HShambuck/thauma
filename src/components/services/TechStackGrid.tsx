import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";

export default function TechStackGrid() {
  const { techStack } = siteContent.servicesPage;
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <h2 className="font-heading text-2xl font-bold text-navy sm:text-4xl">{techStack.title}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.groups.map((g) => (
            <div key={g.group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-navy">{chip}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
