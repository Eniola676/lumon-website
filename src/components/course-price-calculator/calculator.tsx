"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  ACCESS_OPTIONS,
  ALT_COST_OPTIONS,
  ALT_COST_QUESTION,
  AUDIENCE_OPTIONS,
  CATEGORY_OPTIONS,
  CHANNEL_OPTIONS,
  EXPERIENCE_OPTIONS,
  FORMAT_OPTIONS,
  MONEY_VALUE_OPTIONS,
  MONEY_VALUE_QUESTION,
  OUTCOME_TYPE_OPTIONS,
  QUESTION_COPY,
} from "@/lib/course-price-calculator/constants";
import { calculatePrice, getNextStep, isComplete, stepIndex, TOTAL_STEPS } from "@/lib/course-price-calculator/logic";
import type { Answers, StepId } from "@/lib/course-price-calculator/types";
import { OptionGrid, type Option } from "./option-grid";
import { ProgressBar } from "./progress-bar";
import { StepTransition } from "./step-transition";
import { ResultPanel } from "./result-panel";

const ADVANCE_DELAY_MS = 350;

function optionsFor(step: StepId): { legend: string; options: Option[] } {
  switch (step) {
    case "format":
      return { legend: QUESTION_COPY.format.heading, options: FORMAT_OPTIONS };
    case "access":
      return { legend: QUESTION_COPY.access.heading, options: ACCESS_OPTIONS };
    case "category":
      return { legend: QUESTION_COPY.category.heading, options: CATEGORY_OPTIONS };
    case "outcomeType":
      return { legend: QUESTION_COPY.outcomeType.heading, options: OUTCOME_TYPE_OPTIONS };
    case "moneyValue":
      return { legend: MONEY_VALUE_QUESTION.heading, options: MONEY_VALUE_OPTIONS };
    case "altCost":
      return { legend: ALT_COST_QUESTION.heading, options: ALT_COST_OPTIONS };
    case "experience":
      return { legend: QUESTION_COPY.experience.heading, options: EXPERIENCE_OPTIONS };
    case "audience":
      return { legend: QUESTION_COPY.audience.heading, options: AUDIENCE_OPTIONS };
    case "channel":
      return { legend: QUESTION_COPY.channel.heading, options: CHANNEL_OPTIONS };
  }
}

function headingFor(step: StepId, answers: Answers): { eyebrow: string; heading: string; sublabel?: string } {
  if (step === "moneyValue") return MONEY_VALUE_QUESTION;
  if (step === "altCost") {
    return {
      ...ALT_COST_QUESTION,
      sublabel:
        answers.outcomeType === "credential"
          ? ALT_COST_QUESTION.credentialSublabel
          : ALT_COST_QUESTION.skillSublabel,
    };
  }
  return QUESTION_COPY[step as keyof typeof QUESTION_COPY];
}

function answerKeyFor(step: StepId): keyof Answers {
  return step;
}

export function CoursePriceCalculator() {
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<StepId[]>([]);
  const [currentStep, setCurrentStep] = useState<StepId | null>("format");
  const [transitioning, setTransitioning] = useState(false);

  function handleSelect(step: StepId, id: string) {
    if (transitioning) return;
    const key = answerKeyFor(step);
    const nextAnswers: Answers = { ...answers, [key]: id };
    setAnswers(nextAnswers);
    setTransitioning(true);

    window.setTimeout(() => {
      setHistory((h) => [...h, step]);
      setCurrentStep(getNextStep(step, nextAnswers));
      setTransitioning(false);
    }, ADVANCE_DELAY_MS);
  }

  function handleBack() {
    if (history.length === 0) return;
    const prevHistory = [...history];
    const prevStep = prevHistory.pop()!;
    setHistory(prevHistory);
    setCurrentStep(prevStep);
  }

  function handleRestart() {
    setAnswers({});
    setHistory([]);
    setCurrentStep("format");
  }

  if (currentStep === null && isComplete(answers)) {
    const result = calculatePrice(answers);
    return <ResultPanel answers={answers} result={result} onRestart={handleRestart} />;
  }

  if (currentStep === null) return null;

  const { legend, options } = optionsFor(currentStep);
  const { eyebrow, heading, sublabel } = headingFor(currentStep, answers);
  const selectedId = answers[answerKeyFor(currentStep)];
  const currentIndex = stepIndex(currentStep, answers);

  return (
    <div className="rounded-3xl bg-[#070707] p-6 text-white shadow-2xl shadow-black/25 ring-1 ring-white/10 sm:p-10">
      <ProgressBar current={currentIndex} total={TOTAL_STEPS} />

      <div className="mt-6 flex min-h-[1.5rem] items-center">
        {history.length > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        ) : null}
      </div>

      <StepTransition stepKey={currentStep}>
        <p className="mt-4 font-mono text-xs tracking-wide text-white/50 uppercase">{eyebrow}</p>
        <h2 className="mt-2 text-2xl leading-[1.15] font-normal tracking-tight sm:text-3xl">
          {heading}
        </h2>
        {sublabel && <p className="mt-2 text-sm text-white/50 sm:text-base">{sublabel}</p>}

        <div className="mt-8" aria-live="polite">
          <OptionGrid
            legend={legend}
            options={options}
            selectedId={selectedId}
            onSelect={(id) => handleSelect(currentStep, id)}
          />
        </div>
      </StepTransition>
    </div>
  );
}
