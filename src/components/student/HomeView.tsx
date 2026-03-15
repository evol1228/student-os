import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, AlertTriangle, CheckSquare, Square } from 'lucide-react';
import { STUDENT_SCHEDULE, ACTION_ITEMS } from '../../lib/mockData.ts';
import { useToast } from '../../Toast.tsx';

interface HomeViewProps {
  user: any;
}

export default function HomeView({ user }: HomeViewProps) {
  const { showToast } = useToast();
  const [todos, setTodos] = useState(ACTION_ITEMS.map(i => ({ ...i })));
  const firstName = user.name.split(' ')[0];

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
    showToast('Task updated');
  };

  const todaysClasses = STUDENT_SCHEDULE.filter(s => s.teacher);

  return (
    <motion.div
      key="home-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-1">
          Hey, {firstName}! 👋
        </h1>
        <p className="text-sm text-[#050505]/40 font-semibold">Here's what's happening today.</p>
      </div>

      {/* Today's Subjects */}
      <div className="mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#050505]/40 mb-3 px-0.5">Today's Classes</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {todaysClasses.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`flex-shrink-0 w-44 p-4 rounded-2xl border transition-all ${
                cls.status === 'active'
                  ? 'bg-white border-[#1A1A1A]/20 shadow-lg shadow-[#1A1A1A]/5'
                  : cls.status === 'done'
                    ? 'bg-white/60 border-[#050505]/5 opacity-50'
                    : 'bg-white border-[#050505]/5 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  cls.status === 'active' ? 'bg-[#1A1A1A] text-[#fcf6e6]' : 'bg-[#050505]/5'
                }`}>
                  <BookOpen size={13} />
                </div>
                {cls.status === 'active' && (
                  <span className="px-2 py-0.5 bg-[#1A1A1A]/10 text-[#1A1A1A] text-[8px] font-black rounded-full uppercase tracking-wider">Now</span>
                )}
                {cls.status === 'done' && (
                  <span className="px-2 py-0.5 bg-[#050505]/5 text-[#050505]/30 text-[8px] font-black rounded-full uppercase tracking-wider">Done</span>
                )}
              </div>
              <div className={`text-sm font-bold mb-0.5 ${cls.status === 'active' ? 'text-[#1A1A1A]' : ''}`}>{cls.label}</div>
              <div className="text-[10px] text-[#050505]/35 font-medium">{cls.teacher}</div>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#050505]/30 font-mono">
                <Clock size={10} />
                {cls.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Need to Know Bulletin */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-4"
      >
        <div className="w-9 h-9 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
          <AlertTriangle size={18} className="text-yellow-600" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-yellow-800 mb-1">Need to Know</h4>
          <p className="text-[13px] text-yellow-700/80 font-medium leading-relaxed">
            School closes at <strong className="font-bold">14:00 today</strong> for scheduled maintenance. Please ensure all materials are packed before the final bell. Buses depart at 14:15.
          </p>
        </div>
      </motion.div>

      {/* Interactive To-Do List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#050505]/40 px-0.5 flex items-center gap-2">
            <CheckSquare size={12} /> My To-Do List
          </h3>
          <span className="text-[11px] font-bold text-[#1A1A1A]">{todos.filter(t => t.done).length}/{todos.length} done</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-[#050505]/5 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-[#1A1A1A] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(todos.filter(t => t.done).length / todos.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-2">
          {todos.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleTodo(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                item.done
                  ? 'border-[#050505]/5 bg-[#050505]/[0.02]'
                  : 'border-[#050505]/5 bg-white hover:border-[#1A1A1A]/20 hover:shadow-sm'
              }`}
            >
              <div className="shrink-0">
                {item.done ? (
                  <CheckSquare size={20} className="text-[#1A1A1A]" />
                ) : (
                  <Square size={20} className="text-[#050505]/20" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${item.done ? 'line-through text-[#050505]/25' : 'text-[#050505]'}`}>
                  {item.title}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-bold text-[#050505]/25 bg-[#050505]/5 px-1.5 py-0.5 rounded">{item.subject}</span>
                  <span className={`text-[9px] font-bold ${item.done ? 'text-[#050505]/15' : 'text-orange-500'}`}>Due {item.due}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
