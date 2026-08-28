import { Logo } from './Logo';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { WhatsAppChoice } from './WhatsAppChoice';
import { Button } from './ui/liquid-glass-button';

export const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 mt-20 rounded-t-[32px] md:rounded-t-[48px]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link to="/">
              <Logo variant="lockup" tone="gold" className="mb-6 h-10 w-auto origin-left" />
            </Link>
            <p className="text-muted text-sm font-sans leading-relaxed mb-6">
              Strata delivers Revenue Systems today while developing Strata Core for connected, controlled business operations.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT.mailto}
                aria-label={`Email Strata at ${CONTACT.email}`}
                className="text-text hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                <Mail size={20} />
              </a>
              <WhatsAppChoice source="footer"
                ariaLabel="Choose a Strata WhatsApp contact"
                className="text-text hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                <Phone size={20} />
              </WhatsAppChoice>
              <Link
                to="/about"
                aria-label="View Strata details"
                className="text-text hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                <MapPin size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-text font-mono font-bold text-sm tracking-widest mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li><Link to="/#platform" className="text-muted hover:text-gold font-sans transition-colors text-sm">Platform Vision</Link></li>
              <li><Link to="/#business-rules" className="text-muted hover:text-gold font-sans transition-colors text-sm">Company Rules</Link></li>
              <li><Link to="/#revenue-flow" className="text-muted hover:text-gold font-sans transition-colors text-sm">Revenue Flow</Link></li>
              <li><Link to="/pricing" className="text-muted hover:text-gold font-sans transition-colors text-sm">Pricing &amp; Packages</Link></li>
              <li><Link to="/about" className="text-muted hover:text-gold font-sans transition-colors text-sm">About Strata</Link></li>
              <li><Link to="/build-with-us" className="text-muted hover:text-gold font-sans transition-colors text-sm">Build With Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text font-mono font-bold text-sm tracking-widest mb-6">STRATA CORE</h4>
            <ul className="space-y-4">
              <li><Link to="/#platform" className="text-muted hover:text-gold font-sans transition-colors text-sm">Platform Architecture</Link></li>
              <li><Link to="/#business-rules" className="text-muted hover:text-gold font-sans transition-colors text-sm">Company Rules</Link></li>
              <li><Link to="/#controlled-assistance" className="text-muted hover:text-gold font-sans transition-colors text-sm">Controlled Assistance</Link></li>
              <li><a href={`${CONTACT.mailto}?subject=Strata%20Core%20Vision%20Demo`} className="text-muted hover:text-gold font-sans transition-colors text-sm">Vision Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text font-mono font-bold text-sm tracking-widest mb-6">MAP THE GAPS</h4>
            <p className="text-muted font-sans text-sm mb-4">Bring one recurring workflow. We’ll map the missing context, ownership and controls with you.</p>
            <Button
              asChild
              variant="glassStrong"
              className="mt-2 w-full sm:w-auto rounded-full font-mono tracking-widest text-[11px] font-bold uppercase h-auto py-3 px-6"
            >
              <a href={`${CONTACT.mailto}?subject=Business%20Operations%20Audit`} className="flex items-center gap-2">
                BUSINESS OPS AUDIT <ArrowRight size={16} />
              </a>
            </Button>
            <a href={CONTACT.mailto} className="mt-4 block break-all font-mono text-xs font-bold tracking-widest text-muted transition-colors hover:text-gold">
              {CONTACT.email}
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Strata Growth Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-xs">Privacy &amp; Terms</Link>
            <Link to="/pricing" className="text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-xs">Commercial Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
