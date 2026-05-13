import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Clock,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Plus,
  CalendarPlus
} from 'lucide-react';
import { Logo } from '../Logo';
import { cn } from '../../lib/utils';
import { useCrmAuth } from '../../contexts/CrmAuthContext';

interface CrmShellProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Quick Actions"
        className="w-[60px] h-[60px] rounded-full bg-[#111827] text-white flex items-center justify-center shadow-xl hover:bg-gray-800 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 z-50 relative border-2 border-white/10"
      >
        <Plus size={24} className={cn("transition-transform duration-300", isOpen && "rotate-45")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[80px] top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[32px] p-4 w-[280px]"
          >
            <div className="px-3 pb-3 pt-2 border-b border-gray-200/50 mb-3">
              <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">Quick Actions</h3>
            </div>
            <div className="space-y-1.5">
              {[
                { icon: <Users size={16} />, label: 'New Lead', onClick: () => navigate('/crm/leads') },
                { icon: <CalendarPlus size={16} />, label: 'Schedule Follow-up', onClick: () => navigate('/crm/follow-ups') },
                { icon: <Kanban size={16} />, label: 'Update Pipeline', onClick: () => navigate('/crm/pipeline') },
                { icon: <Settings size={16} />, label: 'System Settings', onClick: () => navigate('/crm/settings') },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => { action.onClick(); setIsOpen(false); }}
                  className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all border border-transparent hover:border-gray-200/50"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    {action.icon}
                  </div>
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CrmShell: React.FC<CrmShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useCrmAuth();

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/crm', icon: <LayoutDashboard size={20} /> },
    { name: 'Leads', href: '/crm/leads', icon: <Users size={20} /> },
    { name: 'Pipeline', href: '/crm/pipeline', icon: <Kanban size={20} /> },
    { name: 'Follow-ups', href: '/crm/follow-ups', icon: <Clock size={20} /> },
    { name: 'Settings', href: '/crm/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (href: string) => {
    if (href === '/crm') return location.pathname === '/crm';
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/crm/login');
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA] text-gray-900 overflow-hidden font-sans relative">
      {/* Global Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E2F0F9] via-[#F0F4EC] to-[#E9F3D8] z-0" />
      
      <QuickActions />

      {/* ── Sidebar — Desktop (dark pill) ─────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-[#111827] relative z-30 shrink-0 my-4 ml-4 rounded-[32px] overflow-visible shadow-2xl border border-white/10"
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-20 shrink-0 border-b border-white/5',
          isSidebarOpen ? 'px-6 gap-3' : 'justify-center'
        )}>
          <Link to="/crm" className="flex items-center gap-3 min-w-0">
            <Logo className="h-7 w-auto shrink-0 brightness-200" />
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.span
                  key="crm-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-bold tracking-tight text-sm uppercase text-white overflow-hidden whitespace-nowrap"
                >
                  Strata CRM
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 overflow-visible px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.name} className="relative group flex justify-center">
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center rounded-2xl transition-all duration-200 relative w-full',
                    isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3.5',
                    active
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-white/40 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="shrink-0 relative z-10">{item.icon}</span>
                  <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[11px] font-bold tracking-[0.1em] uppercase whitespace-nowrap overflow-hidden z-10 relative"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Tooltip when collapsed */}
                {!isSidebarOpen && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap z-50 shadow-xl border border-gray-100">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#111827]">{item.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 py-4 space-y-1 shrink-0 px-3">
          {/* User */}
          <div className={cn('flex items-center')}>
            <div className={cn(
              'flex items-center rounded-2xl w-full bg-white/5',
              isSidebarOpen ? 'gap-3 px-3 py-3' : 'justify-center py-3'
            )}>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0 text-white">
                {profile?.fullName?.charAt(0) || profile?.email?.charAt(0) || '?'}
              </div>
              <AnimatePresence initial={false}>
                {isSidebarOpen && (
                  <motion.div
                    key="user-info"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden min-w-0"
                  >
                    <p className="text-[11px] font-bold tracking-widest uppercase text-white whitespace-nowrap truncate">
                      {profile?.fullName || 'User'}
                    </p>
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest whitespace-nowrap mt-0.5">
                      {profile?.role || 'Guest'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Logout */}
          <div className="relative group">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center w-full rounded-2xl text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 mt-1',
                isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3.5'
              )}
            >
              <LogOut size={18} className="shrink-0" />
              <AnimatePresence initial={false}>
                {isSidebarOpen && (
                  <motion.span
                    key="logout-label"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[11px] font-bold tracking-[0.1em] uppercase whitespace-nowrap overflow-hidden"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {!isSidebarOpen && (
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2 bg-[#111827] border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap z-50 shadow-xl">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white">Logout</span>
              </div>
            )}
          </div>

          {/* Toggle */}
          <div className="pt-2 border-t border-white/5 mt-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                'flex items-center w-full rounded-2xl text-white/20 hover:text-white hover:bg-white/10 transition-all duration-200',
                isSidebarOpen ? 'gap-3 px-4 py-2.5' : 'justify-center py-2.5'
              )}
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              <AnimatePresence initial={false}>
                {isSidebarOpen && (
                  <motion.span
                    key="collapse-label"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap overflow-hidden"
                  >
                    Collapse
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">

        {/* Topbar */}
        <header className="h-20 bg-white/40 backdrop-blur-md border-b border-white/50 flex items-center justify-between px-8 shrink-0 z-20 mx-4 mt-4 rounded-t-[32px] shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-white/60 border border-white/50 shadow-sm rounded-full px-5 py-2.5 w-full max-w-md focus-within:bg-white focus-within:shadow-md transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search leads, companies..."
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-900 w-full placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full bg-white/60 border border-white/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#2D5BFF] rounded-full border border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/50">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">{profile?.fullName || 'User'}</p>
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">{profile?.role || 'Guest'}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-display text-sm font-bold text-white shadow-sm">
                {profile?.fullName?.charAt(0) || profile?.email?.charAt(0) || '?'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-b-[32px] p-6 md:p-8 shadow-sm min-h-full relative">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile Menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#111827]/40 backdrop-blur-md z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#111827] z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="px-6 h-20 flex items-center justify-between border-b border-white/5">
                <Link to="/crm" className="flex items-center gap-3">
                  <Logo className="h-7 w-auto brightness-200" />
                  <span className="font-display font-bold tracking-tight text-sm uppercase text-white">Strata CRM</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-1.5">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold text-sm tracking-wide',
                      isActive(item.href) ? 'bg-white text-[#111827]' : 'text-white/50 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 font-bold text-sm tracking-wide"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
