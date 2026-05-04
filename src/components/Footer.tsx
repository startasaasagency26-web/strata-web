import { Logo } from './Logo';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Logo className="scale-75 origin-left mb-6" />
            <p className="text-muted text-sm leading-relaxed mb-6">
              Strata Web builds premium digital foundations for serious brands. We combine cinematic interfaces with conversion-first architecture.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><MapPin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#work" className="text-muted hover:text-primary transition-colors text-sm">Selected Work</a></li>
              <li><a href="#process" className="text-muted hover:text-primary transition-colors text-sm">Our Process</a></li>
              <li><a href="#pricing" className="text-muted hover:text-primary transition-colors text-sm">Pricing</a></li>
              <li><a href="#faq" className="text-muted hover:text-primary transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted hover:text-primary transition-colors text-sm">Premium Web Design</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition-colors text-sm">Web Development</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition-colors text-sm">SEO & Performance</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition-colors text-sm">Brand Systems</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Ready to scale?</h4>
            <p className="text-muted text-sm mb-4">Book a call to discuss your project requirements.</p>
            <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium">
              hello@strataweb.agency <ArrowRight size={16} />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Strata Web Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-muted hover:text-white transition-colors text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
