import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:px-8 px-4 pt-4 md:pt-8',
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 border",
          isScrolled ? "bg-surface/90 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent border-transparent"
        )}>
          <a href="#" className="relative z-50 flex-shrink-0">
            <Logo className="h-8" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-xs font-mono font-bold tracking-widest text-primary/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#demo" className="text-xs font-mono font-bold tracking-widest px-6 py-2.5 rounded-full border border-border/50 hover:bg-border/20 transition-colors">
              REQUEST A DEMO
            </a>
            <a href="#contact" className="text-xs font-mono font-bold tracking-widest px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
              BUILD WITH US
            </a>
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Menu size={18} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-50 text-primary p-2 w-10 h-10 rounded-full bg-white/50 border border-border/50 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-display font-bold text-primary hover:text-primary/70 transition-colors uppercase tracking-wide"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-8 flex flex-col gap-4 w-full px-8">
                <a href="#demo" className="text-center text-sm font-mono font-bold tracking-widest w-full py-4 rounded-full border border-border/50 hover:bg-border/20 transition-colors">
                  REQUEST A DEMO
                </a>
                <a href="#contact" className="text-center text-sm font-mono font-bold tracking-widest w-full py-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                  BUILD WITH US
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
