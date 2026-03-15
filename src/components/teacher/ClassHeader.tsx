import React, { useState } from 'react';
import { BookOpen, ChevronDown, Clock, LogOut, Settings, UserCheck } from 'lucide-react';
import { useToast } from '../../Toast.tsx';
import { CLASSES } from '../../lib/mockData.ts';
import type { SidebarTab } from '../../lib/mockData.ts';

interface ClassHeaderProps {
  selectedClass: typeof CLASSES[0];
  onSelectClass: (cls: typeof CLASSES[0]) => void;
  mins: number;
  secs: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  user: any;
  onLogout: () => void;
  onTabChange?: (tab: SidebarTab) => void;
}

export default function ClassHeader({ selectedClass, onSelectClass, mins, secs, presentCount, absentCount, lateCount, user, onLogout, onTabChange }: ClassHeaderProps) {
  const { showToast } = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-[72px] bg-white border-b border-[#050505]/5 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
      {/* Left: Class Selector */}
      <div className="flex items-center gap-6">
        <div className="md:hidden">
          <img src="/kalm_logo.png" alt="kalm logo" className="h-6 object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            <BookOpen size={16} className="text-[#fcf6e6]" />
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 font-bold text-lg hover:text-[#1A1A1A] transition-colors">
              {selectedClass.name}
              <ChevronDown size={16} className="opacity-40" />
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#050505]/10 py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {CLASSES.map(cls => (
                <button 
                  key={cls.id}
                  onClick={() => { onSelectClass(cls); showToast(`Switched to ${cls.name}`); }}
                  className={`w-full text-left px-4 py-3 hover:bg-[#fcf6e6] transition flex justify-between items-center ${selectedClass.id === cls.id ? 'text-[#1A1A1A] font-bold' : 'font-medium'}`}
                >
                  {cls.name}
                  <span className="text-xs opacity-40">{cls.students} students</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-[#050505]/10 hidden md:block" />
        
        {/* Timer */}
        <div className="hidden md:flex items-center gap-2 bg-[#fcf6e6] px-4 py-2 rounded-full border border-[#050505]/5">
          <Clock size={16} className="text-[#1A1A1A]" />
          <span className="font-bold text-sm font-mono tabular-nums">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold opacity-40">left</span>
        </div>

        <div className="h-8 w-px bg-[#050505]/10 hidden lg:block" />

        {/* Attendance Summary */}
        <div className="hidden lg:flex items-center gap-4 text-sm font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" /> {presentCount} Present
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> {absentCount} Absent
          </span>
          {lateCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> {lateCount} Late
            </span>
          )}
        </div>
      </div>

      {/* Right: User + Logout Dropdown */}
      <div className="relative">
        <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-2xl hover:bg-[#050505]/5 transition">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold">{user ? user.name : 'Mrs. Anderson'}</div>
            <div className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider">{user?.role || 'Teacher'}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center font-bold text-[#1A1A1A] border border-[#1A1A1A]/20">
            {user ? user.name[0] : 'M'}
          </div>
        </div>

        {isProfileOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#050505]/5 py-2 w-48 z-50 overflow-hidden">
            <button onClick={() => { setIsProfileOpen(false); onTabChange?.('profile'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
              <UserCheck size={16} className="opacity-50" /> Profile
            </button>
            <button onClick={() => { setIsProfileOpen(false); onTabChange?.('settings'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
              <Settings size={16} className="opacity-50" /> Settings
            </button>
            <div className="h-px bg-[#050505]/5 my-1" />
            <button onClick={() => { setIsProfileOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-3 text-sm font-bold text-[#050505]/60">
              <LogOut size={16} className="opacity-50" /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
