import { Aperture, Film, Smartphone, Bot, MessageCircle, CalendarClock, BarChart3, Camera, Share2, PenTool, Music, Code2, Check } from "lucide-react";

const card = "absolute rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-xs text-white shadow-xl";
const shell = "rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-navy shadow-2xl";

function Browser({ small }: { small?: boolean }) {
  return (
    <div className={shell + " w-full overflow-hidden"}>
      <div className="flex gap-1.5 border-b border-white/10 p-3">
        <i className="h-2.5 w-2.5 rounded-full bg-brand" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        <div className={"col-span-3 rounded-lg bg-gradient-to-r from-brand/50 to-transparent " + (small ? "h-14" : "h-20")} />
        {[0, 1, 2].map((i) => <div key={i} className={"rounded-lg bg-white/10 " + (small ? "h-10" : "h-16")} />)}
      </div>
    </div>
  );
}

export default function MediaVisual({ kind, image }: { kind: string; image?: string }) {
  if (image) return <img src={image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />;

  if (kind === "media")
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
        <div className={shell + " absolute inset-0 grid place-items-center"}><Aperture className="text-brand" size={120} strokeWidth={1.2} /></div>
        <div className={card + " -left-3 top-6"}><p className="flex items-center gap-2 font-semibold"><Film size={14} className="text-brand" />Brand reel</p><p className="text-slate-400">12.4K views</p></div>
        <div className={card + " -right-3 bottom-16"}><p className="font-semibold">Post scheduled</p><p className="text-slate-400">Today, 6:00 PM</p></div>
        <div className="absolute bottom-5 left-6 flex gap-2"><i className="h-6 w-6 rounded-full bg-brand" /><i className="h-6 w-6 rounded-full bg-white" /><i className="h-6 w-6 rounded-full bg-slate-500" /></div>
      </div>
    );

  if (kind === "web")
    return (
      <div className="relative mx-auto w-full max-w-lg pb-8">
        <Browser />
        <div className="absolute -bottom-0 -right-2 w-44 rounded-2xl border border-white/10 bg-navy p-3 text-white shadow-2xl">
          <p className="flex items-center gap-2 text-xs text-slate-400"><Smartphone size={14} />Pay with MoMo</p>
          <p className="mt-1 font-heading text-xl font-bold">GHS 450.00</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400"><Check size={12} />Payment confirmed</p>
        </div>
      </div>
    );

  if (kind === "ops") {
    const rows = [[MessageCircle, "New DM from a customer", "Lead qualified"], [CalendarClock, "Content queue", "Posts scheduled"], [BarChart3, "Weekly analytics", "Report ready"]] as const;
    return (
      <div className={shell + " mx-auto w-full max-w-lg space-y-3 p-5 text-white"}>
        <p className="flex items-center gap-2 text-sm font-semibold"><Bot className="text-brand" size={18} />Thauma agent <span className="ml-auto text-xs text-emerald-400">running</span></p>
        {rows.map(([Icon, a, b]) => (
          <div key={a} className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><Icon size={18} className="text-brand" /><span className="text-sm">{a}</span><span className="ml-auto text-xs text-slate-400">{b}</span></div>
        ))}
      </div>
    );
  }

  if (kind === "packages")
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1"><Browser small /></div>
          <div className="h-px w-6 border-t border-dashed border-brand" />
          <div className="flex flex-col gap-3">
            {[Camera, Share2, MessageCircle].map((I, i) => <span key={i} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-800 text-brand shadow-xl"><I size={20} /></span>)}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Website", "Socials", "MoMo", "Order tracking", "AI (if needed)"].map((t) => <span key={t} className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{t}</span>)}
        </div>
      </div>
    );

  const tiles = [[Camera, "Event coverage"], [PenTool, "Graphic design"], [Music, "Video & sound"], [Code2, "Custom systems"]] as const;
  return (
    <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
      {tiles.map(([Icon, t]) => (
        <div key={t} className={shell + " flex aspect-square flex-col items-center justify-center gap-3 text-white"}><Icon className="text-brand" size={34} /><span className="text-sm font-semibold">{t}</span></div>
      ))}
    </div>
  );
}
