import { useRef } from "react";
import { gsap, useGSAP } from "./registerGsap";

// Staggered fade-up for any section. Usage: const ref = useReveal<HTMLElement>(".item");
export function useReveal<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null);
  useGSAP(() => {
    gsap.from(selector, { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" } });
  }, { scope: ref });
  return ref;
}
