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
  ChevronRight
} from 'lucide-react';
import { Logo } from '../Logo';
import { cn } from '../../lib/utils';
import { useCrmAuth } from '../../contexts/CrmAuthContext';

interface CrmShellProps {
  children: React.ReactNode;
}

export const CrmShell: React.FC<CrmShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useCrmAuth();

  const navItems = [
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
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col border-r border-white/10 bg-[#0A0A0A] relative z-30"
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/crm" className="flex items-center gap-3">
            <Logo className="h-8 w-auto" />
            {isSidebarOpen && (
              <span className="font-display font-bold tracking-tight text-xl uppercase">CRM</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive(item.href) 
                  ? "bg-white text-black" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && (
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                  {item.name}
                </span>
              )}
              {isActive(item.href) && !isSidebarOpen && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-full -translate-x-1" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && (
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase">Logout</span>
            )}
          </button>
        </div>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center border border-white/10 hover:scale-110 transition-transform"
        >
          <ChevronRight size={14} className={cn("transition-transform duration-300", isSidebarOpen && "rotate-180")} />
        </button>
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
            <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-full max-w-md group focus-within:border-white/30 transition-all">
              <Search size={16} className="text-white/40 group-focus-within:text-white" />
              <input
                type="text"
                placeholder="Search leads, companies..."
                className="bg-transparent border-none outline-none text-xs font-mono tracking-wider w-full placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
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
        <main className="flex-1 overflow-y-auto bg-[#050505] relative custom-scrollbar">
          {/* Subtle Background Elements */}
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
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0A0A0A] border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <Link to="/crm" className="flex items-center gap-3">
                  <Logo className="h-8 w-auto" />
                  <span className="font-display font-bold tracking-tight text-xl uppercase">CRM</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300",
                      isActive(item.href) 
                        ? "bg-white text-black" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.icon}
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
