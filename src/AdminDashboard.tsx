import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, MessageSquare, LayoutDashboard, Users, ShieldAlert,
  Map as MapIcon, Calendar, Settings, LogOut, MoreVertical,
  Battery, Clock, CheckCircle2, Shield, Plus, X, Activity, 
  MapPin, UserCheck, Smartphone, Lock, Camera, Mail, Phone, Key, Fingerprint, Globe, Monitor, Save
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { useToast } from './Toast.tsx';

// --- MOCK DATA ---
const KPI_DATA = [
  { title: "Total Devices", value: "124,684", trend: "+15%", positive: true, icon: Smartphone, color: "bg-blue-100 text-blue-800", isPrimary: false },
  { title: "Active Teachers", value: "12,379", trend: "-3%", positive: false, icon: Users, color: "bg-yellow-100 text-yellow-800", isPrimary: false },
  { title: "Network Bandwidth", value: "29.3 TB", trend: "-1%", positive: false, icon: Activity, color: "bg-purple-100 text-purple-800", isPrimary: false },
  { title: "System Uptime", value: "99.99%", trend: "+0.01%", positive: true, icon: Shield, color: "bg-[#1A1A1A] text-[#fcf6e6]", isPrimary: true },
];

const MOCK_DEVICES = [
  { id: "A1X-99", name: "Alice Johnson", battery: 85, lastPing: "Just now", status: "online", x: 45, y: 55 },
  { id: "A1X-42", name: "Bob Smith", battery: 92, lastPing: "Just now", status: "online", x: 48, y: 60 },
  { id: "B2Y-11", name: "Library Kiosk 4", battery: 100, lastPing: "2m ago", status: "online", x: 60, y: 40 },
  { id: "C3Z-88", name: "Charlie Davis", battery: 22, lastPing: "1m ago", status: "online", x: 42, y: 50 },
  { id: "D4W-01", name: "Gym Device (Lost)", battery: 4, lastPing: "3d ago", status: "lost", x: 80, y: 20 },
  { id: "E5V-77", name: "Diana Prince", battery: 15, lastPing: "12h ago", status: "lost", x: 15, y: 80 },
];

const MOCK_ROLES = [
  { id: 1, name: "Admin Anderson", email: "admin@studentos.com", role: "IT Admin", classes: "Global (All Schools)" },
  { id: 2, name: "Principal Monia", email: "monia@district.edu", role: "Mentor/Principal", classes: "Global (Read-Only)" },
  { id: 3, name: "Carol Davis", email: "cdavis@school.edu", role: "Teacher", classes: "Math 101, Science 102" },
  { id: 4, name: "Dave Evans", email: "devans@student.edu", role: "Student", classes: "8th Grade" },
  { id: 5, name: "Emma Wright", email: "ewright@school.edu", role: "Teacher", classes: "History 201" },
];

const NETWORK_USAGE_DATA = [
  { time: '08:00', bandwidth: 400 },
  { time: '10:00', bandwidth: 800 },
  { time: '12:00', bandwidth: 1200 },
  { time: '14:00', bandwidth: 950 },
  { time: '16:00', bandwidth: 600 },
  { time: '18:00', bandwidth: 200 },
];

const MESSAGES = [
  { name: "Dr. Lila Ramirez", time: "9:00 AM", msg: "Please verify the firewall settings for the new test lab." },
  { name: "Ms. Heather Morris", time: "10:15 AM", msg: "We have 3 Chromebooks stranded in the library. Can you lock them?" },
  { name: "Mr. Carl Jenkins", time: "2:00 PM", msg: "Network usage spiked during 4th period, checking logs." },
];

const AGENDA = [
  { time: "08:00 am", text: "Global Fleet OTA Update", type: "blue" },
  { time: "10:00 am", text: "Security Audit Review", type: "yellow" },
  { time: "10:30 am", text: "Firewall Configuration", type: "green" },
];

