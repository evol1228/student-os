import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, FileText, MonitorUp, Send, Users } from 'lucide-react';
import { useToast } from '../../Toast.tsx';

interface FloatingDockProps {
  roster: any[];
  onOpenExam: () => void;
}

function DockButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full hover:bg-white/10 transition-colors text-white group relative"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs font-medium mt-1.5 opacity-80 group-hover:opacity-100">{label}</span>
      
      <div className="absolute -top-12 bg-[#050505] text-[#fcf6e6] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block whitespace-nowrap shadow-xl">
        {label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#050505] rotate-45"></div>
      </div>
    </button>
  );
}

export default function FloatingDock({ roster, onOpenExam }: FloatingDockProps) {
  const [castOpen, setCastOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-[#066606]/95 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl flex items-center gap-1 sm:gap-2 relative">
        <DockButton icon={<Lock size={20} />} label="Lock Class" onClick={() => showToast("Class locked successfully.")} />
        <DockButton icon={<FileText size={20} />} label="Force Exam" onClick={onOpenExam} />
        <DockButton icon={<MonitorUp size={20} />} label="Cast Screen" onClick={() => setCastOpen(!castOpen)} />
        <DockButton icon={<Send size={20} />} label="Push Link" onClick={() => showToast("Pushed link to all devices.")} />

        {/* Cast Popover */}
        <AnimatePresence>
          {castOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-[#050505]/10 p-4 w-64 text-[#050505]"
            >
              <h4 className="font-bold text-sm mb-3">Cast Screen</h4>
              <button onClick={() => { showToast('Casting your screen to all devices...'); setCastOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-[#fcf6e6] rounded-xl font-semibold text-sm transition flex items-center gap-3">
                <MonitorUp size={16} className="text-[#066606]" /> Cast My Screen
              </button>
              <button onClick={() => { showToast('Select a student to cast...'); setCastOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-[#fcf6e6] rounded-xl font-semibold text-sm transition flex items-center gap-3 mb-2">
                <Users size={16} className="text-[#066606]" /> Cast a Student
              </button>
              <select onChange={(e) => { if(e.target.value) { showToast(`Casting ${e.target.value}'s screen`); setCastOpen(false); }}} className="w-full border border-[#050505]/10 rounded-xl px-3 py-2.5 text-sm font-medium bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition">
                <option value="">Pick a student...</option>
                {roster.filter(s => s.status === 'online').map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-[#050505]/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
