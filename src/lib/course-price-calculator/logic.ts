// Pure calculation logic — no side effects, no DOM, no React. Every number
// this file uses comes from constants.ts; nothing here should be a magic
// number. See constants.ts to tune the model.
import {
  ACCESS_OPTIONS,
  ALT_COST_OPTIONS,
  AUDIENCE_OPTIONS,
  CATEGORY_OPTIONS,
  CEILING_FLOOR_MULTIPLIER,
  CHANNEL_OPTIONS,
  CREDENTIAL_CEILING_MULTIPLIER,
  EXPERIENCE_OPTIONS,
  FLAG_COPY,
  FORMAT_OPTIONS,
  HIGH_MULTIPLIER,
  LOW_MULTIPLIER,
  MARKETPLACE_CAP,
  MONEY_CEILING_MULTIPLIER,
  MONEY_VALUE_OPTIONS,
  OUTCOME_TYPE_OPTIONS,
  PAYMENT_PLAN_BELOW_THRESHOLD_COPY,
  PAYMENT_PLAN_MARKUP,
  PAYMENT_PLAN_THRESHOLD,
  PROOF_DIVISOR,
  RESULT_FOOTNOTE,
  SKILL_CEILING_MULTIPLIER,
  UNDERPRICED_CEILING_MULTIPLIER,
} from "./constants";
import type { Answers, CalculationResult, CompleteAnswers, Flag, StepId } from "./types";

function find<T extends { id: string }>(options: T[], id: string | undefined): T {
  const found = options.find((o) => o.id === id);
  if (!found) throw new Error(`calculatePrice: no option matched id "${id}"`);
  return found;
}

/** Charm-round per the site's pricing convention: <100 → nearest odd,
 * 100–999 → nearest 10 minus 3, 1000+ → nearest 50 minus 3. */
