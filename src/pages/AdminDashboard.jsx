import React, { useState } from 'react';
import { Shield, Flame, UserCheck, Wrench, Filter, Search, MapPin, Sparkles, AlertTriangle, Users, FileText, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import AssignModal from '../components/modals/AssignModal';
import TechniciansModal from '../components/modals/TechniciansModal';
import ComplaintDetailModal from '../components/modals/ComplaintDetailModal';
import BulkActionBar from '../components/BulkActionBar';
import ComplaintRow from '../components/ComplaintRow';
import { generateDailySummary } from '../../services/geminiService';

export const AdminDashboard = () => {
  const {
    complaints,
    technicians,
    bulkAssignTechnicians,
    bulkChangeStatus,
    showToast
  } = useApp();

  const [selectedComplaintForAssign, setSelectedComplaintForAssign] = useState(null);
  const [selectedComplaintForDetails, setSelectedComplaintForDetails] = useState(null);
  const [showTechModal, setShowTechModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Summary State
  const [aiSummary, setAiSummary] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Stats calculation
  const urgentCount = complaints.filter(c => (c.priority === 'Urgent' || c.priority === 'Critical') && c.status !== 'Resolved').length;
  const unassignedCount = complaints.filter(c => !c.assignedTechnician && !c.assignedTech && c.status !== 'Resolved').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const availableTechsCount = technicians.filter(t => t.status === 'Available').length;

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (c.title || c.description || '').toLowerCase().includes(q) ||
        (c.ticketNo || c.id).toLowerCase().includes(q) ||
        (c.location || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredComplaints.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleGenerateAiSummary = async () => {
    setIsGeneratingSummary(true);
    setShowSummaryModal(true);
    try {
      const result = await generateDailySummary(complaints);
      setAiSummary(result.summary);
      showToast('AI Executive Summary generated successfully', 'success');
    } catch (err) {
      setAiSummary('Failed to generate AI summary.');
      showToast('Failed to generate summary', 'error');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Admin Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold">Campus Triage & Operations Portal</h1>
          </div>
          <p className="text-xs text-slate-300">Monitor AI severity flags, dispatch technicians, and manage resolution queues.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTechModal(true)}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl backdrop-blur-md transition-colors flex items-center gap-1.5"
          >
            <Users size={14} /> Technician Directory
          </button>
          <button
            onClick={handleGenerateAiSummary}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles size={14} /> AI Executive Summary
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <StatCard
          title="Unassigned Tickets"
          value={unassignedCount}
          subtext="Awaiting dispatch"
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title="Urgent Priority"
          value={urgentCount}
          subtext="High safety concern"
          icon={Flame}
          color="amber"
        />
        <StatCard
          title="In Repair"
          value={inProgressCount}
          subtext="Techs currently on site"
          icon={Wrench}
          color="blue"
        />
        <StatCard
          title="On-Duty Technicians"
          value={`${availableTechsCount} / ${technicians.length}`}
          subtext="Ready for dispatch"
          icon={UserCheck}
          color="emerald"
        />
      </div>

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        technicians={technicians}
        onBulkAssign={(techId) => {
          bulkAssignTechnicians(selectedIds, techId);
          setSelectedIds([]);
        }}
        onBulkStatusChange={(status) => {
          bulkChangeStatus(selectedIds, status);
          setSelectedIds([]);
        }}
        onClearSelection={() => setSelectedIds([])}
      />

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ticket #, title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Assignment">Pending Assignment</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                <th className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredComplaints.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700"
                  />
                </th>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Issue Title & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">AI Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Tech</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredComplaints.map((c) => (
                <ComplaintRow
                  key={c.id}
                  complaint={c}
                  isSelected={selectedIds.includes(c.id)}
                  onSelect={handleSelectRow}
                  onOpenDetails={(complaint) => setSelectedComplaintForDetails(complaint)}
                  onAssignClick={(complaint) => setSelectedComplaintForAssign(complaint)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      <AssignModal
        complaint={selectedComplaintForAssign}
        isOpen={!!selectedComplaintForAssign}
        onClose={() => setSelectedComplaintForAssign(null)}
      />

      {/* Technician Roster Modal */}
      {showTechModal && (
        <TechniciansModal
          technicians={technicians}
          complaints={complaints}
          onClose={() => setShowTechModal(false)}
        />
      )}

      {/* Detail View Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaintForDetails}
        isOpen={!!selectedComplaintForDetails}
        onClose={() => setSelectedComplaintForDetails(null)}
      />

      {/* AI Daily Executive Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowSummaryModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Sparkles size={20} />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Facility Executive Summary</h2>
              </div>
              <button onClick={() => setShowSummaryModal(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                ×
              </button>
            </div>

            {isGeneratingSummary ? (
              <div className="p-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Generating AI Insights & High-Risk Triage Analysis...</p>
              </div>
            ) : (
              <div className="prose dark:prose-invert text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: (aiSummary || '').replace(/\n/g, '<br/>') }} />
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button onClick={() => setShowSummaryModal(false)} className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
