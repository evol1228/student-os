import React from 'react';
import { motion } from 'motion/react';
import StudentCard from './StudentCard.tsx';

interface LiveGridProps {
  roster: any[];
  onSelectStudent: (student: any) => void;
}

export default function LiveGrid({ roster, onSelectStudent }: LiveGridProps) {
  return (
    <motion.div key="grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Live Grid</h2>
        <div className="text-sm font-semibold text-[#050505]/40">{roster.length} devices</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {roster.map(student => (
          <StudentCard key={student.id} student={student} onClick={() => onSelectStudent(student)} />
        ))}
      </div>
    </motion.div>
  );
}
