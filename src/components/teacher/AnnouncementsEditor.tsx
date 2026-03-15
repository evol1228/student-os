import React from 'react';
import { motion } from 'motion/react';
import { FileText, Send, Bold, List, Link2, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useToast } from '../../Toast.tsx';
import { ANNOUNCEMENTS } from '../../lib/mockData.ts';

export default function AnnouncementsEditor() {
  const { showToast } = useToast();

  return (
    <motion.div key="announcements" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Learn Log</h2>
      </div>

      {/* Mock WYSIWYG Editor */}
      <div className="bg-white rounded-[2rem] border border-[#050505]/5 shadow-sm mb-8 overflow-hidden">
        <div className="flex items-center gap-1 px-4 py-3 border-b border-[#050505]/5 bg-[#fcf6e6]/30">
          <button className="p-2 hover:bg-[#050505]/5 rounded-lg transition"><Bold size={16} className="opacity-50" /></button>
          <button className="p-2 hover:bg-[#050505]/5 rounded-lg transition"><List size={16} className="opacity-50" /></button>
          <button className="p-2 hover:bg-[#050505]/5 rounded-lg transition"><Link2 size={16} className="opacity-50" /></button>
          <button className="p-2 hover:bg-[#050505]/5 rounded-lg transition"><ImageIcon size={16} className="opacity-50" /></button>
          <div className="flex-1" />
          <button className="p-2 hover:bg-[#050505]/5 rounded-lg transition"><Paperclip size={16} className="opacity-50" /></button>
        </div>
        <textarea 
          placeholder="Write a post for the Learn Log..."
          className="w-full p-6 bg-transparent resize-none h-32 focus:outline-none font-medium placeholder:text-[#050505]/30 text-[#050505]"
        />
        <div className="flex justify-between items-center px-6 py-4 border-t border-[#050505]/5 bg-[#fcf6e6]/30">
          <button onClick={() => showToast('File browser opened')} className="flex items-center gap-2 text-sm font-semibold text-[#050505]/50 hover:text-[#050505] transition">
            <Paperclip size={16} /> Attach File
          </button>
          <button onClick={() => showToast('Post published to Learn Log!')} className="bg-[#1A1A1A] text-[#fcf6e6] px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-[#1A1A1A]/20 hover:bg-[#1A1A1A] transition-all text-sm flex items-center gap-2">
            <Send size={16} /> Publish
          </button>
        </div>
      </div>

      {/* Existing Announcements */}
      <h3 className="text-sm font-bold uppercase tracking-widest text-[#050505]/40 mb-4">Published</h3>
      <div className="space-y-4">
        {ANNOUNCEMENTS.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-[2rem] border border-[#050505]/5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-bold text-lg">{post.title}</h4>
              <span className="text-xs font-semibold text-[#050505]/40 whitespace-nowrap ml-4">{post.time}</span>
            </div>
            <p className="text-sm text-[#050505]/70 leading-relaxed font-medium mb-3">{post.content}</p>
            {post.bullets.length > 0 && (
              <ul className="list-disc list-inside text-sm text-[#050505]/60 space-y-1 mb-3 pl-1">
                {post.bullets.map((b, i) => <li key={i} className="font-medium">{b}</li>)}
              </ul>
            )}
            {post.files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.files.map((f, i) => (
                  <button key={i} onClick={() => showToast(`Opening ${f.name}`)} className="flex items-center gap-2 bg-[#fcf6e6] px-4 py-2 rounded-xl text-xs font-bold text-[#050505]/70 border border-[#050505]/5 hover:border-[#1A1A1A]/30 transition">
                    <FileText size={14} className="text-[#1A1A1A]" /> {f.name} <span className="opacity-40">{f.size}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
