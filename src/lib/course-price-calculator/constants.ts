// ---------------------------------------------------------------------------
// TUNABLE CONSTANTS — every number and copy string the calculator uses lives
// in this file. logic.ts only contains pure math that reads from here; the
// components only render what these objects give them. To change a price
// band, a multiplier, a flag message, or a question label, edit it here —
// you should never need to touch logic.ts or the components.
// ---------------------------------------------------------------------------
import type {
  AccessId,
  AltCostId,
  AudienceId,
  CategoryId,
  ChannelId,
  ExperienceId,
  FormatId,
  MoneyValueId,
  OutcomeTypeId,
} from "./types";

// --- Anchor 1: market band ---------------------------------------------------

export const FORMAT_OPTIONS: {
  id: FormatId;
  label: string;
  sublabel: string;
  baseMin: number;
  baseMax: number;
}[] = [
  {
    id: "mini",
    label: "Mini-course or workshop",
    sublabel: "Under 2 hours",
    baseMin: 27,
    baseMax: 97,
  },
  {
    id: "self-paced",
    label: "Self-paced course",
    sublabel: "2–10 hours",
    baseMin: 97,
    baseMax: 497,
  },
  {
    id: "comprehensive",
    label: "Comprehensive program",
    sublabel: "10+ hours, with workbooks",
    baseMin: 497,
    baseMax: 1997,
  },
  {
    id: "cohort",
    label: "Cohort or live program",
    sublabel: "Runs on set dates",
    baseMin: 797,
    baseMax: 2497,
  },
  {
    id: "certification",
    label: "Certification or hybrid",
    sublabel: "Includes coaching",
    baseMin: 1497,
    baseMax: 4997,
  },
];

export const CATEGORY_OPTIONS: { id: CategoryId; label: string; multiplier: number }[] = [
  { id: "business", label: "Business, marketing, sales, or finance", multiplier: 1.3 },
  { id: "tech", label: "Tech, design, or a professional skill", multiplier: 1.15 },
  { id: "health", label: "Health, fitness, or nutrition", multiplier: 1.1 },
  { id: "growth", label: "Personal growth or mindset", multiplier: 0.9 },
  { id: "creative", label: "Creative, hobby, parenting, or lifestyle", multiplier: 0.75 },
];

export const ACCESS_OPTIONS: { id: AccessId; label: string; multiplier: number }[] = [
  { id: "self-paced-only", label: "Self-paced only", multiplier: 1.0 },
  { id: "community", label: "Community or async Q&A", multiplier: 1.2 },
  { id: "group-coaching", label: "Group coaching calls", multiplier: 1.5 },
  { id: "one-on-one", label: "1:1 support", multiplier: 2.0 },
];

// --- Anchor 2: proof score ---------------------------------------------------

export const EXPERIENCE_OPTIONS: { id: ExperienceId; label: string; points: number }[] = [
  { id: "starting", label: "Just starting", points: 0 },
  { id: "some-results", label: "Some results or testimonials", points: 1 },
  { id: "established", label: "Established practitioner", points: 2 },
  { id: "authority", label: "Recognized authority", points: 3 },
];

export const AUDIENCE_OPTIONS: { id: AudienceId; label: string; points: number }[] = [
  { id: "none", label: "No audience yet", points: 0 },
  { id: "under-1k", label: "Under 1,000", points: 0.5 },
  { id: "1k-10k", label: "1,000 – 10,000", points: 1 },
  { id: "10k-50k", label: "10,000 – 50,000", points: 1.5 },
  { id: "50k-plus", label: "50,000+", points: 2 },
];

export const PROOF_DIVISOR = 5;
export const LOW_MULTIPLIER = 0.8;
export const HIGH_MULTIPLIER = 1.25;

// --- Anchor 3: value ceiling --------------------------------------------------

export const OUTCOME_TYPE_OPTIONS: { id: OutcomeTypeId; label: string; sublabel: string }[] = [
  {
    id: "money",
    label: "A money outcome",
    sublabel: "They earn or save cash because of it",
  },
  {
    id: "credential",
    label: "A credential or career step",
    sublabel: "A certification, job, promotion, or client win",
  },
  {
    id: "skill",
    label: "A skill or life result",
    sublabel: "Valuable, but not directly monetary",
  },
];

export const MONEY_VALUE_OPTIONS: { id: MoneyValueId; label: string; value: number }[] = [
  { id: "lt-1k", label: "Under $1,000", value: 750 },
  { id: "1k-5k", label: "$1,000 – $5,000", value: 3000 },
  { id: "5k-15k", label: "$5,000 – $15,000", value: 10000 },
  { id: "15k-50k", label: "$15,000 – $50,000", value: 30000 },
  { id: "50k-plus", label: "$50,000+", value: 75000 },
];

