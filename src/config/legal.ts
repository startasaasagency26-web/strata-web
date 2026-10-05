import { KIT } from "./kit.ts";

/**
 * Facts the legal pages state. Verified against the SSM certificate and with
 * Nick (2026-10-05). Deliberately no postal address: the registered address is
 * a private home and must not be published.
 */
export const LEGAL = {
  businessName: "Strata Growth Technologies",
  registrationNumber: "202603196433 (CA0424990-H)",
  registrationAct: "Registration of Businesses Act 1956",
  kit: {
    name: KIT.name,
    gumroadUrl: KIT.listingUrl,
    refundDays: KIT.refundDays,
  },
  lastUpdated: "5 October 2026",
  lastUpdatedIso: "2026-10-05",
} as const;
