import React, { useState } from 'react';
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
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Sidebar — Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col border-r border-white/10 bg-[#0A0A0A] relative z-30 shrink-0"
      >
        {/* Logo */}
        <div className={cn('flex items-center h-16 border-b border-white/10 shrink-0', isSidebarOpen ? 'px-5 gap-3' : 'justify-center')}>
          <Link to="/crm" className="flex items-center gap-3 min-w-0">
            <Logo className="h-7 w-auto shrink-0" />
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.span
                  key="crm-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-bold tracking-tight text-base uppercase overflow-hidden whitespace-nowrap"
                >
                  Strata CRM
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 overflow-hidden">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.name} className="relative group px-2">
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center rounded-xl transition-all duration-200',
                    isSidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center py-3',
                    active
                      ? 'bg-white text-black'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Active indicator when collapsed */}
                {active && !isSidebarOpen && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-white rounded-r-full" />
                )}

                {/* Tooltip when collapsed */}
                {!isSidebarOpen && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-[#1a1a1a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white">{item.name}</span>
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1a1a]" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer — User + Logout */}
        <div className="border-t border-white/10 py-3 space-y-1 shrink-0">
          {/* User badge */}
          <div className={cn('flex items-center px-2')}>
            <div
              className={cn(
                'flex items-center rounded-xl transition-all duration-200 w-full',
                isSidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center py-2.5'
              )}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/15 flex items-center justify-center font-mono text-[11px] font-bold uppercase shrink-0">
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
                    <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-white whitespace-nowrap truncate">
                      {profile?.fullName || 'User'}
                    </p>
                    <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest whitespace-nowrap">
                      {profile?.role || 'Guest'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Logout */}
          <div className="relative group px-2">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200',
                isSidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center py-2.5'
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
                    className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase whitespace-nowrap overflow-hidden"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {!isSidebarOpen && (
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-[#1a1a1a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-red-400">Logout</span>
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1a1a]" />
              </div>
            )}
          </div>

          {/* Toggle button */}
          <div className="px-2 pt-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                'flex items-center w-full rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all duration-200',
                isSidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-2'
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
                    className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden"
                  >
                    Collapse
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 bg-[#0A0A0A]/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white/60 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-full max-w-sm group focus-within:border-white/30 transition-all">
              <Search size={15} className="text-white/40 group-focus-within:text-white shrink-0" />
              <input
                type="text"
                placeholder="Search leads, companies..."
                className="bg-transparent border-none outline-none text-xs font-mono tracking-wider w-full placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-mono font-bold tracking-widest uppercase">{profile?.fullName || 'User'}</p>
                <p className="text-[8px] font-mono text-white/40 uppercase">{profile?.role || 'Guest'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold uppercase">
                {profile?.fullName?.charAt(0) || profile?.email?.charAt(0) || '?'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505] relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 p-6 md:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[260px] bg-[#0A0A0A] border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <Link to="/crm" className="flex items-center gap-3">
                  <Logo className="h-7 w-auto" />
                  <span className="font-display font-bold tracking-tight text-base uppercase">Strata CRM</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                      isActive(item.href)
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {item.icon}
                    <span className="text-xs font-mono font-bold tracking-[0.15em] uppercase">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="p-3 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span className="text-xs font-mono font-bold tracking-[0.15em] uppercase">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
