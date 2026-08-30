import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { AiSummaryLinks } from "@/components/ui/ai-summary-links";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import { LinkedinIcon, InstagramIcon, XIcon } from "@/components/ui/social-icons";

const PROGRAMS = [
  { href: "/launch", label: "Lumon Launch" },
  { href: "/scale", label: "Lumon Scale" },
  { href: "/enterprise", label: "Lumon Enterprise" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const TOOLS_LIVE = [
  { href: "/tools/online-course-price-calculator", label: "Course Pricing Calculator" },
];

// Not built yet — shown as a preview of what's coming, not linked anywhere.
const TOOLS_SOON = ["ROI Calculator", "Launch Readiness Quiz"];

export function Footer() {
  return (
    <KineticGrid as="footer" className="border-t border-[#1f1f1f] text-white">
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-base font-bold tracking-[0.02em] text-white uppercase"
            >
              Lumon Studios
            </Link>
            <p className="mt-4 max-w-[26ch] text-sm text-white/50">
              Course systems for coaches who mean business.
            </p>
            <a
              href="mailto:tobi@lumonstudiomail.com"
              className="mt-4 block text-sm text-white/60 transition-colors hover:text-white"
            >
              tobi@lumonstudiomail.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Programs</h3>
            <ul className="mt-4 space-y-3">
              {PROGRAMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Tools</h3>
            <ul className="mt-4 space-y-3">
              {TOOLS_LIVE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {TOOLS_SOON.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-white/40"
                >
                  {label}
                  <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[0.625rem] tracking-wide text-white/40 uppercase">
                    Soon
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <CalendlyButton
              variant="outline-invert"
              className="mt-5 px-5 py-2.5 text-xs"
            >
              Book a Call
            </CalendlyButton>
          </div>
        </div>
      </Container>

      <Container className="relative z-10 border-t border-[#1f1f1f] py-6">
        <AiSummaryLinks />
      </Container>

      <div
        className="relative z-10 flex justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <p className="-mb-[1vw] text-[9vw] leading-none font-bold whitespace-nowrap tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]">
          LUMON STUDIOS
        </p>
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#1f1f1f] py-6 text-xs text-white/50 sm:flex-row">
        <p>© 2026 Lumon Studios. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/lumon-studio/"
            aria-label="LinkedIn"
            className="transition-colors hover:text-white"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="https://www.instagram.com/lumonweb"
            aria-label="Instagram"
            className="transition-colors hover:text-white"
          >
            <InstagramIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/lumon-studio/"
            aria-label="Twitter / X"
            className="transition-colors hover:text-white"
          >
            <XIcon className="size-4" />
          </a>
        </div>
      </Container>
    </KineticGrid>
  );
}
