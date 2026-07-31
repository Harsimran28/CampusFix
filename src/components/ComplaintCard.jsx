import React from 'react';
import { MapPin, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { useApp } from '../context/AppContext';

export const ComplaintCard = ({ complaint, onAssign, onSelectTrack, isTechView = false }) => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top bar: ID, Priority, Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {complaint.id}
            </span>
            <PriorityBadge priority={complaint.priority} score={complaint.aiSeverityScore} showScore={true} />
          </div>
          <StatusBadge status={complaint.status} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
          {complaint.title}
        </h3>

        {/* Location & Category */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-3">
          <span className="inline-flex items-center gap-1 font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            {complaint.location}
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-medium text-slate-600">{complaint.category}</span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {complaint.description}
        </p>

        {/* AI reasoning badge if urgent/high */}
        {complaint.aiReasoning && (
          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-2.5 mb-4 text-[11px] text-blue-800 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong className="font-semibold">AI Triage Note:</strong> {complaint.aiReasoning}</span>
          </div>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <User className="w-3.5 h-3.5" />
          <span className="truncate max-w-[120px]">{complaint.studentName}</span>
        </div>

        <div className="flex items-center gap-2">
          {onAssign && (
            <button
              onClick={() => onAssign(complaint)}
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-blue-600 text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Assign Tech
            </button>
          )}

          <button
            onClick={() => {
              if (onSelectTrack) onSelectTrack(complaint.id);
              else navigateTo('track', complaint.id);
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1"
          >
            <span>{isTechView ? "Update Status" : "Track"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
