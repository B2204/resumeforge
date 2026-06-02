import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, LayoutDashboard, Users, FileText, CreditCard, Settings, LogOut, ChevronLeft } from 'lucide-react';

import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { ResumeManagement } from './ResumeManagement';
import { PaymentManagement } from './PaymentManagement';
import { AdminSettings } from './AdminSettings';

interface AdminDashboardProps {
  setActiveView: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveView }) => {
  const { theme, user, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'resumes' | 'payments' | 'settings'>('overview');

  const navigation = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users DB', icon: Users },
    { id: 'resumes', label: 'Resumes', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview />;
      case 'users': return <UserManagement />;
      case 'resumes': return <ResumeManagement />;
      case 'payments': return <PaymentManagement />;
      case 'settings': return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className={`flex h-[calc(100vh-4rem)] overflow-hidden ${theme === 'dark' ? 'bg-[#0b1120]' : 'bg-slate-50'}`}>
      
      {/* Admin Sidebar */}
      <aside className={`w-64 border-r flex flex-col shrink-0 ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">Admin Portal</h2>
              <p className="text-[10px] text-slate-500 font-bold">ResumeForge AI</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 mb-4`}
          >
            <ChevronLeft size={18} />
            Exit Admin
          </button>
          
          <div className="h-px w-full bg-slate-800/50 mb-4" />

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : `text-slate-500 hover:bg-indigo-500/10 ${theme === 'dark' ? 'hover:text-slate-300' : 'hover:text-slate-700'}`
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} className="h-8 w-8 rounded-full border border-slate-700" />
            <div className="flex flex-col text-left truncate">
              <span className="text-xs font-bold text-slate-200 truncate">{user?.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono">Superadmin</span>
            </div>
          </div>
          <button 
            onClick={() => { logout(); setActiveView('landing'); }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${theme === 'dark' ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

    </div>
  );
};
