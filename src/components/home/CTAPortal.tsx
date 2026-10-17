import { useRef, useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { gsap, useGSAP } from "@/animations/registerGsap";
import { apiPost } from "@/lib/api/client";
import { env } from "@/lib/env";
import Container from "@/components/ui/Container";
import Wave from "@/components/ui/Wave";

type Status = "idle" | "loading" | "success" | "error";

export default function CTAPortal() {
  const { cta } = siteContent;
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      gsap.fromTo(".cta-card", { scale: 0.85, borderRadius: 64 }, {
        scale: 1, borderRadius: 24, ease: "none",
        scrollTrigger: { trigger: ".cta-card", start: "top 95%", end: "top 40%", scrub: true },
      });
    },
    { scope: root }
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    try {
      await apiPost("/lead", Object.fromEntries(new FormData(form)));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-brand";

  return (
    <section ref={root} className="relative bg-navy pt-32 pb-24"><Wave className="text-white" />
      <Container>
        <div className="cta-card grid gap-10 border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">{cta.title}</h2>
            <p className="mt-4 text-slate-300">{cta.sub}</p>
            <a href={env.calLink} target="_blank" rel="noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold hover:bg-[#ff7240]">
              <CalendarCheck size={18} />{cta.bookLabel}
            </a>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" required placeholder={cta.fields.name} className={input} />
            <input name="contact" required placeholder={cta.fields.contact} className={input} />
            <textarea name="message" rows={4} placeholder={cta.fields.message} className={input} />
            <button type="submit" disabled={status === "loading"}
              className="w-full cursor-pointer rounded-xl bg-brand py-3 text-sm font-semibold hover:bg-[#ff7240] disabled:cursor-not-allowed disabled:opacity-60">
              {status === "loading" ? cta.sending : cta.submit}
            </button>
            {status === "success" && <p className="text-sm text-emerald-400">{cta.success}</p>}
            {status === "error" && <p className="text-sm text-red-400">{cta.error}</p>}
          </form>
        </div>
      </Container>
    </section>
  );
}
