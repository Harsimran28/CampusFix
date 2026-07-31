import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

export default function MarkCompletedModal({ complaint, isOpen, onClose, onConfirmComplete }) {
  if (!isOpen || !complaint) return null;

  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState({
    safetyInspected: true,
    partsTested: true,
    siteCleaned: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmComplete(complaint.id, notes || 'Work completed according to quality & safety standards.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={22} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mark Work Order Resolved</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">{complaint.title || complaint.description}</div>
            <div className="text-slate-500 mt-0.5">Ticket: {complaint.ticketNo || complaint.id}</div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Quality & Safety Sign-off Checklist</label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.safetyInspected}
                  onChange={(e) => setChecklist({ ...checklist, safetyInspected: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Safety inspection performed & verified secure
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.partsTested}
                  onChange={(e) => setChecklist({ ...checklist, partsTested: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Replacement components tested under operational load
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.siteCleaned}
                  onChange={(e) => setChecklist({ ...checklist, siteCleaned: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Worksite cleaned & restored for campus use
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Resolution Summary Notes</label>
            <textarea
              rows={3}
              placeholder="Describe work performed (e.g. Replaced burnt fuse, tested wiring voltage, verified fan rotation)."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 size={14} /> Submit Completion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
