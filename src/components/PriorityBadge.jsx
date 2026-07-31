import React from 'react';
import { Flame, AlertTriangle, ArrowDown, Sparkles } from 'lucide-react';

export const PriorityBadge = ({ priority, score, showScore = false, size = "md" }) => {
  let config = {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
    icon: ArrowDown
  };

  switch (priority) {
    case "Urgent":
    case "Critical":
      config = {
        bg: "bg-rose-50 dark:bg-rose-950/60",
        text: "text-rose-700 dark:text-rose-300",
        border: "border-rose-200 dark:border-rose-800",
        icon: Flame
      };
      break;
    case "High":
      config = {
        bg: "bg-orange-50 dark:bg-orange-950/60",
        text: "text-orange-700 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800",
        icon: AlertTriangle
      };
      break;
    case "Medium":
      config = {
        bg: "bg-blue-50 dark:bg-blue-950/60",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        icon: Sparkles
      };
      break;
    case "Low":
      config = {
        bg: "bg-slate-100 dark:bg-slate-800",
        text: "text-slate-600 dark:text-slate-300",
        border: "border-slate-200 dark:border-slate-700",
        icon: ArrowDown
      };
      break;
    default:
      break;
  }

  const IconComponent = config.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-semibold";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${config.bg} ${config.text} ${config.border} ${padding}`}>
      <IconComponent className="w-3.5 h-3.5" />
      <span>{priority}</span>
      {showScore && score && (
        <span className="ml-1 pl-1.5 border-l border-current/20 font-mono text-[10px] opacity-80">
          AI {score}%
        </span>
      )}
    </span>
  );
};

export default PriorityBadge;
