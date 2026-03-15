import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';
import { useToast } from '../../Toast.tsx';

interface FeedPostProps {
  post: {
    id: number;
    subject: string;
    teacher: string;
    time: string;
    title: string;
    content: string;
    bullets: string[];
    files: { name: string; size: string }[];
  };
  index: number;
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-[#050505]">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function FeedPost({ post, index }: FeedPostProps) {
  const { showToast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-5 rounded-2xl border border-[#050505]/5 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Compact Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-[#1A1A1A]/10 rounded-full flex items-center justify-center font-black text-[#1A1A1A] text-xs shrink-0">
          {post.teacher[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm truncate">{post.teacher}</span>
            <span className="bg-[#050505]/5 text-[#050505]/50 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase shrink-0">{post.subject}</span>
          </div>
          <div className="text-[10px] text-[#050505]/35 font-semibold">{post.time}</div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-base font-bold mb-2 tracking-tight leading-snug">{post.title}</h3>
      <p className="text-[13px] text-[#050505]/55 leading-relaxed font-medium mb-3">{renderContent(post.content)}</p>

      {/* Bullets */}
      {post.bullets.length > 0 && (
        <ul className="space-y-1.5 mb-3 pl-0.5">
          {post.bullets.map((b, bi) => (
            <li key={bi} className="flex items-start gap-2.5 text-[13px] text-[#050505]/55 font-medium">
              <span className="w-1 h-1 rounded-full bg-[#1A1A1A] mt-[7px] shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Files — compact grey pills */}
      {post.files.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-[#050505]/5">
          {post.files.map((f, fi) => (
            <button
              key={fi}
              onClick={() => showToast(`Downloading ${f.name}...`)}
              className="inline-flex items-center gap-1.5 bg-[#050505]/[0.04] hover:bg-[#1A1A1A]/10 px-3 py-1.5 rounded-full text-[11px] font-bold text-[#050505]/60 hover:text-[#1A1A1A] transition-all group"
            >
              <FileText size={12} className="text-[#050505]/30 group-hover:text-[#1A1A1A] transition-colors" />
              {f.name}
              <span className="text-[#050505]/25">{f.size}</span>
              <Download size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
