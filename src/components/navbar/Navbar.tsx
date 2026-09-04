import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  Menu, 
  X,
  Bot
} from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onToggleAIChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onToggleAIChat }) => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard', authRequired: true },
    { id: 'builder', label: 'Resume Builder' },
    { id: 'cover-letter', label: 'Cover Letter' },
    ...(user?.isAdmin ? [{ id: 'admin', label: 'Admin Panel', authRequired: true }] : []),
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              ResumeAI <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-bold ml-1">PRO</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-slate-800/80 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Profile */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* AI Chat Button */}
          {onToggleAIChat && (
            <button
              onClick={onToggleAIChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 text-indigo-600 dark:text-cyan-400 hover:scale-105 transition-all shadow-sm"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask ResuAI</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Auth state */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user?.displayName}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/40"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[100px]">
                  {user?.displayName}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.displayName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 uppercase">
                      {user?.plan} Plan
                    </span>
                  </div>

                  <button
                    onClick={() => { onNavigate('dashboard'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                    Dashboard
                  </button>

                  <button
                    onClick={() => { onNavigate('builder'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-violet-500" />
                    Resume Builder
                  </button>

                  {user?.isAdmin && (
                    <button
                      onClick={() => { onNavigate('admin'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Control Panel
                    </button>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={() => { logout(); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('auth')}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={() => demoLogin('user')}>
                Demo Access
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                currentPage === link.id
                  ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          {!isAuthenticated && (
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="w-full" onClick={() => { demoLogin('user'); setMobileMenuOpen(false); }}>
                Try Demo
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
