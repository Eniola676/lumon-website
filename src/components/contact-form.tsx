"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "tobi@lumonstudio.xyz";

const PROGRAM_OPTIONS = [
  "Lumon Launch",
  "Lumon Scale",
  "Lumon Enterprise",
  "Not sure yet",
];

const STEPS = ["name", "email", "program", "message"] as const;
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

export function ContactForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [customProgram, setCustomProgram] = useState(false);
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstMount = useRef(true);

  const step: Step = STEPS[stepIndex];

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (done) return;
    if (step === "message") textareaRef.current?.focus();
    else inputRef.current?.focus();
  }, [step, done, customProgram]);

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
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

  function selectProgram(value: string) {
    setProgram(value);
    window.setTimeout(goNext, 200);
  }

  function handleProgramTypedSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!program.trim()) return;
    goNext();
  }

  function submitAll() {
    const subject = "Lumon Studios inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Program: ${program || "Not specified"}`,
      "",
      "Project details:",
      message || "(not provided)",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setDone(true);
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
      <div className="rounded-2xl border border-[#e9e9ea] bg-white p-8 sm:p-10">
        <div className="flex size-12 items-center justify-center rounded-full bg-black text-white">
          <Check className="size-5" />
        </div>
        <h3 className="mt-5 text-2xl font-normal tracking-tight sm:text-3xl">
          Your email client should be open now.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          If nothing happened, reach out directly at{" "}
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
    <div className="rounded-2xl border border-[#e9e9ea] bg-white p-8 sm:p-10">
      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#e9e9ea]">
        <div
          className="h-full rounded-full bg-black transition-all duration-300 ease-out"
          style={{
            width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
          }}
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

      {step === "name" && (
        <form key="name" onSubmit={handleNameSubmit} className="mt-6">
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
        <form key="email" onSubmit={handleEmailSubmit} className="mt-6">
          <label
            htmlFor="cf-email"
            className="block text-2xl font-normal tracking-tight sm:text-3xl"
          >
            What&rsquo;s the best email to reach you, {name.split(" ")[0] || "there"}?
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

      {step === "program" && (
        <div className="mt-6">
          <p className="text-2xl font-normal tracking-tight sm:text-3xl">
            Which program interests you?
          </p>

          {!customProgram ? (
            <>
              <div className="mt-6 space-y-3">
                {PROGRAM_OPTIONS.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectProgram(option)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-base transition-colors ${
                      program === option
                        ? "border-black bg-black text-white"
                        : "border-[#e9e9ea] bg-white hover:border-black"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs ${
                        program === option
                          ? "border-white/40 text-white"
                          : "border-[#e9e9ea] text-gray-400"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
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
            <form onSubmit={handleProgramTypedSubmit} className="mt-6">
              <input
                ref={inputRef}
                type="text"
                required
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className={inputClasses}
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

      {step === "message" && (
        <form key="message" onSubmit={handleMessageSubmit} className="mt-6">
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
          <KeyHint>Shift + Enter for a new line · ⌘/Ctrl + Enter to send</KeyHint>
          <Button type="submit" variant="primary" className="mt-6">
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}
