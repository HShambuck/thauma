import { siteContent } from "@/content/siteContent";
import Hero from "@/components/home/Hero";
import StatementScene from "@/components/home/StatementScene";
import StackedChapters from "@/components/ui/StackedChapters";
import Pillars from "@/components/home/Pillars";
import CTAPortal from "@/components/home/CTAPortal";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatementScene />
      <StackedChapters chapters={siteContent.home.chapters} />
      <Pillars />
      <CTAPortal />
    </main>
  );
}
