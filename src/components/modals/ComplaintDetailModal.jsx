import React from 'react';
import { X, Sparkles, MapPin, Clock, User, Wrench, CheckCircle2, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import PriorityBadge from '../PriorityBadge';

export default function ComplaintDetailModal({ complaint, isOpen, onClose }) {
  if (!isOpen || !complaint) return null;

  const beforeImages = complaint.repairImages?.before || [];
  const afterImages = complaint.repairImages?.after || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
              {complaint.ticketNo || complaint.id}
            </span>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{complaint.title || complaint.description}</h2>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
          <span className="flex items-center gap-1"><MapPin size={14} className="text-blue-500" /> {complaint.location}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> Reported: {new Date(complaint.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><User size={14} /> {complaint.studentName || 'Student'}</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700 mb-5">
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Issue Description</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{complaint.description}</p>
        </div>

        {complaint.aiSeverityScore && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800 mb-5">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-sm mb-1">
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              AI Severity Score: {complaint.aiSeverityScore}/100
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">{complaint.aiReasoning || complaint.reason}</p>
          </div>
        )}

        {/* Repair Images Section */}
        {(complaint.image || beforeImages.length > 0 || afterImages.length > 0) && (
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1">
              <ImageIcon size={14} /> Repair Inspection Photos
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {complaint.image && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={complaint.image} alt="Reported issue" className="w-full h-36 object-cover" />
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 text-[11px] text-slate-500 font-medium text-center">Reported Issue Photo</div>
                </div>
              )}
              {beforeImages.map((img) => (
                <div key={img.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={img.url} alt={img.caption} className="w-full h-36 object-cover" />
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 text-[11px] text-slate-500 font-medium text-center">Before: {img.caption}</div>
                </div>
              ))}
              {afterImages.map((img) => (
                <div key={img.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={img.url} alt={img.caption} className="w-full h-36 object-cover" />
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium text-center">After: {img.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Log */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Audit Log & Timeline</h4>
            <div className="space-y-3">
              {complaint.timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.status}</span>
                    <span className="text-slate-400 ml-2">{item.time}</span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white dark:bg-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-xl transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
