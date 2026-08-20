import { NextResponse } from "next/server";
import { sendCourseCalculatorLead } from "@/lib/course-price-calculator/lead-notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: a real visitor never fills this hidden field in.
  if (isNonEmptyString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const { firstName, email, format, category, access, outcomeType, proofScore, low, high, anchor } =
    body;

  if (!isNonEmptyString(firstName) || !isNonEmptyString(email) || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }
  if (
    !isNonEmptyString(format) ||
    !isNonEmptyString(category) ||
    !isNonEmptyString(access) ||
    !isNonEmptyString(outcomeType) ||
    !isFiniteNumber(proofScore) ||
    !isFiniteNumber(low) ||
    !isFiniteNumber(high) ||
    !isFiniteNumber(anchor)
  ) {
    return NextResponse.json({ error: "Missing calculator answers." }, { status: 400 });
  }

  try {
    await sendCourseCalculatorLead({
      firstName: firstName.trim(),
      email: email.trim(),
      format,
      category,
      access,
      outcomeType,
      proofScore,
      low,
      high,
      anchor,
    });
  } catch (error) {
    console.error("[course-calculator-lead] delivery failed:", error);
    return NextResponse.json({ error: "Could not send that right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
