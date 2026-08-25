/**
 * Meta Pixel wiring for paid acquisition.
 *
 * The pixel id comes from VITE_META_PIXEL_ID. With no id set, every function
 * here is a no-op — nothing loads, nothing is sent. That keeps local dev and
 * preview builds clean and means the repo never carries a hardcoded id.
 */

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

/** Fires PageView on client-side route changes, which the base code cannot see. */
export const trackPageView = () => {
  if (!hasPixel()) return;
  window.fbq?.("track", "PageView");
};

/**
 * The conversion that matters: a visitor leaving for WhatsApp.
 * `source` labels which CTA drove it, so package performance is comparable
 * in Ads Manager rather than collapsing into one undifferentiated total.
 */
export const trackWhatsAppContact = (source: string) => {
  if (!hasPixel()) return;
  window.fbq?.("track", "Contact", {
    content_name: source,
    content_category: "whatsapp",
  });
};
