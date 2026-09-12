import type { ComponentPropsWithoutRef, ReactNode } from "react";

// whitespace-normal below sm: on narrow phones, a long CTA label (e.g.
// "Yes! Let's rebuild my systems") forced onto one nowrap line can push
// the button past the viewport edge and cause page-wide horizontal
// scroll. Wrapping to two lines there is safer than that. Desktop/tablet
// keep the single-line look.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center text-sm font-medium uppercase tracking-wide transition-colors duration-200 whitespace-normal sm:whitespace-nowrap";

const variants = {
  primary: "bg-black text-white hover:bg-[#1d1f2c]",
  "primary-invert": "bg-white text-black hover:bg-white/90",
  outline: "border border-black text-black hover:bg-black hover:text-white",
  "outline-invert":
    "border border-white/40 text-white hover:border-white hover:bg-white hover:text-black",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant, className?: string) {
  return [base, variants[variant], className].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}
