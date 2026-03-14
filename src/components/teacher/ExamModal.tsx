import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, FileText, X, CheckCircle2 } from 'lucide-react';

interface ExamModalProps {
  students: any[];
  onClose: () => void;
  showToast: (m: string) => void;
}

export default function ExamModal({ students, onClose, showToast }: ExamModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>(students.map(s => s.id));
  const [examUrl, setExamUrl] = useState("");

  const toggleAll = () => {
    if (selectedIds.length === students.length) setSelectedIds([]);
    else setSelectedIds(students.map(s => s.id));
  };

  const toggleStudent = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleStartExam = () => {
    if(selectedIds.length === 0) return showToast("Select at least one student");
    if(!examUrl) return showToast("Please enter an exam URL");
    showToast(`Started Exam mode on ${selectedIds.length} devices.`);
    onClose();
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/45 z-50 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#fcf6e6] w-full max-w-lg rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-black/10 overflow-hidden pointer-events-auto flex flex-col max-h-[85vh]"
        >
          <div className="p-6 md:p-8 border-b border-black/5 bg-white flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-[#066606]/10 text-[#066606] rounded-xl">
                  <FileText size={24} />
                </div>
                Force Exam Mode
              </h2>
              <p className="text-sm opacity-60 mt-2 font-medium">Lock devices to a specific testing URL.</p>
            </div>
            <button onClick={onClose} className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto bg-[#fcf6e6]/30">
            <div className="mb-8">
              <label className="block text-xs font-bold mb-3 opacity-60 uppercase tracking-widest text-[#050505]">Exam URL</label>
              <input 
                type="url" 
                placeholder="https://forms.google.com/..."
                value={examUrl}
                onChange={e => setExamUrl(e.target.value)}
                className="w-full bg-white border border-black/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#066606]/50 transition shadow-sm font-medium text-[#050505] placeholder:opacity-40"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold opacity-60 uppercase tracking-widest text-[#050505]">Select Students</label>
                <button onClick={toggleAll} className="text-sm font-bold text-[#066606] hover:underline">
                  {selectedIds.length === students.length ? "Deselect All" : "Select All"}
                </button>
              </div>
              <div className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm">
                {students.map(student => (
                  <div 
                    key={student.id} 
                    onClick={() => toggleStudent(student.id)}
                    className="flex justify-between items-center p-4 border-b border-black/5 last:border-0 hover:bg-black/5 cursor-pointer transition"
                  >
                    <span className="font-semibold text-[15px]">{student.name}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedIds.includes(student.id) ? 'bg-[#066606] border-[#066606] text-white' : 'border-black/20'}`}>
                      {selectedIds.includes(student.id) && <CheckCircle2 size={16} strokeWidth={3} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border-t border-black/5 bg-white">
            <button onClick={handleStartExam} className="w-full bg-[#066606] hover:bg-[#055505] text-[#fcf6e6] font-bold text-lg py-4 rounded-2xl shadow-[0_10px_20px_-10px_rgba(6,102,6,0.6)] transition-all flex justify-center items-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
              <Lock size={20} />
              Start Exam for {selectedIds.length} Students
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
