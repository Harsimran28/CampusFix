import React, { useState } from 'react';
import { HardHat, Wrench, CheckCircle2, Clock, MapPin, Phone, Upload, Camera, RefreshCw, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import ImageUploadModal from '../components/modals/ImageUploadModal';
import MarkCompletedModal from '../components/modals/MarkCompletedModal';
import StatusUpdateModal from '../components/modals/StatusUpdateModal';
import ComplaintDetailModal from '../components/modals/ComplaintDetailModal';

export const TechDashboard = () => {
  const {
    complaints,
    updateComplaintStatus,
    uploadRepairImage,
    deleteRepairImage,
    currentUser,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('active');
  const [selectedPhotoModalTicket, setSelectedPhotoModalTicket] = useState(null);
  const [selectedStatusModalTicket, setSelectedStatusModalTicket] = useState(null);
  const [selectedCompleteModalTicket, setSelectedCompleteModalTicket] = useState(null);
  const [selectedDetailModalTicket, setSelectedDetailModalTicket] = useState(null);

  const assignedJobs = complaints.filter(
    (c) => c.assignedTechnicianId === (currentUser?.id || 'TECH-101') ||
           (c.assignedTechnician && c.assignedTechnician.includes(currentUser?.name || 'Rajesh')) ||
           (c.assignedTech && c.assignedTech.includes(currentUser?.name || 'Rajesh'))
  );

  const activeJobs = assignedJobs.filter((c) => c.status !== 'Resolved');
  const completedJobs = assignedJobs.filter((c) => c.status === 'Resolved');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Technician Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HardHat className="w-6 h-6 text-amber-200" />
            <h1 className="text-2xl font-bold">Technician Field Work Order Queue</h1>
          </div>
          <p className="text-xs text-amber-100">Welcome, {currentUser?.name || "Rajesh Kumar"}. Manage work orders & upload repair proof below.</p>
        </div>

        <div className="flex items-center gap-2 bg-black/20 p-2 rounded-xl text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Status: On Shift & Active</span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Assigned Active Jobs"
          value={activeJobs.length}
          subtext="Pending repair on field"
          icon={Wrench}
          color="amber"
        />
        <StatCard
          title="Completed Today"
          value={completedJobs.length}
          subtext="Verified & closed"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Avg Response Time"
          value="18 mins"
          subtext="Fast-track AI dispatch"
          icon={Clock}
          color="blue"
        />
      </div>

      {/* Job Queue Header & Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Assigned Repair Orders</h2>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'active' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Active Queue ({activeJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'completed' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Completed ({completedJobs.length})
            </button>
          </div>
        </div>

        {/* Job Cards List */}
        <div className="space-y-4">
          {(activeTab === 'active' ? activeJobs : completedJobs).map((job) => {
            const hasImages = (job.repairImages?.after || []).length > 0;
            return (
              <div key={job.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-soft space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded">
                      {job.ticketNo || job.id}
                    </span>
                    <PriorityBadge priority={job.priority} score={job.aiSeverityScore} showScore={true} size="sm" />
                  </div>
                  <StatusBadge status={job.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{job.title || job.description}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {job.location}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    {job.description}
                  </p>
                </div>

                {/* Technician Action Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Student:</span> {job.studentName || 'Student'}
                    <a href="tel:+919876543210" className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium ml-2">
                      <Phone className="w-3 h-3" /> Call Student
                    </a>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedPhotoModalTicket(job)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-colors ${
                        hasImages
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Camera size={14} />
                      {hasImages ? 'Proof Attached' : 'Photo Proof'}
                    </button>

                    <button
                      onClick={() => setSelectedStatusModalTicket(job)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw size={14} /> Update Status
                    </button>

                    {job.status !== 'Resolved' && (
                      <button
                        onClick={() => setSelectedCompleteModalTicket(job)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={14} /> Mark Resolved
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedDetailModalTicket(job)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {(activeTab === 'active' ? activeJobs : completedJobs).length === 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-soft">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No Jobs in Queue</h3>
              <p className="text-xs text-slate-400 mt-1">All assigned work orders are up to date.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ImageUploadModal
        complaint={selectedPhotoModalTicket}
        onClose={() => setSelectedPhotoModalTicket(null)}
        onUploadImage={uploadRepairImage}
        onDeleteImage={deleteRepairImage}
      />

      <StatusUpdateModal
        complaint={selectedStatusModalTicket}
        isOpen={!!selectedStatusModalTicket}
        onClose={() => setSelectedStatusModalTicket(null)}
        onUpdateStatus={updateComplaintStatus}
      />

      <MarkCompletedModal
        complaint={selectedCompleteModalTicket}
        isOpen={!!selectedCompleteModalTicket}
        onClose={() => setSelectedCompleteModalTicket(null)}
        onConfirmComplete={(id, notes) => updateComplaintStatus(id, 'Resolved', notes)}
      />

      <ComplaintDetailModal
        complaint={selectedDetailModalTicket}
        isOpen={!!selectedDetailModalTicket}
        onClose={() => setSelectedDetailModalTicket(null)}
      />
    </div>
  );
};
