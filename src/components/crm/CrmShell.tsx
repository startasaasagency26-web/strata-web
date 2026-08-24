import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Clock,
  Send,
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
        className="w-[60px] h-[60px] rounded-full bg-gold text-void flex items-center justify-center shadow-xl shadow-gold/10 hover:bg-goldHover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset z-50 relative border-2 border-goldHover/40"
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
            className="absolute right-[80px] top-1/2 -translate-y-1/2 bg-surface2 backdrop-blur-xl border border-border shadow-2xl rounded-[32px] p-4 w-[280px]"
          >
            <div className="px-3 pb-3 pt-2 border-b border-border mb-3">
              <h3 className="text-[10px] font-mono font-bold text-muted uppercase tracking-[0.2em]">Quick Actions</h3>
            </div>
            <div className="space-y-1.5">
              {[
                { icon: <Users size={16} />, label: 'New Lead', onClick: () => navigate('/crm/leads?add=1') },
                { icon: <CalendarPlus size={16} />, label: 'Schedule Follow-up', onClick: () => navigate('/crm/follow-ups?create=1') },
                { icon: <Kanban size={16} />, label: 'Update Pipeline', onClick: () => navigate('/crm/pipeline') },
                { icon: <Settings size={16} />, label: 'System Settings', onClick: () => navigate('/crm/settings') },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => { action.onClick(); setIsOpen(false); }}
                  aria-label={action.label}
                  className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl text-sm font-bold text-text2 hover:bg-surface3 hover:text-text hover:shadow-sm transition-all border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <div className="w-10 h-10 rounded-full bg-surface3 flex items-center justify-center text-muted shrink-0">
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
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useCrmAuth();

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/crm', icon: <LayoutDashboard size={20} /> },
    { name: 'Leads', href: '/crm/leads', icon: <Users size={20} /> },
    { name: 'Pipeline', href: '/crm/pipeline', icon: <Kanban size={20} /> },
    { name: 'Follow-ups', href: '/crm/follow-ups', icon: <Clock size={20} /> },
    { name: 'Outreach', href: '/crm/outreach', icon: <Send size={20} /> },
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

  const handleGlobalSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = globalSearchTerm.trim();
    navigate(trimmed ? `/crm/leads?search=${encodeURIComponent(trimmed)}` : '/crm/leads');
  };

  return (
    <div className="flex h-screen bg-canvas text-text overflow-hidden font-sans relative">
      {/* Global Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgb(var(--gold)/0.05),transparent_42%)] z-0" />
      
      <QuickActions />

      {/* ── Sidebar — Desktop (dark pill) ─────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-surface relative z-30 shrink-0 my-4 ml-4 rounded-[32px] overflow-visible shadow-2xl shadow-gold/5 border border-gold/25"
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-20 shrink-0 border-b border-border',
          isSidebarOpen ? 'px-6 gap-3' : 'justify-center'
        )}>
          <Link to="/crm" className="flex items-center gap-3 min-w-0">
            <Logo variant="mark" tone="gold" className="h-7 w-auto shrink-0" />
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.span
                  key="crm-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-bold tracking-tight text-sm uppercase text-text overflow-hidden whitespace-nowrap"
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
                  aria-label={item.name}
                  className={cn(
                    'flex items-center rounded-2xl transition-all duration-200 relative w-full',
                    isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3.5',
                    active
                      ? 'bg-gold text-void shadow-sm shadow-gold/10'
                      : 'text-muted hover:text-text hover:bg-surface3'
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
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2 bg-surface2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap z-50 shadow-xl border border-border">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-text">{item.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border py-4 space-y-1 shrink-0 px-3">
          {/* User */}
          <div className={cn('flex items-center')}>
            <div className={cn(
              'flex items-center rounded-2xl w-full bg-surface2',
              isSidebarOpen ? 'gap-3 px-3 py-3' : 'justify-center py-3'
            )}>
              <div className="w-8 h-8 rounded-full bg-surface3 border border-borderStrong flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0 text-text">
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
                    <p className="text-[11px] font-bold tracking-widest uppercase text-text whitespace-nowrap truncate">
                      {profile?.fullName || 'User'}
                    </p>
                    <p className="text-[9px] font-mono text-muted uppercase tracking-widest whitespace-nowrap mt-0.5">
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
              aria-label="Log out"
              className={cn(
                'flex items-center w-full rounded-2xl text-muted hover:text-text hover:bg-surface3 transition-all duration-200 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
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
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2 bg-surface2 border border-border rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap z-50 shadow-xl">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-text">Logout</span>
              </div>
            )}
          </div>

          {/* Toggle */}
          <div className="pt-2 border-t border-border mt-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className={cn(
                'flex items-center w-full rounded-2xl text-muted hover:text-text hover:bg-surface3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
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
        <header className="h-20 bg-surface2 backdrop-blur-md border-b border-border flex items-center justify-between px-8 shrink-0 z-20 mx-4 mt-4 rounded-t-[32px] shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open CRM navigation"
              className="md:hidden text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <Menu size={24} />
            </button>
            <form
              onSubmit={handleGlobalSearch}
              className="hidden sm:flex items-center gap-3 bg-surface2 border border-border shadow-sm rounded-full px-5 py-2.5 w-full max-w-md focus-within:bg-surface3 focus-within:border-focus focus-within:ring-2 focus-within:ring-focus transition-all"
            >
              <Search size={16} className="text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search leads, companies..."
                value={globalSearchTerm}
                onChange={(event) => setGlobalSearchTerm(event.target.value)}
                aria-label="Search CRM leads"
                className="bg-transparent border-none outline-none text-sm font-semibold text-text w-full placeholder:text-muted"
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/crm/follow-ups')}
              aria-label="Open follow-ups"
              className="relative w-10 h-10 rounded-full bg-surface2 border border-border flex items-center justify-center text-muted hover:bg-surface3 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors shadow-sm"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-gold rounded-full border border-surface2" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-text">{profile?.fullName || 'User'}</p>
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted">{profile?.role || 'Guest'}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-gold/40 bg-gradient-to-br from-goldHover to-goldActive flex items-center justify-center font-display text-sm font-bold text-void shadow-sm">
                {profile?.fullName?.charAt(0) || profile?.email?.charAt(0) || '?'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="bg-surface2 backdrop-blur-sm border border-border rounded-b-[32px] p-6 md:p-8 shadow-sm min-h-full relative">
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
              className="fixed inset-0 bg-[rgb(var(--scrim)/0.70)] backdrop-blur-md z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-surface z-50 md:hidden flex flex-col shadow-2xl border-r border-gold/25"
            >
              <div className="px-6 h-20 flex items-center justify-between border-b border-border">
                <Link to="/crm" className="flex items-center gap-3">
                  <Logo variant="mark" tone="gold" className="h-7 w-auto" />
                  <span className="font-display font-bold tracking-tight text-sm uppercase text-text">Strata CRM</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close CRM navigation" className="w-10 h-10 rounded-full bg-surface3 flex items-center justify-center text-muted hover:text-text hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors">
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
                      isActive(item.href) ? 'bg-gold text-void' : 'text-muted hover:text-text hover:bg-surface3'
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  aria-label="Log out"
                  className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-muted hover:text-text hover:bg-surface3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-all duration-200 font-bold text-sm tracking-wide"
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
