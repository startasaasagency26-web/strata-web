import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { WhatsAppChoice } from './WhatsAppChoice';
import { Button } from './ui/liquid-glass-button';

export const Navbar = () => {
  const { pathname, hash } = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAuditOpen, setMobileAuditOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    window.setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const focusTimer = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    const scrollPosition = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== 'Tab' || !mobileOverlayRef.current) return;

      const focusable = Array.from(
        mobileOverlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.documentElement.style.overflow = previousRootOverflow;
      window.scrollTo(0, scrollPosition);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMobileMenu, mobileMenuOpen]);

  const navLinks = [
    { name: 'WORKFLOWS', href: '/#workflows' },
    { name: 'AUDIT', href: '/#audit-outcome' },
    { name: 'PLATFORM VISION', href: '/#platform' },
    { name: 'PRICING', href: '/pricing' },
    { name: 'ABOUT', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/' && hash === href.slice(1);
    return pathname === href;
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-[calc(0.75rem+1px)] right-[calc(0.75rem+1px)] top-0 z-50 pt-4 md:left-[calc(1.5rem+1px)] md:right-[calc(1.5rem+1px)] md:pt-5 lg:left-[calc(2rem+1px)] lg:right-[calc(2rem+1px)]"
      >
        <div
          className={cn(
            // Raised navigation surface with a restrained gold rim.
            "relative mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-full px-5 transition-[height] duration-500 sm:px-8 md:px-12",
            "bg-surface2",
            "border border-gold/30",
            "shadow-[0_18px_60px_rgb(var(--scrim)/0.36),inset_0_1px_0_rgb(var(--gold)/0.08)]",
            isScrolled ? "h-[var(--nav-height-scrolled)]" : "h-[var(--nav-height)]",
          )}
        >
          {/* Logo */}
          <div className="col-start-1 flex min-w-0 items-center justify-self-start">
            <Link
              to="/"
              className="flex items-center group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset"
              aria-label="Strata Growth Technologies Home"
              onClick={mobileMenuOpen ? closeMobileMenu : undefined}
            >
              <Logo variant="mark" tone="gold" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 md:h-11" />
            </Link>
          </div>

          {/* Mobile-only centered brand text — hidden on desktop where nav links show */}
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 sm:block xl:hidden">
            <span className="font-mono text-[11px] font-bold tracking-[0.28em] text-text2 uppercase whitespace-nowrap">
              STRATA
            </span>
          </div>

          {/* Desktop Nav */}
          <nav
            className="col-start-2 hidden min-w-0 items-center justify-center px-4 xl:flex"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1 p-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                <li key={link.name} className="relative">
                  <Link
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn("relative z-10 block whitespace-nowrap px-4 py-3 font-mono text-[11px] font-bold tracking-[0.2em] transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:text-gold", active ? "text-gold" : "text-muted")}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </Link>
                  {(active || hoveredLink === link.name) && (
                    <div
                      className="absolute inset-0 rounded-full bg-gold/10 pointer-events-none z-0"
                    />
                  )}
                </li>
              )})}
            </ul>
          </nav>

          {/* Right — CTA + hamburger */}
          <div className="col-start-3 flex min-w-0 items-center justify-end gap-2 justify-self-end md:gap-3">
            <Button
              asChild
              variant="glass"
              size="sm"
              className="hidden h-10 rounded-full px-6 font-mono text-[11px] font-bold tracking-[0.2em] whitespace-nowrap xl:inline-flex"
            >
              <WhatsAppChoice
                message="Hi Strata — I'd like to book a Business Operations Audit."
                source="navbar / desktop-cta"
              >
                BUSINESS OPS AUDIT
              </WhatsAppChoice>
            </Button>

            <motion.button
              ref={hamburgerRef}
              whileHover={shouldReduceMotion ? undefined : { rotate: 90 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onClick={() => mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-borderStrong bg-surface3 text-text transition-colors duration-200 hover:bg-gold/15 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset xl:hidden"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay — solid dark */}
      <AnimatePresence>
        {(mobileMenuOpen || mobileAuditOpen) && (
          <motion.div
            ref={mobileOverlayRef}
            id="mobile-navigation-overlay"
            hidden={!mobileMenuOpen}
            aria-hidden={!mobileMenuOpen}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className={cn(
              "fixed bottom-0 left-[calc(0.75rem+1px)] right-[calc(0.75rem+1px)] z-40 flex flex-col justify-center bg-void xl:hidden md:left-[calc(1.5rem+1px)] md:right-[calc(1.5rem+1px)] lg:left-[calc(2rem+1px)] lg:right-[calc(2rem+1px)]",
              isScrolled
                ? "top-[calc(var(--nav-height-scrolled)+1rem)] md:top-[calc(var(--nav-height-scrolled)+1.25rem)]"
                : "top-[calc(var(--nav-height)+1rem)] md:top-[calc(var(--nav-height)+1.25rem)]",
            )}
          >
            <nav className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12" aria-label="Mobile navigation">
              <ul className="flex w-full flex-col items-start gap-6">
                {navLinks.map((link, idx) => {
                  const active = isActive(link.href);
                  return (
                  <motion.li
                    key={link.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.05 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      ref={idx === 0 ? firstMobileLinkRef : undefined}
                      to={link.href}
                      onClick={closeMobileMenu}
                      aria-current={active ? 'page' : undefined}
                      className={cn("text-4xl font-black uppercase tracking-tight transition-colors hover:text-goldHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus", active ? "text-gold" : "text-text")}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                )})}
                <motion.li
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.33, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 w-full max-w-xs"
                >
                  <Button
                    asChild
                    variant="glass"
                    className="w-full h-14 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] uppercase"
                  >
                    <WhatsAppChoice
                      message="Hi Strata — I'd like to book a Business Operations Audit."
                      onClick={closeMobileMenu}
                      onOpenChange={setMobileAuditOpen}
                      source="navbar / mobile-cta"
                    >
                      BUSINESS OPERATIONS AUDIT
                    </WhatsAppChoice>
                  </Button>
                </motion.li>
                <motion.li
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.4 }}
                  className="mt-2 w-full max-w-xs"
                >
                  <p className="text-left font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.24em] text-muted">
                    Operations designed for control
                  </p>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
