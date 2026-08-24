import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { LeadStatus, LeadPriority } from '../../types/crm';

// ── Badges ──────────────────────────────────────────────────────────

export const StatusBadge: React.FC<{ status: LeadStatus; className?: string }> = ({ status, className }) => {
  const styles: Record<LeadStatus, string> = {
    new:                  'bg-infoSoft text-info border-info/30',
    contacted:            'bg-cautionSoft text-caution border-caution/30',
    qualified:            'bg-positiveSoft text-positive border-positive/30',
    discovery_scheduled:  'bg-infoSoft text-info border-info/30',
    proposal_sent:        'bg-infoSoft text-info border-info/30',
    negotiating:          'bg-cautionSoft text-caution border-caution/30',
    won:                  'bg-positiveSoft text-positive border-positive/30',
    lost:                 'bg-dangerSoft text-danger border-danger/30',
    unresponsive:         'bg-surface3 text-muted border-border',
  };
  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border whitespace-nowrap',
      styles[status],
      className
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: LeadPriority; className?: string }> = ({ priority, className }) => {
  const styles: Record<LeadPriority, string> = {
    hot:  'bg-dangerSoft text-danger',
    warm: 'bg-cautionSoft text-caution',
    cold: 'bg-infoSoft text-info',
  };
  return (
    <span className={cn(
      'px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tighter uppercase',
      styles[priority],
      className
    )}>
      {priority}
    </span>
  );
};

// ── MetricCard ───────────────────────────────────────────────────────

export const MetricCard: React.FC<{
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
}> = ({ label, value, trend, trendUp, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-surface2 backdrop-blur-md border border-border rounded-[32px] p-6 flex flex-col justify-between hover:bg-surface transition-all shadow-sm group"
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-muted uppercase">{label}</span>
      {icon && <span className="text-muted/60 group-hover:text-muted transition-colors">{icon}</span>}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-display font-bold text-text uppercase tracking-tight">{value}</span>
      {trend && (
        <span className={cn('text-[10px] font-mono font-bold', trendUp ? 'text-positive' : 'text-danger')}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  </motion.div>
);

// ── States ───────────────────────────────────────────────────────────

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <Loader2 size={28} className="text-muted animate-spin" />
    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-muted uppercase">{message}</span>
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    <div className="w-14 h-14 rounded-full bg-dangerSoft flex items-center justify-center text-danger">
      <AlertCircle size={28} />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-text">Something went wrong</h3>
      <p className="text-sm text-muted leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 rounded-full bg-gold text-void text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-goldHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset transition-all"
      >
        Retry
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{ title: string; message: string; icon?: React.ReactNode }> = ({ title, message, icon }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    {icon ? (
      <div className="text-muted">{icon}</div>
    ) : (
      <div className="w-16 h-16 rounded-full border border-border bg-surface2 shadow-sm flex items-center justify-center text-muted">
        <Loader2 size={24} />
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-text">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{message}</p>
    </div>
  </div>
);

// ── Form Elements ────────────────────────────────────────────────────

export const CrmInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-muted uppercase">{label}</label>
    )}
    <input
      className={cn(
        'w-full bg-surface2 border border-border shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-text outline-none focus:border-focus focus:bg-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset transition-all placeholder:text-muted font-sans',
        className
      )}
      {...props}
    />
  </div>
);

export const CrmSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-muted uppercase">{label}</label>
    )}
    <select
      className={cn(
        'w-full bg-surface2 border border-border shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-text outline-none focus:border-focus focus:bg-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset transition-all appearance-none cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);
