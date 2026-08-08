import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { ContactForm } from "@/components/contact-form";
import {
  LinkedinIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Contact — Lumon Studios",
  description:
    "Book a discovery call or send a note. Lumon Studios responds within one business day.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-white">
        <Container className="pt-36 pb-20 sm:pt-44 sm:pb-28">
          <h1 className="max-w-2xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
            Let&rsquo;s <em className="italic">talk.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            The best way to figure out if Lumon Studios is right for your
            project is a conversation. Book a call below, or reach out
            directly — either works.
          </p>
        </Container>
      </section>

      {/* Discovery call CTA */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="rounded-3xl bg-[#070707] p-8 text-white sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-medium sm:text-3xl">
                  Discovery Call — 30 minutes.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                  The fastest way to know if we&rsquo;re a fit. We&rsquo;ll
                  talk about your business, what you&rsquo;re trying to
                  build, and whether Lumon Studios can help. If it&rsquo;s
                  not a fit, I&rsquo;ll tell you.
                </p>
              </div>
              <CalendlyButton variant="primary-invert" className="shrink-0">
                Book a Discovery Call
              </CalendlyButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Conversational contact form */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-xl">
            <p className="text-center font-mono text-xs tracking-wide text-gray-500 uppercase">
              Or answer a few quick questions
            </p>
            <h2 className="mt-3 text-center text-3xl leading-[1.1] font-normal tracking-tight sm:text-4xl">
              Takes about <em className="italic">a minute.</em>
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Direct contact + response time + elsewhere */}
      <section className="bg-[#fbfbfb]">
        <Container className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-3">
          <div>
            <h2 className="text-xl font-medium sm:text-2xl">
              Prefer to write first?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              Send a note. I read every message personally and reply within
              one business day.
            </p>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-700">
                  <a href="mailto:tobi@lumonstudio.xyz" className="underline hover:text-black transition-colors">tobi@lumonstudio.xyz</a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                  LinkedIn
                </dt>
                <dd className="mt-1 text-sm text-gray-700">
                  <a href="https://www.linkedin.com/company/lumon-studio/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Lumon Studio</a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-medium sm:text-2xl">
              One business day. Always.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              Every message gets a response within one business day. If
              we&rsquo;re a fit, we&rsquo;ll set up a call. If we&rsquo;re
              not, I&rsquo;ll tell you why and point you toward what might
              work better.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium sm:text-2xl">
              Find Lumon Studios on:
            </h2>
            <div className="mt-5 flex items-center gap-5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-500 transition-colors hover:text-black"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-500 transition-colors hover:text-black"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-gray-500 transition-colors hover:text-black"
              >
                <XIcon className="size-5" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
