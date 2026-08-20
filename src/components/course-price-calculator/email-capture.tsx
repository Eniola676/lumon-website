"use client";

import { useState, type FormEvent } from "react";
import { EMAIL_CAPTURE_COPY } from "@/lib/course-price-calculator/constants";

type LeadFields = {
  format: string;
  category: string;
  access: string;
  outcomeType: string;
  proofScore: number;
  low: number;
  high: number;
  anchor: number;
};

export function EmailCapture({ leadFields }: { leadFields: LeadFields }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/course-calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, ...leadFields }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[#e9e9ea] bg-[#fbfbfb] p-6 sm:p-10">
        <p className="text-lg font-medium">{EMAIL_CAPTURE_COPY.successMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#e9e9ea] bg-[#fbfbfb] p-6 sm:p-10">
      <h3 className="text-2xl leading-[1.2] font-normal tracking-tight sm:text-3xl">
        {EMAIL_CAPTURE_COPY.headline}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
        {EMAIL_CAPTURE_COPY.body}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* Honeypot — hidden from real visitors, bots tend to fill every field. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-full border border-[#e9e9ea] bg-white px-5 py-3 text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none sm:w-40"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-full border border-[#e9e9ea] bg-white px-5 py-3 text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors duration-200 hover:bg-[#1d1f2c] disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : EMAIL_CAPTURE_COPY.buttonLabel}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{EMAIL_CAPTURE_COPY.errorMessage}</p>
      )}
    </div>
  );
}
