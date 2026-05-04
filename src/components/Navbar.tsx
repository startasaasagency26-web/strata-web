import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

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
    { name: 'LAB', href: '#lab' },
    { name: 'SERVICES', href: '#services' },
    { name: 'TECH', href: '#tech' },
    { name: 'INDUSTRIES', href: '#industries' },
    { name: 'ABOUT', href: '#about' },
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
          "mx-auto flex items-center justify-between w-full max-w-[1800px] rounded-full px-4 md:px-5 transition-all duration-500",
          "bg-[#050505] border border-white/[0.08] text-white",
          isScrolled ? "py-2 backdrop-blur-xl bg-[#000000]/90 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "py-3 bg-[#050505]/95 backdrop-blur-md"
        )}>
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#" 
              className="relative z-50 flex items-center group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Strata Agency Home"
            >
              <Logo className="transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>

          {/* Desktop Nav - Center */}
          <nav className="hidden xl:flex flex-1 items-center justify-center px-4 min-w-0">
            <ul className="flex items-center gap-1 p-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <a 
                    href={link.href}
                    className="relative z-10 px-4 py-2 block text-[11px] font-mono font-bold tracking-[0.2em] transition-colors duration-300 text-white/70 hover:text-white whitespace-nowrap"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </a>
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
            <motion.a 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              href="#demo" 
              className="hidden lg:inline-flex items-center justify-center text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              REQUEST A DEMO
            </motion.a>
            <motion.a 
              whileHover={{ y: -2, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
              whileTap={{ y: 0 }}
              href="#contact" 
              className="hidden md:inline-flex items-center justify-center text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
            >
              BUILD WITH US
            </motion.a>
            
            <motion.button 
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 shrink-0 ml-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 flex flex-col justify-center items-center px-6"
          >
            <ul className="flex flex-col items-center gap-6 w-full">
              {navLinks.map((link, idx) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="overflow-hidden"
                >
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-display font-bold text-white hover:text-white/70 transition-colors uppercase tracking-tight"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-4 w-full max-w-xs"
              >
                <a href="#demo" className="text-center text-xs font-mono font-bold tracking-widest w-full py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                  REQUEST A DEMO
                </a>
                <a href="#contact" className="text-center text-xs font-mono font-bold tracking-widest w-full py-4 rounded-full bg-white text-black hover:bg-white/90 transition-colors">
                  BUILD WITH US
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
