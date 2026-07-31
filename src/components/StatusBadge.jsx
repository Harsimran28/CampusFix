import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Wrench, UserCheck } from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  let config = {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
    icon: Clock,
    label: status
  };

  switch (status) {
    case "Pending Assignment":
    case "Pending":
      config = {
        bg: "bg-amber-50 dark:bg-amber-950/60",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        icon: AlertCircle,
        label: "Pending Assignment"
      };
      break;
    case "Assigned":
      config = {
        bg: "bg-purple-50 dark:bg-purple-950/60",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        icon: UserCheck,
        label: "Assigned"
      };
      break;
    case "In Progress":
      config = {
        bg: "bg-blue-50 dark:bg-blue-950/60",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        icon: Wrench,
        label: "In Progress"
      };
      break;
    case "Resolved":
      config = {
        bg: "bg-emerald-50 dark:bg-emerald-950/60",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        icon: CheckCircle2,
        label: "Resolved"
      };
      break;
    default:
      break;
  }

  const IconComponent = config.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${padding}`}>
      <IconComponent className={iconSize} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
