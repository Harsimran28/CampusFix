import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_COMPLAINTS, TECHNICIANS } from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'campusfix_database.json');

// Pre-registered official college database accounts
const SEED_USERS = [
  {
    id: "STU-2024-041",
    name: "Aarav Sharma",
    email: "aarav.sharma@campus.edu",
    password: "student123",
    role: "student",
    department: "Hostel Block B Resident"
  },
  {
    id: "STU-2024-118",
    name: "Ananya Roy",
    email: "ananya.roy@campus.edu",
    password: "student123",
    role: "student",
    department: "Science Block Resident"
  },
  {
    id: "STU-2024-089",
    name: "Rohan Patel",
    email: "rohan.patel@campus.edu",
    password: "student123",
    role: "student",
    department: "Central Library Scholar"
  },
  {
    id: "ADM-901",
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@campus.edu",
    password: "admin123",
    role: "admin",
    department: "Facility Operations Lead"
  },
  {
    id: "TECH-101",
    name: "Rajesh Kumar",
    email: "rajesh.tech@campus.edu",
    password: "tech123",
    role: "tech",
    department: "Plumbing Lead"
  },
  {
    id: "TECH-102",
    name: "Amitabh Das",
    email: "amitabh.tech@campus.edu",
    password: "tech123",
    role: "tech",
    department: "Electrical Lead"
  }
];

