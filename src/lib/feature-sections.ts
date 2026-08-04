import {
  Globe,
  GraduationCap,
  Mail,
  Video,
  LayoutDashboard,
  Sparkles,
  Megaphone,
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
      icon: Video,
      title: "Six videos a day. Thirty minutes of your time.",
      body: "Record for thirty minutes using scripts we provide. We turn it into six ready-to-post videos per day for your Instagram. Consistent presence, without becoming a full-time content creator.",
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
  headline: "Everything you need to get your first sale.",
  subhead:
    "Building the course is the easy part. Getting people to notice it, trust it, and buy it — that's what actually matters. Every Launch build includes the pieces that turn a new course into an early revenue engine.",
  tiles: [
    {
      icon: Globe,
      title: "A course site that closes the sale.",
      body: "Not a page. A full site — hero, promise, curriculum, testimonials, FAQ, checkout. Everything a first-time buyer needs to click Buy without hesitating.",
    },
    {
      icon: GraduationCap,
      title: "Your course, structured for retention.",
      body: "Modules, lessons, drip schedules — organised so students actually finish. Because completion drives testimonials, and testimonials drive your next ten sales.",
    },
    {
      icon: Sparkles,
      title: "Turn slides into pro-level videos.",
      body: "AI avatar videos from your slides, notes, or scripts. Studio-quality lessons without spending forty hours in front of a camera. Ideal for first-time creators who want polish, not production headaches.",
    },
    {
      icon: Megaphone,
      title: "The 30-minute-a-day audience engine.",
      body: "You don't have traffic yet. That's the real problem. Record 30 minutes a day using scripts we write for you — we turn it into 6 ready-to-post videos per day on your Instagram. In 60 days, you have an audience that knows you before you ever pitch them.",
    },
    {
      icon: Mail,
      title: "Sales sequences that convert the audience you build.",
      body: "Welcome emails. Waitlist nurture. Launch sequences. Post-purchase upsells. All written and automated — so the second someone joins your list, they're being sold to properly, not forgotten.",
    },
  ],
  ctaHeadline: "The system, not just the course.",
  ctaSubhead:
    "This is what actually gets you paid. Book a call and we'll walk through exactly what your launch needs.",
  ctaButtonLabel: "Book a Discovery Call",
};

export const SCALE_FEATURES: FeatureSectionContent = {
  eyebrow: "Inside the Rebuild",
  headline: "Everything you need to scale without breaking.",
  subhead:
    "You already have revenue. What you don't have is a system that can hold what's coming next. Every Scale engagement rebuilds the foundation so your growth stops fighting your infrastructure.",
  tiles: [
    {
      icon: Globe,
      title: "A website that matches your level.",
      body: "The site you built in Year 1 is quietly costing you deals. Custom rebuild on Webflow or WordPress, positioned for who you are now — not who you were when you started.",
    },
    {
      icon: RefreshCw,
      title: "Migration without downtime.",
      body: "Move your students, contacts, and course data from wherever it lives now — into a system that actually works. Old system runs until the new one is verified. No lost data. No angry students. No broken checkouts.",
    },
    {
      icon: LayoutDashboard,
      title: "One dashboard. Every lead. Every sale.",
      body: "HubSpot, GoHighLevel, or the CRM that fits your business — set up so your team stops copy-pasting between tools. Automated lead scoring. Real pipelines. Reports you can actually trust.",
    },
    {
      icon: Workflow,
      title: "The full pipeline architecture, rebuilt from scratch.",
      body: "Lead pipeline. Student pipeline. Retention pipeline. Every stage of your buyer's journey — mapped, automated, and visible in real time. So you finally know which channels bring the buyers and which just bring the noise.",
    },
    {
      icon: Zap,
      title: "Automation that replaces three hires.",
      body: "Welcome sequences. Behavioural triggers. Internal alerts when a lead hits a scoring threshold. Post-purchase onboarding. The kind of infrastructure that lets a $30k/month business run without doubling headcount.",
    },
  ],
  ctaHeadline: "Stop patching. Start building.",
  ctaSubhead:
    "Book a Systems Audit Call. We'll map your current stack and show you exactly what to rebuild, migrate, or kill.",
  ctaButtonLabel: "Book a Systems Audit Call",
};
