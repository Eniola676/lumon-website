// Simple lead notification: sends an email via Resend the moment either
// form is submitted, so submissions are visible immediately in an inbox —
// no dashboard to log into, no OAuth, no rate limits to manage.
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

// lumonstudiomail.com is verified as a sending domain in Resend — kept
// separate from lumonstudio.xyz, whose DNS is reserved for cold email
// infrastructure and shouldn't be touched by anything else.
const FROM_ADDRESS = "Lumon Studios <leads@lumonstudiomail.com>";

let client: Resend | null = null;

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export async function sendNotificationEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const resend = getClient();
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: CONTACT_EMAIL,
    subject,
    text,
    replyTo,
  });

  if (error) {
    throw new Error(`Resend send failed: ${JSON.stringify(error)}`);
  }
}
