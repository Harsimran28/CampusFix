import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Wrench, CheckCircle, GraduationCap, Shield, HardHat, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage = ({ onOpenDemo }) => {
  const { loginAsRole } = useApp();

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-blue-100 dark:border-slate-800 shadow-soft text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            Hackathon MVP • AI-Powered Smart Campus Infrastructure
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Fix Campus Issues Faster with <span className="text-blue-600 dark:text-blue-400">Smart AI Triage</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Report maintenance problems in under 30 seconds. CampusFix AI auto-evaluates urgency, routes tasks to technicians, and provides live status updates.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => loginAsRole('student')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Report Issue as Student</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => loginAsRole('admin')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
            >
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Open Admin Dashboard</span>
            </button>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="px-5 py-3.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold rounded-xl hover:bg-amber-100 transition-all flex items-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>3-Min Demo Guide</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4-Step Workflow */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How CampusFix AI Works</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Four simple steps from issue reporting to verified resolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-center relative">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4 border border-blue-100 dark:border-blue-900">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Snap & Report</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Students submit location, description, and photo evidence.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-center relative">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4 border border-indigo-100 dark:border-indigo-900">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI Severity Triage</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">AI analyzes text to predict urgency score (Urgent, High, Low).</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-center relative">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4 border border-purple-100 dark:border-purple-900">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Auto-Dispatch</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Admin assigns the closest qualified technician in 1 click.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-center relative">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4 border border-emerald-100 dark:border-emerald-900">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Live Tracking & Proof</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Real-time status updates from dispatch to final repair photo proof.</p>
          </div>
        </div>
      </section>

      {/* Demo Role Selector Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">Interactive Demo Experience</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Select a Role to Test the MVP</h2>
          <p className="text-xs text-slate-400">Click any card below to experience CampusFix AI from that perspective.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => loginAsRole('student')}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Student Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">File new complaints, test AI auto-priority suggestions, and track repair status.</p>
            <span className="text-xs font-bold text-blue-400 group-hover:underline inline-flex items-center gap-1">
              Launch Student Portal →
            </span>
          </div>

          <div
            onClick={() => loginAsRole('admin')}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Admin Dashboard</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">Triage priority matrix, review AI severity flags, and assign technicians.</p>
            <span className="text-xs font-bold text-indigo-400 group-hover:underline inline-flex items-center gap-1">
              Launch Admin Dashboard →
            </span>
          </div>

          <div
            onClick={() => loginAsRole('tech')}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 rounded-2xl p-6 cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Technician Queue</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">View assigned repair jobs, update work status, and submit proof of completion.</p>
            <span className="text-xs font-bold text-amber-400 group-hover:underline inline-flex items-center gap-1">
              Launch Tech Queue →
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
