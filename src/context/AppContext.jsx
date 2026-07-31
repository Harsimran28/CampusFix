import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS, TECHNICIANS } from '../data/mockData';

const AppContext = createContext();
const API_BASE = 'http://localhost:3005/api';

export const AppProvider = ({ children }) => {
  // App opens directly to LOGIN screen by default
  const [currentView, setCurrentView] = useState('login');
  const [activeRole, setActiveRole] = useState('login');
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [technicians, setTechnicians] = useState(TECHNICIANS);
  const [selectedComplaintId, setSelectedComplaintId] = useState("CFX-1092");
  const [toastMessage, setToastMessage] = useState(null);
  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI classified Ticket #CFX-1092 as Urgent", time: "10 mins ago", read: false },
    { id: 2, text: "Tech Rajesh Kumar arrived at Hostel Block B", time: "25 mins ago", read: false }
  ]);

  const currentUser = currentUserProfile;

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  // Fetch initial data from Database API
  const fetchDbData = async () => {
    try {
      const [resC, resT] = await Promise.all([
        fetch(`${API_BASE}/complaints`),
        fetch(`${API_BASE}/technicians`)
      ]);
      if (resC.ok && resT.ok) {
        const complaintsData = await resC.json();
        const techniciansData = await resT.json();
        if (Array.isArray(complaintsData) && complaintsData.length > 0) {
          setComplaints(complaintsData);
        }
        if (Array.isArray(techniciansData) && techniciansData.length > 0) {
          setTechnicians(techniciansData);
        }
        setIsDbConnected(true);
      }
    } catch (err) {
      console.log('[AppContext] API offline, operating with local state.');
      setIsDbConnected(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const navigateTo = (view, extraId = null) => {
    // Auth Guard: If trying to access protected views without logging in
    if (!currentUserProfile && view !== 'login' && view !== 'landing') {
      showToast('Access Restricted: Please sign in with your registered college account first.', 'warning');
      setCurrentView('login');
      setActiveRole('login');
      return;
    }

    setCurrentView(view);
    if (extraId) {
      setSelectedComplaintId(extraId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Strict College Database Verification Login
  const loginWithCredentials = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || 'Access Denied: Email not registered in the college database.', 'error');
        return { success: false, error: data.error };
      }

      const user = data.user;
      setCurrentUserProfile(user);
      setActiveRole(user.role);

      if (user.role === 'student') setCurrentView('student_dash');
      else if (user.role === 'admin') setCurrentView('admin_dash');
      else if (user.role === 'tech') setCurrentView('tech_dash');
      else setCurrentView('student_dash');

      showToast(`Welcome back, ${user.name}! Verified with College Database.`, 'success');
      return { success: true, user };
    } catch (err) {
      showToast('Connection to College Database failed. Make sure backend is running.', 'error');
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setCurrentUserProfile(null);
    setActiveRole('login');
    setCurrentView('login');
    showToast('Logged out successfully.', 'info');
  };

  const loginAsRole = (role) => {
    showToast('Please sign in with your registered college email & password.', 'warning');
    setCurrentView('login');
    setActiveRole('login');
  };

  const analyzeComplaintWithAI = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    let priority = "Medium";
    let score = 50;
    let category = "General";
    let reasoning = "Standard priority issue detected.";

    if (text.includes("spark") || text.includes("leak") || text.includes("fire") || text.includes("burnt") || text.includes("hazard") || text.includes("flood")) {
      priority = "Urgent";
      score = Math.floor(Math.random() * 10) + 88;
      reasoning = "Critical safety risk or active flooding detected by AI.";
    } else if (text.includes("blackout") || text.includes("ac") || text.includes("lecture") || text.includes("wifi") || text.includes("exam") || text.includes("locked")) {
      priority = "High";
      score = Math.floor(Math.random() * 12) + 75;
      reasoning = "High impact on academic activities or environmental comfort.";
    } else if (text.includes("chair") || text.includes("handle") || text.includes("drawer") || text.includes("lightbulb") || text.includes("paint")) {
      priority = "Low";
      score = Math.floor(Math.random() * 15) + 30;
      reasoning = "Minor cosmetic or non-critical item repair.";
    }

    if (text.includes("water") || text.includes("pipe") || text.includes("tap") || text.includes("drain") || text.includes("flush")) category = "Plumbing";
    else if (text.includes("spark") || text.includes("projector") || text.includes("wire") || text.includes("socket") || text.includes("switch")) category = "Electrical";
    else if (text.includes("ac") || text.includes("cooling") || text.includes("fan") || text.includes("heater") || text.includes("vent")) category = "HVAC";
    else if (text.includes("wifi") || text.includes("router") || text.includes("internet") || text.includes("cable")) category = "Networking";
    else if (text.includes("chair") || text.includes("desk") || text.includes("table") || text.includes("door") || text.includes("lock")) category = "Furniture";

    return { priority, score, category, reasoning };
  };

  const addComplaint = async (newTicket) => {
    if (!currentUserProfile) {
      showToast('Please log in with your registered student account to file a complaint.', 'error');
      navigateTo('login');
      return;
    }

    const aiResult = analyzeComplaintWithAI(newTicket.title, newTicket.description);
    const generatedId = `CFX-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedComplaint = {
      id: generatedId,
      ticketNo: generatedId,
      title: newTicket.title,
      category: newTicket.category || aiResult.category,
      location: newTicket.location,
      description: newTicket.description,
      priority: newTicket.manualPriority || aiResult.priority,
      status: "Pending Assignment",
      aiSeverityScore: aiResult.score,
      aiReasoning: aiResult.reasoning,
      studentName: currentUserProfile?.name || "Registered Student",
      studentId: currentUserProfile?.id || "STU-2024-041",
      assignedTechnician: null,
      assignedTechnicianId: null,
      techId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedFixTime: "Pending Triage",
      image: newTicket.imagePreview || null,
      repairImages: { before: [], after: [] },
      timeline: [
        { status: "Reported", time: "Just now", note: `Complaint submitted by ${currentUserProfile?.name || 'Student'}` },
        { status: "AI Triage", time: "Just now", note: `AI priority evaluated as ${aiResult.priority} (Severity Score: ${aiResult.score})` }
      ]
    };

    setComplaints(prev => [formattedComplaint, ...prev]);
    setSelectedComplaintId(generatedId);

    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedComplaint)
      });
      if (res.ok) {
        showToast(`Complaint #${generatedId} saved to Database`, 'success');
      }
    } catch (e) {
      showToast(`Complaint #${generatedId} created locally`, 'info');
    }

    setNotifications(prev => [
      { id: Date.now(), text: `New Ticket #${generatedId} filed with AI Priority: ${aiResult.priority}`, time: "Just now", read: false },
      ...prev
    ]);

    navigateTo('track', generatedId);
  };

  const assignTechnician = async (complaintId, techId) => {
    const techObj = technicians.find(t => t.id === techId);
    if (!techObj) return;

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: "Assigned",
          assignedTechnician: techObj.name,
          assignedTechnicianId: techObj.id,
          assignedTech: `${techObj.name} (${techObj.specialization || techObj.specialty})`,
          techId: techObj.id,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...(c.timeline || []),
            { status: "Assigned", time: "Just now", note: `Assigned to ${techObj.name} by Admin` }
          ]
        };
      }
      return c;
    }));

    setTechnicians(prev => prev.map(t => t.id === techId ? { ...t, activeJobs: (t.activeJobs || 0) + 1 } : t));

    try {
      await fetch(`${API_BASE}/complaints/${complaintId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techId })
      });
      showToast(`Database: Assigned #${complaintId} to ${techObj.name}`, 'success');
    } catch (e) {
      showToast(`Assigned #${complaintId} to technician ${techObj.name}`, 'info');
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus, note = "") => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...(c.timeline || []),
            { status: newStatus, time: "Just now", note: note || `Status updated to ${newStatus}` }
          ]
        };
      }
      return c;
    }));

    try {
      await fetch(`${API_BASE}/complaints/${complaintId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note })
      });
      showToast(`Database: Ticket #${complaintId} status → ${newStatus}`, 'info');
    } catch (e) {
      showToast(`Ticket #${complaintId} status updated to ${newStatus}`, 'info');
    }
  };

  const uploadRepairImage = async (complaintId, phase, url, caption) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const currentImages = c.repairImages || { before: [], after: [] };
        const newImg = { id: `img-${Date.now()}`, url, caption };
        return {
          ...c,
          repairImages: {
            ...currentImages,
            [phase]: [...(currentImages[phase] || []), newImg]
          },
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    try {
      await fetch(`${API_BASE}/complaints/${complaintId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase, url, caption })
      });
      showToast(`Database: Saved ${phase} repair photo`, 'success');
    } catch (e) {
      showToast(`Uploaded ${phase} repair photo to #${complaintId}`, 'info');
    }
  };

  const deleteRepairImage = async (complaintId, phase, imgId) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const currentImages = c.repairImages || { before: [], after: [] };
        return {
          ...c,
          repairImages: {
            ...currentImages,
            [phase]: (currentImages[phase] || []).filter(img => img.id !== imgId)
          }
        };
      }
      return c;
    }));

    try {
      await fetch(`${API_BASE}/complaints/${complaintId}/images/${phase}/${imgId}`, {
        method: 'DELETE'
      });
      showToast('Database: Removed repair photo', 'info');
    } catch (e) {
      showToast(`Removed photo from #${complaintId}`, 'info');
    }
  };

  const bulkAssignTechnicians = async (complaintIds, techId) => {
    const techObj = technicians.find(t => t.id === techId);
    if (!techObj) return;

    setComplaints(prev => prev.map(c => {
      if (complaintIds.includes(c.id)) {
        return {
          ...c,
          status: "Assigned",
          assignedTechnician: techObj.name,
          assignedTechnicianId: techObj.id,
          assignedTech: `${techObj.name} (${techObj.specialization || techObj.specialty})`,
          techId: techObj.id,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    try {
      await fetch(`${API_BASE}/complaints/bulk-assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintIds, techId })
      });
      showToast(`Database: Bulk assigned ${complaintIds.length} tickets to ${techObj.name}`, 'success');
    } catch (e) {
      showToast(`Bulk assigned ${complaintIds.length} tickets`, 'info');
    }
  };

  const bulkChangeStatus = async (complaintIds, newStatus) => {
    setComplaints(prev => prev.map(c => {
      if (complaintIds.includes(c.id)) {
        return {
          ...c,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    try {
      await fetch(`${API_BASE}/complaints/bulk-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintIds, status: newStatus })
      });
      showToast(`Database: Bulk status updated to ${newStatus}`, 'info');
    } catch (e) {
      showToast(`Updated ${complaintIds.length} tickets to status ${newStatus}`, 'info');
    }
  };

  const resetDemoData = async () => {
    setComplaints(INITIAL_COMPLAINTS);
    setTechnicians(TECHNICIANS);
    try {
      await fetch(`${API_BASE}/reset-db`, { method: 'POST' });
      showToast('Database reset to initial seed state', 'info');
    } catch (e) {
      showToast('Reset local memory data', 'info');
    }
  };

  const runAutoDemoSimulation = async () => {
    setIsAutoDemoRunning(true);
    showToast('🚀 Launching Auto Demo Simulation...', 'info');

    setTimeout(async () => {
      const demoId = `CFX-${Math.floor(1000 + Math.random() * 9000)}`;
      const demoTicket = {
        id: demoId,
        ticketNo: demoId,
        title: "Short Circuit & Sparks in Lab 2",
        category: "Electrical",
        location: "Engineering Complex, Lab 2",
        description: "Severe electrical sparks coming from main power socket.",
        priority: "Urgent",
        status: "Pending Assignment",
        aiSeverityScore: 95,
        aiReasoning: "Critical electrical fire hazard detected by AI.",
        studentName: "Aarav Sharma",
        studentId: "STU-2024-041",
        createdAt: new Date().toISOString()
      };

      await addComplaint(demoTicket);
      showToast('⚡ Admin Triage: Dispatching senior technician...', 'warning');

      setTimeout(async () => {
        await assignTechnician(demoId, 'TECH-101');
        showToast('🔧 Tech Portal: Accepting work order & attaching repair proof...', 'info');

        setTimeout(async () => {
          await updateComplaintStatus(demoId, 'In Progress', 'Technician on-site with electrical safety gear.');
          await uploadRepairImage(demoId, 'after', '/assets/repair_pipe_fixed.jpg', 'Replaced circuit breaker & tested ground voltage.');
          
          setTimeout(async () => {
            await updateComplaintStatus(demoId, 'Resolved', 'Safety inspection passed. Issue completely resolved.');
            setIsAutoDemoRunning(false);
            showToast('✅ Auto Demo Complete!', 'success');
          }, 2000);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  return (
    <AppContext.Provider value={{
      currentView,
      activeRole,
      currentUser,
      currentUserProfile,
      complaints,
      technicians,
      selectedComplaint,
      selectedComplaintId,
      notifications,
      toastMessage,
      isAutoDemoRunning,
      isDbConnected,
      showToast,
      clearToast,
      navigateTo,
      loginAsRole,
      loginWithCredentials,
      logout,
      addComplaint,
      assignTechnician,
      updateComplaintStatus,
      uploadRepairImage,
      deleteRepairImage,
      bulkAssignTechnicians,
      bulkChangeStatus,
      resetDemoData,
      runAutoDemoSimulation,
      analyzeComplaintWithAI,
      setSelectedComplaintId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
