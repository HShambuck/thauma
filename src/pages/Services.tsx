import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import StackedChapters from "@/components/ui/StackedChapters";
import PackagesSection from "@/components/services/PackagesSection";
import OneOffServices from "@/components/services/OneOffServices";
import TechStackGrid from "@/components/services/TechStackGrid";
import ArchitectureBlueprint from "@/components/services/ArchitectureBlueprint";

export default function Services() {
  const { hero, chapters } = siteContent.servicesPage;
  return (
    <main>
      <section className="bg-navy pt-36 pb-20">
        <Container>
          <p className="text-xs tracking-[0.2em] text-brand">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold sm:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-slate-300">{hero.sub}</p>
        </Container>
      </section>
      <StackedChapters chapters={chapters} />
      <PackagesSection />
      <OneOffServices />
      <TechStackGrid />
      <ArchitectureBlueprint />
    </main>
  );
}
