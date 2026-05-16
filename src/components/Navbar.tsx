import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { CONTACT } from '../config/contact';
import { Button } from './ui/liquid-glass-button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SYSTEMS',    href: '/#services'   },
    { name: 'OFFERS',     href: '/pricing'     },
    { name: 'STACK',      href: '/#tech'       },
    { name: 'INDUSTRIES', href: '/#industries' },
    { name: 'ABOUT',      href: '/about'        },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
              aria-label="Strata Agency Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo className="transition-transform duration-300 group-hover:scale-105 brightness-0 invert" />
            </Link>
          </div>

          {/* Mobile-only centered brand text — hidden on desktop where nav links show */}
          <div className="absolute left-1/2 -translate-x-1/2 xl:hidden pointer-events-none">
            <span className="font-mono text-[11px] font-bold tracking-[0.28em] text-white/75 uppercase">
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
                    className="relative z-10 px-4 py-2 block text-[10px] font-mono font-bold tracking-[0.2em] transition-colors duration-200 text-white/55 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:text-white"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </Link>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] pointer-events-none z-0"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
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
              className="hidden lg:inline-flex rounded-full text-[10px] font-mono font-bold tracking-[0.2em] px-6 h-auto py-2.5"
            >
              <Link to={CONTACT.requestDemoPath}>BOOK STRATEGY CALL</Link>
            </Button>

            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.18] transition-colors duration-200 shrink-0 ml-1"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#111113] flex flex-col justify-center items-center px-6"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6 w-full">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.33 }}
                  className="mt-6 w-full max-w-xs"
                >
                  <Button
                    asChild
                    variant="glass"
                    className="w-full h-14 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
                  >
                    <Link to={CONTACT.requestDemoPath} onClick={() => setMobileMenuOpen(false)}>
                      BOOK STRATEGY CALL
                    </Link>
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
