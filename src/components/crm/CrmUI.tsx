import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { LeadStatus, LeadPriority } from '../../types/crm';

// ── Badges ──────────────────────────────────────────────────────────

export const StatusBadge: React.FC<{ status: LeadStatus; className?: string }> = ({ status, className }) => {
  const styles: Record<LeadStatus, string> = {
    new:                  'bg-blue-50 text-blue-600 border-blue-200',
    contacted:            'bg-yellow-50 text-yellow-700 border-yellow-200',
    qualified:            'bg-emerald-50 text-emerald-700 border-emerald-200',
    discovery_scheduled:  'bg-purple-50 text-purple-600 border-purple-200',
    proposal_sent:        'bg-cyan-50 text-cyan-700 border-cyan-200',
    negotiating:          'bg-orange-50 text-orange-600 border-orange-200',
    won:                  'bg-green-50 text-green-700 border-green-200',
    lost:                 'bg-red-50 text-red-600 border-red-200',
    unresponsive:         'bg-gray-100 text-gray-500 border-gray-200',
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
    hot:  'bg-red-50 text-red-600',
    warm: 'bg-orange-50 text-orange-600',
    cold: 'bg-blue-50 text-blue-600',
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
    className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-6 flex flex-col justify-between hover:bg-white transition-all shadow-sm group"
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">{label}</span>
      {icon && <span className="text-gray-300 group-hover:text-gray-400 transition-colors">{icon}</span>}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-display font-bold text-gray-900 uppercase tracking-tight">{value}</span>
      {trend && (
        <span className={cn('text-[10px] font-mono font-bold', trendUp ? 'text-emerald-500' : 'text-red-500')}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  </motion.div>
);

// ── States ───────────────────────────────────────────────────────────

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <Loader2 size={28} className="text-gray-300 animate-spin" />
    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">{message}</span>
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500">
      <AlertCircle size={28} />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-gray-900">Something went wrong</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 rounded-full bg-gray-900 text-white text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-gray-700 transition-all"
      >
        Retry
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{ title: string; message: string; icon?: React.ReactNode }> = ({ title, message, icon }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    {icon ? (
      <div className="text-gray-300">{icon}</div>
    ) : (
      <div className="w-16 h-16 rounded-full border border-white/50 bg-white/60 shadow-sm flex items-center justify-center text-gray-400">
        <Loader2 size={24} />
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
    </div>
  </div>
);

// ── Form Elements ────────────────────────────────────────────────────

export const CrmInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">{label}</label>
    )}
    <input
      className={cn(
        'w-full bg-white/40 border border-white/50 shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-500 font-sans',
        className
      )}
      {...props}
    />
  </div>
);

export const CrmSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">{label}</label>
    )}
    <select
      className={cn(
        'w-full bg-white/40 border border-white/50 shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-blue-400 focus:bg-white transition-all appearance-none cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);
