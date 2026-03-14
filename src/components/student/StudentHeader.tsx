import React from 'react';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';

interface StudentHeaderProps {
  user: any;
  mins: number;
  secs: number;
  onLogout: () => void;
}

export default function StudentHeader({ user, mins, secs, onLogout }: StudentHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
      {/* Left: Class + Attendance */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#066606] rounded-xl flex items-center justify-center">
            <BookOpen size={15} className="text-[#fcf6e6]" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">Science 102</div>
            <div className="text-[9px] font-semibold text-[#050505]/35 uppercase tracking-widest">Current Class</div>
          </div>
        </div>

        <div className="h-6 w-px bg-[#050505]/10 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
          <CheckCircle2 size={13} />
          <span className="text-[11px] font-bold">Present</span>
        </div>
      </div>

      {/* Right: Timer */}
      <div className="flex items-center gap-2 bg-[#fcf6e6] px-3.5 py-1.5 rounded-full border border-[#050505]/5">
        <Clock size={14} className="text-[#066606]" />
        <span className="font-bold text-sm font-mono tabular-nums">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
        <span className="text-[10px] font-semibold opacity-35">left</span>
      </div>
    </div>
  );
}
