import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const styles = {
  primary: "bg-brand text-white hover:bg-[#ff7240] shadow-lg shadow-brand/20",
  ghost: "text-white hover:text-brand",
  outline: "border border-white/20 text-white hover:border-brand hover:text-brand",
};

export default function Button({ href, variant = "primary", className, children, onClick }: Props) {
  const cls = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    styles[variant],
    className
  );
  if (href) return <Link to={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}
