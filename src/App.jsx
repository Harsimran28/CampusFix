import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { RaiseComplaint } from './pages/RaiseComplaint';
import { ComplaintTrack } from './pages/ComplaintTrack';
import { AdminDashboard } from './pages/AdminDashboard';
import { TechDashboard } from './pages/TechDashboard';
import Toast from './components/Toast';
import QuickDemoModal from './components/modals/QuickDemoModal';

const MainLayout = () => {
  const {
    currentView,
    toastMessage,
    clearToast,
    isAutoDemoRunning,
    runAutoDemoSimulation,
    resetDemoData
  } = useApp();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <LandingPage onOpenDemo={() => setIsDemoModalOpen(true)} />;
      case 'login': return <LoginPage />;
      case 'student_dash': return <StudentDashboard />;
      case 'raise': return <RaiseComplaint />;
      case 'track': return <ComplaintTrack />;
      case 'admin_dash': return <AdminDashboard />;
      case 'tech_dash': return <TechDashboard />;
      default: return <LandingPage onOpenDemo={() => setIsDemoModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />
      
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {renderView()}
        </main>
      </div>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-4 text-center text-xs text-slate-400">
        CampusFix AI • Smart Campus Maintenance Platform • Phase 2 - 8 Consolidated MVP
      </footer>

      {/* Global Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={clearToast}
        />
      )}

      {/* Quick Demo Modal */}
      <QuickDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onRunAutoDemo={runAutoDemoSimulation}
        isAutoDemoRunning={isAutoDemoRunning}
        onResetData={resetDemoData}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
