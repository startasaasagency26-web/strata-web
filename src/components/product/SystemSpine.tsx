import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { operatingModules } from '../../content/operating-layer';
import { ScrollStage } from '../motion/ScrollStage';
import { useMediaQuery } from '../motion/useMediaQuery';
import { AvailabilityBadge } from './AvailabilityBadge';

const positions = [85, 240, 395, 550, 705, 860];
const connectorLength = 155;

interface ConnectorProps {
  progress: MotionValue<number>;
  index: number;
  animate: boolean;
}

const Connector = ({ progress, index, animate }: ConnectorProps) => {
  const start = index * 0.12;
  const strokeDashoffset = useTransform(
    progress,
    [start, Math.min(1, start + 0.34)],
    [connectorLength, 0],
    { clamp: true },
  );

  return (
    <motion.path
      d={`M${positions[index]} 112H${positions[index + 1]}`}
      fill="none"
      stroke="#0066CC"
      strokeWidth="2"
      strokeDasharray={connectorLength}
      strokeDashoffset={animate ? undefined : 0}
      style={animate ? { strokeDashoffset } : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
};

const SystemSpineStage = ({ progress }: { progress: MotionValue<number> }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const animateStage = isDesktop && !shouldReduceMotion;

  return (
    <figure className="w-full max-w-6xl px-5 sm:px-8">
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {operatingModules.map((module, index) => (
          <div key={module.id} className="min-h-36 rounded-[22px] border border-line bg-surface p-5">
            <span className="font-mono text-[11px] font-bold text-accent">0{index + 1}</span>
            <h3 className="mt-5 text-lg font-bold text-primary">{module.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{module.description}</p>
            {module.availability !== 'live' && <div className="mt-4"><AvailabilityBadge status={module.availability} /></div>}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 940 250" role="img" className="hidden w-full lg:block" aria-labelledby="system-spine-title">
        <title id="system-spine-title">Six connected Strata Core modules: Capture, Qualify, Route, Follow up, Operate and Learn.</title>
        {positions.slice(0, -1).map((_, index) => (
          <Connector key={index} progress={progress} index={index} animate={animateStage} />
        ))}
        {operatingModules.map((module, index) => (
          <g key={module.id} transform={`translate(${positions[index]} 112)`}>
            <circle r="54" fill={index < 4 ? '#1D1D1F' : '#FAFAFB'} stroke={index < 4 ? '#1D1D1F' : '#D2D2D7'} strokeWidth="2" />
            <text textAnchor="middle" y="-5" fill={index < 4 ? '#FFFFFF' : '#0066CC'} fontFamily="Space Mono, monospace" fontSize="11" fontWeight="700">0{index + 1}</text>
            <text textAnchor="middle" y="17" fill={index < 4 ? '#FFFFFF' : '#1D1D1F'} fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700">{module.name}</text>
          </g>
        ))}
      </svg>

      <div className="mt-6 hidden grid-cols-3 gap-3 lg:grid">
        {operatingModules.map((module) => (
          <div key={module.id} className="rounded-[18px] border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-primary">{module.name}</h3>
              {module.availability !== 'live' && <AvailabilityBadge status={module.availability} />}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{module.description}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-sm leading-relaxed text-muted">
        Six connected Strata Core modules: Capture, Qualify, Route, Follow up, Operate and Learn.
      </figcaption>
    </figure>
  );
};

export const SystemSpine = () => (
  <ScrollStage id="system-spine-scroll-stage" heightVh={200}>
    {(progress) => <SystemSpineStage progress={progress} />}
  </ScrollStage>
);
