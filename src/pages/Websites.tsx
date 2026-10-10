import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { WhatsAppChoice } from "../components/WhatsAppChoice";
import { routeMetadata } from "../config/routeMetadata";

/*
 * /websites — website design, build and setup.
 * Copy is the approved file vault/brain/strata-websites-page-copy-2026-10-09.md
 * (sections 1–9, search listing, WhatsApp messages), used word for word.
 * Do not edit wording here without a new approved copy.
 * No price, currency figure or payment provider name belongs on this page.
 */

/** The site-wide audit destination (same target as the nav AUDIT link and /kit). */
const AUDIT_HREF = "/#audit-outcome";

const MAIN_MESSAGE = "Hi Strata — I saw the Websites page and I'd like a short call about a website for my business.";
const conceptMessage = (name: string) =>
  `Hi Strata — I saw the ${name} concept on your Websites page and I'd like a short call about a site like it.`;

const VIDEO_DIR = "/video/websites";
const IMAGE_DIR = "/images/websites";

const linkClass =
  "text-gold underline underline-offset-4 transition-colors hover:text-goldHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

const primaryButtonClass =
  "inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-void transition-colors duration-200 hover:bg-goldHover active:bg-goldActive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset sm:px-8";

const TalkButton = ({ source }: { source: string }) => (
  <WhatsAppChoice message={MAIN_MESSAGE} source={source} className={primaryButtonClass}>
    Talk about your website
    <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
  </WhatsAppChoice>
);

type SectionProps = {
  id: string;
  heading: string;
  tone?: "surface" | "surface2";
  children: ReactNode;
};

/**
 * Same rhythm and heading scale as KitSection in Kit.tsx. Every Section sits
 * below the hero, so `content-visibility: auto` lets the browser skip style and
 * layout for it until it nears the viewport (a measurable cut in main-thread
 * work on throttled phones). The intrinsic size is remembered once rendered.
 */
const Section = ({ id, heading, tone = "surface", children }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={`${tone === "surface2" ? "bg-surface2" : "bg-surface"} scroll-mt-[var(--section-scroll-offset)] border-t border-line py-20 [contain-intrinsic-size:auto_1200px] [content-visibility:auto] md:py-28`}
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
      <h2
        id={`${id}-heading`}
        className="mb-10 max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.045em] text-primary md:mb-14 md:text-6xl"
      >
        {heading}
      </h2>
      {children}
    </div>
  </section>
);

const bodyText = "text-base leading-relaxed text-text2 md:text-lg";

/** Same card treatment as NumberedCards in Kit.tsx. */
const NumberedCards = ({ items, columns }: { items: { title: string; body: string }[]; columns: string }) => (
  <ol className={`grid gap-4 ${columns}`}>
    {items.map((item, index) => (
      <li key={item.title} className="flex flex-col rounded-[28px] border border-border/60 bg-surface p-6 md:p-7">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 text-lg font-bold leading-snug text-text md:text-xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.body}</p>
      </li>
    ))}
  </ol>
);

const siteTypes = [
  {
    title: "E-commerce",
    body: "An online shop that takes card payments through a payment gateway, or a catalogue where every order comes to you on WhatsApp. We set up whichever fits how you sell.",
  },
  { title: "Landing pages", body: "One focused page for one offer, with one action: message you." },
  { title: "Business sites", body: "A clear site of a few pages that says what you do, who it is for and how to reach you." },
  {
    title: "Full business site / portfolio",
    body: "A larger site with a page for each service and a gallery of finished work, for businesses that win jobs on proof.",
  },
  {
    title: "Retail and service-based",
    body: "Location, opening hours, services and a booking or visit enquiry, for businesses people walk into or book.",
  },
  { title: "F&B", body: "Menu, location and opening hours up front, with orders and table bookings sent to WhatsApp." },
];

const everyBuild = [
  "Your domain connected",
  "Hosting set up",
  "Enquiry forms",
  "Analytics",
  "Enquiry routing: a form or an order goes to your WhatsApp or email, so you see it",
  "A handover at launch, so you know how it runs",
];

const concepts = [
  { slug: "lowtide-ceramics", name: "Lowtide Ceramics", place: "Porto", line: "Tableware with online checkout." },
  { slug: "northvane-roof-inspections", name: "Northvane Roof Inspections", place: "Calgary", line: "One page, one quote request." },
  { slug: "ardent-lane-bookkeeping", name: "Ardent Lane Bookkeeping", place: "Singapore", line: "A small firm that looks reliable." },
  { slug: "verran-interiors", name: "Verran Interiors", place: "Medellín", line: "Finished projects, ready to enquire about." },
  { slug: "fernhill-pet-grooming", name: "Fernhill Pet Grooming", place: "Melbourne", line: "Book a slot, buy a brush." },
  { slug: "lorong-table", name: "Lorong Table", place: "Penang", line: "Book a table or order to take away." },
];

