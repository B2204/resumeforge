import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, IndianRupee, Calendar, CheckCircle2, FileDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentManagement: React.FC = () => {
  const { theme } = useApp();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*, profiles:user_id(email, name)')
      .order('created_at', { ascending: false });
      
    if (data) setPayments(data);
    setLoading(false);
  };

  const exportToCSV = () => {
    if (payments.length === 0) return;
    
    const headers = ['Date', 'User Email', 'Razorpay Order ID', 'Razorpay Payment ID', 'Amount (INR)', 'Status'];
    const csvRows = [headers.join(',')];
    
    payments.forEach(p => {
      const row = [
        new Date(p.created_at).toISOString(),
        p.profiles?.email || 'Unknown',
        p.razorpay_order_id,
        p.razorpay_payment_id,
        p.amount_inr,
        p.status
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'resume9_payments.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredPayments = payments.filter(p => 
    (p.razorpay_order_id || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.razorpay_payment_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.profiles?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-6 rounded-3xl border flex flex-col gap-6 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Payment Transactions</h3>
          <p className="text-slate-400 text-xs mt-1">Audit Razorpay payment records.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text"
              placeholder="Search ID or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-sm font-semibold rounded-xl pl-9 pr-4 py-2 outline-none transition-all ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800 text-white focus:border-indigo-600' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'} border`}
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl flex items-center justify-center transition-colors"
            title="Export CSV"
          >
            <FileDown size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800/60">
        <table className="w-full text-sm text-left">
          <thead className={`text-xs uppercase tracking-wider font-bold ${theme === 'dark' ? 'bg-slate-900/50 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-500 border-b border-slate-200'}`}>
            <tr>
              <th className="py-4 px-5">Date</th>
              <th className="py-4 px-5">User</th>
              <th className="py-4 px-5">Transaction IDs</th>
              <th className="py-4 px-5">Amount</th>
              <th className="py-4 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading payments...</td></tr>
            ) : filteredPayments.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">No payments found.</td></tr>
            ) : (
              filteredPayments.map((p) => (
                <tr key={p.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-900/40 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                  <td className="py-3 px-5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(p.created_at).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{p.profiles?.name || 'Unknown'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.profiles?.email || 'No email'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-[10px] font-mono text-slate-400">
                    <div>Ord: <span className="text-indigo-400">{p.razorpay_order_id}</span></div>
                    <div>Pay: <span className="text-teal-400">{p.razorpay_payment_id}</span></div>
                  </td>
                  <td className="py-3 px-5">
                    <span className="font-bold flex items-center text-slate-200">
                      ₹{p.amount_inr}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.status === 'successful' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        {p.status === 'successful' && <CheckCircle2 size={10} />}
                        {p.status.toUpperCase()}
                      </span>
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
