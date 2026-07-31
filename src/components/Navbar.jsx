import React, { useState } from 'react';
import { Wrench, Bell, ChevronDown, Sparkles, LogOut, Database, UserCheck, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = ({ onOpenDemoModal }) => {
  const { currentView, activeRole, currentUserProfile, notifications, navigateTo, logout, isDbConnected } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & DB Badge */}
        <div 
          onClick={() => navigateTo(currentUserProfile ? (currentUserProfile.role === 'student' ? 'student_dash' : currentUserProfile.role === 'admin' ? 'admin_dash' : 'tech_dash') : 'login')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">CampusFix</span>
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" /> AI
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border ${
                isDbConnected
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                <Database size={10} /> {isDbConnected ? 'College DB' : 'Memory DB'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Authorized College Portal</p>
          </div>
        </div>

        {/* Quick Navigation Links (Only shown when authenticated) */}
        {currentUserProfile && (
          <nav className="hidden md:flex items-center gap-1">
            {currentUserProfile.role === 'student' && (
              <>
                <button
                  onClick={() => navigateTo('student_dash')}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                    currentView === 'student_dash' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  My Dashboard
                </button>
                <button
                  onClick={() => navigateTo('raise')}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                    currentView === 'raise' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  + Raise Issue
                </button>
              </>
            )}

            {currentUserProfile.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin_dash')}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                  currentView === 'admin_dash' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Admin Portal
              </button>
            )}

            {currentUserProfile.role === 'tech' && (
              <button
                onClick={() => navigateTo('tech_dash')}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                  currentView === 'tech_dash' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Technician Queue
              </button>
            )}
          </nav>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {onOpenDemoModal && (
            <button
              onClick={onOpenDemoModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold rounded-xl hover:bg-amber-100 transition-colors"
            >
              <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">3-Min Demo Guide</span>
            </button>
          )}
          
          {/* Notifications Dropdown */}
          {currentUserProfile && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-3 z-50 animate-fade-in">
                  <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Live Updates</h4>
                    <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded font-bold">{notifications.length} alerts</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile Pill or Sign In Button */}
          {currentUserProfile ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <div className="text-left leading-tight">
                  <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[120px]">{currentUserProfile.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{currentUserProfile.role}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigateTo('login')}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>College Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
