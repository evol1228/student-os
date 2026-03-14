import React from 'react';
import {
  UserCheck, Camera, Mail, Phone, Bell, Globe,
  ShieldAlert, Key, Fingerprint, Monitor, Save
} from 'lucide-react';
import { useToast } from '../../Toast.tsx';

// --- Profile Details Card (shared by all roles) ---
export function ProfileDetails({ user }: { user: any }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
        <UserCheck size={20} className="text-[#066606]" /> My Profile
      </h3>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user ? user.name : 'User'}&backgroundColor=066606`} alt="Avatar" className="w-20 h-20 rounded-2xl bg-[#fcf6e6] border-2 border-[#050505]/10 object-cover" />
          <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
            <Camera size={24} />
          </button>
        </div>
        <div>
          <div className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Profile Picture</div>
          <button className="text-sm font-bold text-[#066606] hover:underline bg-[#066606]/10 px-4 py-2 rounded-xl transition-colors">Upload New</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">First Name <span className="text-red-500">*</span></label>
          <input type="text" defaultValue={user ? user.name.split(' ')[0] : 'User'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Last Name <span className="text-red-500">*</span></label>
          <input type="text" defaultValue={user ? user.name.split(' ')[1] : ''} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold" />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Role</label>
          <input type="text" defaultValue={user ? user.role : 'N/A'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold" disabled />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2 flex flex-row items-center gap-1.5"><Mail size={14}/> Email Address <span className="text-red-500">*</span></label>
          <input type="email" defaultValue={user?.email || 'user@studentos.com'} className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold text-[#050505]/70" disabled />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2 flex flex-row items-center gap-1.5"><Phone size={14}/> Phone Number</label>
          <input type="tel" placeholder="+46 70 123 45 67" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold" />
        </div>
      </div>
    </div>
  );
}

// --- Account Security Card (hidden for students) ---
function AccountSecurity() {
  const { showToast } = useToast();
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
        <ShieldAlert size={20} className="text-red-500" /> Account Security
      </h3>

      <div className="space-y-4">
        <h4 className="text-sm font-bold flex items-center gap-2"><Key size={16} /> Change Password</h4>
        <input type="password" placeholder="Current Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-medium" />
        <input type="password" placeholder="New Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-medium" />
        <input type="password" placeholder="Confirm New Password" className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-medium" />
      </div>

      <div className="pt-4 border-t border-[#050505]/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2 mb-1"><Fingerprint size={16} /> Two-Factor Authentication (2FA)</h4>
            <p className="text-xs font-semibold text-[#050505]/50">Require an authenticator app code to log in.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => showToast('2FA status updated')} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#066606]"></div>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-[#050505]/5">
        <h4 className="text-sm font-bold flex items-center gap-2 mb-4"><Monitor size={16} /> Active Sessions</h4>
        <div className="flex items-center justify-between p-4 bg-[#fcf6e6]/50 border border-[#050505]/5 rounded-xl mb-4">
          <div>
            <div className="font-bold text-sm text-[#066606] flex items-center gap-2">Chrome on Windows <span className="text-[10px] bg-[#066606]/20 px-2 py-0.5 rounded-full">Current Session</span></div>
            <div className="text-xs font-semibold text-[#050505]/50">Gothenburg, Sweden • Active now</div>
          </div>
        </div>
        <button onClick={() => showToast('Logged out of all other devices.')} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">Log out of all other devices</button>
      </div>
    </div>
  );
}

// --- Notification Preferences Card ---
function NotificationPreferences() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
        <Bell size={20} className="text-blue-500" /> Notification Preferences
      </h3>

      <div>
        <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-4">Alert Channels</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#066606] bg-[#fcf6e6]" /> Email
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#066606] bg-[#fcf6e6]" /> In-App
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
            <input type="checkbox" className="w-4 h-4 accent-[#066606] bg-[#fcf6e6]" /> SMS
          </label>
        </div>
      </div>
    </div>
  );
}

// --- Display & Preferences Card ---
function DisplayPreferences() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#050505]/5 flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight border-b border-[#050505]/5 pb-4 flex items-center gap-2">
        <Globe size={20} className="text-purple-500" /> Display & Preferences
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Language</label>
          <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold appearance-none cursor-pointer">
            <option value="en">English (US)</option>
            <option value="sv">Svenska (SE)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Time Format</label>
          <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold appearance-none cursor-pointer">
            <option value="24h">24-hour (14:00)</option>
            <option value="12h">12-hour (2:00 PM)</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs font-bold text-[#050505]/50 uppercase tracking-widest mb-2">Timezone</label>
          <select className="w-full border border-[#050505]/10 rounded-xl px-4 py-3 bg-[#fcf6e6]/50 focus:outline-none focus:border-[#066606]/50 transition font-bold appearance-none cursor-pointer">
            <option value="CET">Central European Time (Gothenburg) - GMT+1</option>
            <option value="UTC">Coordinated Universal Time - UTC</option>
            <option value="EST">Eastern Standard Time (New York) - GMT-5</option>
          </select>
          <p className="text-xs font-medium text-[#050505]/40 mt-2">Adjusts dashboard clocks to your local timezone.</p>
        </div>
      </div>
    </div>
  );
}


// =============================================================================
// FULL SETTINGS VIEW — accepts `showSecurity` prop to hide for students
// =============================================================================
export function SettingsView({ user, showSecurity = true }: { user: any; showSecurity?: boolean }) {
  const { showToast } = useToast();

  return (
    <div className="p-6 md:p-8 flex-1 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#050505]">Settings</h2>
          <p className="font-semibold text-[#050505]/50">Manage your profile, notifications, and preferences.</p>
        </div>
        <button onClick={() => showToast('Settings Saved Successfully!')} className="bg-[#066606] text-[#fcf6e6] px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#066606]/20 hover:bg-[#055505] hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileDetails user={user} />
        {showSecurity && <AccountSecurity />}
        <NotificationPreferences />
        <DisplayPreferences />
      </div>
    </div>
  );
}

// =============================================================================
// FULL PROFILE VIEW
// =============================================================================
export function ProfileView({ user }: { user: any }) {
  return (
    <div className="p-6 md:p-8 flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <ProfileDetails user={user} />
      </div>
    </div>
  );
}
