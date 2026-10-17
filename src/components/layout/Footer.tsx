import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";

export default function Footer() {
  const { footer } = siteContent;
  return (
    <footer className="border-t border-white/10 bg-navy py-10">
      <Container className="flex flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>{footer.blurb}</p>
        <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
      </Container>
    </footer>
  );
}
