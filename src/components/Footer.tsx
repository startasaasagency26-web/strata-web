import { Logo } from './Logo';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 mt-20 md:mx-6 mx-2 rounded-t-[32px] md:rounded-t-[48px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Logo className="h-10 origin-left mb-6 justify-start" />
            <p className="text-muted text-sm font-sans leading-relaxed mb-6">
              Strata Agency builds premium digital foundations for serious brands. We combine high-end interfaces with conversion-first architecture.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:text-primary/70 transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-primary hover:text-primary/70 transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-primary hover:text-primary/70 transition-colors"><MapPin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li><a href="#work" className="text-muted hover:text-primary font-sans transition-colors text-sm">Selected Work</a></li>
              <li><a href="#process" className="text-muted hover:text-primary font-sans transition-colors text-sm">Our Process</a></li>
              <li><a href="#pricing" className="text-muted hover:text-primary font-sans transition-colors text-sm">Pricing</a></li>
              <li><a href="#faq" className="text-muted hover:text-primary font-sans transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted hover:text-primary font-sans transition-colors text-sm">Premium Web Design</a></li>
              <li><a href="#" className="text-muted hover:text-primary font-sans transition-colors text-sm">Web Development</a></li>
              <li><a href="#" className="text-muted hover:text-primary font-sans transition-colors text-sm">SEO & Performance</a></li>
              <li><a href="#" className="text-muted hover:text-primary font-sans transition-colors text-sm">Brand Systems</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary font-mono font-bold text-sm tracking-widest mb-6">READY TO SCALE?</h4>
            <p className="text-muted font-sans text-sm mb-4">Book a call to discuss your project requirements.</p>
            <a href="#" className="inline-flex items-center gap-2 font-mono tracking-widest text-primary hover:text-primary/70 transition-colors text-sm font-bold border-b border-primary pb-1">
              HELLO@STRATA.AGENCY <ArrowRight size={16} />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Strata Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted hover:text-primary transition-colors font-mono tracking-widest uppercase text-xs">Privacy Policy</a>
            <a href="#" className="text-muted hover:text-primary transition-colors font-mono tracking-widest uppercase text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
