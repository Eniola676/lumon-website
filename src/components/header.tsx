"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CalendlyButton } from "@/components/ui/calendly-button";

const NAV_LINKS = [
  { href: "/launch", label: "Launch" },
  { href: "/scale", label: "Scale" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-[#0d0d0d] py-2.5 pr-2.5 pl-5 shadow-lg shadow-black/10 sm:py-3 sm:pr-3 sm:pl-8">
          {/* Mobile: hamburger left */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="-ml-2 p-2 text-white lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[0.875rem] font-bold tracking-[0.02em] text-white uppercase lg:mr-6"
          >
            Lumon Studios
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-white ${
                  pathname === link.href ? "text-white" : "text-white/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <CalendlyButton variant="primary-invert" className="px-5 py-2.5 text-xs sm:px-6 sm:py-3">
            Book a Call
          </CalendlyButton>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
          <div className="flex h-20 items-center justify-between px-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-[0.875rem] font-bold tracking-[0.02em] text-black uppercase"
            >
              Lumon Studios
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#e9e9ea] py-4 text-3xl font-normal tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-10">
            <CalendlyButton
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Book a Call
            </CalendlyButton>
          </div>
        </div>
      )}
    </>
  );
}
