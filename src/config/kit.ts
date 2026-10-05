/**
 * The Solo Ops Kit. One place for the kit's links.
 *
 * `checkoutUrl` is what every "Get the kit" button uses. It is the plain
 * Gumroad listing for now; swap in the kit-page tracking link here when it is
 * registered and every button follows. `listingUrl` stays the plain listing
 * (used by the legal pages).
 */
const listingUrl = "https://stratatechnologies.gumroad.com/l/soloopskit";

export const KIT = {
  name: "The Solo Ops Kit",
  listingUrl,
  checkoutUrl: listingUrl,
  refundDays: 14,
} as const;