export const ALT_COST_OPTIONS: { id: AltCostId; label: string; value: number }[] = [
  { id: "lt-200", label: "Under $200", value: 150 },
  { id: "200-1k", label: "$200 – $1,000", value: 600 },
  { id: "1k-5k", label: "$1,000 – $5,000", value: 2500 },
  { id: "5k-plus", label: "$5,000+", value: 7500 },
];

export const MONEY_CEILING_MULTIPLIER = 0.1; // 10x rule
export const CREDENTIAL_CEILING_MULTIPLIER = 0.8;
export const SKILL_CEILING_MULTIPLIER = 0.7;

export const CEILING_FLOOR_MULTIPLIER = 0.8; // floor = bandMin × this, when clamping high down to ceiling
export const UNDERPRICED_CEILING_MULTIPLIER = 3; // ceiling > high × this → "you're underpricing" flag

// --- Sales channel ------------------------------------------------------------

export const CHANNEL_OPTIONS: { id: ChannelId; label: string; sublabel: string }[] = [
  { id: "own-site", label: "Your own site", sublabel: "Kajabi, Thinkific, custom-built, etc." },
  { id: "marketplace", label: "A marketplace", sublabel: "Udemy, Skillshare, etc." },
];

export const MARKETPLACE_CAP = 199;

// --- Payment plan ---------------------------------------------------------

export const PAYMENT_PLAN_THRESHOLD = 497;
export const PAYMENT_PLAN_MARKUP = 1.12;
export const PAYMENT_PLAN_BELOW_THRESHOLD_COPY =
  "Below $500, skip payment plans — one clean price converts better.";

// --- Flags & footnote ------------------------------------------------------

export const FLAG_COPY = {
  ceilingBelowHigh:
    "Your format and proof support a higher price than the outcome does. Sharpen the promise or accept this ceiling — buyers pay for the result they believe they'll get.",
  ceilingFarAboveHigh:
    "The result you deliver is worth far more than this range. You're probably underpricing — test the top of the range first, then raise it once you have testimonials.",
  marketplaceCap:
    "Marketplaces run permanent discount cycles, so real prices land under $200 no matter what you list. To charge the range above, sell from your own site.",
};

export const RESULT_FOOTNOTE =
  "Starting range, not a verdict. If under 1 in 100 sales-page visitors buy, test lower; if over 1 in 20 buy, you're underpriced.";

// --- Question copy (screen headings) ---------------------------------------

export const QUESTION_COPY: Record<
  "format" | "access" | "category" | "outcomeType" | "experience" | "audience" | "channel",
  { eyebrow: string; heading: string }
> = {
  format: {
    eyebrow: "Question 1 of 8",
    heading: "What format is your course?",
  },
  access: {
    eyebrow: "Question 2 of 8",
    heading: "How much access do students get to you?",
  },
  category: {
    eyebrow: "Question 3 of 8",
    heading: "What's the course about?",
  },
  outcomeType: {
    eyebrow: "Question 4 of 8",
    heading: "What does a student walk away with?",
  },
  experience: {
    eyebrow: "Question 6 of 8",
    heading: "How established are you in this space?",
  },
  audience: {
    eyebrow: "Question 7 of 8",
    heading: "How big is your audience right now?",
  },
  channel: {
    eyebrow: "Question 8 of 8",
    heading: "Where will you sell it?",
  },
};

export const MONEY_VALUE_QUESTION = {
  eyebrow: "Question 5 of 8",
  heading: "What's that outcome worth in the first year?",
  sublabel: "A dollar figure the student earns or saves because they took your course.",
};

export const ALT_COST_QUESTION = {
  eyebrow: "Question 5 of 8",
  heading: "What would the alternative cost them?",
  credentialSublabel:
    "The price of the bootcamp, degree, or certification that gets the same result.",
  skillSublabel: "The price of hiring a pro, coach, or service to get the same result.",
};

// --- Email capture copy ------------------------------------------------------

export const EMAIL_CAPTURE_COPY = {
  headline: "You've got a number. Now you need the plan to hit it.",
  body: "Drop your email and I'll send you the implementation roadmap: how to structure the course for that price point, which platform fits your format, and the launch sequence that gets your first ten students without an audience.",
  buttonLabel: "Send my roadmap",
  successMessage: "On its way. Check your inbox in the next few minutes.",
  errorMessage: "Something went wrong sending that — try again in a moment.",
};

// --- Bottom-of-page CTA -------------------------------------------------------

export const LAUNCH_CTA_COPY = {
  eyebrow: "Lumon Launch",
  headline: "Priced it. Now launch it in 14 days.",
  body: "You know what your course is worth. Lumon Launch is the done-for-you build that gets it live in two weeks — a professional website, course platform, payments, email automation and AI-avatar lesson videos included. Flat fee from $2,500. Bring the expertise; we bring the launch.",
  buttonLabel: "See if your course qualifies →",
  buttonSubtext: "20-minute call. We'll tell you honestly if it's a fit.",
};