class LocalDatabase {
  constructor() {
    this.data = {
      users: [],
      complaints: [],
      technicians: [],
      notifications: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!this.data.users || this.data.users.length === 0) {
          this.data.users = SEED_USERS;
          this.save();
        }
        console.log(`[Database] Loaded college database from ${DB_FILE} (${this.data.users.length} registered college accounts)`);
      } else {
        console.log(`[Database] Initializing new college database file at ${DB_FILE}`);
        this.data = {
          users: SEED_USERS,
          complaints: INITIAL_COMPLAINTS,
          technicians: TECHNICIANS,
          notifications: [
            { id: 1, text: "AI classified Ticket #CFX-1092 as Urgent", time: "10 mins ago", read: false }
          ]
        };
        this.save();
      }
    } catch (err) {
      console.error('[Database] Initialization error:', err);
      this.data = { users: SEED_USERS, complaints: INITIAL_COMPLAINTS, technicians: TECHNICIANS, notifications: [] };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Database] Failed to write database file:', err);
    }
  }

  // --- User & Auth Queries ---
  getAllUsers() {
    return this.data.users.map(({ password, ...u }) => u);
  }

  getUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  authenticateUser(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) {
      return {
        success: false,
        message: 'Access Denied: Email not registered in the college database. Only pre-registered college students and staff can access this portal.'
      };
    }
    if (user.password !== password) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    const { password: _, ...userProfile } = user;
    return { success: true, user: userProfile };
  }

  // Registration is disabled for public users
  createUser(userData) {
    return {
      success: false,
      message: 'Access Restricted: Public registration is disabled. Only pre-registered college students and staff in the university database are authorized.'
    };
  }

  // --- Complaints Queries ---
  getAllComplaints() {
    return this.data.complaints;
  }

  getComplaintById(id) {
    return this.data.complaints.find(c => c.id === id || c.ticketNo === id);
  }

  createComplaint(complaintData) {
    const generatedId = complaintData.id || `CFX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint = {
      id: generatedId,
      ticketNo: generatedId,
      title: complaintData.title || complaintData.description.slice(0, 45),
      category: complaintData.category || 'General',
      location: complaintData.location || 'Campus Main Grounds',
      description: complaintData.description,
      priority: complaintData.priority || 'Medium',
      status: complaintData.status || 'Pending Assignment',
      aiSeverityScore: complaintData.aiSeverityScore || 50,
      aiReasoning: complaintData.aiReasoning || 'Assessed upon filing.',
      studentName: complaintData.studentName || 'Student User',
      studentId: complaintData.studentId || 'STU-2024-001',
      assignedTechnician: complaintData.assignedTechnician || null,
      assignedTechnicianId: complaintData.assignedTechnicianId || null,
      assignedTech: complaintData.assignedTech || null,
      createdAt: complaintData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedFixTime: complaintData.estimatedFixTime || 'Pending Triage',
      image: complaintData.image || null,
      repairImages: complaintData.repairImages || { before: [], after: [] },
      timeline: complaintData.timeline || [
        { status: "Reported", time: "Just now", note: `Complaint logged into college database` }
      ]
    };

    this.data.complaints.unshift(newComplaint);
    this.save();
    return newComplaint;
  }

  updateComplaint(id, updates) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    Object.assign(complaint, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return complaint;
  }

  assignTechnician(complaintId, techId) {
    const complaint = this.getComplaintById(complaintId);
    const tech = this.getTechnicianById(techId);
    if (!complaint || !tech) return null;

    complaint.status = "Assigned";
    complaint.assignedTechnician = tech.name;
    complaint.assignedTechnicianId = tech.id;
    complaint.assignedTech = `${tech.name} (${tech.specialization || tech.specialty || 'Lead'})`;
    complaint.techId = tech.id;
    complaint.updatedAt = new Date().toISOString();

    if (!complaint.timeline) complaint.timeline = [];
    complaint.timeline.push({
      status: "Assigned",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: `Assigned to ${tech.name} by Admin`
    });

    tech.activeJobs = (tech.activeJobs || 0) + 1;
    this.save();
    return complaint;
  }

  updateStatus(complaintId, newStatus, note = '') {
    const complaint = this.getComplaintById(complaintId);
    if (!complaint) return null;

    complaint.status = newStatus;
    complaint.updatedAt = new Date().toISOString();

    if (!complaint.timeline) complaint.timeline = [];
    complaint.timeline.push({
      status: newStatus,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: note || `Status updated to ${newStatus}`
    });

    this.save();
    return complaint;
  }

  addRepairImage(complaintId, phase, url, caption) {
    const complaint = this.getComplaintById(complaintId);
    if (!complaint) return null;

    if (!complaint.repairImages) complaint.repairImages = { before: [], after: [] };
    if (!complaint.repairImages[phase]) complaint.repairImages[phase] = [];

    const newImg = { id: `img-${Date.now()}`, url, caption };
    complaint.repairImages[phase].push(newImg);
    complaint.updatedAt = new Date().toISOString();
    this.save();
    return complaint;
  }

  deleteRepairImage(complaintId, phase, imageId) {
    const complaint = this.getComplaintById(complaintId);
    if (!complaint || !complaint.repairImages || !complaint.repairImages[phase]) return null;

    complaint.repairImages[phase] = complaint.repairImages[phase].filter(img => img.id !== imageId);
    complaint.updatedAt = new Date().toISOString();
    this.save();
    return complaint;
  }

  bulkAssignTechnician(complaintIds, techId) {
    const tech = this.getTechnicianById(techId);
    if (!tech) return [];

    const updated = [];
    complaintIds.forEach(id => {
      const res = this.assignTechnician(id, techId);
      if (res) updated.push(res);
    });
    return updated;
  }

  bulkUpdateStatus(complaintIds, newStatus) {
    const updated = [];
    complaintIds.forEach(id => {
      const res = this.updateStatus(id, newStatus, `Bulk status change to ${newStatus}`);
      if (res) updated.push(res);
    });
    return updated;
  }

  getAllTechnicians() {
    return this.data.technicians;
  }

  getTechnicianById(id) {
    return this.data.technicians.find(t => t.id === id);
  }

  resetDatabase() {
    this.data = {
      users: SEED_USERS,
      complaints: INITIAL_COMPLAINTS,
      technicians: TECHNICIANS,
      notifications: [
        { id: 1, text: "Database reset to seed state", time: "Just now", read: false }
      ]
    };
    this.save();
    return this.data;
  }
}

export const db = new LocalDatabase();
