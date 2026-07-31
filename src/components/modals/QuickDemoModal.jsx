import React from 'react';
import { X, Sparkles, CheckCircle2, Play, Eye, FileText, Camera, CheckSquare, RotateCcw } from 'lucide-react';

export default function QuickDemoModal({
  isOpen,
  onClose,
  onRunAutoDemo,
  isAutoDemoRunning,
  onResetData
}) {
  if (!isOpen) return null;

  const steps = [
    {
      number: '1',
      title: 'Filter & Search Tickets',
      desc: 'Use status tabs (Pending, In Progress, Resolved), search box, priority & category dropdowns to quickly filter active technician tickets.',
      icon: Eye
    },
    {
      number: '2',
      title: 'Accept Assigned Ticket',
      desc: 'Click "Start Repairs" on any Assigned ticket to dispatch technician and update status to In Progress.',
      icon: Play
    },
    {
      number: '3',
      title: 'Log Progress & Status Updates',
      desc: 'Click "Update Status" to record site findings, diagnostic observations, or order replacement parts.',
      icon: FileText
    },
    {
      number: '4',
      title: 'Attach Before/After Repair Photos',
      desc: 'Click "Photo Proof" to select sample repair photo presets or upload real inspection images.',
      icon: Camera
    },
    {
      number: '5',
      title: 'Safety Checklist & Work Sign-Off',
      desc: 'Click "Mark Resolved" to fill quality assurance checklist and submit work resolution notes.',
      icon: CheckSquare
    },
    {
      number: '6',
      title: 'Verify KPI Dashboard Updates',
      desc: 'Watch real-time metric counters update instantly with zero page reload.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-500 rounded-xl">
              <Sparkles size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">3-Minute Evaluator Demo Guide</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to test the entire application in under 3 minutes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm flex items-center gap-1.5">⚡ 10-Second Automated Simulation</h4>
            <p className="text-xs text-blue-100 mt-1">Executes an automated lifecycle (Raise → AI Triage → Assign → Photo Upload → Complete) in real-time.</p>
          </div>
          <button
            onClick={() => { onClose(); onRunAutoDemo(); }}
            disabled={isAutoDemoRunning}
            className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-md transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Play size={14} /> {isAutoDemoRunning ? 'Simulating...' : 'Run Auto Demo'}
          </button>
        </div>

        <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Core Workflow Walkthrough</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div key={step.number} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <IconComp size={14} className="text-blue-500" /> {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={() => { onResetData(); onClose(); }}
            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <RotateCcw size={14} /> Reset Demo Data
          </button>
          <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-700">
            Got it, Let me explore!
          </button>
        </div>
      </div>
    </div>
  );
}
