import { generateBriefing, type BriefingPayload } from "./briefing.ts";

/** Confirms only the configured backend's HTTP acknowledgement, never a final sale or email. */
export async function forwardBriefing(
  payload: BriefingPayload,
  webhook: string,
  token?: string,
  transport: typeof fetch = fetch,
) {
  const destination = new URL(webhook);
  if (destination.protocol !== "https:") throw new Error("HTTPS required");
  const response = await transport(destination, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      ...payload,
      briefing: generateBriefing(payload.fields, payload.context),
    }),
    signal: AbortSignal.timeout(10000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Delivery rejected");
}
