import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, EmptyState } from '../../components/crm/CrmUI';
import { getFollowUps, updateFollowUp } from '../../lib/crm/client';
import type { FollowUp } from '../../types/crm';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const FollowUps = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'due' | 'upcoming' | 'completed'>('due');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFollowUps();
        setFollowUps(data);
      } catch (err) {
        setError('Failed to load follow-ups.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMarkDone = async (id: string) => {
    try {
      await updateFollowUp(id, { status: 'completed', completedAt: new Date().toISOString() });
      setFollowUps(followUps.map(f => f.id === id ? { ...f, status: 'completed' } : f));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const filteredTasks = followUps.filter(f => {
    if (activeTab === 'completed') return f.status === 'completed';
    const isDue = new Date(f.dueAt).getTime() < new Date().getTime() + 86400000;
    if (activeTab === 'due') return f.status === 'pending' && isDue;
    return f.status === 'pending' && !isDue;
  });

  if (isLoading) return <CrmShell><LoadingState message="Organizing your agenda..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-white mb-2">Follow-up Manager</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Task discipline & relationship pacing</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
            {[
              { id: 'due', name: 'Due Today' },
              { id: 'upcoming', name: 'Upcoming' },
              { id: 'completed', name: 'Done' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase transition-all",
                  activeTab === tab.id ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  task.status === 'completed' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                )}>
                  {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
                <div className="min-w-0">
                  <h3 className={cn(
                    "text-lg font-bold text-white mb-1 truncate",
                    task.status === 'completed' && "text-white/40 line-through"
                  )}>{task.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Lead: {task.leadId}</span>
                    <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={10} /> {new Date(task.dueAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <Link 
                  to={`/crm/leads/${task.leadId}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono font-bold tracking-widest text-white/60 hover:text-white transition-all uppercase"
                >
                  Open Lead <ExternalLink size={10} />
                </Link>
                {task.status === 'pending' && (
                  <button 
                    onClick={() => handleMarkDone(task.id)}
                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-mono text-[9px] font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filteredTasks.length === 0 && (
            <EmptyState 
              title="All caught up" 
              message={`You have no ${activeTab === 'completed' ? 'completed tasks yet' : `${activeTab} follow-ups at the moment`}.`}
              icon={<CheckCircle2 size={40} className="text-white/5" />}
            />
          )}
        </div>
      </div>
    </CrmShell>
  );
};
