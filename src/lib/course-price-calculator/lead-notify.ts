// Delivery for course-calculator leads. Not wired to Zoho yet — this is a
// placeholder so /api/course-calculator-lead has something real to call.
// Swap the body of sendCourseCalculatorLead() for one of:
//
//   - Zoho Mail SMTP: send via nodemailer using host smtp.zoho.com (or
//     smtp.zoho.eu), a Zoho Mail address, and an app-specific password
//     (Zoho Mail → Settings → Security → App Passwords). Needs env vars
//     ZOHO_SMTP_HOST, ZOHO_SMTP_USER, ZOHO_SMTP_APP_PASSWORD.
//   - Zoho Campaigns: POST the lead to the Campaigns "add contact to list"
//     API with the quiz answers as custom merge fields, so an autoresponder
//     workflow sends the roadmap email. Needs a Zoho API console app
//     (client id/secret) + refresh token + list key.
//   - Zoho CRM: create a Lead record via the CRM API with the answers as
//     custom fields, for manual follow-up. Needs CRM OAuth credentials.
//
// Until one of those is wired in, this just logs server-side so submissions
// aren't silently dropped — check your hosting provider's function logs.
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
  // TODO: replace with a real Zoho integration (see options above).
  console.log("[course-calculator-lead] received (not yet delivered to Zoho):", lead);
}
