import { NextResponse } from "next/server";
import { addContactToZohoList } from "@/lib/zoho-campaigns";

const CONTACT_LIST_KEY = process.env.ZOHO_CAMPAIGNS_CONTACT_LIST_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  if (!CONTACT_LIST_KEY) {
    console.error("[contact-lead] ZOHO_CAMPAIGNS_CONTACT_LIST_KEY is not configured.");
    return NextResponse.json({ error: "Lead capture is not configured." }, { status: 500 });
  }

  try {
    await addContactToZohoList({
      listKey: CONTACT_LIST_KEY,
      email: email.trim(),
      firstName: name.trim(),
    });
  } catch (error) {
    console.error("[contact-lead] delivery failed:", error);
    return NextResponse.json({ error: "Could not save that right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
