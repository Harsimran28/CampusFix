import React, { useState, useEffect } from 'react';
import { GraduationCap, Shield, HardHat, ArrowRight, Lock, Mail, Sparkles, CheckCircle2, Database, ShieldAlert, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const { loginWithCredentials, isDbConnected } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRegisteredUsers(data);
      })
      .catch(() => {});
  }, []);

  const registeredCollegeAccounts = {
    student: {
      roleTitle: 'Registered Student Account',
      email: 'aarav.sharma@campus.edu',
      password: 'student123',
      name: 'Aarav Sharma (STU-2024-041)',
      icon: GraduationCap
    },
    admin: {
      roleTitle: 'Campus Administrator Account',
      email: 's.jenkins@campus.edu',
      password: 'admin123',
      name: 'Dr. Sarah Jenkins (ADM-901)',
      icon: Shield
    },
    tech: {
      roleTitle: 'Facilities Technician Account',
      email: 'rajesh.tech@campus.edu',
      password: 'tech123',
      name: 'Rajesh Kumar (TECH-101)',
      icon: HardHat
    }
  };

  const handlePreFill = (roleKey) => {
    setSelectedRole(roleKey);
    const acc = registeredCollegeAccounts[roleKey];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    await loginWithCredentials(email, password);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
          <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{isDbConnected ? 'College Database Verified Portal' : 'Official Campus Portal'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Sign In to CampusFix AI
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Enter your registered college email address and password to access your maintenance portal.
        </p>

        {/* Security Alert Banner */}
        <div className="max-w-lg mx-auto bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-left flex items-start gap-2.5 text-amber-900 dark:text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block">🔒 Restricted Access Policy:</span>
            <span className="text-[11px] text-amber-800 dark:text-amber-300">
              Only pre-registered college students, admins, and technicians listed in the university database can sign in. Public user registration is strictly disabled.
            </span>
          </div>
        </div>
      </div>

      {/* Pre-fill Quick Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(registeredCollegeAccounts).map(([roleKey, conf]) => {
          const Icon = conf.icon;
          const isSelected = selectedRole === roleKey && email === conf.email;

          return (
            <div
              key={roleKey}
              onClick={() => handlePreFill(roleKey)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/40 shadow-lg ring-2 ring-blue-600/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    Pre-fill
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{conf.roleTitle}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{conf.name}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-4 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Registered Email:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{conf.email}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Password:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{conf.password}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Login Form Container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-soft max-w-lg mx-auto">
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Registered College Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. aarav.sharma@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter your database password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isLoading ? 'Verifying with Database...' : 'Authenticate & Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* College Registered Users Directory Table */}
      {registeredUsers.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-3 max-w-3xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Database size={14} className="text-blue-500" /> College Database Directory ({registeredUsers.length} Authorized Accounts)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {registeredUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => { setEmail(u.email); setPassword(u.role === 'student' ? 'student123' : u.role === 'admin' ? 'admin123' : 'tech123'); }}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{u.name}</span>
                  <span className="text-slate-400 block text-[11px] font-mono">{u.email}</span>
                </div>
                <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
