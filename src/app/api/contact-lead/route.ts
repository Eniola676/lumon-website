import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asString(value: unknown, fallback = "Not specified"): string {
  return isNonEmptyString(value) ? value.trim() : fallback;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, pain, program, message } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  try {
    await sendNotificationEmail({
      replyTo: trimmedEmail,
      subject: `Lumon Studios inquiry — ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Pain point: ${asString(pain)}`,
        `Program: ${asString(program)}`,
        "",
        "Project details:",
        asString(message, "(not provided)"),
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact-lead] email delivery failed:", error);
    return NextResponse.json({ error: "Could not send that right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
