import React from 'react';
import { LayoutGrid, UserCheck, Megaphone, HelpCircle, Settings, LogOut } from 'lucide-react';
import { HELP_REQUESTS, SCHEDULE } from '../../lib/mockData.ts';
import type { SidebarTab } from '../../lib/mockData.ts';

const SIDEBAR_TABS: { key: SidebarTab; icon: any; label: string }[] = [
  { key: 'grid', icon: LayoutGrid, label: 'Live Grid' },
  { key: 'countin', icon: UserCheck, label: 'Count In' },
  { key: 'announcements', icon: Megaphone, label: 'Learn Log' },
  { key: 'help', icon: HelpCircle, label: 'Help' },
];

interface SidebarNavProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onLogout: () => void;
}

export default function SidebarNav({ activeTab, onTabChange, onLogout }: SidebarNavProps) {
  return (
    <>
      <aside className="w-[260px] bg-white border-r border-[#050505]/5 flex-col hidden md:flex shrink-0">
        {/* Tabs */}
        <nav className="p-3 space-y-1 flex-1">
          {SIDEBAR_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const unreadCount = tab.key === 'help' ? HELP_REQUESTS.filter(h => h.unread).length : 0;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm relative ${
                  isActive 
                    ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]' 
                    : 'text-[#050505]/60 hover:bg-[#050505]/5 hover:text-[#050505]'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {isActive && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#1A1A1A]" />}
                {unreadCount > 0 && !isActive && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Other — Profile & Settings */}
        <div className="border-t border-[#050505]/5 p-3 space-y-1">
          <div className="text-xs font-bold text-[#050505]/40 mb-2 px-4 uppercase tracking-widest">Other</div>
          <button
            onClick={() => onTabChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeTab === 'profile'
                ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
                : 'text-[#050505]/60 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <UserCheck size={18} />
            Profile
            {activeTab === 'profile' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#1A1A1A]" />}
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              activeTab === 'settings'
                ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
                : 'text-[#050505]/60 hover:bg-[#050505]/5 hover:text-[#050505]'
            }`}
          >
            <Settings size={18} />
            Settings
            {activeTab === 'settings' && <div className="ml-auto w-1.5 h-5 rounded-full bg-[#1A1A1A]" />}
          </button>
        </div>

        {/* Today's Schedule */}
        <div className="border-t border-[#050505]/5 p-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#050505]/40 mb-3 px-1">Today's Schedule</h4>
          <div className="space-y-1.5">
            {SCHEDULE.map((block, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all ${
                block.active 
                  ? 'bg-[#1A1A1A]/10 text-[#1A1A1A] font-bold' 
                  : block.done
                    ? 'text-[#050505]/30 line-through'
                    : 'text-[#050505]/60 font-medium'
              }`}>
                <span className="font-mono w-10 shrink-0">{block.time}</span>
                <span className="truncate">{block.label}</span>
                {block.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1A1A1A] animate-pulse" />}
              </div>
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

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#050505]/10 flex items-center justify-around px-2 py-3 z-40 pb-safe">
        {SIDEBAR_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const unreadCount = tab.key === 'help' ? HELP_REQUESTS.filter(h => h.unread).length : 0;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative w-16 ${
                isActive ? 'text-[#1A1A1A]' : 'text-[#050505]/40 hover:text-[#050505]/70'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-[#1A1A1A]/10' : ''}`}>
                <Icon size={20} />
              </div>
              <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-[#1A1A1A]' : 'text-[#050505]/40'}`}>
                {tab.label === 'Live Grid' ? 'Grid' : tab.label === 'Count In' ? 'Count' : tab.label === 'Learn Log' ? 'Log' : tab.label}
              </span>
              {unreadCount > 0 && !isActive && (
                <span className="absolute top-1 max-w-[20px] truncate right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
