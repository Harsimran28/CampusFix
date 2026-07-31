import React from 'react';
import { Home, PlusCircle, Search, Shield, HardHat, LayoutDashboard, Sparkles, LogIn, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = () => {
  const { currentView, activeRole, currentUserProfile, navigateTo } = useApp();

  const getNavItems = () => {
    if (!currentUserProfile) {
      return [
        { id: 'login', label: 'College Sign In', icon: KeyRound },
        { id: 'landing', label: 'Overview Page', icon: Home }
      ];
    }

    const role = currentUserProfile.role;
    if (role === 'student') {
      return [
        { id: 'student_dash', label: 'Student Dashboard', icon: LayoutDashboard },
        { id: 'raise', label: 'Raise Issue (AI)', icon: PlusCircle },
        { id: 'track', label: 'Track Ticket', icon: Search },
        { id: 'landing', label: 'Overview Page', icon: Home }
      ];
    } else if (role === 'admin') {
      return [
        { id: 'admin_dash', label: 'Admin Portal', icon: Shield },
        { id: 'student_dash', label: 'Student Portal View', icon: LayoutDashboard },
        { id: 'tech_dash', label: 'Technician Queue', icon: HardHat },
        { id: 'track', label: 'Track Ticket', icon: Search },
        { id: 'landing', label: 'Overview Page', icon: Home }
      ];
    } else if (role === 'tech') {
      return [
        { id: 'tech_dash', label: 'Technician Queue', icon: HardHat },
        { id: 'track', label: 'Track Ticket', icon: Search },
        { id: 'landing', label: 'Overview Page', icon: Home }
      ];
    }

    return [
      { id: 'login', label: 'College Sign In', icon: KeyRound },
      { id: 'landing', label: 'Overview Page', icon: Home }
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {/* User Role Banner */}
        <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            AI
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block truncate">
              {currentUserProfile ? `${currentUserProfile.role} Account` : 'Guest Mode'}
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white capitalize truncate">
              {currentUserProfile ? currentUserProfile.name : 'Sign In Required'}
            </h4>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 block mb-2">
            Navigation Menu
          </span>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          <Sparkles className="w-3 h-3 text-blue-500" />
          CampusFix AI v1.0 Production
        </div>
      </div>
    </aside>
  );
};
