import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Globe, Shield, CreditCard, LayoutTemplate } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { theme } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className={`rounded-3xl border flex flex-col md:flex-row overflow-hidden ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
      
      {/* Settings Sidebar */}
      <div className={`w-full md:w-64 border-b md:border-b-0 md:border-r p-4 flex flex-col gap-2 ${theme === 'dark' ? 'border-slate-800 bg-[#0f172a]/40' : 'border-slate-200 bg-slate-50'}`}>
        <h3 className="font-display font-bold text-sm text-slate-400 mb-2 px-3 uppercase tracking-wider">Configuration</h3>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : `text-slate-500 hover:bg-indigo-500/10 ${theme === 'dark' ? 'hover:text-slate-300' : 'hover:text-slate-700'}`
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8">
        {activeTab === 'general' && (
          <div className="max-w-2xl flex flex-col gap-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold mb-1">Global Platform Settings</h2>
              <p className="text-slate-400 text-sm">Update your platform's core information and policies.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Platform Name</label>
                <input type="text" defaultValue="MyResume Assistant" className={`w-full p-3 rounded-xl border text-sm font-medium ${theme === 'dark' ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-200'}`} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Support Email</label>
                <input type="email" defaultValue="support@myresumeassistant.com" className={`w-full p-3 rounded-xl border text-sm font-medium ${theme === 'dark' ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-200'}`} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Maintenance Mode</label>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors bg-slate-700`}>
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform`} />
                  </div>
                  <span className="text-sm font-bold text-slate-400">Offline mode for users</span>
                </div>
              </div>
            </div>

            <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl self-start hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab !== 'general' && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in zoom-in duration-300">
            <Settings size={48} className="text-slate-700 mb-4 animate-spin-slow" />
            <h3 className="text-lg font-bold">Under Construction</h3>
            <p className="text-slate-400 text-sm max-w-sm">The {activeTab} settings module is currently being built in the backend infrastructure.</p>
          </div>
        )}
      </div>
    </div>
  );
};