export function charmRound(value: number): number {
  const v = Math.max(value, 0);
  if (v < 100) {
    let rounded = Math.round(v);
    if (rounded % 2 === 0) {
      const lower = rounded - 1;
      const upper = rounded + 1;
      rounded = Math.abs(v - lower) <= Math.abs(v - upper) ? lower : upper;
    }
    return Math.max(rounded, 1);
  }
  if (v < 1000) {
    return Math.round(v / 10) * 10 - 3;
  }
  return Math.round(v / 50) * 50 - 3;
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Which question comes after `step`, given the answers so far. Branches
 * once, at outcomeType → moneyValue | altCost. Returns null past the last
 * step (quiz complete). */
export function getNextStep(step: StepId | null, answers: Answers): StepId | null {
  const order: StepId[] = ["format", "access", "category", "outcomeType"];
  if (step === null) return order[0];

  const branchStep: StepId = answers.outcomeType === "money" ? "moneyValue" : "altCost";
  const full: StepId[] = [
    "format",
    "access",
    "category",
    "outcomeType",
    branchStep,
    "experience",
    "audience",
    "channel",
  ];
  const idx = full.indexOf(step);
  if (idx === -1 || idx === full.length - 1) return null;
  return full[idx + 1];
}

export const TOTAL_STEPS = 8;

export function stepIndex(step: StepId, answers: Answers): number {
  const branchStep: StepId = answers.outcomeType === "money" ? "moneyValue" : "altCost";
  const full: StepId[] = [
    "format",
    "access",
    "category",
    "outcomeType",
    branchStep,
    "experience",
    "audience",
    "channel",
  ];
  return full.indexOf(step);
}

export function isComplete(answers: Answers): answers is CompleteAnswers {
  if (
    !answers.format ||
    !answers.access ||
    !answers.category ||
    !answers.outcomeType ||
    !answers.experience ||
    !answers.audience ||
    !answers.channel
  ) {
    return false;
  }
  if (answers.outcomeType === "money") return !!answers.moneyValue;
  return !!answers.altCost;
}

export function calculatePrice(answers: CompleteAnswers): CalculationResult {
  const format = find(FORMAT_OPTIONS, answers.format);
  const category = find(CATEGORY_OPTIONS, answers.category);
  const access = find(ACCESS_OPTIONS, answers.access);
  const experience = find(EXPERIENCE_OPTIONS, answers.experience);
  const audience = find(AUDIENCE_OPTIONS, answers.audience);
  const channel = find(CHANNEL_OPTIONS, answers.channel);

  // Anchor 1 — market band.
  const bandMin = format.baseMin * category.multiplier * access.multiplier;
  const bandMax = format.baseMax * category.multiplier * access.multiplier;

  // Anchor 2 — proof score positions the anchor inside the band.
  const proofScore = (experience.points + audience.points) / PROOF_DIVISOR;
  const anchorRaw = bandMin + proofScore * (bandMax - bandMin);
  let low = anchorRaw * LOW_MULTIPLIER;
  let anchor = anchorRaw;
  let high = anchorRaw * HIGH_MULTIPLIER;

  // Anchor 3 — value ceiling.
  let ceiling: number;
  if (answers.outcomeType === "money") {
    const money = find(MONEY_VALUE_OPTIONS, answers.moneyValue);
    ceiling = money.value * MONEY_CEILING_MULTIPLIER;
  } else {
    const alt = find(ALT_COST_OPTIONS, answers.altCost);
    ceiling =
      alt.value *
      (answers.outcomeType === "credential"
        ? CREDENTIAL_CEILING_MULTIPLIER
        : SKILL_CEILING_MULTIPLIER);
  }

  const flags: Flag[] = [];

  if (high > ceiling) {
    const floor = bandMin * CEILING_FLOOR_MULTIPLIER;
    const clampedHigh = Math.max(ceiling, floor);
    const scale = high > 0 ? clampedHigh / high : 1;
    high = clampedHigh;
    anchor = anchor * scale;
    low = low * scale;
    flags.push({ tone: "warning", message: FLAG_COPY.ceilingBelowHigh });
  } else if (ceiling > high * UNDERPRICED_CEILING_MULTIPLIER) {
    flags.push({ tone: "positive", message: FLAG_COPY.ceilingFarAboveHigh });
  }

  // Sales channel — marketplace caps the top of the range.
  if (channel.id === "marketplace" && high > MARKETPLACE_CAP) {
    high = MARKETPLACE_CAP;
    if (anchor > high) anchor = high;
    if (low > anchor) low = anchor;
    flags.push({ tone: "info", message: FLAG_COPY.marketplaceCap });
  }

  const lowR = charmRound(low);
  const anchorR = charmRound(anchor);
  const highR = charmRound(Math.max(high, lowR));

  const paymentPlan =
    anchorR >= PAYMENT_PLAN_THRESHOLD
      ? `3 × ${formatUSD(Math.round((anchorR * PAYMENT_PLAN_MARKUP) / 3))}`
      : PAYMENT_PLAN_BELOW_THRESHOLD_COPY;

  const whyThisNumber = buildWhyThisNumber({
    format,
    category,
    access,
    proofScore,
    ceilingApplied: flags.some((f) => f.tone === "warning"),
    ceiling,
    high: highR,
  });

  return {
    low: lowR,
    anchor: anchorR,
    high: highR,
    bandMin,
    bandMax,
    ceiling,
    proofScore,
    flags,
    paymentPlan,
    whyThisNumber,
    footnote: RESULT_FOOTNOTE,
  };
}

/** Human-readable labels for the hidden fields sent alongside the email
 * capture, so a follow-up email (or whoever reads the lead) doesn't have to
 * decode option ids. */
export function buildLeadFields(answers: CompleteAnswers, result: CalculationResult) {
  return {
    format: find(FORMAT_OPTIONS, answers.format).label,
    category: find(CATEGORY_OPTIONS, answers.category).label,
    access: find(ACCESS_OPTIONS, answers.access).label,
    outcomeType: find(OUTCOME_TYPE_OPTIONS, answers.outcomeType).label,
    proofScore: result.proofScore,
    low: result.low,
    high: result.high,
    anchor: result.anchor,
  };
}

function buildWhyThisNumber({
  format,
  category,
  access,
  proofScore,
  ceilingApplied,
  ceiling,
  high,
}: {
  format: (typeof FORMAT_OPTIONS)[number];
  category: (typeof CATEGORY_OPTIONS)[number];
  access: (typeof ACCESS_OPTIONS)[number];
  proofScore: number;
  ceilingApplied: boolean;
  ceiling: number;
  high: number;
}): string[] {
  return [
    `${format.label} (${format.sublabel.toLowerCase()}) sets a base range of ${formatUSD(
      format.baseMin,
    )}–${formatUSD(format.baseMax)}.`,
    `${category.label} multiplies that by ${category.multiplier}×.`,
    `${access.label} multiplies it again by ${access.multiplier}×.`,
    `Your experience and audience place you ${Math.round(proofScore * 100)}% of the way up that band.`,
    ceilingApplied
      ? `The outcome you deliver caps the top of your range at ${formatUSD(ceiling)} — the promise, not the format, is the limit here.`
      : `The value your student walks away with comfortably supports a top price of ${formatUSD(high)}.`,
  ];
}
