import { Logo } from './Logo';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { WhatsAppChoice } from './WhatsAppChoice';
import { Button } from './ui/liquid-glass-button';

export const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 mt-20 md:mx-6 mx-2 rounded-t-[32px] md:rounded-t-[48px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link to="/">
              <Logo className="h-10 origin-left mb-6 justify-start" />
            </Link>
            <p className="text-muted text-sm font-sans leading-relaxed mb-6">
              Strata Core connects operating context, business rules, team actions and governed AI in one visible layer.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT.mailto}
                aria-label={`Email Strata at ${CONTACT.email}`}
                className="text-primary hover:text-primary/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/40"
              >
                <Mail size={20} />
              </a>
              <WhatsAppChoice
                ariaLabel="Choose a Strata WhatsApp contact"
                className="text-primary hover:text-primary/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/40"
              >
                <Phone size={20} />
              </WhatsAppChoice>
              <Link
                to="/about"
                aria-label="View Strata details"
                className="text-primary hover:text-primary/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/40"
              >
                <MapPin size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li><Link to="/#operating-layer" className="text-muted hover:text-primary font-sans transition-colors text-sm">Platform</Link></li>
              <li><Link to="/#operating-memory" className="text-muted hover:text-primary font-sans transition-colors text-sm">Operating Memory</Link></li>
              <li><Link to="/#governed-ai" className="text-muted hover:text-primary font-sans transition-colors text-sm">AI Employees</Link></li>
              <li><Link to="/pricing" className="text-muted hover:text-primary font-sans transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/about" className="text-muted hover:text-primary font-sans transition-colors text-sm">About Strata</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">STRATA CORE</h4>
            <ul className="space-y-4">
              <li><Link to="/#operating-layer" className="text-muted hover:text-primary font-sans transition-colors text-sm">Operating Layer</Link></li>
              <li><Link to="/#operating-memory" className="text-muted hover:text-primary font-sans transition-colors text-sm">Operating Memory</Link></li>
              <li><Link to="/#governed-ai" className="text-muted hover:text-primary font-sans transition-colors text-sm">Governed AI</Link></li>
              <li><Link to={CONTACT.requestDemoPath} className="text-muted hover:text-primary font-sans transition-colors text-sm">Book a Demo</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">READY TO SCALE?</h4>
            <p className="text-muted font-sans text-sm mb-4">Choose one critical operating loop and map how Strata Core can support it.</p>
            <Button
              asChild
              variant="glassStrong"
              className="mt-2 w-full sm:w-auto rounded-full font-mono tracking-widest text-[11px] font-bold uppercase h-auto py-3 px-6"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                BOOK A DEMO <ArrowRight size={16} />
              </Link>
            </Button>
            <a href={CONTACT.mailto} className="mt-4 block break-all font-mono text-xs font-bold tracking-widest text-muted transition-colors hover:text-primary">
              {CONTACT.email}
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Strata Growth Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-muted hover:text-primary transition-colors font-mono tracking-widest uppercase text-xs">Privacy &amp; Terms</Link>
            <Link to="/pricing" className="text-muted hover:text-primary transition-colors font-mono tracking-widest uppercase text-xs">Commercial Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
