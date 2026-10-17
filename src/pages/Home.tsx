import Hero from "@/components/home/Hero";
import ServiceStrip from "@/components/home/ServiceStrip";
import FrictionSection from "@/components/home/FrictionSection";
import Pillars from "@/components/home/Pillars";
import EcosystemShowcase from "@/components/home/EcosystemShowcase";
import CTAPortal from "@/components/home/CTAPortal";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceStrip />
      <FrictionSection />
      <Pillars />
      <EcosystemShowcase />
      {/* Later: ImpactMetrics, TrustedBy */}
      <CTAPortal />
    </main>
  );
}
