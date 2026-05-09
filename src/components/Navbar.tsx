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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SERVICES', href: '/#services' },
    { name: 'PRODUCTS', href: '/#products' },
    { name: 'TECH', href: '/#tech' },
    { name: 'INDUSTRIES', href: '/#industries' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
      >
        <div className={cn(
          "mx-auto flex items-center justify-between w-full max-w-[1800px] rounded-full px-4 md:px-5 transition-all duration-700",
          // Dark liquid glass surface
          "bg-[#111113]/85 backdrop-blur-2xl",
          "border border-white/10",
          "shadow-[0_18px_60px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.07)]",
          isScrolled ? "py-2" : "py-3"
        )}>
          {/* Logo - Left (inverted for dark surface) */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="relative z-50 flex items-center group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Strata Agency Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Invert logo so dark mark becomes white on dark glass */}
              <Logo className="transition-transform duration-300 group-hover:scale-105 brightness-0 invert" />
            </Link>
          </div>

          {/* Desktop Nav - Center */}
          <nav className="hidden xl:flex flex-1 items-center justify-center px-4 min-w-0" aria-label="Main navigation">
            <ul className="flex items-center gap-1 p-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <Link
                    to={link.href}
                    className="relative z-10 px-4 py-2 block text-[10px] font-mono font-bold tracking-[0.2em] transition-colors duration-300 text-white/55 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:text-white"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </Link>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full z-0 pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA & Menu - Right */}
          <div className="flex-shrink-0 flex items-center justify-end gap-2 md:gap-3 relative z-50">
            <Button
              asChild
              variant="liquidDark"
              size="sm"
              className="hidden lg:inline-flex rounded-full text-[10px] font-mono font-bold tracking-[0.2em] px-6 h-auto py-2.5 border-white/15"
            >
              <Link to={CONTACT.requestDemoPath}>
                REQUEST A DEMO
              </Link>
            </Button>

            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 shrink-0 ml-1"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay — dark glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#111113]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6 w-full">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05 }}
                    className="overflow-hidden"
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-black text-white hover:text-white/70 transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="mt-8 w-full max-w-xs"
                >
                  <Button
                    asChild
                    variant="liquidDark"
                    className="w-full py-4 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] h-auto border-white/15"
                  >
                    <Link
                      to={CONTACT.requestDemoPath}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      REQUEST A DEMO
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
