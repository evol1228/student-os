import React from 'react';
import { motion } from 'motion/react';

interface CountInProps {
  roster: any[];
  className: string;
  onUpdateAttendance: (id: number, status: string) => void;
}

export default function CountIn({ roster, className, onUpdateAttendance }: CountInProps) {
  return (
    <motion.div key="countin" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Count In — Attendance</h2>
        <div className="text-sm font-semibold text-[#050505]/40">{className}</div>
      </div>
      <div className="bg-white rounded-[2rem] border border-[#050505]/5 shadow-sm overflow-hidden">
        {roster.map((student, i) => (
          <div key={student.id} className={`flex items-center justify-between px-6 py-4 ${i < roster.length - 1 ? 'border-b border-[#050505]/5' : ''} hover:bg-[#fcf6e6]/50 transition-colors`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#fcf6e6] rounded-full flex items-center justify-center font-black text-[#066606] border border-[#050505]/5">
                {student.name[0]}
              </div>
              <span className="font-bold">{student.name}</span>
            </div>
            <div className="flex gap-2">
              {(['present', 'absent', 'late', 'excused'] as const).map(status => {
                const isActive = student.attendance === status;
                const colors: Record<string, string> = {
                  present: isActive ? 'bg-green-500 text-white border-green-500' : 'border-[#050505]/10 text-[#050505]/50 hover:border-green-300 hover:text-green-600',
                  absent: isActive ? 'bg-red-500 text-white border-red-500' : 'border-[#050505]/10 text-[#050505]/50 hover:border-red-300 hover:text-red-600',
                  late: isActive ? 'bg-yellow-500 text-white border-yellow-500' : 'border-[#050505]/10 text-[#050505]/50 hover:border-yellow-300 hover:text-yellow-600',
                  excused: isActive ? 'bg-blue-500 text-white border-blue-500' : 'border-[#050505]/10 text-[#050505]/50 hover:border-blue-300 hover:text-blue-600',
                };
                return (
                  <button
                    key={status}
                    onClick={() => onUpdateAttendance(student.id, status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border capitalize transition-all ${colors[status]}`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
