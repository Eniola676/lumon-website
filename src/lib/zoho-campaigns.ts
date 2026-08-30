// Thin client for Zoho Campaigns' contact-add API. Access tokens expire in
// ~1hr, so rather than cache one across requests (fragile in a serverless
// environment with no shared memory between invocations), we just trade the
// long-lived refresh token for a fresh access token on every call — one
// extra HTTP round-trip, but simple and always correct.
const TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";
const API_BASE = "https://campaigns.zoho.com/api/v1.1";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CAMPAIGNS_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CAMPAIGNS_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_CAMPAIGNS_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho Campaigns env vars are not fully configured.");
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const response = await fetch(TOKEN_URL, { method: "POST", body: params });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(data)}`);
  }

  return data.access_token as string;
}

export type ZohoContactFields = Record<string, string | number>;

/** Adds (or updates) a contact on a Zoho Campaigns list. `fields` keys must
 * exactly match custom field names already created on that list in Zoho —
 * unrecognized keys are silently dropped by Zoho's API, not rejected. */
export async function addContactToZohoList({
  listKey,
  email,
  firstName,
  fields = {},
}: {
  listKey: string;
  email: string;
  firstName?: string;
  fields?: ZohoContactFields;
}): Promise<unknown> {
  const accessToken = await getAccessToken();

  const contactinfo: ZohoContactFields = { "Contact Email": email, ...fields };
  if (firstName) contactinfo["First Name"] = firstName;

  const params = new URLSearchParams({
    resfmt: "JSON",
    listkey: listKey,
    contactinfo: JSON.stringify(contactinfo),
  });

  const response = await fetch(`${API_BASE}/json/listsubscribe?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();

  // Zoho returns HTTP 200 even on some logical failures, so check the body
  // too. We log the raw shape either way while this integration is new —
  // Zoho's exact success schema isn't fully nailed down from docs alone.
  const status = typeof data?.status === "string" ? data.status.toLowerCase() : undefined;
  if (!response.ok || status === "error" || status === "failure") {
    throw new Error(`Zoho Campaigns listsubscribe failed: ${JSON.stringify(data)}`);
  }

  return data;
}
