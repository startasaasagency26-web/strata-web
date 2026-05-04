import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  glowColor?: 'blue' | 'purple' | 'none';
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, glowColor = 'none', interactive = false, ...props }, ref) => {
    
    const baseStyles = "relative rounded-2xl glass-panel overflow-hidden";
    
    const glowStyles = {
      none: "",
      blue: "hover:shadow-[0_0_40px_-10px_rgba(0,85,255,0.3)] transition-shadow duration-500",
      purple: "hover:shadow-[0_0_40px_-10px_rgba(138,43,226,0.3)] transition-shadow duration-500",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -5 } : undefined}
        className={cn(
          baseStyles, 
          glowStyles[glowColor], 
          interactive && "cursor-pointer group",
          className
        )}
        {...props}
      >
        <div className="relative z-10 p-6 md:p-8 h-full">
          {children}
        </div>
        
        {/* Subtle inner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
