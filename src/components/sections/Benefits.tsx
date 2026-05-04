import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  "Mobile-first conversion flow",
  "Premium dark visual identity",
  "Fast-loading architecture",
  "SEO foundation included",
  "Accessible interface states",
  "Conversion-led section structure"
];

export const Benefits = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#020202]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Why serious brands choose <span className="text-primary">Strata Web</span>.
            </h2>
            <p className="text-muted text-lg mb-10 max-w-lg leading-relaxed">
              We don't rely on generic templates. Every line of code and pixel is crafted to ensure your digital presence is faster, more secure, and higher converting.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  <span className="text-white/80 text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative h-full min-h-[400px]">
            {/* Visual abstraction of performance */}
            <div className="absolute inset-0 rounded-2xl glass-panel p-8 border-primary/20 flex flex-col justify-center gap-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm text-white font-mono">
                   <span>Performance</span>
                   <span className="text-green-400">100</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-green-400 rounded-full" 
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm text-white font-mono">
                   <span>Accessibility</span>
                   <span className="text-green-400">100</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-green-400 rounded-full" 
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm text-white font-mono">
                   <span>Best Practices</span>
                   <span className="text-green-400">100</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="h-full bg-green-400 rounded-full" 
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm text-white font-mono">
                   <span>SEO</span>
                   <span className="text-green-400">100</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                    className="h-full bg-green-400 rounded-full" 
                   />
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
