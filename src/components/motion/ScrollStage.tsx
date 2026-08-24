import { useRef, type ReactNode } from 'react';
import { useMotionValue, useReducedMotion, useScroll, type MotionValue } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ScrollStageProps {
  children: (progress: MotionValue<number>) => ReactNode;
  heightVh?: number;
  id: string;
  className?: string;
  disableBelow?: Breakpoint;
}

const breakpointQueries: Record<Breakpoint, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

const outerStyles = {
  contentVisibility: 'auto',
  containIntrinsicSize: '1px 1000px',
} as const;

const StaticStage = ({ children, id, className }: Pick<ScrollStageProps, 'children' | 'id' | 'className'>) => {
  const staticProgress = useMotionValue(0.5);

  return (
    <div id={id} className={`relative ${className}`} style={{ ...outerStyles, height: 'auto' }} data-scroll-stage="static">
      <div className="relative flex w-full items-center justify-center overflow-visible">
        {children(staticProgress)}
      </div>
    </div>
  );
};

const ActiveStage = ({ children, heightVh, id, className }: Required<Pick<ScrollStageProps, 'children' | 'heightVh' | 'id' | 'className'>>) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={outerRef} id={id} className={`relative ${className}`} style={{ ...outerStyles, height: `${heightVh}vh` }} data-scroll-stage="active">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
};

export const ScrollStage = ({ children, heightVh = 300, id, className = '', disableBelow = 'lg' }: ScrollStageProps) => {
  const shouldReduceMotion = useReducedMotion();
  const meetsBreakpoint = useMediaQuery(breakpointQueries[disableBelow]);
  const isStatic = Boolean(shouldReduceMotion) || !meetsBreakpoint;

  if (isStatic) return <StaticStage id={id} className={className}>{children}</StaticStage>;
  return <ActiveStage id={id} className={className} heightVh={heightVh}>{children}</ActiveStage>;
};
