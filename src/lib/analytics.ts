/**
 * Analytics wiring.
 *
 * Two destinations, deliberately separate:
 *
 * 1. Vercel Web Analytics — the always-on instrument. Page views are collected
 *    by the <Analytics /> component in App.tsx, which patches the History API
 *    and therefore already sees client-side route changes. Do NOT also send
 *    page views from here or every navigation is counted twice.
 *
 * 2. Meta Pixel — optional, and off unless VITE_META_PIXEL_ID is set. Paid
 *    acquisition is currently retired, so in practice this stays dormant. With
 *    no id every pixel path below is a no-op: nothing loads, nothing is sent.
 *    That keeps local dev and preview builds clean and means the repo never
 *    carries a hardcoded id.
 *
 * The conversion that actually matters is a visitor leaving for WhatsApp. That
 * is the closest measurable proxy for a qualified discovery conversation, which
 * is the primary business metric — so it is sent to both destinations.
 */

import { track } from "@vercel/analytics";

type FbqFn = {
  (...args: unknown[]): void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: FbqFn;
  callMethod?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

const hasPixel = () => Boolean(PIXEL_ID) && typeof window !== "undefined";

/**
 * Injects the Meta Pixel base code and fires the initial PageView.
 * Safe to call more than once — it returns early if already initialised.
 * No-op when no pixel id is configured.
 */
export const initPixel = () => {
  if (!hasPixel() || window.fbq) return;

  const fbq: FbqFn = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
  };

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
};

/**
 * Fires PageView on client-side route changes, which the pixel base code
 * cannot see on its own.
 *
 * Pixel only, by design. Vercel Web Analytics already records route changes
 * via <Analytics />; sending them here as well would double-count.
 */
export const trackPageView = () => {
  if (!hasPixel()) return;
  window.fbq?.("track", "PageView");
};

/**
 * The conversion that matters: a visitor leaving for WhatsApp.
 *
 * `source` labels which CTA drove it — e.g. "home / hero-cta",
 * "pricing / Growth / Nick" — so CTA and package performance stay comparable
 * instead of collapsing into one undifferentiated total.
 */
export const trackWhatsAppContact = (source: string) => {
  // Vercel Web Analytics: always on, no configuration required.
  track("whatsapp_contact", { source });

  // Meta Pixel: only when an id is configured.
  if (!hasPixel()) return;
  window.fbq?.("track", "Contact", {
    content_name: source,
    content_category: "whatsapp",
  });
};

/**
 * A visitor opened the contact chooser without necessarily going through to
 * WhatsApp. Useful as the step before the conversion, so intent that does not
 * convert is still visible rather than invisible.
 */
export const trackContactIntent = (source: string) => {
  track("contact_intent", { source });
};
