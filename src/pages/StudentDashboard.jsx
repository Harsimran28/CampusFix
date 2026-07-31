import React, { useState } from 'react';
import { PlusCircle, Clock, Wrench, CheckCircle2, ListFilter, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { ComplaintCard } from '../components/ComplaintCard';

export const StudentDashboard = () => {
  const { complaints, currentUser, navigateTo } = useApp();
  const [filterTab, setFilterTab] = useState('all'); // all, active, resolved

  const studentComplaints = complaints;
  const activeComplaints = studentComplaints.filter(c => c.status !== "Resolved");
  const resolvedComplaints = studentComplaints.filter(c => c.status === "Resolved");

  let displayedComplaints = studentComplaints;
  if (filterTab === 'active') displayedComplaints = activeComplaints;
  if (filterTab === 'resolved') displayedComplaints = resolvedComplaints;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, {currentUser?.name || "Student"} 👋</h1>
            <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
              Campus Resident
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track your campus maintenance requests or report new issues instantly.</p>
        </div>

        <button
          onClick={() => navigateTo('raise')}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise New Complaint</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Reported"
          value={studentComplaints.length}
          subtext="Lifetime campus tickets"
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Active Repairs"
          value={activeComplaints.length}
          subtext="Currently being processed"
          icon={Wrench}
          color="amber"
        />
        <StatCard
          title="Resolved Issues"
          value={resolvedComplaints.length}
          subtext="Verified & closed"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Filter Tabs & Complaint Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-slate-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">My Maintenance Tickets</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterTab === 'all' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({studentComplaints.length})
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterTab === 'active' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Active ({activeComplaints.length})
            </button>
            <button
              onClick={() => setFilterTab('resolved')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterTab === 'resolved' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Resolved ({resolvedComplaints.length})
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        {displayedComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedComplaints.map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-soft">
            <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No Tickets Found</h3>
            <p className="text-xs text-slate-400 mt-1">There are no complaints matching the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
