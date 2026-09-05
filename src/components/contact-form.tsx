"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/site";

const PAIN_OPTIONS = [
  "My website isn't built to convert.",
  "I don't have a system to sell my course yet.",
  "My tools are scattered and don't talk to each other.",
];

const PROGRAM_OPTIONS = [
  "Lumon Launch",
  "Lumon Scale",
  "Lumon Enterprise",
  "Not sure yet",
];

const STEPS = ["pain", "program", "name", "email", "message"] as const;
type Step = (typeof STEPS)[number];

const inputClasses =
  "w-full rounded-xl border border-[#e9e9ea] bg-white px-4 py-4 text-lg placeholder:text-gray-400 focus:border-black focus:outline-none";

function KeyHint({ children }: { children: string }) {
  return (
    <p className="mt-3 font-mono text-xs tracking-wide text-gray-400">
      {children}
    </p>
  );
}

function OptionButton({
  label,
  index,
  selected,
  onClick,
}: {
  label: string;
  index: number;
  selected: boolean;
  onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        gsap.fromTo(
          event.currentTarget,
          { scale: 0.97 },
          { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" }
        );
        onClick(event);
      }}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-base transition-colors ${
        selected
          ? "border-black bg-black text-white"
          : "border-[#e9e9ea] bg-white hover:border-black"
      }`}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs ${
          selected
            ? "border-white/40 text-white"
            : "border-[#e9e9ea] text-gray-400"
        }`}
      >
        {String.fromCharCode(65 + index)}
      </span>
      {label}
    </button>
  );
}

