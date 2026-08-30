// Delivery for course-calculator leads — adds the contact to the "Course
// Calculator Leads" list in Zoho Campaigns, with the quiz answers as custom
// fields. A Zoho Autoresponder configured on that list (Campaigns UI, not
// code) sends the actual roadmap-email sequence when a contact lands on it.
//
// Field names below must exactly match custom fields created on that list
// in Zoho Campaigns (Contacts → Manage Fields) — unrecognized keys are
// silently dropped by Zoho's API rather than rejected.
import { addContactToZohoList } from "@/lib/zoho-campaigns";

const CALCULATOR_LIST_KEY = process.env.ZOHO_CAMPAIGNS_CALCULATOR_LIST_KEY;

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
  if (!CALCULATOR_LIST_KEY) {
    throw new Error("ZOHO_CAMPAIGNS_CALCULATOR_LIST_KEY is not configured.");
  }

  const response = await addContactToZohoList({
    listKey: CALCULATOR_LIST_KEY,
    email: lead.email,
    firstName: lead.firstName,
    fields: {
      "Course Format": lead.format,
      "Course Category": lead.category,
      "Access Level": lead.access,
      "Outcome Type": lead.outcomeType,
      "Proof Score": lead.proofScore,
      "Price Low": lead.low,
      "Price High": lead.high,
      "Suggested Price": lead.anchor,
    },
  });

  console.log("[course-calculator-lead] added to Zoho Campaigns:", response);
}
