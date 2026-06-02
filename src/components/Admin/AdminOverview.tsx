import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { Users, FileText, IndianRupee, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const AdminOverview: React.FC = () => {
  const { theme } = useApp();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    totalPayments: 0,
    activeUsers: 0
  });

  // Dummy chart data for visualization since new project has sparse DB
  const revenueData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  const templateData = [
    { name: 'ATS Pro', value: 400 },
    { name: 'Modern', value: 300 },
    { name: 'Creative', value: 300 },
    { name: 'Software', value: 200 },
  ];
  const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B'];

  useEffect(() => {
    const fetchGlobalStats = async () => {
      // Fetch users
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      
      // Fetch resumes
      const { count: resumesCount } = await supabase.from('resumes').select('*', { count: 'exact', head: true });

      // Fetch payments
      const { data: payments } = await supabase.from('payments').select('amount_inr, created_at, status').eq('status', 'successful');
      
      let revenue = 0;
      let todayRev = 0;
      let totalPymt = 0;
      
      if (payments) {
        totalPymt = payments.length;
        payments.forEach(p => {
          revenue += Number(p.amount_inr);
          const date = new Date(p.created_at);
          if (date.toDateString() === new Date().toDateString()) {
            todayRev += Number(p.amount_inr);
          }
        });
      }

      setStats({
        totalUsers: usersCount || 0,
        totalResumes: resumesCount || 0,
        totalRevenue: revenue,
        todayRevenue: todayRev,
        totalPayments: totalPymt,
        activeUsers: usersCount || 0 // Assuming all registered are active for now
      });
    };

    fetchGlobalStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. ADMINISTRATIVE STATS TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {[
          { label: "Total Registered Users", val: stats.totalUsers.toLocaleString(), change: "+12.5% MoM", icon: Users, color: "from-blue-600/10 to-indigo-650/10 text-indigo-400" },
          { label: "Total Resumes Created", val: stats.totalResumes.toLocaleString(), change: "+8.4% MoM", icon: FileText, color: "from-purple-600/10 to-pink-650/10 text-pink-400" },
          { label: "Total Revenue (INR)", val: `₹${stats.totalRevenue.toLocaleString()}`, change: "+3.4% MoM", icon: IndianRupee, color: "from-emerald-600/10 to-teal-650/10 text-emerald-400" },
          { label: "Today's Revenue", val: `₹${stats.todayRevenue.toLocaleString()}`, change: "Daily Peak", icon: TrendingUp, color: "from-amber-600/10 to-orange-650/10 text-amber-500" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-5 rounded-3xl border text-left flex items-start gap-4 bg-gradient-to-tr ${stat.color} border-slate-800/40`}>
              <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider leading-none">{stat.label}</span>
                <span className="text-2xl font-black font-display text-white mt-1 leading-none">{stat.val}</span>
                <div className="flex items-center gap-1 mt-1 text-[9.5px] text-slate-450 leading-none">
                  <ArrowUpRight size={10} className="text-emerald-400" />
                  <span className="font-semibold text-emerald-400">{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`col-span-2 p-6 rounded-3xl border ${theme === 'dark' ? 'bg-[#151f32]/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-display font-bold text-sm text-white mb-6">Revenue Overview (7 Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `₹${val}`} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`col-span-1 p-6 rounded-3xl border flex flex-col ${theme === 'dark' ? 'bg-[#151f32]/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-display font-bold text-sm text-white mb-6">Template Usage Distribution</h3>
          <div className="flex-1 min-h-[250px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={templateData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {templateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {templateData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
