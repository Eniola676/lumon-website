import {
  Globe,
  GraduationCap,
  Mail,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
  BadgeCheck,
  RefreshCw,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type FeatureTile = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type FeatureSectionContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  tiles: [FeatureTile, FeatureTile, FeatureTile, FeatureTile, FeatureTile];
  ctaHeadline: string;
  ctaSubhead: string;
  ctaButtonLabel: string;
};

export const HOME_FEATURES: FeatureSectionContent = {
  eyebrow: "Everything We Build",
  headline: "The full machine, not just the shopfront.",
  subhead:
    "A website gets you seen. These pieces get you paid. Every Lumon build includes the components that turn traffic into revenue.",
  tiles: [
    {
      icon: Globe,
      title: "A website that actually sells.",
      body: "Custom-designed, mobile-first, built on Webflow, WordPress, or the platform that fits your business. Not a template. Not a landing page dressed up as a site.",
    },
    {
      icon: GraduationCap,
      title: "Your course, ready to sell.",
      body: "Modules built out, videos uploaded, lessons structured, drip schedules set. Whether you're on Kajabi, Thinkific, Teachable, or WordPress — the platform is invisible to your students. All they see is a professional product.",
    },
    {
      icon: Mail,
      title: "Sales that happen while you sleep.",
      body: "Welcome sequences, post-purchase upsells, cart abandonment recovery. Every email your business needs, written and automated.",
    },
    {
      icon: ShieldCheck,
      title: "Every button tested before you ever see it.",
      body: "Payments verified. Automations fired end-to-end. Links checked. If a piece only works in theory, it doesn't ship — you get a system that works the day it goes live, not a demo you have to debug yourself.",
    },
    {
      icon: LayoutDashboard,
      title: "One dashboard. Every lead. Every sale.",
      body: "A single source of truth for who your leads are, where they came from, and where they are in your funnel. So you stop guessing what's working and start knowing.",
    },
  ],
  ctaHeadline: "Want the full stack built into your business?",
  ctaSubhead:
    "Every Lumon program includes the pieces you need. Book a call and we'll map the exact system for your business.",
  ctaButtonLabel: "Book a Discovery Call",
};

export const LAUNCH_FEATURES: FeatureSectionContent = {
  eyebrow: "Inside the Launch",
  headline: "Everything a first sale actually requires.",
  subhead:
    "Recording lessons is maybe 20% of a launch. The other 80% is the machine around them: the page that sells, the platform that delivers, the emails that follow up. Every Launch build includes all of it.",
  tiles: [
    {
      icon: Globe,
      title: "A course site built to sell, not just exist.",
      body: "Hero, offer, curriculum, testimonials, FAQ, checkout. A first-time buyer lands, understands what they're getting, and pays without a single confused moment. That's the whole job of the page.",
    },
    {
      icon: GraduationCap,
      title: "Your course, structured so students finish.",
      body: "Modules, lessons, and drip schedules arranged for completion. Finished students leave testimonials. Testimonials sell the next cohort. Most course creators skip this and wonder why nobody reviews them.",
    },
    {
      icon: Sparkles,
      title: "AI avatar videos, so you never film a thing.",
      body: "I turn your slides, notes, or scripts into presenter-led video lessons using AI avatars. No camera, no studio, no re-recording lesson 4 for the fifth time. If the reason you haven't launched is “I hate filming myself,” this removes it.",
    },
    {
      icon: BadgeCheck,
      title: "A site that makes “hire this person” the obvious call.",
      body: "Custom design, not a template with your logo swapped in. For most first-time buyers, the site is the first real signal you're not another side-hustle course — it's what makes paying you feel safe.",
    },
    {
      icon: Mail,
      title: "Email sequences that do the selling while you sleep.",
      body: "Welcome emails, waitlist nurture, launch sequence, post-purchase upsell. Written and automated, so nobody joins your list and gets forgotten.",
    },
  ],
  ctaHeadline: "The system, not just the course.",
  ctaSubhead:
    "This is what actually gets you paid. Book a call and we'll walk through exactly what your launch needs.",
  ctaButtonLabel: "Book a Discovery Call",
};

export const SCALE_FEATURES: FeatureSectionContent = {
  eyebrow: "Inside the Rebuild",
  headline: "A system that can hold what's coming next.",
  subhead:
    "You have revenue. You don't have infrastructure that matches it. Every Scale engagement rebuilds the foundation so you stop patching symptoms.",
  tiles: [
    {
      icon: Globe,
      title: "A website that matches your level.",
      body: "The site you built in year one is quietly costing you deals with the clients you want now. Custom rebuild on Webflow or WordPress, positioned for who you are today, wired into the new CRM.",
    },
    {
      icon: RefreshCw,
      title: "Migration without losing a single student.",
      body: "If you've migrated before and lost data, I understand why you're scared to touch anything. Here's how this one works: the old system keeps running until the new one is verified end to end. Nobody loses access, and no checkout breaks mid-switch.",
    },
    {
      icon: LayoutDashboard,
      title: "One dashboard. Every lead. Every sale.",
      body: "HubSpot, GoHighLevel, or whichever CRM actually fits your business, set up so your team stops living in copy-paste. Lead scoring, real pipelines, reports you can trust when you're planning next quarter.",
    },
    {
      icon: Workflow,
      title: "Your full pipeline, rebuilt from scratch.",
      body: "Lead pipeline, student pipeline, retention pipeline. Every stage mapped, automated, and visible. You finally see which channels bring buyers and which just bring noise.",
    },
    {
      icon: Zap,
      title: "Email automation that replaces hires, not just Zaps.",
      body: "Welcome sequences, cart abandonment, behavioural triggers, internal alerts when a lead crosses a scoring threshold, post-purchase onboarding. Wired together properly, not stacked on 40 fragile Zaps.",
    },
  ],
  ctaHeadline: "Stop patching. Start building.",
  ctaSubhead:
    "Book a Systems Audit Call. We'll map your current stack and show you exactly what to rebuild, migrate, or kill.",
  ctaButtonLabel: "Book a Systems Audit Call",
};
