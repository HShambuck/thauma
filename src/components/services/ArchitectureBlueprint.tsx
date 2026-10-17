import { useState } from "react";
import { siteContent } from "@/content/siteContent";
import Container from "@/components/ui/Container";
import Wave from "@/components/ui/Wave";
import { cn } from "@/lib/utils";

export default function ArchitectureBlueprint() {
  const bp = siteContent.servicesPage.blueprint;
  const [active, setActive] = useState<string | null>(null);
  const byId = Object.fromEntries(bp.nodes.map((n) => [n.id, n]));
  const connected = (id: string) =>
    bp.edges.filter((e) => e.includes(id)).map((e) => (e[0] === id ? e[1] : e[0]));
  const current = active ? byId[active] : null;
  const linked = active ? connected(active) : [];

  return (
    <section className="relative bg-navy pt-32 pb-20"><Wave className="text-slate-50" />
      <Container>
        <h2 className="font-heading text-2xl font-bold sm:text-4xl">{bp.title}</h2>
        <p className="mt-3 max-w-xl text-slate-400">{bp.sub}</p>

        <svg viewBox="0 0 800 400" className="mt-10 h-auto w-full" role="img" aria-label={bp.title}>
          {bp.edges.map(([a, b]) => {
            const on = active === a || active === b;
            return (
              <line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
                strokeWidth={2} className={cn(on ? "flow-line stroke-brand" : "stroke-white/15")} />
            );
          })}
          {bp.nodes.map((n) => {
            const hot = active === n.id || linked.includes(n.id);
            return (
              <g key={n.id} tabIndex={0} role="button" className="cursor-pointer outline-none"
                onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)} onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}>
                <circle cx={n.x} cy={n.y} r={38} className={cn("fill-slate-800 transition-colors", hot ? "stroke-brand" : "stroke-white/20")} strokeWidth={2} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-white text-[14px] font-semibold">{n.label}</text>
              </g>
            );
          })}
        </svg>

        <div className="mt-6 min-h-24 rounded-2xl border border-white/10 bg-white/5 p-6">
          {current ? (
            <>
              <h3 className="font-heading text-lg font-semibold text-brand">{current.label}</h3>
              <p className="mt-1 text-slate-300">{current.desc}</p>
              <p className="mt-3 text-xs text-slate-400">{bp.connected}: {linked.map((l) => byId[l].label).join(", ")}</p>
            </>
          ) : (
            <p className="text-slate-400">{bp.idle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
