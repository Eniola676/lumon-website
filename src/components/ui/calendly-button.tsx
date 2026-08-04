"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/calendly";

export function CalendlyButton({
  variant = "primary",
  className,
  children,
  onClick,
  ...props
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
      }}
      className={buttonClasses(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
