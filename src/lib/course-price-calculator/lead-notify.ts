// Delivery for course-calculator leads — sends an email with the visitor's
// answers and computed price range so it's visible immediately, no
// dashboard required.
import { sendNotificationEmail } from "@/lib/notify";

export type CourseCalculatorLead = {
  firstName: string;
  email: string;
  format: string;
  category: string;
  access: string;
  outcomeType: string;
  proofScore: number;
  low: number;
  high: number;
  anchor: number;
};

export async function sendCourseCalculatorLead(lead: CourseCalculatorLead): Promise<void> {
  await sendNotificationEmail({
    replyTo: lead.email,
    subject: `Course calculator lead — ${lead.firstName}`,
    text: [
      `Name: ${lead.firstName}`,
      `Email: ${lead.email}`,
      "",
      `Format: ${lead.format}`,
      `Category: ${lead.category}`,
      `Access level: ${lead.access}`,
      `Outcome type: ${lead.outcomeType}`,
      `Proof score: ${lead.proofScore}`,
      "",
      `Price range: $${lead.low} – $${lead.high}`,
      `Suggested price: $${lead.anchor}`,
    ].join("\n"),
  });
}
