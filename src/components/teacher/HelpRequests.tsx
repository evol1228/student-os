import React from 'react';
import { motion } from 'motion/react';
import { HELP_REQUESTS } from '../../lib/mockData.ts';

export default function HelpRequests() {
  return (
    <motion.div key="help" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Help Requests</h2>
        <span className="text-sm font-bold text-[#050505]/40">{HELP_REQUESTS.filter(h => h.unread).length} unread</span>
      </div>
      <div className="space-y-3">
        {HELP_REQUESTS.map(req => (
          <div key={req.id} className={`bg-white p-5 rounded-[2rem] border shadow-sm flex items-start gap-4 transition-all hover:shadow-md ${req.unread ? 'border-[#1A1A1A]/20' : 'border-[#050505]/5'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${req.unread ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]' : 'bg-[#fcf6e6] text-[#050505]/40'}`}>
              {req.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{req.name}</span>
                <span className="text-[10px] font-bold text-[#050505]/40 uppercase tracking-wider">{req.time}</span>
              </div>
              <p className="text-sm text-[#050505]/60 font-medium leading-relaxed">{req.msg}</p>
            </div>
            {req.unread && <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] shrink-0 mt-2" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