// --- COMPONENTS ---

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    let path = window.location.pathname;
    if (path.startsWith('/en')) path = path.replace('/en', '');
    if (path === '/admin/map') return 'Fleet Map';
    if (path === '/admin/devices') return 'Devices';
    if (path === '/admin/users') return 'Users & Roles';
    if (path === '/admin/performance') return 'Performance';
    if (path === '/admin/calendar') return 'Calendar';
    if (path === '/admin/profile') return 'Profile';
    if (path === '/admin/settings') return 'Settings';
    return 'Dashboard';
  });
  
  const handleTabClick = (tab: string, route: string) => {
    setActiveTab(tab);
    const prefix = window.location.pathname.startsWith('/en') ? '/en' : '';
    window.history.pushState(null, '', prefix + '/admin' + route);
  };

  const [isRolePanelOpen, setRolePanelOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState(MOCK_ROLES);
  const { showToast } = useToast();

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));

    const handlePopState = () => {
      let path = window.location.pathname;
      if (path.startsWith('/en')) path = path.replace('/en', '');
      if (path === '/admin/map') setActiveTab('Fleet Map');
      else if (path === '/admin/devices') setActiveTab('Devices');
      else if (path === '/admin/users') setActiveTab('Users & Roles');
      else if (path === '/admin/performance') setActiveTab('Performance');
      else if (path === '/admin/calendar') setActiveTab('Calendar');
      else if (path === '/admin/profile') setActiveTab('Profile');
      else if (path === '/admin/settings') setActiveTab('Settings');
      else setActiveTab('Dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#fcf6e6] text-[#050505] flex font-sans selection:bg-[#1A1A1A] selection:text-white">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-[#050505]/5 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
        <div className="p-8 flex justify-center">
          <img src="/logo.png" alt="kalm logo" className="h-8 object-contain" />
        </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <div className="text-xs font-bold text-[#050505]/40 mb-4 px-4 uppercase tracking-widest">Menu</div>
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleTabClick('Dashboard', '')} />
          <NavItem icon={MapIcon} label="Fleet Map" active={activeTab === 'Fleet Map'} onClick={() => handleTabClick('Fleet Map', '/map')} />
          <NavItem icon={Smartphone} label="Devices" active={activeTab === 'Devices'} onClick={() => handleTabClick('Devices', '/devices')} />
          <NavItem icon={Users} label="Users & Roles" active={activeTab === 'Users & Roles'} onClick={() => handleTabClick('Users & Roles', '/users')} />
          <NavItem icon={Activity} label="Performance" active={activeTab === 'Performance'} onClick={() => handleTabClick('Performance', '/performance')} />
          <NavItem icon={Calendar} label="Calendar" active={activeTab === 'Calendar'} onClick={() => handleTabClick('Calendar', '/calendar')} />
          
          <div className="text-xs font-bold text-[#050505]/40 mt-10 mb-4 px-4 uppercase tracking-widest">Other</div>
          <NavItem icon={UserCheck} label="Profile" active={activeTab === 'Profile'} onClick={() => handleTabClick('Profile', '/profile')} />
          <NavItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => handleTabClick('Settings', '/settings')} />
        </nav>

        <div className="p-4 mb-4">
          <button onClick={handleLogout} className="flex items-center gap-3 text-[#050505]/50 hover:text-red-600 px-4 py-3 w-full rounded-2xl transition font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-[90px] bg-white border-b border-[#050505]/5 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#050505]/40" size={20} />
            <input 
              type="text" 
              placeholder="Search devices, users, or alerts..." 
              onFocus={() => showToast('Global Search activated')}
              className="w-full bg-[#fcf6e6] pl-12 pr-4 py-3 rounded-full text-sm font-medium border border-transparent focus:border-[#1A1A1A]/30 focus:outline-none focus:ring-4 focus:ring-[#1A1A1A]/10 transition-all placeholder:text-[#050505]/30"
            />
          </div>
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <button onClick={() => showToast('Opening Messages')} className="relative w-10 h-10 flex items-center justify-center bg-[#fcf6e6] rounded-full hover:bg-[#050505]/5 transition">
              <MessageSquare size={20} className="text-[#050505]/60" />
            </button>
            <button onClick={() => showToast('Viewing Notifications')} className="relative w-10 h-10 flex items-center justify-center bg-[#fcf6e6] rounded-full hover:bg-[#050505]/5 transition">
              <Bell size={20} className="text-[#050505]/60" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[#fcf6e6]"></span>
            </button>
            <div className="relative">
              <div onClick={() => { setProfileMenuOpen(!isProfileMenuOpen); }} className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-[#050505]">{user ? user.name : 'Linda Adora'}</div>
                  <div className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">{user ? user.role : 'IT Admin'}</div>
                </div>
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user ? user.name : 'Linda'}&backgroundColor=066606`} alt="Admin" className="w-10 h-10 rounded-full bg-[#fcf6e6] border border-[#050505]/10 group-hover:border-[#1A1A1A]/50 transition" />
              </div>
              
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-[#050505]/5 py-2 z-50 overflow-hidden"
                  >
                    <button onClick={() => { setProfileMenuOpen(false); handleTabClick('Profile', '/profile'); showToast('Opening Profile Details'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
                      <UserCheck size={16} className="opacity-50" /> Profile
                    </button>
                    <button onClick={() => { setProfileMenuOpen(false); handleTabClick('Settings', '/settings'); showToast('Opening Settings'); }} className="w-full text-left px-4 py-2.5 hover:bg-[#fcf6e6]/50 transition flex items-center gap-3 text-sm font-semibold">
                      <Settings size={16} className="opacity-50" /> Settings
                    </button>
                    <div className="h-px bg-[#050505]/5 my-1" />
                    <button onClick={() => { setProfileMenuOpen(false); handleLogout(); }} className="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-3 text-sm font-bold text-[#050505]/60">
                      <LogOut size={16} className="opacity-50" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        {activeTab === 'Dashboard' && (
          <div className="p-6 md:p-8 flex-1">
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {KPI_DATA.map((kpi, i) => (
                <KPICard key={i} {...kpi} />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left/Middle Column (Spans 2) */}
              <div className="xl:col-span-2 space-y-8">
                
                {/* Live Device Tracking and Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <LiveDeviceMap onExpand={() => { handleTabClick('Fleet Map', '/map'); showToast('Navigating to full Fleet Map'); }} />
                  <NetworkChart />
                </div>

                {/* Roles & Provisioning */}
                <RolesTable roles={roles} onOpenPanel={() => { setRolePanelOpen(true); showToast('Opening User Provisioning Form'); }} />
              </div>

              {/* Right Column (Spans 1) */}
              <div className="space-y-8">
                <AgendaWidget />
                <MessagesWidget />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Fleet Map' && (
          <div className="p-6 md:p-8 flex-1 flex flex-col h-[calc(100vh-90px)]">
            <LiveDeviceMap fullHeight={true} />
          </div>
        )}

        {activeTab === 'Devices' && (
          <div className="p-6 md:p-8 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Device Fleet Management</h2>
              <button className="bg-[#1A1A1A] text-[#fcf6e6] px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#1A1A1A] transition flex items-center gap-2">
                <Plus size={18} /> Provision Device
              </button>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {MOCK_DEVICES.map(device => (
                    <div key={device.id} className="border border-[#050505]/10 p-5 rounded-2xl flex items-start justify-between bg-[#fcf6e6]/30 hover:bg-[#fcf6e6] transition group">
                      <div>
                        <div className="font-bold flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-[#1A1A1A] animate-pulse' : 'bg-red-500'}`}></div>
                          {device.name}
                        </div>
                        <div className="text-sm text-[#050505]/60 font-mono mb-3">{device.id}</div>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <span className="flex items-center gap-1"><Battery size={14} className={device.battery < 20 ? 'text-red-500' : 'text-[#1A1A1A]'} /> {device.battery}%</span>
                          <span className="flex items-center gap-1 opacity-60"><Clock size={14} /> {device.lastPing}</span>
                        </div>
                      </div>
                      <button onClick={() => showToast(`Locking ${device.name}'s device...`)} className="bg-black/5 hover:bg-black/10 p-2 rounded-xl transition text-[#050505]/50 group-hover:text-red-600">
                        <Lock size={16} />
                      </button>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Users & Roles' && (
          <div className="p-6 md:p-8 flex-1">
             <RolesTable roles={roles} onOpenPanel={() => { setRolePanelOpen(true); showToast('Opening User Provisioning Form'); }} />
          </div>
        )}

        {activeTab === 'Performance' && (
          <div className="p-6 md:p-8 flex-1">
             <h2 className="text-2xl font-bold mb-6">System Performance</h2>
             <NetworkChart fullHeight={true} />
          </div>
        )}

        {activeTab === 'Calendar' && (
          <div className="p-6 md:p-8 flex-1 flex items-center justify-center">
            <div className="text-center opacity-40">
              <div className="w-20 h-20 bg-black/5 rounded-3xl mb-4 mx-auto flex items-center justify-center">
                <Settings size={32} />
              </div>
              <h2 className="text-xl font-bold mb-2">{activeTab} Page</h2>
              <p className="font-medium text-sm">This section is currently being constructed.</p>
            </div>
          </div>
        )}

        {activeTab === 'Profile' && (
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <ProfileDetails user={user} />
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <SettingsView user={user} />
        )}
      </main>

      {/* Slide Out Panel for Roles */}
      <AnimatePresence>
        {isRolePanelOpen && (
          <RoleProvisioningPanel 
             onClose={() => setRolePanelOpen(false)} 
             onAddRole={(r) => setRoles([...roles, r])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function NavItem({ icon: Icon, label, active = false, onClick }: any) {
  const { showToast } = useToast();
  return (
    <button onClick={(e) => { onClick?.(e); showToast(`Navigating to ${label}`); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all group ${
      active 
        ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]' 
        : 'text-[#050505]/60 hover:bg-[#050505]/5 hover:text-[#050505]'
    }`}>
      <Icon size={20} className={`${active ? 'text-[#1A1A1A]' : 'text-[#050505]/40 group-hover:text-[#050505]/60'} transition-colors`} />
      {label}
      {active && <div className="ml-auto w-1.5 h-6 rounded-full bg-[#1A1A1A]"></div>}
    </button>
  );
}

function KPICard({ title, value, trend, positive, icon: Icon, color, isPrimary }: any) {
  const { showToast } = useToast();
  return (
    <div className={`p-6 rounded-3xl border border-[#050505]/5 flex flex-col relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${isPrimary ? 'bg-[#1A1A1A] shadow-xl shadow-[#1A1A1A]/20' : 'bg-white shadow-sm'}`}>
      <div className="flex justify-between items-start mb-6 z-10">
        <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-lg ${positive ? (isPrimary ? 'bg-white/20 text-white' : 'bg-neutral-100 text-[#1A1A1A]') : (isPrimary ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700')}`}>
          {trend}
        </div>
        <button onClick={() => showToast(`Opening ${title} details`)} className={`p-1 rounded-full ${isPrimary ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-[#050505]/20 hover:text-[#050505]/50 hover:bg-[#050505]/5'} transition-colors`}>
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="z-10 mt-auto">
        <div className={`text-4xl font-black mb-1 tracking-tight ${isPrimary ? 'text-white' : 'text-[#050505]'}`}>{value}</div>
        <div className={`text-sm font-semibold opacity-80 ${isPrimary ? 'text-[#fcf6e6]' : 'text-[#050505]/50'}`}>{title}</div>
      </div>
      
      {/* Background Icon Watermark */}
      <Icon size={120} className={`absolute -bottom-6 -right-6 opacity-[0.03] rotate-12 ${isPrimary ? 'text-white' : 'text-[#050505]'}`} />
    </div>
  );
}

function LiveDeviceMap({ fullHeight = false, onExpand }: { fullHeight?: boolean, onExpand?: () => void }) {
  const [hoveredDevice, setHoveredDevice] = useState<any>(null);
  const { showToast } = useToast();

  return (
    <div className={`bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col ${fullHeight ? 'h-full min-h-[500px]' : 'h-[400px]'}`}>
      <div className="flex justify-between items-center mb-6 z-10">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
          Live Device Tracking <span className="flex h-2 w-2 rounded-full bg-[#1A1A1A] animate-ping"></span>
        </h3>
        <button onClick={() => { showToast('Expanding Live Map...'); onExpand?.(); }} className="text-xs font-bold bg-[#fcf6e6] px-3 py-1.5 rounded-lg text-[#050505]/60 hover:text-[#050505] transition-colors">
          Expand Map
        </button>
      </div>

      {/* Styled Placeholder Map Component */}
      <div className="flex-1 bg-slate-900 rounded-3xl relative overflow-hidden border border-black/10">
        {/* Fake Map Grid/Lines */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50 z-10" />
        
        {/* Center "School" Building Marker indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-800/50 border border-slate-700 rounded-full blur-[2px] flex items-center justify-center -z-0">
           <span className="text-slate-600 font-bold text-xs uppercase tracking-widest absolute -bottom-6">Campus Zone</span>
        </div>

        {/* Map Dots */}
        {MOCK_DEVICES.map((device, i) => {
          const isOnline = device.status === 'online';
          return (
            <div 
              key={i}
              className="absolute z-20 group -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${device.y}%`, left: `${device.x}%` }}
              onMouseEnter={() => setHoveredDevice(device)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              <div className="relative flex items-center justify-center">
                {isOnline && (
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-neutral-400 opacity-40"></span>
                )}
                {!isOnline && (
                  <span className="animate-pulse absolute inline-flex h-12 w-12 rounded-full bg-red-500 opacity-20"></span>
                )}
                <div className={`relative h-4 w-4 rounded-full border-2 border-slate-900 shadow-lg cursor-pointer transition-transform hover:scale-150 ${isOnline ? 'bg-[#1A1A1A]' : 'bg-red-500'}`}></div>
              </div>

              {/* Tooltip */}
              {hoveredDevice?.id === device.id && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-[#fcf6e6] text-[#050505] p-3 rounded-2xl shadow-xl border border-black/5 pointer-events-none z-50 text-xs"
                >
                  <div className="font-bold flex items-center gap-2 mb-1">
                    <MapPin size={12} className={isOnline ? 'text-[#1A1A1A]' : 'text-red-500'} />
                    {device.name}
                  </div>
                  <div className="text-[#050505]/50 mb-2 font-mono">{device.id}</div>
                  <div className="flex justify-between items-center border-t border-black/5 pt-2">
                    <span className="flex items-center gap-1 font-semibold"><Battery size={12} className={device.battery < 20 ? 'text-red-500' : 'text-[#1A1A1A]'}/> {device.battery}%</span>
                    <span className="flex items-center gap-1 opacity-50"><Clock size={12}/> {device.lastPing}</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fcf6e6] rotate-45 border-r border-b border-black/5"></div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NetworkChart({ fullHeight = false }: { fullHeight?: boolean }) {
  const { showToast } = useToast();
  return (
    <div className={`bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col ${fullHeight ? 'min-h-[600px]' : 'h-[400px]'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">Bandwidth Usage</h3>
        <select onChange={(e) => showToast(`Filtering by ${e.target.value}`)} className="bg-[#fcf6e6] text-xs font-bold px-3 py-1.5 rounded-lg text-[#050505]/70 border-none outline-none cursor-pointer">
          <option>Today</option>
          <option>This Week</option>
        </select>
      </div>
        <div className="flex-1 w-full -ml-4 relative min-h-0">
          <ResponsiveContainer width="100%" height="100%" className={"absolute inset-0"}>
            <AreaChart data={NETWORK_USAGE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBandwidth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 600 }} dx={-10} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#050505', color: '#fcf6e6', fontWeight: 'bold' }}
                itemStyle={{ color: '#4ade80' }}
              />
              <Area type="monotone" dataKey="bandwidth" stroke="#1A1A1A" strokeWidth={4} fillOpacity={1} fill="url(#colorBandwidth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}

function RolesTable({ roles, onOpenPanel }: { roles: any[], onOpenPanel: () => void }) {
  const { showToast } = useToast();
  const getBadgeStyle = (role: string) => {
    switch(role) {
      case 'IT Admin': return 'bg-[#1A1A1A] text-[#fcf6e6] shadow-sm';
      case 'Mentor/Principal': return 'bg-yellow-200 text-yellow-900';
      case 'Teacher': return 'bg-neutral-100 text-[#1A1A1A]';
      case 'Student': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-1">Users & Roles Provisioning</h3>
          <p className="text-xs font-semibold text-[#050505]/50">Manage access control and device policies.</p>
        </div>
        <button 
          onClick={onOpenPanel}
          className="bg-[#1A1A1A] text-[#fcf6e6] px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add User / Role
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black/5 text-xs font-black uppercase tracking-widest text-[#050505]/40 child:pb-4 child:px-4">
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="hidden sm:table-cell">Assigned Groups</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {roles.map((user, i) => (
              <tr key={user.id} className="border-b border-black/5 last:border-0 hover:bg-[#fcf6e6]/50 transition-colors group child:py-4 child:px-4">
                <td className="font-bold whitespace-nowrap">{user.name}</td>
                <td className="text-[#050505]/60 font-medium">{user.email}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getBadgeStyle(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="text-[#050505]/60 hidden sm:table-cell">{user.classes}</td>
                <td className="text-right">
                  <button onClick={() => showToast(`Options for ${user.name}`)} className="p-2 bg-transparent text-[#050505]/30 hover:bg-[#050505]/5 hover:text-[#050505] rounded-xl transition">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoleProvisioningPanel({ onClose, onAddRole }: { onClose: () => void, onAddRole: (role: any) => void }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Teacher Access');
  const [name, setName] = useState('');

  const handleProvision = () => {
    if(!email) return showToast("Email is required.");
    onAddRole({
      id: Date.now(),
      name: name || email.split('@')[0],
      email: email,
      role: role === 'Full God Mode' ? 'IT Admin' : 'Teacher',
      classes: 'Global (New)'
    });
    showToast(`Access Provisioned for ${email}`);
    onClose();
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/45 z-40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-black/5 border-t border-[rgba(255,255,255,0.1)]"
      >
        <div className="p-6 border-b border-[#050505]/5 flex items-center justify-between bg-[#fcf6e6]/30">
          <div>
            <h2 className="text-xl font-bold mb-1">Assign User Role</h2>
            <p className="text-xs font-semibold text-[#050505]/50">Provision a user to view specific data.</p>
          </div>
          <button onClick={() => { onClose(); showToast('Closed provisioning panel'); }} className="p-2 bg-white border border-[#050505]/10 hover:bg-[#050505]/5 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-white">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/50 transition font-medium" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">User Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@school.edu" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/50 transition font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Select Role Tier</label>
              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => setRole('Full God Mode')} className={`border rounded-xl p-4 cursor-pointer relative transition ${role === 'Full God Mode' ? 'border-[#1A1A1A] bg-[#1A1A1A]/5' : 'border-[#050505]/10 bg-white'}`}>
                  <div className={`absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center ${role === 'Full God Mode' ? 'bg-[#1A1A1A]' : 'border border-[#050505]/20'}`}>
                    {role === 'Full God Mode' && <CheckCircle2 size={10} className="text-white" />}
                  </div>
                  <ShieldAlert className={role === 'Full God Mode' ? 'text-[#1A1A1A] mb-2' : 'text-[#050505]/40 mb-2'} size={24} />
                  <div className="font-bold text-sm">IT Admin</div>
                  <div className="text-[10px] text-[#050505]/50 font-medium">Full God Mode</div>
                </div>
                <div onClick={() => setRole('Teacher Access')} className={`border rounded-xl p-4 cursor-pointer relative transition ${role === 'Teacher Access' ? 'border-[#1A1A1A] bg-[#1A1A1A]/5' : 'border-[#050505]/10 bg-white hover:border-[#050505]/30'}`}>
                  <div className={`absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center ${role === 'Teacher Access' ? 'bg-[#1A1A1A]' : 'border border-[#050505]/20'}`}>
                    {role === 'Teacher Access' && <CheckCircle2 size={10} className="text-white" />}
                  </div>
                  <Users className={role === 'Teacher Access' ? 'text-[#1A1A1A] mb-2' : 'text-[#050505]/40 mb-2'} size={24} />
                  <div className="font-bold text-sm">Teacher Access</div>
                  <div className="text-[10px] text-[#050505]/50 font-medium">Time-boxed Dashboard</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#050505]/5">
              <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-4">Granular Permissions</label>
              <div className="space-y-3">
                {[
                  "Force Device Locked (Instant)",
                  "Cast Screen (Zero Latency)",
                  "Reset Passwords",
                  "View Finance & Inventory"
                ].map((perm, i) => (
                  <label key={i} onClick={() => showToast(`Toggled: ${perm}`)} className="flex items-center gap-3 p-3 bg-[#fcf6e6]/50 rounded-xl border border-[#050505]/5 cursor-pointer hover:bg-[#fcf6e6] transition">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${i < 2 ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'bg-white border-[#050505]/20'}`}>
                      {i < 2 && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className="font-semibold text-sm">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#050505]/5 bg-[#fcf6e6]/30">
           <button onClick={handleProvision} className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A] text-[#fcf6e6] font-bold py-3.5 rounded-xl shadow-lg shadow-[#1A1A1A]/20 transition-all flex justify-center items-center gap-2">
             <UserCheck size={18} /> Provision Access
           </button>
        </div>
      </motion.div>
    </>
  );
}

function ProfileDetails({ user }: { user: any }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
        <UserCheck size={20} className="text-[#1A1A1A]" /> My Profile
      </h3>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user ? user.name : 'Linda'}&backgroundColor=066606`} alt="Avatar" className="w-20 h-20 rounded-2xl bg-[#fcf6e6] border-2 border-[#050505]/10 object-cover" />
          <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
            <Camera size={24} />
          </button>
        </div>
        <div>
          <div className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Profile Picture</div>
          <button className="text-sm font-bold text-[#1A1A1A] hover:underline bg-[#1A1A1A]/10 px-4 py-2 rounded-xl transition-colors">Upload New</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">First Name <span className="text-red-500">*</span></label>
          <input type="text" defaultValue={user ? user.name.split(' ')[0] : 'Linda'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Last Name <span className="text-red-500">*</span></label>
          <input type="text" defaultValue={user ? user.name.split(' ')[1] : 'Adora'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Job Title</label>
          <input type="text" defaultValue={user ? user.role : 'Head of IT'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2 flex flex-row items-center gap-1.5"><Mail size={14}/> Email Address <span className="text-red-500">*</span></label>
          <input type="email" defaultValue={user?.email || 'admin@studentos.com'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold text-[#050505]/70" disabled />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2 flex flex-row items-center gap-1.5"><Phone size={14}/> Phone Number</label>
          <input type="tel" placeholder="+46 70 123 45 67" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold" />
        </div>
      </div>
    </div>
  );
}

function SettingsView({ user }: { user: any }) {
  const { showToast } = useToast();

  return (
    <div className="p-6 md:p-8 flex-1 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#050505]">Platform Settings</h2>
          <p className="font-semibold text-[#050505]/50">Manage your profile, security, notifications, and preferences.</p>
        </div>
        <button onClick={() => showToast('Settings Saved Successfully!')} className="bg-[#1A1A1A] text-[#fcf6e6] px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. My Profile */}
        <ProfileDetails user={user} />

        {/* 2. Account Security */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
            <ShieldAlert size={20} className="text-red-500" /> Account Security
          </h3>

          <div className="space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2"><Key size={16} /> Change Password</h4>
            <input type="password" placeholder="Current Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-medium" />
            <input type="password" placeholder="New Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-medium" />
            <input type="password" placeholder="Confirm New Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-medium" />
          </div>

          <div className="pt-4 border-t border-[#050505]/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-1"><Fingerprint size={16} /> Two-Factor Authentication (2FA)</h4>
                <p className="text-xs font-semibold text-[#050505]/50">Require an authenticator app code to log in.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => showToast('2FA status updated')} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1A1A]"></div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#050505]/5">
             <h4 className="text-sm font-bold flex items-center gap-2 mb-4"><Monitor size={16} /> Active Sessions</h4>
             <div className="flex items-center justify-between p-4 bg-[#fcf6e6]/50 border border-[#050505]/5 rounded-xl mb-4">
               <div>
                  <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">Chrome on Windows <span className="text-[10px] bg-[#1A1A1A]/20 px-2 py-0.5 rounded-full">Current Session</span></div>
                  <div className="text-xs font-semibold text-[#050505]/50">Gothenburg, Sweden • Active now</div>
               </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-white border border-[#050505]/5 rounded-xl mb-4 hover:bg-[#fcf6e6]/50 transition duration-200">
               <div>
                  <div className="font-bold text-sm">Safari on iPhone</div>
                  <div className="text-xs font-semibold text-[#050505]/50">Stockholm, Sweden • Last active: 2h ago</div>
               </div>
             </div>
             <button onClick={() => showToast('Logged out of all other devices.')} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">Log out of all other devices</button>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
            <Bell size={20} className="text-blue-500" /> Notification Preferences
          </h3>

          <div>
             <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-4">Alert Channels</label>
             <div className="flex gap-4">
               <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1A1A1A] bg-[#fcf6e6]" /> Email
               </label>
               <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1A1A1A] bg-[#fcf6e6]" /> In-App
               </label>
               <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" className="w-4 h-4 accent-[#1A1A1A] bg-[#fcf6e6]" /> SMS
               </label>
             </div>
          </div>

          <div className="pt-4 border-t border-[#050505]/5">
             <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-4">Alert Triggers</label>
             <div className="space-y-4 border border-[#050505]/5 p-4 rounded-xl bg-[#fcf6e6]/30">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-0.5 accent-red-500 bg-[#fcf6e6]" /> 
                  <div>
                    <div className="font-bold text-sm text-red-600 mb-0.5">Critical Alerts</div>
                    <div className="text-xs font-medium text-[#050505]/50 leading-relaxed">Notify me if a teacher triggers a Global Class Lock.</div>
                  </div>
                </label>
                <div className="w-full h-px bg-[#050505]/5"></div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-0.5 accent-yellow-500 bg-[#fcf6e6]" /> 
                  <div>
                    <div className="font-bold text-sm text-yellow-600 mb-0.5">Hardware Alerts</div>
                    <div className="text-xs font-medium text-[#050505]/50 leading-relaxed">Notify me if more than 5 devices go offline simultaneously.</div>
                  </div>
                </label>
                <div className="w-full h-px bg-[#050505]/5"></div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-0.5 accent-[#1A1A1A] bg-[#fcf6e6]" /> 
                  <div>
                    <div className="font-bold text-sm text-[#1A1A1A] mb-0.5">Security Alerts</div>
                    <div className="text-xs font-medium text-[#050505]/50 leading-relaxed">Notify me of repeated failed login attempts on any device.</div>
                  </div>
                </label>
             </div>
          </div>
        </div>

        {/* 4. Display & Preferences */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
            <Globe size={20} className="text-purple-500" /> Display & Preferences
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Language</label>
              <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold appearance-none cursor-pointer">
                <option value="en">English (US)</option>
                <option value="sv">Svenska (SE)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Time Format</label>
              <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold appearance-none cursor-pointer">
                <option value="24h">24-hour (14:00)</option>
                <option value="12h">12-hour (2:00 PM)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Timezone</label>
              <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#1A1A1A]/50 transition font-bold appearance-none cursor-pointer">
                <option value="CET">Central European Time (Gothenburg) - GMT+1</option>
                <option value="UTC">Coordinated Universal Time - UTC</option>
                <option value="EST">Eastern Standard Time (New York) - GMT-5</option>
              </select>
              <p className="text-xs font-medium text-[#050505]/40 mt-2">Adjusts dashboard charts to your workday.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#050505]/5">
            <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Dashboard Default View</label>
            <div className="space-y-3 mt-4">
               <label className="flex items-center gap-3 p-4 bg-[#fcf6e6]/50 rounded-xl border border-[#1A1A1A] cursor-pointer">
                 <input type="radio" name="defaultView" defaultChecked className="w-5 h-5 accent-[#1A1A1A] cursor-pointer" /> 
                 <span className="font-bold text-sm">Overview Analytics (Default)</span>
               </label>
               <label className="flex items-center gap-3 p-4 bg-white hover:bg-[#fcf6e6]/50 transition-colors rounded-xl border border-[#050505]/10 cursor-pointer">
                 <input type="radio" name="defaultView" className="w-5 h-5 accent-[#1A1A1A] cursor-pointer" /> 
                 <span className="font-bold text-sm">Live Fleet Map</span>
               </label>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function AgendaWidget() {
  const { showToast } = useToast();
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">System Agenda</h3>
        <button onClick={() => showToast('Opening Agenda Settings')} className="p-1.5 bg-[#fcf6e6] hover:bg-[#050505]/5 rounded-xl transition">
          <MoreVertical size={16} className="text-[#050505]/50" />
        </button>
      </div>

      <div className="flex justify-between items-center bg-[#fcf6e6] p-3 rounded-2xl mb-6 border border-[#050505]/5">
        <span className="font-bold text-sm px-4">Sep 2026</span>
        <div className="flex gap-2">
           <button onClick={() => showToast('Previous month')} className="bg-white px-3 py-1 text-sm font-bold shadow-sm rounded-lg">&lt;</button>
           <button onClick={() => showToast('Next month')} className="bg-white px-3 py-1 text-sm font-bold shadow-sm rounded-lg">&gt;</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {AGENDA.map((item, i) => (
          <div key={i} className="flex flex-col gap-1.5 p-4 rounded-2xl border border-[#050505]/5 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] border-l-4" style={{ 
            borderLeftColor: item.type === 'blue' ? '#3b82f6' : item.type === 'yellow' ? '#eab308' : '#22c55e'
          }}>
            <div className="text-xs font-bold opacity-50 flex items-center gap-1.5">
              <Clock size={12}/> {item.time}
            </div>
            <div className="font-bold text-sm text-[#050505]">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesWidget() {
  const { showToast } = useToast();
  return (
    <div className="bg-[#fcf6e6] p-6 md:p-8 rounded-[2rem] shadow-inner border border-[#050505]/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">IT Alerts</h3>
        <span onClick={() => showToast('Loading all alerts...')} className="text-xs font-bold text-[#1A1A1A] cursor-pointer hover:underline">View All</span>
      </div>
      
      <div className="space-y-5">
        {MESSAGES.map((msg, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#050505]/5 shadow-sm group-hover:border-[#1A1A1A]/30 transition">
              <span className="font-black text-[#1A1A1A] text-sm">{msg.name[4]}</span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[13px]">{msg.name}</span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">{msg.time}</span>
              </div>
              <p className="text-xs font-medium text-[#050505]/60 leading-relaxed line-clamp-2">
                {msg.msg}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
