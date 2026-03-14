import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FEED_POSTS } from './lib/mockData.ts';

import StudentSidebar from './components/student/StudentSidebar.tsx';
import StudentHeader from './components/student/StudentHeader.tsx';
import SubjectTabs from './components/student/SubjectTabs.tsx';
import FeedPost from './components/student/FeedPost.tsx';
import RightSidebar from './components/student/RightSidebar.tsx';
import HomeView from './components/student/HomeView.tsx';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [activeView, setActiveView] = useState<'home' | 'learnlog'>('home');

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState(42 * 60);
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      setUser(JSON.parse(raw));
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return null;

  const filteredPosts = activeTab === 'All' ? FEED_POSTS : FEED_POSTS.filter(p => p.subject === activeTab);

  return (
    <div className="h-screen bg-[#fcf6e6] text-[#050505] font-sans selection:bg-[#066606] selection:text-white flex overflow-hidden">
      
      {/* Column 1: Left Sidebar */}
      <StudentSidebar user={user} activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />

      {/* Column 2: Center Stage */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <AnimatePresence mode="wait">
            {activeView === 'home' && (
              <HomeView key="home" user={user} />
            )}

            {activeView === 'learnlog' && (
              <motion.div
                key="learnlog"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <StudentHeader user={user} mins={mins} secs={secs} onLogout={handleLogout} />
                <SubjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {filteredPosts.length === 0 ? (
                      <div className="text-center py-20 opacity-30">
                        <BookOpen size={48} className="mx-auto mb-4" />
                        <p className="font-bold text-lg">No posts in this subject yet.</p>
                      </div>
                    ) : (
                      filteredPosts.map((post, i) => (
                        <FeedPost key={post.id} post={post} index={i} />
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Column 3: Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
