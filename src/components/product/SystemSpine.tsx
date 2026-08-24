import { operatingModules } from '../../content/operating-layer';
import { AvailabilityBadge } from './AvailabilityBadge';

const positions = [85, 240, 395, 550, 705, 860];

export const SystemSpine = () => (
  <figure>
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
      <title id="system-spine-title">Six planned parts of the Strata Core platform architecture.</title>
      <line x1="85" y1="112" x2="860" y2="112" className="stroke-gold" strokeWidth="2" />
      {operatingModules.map((module, index) => (
        <g key={module.id} transform={`translate(${positions[index]} 112)`}>
          <circle r="54" className="fill-surface3 stroke-gold" strokeWidth="2" />
          <text textAnchor="middle" y="-5" className="fill-gold" fontFamily="Space Mono, monospace" fontSize="11" fontWeight="700">0{index + 1}</text>
          <text textAnchor="middle" y="17" className="fill-text" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700">{module.name}</text>
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
      Planned architecture only. These parts describe the product direction and are not presented as released capabilities.
    </figcaption>
  </figure>
);
