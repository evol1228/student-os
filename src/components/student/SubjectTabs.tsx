import React from 'react';
import { motion } from 'motion/react';
import { SUBJECT_TABS } from '../../lib/mockData.ts';

interface SubjectTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SubjectTabs({ activeTab, onTabChange }: SubjectTabsProps) {
  return (
    <div className="flex items-center gap-1 mb-8 border-b border-[#050505]/5 pb-0 overflow-x-auto">
      {SUBJECT_TABS.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative px-5 py-3 font-bold text-sm transition-colors whitespace-nowrap ${
            activeTab === tab ? 'text-[#066606]' : 'text-[#050505]/40 hover:text-[#050505]/70'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#066606] rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
