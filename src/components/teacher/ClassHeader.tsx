import React from 'react';
import { BookOpen, ChevronDown, Clock, LogOut } from 'lucide-react';
import { useToast } from '../../Toast.tsx';
import { CLASSES } from '../../lib/mockData.ts';

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
}

export default function ClassHeader({ selectedClass, onSelectClass, mins, secs, presentCount, absentCount, lateCount, user, onLogout }: ClassHeaderProps) {
  const { showToast } = useToast();

  return (
    <header className="h-[72px] bg-white border-b border-[#050505]/5 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
      {/* Left: Class Selector */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#066606] rounded-lg flex items-center justify-center">
            <BookOpen size={16} className="text-[#fcf6e6]" />
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 font-bold text-lg hover:text-[#066606] transition-colors">
              {selectedClass.name}
              <ChevronDown size={16} className="opacity-40" />
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#050505]/10 py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {CLASSES.map(cls => (
                <button 
                  key={cls.id}
                  onClick={() => { onSelectClass(cls); showToast(`Switched to ${cls.name}`); }}
                  className={`w-full text-left px-4 py-3 hover:bg-[#fcf6e6] transition flex justify-between items-center ${selectedClass.id === cls.id ? 'text-[#066606] font-bold' : 'font-medium'}`}
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
          <Clock size={16} className="text-[#066606]" />
          <span className="font-bold text-sm font-mono tabular-nums">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold opacity-40">left</span>
        </div>

        <div className="h-8 w-px bg-[#050505]/10 hidden lg:block" />

        {/* Attendance Summary */}
        <div className="hidden lg:flex items-center gap-4 text-sm font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> {presentCount} Present
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

      {/* Right: User + Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold">{user ? user.name : 'Mrs. Anderson'}</div>
          <div className="text-[10px] font-bold text-[#066606] uppercase tracking-wider">{user?.role || 'Teacher'}</div>
        </div>
        <button onClick={onLogout} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
          <LogOut size={20} className="opacity-50" />
        </button>
      </div>
    </header>
  );
}
