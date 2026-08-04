"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "hello@lumonstudios.com";

const inputClasses =
  "w-full rounded-xl border border-[#e9e9ea] bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-black focus:outline-none";

export function ContactForm() {
  const [program, setProgram] = useState("Not sure yet");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString() ?? "";
    const email = data.get("email")?.toString() ?? "";
    const message = data.get("message")?.toString() ?? "";

    const subject = "Lumon Studios inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Program: ${program}`,
      "",
      "Project details:",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClasses}
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="program" className="mb-2 block text-sm font-medium">
          Which program interests you?
        </label>
        <select
          id="program"
          name="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={inputClasses}
        >
          <option>Lumon Launch</option>
          <option>Lumon Scale</option>
          <option>Lumon Enterprise</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Tell us about your project.
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClasses}
          placeholder="What are you trying to build?"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
