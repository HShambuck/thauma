import { cn } from "@/lib/utils";

export default function Wave({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 -top-px block h-10 w-full fill-current sm:h-16", className)}>
      <path d="M0,0H1440V50C1320,95 1200,95 1080,50C960,5 840,5 720,50C600,95 480,95 360,50C240,5 120,5 0,50Z" />
    </svg>
  );
}
