import React from 'react';
import { X, Users, Wrench, Phone, Star } from 'lucide-react';

export default function TechniciansModal({ technicians = [], complaints = [], onClose }) {
  const getTechActiveCount = (techName, techId) => {
    return complaints.filter(
      (c) => (c.assignedTechnicianId === techId || c.assignedTechnician === techName || c.assignedTech === techName) &&
             c.status !== 'Resolved'
    ).length;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technician Personnel Workload</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live technician availability and field assignment matrix</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {technicians.map((tech) => {
            const activeCount = getTechActiveCount(tech.name, tech.id);
            return (
              <div key={tech.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: tech.avatarColor || '#2563eb' }}
                >
                  {tech.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{tech.name}</h4>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <Star size={12} fill="currentColor" /> {tech.rating || 4.8}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Wrench size={12} /> {tech.specialization || tech.specialty}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                    <Phone size={12} /> {tech.phone || '+91 98765-43210'}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      tech.status === 'Available' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {tech.status || 'Available'}
                    </span>
                    <span className={`text-xs font-bold ${activeCount > 2 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                      {activeCount} Active Task{activeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white dark:bg-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-xl transition-colors">
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
