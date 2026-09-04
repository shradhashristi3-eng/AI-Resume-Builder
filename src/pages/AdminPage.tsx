import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { 
  ShieldAlert, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Ban, 
  Crown, 
  BarChart2 
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const adminStats = [
    { label: 'Total SaaS Users', val: '14,890', change: '+18.4%', icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { label: 'Monthly Recurring Revenue', val: '$48,920', change: '+24.1%', icon: <DollarSign className="w-5 h-5 text-emerald-500" /> },
    { label: 'Active Resumes Created', val: '42,310', change: '+12.8%', icon: <TrendingUp className="w-5 h-5 text-cyan-500" /> },
    { label: 'Total Downloads Count', val: '98,450', change: '+32.0%', icon: <Download className="w-5 h-5 text-violet-500" /> }
  ];

  const mockUsersList = [
    { id: 'usr-1', name: 'Alex Vance', email: 'alex.vance@example.com', plan: 'pro', status: 'Active', downloads: 14, credits: 85, joined: '2024-01-15' },
    { id: 'usr-2', name: 'Sarah Jenkins', email: 'sarah.jenkins@example.com', plan: 'executive', status: 'Active', downloads: 38, credits: 240, joined: '2024-02-01' },
    { id: 'usr-3', name: 'David Chen', email: 'david.chen@example.com', plan: 'free', status: 'Active', downloads: 2, credits: 10, joined: '2024-03-10' },
    { id: 'usr-4', name: 'Elena Rostova', email: 'elena.rostova@example.com', plan: 'pro', status: 'Active', downloads: 22, credits: 110, joined: '2024-03-22' },
    { id: 'usr-5', name: 'Marcus Brody', email: 'marcus.brody@example.com', plan: 'free', status: 'Suspended', downloads: 0, credits: 0, joined: '2024-04-05' }
  ];

  const filteredUsers = mockUsersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SaaS Super Admin Panel</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Platform Analytics & Management</h1>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          System Node: US-WEST-1 • Status: Normal
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((st, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">{st.label}</span>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">{st.icon}</div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{st.val}</div>
            <span className="text-[11px] font-bold text-emerald-500">{st.change} from last month</span>
          </div>
        ))}
      </div>

      {/* Revenue Chart Visual Bar Mock */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> MRR Revenue Growth Trend (2024)
          </h3>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            ARR: $587,040
          </span>
        </div>

        <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200 dark:border-slate-800">
          {[35, 42, 50, 68, 75, 88, 92, 100].map((h, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div 
                style={{ height: `${h}%` }}
                className="w-full bg-gradient-to-t from-indigo-600 via-violet-600 to-cyan-400 rounded-t-lg transition-all hover:opacity-90"
              />
              <span className="text-[10px] text-slate-400 font-semibold">M{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Management Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" /> User Accounts & Subscriptions ({filteredUsers.length})
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-2">User Details</th>
                <th className="py-3 px-2">Plan</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Downloads</th>
                <th className="py-3 px-2">AI Credits</th>
                <th className="py-3 px-2">Joined</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{u.name}</span>
                    <span className="text-slate-400 text-[11px]">{u.email}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20">
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${u.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {u.status === 'Active' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{u.downloads}</td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{u.credits}</td>
                  <td className="py-3 px-2 text-slate-400">{u.joined}</td>
                  <td className="py-3 px-2 text-right">
                    <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
