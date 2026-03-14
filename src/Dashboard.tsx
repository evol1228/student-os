import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Send, X, Battery, Search } from 'lucide-react';
import { useToast } from './Toast.tsx';
import { CLASSES, MOCK_STUDENTS } from './lib/mockData.ts';
import type { SidebarTab } from './lib/mockData.ts';

import ClassHeader from './components/teacher/ClassHeader.tsx';
import SidebarNav from './components/teacher/SidebarNav.tsx';
import LiveGrid from './components/teacher/LiveGrid.tsx';
import CountIn from './components/teacher/CountIn.tsx';
import AnnouncementsEditor from './components/teacher/AnnouncementsEditor.tsx';
import HelpRequests from './components/teacher/HelpRequests.tsx';
import FloatingDock from './components/teacher/FloatingDock.tsx';
import ExamModal from './components/teacher/ExamModal.tsx';

export default function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<SidebarTab>('grid');
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [roster, setRoster] = useState(MOCK_STUDENTS.map(s => ({ ...s })));
  const { showToast } = useToast();

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState(35 * 60);
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const presentCount = roster.filter(s => s.attendance === 'present').length;
  const absentCount = roster.filter(s => s.attendance === 'absent').length;
  const lateCount = roster.filter(s => s.attendance === 'late').length;

  const updateAttendance = (id: number, status: string) => {
    setRoster(prev => prev.map(s => s.id === id ? { ...s, attendance: status } : s));
    showToast(`Attendance updated`);
  };

  return (
    <div className="min-h-screen bg-[#fcf6e6] text-[#050505] font-sans selection:bg-[#066606] selection:text-white flex flex-col">
      
      <ClassHeader
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        mins={mins}
        secs={secs}
        presentCount={presentCount}
        absentCount={absentCount}
        lateCount={lateCount}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-6 pb-32">
          <AnimatePresence mode="wait">
            {activeTab === 'grid' && (
              <LiveGrid roster={roster} onSelectStudent={setSelectedStudent} />
            )}
            {activeTab === 'countin' && (
              <CountIn roster={roster} className={selectedClass.name} onUpdateAttendance={updateAttendance} />
            )}
            {activeTab === 'announcements' && (
              <AnnouncementsEditor />
            )}
            {activeTab === 'help' && (
              <HelpRequests />
            )}
          </AnimatePresence>
        </main>
      </div>

      <FloatingDock roster={roster} onOpenExam={() => setIsExamModalOpen(true)} />

      {/* Slide-Out Panel */}
      <AnimatePresence>
        {selectedStudent && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/45 z-40 backdrop-blur-md"
              onClick={() => setSelectedStudent(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#fcf6e6] shadow-2xl z-50 p-6 border-l border-black/5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <button onClick={() => setSelectedStudent(null)} className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-video bg-black/5 rounded-2xl mb-6 flex items-center justify-center border border-black/10 shadow-inner">
                <span className="text-black/30 font-medium tracking-wide">Live Screen Thumbnail</span>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 opacity-70">
                    <Battery size={20} />
                    <span className="font-semibold text-sm">Battery Life</span>
                  </div>
                  <div className="text-xl font-bold">{selectedStudent.battery}%</div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-2">
                  <div className="flex items-center gap-3 opacity-70">
                    <Search size={20} />
                    <span className="font-semibold text-sm">Recent Search</span>
                  </div>
                  <div className="text-lg font-medium tracking-tight">"{selectedStudent.recentSearch}"</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button onClick={() => showToast(`Locked ${selectedStudent.name}'s device.`)} className="py-3 px-4 bg-black/5 hover:bg-black/10 rounded-xl font-semibold transition flex justify-center gap-2 items-center">
                    <Lock size={16}/> Lock
                  </button>
                  <button onClick={() => showToast(`Sent message to ${selectedStudent.name}.`)} className="py-3 px-4 bg-[#066606] hover:bg-[#055505] text-[#fcf6e6] rounded-xl font-semibold shadow-md transition flex justify-center gap-2 items-center">
                    <Send size={16}/> Message
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Force Exam Modal */}
      <AnimatePresence>
        {isExamModalOpen && (
          <ExamModal 
            students={roster} 
            onClose={() => setIsExamModalOpen(false)} 
            showToast={showToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