const howItGoes = [
  { title: "Call.", body: "A short WhatsApp call to learn what you sell, who buys and who should see the enquiry." },
  { title: "Design.", body: "We design the pages and show you before anything is built." },
  { title: "Build and set up.", body: "We build the site and set up domain, hosting, forms, analytics and enquiry routing." },
  { title: "Launch and handover.", body: "The site goes live, we send a test enquiry through to you, and we show you how it runs." },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "How much?",
    answer: "There is no fixed price. A one-page landing page and a full portfolio site are different amounts of work, so each project is quoted after a short call.",
  },
  {
    question: "Why isn't this on the Pricing page?",
    answer: "The Pricing page shows Strata's workflow packages. Websites are quoted per project, so they do not fit a package list.",
  },
  {
    question: "What does e-commerce mean here?",
    answer: "Either of two set-ups, chosen on the call. A full online shop, where customers add to cart and pay by card through a payment gateway, and you get the order straight away. Or a catalogue with WhatsApp ordering, where customers tap order and a message to you opens ready to send. Some businesses sell better in a conversation, others at a checkout. We will tell you which fits yours.",
  },
  {
    question: "Where do the enquiries go?",
    answer: "To your WhatsApp or email, whichever you choose. A form or an order lands where you already work, so it does not wait in an inbox nobody opens.",
  },
  {
    question: "Is this connected to the Business Operations Audit?",
    answer: "Same company, same idea: nothing should get lost between the first message and the finished job. The audit looks at the work behind the enquiry. The website is where the enquiry starts.",
  },
  {
    question: "Are the concept designs real clients?",
    answer: "No. Strata made them to show range. J-Armor is the only live build on this page.",
  },
  { question: "What if my business is not one of the six?", answer: "Tell us on the call. If none of them fits, we will say so." },
  { question: "Do I need to know anything technical?", answer: "No. We set up the domain, hosting, forms and analytics." },
];

/* ------------------------------------------------------------------ */
/* Hero loop                                                           */
/* ------------------------------------------------------------------ */

const WIDE_QUERY = "(min-width: 768px)";

const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getWide = () => window.matchMedia(WIDE_QUERY).matches;
const getWideServer = () => true;

/**
 * Silent hero loop. The poster renders first (it is the loop's first frame, so
 * the swap to video is seamless). The video is only mounted after the window
 * load event and an idle slot, so it never competes with first paint. With
 * reduced motion the poster is all that is shown. 9:16 below 768px, 16:9 above.
 */
