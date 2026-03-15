import React from 'react';
import { motion } from 'motion/react';

interface StudentCardProps {
  student: any;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const isOnline = student.status === 'online';
  const isLocked = student.status === 'locked';

  return (
    <motion.button 
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
      onClick={onClick}
      className="bg-white p-4 rounded-[2rem] shadow-sm border border-black/5 text-left w-full transition-shadow duration-300 flex flex-col group"
    >
      <div className="aspect-video bg-black/5 rounded-2xl mb-4 flex items-center justify-center border border-black/[0.03] relative overflow-hidden flex-1 w-full">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <span className="text-black/30 font-medium text-sm">Screen Thumbnail</span>
      </div>
      <div className="flex items-center justify-between px-2 w-full">
        <span className="font-bold text-lg tracking-tight">{student.name}</span>
        <div className="relative flex h-3 w-3">
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-[#1A1A1A]' : isLocked ? 'bg-gray-800' : 'bg-red-500'}`}></span>
        </div>
      </div>
    </motion.button>
  );
}

export default StudentCard;
