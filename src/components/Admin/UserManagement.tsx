import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, User, Mail, Calendar, Shield, Trash2, ShieldBan, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserManagement: React.FC = () => {
  const { theme, user: currentUser } = useApp();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    if (userId === currentUser?.id) {
      alert("You cannot change your own role!");
      return;
    }
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      alert("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?.id) {
      alert("You cannot delete your own account here!");
      return;
    }
    if (confirm("Are you sure? This will delete their profile data (but Auth users must be deleted from Supabase dashboard).")) {
      await supabase.from('profiles').delete().eq('id', userId);
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-6 rounded-3xl border flex flex-col gap-6 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Registered Users</h3>
          <p className="text-slate-400 text-xs mt-1">Manage user accounts and roles.</p>
        </div>
        
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text"
            placeholder="Search email or name..."
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
              <th className="py-4 px-5">User</th>
              <th className="py-4 px-5">Email</th>
              <th className="py-4 px-5">Joined</th>
              <th className="py-4 px-5">Role</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">No users found.</td></tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-900/40 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                        {u.avatar_url ? <img src={u.avatar_url} className="h-full w-full rounded-full object-cover" /> : <User size={14} className="text-indigo-400" />}
                      </div>
                      <span className="font-bold">{u.name || 'Unnamed User'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-xs font-mono text-slate-400">{u.email}</td>
                  <td className="py-3 px-5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {u.role === 'admin' && <Shield size={10} />}
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleToggleRole(u.id, u.role)}
                        className={`p-1.5 rounded-lg transition-colors ${u.role === 'admin' ? 'text-amber-500 hover:bg-amber-500/10' : 'text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
                        title={u.role === 'admin' ? "Remove Admin" : "Make Admin"}
                      >
                        {u.role === 'admin' ? <ShieldBan size={16} /> : <ShieldCheck size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Profile"
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
