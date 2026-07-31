import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-1/6"></div>
      </div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      <div className="h-16 bg-slate-100 dark:bg-slate-700/50 rounded-xl w-full"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/4"></div>
      </div>
    </div>
  );
}
