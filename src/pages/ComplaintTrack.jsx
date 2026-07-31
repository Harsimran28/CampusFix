import React, { useState } from 'react';
import { MapPin, Phone, Star, ArrowLeft, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { Timeline } from '../components/Timeline';

export const ComplaintTrack = () => {
  const { selectedComplaint, navigateTo, activeRole } = useApp();
  const [rating, setRating] = useState(5);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!selectedComplaint) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-soft">
        <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Ticket Selected</h2>
        <button
          onClick={() => navigateTo('student_dash')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const beforeImages = selectedComplaint.repairImages?.before || [];
  const afterImages = selectedComplaint.repairImages?.after || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <button
        onClick={() => {
          if (activeRole === 'admin') navigateTo('admin_dash');
          else if (activeRole === 'tech') navigateTo('tech_dash');
          else navigateTo('student_dash');
        }}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portal</span>
      </button>

      {/* Main Ticket Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-lg">
              {selectedComplaint.ticketNo || selectedComplaint.id}
            </span>
            <StatusBadge status={selectedComplaint.status} />
            <PriorityBadge priority={selectedComplaint.priority} score={selectedComplaint.aiSeverityScore} showScore={true} />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Filed: {new Date(selectedComplaint.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{selectedComplaint.title || selectedComplaint.description}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {selectedComplaint.location}
            </span>
            <span>•</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">{selectedComplaint.category}</span>
          </div>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50/70 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700 leading-relaxed">
          {selectedComplaint.description}
        </p>

        {/* Repair Images & Proof Gallery */}
        {(selectedComplaint.image || beforeImages.length > 0 || afterImages.length > 0) && (
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 block mb-2 flex items-center gap-1">
              <ImageIcon size={14} /> Inspection & Repair Proof Photos:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedComplaint.image && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={selectedComplaint.image} alt="Reported issue" className="w-full h-32 object-cover" />
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-900 text-[10px] text-slate-500 font-medium text-center">Reported Issue</div>
                </div>
              )}
              {beforeImages.map(img => (
                <div key={img.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={img.url} alt={img.caption} className="w-full h-32 object-cover" />
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-900 text-[10px] text-slate-500 font-medium text-center">Before: {img.caption}</div>
                </div>
              ))}
              {afterImages.map(img => (
                <div key={img.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={img.url} alt={img.caption} className="w-full h-32 object-cover" />
                  <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950 text-[10px] text-emerald-700 dark:text-emerald-300 font-medium text-center">After: {img.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress Timeline Stepper */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Live Repair Progress Timeline</h2>
        <Timeline timeline={selectedComplaint.timeline} currentStatus={selectedComplaint.status} />
      </div>

      {/* Technician Info & Resolution Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Technician</h3>
          
          {(selectedComplaint.assignedTechnician || selectedComplaint.assignedTech) ? (
            <div className="flex items-center justify-between bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {(selectedComplaint.assignedTechnician || selectedComplaint.assignedTech).charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedComplaint.assignedTechnician || selectedComplaint.assignedTech}</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">On-Duty Maintenance Lead</p>
                </div>
              </div>
              <a
                href="tel:+919876543210"
                className="p-2.5 bg-white dark:bg-slate-800 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl border border-blue-200 dark:border-blue-800 shadow-xs transition-colors"
                title="Call Technician"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-xs text-slate-500">
              Technician pending dispatch by Campus Admin.
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-3 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Service Rating & Feedback</h3>

          {selectedComplaint.status === 'Resolved' ? (
            feedbackSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Thank you for rating the service!
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300">Rate your experience with this maintenance repair:</p>
                <div className="flex items-center gap-1.5 justify-center py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setFeedbackSubmitted(true)}
                  className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Submit Rating
                </button>
              </div>
            )
          ) : (
            <p className="text-xs text-slate-400 italic">
              Rating feedback option will unlock automatically once technician completes the job.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
