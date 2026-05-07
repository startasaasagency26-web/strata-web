import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { LeadStatus, LeadPriority } from '../../types/crm';

// --- Badges ---

export const StatusBadge: React.FC<{ status: LeadStatus, className?: string }> = ({ status, className }) => {
  const styles: Record<LeadStatus, string> = {
    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    qualified: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    discovery_scheduled: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    proposal_sent: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    negotiating: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    won: "bg-green-500/10 text-green-400 border-green-500/20",
    lost: "bg-red-500/10 text-red-400 border-red-500/20",
    unresponsive: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border whitespace-nowrap",
      styles[status],
      className
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: LeadPriority, className?: string }> = ({ priority, className }) => {
  const styles: Record<LeadPriority, string> = {
    hot: "bg-red-500/20 text-red-400",
    warm: "bg-orange-500/20 text-orange-400",
    cold: "bg-blue-500/20 text-blue-400",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tighter uppercase",
      styles[priority],
      className
    )}>
      {priority}
    </span>
  );
};

// --- Metrics ---

export const MetricCard: React.FC<{ 
  label: string, 
  value: string | number, 
  trend?: string, 
  trendUp?: boolean,
  icon?: React.ReactNode 
}> = ({ label, value, trend, trendUp, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between hover:border-white/20 transition-colors group"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/60 transition-colors">
        {label}
      </span>
      {icon && <span className="text-white/20 group-hover:text-white/40 transition-colors">{icon}</span>}
    </div>
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-display font-bold text-white uppercase tracking-tight">{value}</span>
      {trend && (
        <span className={cn(
          "text-[10px] font-mono font-bold",
          trendUp ? "text-emerald-400" : "text-red-400"
        )}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  </motion.div>
);

// --- States ---

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <Loader2 size={32} className="text-white/20 animate-spin" />
    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/40 uppercase">{message}</span>
  </div>
);

export const ErrorState: React.FC<{ message: string, onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
      <AlertCircle size={32} />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-display font-bold uppercase tracking-tight">Operation Failed</h3>
      <p className="text-sm text-white/40 leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-6 py-2 rounded-full border border-white/20 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
      >
        Retry Operation
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{ title: string, message: string, icon?: React.ReactNode }> = ({ title, message, icon }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
    {icon ? (
      <div className="text-white/10">{icon}</div>
    ) : (
      <div className="w-16 h-16 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10">
        <Loader2 size={32} className="opacity-20" />
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-xl font-display font-bold uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{message}</p>
    </div>
  </div>
);

// --- Form Elements ---

export const CrmInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
        {label}
      </label>
    )}
    <input
      className={cn(
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30 transition-all placeholder:text-white/10",
        className
      )}
      {...props}
    />
  </div>
);

export const CrmSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
        {label}
      </label>
    )}
    <select
      className={cn(
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30 transition-all appearance-none cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);
