import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { CONTACT } from '../config/contact';
import { Button } from './ui/liquid-glass-button';

export const Navbar = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PLATFORM', href: '/#operating-layer' },
    { name: 'OPERATING MEMORY', href: '/#operating-memory' },
    { name: 'AI EMPLOYEES', href: '/#governed-ai' },
    { name: 'PRICING', href: '/pricing' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-5"
      >
        <div
          className={cn(
            // Solid dark graphite — NOT liquid glass
            "relative mx-auto flex items-center justify-between w-full max-w-[1800px] rounded-full px-4 md:px-5 transition-all duration-500",
            "bg-[#1D1D1F]",
            "border border-white/10",
            "shadow-[0_18px_60px_rgba(0,0,0,0.20)]",
            isScrolled ? "py-2" : "py-3",
          )}
        >
          {/* Logo — inverted white on dark bg */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Strata Growth Technologies Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo variant="mark" tone="gold" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 md:h-11" />
            </Link>
          </div>

          {/* Mobile-only centered brand text — hidden on desktop where nav links show */}
          <div className="absolute left-1/2 -translate-x-1/2 xl:hidden pointer-events-none">
            <span className="font-mono text-[11px] font-bold tracking-[0.28em] text-white/75 uppercase whitespace-nowrap">
              STRATA
            </span>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden xl:flex flex-1 items-center justify-center px-4 min-w-0"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1 p-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <Link
                    to={link.href}
                    className="relative z-10 block px-4 py-3 font-mono text-[11px] font-bold tracking-[0.2em] text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white whitespace-nowrap"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </Link>
                  {hoveredLink === link.name && (
                    <div
                      className="absolute inset-0 rounded-full bg-white/[0.08] pointer-events-none z-0"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — CTA + hamburger */}
          <div className="flex-shrink-0 flex items-center justify-end gap-2 md:gap-3">
            <Button
              asChild
              variant="glass"
              size="sm"
              className="hidden lg:inline-flex rounded-full text-[11px] font-mono font-bold tracking-[0.2em] px-6 h-auto py-2.5 whitespace-nowrap"
            >
              <Link to={CONTACT.requestDemoPath}>BOOK A DEMO</Link>
            </Button>

            <motion.button
              whileHover={shouldReduceMotion ? undefined : { rotate: 90 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.18] transition-colors duration-200 shrink-0 ml-1"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay — solid dark */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-[#111113] flex flex-col justify-center items-center px-6"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6 w-full">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.05 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-black uppercase tracking-tight text-white hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
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
                    <Link to={CONTACT.requestDemoPath} onClick={() => setMobileMenuOpen(false)}>
                      BOOK A DEMO
                    </Link>
                  </Button>
                </motion.li>
                <motion.li
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.4 }}
                  className="mt-2 w-full max-w-xs"
                >
                  <p className="text-center font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.24em] text-white/35">
                    AI-Powered Business Infrastructure
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