const HeroLoop = () => {
  const shouldReduceMotion = useReducedMotion();
  const isWide = useSyncExternalStore(subscribeWide, getWide, getWideServer);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => {
      // Safari has no requestIdleCallback; fall back to a short timeout there.
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setLoadVideo(true), { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(() => setLoadVideo(true), 300);
      }
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion]);

  /*
   * Keep the loop playing. Autoplay alone is not enough: a tab opened in the
   * background mounts the video paused at 0 and never starts it. So retry
   * play() once data is ready and whenever the tab becomes visible, and pause
   * while the hero is fully off-screen to save battery.
   */
  const variant = isWide ? "16x9" : "9x16";
  const showVideo = loadVideo && !shouldReduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    // React does not reflect `muted` as an attribute; some mobile browsers need it for autoplay.
    video.muted = true;
    video.setAttribute("muted", "");

    let inView = true;
    const tryPlay = () => {
      if (document.visibilityState !== "visible" || !inView || !video.paused) return;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) tryPlay();
      else video.pause();
    });
    if (frameRef.current) observer.observe(frameRef.current);

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    tryPlay();

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [showVideo, variant]);

  const poster = `${VIDEO_DIR}/hero-loop-${variant}-poster.jpg`;

  return (
    <div
      ref={frameRef}
      className="relative mx-auto aspect-[9/16] w-full max-w-[22rem] overflow-hidden rounded-[28px] border border-gold/25 bg-void shadow-2xl shadow-gold/5 md:aspect-video md:max-w-none md:rounded-[40px]"
    >
      <picture>
        <source media={WIDE_QUERY} srcSet={`${VIDEO_DIR}/hero-loop-16x9-poster.jpg`} width={1920} height={1080} />
        <img
          src={`${VIDEO_DIR}/hero-loop-9x16-poster.jpg`}
          width={1080}
          height={1920}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {showVideo && (
        <video
          key={variant}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`${VIDEO_DIR}/hero-loop-${variant}.webm`} type="video/webm" />
          <source src={`${VIDEO_DIR}/hero-loop-${variant}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Walkthrough                                                         */
/* ------------------------------------------------------------------ */

/**
 * Native-controls walkthrough. Nothing is fetched until it is needed: the
 * video itself waits for play (preload="none"), and the poster is only set once
 * the player is within ~1.5 screens, so it never competes with the hero paint.
 * Captions are burned into the video; the VTT track is available but off by
 * default to avoid double captions.
 */
const WalkthroughVideo = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-[28px] border border-gold/25 bg-void shadow-2xl shadow-gold/5 md:rounded-[40px]"
    >
      <video
        className="block aspect-video h-auto w-full"
        controls
        preload="none"
        playsInline
        width={1920}
        height={1080}
        poster={nearViewport ? `${VIDEO_DIR}/walkthrough-poster.jpg` : undefined}
        aria-label="How a build goes, in under a minute"
      >
        <source src={`${VIDEO_DIR}/walkthrough.mp4`} type="video/mp4" />
        <track kind="captions" src={`${VIDEO_DIR}/walkthrough.vtt`} srcLang="en" label="English" />
      </video>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const Websites = () => (
  <div className="flex flex-col">
    <Seo {...routeMetadata.websites} />

    {/* 1. Hero */}
    <section aria-labelledby="websites-heading" className="px-5 pb-20 pt-32 sm:px-8 md:px-12 md:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            WEBSITES · BUILT TO BRING ENQUIRIES IN
          </p>
          <h1
            id="websites-heading"
            className="text-balance text-[clamp(2.5rem,9vw,3rem)] font-black leading-[1] tracking-[-0.045em] text-text md:text-7xl"
          >
            Websites that turn visitors into enquiries you actually follow up.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
            Strata designs, builds and sets up your site, then sends every enquiry to your WhatsApp or email. You see it
            where you already work.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4">
            <TalkButton source="websites / hero-cta" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              WhatsApp. A short call first. Quoted per project after we speak.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <HeroLoop />
        </div>
      </div>
    </section>

    {/* 2. The problem */}
    <Section id="problem" heading="Most websites stop at the page." tone="surface2">
      <div className={`max-w-3xl space-y-6 ${bodyText}`}>
        <p>
          Someone finds your site, likes what they see and fills in the form. Then nothing. The form goes to an inbox
          nobody checks, or to a number that is out of date.
        </p>
        <p>The visitor does not wait. They message the next business on the list.</p>
        <p>
          The design was never the problem. The gap sits between the page and the person who should answer. We build
          that part in from the start.
        </p>
      </div>
    </Section>

    {/* 3. What we build */}
    <Section id="what-we-build" heading="Six kinds of site. One job: get the enquiry to you.">
      <NumberedCards items={siteTypes} columns="sm:grid-cols-2 lg:grid-cols-3" />

      <div className="mt-10 rounded-[28px] border border-gold/25 bg-surface2 p-7 md:mt-14 md:p-9">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-accent">Every build includes</h3>
        <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
          {everyBuild.map((item) => (
            <li key={item} className="flex gap-4 border-b border-line py-4 text-base font-bold leading-snug text-text md:text-lg">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>

    {/* 4. Walkthrough video */}
    <Section id="walkthrough" heading="How a build goes, in under a minute." tone="surface2">
      <p className={`-mt-4 mb-10 max-w-2xl md:-mt-6 md:mb-12 ${bodyText}`}>
        From a blank page to an enquiry arriving on your phone.
      </p>
      <WalkthroughVideo />
    </Section>

    {/* 5. Real build */}
    <Section id="real-build" heading="A real build: J-Armor.">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="max-w-xl">
          <p className={bodyText}>
            J-Armor sells phone accessories. Customers order through WhatsApp and dealers, so the site has no online
            checkout, and we built it that way. Every product has its own page, and a "Choose your finish" selector puts
            the colour a customer picks into the WhatsApp message. On a phone, a WhatsApp bar stays on screen, and the
            homepage loads at under 1 MB. It is new, so there are no results to quote.
          </p>
          <a
            href="https://j-armor.net"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-goldHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            Visit j-armor.net
            <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
          </a>
        </div>

        <div className="relative pb-10 pr-6 sm:pr-10">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-void shadow-2xl shadow-gold/5">
            <img
              src={`${IMAGE_DIR}/jarmor-desktop-1440.webp`}
              srcSet={`${IMAGE_DIR}/jarmor-desktop-720.webp 720w, ${IMAGE_DIR}/jarmor-desktop-1440.webp 1440w`}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 92vw"
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              alt="The J-Armor homepage on a desktop screen."
              className="block h-auto w-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[30%] max-w-[13rem] overflow-hidden rounded-[22px] border-4 border-surface3 bg-void shadow-2xl">
            <img
              src={`${IMAGE_DIR}/jarmor-phone-390.webp`}
              srcSet={`${IMAGE_DIR}/jarmor-phone-390.webp 390w, ${IMAGE_DIR}/jarmor-phone-780.webp 780w`}
              sizes="(min-width: 1024px) 208px, 30vw"
              width={390}
              height={844}
              loading="lazy"
              decoding="async"
              alt="A J-Armor product page on a phone, with the Choose your finish selector and the WhatsApp bar."
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </Section>

    {/* 6. Concept designs */}
    <Section id="concepts" heading="Six concept designs." tone="surface2">
      <p className="-mt-4 mb-10 font-mono text-xs font-bold italic tracking-[0.08em] text-text2 md:-mt-6 md:mb-12 md:text-sm">
        Concept designs made by Strata to show range.
      </p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept) => (
          <li key={concept.slug} className="flex flex-col rounded-[28px] border border-border/60 bg-surface p-4 md:p-5">
            <div className="relative pb-6 pr-6">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-void">
                <img
                  src={`${IMAGE_DIR}/concepts/${concept.slug}-desktop-720.webp`}
                  srcSet={`${IMAGE_DIR}/concepts/${concept.slug}-desktop-720.webp 720w, ${IMAGE_DIR}/concepts/${concept.slug}-desktop-1440.webp 1440w`}
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt={`${concept.name} concept design on a desktop screen.`}
                  className="block h-auto w-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[26%] overflow-hidden rounded-xl border-[3px] border-surface3 bg-void shadow-xl">
                <img
                  src={`${IMAGE_DIR}/concepts/${concept.slug}-phone-390.webp`}
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                  alt={`${concept.name} concept design on a phone.`}
                  className="block h-auto w-full"
                />
              </div>
            </div>
            <p className="mt-5 flex-grow px-1 text-base leading-relaxed text-muted">
              <strong className="font-bold text-text">{concept.name}</strong>, {concept.place}. {concept.line}
            </p>
            <WhatsAppChoice
              message={conceptMessage(concept.name)}
              source={`websites / concept / ${concept.slug}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 self-start px-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-goldHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              Start a site like this
              <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
            </WhatsAppChoice>
          </li>
        ))}
      </ul>
    </Section>

    {/* 7. How it goes */}
    <Section id="how-it-goes" heading="How it goes.">
      <NumberedCards items={howItGoes} columns="sm:grid-cols-2 lg:grid-cols-4" />
    </Section>

    {/* 8. FAQ */}
    <Section id="faq" heading="FAQ" tone="surface2">
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-border/50 bg-surface/50 p-6 md:p-8">
            <h3 className="mb-3 font-sans text-lg font-bold text-text md:text-xl">{faq.question}</h3>
            <p className="font-sans text-sm leading-relaxed text-muted md:text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* 9. Closing */}
    <section aria-labelledby="websites-closing-heading" className="border-t border-line bg-surface px-5 py-20 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-gold/30 bg-surface2 px-6 py-14 text-center shadow-2xl shadow-gold/5 md:rounded-[48px] md:px-12 md:py-20">
        <h2
          id="websites-closing-heading"
          className="text-balance text-4xl font-black leading-[0.95] tracking-[-0.045em] text-primary md:text-6xl"
        >
          Start with a short call.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          Tell us what you sell and who should see the enquiry. We will tell you what the site needs.
        </p>
        <div className="mt-10 flex justify-center">
          <TalkButton source="websites / closing-cta" />
        </div>
        <p className="mx-auto mt-10 max-w-xl text-pretty text-sm leading-relaxed text-muted md:text-base">
          Want the work behind the enquiry looked at too? See the{" "}
          <Link to={AUDIT_HREF} className={linkClass}>Business Operations Audit</Link>.
        </p>
      </div>
    </section>
  </div>
);
