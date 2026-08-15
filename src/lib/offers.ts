import {
  Users,
  Rocket,
  Stethoscope,
  Gavel,
  Landmark,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { NumberedItem } from "@/components/ui/numbered-list";
import type { AddOnItem } from "@/components/ui/addons-bento";

export type IndustryItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

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

  industriesHeading?: string;
  industriesIntro?: string;
  industriesServed?: IndustryItem[];

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
      "You've been “thinking about doing a course” for a year. Let's make it real in 14 days.",
    heroSub:
      "You bring the expertise. I build everything else: the course site, the platform, the payments, the emails. One flat fee, launched in two weeks.",
    heroAnchors: "From $1,500 · Delivered in 14 days",
    heroCtaLabel: "Book a Discovery Call",

    whoHeading:
      "You're not stuck because you lack information. You're stuck because nobody's building the thing.",
    whoIntro:
      "Launch is for consultants, coaches, and experts who already know their material cold, and who've been circling a course launch for months. You've spent money learning how to create courses. What you haven't done is hire someone to actually build the system. That's the whole gap. I close it.",
    whoBullets: [
      "The course outline has been sitting in a Google Doc since last year.",
      "You bought a course-creation program, got halfway through the modules, and nothing shipped.",
      "You started a Kajabi trial, got stuck at setup, and the trial expired.",
      "You recorded two or three lessons, then stalled at editing.",
      "More than one person has asked “do you have a course?” and you keep saying “it's coming.”",
    ],

    includedHeading: "The complete build.",
    includedItems: [
      {
        title: "Course Site",
        description:
          "Sales page and platform setup on Kajabi, Thinkific, Teachable, or WordPress — your choice. Modules, lessons, resources, custom domain, and SSL, all handled.",
      },
      {
        title: "Payment Infrastructure",
        description:
          "Stripe or PayPal, tested end to end. Students get instant access on payment. Refund flow set up cleanly.",
      },
      {
        title: "Automation",
        description:
          "Welcome sequence, purchase confirmation, lead capture. Waitlist page included if you're validating before you build.",
      },
      {
        title: "Launch Handoff",
        description:
          "30-minute walkthrough, written guide, 14 days of post-launch support, and one revision round during the build.",
      },
    ],

    timelineHeading: "14 days from kickoff to live.",
    timelineItems: [
      {
        title: "Days 1–2 · Kickoff",
        description: "Discovery call, brand and content audit, platform decision.",
      },
      {
        title: "Days 3–8 · Build",
        description: "Site built, payments wired, content uploaded and structured.",
      },
      {
        title: "Days 9–12 · Automation and Review",
        description: "Email sequences live. You review, I revise.",
      },
      {
        title: "Days 13–14 · QA and Handoff",
        description: "Full testing, Loom walkthrough, written guide. You're live.",
      },
    ],

    price: "From $1,500",
    priceTerms: "Flat fee. Delivered in 14 days.",
    addOns: [
      {
        title: "AI Course Videos",
        description:
          "Scripted, presenter-led lessons generated with AI avatars — no camera, no studio, no reshoots.",
        meta: "Custom pricing",
        featured: true,
      },
      {
        title: "Custom Sales Page Copy",
        description: "Conversion copywriting for your sales page.",
        meta: "+$400",
      },
      {
        title: "Custom Design Polish",
        description: "An extra design pass beyond the standard build.",
        meta: "+$500",
      },
      {
        title: "Platform Migration",
        description: "Move existing content and students over.",
        meta: "+$500",
      },
      {
        title: "Extended Support Retainer",
        description: "Ongoing fixes after the 14-day window.",
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
        q: "Kajabi vs Thinkific vs Teachable — which one should I actually use?",
        a: "Depends on you, not on YouTube reviews. Kajabi if you want everything in one place and don't mind paying for it. Thinkific and Teachable if you want cheaper and can live with more moving parts. WordPress with an LMS if you want full control and ownership. I recommend one at kickoff based on your content, your price point, and how hands-on you want to be. You won't spend three weeks comparing platforms — that's my job.",
      },
      {
        q: "Do I need an audience before I launch?",
        a: "You need one to sell, not to build. If you already have an email list or a warm network, we launch straight to them. If you don't, that's what the audience engine and waitlist are for: build attention and collect proof of demand while the course gets built. Starting from zero isn't a reason to wait — it's a reason to start the audience work now.",
      },
      {
        q: "How do I know anyone will buy this?",
        a: "You don't, and neither does anyone selling you certainty. What you can do is test: a waitlist page in front of your idea tells you within weeks whether there's real demand, before you've invested months. If sign-ups come in, you build with confidence. If they don't, you just saved yourself a very expensive lesson for a few hundred dollars.",
      },
      {
        q: "How long does it take to build an online course?",
        a: "The build itself: 14 days from kickoff, if your content exists in some form (slides, docs, recordings, even detailed notes). Most people take longer to decide than to launch. If your content is genuinely half-formed, I'll tell you at the discovery call and we'll scope honestly.",
      },
      {
        q: "Do you guarantee I'll make sales?",
        a: "No. Nobody credible does, and you should run from anyone who says otherwise. What I guarantee is that the machine works: every payment routes correctly, every automation fires, every button links. Whether people buy depends on your offer and your audience. I build the machine. You bring the demand, or we build it together first.",
      },
      {
        q: "Can you finish faster than 14 days?",
        a: "Sometimes, for a rush fee. But 14 days is already fast for a build that actually works. Anyone promising 3 days is skipping the steps you'll pay for later.",
      },
      {
        q: "Do I own everything after?",
        a: "Completely. Every account is created under your login from day one. Files, logins, assets — yours. If we part ways, nothing leaves with me.",
      },
      {
        q: "What happens after the 14 days?",
        a: "14 days of included post-launch support: bugs and integration issues fixed free. After that, most clients run it themselves, or take the $200/mo retainer for ongoing tweaks. Your call.",
      },
    ],

    closingLead: "Still “thinking about doing a course”?",
    closingEmphasis: "You've thought enough.",
    closingCtaLabel: "Book a Discovery Call",
  },

  scale: {
    slug: "scale",
    eyebrow: "Lumon Scale",
    heroHeadline:
      "Your coaching business outgrew its tech stack. I rebuild it so growth stops breaking things.",
    heroSub:
      "For coaches doing $10k+/month on tools that were set up in year one and duct-taped ever since. One rebuild, six weeks, zero downtime.",
    heroAnchors: "From $6,500 · Delivered in 6 weeks",
    heroCtaLabel: "Book a Systems Audit Call",

    whoHeading: "You already know what's broken. You've written the list a dozen times.",
    whoIntro:
      "You've probably also tried fixing it — the $500 Upwork fix that broke in two weeks, the OBM who manages what exists but can't rebuild it, the systems audit that produced a beautiful diagnosis document nobody implemented. The problem was never the diagnosis. It was that nobody rebuilt the foundation.",
    whoBullets: [
      "You're doing $10k+/month consistently, and the ops are creaking under it.",
      "Your stack is 8 to 15 tools that don't talk to each other cleanly.",
      "Somewhere in there are 40 Zapier automations nobody fully understands, and some broke silently months ago.",
      "Your VA spends real hours every week copy-pasting between systems.",
      "You can't answer a simple question: which channel actually brings the buyers?",
    ],

    includedHeading: "The full rebuild.",
    includedItems: [
      {
        title: "Systems Audit",
        description:
          "Every tool, workflow, and data source mapped. Redundancies named. A written strategy doc: what stays, what goes, what gets added.",
      },
      {
        title: "CRM Architecture",
        description:
          "Central CRM setup (HubSpot, GoHighLevel, or similar). Segmentation, custom fields, automated lead scoring.",
      },
      {
        title: "Pipeline Design",
        description:
          "Lead, student, and retention pipelines with real-time dashboards.",
      },
      {
        title: "Automation Build",
        description:
          "Nurture, booking flows, onboarding, behavioural triggers, internal alerts. Everything wired together.",
      },
      {
        title: "Website Upgrade",
        description:
          "Custom rebuild on Webflow or WordPress, fully integrated with the new CRM.",
      },
      {
        title: "Migration and Handoff",
        description:
          "Full data migration with zero downtime. Team training. Written documentation. 30 days of post-launch support.",
      },
    ],

    timelineHeading: "6 weeks from kickoff to handoff.",
    timelineItems: [
      { title: "Week 1 · Deep Audit", description: "Every tool, workflow, and data source mapped." },
      { title: "Week 2 · Architecture", description: "Strategy doc delivered. You approve the approach before anything gets touched." },
      {
        title: "Weeks 3–4 · Build",
        description: "CRM live, pipelines wired, base automations built. Website rebuild runs in parallel.",
      },
      { title: "Week 5 · Migration", description: "Data moves from the old tools. Zero-downtime cutover." },
      {
        title: "Week 6 · QA and Training",
        description: "End-to-end testing, team walkthroughs, support begins.",
      },
    ],

    price: "From $6,500",
    priceTerms: "Flat fee. Delivered in 6 weeks.",
    addOns: [
      {
        title: "Additional Migrations",
        description: "Extra tool or data source moved into the new system.",
        meta: "+$1,000 each",
      },
      {
        title: "Custom Reporting Dashboards",
        description: "Purpose-built views beyond the standard pipelines.",
        meta: "+$800",
      },
      {
        title: "Ongoing Retainer",
        description: "Continued management and new automations after handoff.",
        meta: "$800–$1,500/mo",
      },
    ],

    proofLead: "What a rebuild",
    proofEmphasis: "looks like.",
    proofItems: [
      "CASE STUDY — a past rebuild project, ideally with before/after screenshots and revenue results if available",
    ],

    faqItems: [
      {
        q: "I've been burned before. How do I know you won't disappear halfway through?",
        a: "Fair question, and it's the real one. Two answers. First, the engagement is milestone-based: audit, strategy doc, build, migration, training — each delivered and approved in sequence, so you're never six weeks in with nothing to show. Second, I've done this rebuild across 60+ client projects over four years. This is the work I do, not a side gig I'll wander off from.",
      },
      {
        q: "Do I have to switch platforms?",
        a: "Not necessarily. Part of week 1 is telling you honestly whether your current stack can scale or whether migration is the smarter move. If a cleanup solves it, I'll say so and price accordingly. I have no incentive to migrate you for sport — migrations are the riskiest part of any rebuild.",
      },
      {
        q: "Can I keep my current CRM?",
        a: "If it can do the job, yes. If it's the source of the problem, we rebuild in something better suited. Decided during the audit, with your input.",
      },
      {
        q: "What about downtime? I can't have students locked out.",
        a: "Zero-downtime cutover is built into the deliverable, not an add-on. The old system runs until the new one is verified end to end. No student sees a broken checkout. No lead falls through during the switch.",
      },
      {
        q: "We're mid-Kajabi, thinking about HubSpot. Is that migration even sane?",
        a: "Yes, and it's one of the most common rebuilds I do: course delivery stays where it works, CRM and pipeline move to something built for it, and the two get properly connected. Whether that's the right move for you specifically is a week 1 answer, not a sales call answer.",
      },
      {
        q: "What happens after the 30 days of support?",
        a: "Most Scale clients move into the retainer for ongoing management and new automations. Some run it themselves after training, which is fine, because the documentation and training are built for exactly that.",
      },
      {
        q: "Can you work with my team?",
        a: "Yes. Up to 3 training sessions with your VAs, OBM, or ops manager are part of the deliverable. They walk away able to run the system without me.",
      },
    ],

    closingLead: "Stop patching.",
    closingEmphasis: "Rebuild once, properly.",
    closingCtaLabel: "Book a Systems Audit Call",
  },

  enterprise: {
    slug: "enterprise",
    eyebrow: "Lumon Enterprise",
    heroHeadline:
      "Learning platforms and course systems, built under your brand. Delivered like your reputation depends on it. Because it does.",
    heroSub:
      "For agencies, consultancies, SaaS teams, and CE providers who've sold (or need) a training platform and don't have the team to build it. Whitelabel by default, NDA before anything starts, and you get the full source when it's done.",
    heroAnchors:
      "Projects from $8,000 · Retainers from $2,000/month · Every engagement scoped independently",
    heroCtaLabel: "Request a Partnership Conversation",

    whoHeading: "You don't need another vendor pitch. You need someone who ships.",
    whoIntro:
      "Enterprise serves three kinds of buyers, and they all share one problem: the platform has been promised, and nobody in-house can build it. The alternatives are a $300k agency quote that takes 9 months, an offshore team that delivers something technically functional and visually amateur, or an in-house engineering roadmap that will never prioritise you. I'm the middle option that usually doesn't exist: senior delivery, modern build quality, weeks instead of quarters, at a price that doesn't require a board meeting.",
    whoBullets: [
      "Agencies and HR/L&D consultancies delivering training programs to corporate clients — you design the curriculum and own the relationship, I build the platform invisibly, under your brand.",
      "B2B SaaS teams building a customer academy or certification program — your engineering team said “not our priority,” your marketing team doesn't build LMS platforms, I do.",
      "Continuing education providers in healthcare, legal, and financial services running CE delivery on software that hasn't meaningfully changed since 2018.",
    ],

    includedHeading: "The whitelabel model, plainly.",
    includedItems: [
      {
        title: "You keep the client relationship.",
        description:
          "Every conversation with the end client runs through you. I never contact your client directly. Ever.",
      },
      {
        title: "I build under your brand.",
        description:
          "All deliverables carry your identity. Handoff documentation is written for your team to present as their own. No Lumon Studios footer, signature, or attribution anywhere.",
      },
      {
        title: "Everything is contractual.",
        description:
          "NDA and whitelabel agreement signed before work starts. Formal SOW with milestone-based delivery and sign-off.",
      },
      {
        title: "You get the source, always.",
        description:
          "Full source files on completion. Your team can maintain it, evolve it, or hand it to another vendor. No lock-in, no hostage situations.",
      },
    ],

    secondaryHeading: "Standard scope.",
    secondaryIntro: "Every engagement is scoped independently. Common components:",
    secondaryItems: [
      "Custom learning platforms: WordPress LMS, custom builds, or whitelabel Thinkific/Kajabi.",
      "Customer academies and certification programs for SaaS, with completion workflows and certificates.",
      "CE delivery systems with certificate tracking, accreditation-ready reporting, and live webinar capability alongside on-demand courses.",
      "Corporate training portals with role management, progress tracking, and reporting.",
      "Integrations with the client's existing stack: HR systems, CRMs, SSO, whatever's already in place.",
      "Custom design matched to the client's brand, down to the pixel.",
      "Enrolment and payment infrastructure, plus reporting dashboards.",
    ],

    industriesHeading: "Industries served.",
    industriesIntro:
      "Every engagement is scoped to the sector's own compliance, branding, and delivery requirements.",
    industriesServed: [
      {
        icon: Users,
        title: "HR & L&D Consultancies",
        description:
          "Onboarding, training, and compliance programs delivered under your firm's brand.",
      },
      {
        icon: Rocket,
        title: "B2B SaaS",
        description:
          "Customer academies and certification programs, integrated with your product and CRM.",
      },
      {
        icon: Stethoscope,
        title: "Healthcare CE Providers",
        description:
          "CE delivery with certificate tracking and accreditation-ready reporting.",
      },
      {
        icon: Gavel,
        title: "Legal CE Providers",
        description:
          "Continuing education platforms built to your bar association's requirements.",
      },
      {
        icon: Landmark,
        title: "Financial Services CE",
        description:
          "Compliance-ready training and certification for licensed professionals.",
      },
      {
        icon: Briefcase,
        title: "Coaching & Training Agencies",
        description:
          "Multi-expert course infrastructure for agencies representing several coaches at once.",
      },
    ],

    faqItems: [
      {
        q: "How do we know you won't approach our client directly?",
        a: "The whole model is discretion. NDA and whitelabel agreement, signed before any work, with financial penalties for breach. My business depends on being an invisible partner. Going around you would kill the model, not save it.",
      },
      {
        q: "What if the quality doesn't match what we sold?",
        a: "That's what the paid pilot is for: a small, low-risk engagement so you verify the work before committing to a bigger project. If it doesn't meet your bar, we don't move forward, and you've risked very little finding out.",
      },
      {
        q: "We're a SaaS company, not an agency. Does this still fit?",
        a: "Yes. For SaaS teams the “whitelabel” part is simply that the academy is yours: your brand, your domain, your data, integrated with your product and CRM. I build it, your team runs it, your customers never know I existed. If you want ongoing content operations after launch, that's what the retainer covers.",
      },
      {
        q: "Can you handle CE accreditation requirements?",
        a: "I build the reporting, certificate tracking, and completion records your accrediting body requires, to your specification. You own the regulatory relationship and requirements; I make the platform produce what the auditors ask for, automatically instead of from a spreadsheet at 2am in audit season. If your requirements are unusual, we scope that explicitly in the SOW before work starts.",
      },
      {
        q: "Can we get better prices offshore?",
        a: "Almost certainly, and for low-stakes work, offshore may genuinely be the right call. But when your client's brand or your accreditation is on the line, the math changes. What does one botched delivery cost you in reputation?",
      },
      {
        q: "How do scope changes work?",
        a: "Written change orders. Every change goes through a formal SOW amendment with revised pricing and timeline. No verbal agreements, no surprises at invoice time.",
      },
      {
        q: "What's your capacity?",
        a: "Maximum three concurrent Enterprise engagements. If I'm at capacity when you're ready, we discuss realistic start dates. I'd rather tell you 6 weeks honestly than overload and drop the ball on your client.",
      },
    ],

    closingLead: "If you've been looking for a delivery partner who actually delivers,",
    closingEmphasis: "let's talk.",
    closingCtaLabel: "Request a Partnership Conversation",
  },
};
