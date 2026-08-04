import type { NumberedItem } from "@/components/ui/numbered-list";
import type { AddOnItem } from "@/components/ui/addons-bento";

export type OfferContent = {
  slug: "launch" | "scale" | "enterprise";
  eyebrow: string;
  heroHeadline: string;
  heroSub: string;
  heroAnchors: string;
  heroCtaLabel: string;

  whoHeading: string;
  whoIntro: string;
  whoBullets: string[];

  includedHeading: string;
  includedItems: NumberedItem[];

  secondaryHeading?: string;
  secondaryIntro?: string;
  secondaryItems?: string[];

  timelineHeading?: string;
  timelineItems?: NumberedItem[];

  price?: string;
  priceTerms?: string;
  addOns?: AddOnItem[];

  proofLead?: string;
  proofEmphasis?: string;
  proofItems?: string[];

  faqItems: { q: string; a: string }[];

  closingLead: string;
  closingEmphasis: string;
  closingCtaLabel: string;
};

export const OFFERS: Record<string, OfferContent> = {
  launch: {
    slug: "launch",
    eyebrow: "Lumon Launch",
    heroHeadline:
      "Everything you need to sell your first course — built in 14 days.",
    heroSub: "You bring the content. We build the machine.",
    heroAnchors: "From $1,500 · Delivered in 14 days",
    heroCtaLabel: "Book a Discovery Call",

    whoHeading: "If you're launching your first course.",
    whoIntro:
      "Launchpad is built for coaches, consultants, and experts with something worth teaching — who've been trying to launch and just can't get the tech piece off the ground.",
    whoBullets: [
      "You have expertise, credibility, and an idea for a course you know would sell.",
      "You've been meaning to launch for months — the tech piece is what stalled you.",
      "You don't want to figure out Kajabi, Thinkific, or WordPress by trial and error.",
      "You'd rather write one cheque and be launched than spend six months in the weeds.",
    ],

    includedHeading: "The complete build.",
    includedItems: [
      {
        title: "Course Site",
        description:
          "Custom-designed course sales page and platform setup on Kajabi, Thinkific, Teachable, or WordPress — your choice. Modules, lessons, resources, custom domain, and SSL all handled.",
      },
      {
        title: "Payment Infrastructure",
        description:
          "Stripe or PayPal integration. Tested checkout. Students get auto-granted access on payment. Refund flow set up cleanly.",
      },
      {
        title: "Basic Automation",
        description:
          "Welcome email sequence. Purchase confirmation. Lead capture. Optional waitlist page if you're pre-launching.",
      },
      {
        title: "Launch Handoff",
        description:
          "30-minute walkthrough, written guide, and 14 days of post-launch support. One round of revisions during the build.",
      },
    ],

    timelineHeading: "14 days from kickoff to live.",
    timelineItems: [
      {
        title: "Days 1–2 · Kickoff",
        description: "Discovery call. Brand and content audit. Architecture decisions.",
      },
      {
        title: "Days 3–8 · Build",
        description: "Course site built. Payments integrated. Content uploaded and structured.",
      },
      {
        title: "Days 9–12 · Automation + Review",
        description: "Email sequences built. Client review + one round of revisions.",
      },
      {
        title: "Days 13–14 · QA + Handoff",
        description: "Full end-to-end testing. Loom walkthrough. Written guide. Launch-ready.",
      },
    ],

    price: "From $1,500",
    priceTerms: "Flat fee. Delivered in 14 days.",
    addOns: [
      {
        title: "AI Course Videos",
        description:
          "Professional, presenter-led video lessons for your course modules — scripted and generated with AI avatars via HeyGen. No camera, no studio, no reshoots.",
        meta: "Custom pricing",
        featured: true,
      },
      {
        title: "Custom Sales Page Copy",
        description: "Conversion-focused copywriting for your course sales page.",
        meta: "+$400",
      },
      {
        title: "Custom Design Polish",
        description: "Extra design pass beyond the standard build.",
        meta: "+$500",
      },
      {
        title: "Platform Migration",
        description: "Move existing content and students onto the new platform.",
        meta: "+$500",
      },
      {
        title: "Extended Support Retainer",
        description: "Ongoing fixes and small tweaks after the 14-day window.",
        meta: "+$200/mo",
      },
    ],

    proofLead: "The proof it",
    proofEmphasis: "actually works.",
    proofItems: [
      "FEATURED WORK — 1–2 examples of past course platforms built for coaches",
    ],

    faqItems: [
      {
        q: "Do you guarantee I'll make sales?",
        a: "No — and honestly nobody credible does. Launchpad guarantees the system works: every payment routes correctly, every automation fires, every button links. Whether people buy depends on your offer, your audience, and your marketing. That's your zone. I build the machine.",
      },
      {
        q: "Which course platform will you use?",
        a: "Whichever fits your situation. Kajabi is best for coaches who want everything in one place. Thinkific and Teachable are cheaper but more piecemeal. WordPress with an LMS plugin is best for full control. I'll recommend during kickoff based on your goals.",
      },
      {
        q: "Can you finish faster than 14 days?",
        a: "Sometimes, for a rush fee. But 14 days is fast for a build that actually works. Anyone promising 3 days is skipping steps you'll pay for later.",
      },
      {
        q: "Do I own everything after?",
        a: "Completely. Every account is set up under your login from day one. All files, all logins, all assets — yours. If we ever part ways, nothing goes with me.",
      },
      {
        q: "What happens after the 14 days?",
        a: "You get 14 days of post-launch support included — any bugs or integration issues, I'll fix free. After that, most clients either handle it themselves or opt into a light retainer ($200/mo) for ongoing tweaks. Your call.",
      },
    ],

    closingLead: "Ready to",
    closingEmphasis: "actually launch this?",
    closingCtaLabel: "Book a Discovery Call",
  },

  scale: {
    slug: "scale",
    eyebrow: "Lumon Scale",
    heroHeadline: "Consolidate your scattered tools into one clean system.",
    heroSub:
      "For coaches at $10k+/month whose systems are duct-taped together. We rebuild the infrastructure so your business scales without breaking.",
    heroAnchors: "From $6,500 · Delivered in 6 weeks",
    heroCtaLabel: "Book a Systems Audit Call",

    whoHeading: "If you've outgrown your tools.",
    whoIntro:
      "By $10k/month, most coaches are running on tools that were set up in Year 1 and never rebuilt. The system that got you here won't take you further.",
    whoBullets: [
      "You're doing $10k+/month consistently and want it to scale further.",
      "Your tech stack has grown to 8–15 tools that don't talk to each other cleanly.",
      "Your VA (or you) spends real hours copy-pasting between systems.",
      "You can't get a clear picture of where leads and revenue are actually coming from.",
      "You've been meaning to fix this for months but don't know where to start.",
    ],

    includedHeading: "The full rebuild.",
    includedItems: [
      {
        title: "Systems Audit",
        description:
          "Every tool, workflow, and data source mapped. Redundancies identified. Written strategy doc: what stays, what goes, what's added.",
      },
      {
        title: "CRM Architecture",
        description:
          "Central CRM setup (HubSpot, GoHighLevel, or similar). Contact segmentation. Custom fields. Automated lead scoring.",
      },
      {
        title: "Pipeline Design",
        description:
          "Lead, student, and retention pipelines. Real-time dashboards for visibility into every stage.",
      },
      {
        title: "Automation Build",
        description:
          "Lead nurture, booking flows, post-purchase onboarding, behavioural triggers, internal alerts. Everything wired together.",
      },
      {
        title: "Website Upgrade",
        description:
          "Custom rebuild on Webflow or WordPress. Aligned with your positioning at this level, fully integrated with the new CRM.",
      },
      {
        title: "Migration + Handoff",
        description:
          "Full data migration with zero downtime. Team training sessions. Written documentation. 30 days of post-launch support.",
      },
    ],

    timelineHeading: "6 weeks from kickoff to handoff.",
    timelineItems: [
      { title: "Week 1 · Deep Audit", description: "Every tool, workflow, and data source mapped." },
      { title: "Week 2 · Architecture", description: "Strategy doc delivered. Approach approved." },
      {
        title: "Weeks 3–4 · Build",
        description: "CRM live. Pipelines wired. Base automations built. Website upgrade in parallel.",
      },
      { title: "Week 5 · Migration", description: "Full data migration from old tools. Zero-downtime cutover." },
      {
        title: "Week 6 · QA + Training",
        description: "End-to-end testing. Team walkthroughs. Post-launch support begins.",
      },
    ],

    price: "From $6,500",
    priceTerms: "Flat fee. Delivered in 6 weeks.",
    addOns: [
      {
        title: "Additional Migrations",
        description: "Extra tool or data source migrated into the new system.",
        meta: "+$1,000 each",
      },
      {
        title: "Custom Reporting Dashboards",
        description: "Purpose-built dashboards beyond the standard pipeline views.",
        meta: "+$800",
      },
      {
        title: "Ongoing Retainer",
        description: "Continued management, new automations, and adjustments after handoff.",
        meta: "$800–$1,500/mo",
      },
    ],

    proofLead: "What the rebuild",
    proofEmphasis: "actually looks like.",
    proofItems: [
      "CASE STUDY — a past rebuild project, ideally with before/after screenshots and revenue results if available",
    ],

    faqItems: [
      {
        q: "Do I have to switch platforms?",
        a: "Not necessarily. Part of Week 1 is telling you honestly whether your current stack can scale or whether migration is the smarter move. If cleanup works, I'll say so and price accordingly.",
      },
      {
        q: "What about downtime?",
        a: "Zero-downtime cutover is built into the deliverable. Old system runs until the new one is verified end-to-end. No customer sees a broken checkout. No lead falls through.",
      },
      {
        q: "Can I keep my current CRM?",
        a: "If it can do the job, yes. If it's the source of the problem, we'll rebuild in something more suited. This gets decided during the audit — with your input, not without.",
      },
      {
        q: "What happens after the 30 days of support?",
        a: "Most Scale clients move into the retainer ($800–$1,500/mo) for ongoing management, new automations, and adjustments. It's not required — some clients handle it themselves after training. Your call.",
      },
      {
        q: "Can you work with our team?",
        a: "Yes — team training is part of the deliverable. Up to 3 sessions with VAs, OBMs, or ops managers. They walk away knowing how to run the system without me.",
      },
    ],

    closingLead: "Ready to stop patching and",
    closingEmphasis: "start building?",
    closingCtaLabel: "Book a Systems Audit Call",
  },

  enterprise: {
    slug: "enterprise",
    eyebrow: "Lumon Enterprise",
    heroHeadline:
      "Whitelabel course systems and learning platforms — built under your brand.",
    heroSub:
      "For HR consultancies, L&D firms, and agencies delivering training solutions to their own clients. Your brand. Your credit. Your client sees a seamless product.",
    heroAnchors:
      "Projects from $8,000 · Retainers from $2,000/month · Every engagement scoped independently",
    heroCtaLabel: "Request a Partnership Conversation",

    whoHeading: "Agencies that win deliverables — and need someone to deliver them.",
    whoIntro:
      "Enterprise is built for firms whose clients need training platforms, course systems, or learning portals — and whose in-house team doesn't build that kind of tech. We deliver invisibly. You take the credit.",
    whoBullets: [
      "HR consulting firms serving corporate clients with onboarding, training, or compliance programs.",
      "L&D consultancies who design curricula and outsource the platform build.",
      "Corporate training providers delivering professional certifications or upskilling.",
      "Coaching agencies representing 5+ experts who each need their own course infrastructure.",
      "Digital marketing agencies with coaching clients who lack in-house tech capability.",
    ],

    includedHeading: "The whitelabel model, plainly.",
    includedItems: [
      {
        title: "You keep the client relationship.",
        description:
          "Every conversation with the end client runs through you. We never contact your client directly. Ever.",
      },
      {
        title: "We build under your brand.",
        description:
          "All deliverables branded 100% under your identity. Handoff documentation written for your team to present as their own. No Lumon Studios footer, signature, or attribution anywhere.",
      },
      {
        title: "Everything is contractual.",
        description:
          "NDA and whitelabel agreement signed before work starts. Formal SOW with milestone-based delivery and sign-off. No surprises.",
      },
      {
        title: "You get the source, always.",
        description:
          "Full source files delivered on completion. Your team can maintain, evolve, or hand off to another vendor. No lock-in.",
      },
    ],

    secondaryHeading: "Standard scope.",
    secondaryIntro:
      "Every engagement is scoped independently. Common components:",
    secondaryItems: [
      "Custom learning platforms (WordPress LMS, custom builds, or whitelabel Thinkific/Kajabi).",
      "Corporate training portals with role management, progress tracking, and reporting.",
      "Course delivery systems with certification and completion workflows.",
      "Integrations with your client's HR systems, CRMs, and existing stacks.",
      "Custom design aligned with your client's brand — down to the pixel.",
      "Payment or enrolment infrastructure and reporting dashboards.",
    ],

    faqItems: [
      {
        q: "How do we know you won't approach our client directly?",
        a: "The whole model is discretion. NDA and whitelabel agreement signed before any work — with financial penalties for breach. My business depends on being an invisible partner. Going around you would kill the model, not save it.",
      },
      {
        q: "What if the quality doesn't match what we sold?",
        a: "That's exactly why we start with a paid pilot — a small, low-risk engagement so you can verify quality before committing to a bigger project. If it doesn't meet your bar, we don't move forward.",
      },
      {
        q: "Can we get better prices offshore?",
        a: "Almost certainly. And for low-stakes work, offshore may be the right call. But when your client's brand is on the line, quality-over-price is the smarter math. What does a botched delivery cost you in reputation?",
      },
      {
        q: "How do scope changes work?",
        a: "Written change orders. Every scope change goes through a formal SOW amendment with revised pricing and timeline. No verbal agreements. No surprises at invoice time.",
      },
      {
        q: "What's your capacity?",
        a: "Maximum three concurrent Enterprise engagements at any time. If I'm at capacity when you're ready to sign, we discuss realistic timelines. I don't overpromise and underdeliver — better to say I can start in 6 weeks than to overload and drop the ball.",
      },
    ],

    closingLead: "If you've been looking for a reliable delivery partner,",
    closingEmphasis: "let's talk.",
    closingCtaLabel: "Request a Partnership Conversation",
  },
};
