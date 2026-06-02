import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, FileText, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResumeManagement: React.FC = () => {
  const { theme, deleteResume } = useApp();
  const [globalResumes, setGlobalResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    // Join with profiles to get user email
    const { data, error } = await supabase
      .from('resumes')
      .select('*, profiles:user_id(email, name)')
      .order('created_at', { ascending: false });
      
    if (data) setGlobalResumes(data);
    setLoading(false);
  };

  const handleDeleteResume = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this resume from the database?")) {
      await deleteResume(id); // This handles DB deletion and local user state deletion
      setGlobalResumes(globalResumes.filter(r => r.id !== id)); // Update admin global view
    }
  };

  const filteredResumes = globalResumes.filter(r => 
    (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (r.profiles?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-6 rounded-3xl border flex flex-col gap-6 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Resume Database</h3>
          <p className="text-slate-400 text-xs mt-1">Audit and manage all resumes created on the platform.</p>
        </div>
        
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text"
            placeholder="Search title or owner email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-sm font-semibold rounded-xl pl-9 pr-4 py-2.5 outline-none transition-all ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800 text-white focus:border-indigo-600' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'} border`}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800/60">
        <table className="w-full text-sm text-left">
          <thead className={`text-xs uppercase tracking-wider font-bold ${theme === 'dark' ? 'bg-slate-900/50 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-500 border-b border-slate-200'}`}>
            <tr>
              <th className="py-4 px-5">Resume Title</th>
              <th className="py-4 px-5">Owner</th>
              <th className="py-4 px-5">Created</th>
              <th className="py-4 px-5">Template</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading resumes...</td></tr>
            ) : filteredResumes.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">No resumes found.</td></tr>
            ) : (
              filteredResumes.map((r) => (
                <tr key={r.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-900/40 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-blue-400" />
                      </div>
                      <span className="font-bold truncate max-w-[200px]">{r.title || 'Untitled Resume'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{r.profiles?.name || 'Unknown'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{r.profiles?.email || 'No email'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-slate-800 text-slate-300 border-slate-700 uppercase">
                      {r.data?.settings?.templateId || 'unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleDeleteResume(r.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Resume"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
