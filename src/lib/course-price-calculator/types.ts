export type FormatId =
  | "mini"
  | "self-paced"
  | "comprehensive"
  | "cohort"
  | "certification";

export type CategoryId = "business" | "tech" | "health" | "growth" | "creative";

export type AccessId =
  | "self-paced-only"
  | "community"
  | "group-coaching"
  | "one-on-one";

export type ExperienceId = "starting" | "some-results" | "established" | "authority";

export type AudienceId = "none" | "under-1k" | "1k-10k" | "10k-50k" | "50k-plus";

export type OutcomeTypeId = "money" | "credential" | "skill";

export type MoneyValueId = "lt-1k" | "1k-5k" | "5k-15k" | "15k-50k" | "50k-plus";

export type AltCostId = "lt-200" | "200-1k" | "1k-5k" | "5k-plus";

export type ChannelId = "own-site" | "marketplace";

export type Answers = {
  format?: FormatId;
  access?: AccessId;
  category?: CategoryId;
  outcomeType?: OutcomeTypeId;
  moneyValue?: MoneyValueId;
  altCost?: AltCostId;
  experience?: ExperienceId;
  audience?: AudienceId;
  channel?: ChannelId;
};

// The subset of Answers guaranteed present once the quiz path is complete —
// narrowed by isComplete() before calculatePrice() ever runs.
export type CompleteAnswers = Required<Pick<
  Answers,
  "format" | "access" | "category" | "outcomeType" | "experience" | "audience" | "channel"
>> &
  Pick<Answers, "moneyValue" | "altCost">;

export type FlagTone = "warning" | "positive" | "info";

export type Flag = {
  tone: FlagTone;
  message: string;
};

export type CalculationResult = {
  low: number;
  anchor: number;
  high: number;
  bandMin: number;
  bandMax: number;
  ceiling: number;
  proofScore: number;
  flags: Flag[];
  paymentPlan: string;
  whyThisNumber: string[];
  footnote: string;
};

export type StepId =
  | "format"
  | "access"
  | "category"
  | "outcomeType"
  | "moneyValue"
  | "altCost"
  | "experience"
  | "audience"
  | "channel";
