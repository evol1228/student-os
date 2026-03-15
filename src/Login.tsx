import React from 'react';
import { Shield } from 'lucide-react';

const TEST_USERS = [
  { name: 'Linda Adora', email: 'admin@studentos.com', role: 'IT Admin', redirect: '/admin' },
  { name: 'Principal Monia', email: 'mentor@studentos.com', role: 'Mentor', redirect: '/dashboard' },
  { name: 'Carol Davis', email: 'teacher@studentos.com', role: 'Teacher', redirect: '/dashboard' },
  { name: 'Dave Evans', email: 'student@studentos.com', role: 'Student', redirect: '/student' }
];

export default function Login() {
  const isEn = window.location.pathname.startsWith('/en');
  const handleLogin = (user: typeof TEST_USERS[0]) => {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = (isEn ? '/en' : '') + user.redirect;
  };

  return (
    <div className="min-h-screen bg-[#fcf6e6] flex flex-col items-center justify-center p-6 selection:bg-[#1A1A1A] selection:text-white">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-black/5 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#1A1A1A]"></div>

        <div className="flex flex-col items-center mb-8">
           <div className="mb-6 flex justify-center">
             <img src="/kalm_logo.png" alt="kalm logo" className="h-10 object-contain" />
           </div>
           <p className="text-sm font-semibold text-[#050505]/50 mt-2 text-center">Select a test account to log in.</p>
        </div>

        <div className="space-y-4">
          {TEST_USERS.map((user) => (
            <button
              key={user.role}
              onClick={() => handleLogin(user)}
              className="w-full text-left p-4 rounded-xl border border-black/10 hover:border-[#1A1A1A]/50 hover:bg-[#1A1A1A]/5 transition-all group relative overflow-hidden flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[#050505] group-hover:text-[#1A1A1A] transition-colors">{user.name}</div>
                <div className="text-xs font-semibold text-[#050505]/50">{user.email}</div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                user.role === 'IT Admin' ? 'bg-[#1A1A1A] text-white' :
                user.role === 'Mentor' ? 'bg-yellow-200 text-yellow-900' :
                user.role === 'Teacher' ? 'bg-neutral-100 text-[#1A1A1A]' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user.role}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm">
          <a href={isEn ? '/en' : '/'} className="font-bold text-[#050505]/40 hover:text-[#050505] transition-colors">
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
