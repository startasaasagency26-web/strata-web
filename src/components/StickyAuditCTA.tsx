import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsAppChoice } from './WhatsAppChoice';

/**
 * Compact "Book an audit" bar for < 1280px, where the navbar's audit button is
 * hidden. Appears once the hero has scrolled away and hides as soon as the
 * closing CTA reaches the screen (and stays hidden over the footer), so it
 * never sits on top of the page's own closing call to action or the last
 * lines of the page. Respects the bottom safe-area inset.
 */
export const StickyAuditCTA = () => {
  const [pastHero, setPastHero] = useState(false);
  const [reachedFinal, setReachedFinal] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-scroll-stage');
    const final = document.getElementById('final-cta');
    if (!hero || !final || typeof IntersectionObserver === 'undefined') return;
    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const finalObserver = new IntersectionObserver(([entry]) => {
      setReachedFinal(entry.isIntersecting || entry.boundingClientRect.top < 0);
    });
    heroObserver.observe(hero);
    finalObserver.observe(final);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !reachedFinal;

  return (
    <div
      data-sticky-cta
      data-visible={visible}
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 px-[calc(1.25rem+1px)] pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity,visibility] duration-200 ease-out xl:hidden ${
        visible ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-4 opacity-0'
      }`}
    >
      <div className="mx-auto max-w-sm rounded-full shadow-[0_14px_40px_rgb(var(--scrim)/0.55)]">
        <WhatsAppChoice
          message="Hi Strata — I'd like to book a Business Operations Audit."
          source="home / sticky-cta"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-goldActive bg-gold font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-void transition-colors hover:bg-goldHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset active:bg-goldActive"
        >
          Book an audit <ArrowRight size={14} />
        </WhatsAppChoice>
      </div>
    </div>
  );
};
