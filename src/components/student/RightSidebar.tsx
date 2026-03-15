import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDENT_SCHEDULE } from '../../lib/mockData.ts';

export default function RightSidebar() {
  return (
    <aside className="w-80 hidden xl:flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-[#050505]/5 bg-[#fcf6e6]">

      {/* Schedule Timeline */}
      <div className="p-5 flex-1">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#050505]/40 mb-4 px-1 flex items-center gap-2">
          <Clock size={12} /> Today's Schedule
        </h3>
        <div className="relative">
          {/* Timeline bar */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#050505]/5 rounded-full" />

          <div className="space-y-1">
            {STUDENT_SCHEDULE.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative pl-6 py-2.5 rounded-xl transition-all ${
                  block.status === 'active'
                    ? 'bg-[#1A1A1A]/5'
                    : block.status === 'done'
                      ? 'opacity-40'
                      : ''
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  block.status === 'active'
                    ? 'border-[#1A1A1A] bg-[#1A1A1A]'
                    : block.status === 'done'
                      ? 'border-[#050505]/20 bg-[#050505]/10'
                      : 'border-[#050505]/15 bg-white'
                }`}>
                  {block.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-sm font-bold leading-tight ${block.status === 'active' ? 'text-[#1A1A1A]' : ''}`}>
                      {block.label}
                    </div>
                    {block.teacher && (
                      <div className="text-[10px] text-[#050505]/40 font-medium mt-0.5">{block.teacher}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] font-mono font-bold ${block.status === 'active' ? 'text-[#1A1A1A]' : 'text-[#050505]/40'}`}>
                      {block.time.split(' – ')[0]}
                    </div>
                    <div className="text-[9px] text-[#050505]/30 font-medium">{block.room}</div>
                  </div>
                </div>

                {block.status === 'active' && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] animate-pulse" />
                    <span className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-wider">Happening Now</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
