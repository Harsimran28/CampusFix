import React from 'react';
import { CheckSquare, X, UserPlus, CheckCircle } from 'lucide-react';

export default function BulkActionBar({
  selectedCount,
  technicians = [],
  onBulkAssign,
  onBulkStatusChange,
  onClearSelection
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-xl border border-blue-500 mb-4 animate-fade-in">
      <div className="flex items-center gap-2 font-medium text-sm">
        <CheckSquare size={18} />
        <span>{selectedCount} ticket{selectedCount > 1 ? 's' : ''} selected</span>
      </div>

      <div className="flex items-center gap-3">
        <select
          className="bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-blue-500 outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          onChange={(e) => {
            if (e.target.value) {
              onBulkAssign(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Bulk Assign Tech...</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name} ({tech.specialization || tech.specialty})
            </option>
          ))}
        </select>

        <select
          className="bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-blue-500 outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          onChange={(e) => {
            if (e.target.value) {
              onBulkStatusChange(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Bulk Status Change...</option>
          <option value="Pending Assignment">Pending Assignment</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          onClick={onClearSelection}
          className="flex items-center gap-1 text-xs text-blue-100 hover:text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <X size={14} /> Clear
        </button>
      </div>
    </div>
  );
}
