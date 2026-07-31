import React, { useState } from 'react';
import { X, UserCheck, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AssignModal({ complaint, isOpen, onClose }) {
  const { technicians, assignTechnician } = useApp();
  const [selectedTechId, setSelectedTechId] = useState(technicians[0]?.id || "");

  if (!isOpen || !complaint) return null;

  const handleAssign = () => {
    if (selectedTechId) {
      assignTechnician(complaint.id, selectedTechId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assign Technician</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ticket <span className="font-mono font-semibold">{complaint.ticketNo || complaint.id}</span> • {complaint.category}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3.5 border border-slate-200/70 dark:border-slate-700 mb-5">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{complaint.title || complaint.description}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">📍 {complaint.location}</p>
          {complaint.aiReasoning && (
            <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mt-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Priority: {complaint.priority} (Score: {complaint.aiSeverityScore || 85})
            </p>
          )}
        </div>

        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Available Technicians</h4>
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 mb-6">
          {technicians.map((tech) => {
            const isSelected = selectedTechId === tech.id;
            return (
              <div
                key={tech.id}
                onClick={() => setSelectedTechId(tech.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-600'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-white">{tech.name}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tech.specialization || tech.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    tech.activeJobs === 0 ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}>
                    {tech.activeJobs || 0} Active Tasks
                  </span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
