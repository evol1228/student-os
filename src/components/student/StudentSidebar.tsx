import React, { useState } from 'react';
import { Home, BookOpen, FolderOpen, LogOut, ExternalLink, Settings, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../../Toast.tsx';

interface StudentSidebarProps {
  user: any;
  activeView: 'home' | 'learnlog' | 'profile' | 'settings';
  onViewChange: (view: 'home' | 'learnlog' | 'profile' | 'settings') => void;
  onLogout: () => void;
}

const QUICK_APPS_EXTERNAL = [
  { id: 1, label: 'Drive', icon: '📁', color: 'bg-blue-50 text-blue-600 border-blue-100', href: 'https://drive.google.com' },
  { id: 2, label: 'Calculator', icon: '🧮', color: 'bg-orange-50 text-orange-600 border-orange-100', href: 'https://www.online-calculator.com/simple-calculator/' },
  { id: 3, label: 'Email', icon: '✉️', color: 'bg-green-50 text-green-600 border-green-100', href: 'https://mail.google.com' },
];

export default function StudentSidebar({ user, activeView, onViewChange, onLogout }: StudentSidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-[#050505]/5 hidden lg:flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Profile Block */}
        <div className="p-5 border-b border-[#050505]/5 relative">
          <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 mb-4 cursor-pointer group hover:bg-[#050505]/5 p-2 -m-2 rounded-xl transition">
            <div className="w-11 h-11 bg-[#066606]/10 rounded-2xl flex items-center justify-center font-black text-[#066606] text-lg border border-[#066606]/10">
              {user.name[0]}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold truncate group-hover:text-[#066606] transition-colors">{user.name}</div>
              <div className="text-[10px] font-semibold text-[#050505]/40 uppercase tracking-widest">{user.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold">Online</span>
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute top-[80px] left-5 right-5 bg-white rounded-2xl shadow-xl border border-[#050505]/5 py-2 z-50 overflow-hidden"
              >
                <button onClick={() => { setIsProfileOpen(false); onViewChange('profile'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
                  <UserCheck size={16} className="opacity-50" /> Profile
                </button>
                <button onClick={() => { setIsProfileOpen(false); onViewChange('settings'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
                  <Settings size={16} className="opacity-50" /> Settings
                </button>
                <div className="h-px bg-[#050505]/5 my-1" />
                <button onClick={() => { setIsProfileOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-3 text-sm font-bold text-[#050505]/60">
                  <LogOut size={16} className="opacity-50" /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1">
          {/* Home — internal view */}
          <button
            onClick={() => onViewChange('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeView === 'home'
                ? 'bg-[#066606]/10 text-[#066606]'
                : 'text-[#050505]/50 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <Home size={18} />
            Home
            {activeView === 'home' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#066606]" />}
          </button>

          {/* Learn Log — internal view */}
          <button
            onClick={() => onViewChange('learnlog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeView === 'learnlog'
                ? 'bg-[#066606]/10 text-[#066606]'
                : 'text-[#050505]/50 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <BookOpen size={18} />
            Learn Log
            {activeView === 'learnlog' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#066606]" />}
          </button>

          {/* My Files — external link */}
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm text-[#050505]/50 hover:bg-[#050505]/5 hover:text-[#050505]"
          >
            <FolderOpen size={18} />
            <span className="underline decoration-black/20 underline-offset-2">My Files</span>
            <ExternalLink size={12} className="ml-auto opacity-30" />
          </a>
        </nav>

        {/* Other — Profile & Settings */}
        <div className="border-t border-[#050505]/5 p-3 space-y-1">
          <div className="text-xs font-bold text-[#050505]/40 mb-2 px-4 uppercase tracking-widest">Other</div>
          <button
            onClick={() => onViewChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeView === 'profile'
                ? 'bg-[#066606]/10 text-[#066606]'
                : 'text-[#050505]/50 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <UserCheck size={18} />
            Profile
            {activeView === 'profile' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#066606]" />}
          </button>
          <button
            onClick={() => onViewChange('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeView === 'settings'
                ? 'bg-[#066606]/10 text-[#066606]'
                : 'text-[#050505]/50 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <Settings size={18} />
            Settings
            {activeView === 'settings' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#066606]" />}
          </button>
        </div>

        {/* Quick Apps — external links */}
        <div className="p-4 border-t border-[#050505]/5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#050505]/40 mb-3 px-1">Quick Apps</h4>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_APPS_EXTERNAL.map(app => (
              <motion.a
                key={app.id}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border transition-shadow hover:shadow-md ${app.color}`}
              >
                <span className="text-xl">{app.icon}</span>
                <span className="text-[10px] font-bold">{app.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-[#050505]/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-[#050505]/40 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#050505]/10 flex items-center justify-around px-4 py-3 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative w-20 ${
            activeView === 'home' ? 'text-[#066606]' : 'text-[#050505]/40 hover:text-[#050505]/70'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${activeView === 'home' ? 'bg-[#066606]/10' : ''}`}>
            <Home size={22} />
          </div>
          <span className={`text-[10px] font-bold mt-1 ${activeView === 'home' ? 'text-[#066606]' : 'text-[#050505]/40'}`}>
            Home
          </span>
        </button>

        <button
          onClick={() => onViewChange('learnlog')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative w-20 ${
            activeView === 'learnlog' ? 'text-[#066606]' : 'text-[#050505]/40 hover:text-[#050505]/70'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${activeView === 'learnlog' ? 'bg-[#066606]/10' : ''}`}>
            <BookOpen size={22} />
          </div>
          <span className={`text-[10px] font-bold mt-1 ${activeView === 'learnlog' ? 'text-[#066606]' : 'text-[#050505]/40'}`}>
            Learn Log
          </span>
        </button>

        <a
          href="https://drive.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl transition-all relative w-20 text-[#050505]/40 hover:text-[#050505]/70"
        >
          <div className="p-1.5 rounded-xl transition-colors">
            <FolderOpen size={22} />
          </div>
          <span className="text-[10px] font-bold mt-1 flex items-center gap-0.5">
            Files <ExternalLink size={8} />
          </span>
        </a>
      </nav>
    </>
  );
}
