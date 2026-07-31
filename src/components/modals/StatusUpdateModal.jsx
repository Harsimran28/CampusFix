import React, { useState } from 'react';
import { X, RefreshCw, FileText } from 'lucide-react';

export default function StatusUpdateModal({ complaint, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !complaint) return null;

  const [status, setStatus] = useState(complaint.status || 'In Progress');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(complaint.id, status, note || `Status updated to ${status}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <RefreshCw size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Update Status & Progress</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Target</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium"
            >
              <option value="Pending Assignment">Pending Assignment</option>
              <option value="In Progress">In Progress (Work Underway)</option>
              <option value="Pending Parts">Pending Parts / Material Order</option>
              <option value="Resolved">Resolved (Complete)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Progress Note / Site Update</label>
            <textarea
              rows={3}
              placeholder="e.g. Arrived on site, diagnosed short circuit, waiting for replacement circuit breaker from central store."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20">
              Save Progress Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
