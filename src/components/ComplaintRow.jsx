import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { UserPlus, Eye, CheckCircle2 } from 'lucide-react';

export default function ComplaintRow({
  complaint,
  isSelected,
  onSelect,
  onOpenDetails,
  onAssignClick
}) {
  return (
    <tr className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(complaint.id, e.target.checked)}
          className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>
      <td className="py-3 px-4 font-bold text-xs text-blue-600 dark:text-blue-400">
        {complaint.ticketNo || complaint.id}
      </td>
      <td className="py-3 px-4">
        <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1">
          {complaint.title || complaint.description}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {complaint.location}
        </div>
      </td>
      <td className="py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-300">
        {complaint.category}
      </td>
      <td className="py-3 px-4">
        <PriorityBadge priority={complaint.priority} />
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={complaint.status} />
      </td>
      <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300">
        {complaint.assignedTechnician || complaint.assignedTech || (
          <span className="text-slate-400 italic">Unassigned</span>
        )}
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onAssignClick(complaint)}
            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
            title="Assign Technician"
          >
            <UserPlus size={16} />
          </button>
          <button
            onClick={() => onOpenDetails(complaint)}
            className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
