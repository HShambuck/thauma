import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { nav, navCta, brand } = siteContent;
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled || open ? "border-b border-white/10 bg-navy/80 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-wide">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">T</span>
          {brand.short.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => {
            const active = n.href === pathname;
            return (
              <Link key={n.label} to={n.href} className={cn("relative py-2 text-sm transition-colors hover:text-brand", active ? "text-brand" : "text-white/90")}>
                {n.label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block"><Button href={navCta.href} className="py-2.5">{navCta.label} &rarr;</Button></div>

        <button className="cursor-pointer lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 px-5 pb-6 lg:hidden">
          {nav.map((n) => (
            <Link key={n.label} to={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg hover:bg-white/5 hover:text-brand">{n.label}</Link>
          ))}
          <Button href={navCta.href} className="mt-3">{navCta.label}</Button>
        </div>
      )}
    </header>
  );
}