export function ContactForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [pain, setPain] = useState("");
  const [customPain, setCustomPain] = useState(false);
  const [program, setProgram] = useState("");
  const [customProgram, setCustomProgram] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstMount = useRef(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<"forward" | "backward">("forward");
  const cardRef = useRef<HTMLDivElement>(null);

  const step: Step = STEPS[stepIndex];

  // Card entrance, once.
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  // Animate the current step in whenever it changes (and focus its input).
  useLayoutEffect(() => {
    if (contentRef.current) {
      const offset = directionRef.current === "forward" ? 28 : -28;
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: offset },
        { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }
      );
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (done) return;
    if (step === "message") textareaRef.current?.focus();
    else inputRef.current?.focus();
  }, [step, done, customPain, customProgram]);

  // Animate the progress bar fill.
  useEffect(() => {
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, {
        width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [stepIndex]);

  function transitionTo(nextIndex: number, direction: "forward" | "backward") {
    if (!contentRef.current) {
      setStepIndex(nextIndex);
      return;
    }
    directionRef.current = direction;
    const exitOffset = direction === "forward" ? -28 : 28;
    gsap.to(contentRef.current, {
      opacity: 0,
      x: exitOffset,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setStepIndex(nextIndex),
    });
  }

  function goNext() {
    transitionTo(Math.min(stepIndex + 1, STEPS.length - 1), "forward");
  }

  function goBack() {
    transitionTo(Math.max(stepIndex - 1, 0), "backward");
  }

  function selectPain(value: string) {
    setPain(value);
    window.setTimeout(goNext, 220);
  }

  function handlePainTypedSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pain.trim()) return;
    goNext();
  }

  function selectProgram(value: string) {
    setProgram(value);
    window.setTimeout(goNext, 220);
  }

  function handleProgramTypedSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!program.trim()) return;
    goNext();
  }

  function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    goNext();
  }

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    goNext();
  }

  async function submitAll() {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch("/api/contact-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pain, program, message }),
      });
      if (!response.ok) throw new Error("request failed");

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -12,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setDone(true),
        });
      } else {
        setDone(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitAll();
  }

  function handleMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      submitAll();
    }
  }

  if (done) {
    return (
      <div
        ref={cardRef}
        className="rounded-2xl border border-[#e9e9ea] bg-white p-8 sm:p-10"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-black text-white">
          <Check className="size-5" />
        </div>
        <h3 className="mt-5 text-2xl font-normal tracking-tight sm:text-3xl">
          Sent. I&rsquo;ll reply within one business day.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          You can also reach out directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:text-black"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStepIndex(0);
          }}
          className="mt-6 text-sm font-medium underline hover:text-black"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-2xl border border-[#e9e9ea] bg-white p-8 sm:p-10"
    >
      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#e9e9ea]">
        <div
          ref={progressFillRef}
          className="h-full rounded-full bg-black"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-xs tracking-wide text-gray-400 uppercase">
          Question {stepIndex + 1} of {STEPS.length}
        </p>
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>
        )}
      </div>

      <div ref={contentRef} className="mt-6">
        {step === "pain" && (
          <div>
            <p className="text-2xl font-normal tracking-tight sm:text-3xl">
              What&rsquo;s slowing you down right now?
            </p>

            {!customPain ? (
              <>
                <div className="mt-6 space-y-3">
                  {PAIN_OPTIONS.map((option, index) => (
                    <OptionButton
                      key={option}
                      label={option}
                      index={index}
                      selected={pain === option}
                      onClick={() => selectPain(option)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPain("");
                    setCustomPain(true);
                  }}
                  className="mt-4 text-sm text-gray-500 underline hover:text-black"
                >
                  Or tell us in your own words
                </button>
              </>
            ) : (
              <form onSubmit={handlePainTypedSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={pain}
                  onChange={(e) => setPain(e.target.value)}
                  className={`${inputClasses} mt-6`}
                  placeholder="What's slowing you down?"
                />
                <KeyHint>Press Enter ↵</KeyHint>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button type="submit" variant="primary">
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPain(false);
                      setPain("");
                    }}
                    className="text-sm text-gray-500 underline hover:text-black"
                  >
                    Choose from options instead
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {step === "program" && (
          <div>
            <p className="text-2xl font-normal tracking-tight sm:text-3xl">
              Which program interests you?
            </p>

            {!customProgram ? (
              <>
                <div className="mt-6 space-y-3">
                  {PROGRAM_OPTIONS.map((option, index) => (
                    <OptionButton
                      key={option}
                      label={option}
                      index={index}
                      selected={program === option}
                      onClick={() => selectProgram(option)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProgram("");
                    setCustomProgram(true);
                  }}
                  className="mt-4 text-sm text-gray-500 underline hover:text-black"
                >
                  Or type your own answer instead
                </button>
              </>
            ) : (
              <form onSubmit={handleProgramTypedSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className={`${inputClasses} mt-6`}
                  placeholder="Tell us what you're looking for"
                />
                <KeyHint>Press Enter ↵</KeyHint>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button type="submit" variant="primary">
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomProgram(false);
                      setProgram("");
                    }}
                    className="text-sm text-gray-500 underline hover:text-black"
                  >
                    Choose from options instead
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {step === "name" && (
          <form onSubmit={handleNameSubmit}>
            <label
              htmlFor="cf-name"
              className="block text-2xl font-normal tracking-tight sm:text-3xl"
            >
              What&rsquo;s your name?
            </label>
            <input
              ref={inputRef}
              id="cf-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputClasses} mt-6`}
              placeholder="Jane Doe"
            />
            <KeyHint>Press Enter ↵</KeyHint>
            <Button type="submit" variant="primary" className="mt-6">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit}>
            <label
              htmlFor="cf-email"
              className="block text-2xl font-normal tracking-tight sm:text-3xl"
            >
              What&rsquo;s the best email to reach you,{" "}
              {name.split(" ")[0] || "there"}?
            </label>
            <input
              ref={inputRef}
              id="cf-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClasses} mt-6`}
              placeholder="jane@example.com"
            />
            <KeyHint>Press Enter ↵</KeyHint>
            <Button type="submit" variant="primary" className="mt-6">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}

        {step === "message" && (
          <form onSubmit={handleMessageSubmit}>
            <label
              htmlFor="cf-message"
              className="block text-2xl font-normal tracking-tight sm:text-3xl"
            >
              Anything you&rsquo;d like to add?
            </label>
            <textarea
              ref={textareaRef}
              id="cf-message"
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleMessageKeyDown}
              className={`${inputClasses} mt-6`}
              placeholder="What are you trying to build? (optional)"
            />
            <KeyHint>
              Shift + Enter for a new line · ⌘/Ctrl + Enter to send
            </KeyHint>
            <Button type="submit" variant="primary" className="mt-6" disabled={submitting}>
              {submitting ? "Sending…" : "Send Message"}
            </Button>
            {submitError && (
              <p className="mt-3 text-sm text-red-600">
                Something went wrong sending that — try again, or email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">
                  {CONTACT_EMAIL}
                </a>{" "}
                directly.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
