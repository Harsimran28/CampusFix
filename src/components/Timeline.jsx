import React from 'react';
import { CheckCircle2, Clock, Sparkles, UserCheck, Wrench, ShieldCheck } from 'lucide-react';

export const Timeline = ({ timeline = [], currentStatus = "Pending Assignment" }) => {
  const steps = [
    { title: "Reported", key: "Reported", icon: Clock },
    { title: "AI Triage", key: "AI Triage", icon: Sparkles },
    { title: "Assigned", key: "Assigned", icon: UserCheck },
    { title: "In Progress", key: "In Progress", icon: Wrench },
    { title: "Resolved", key: "Resolved", icon: ShieldCheck }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case "Reported": return 0;
      case "AI Triage": return 1;
      case "Pending Assignment": return 1;
      case "Assigned": return 2;
      case "In Progress": return 3;
      case "Resolved": return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentStatus);

  return (
    <div className="w-full py-4">
      {/* Horizontal Stepper Bar */}
      <div className="relative flex items-center justify-between mb-8 px-4">
        {/* Track Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500"
          style={{ width: `${(currentStepIdx / (steps.length - 1)) * 90}%` }}
        ></div>

        {/* Step Circles */}
        {steps.map((step, idx) => {
          const isPassed = idx <= currentStepIdx;
          const isCurrent = idx === currentStepIdx;
          const StepIcon = step.icon;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                    : isPassed
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {isPassed && !isCurrent ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </div>
              <span className={`mt-2 text-xs font-semibold ${isPassed ? 'text-blue-700' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Timeline Event Feed */}
      <div className="space-y-4 border-l-2 border-slate-200 ml-4 pl-6 pt-2">
        {timeline.map((event, i) => (
          <div key={i} className="relative group">
            {/* Circle dot on line */}
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></div>
            
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-900">{event.status}</span>
                <span className="text-slate-400 font-mono">{event.time}</span>
              </div>
              <p className="text-xs text-slate-600">{event.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
