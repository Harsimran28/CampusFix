import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './database/db.js';
import {
  categorizeComplaint,
  detectPriority,
  generateDailySummary
} from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// Authentication & User REST Endpoints
// ----------------------------------------------------

// 1. Strict College Database Login Endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'College email and password are required.' });
    }

    const authResult = db.authenticateUser(email, password);
    if (!authResult.success) {
      return res.status(401).json({ success: false, error: authResult.message });
    }

    res.json({ success: true, user: authResult.user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Disabled Public Registration Endpoint
app.post('/api/auth/register', (req, res) => {
  return res.status(403).json({
    success: false,
    error: 'Access Restricted: Public user registration is disabled. Only pre-registered college students and personnel listed in the university database are authorized.'
  });
});

// 3. Get Registered College Users Directory
app.get('/api/users', (req, res) => {
  try {
    res.json(db.getAllUsers());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Database REST Endpoints (Complaints & Technicians)
// ----------------------------------------------------

app.get('/api/complaints', (req, res) => {
  try {
    const complaints = db.getAllComplaints();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/complaints/:id', (req, res) => {
  try {
    const complaint = db.getComplaintById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints', async (req, res) => {
  try {
    const { title, description, category, location, priority, studentName, studentId, imagePreview } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const text = `${title || ''} ${description}`.toLowerCase();
    const aiCategory = await categorizeComplaint(text);
    const aiPriority = await detectPriority(text);

    const newComplaint = db.createComplaint({
      title: title || description.slice(0, 45),
      description,
      category: category || aiCategory.category || 'General',
      location: location || 'Campus Main Grounds',
      priority: priority || aiPriority.priority || 'Medium',
      aiSeverityScore: aiPriority.priority === 'Critical' ? 95 : aiPriority.priority === 'High' ? 82 : 55,
      aiReasoning: aiPriority.reason || 'Assessed via Gemini AI Engine.',
      studentName: studentName || 'Aarav Sharma',
      studentId: studentId || 'STU-2024-041',
      image: imagePreview || null
    });

    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints/:id/assign', (req, res) => {
  try {
    const { techId } = req.body;
    if (!techId) return res.status(400).json({ error: 'techId is required' });

    const updated = db.assignTechnician(req.params.id, techId);
    if (!updated) return res.status(404).json({ error: 'Complaint or Technician not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints/:id/status', (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });

    const updated = db.updateStatus(req.params.id, status, note);
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints/:id/images', (req, res) => {
  try {
    const { phase, url, caption } = req.body;
    if (!phase || !url) return res.status(400).json({ error: 'phase and url are required' });

    const updated = db.addRepairImage(req.params.id, phase, url, caption);
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/complaints/:id/images/:phase/:imageId', (req, res) => {
  try {
    const { id, phase, imageId } = req.params;
    const updated = db.deleteRepairImage(id, phase, imageId);
    if (!updated) return res.status(404).json({ error: 'Complaint image not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints/bulk-assign', (req, res) => {
  try {
    const { complaintIds, techId } = req.body;
    if (!Array.isArray(complaintIds) || !techId) {
      return res.status(400).json({ error: 'complaintIds array and techId are required' });
    }
    const updated = db.bulkAssignTechnician(complaintIds, techId);
    res.json({ success: true, count: updated.length, complaints: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints/bulk-status', (req, res) => {
  try {
    const { complaintIds, status } = req.body;
    if (!Array.isArray(complaintIds) || !status) {
      return res.status(400).json({ error: 'complaintIds array and status are required' });
    }
    const updated = db.bulkUpdateStatus(complaintIds, status);
    res.json({ success: true, count: updated.length, complaints: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/technicians', (req, res) => {
  try {
    res.json(db.getAllTechnicians());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reset-db', (req, res) => {
  try {
    const data = db.resetDatabase();
    res.json({ success: true, message: 'Database reset to initial state', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gemini AI Endpoints
app.post('/api/gemini/categorize', async (req, res) => {
  try {
    const { text, apiKey } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text string is required.' });
    }
    const result = await categorizeComplaint(text, apiKey);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gemini/priority', async (req, res) => {
  try {
    const { text, apiKey } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text string is required.' });
    }
    const result = await detectPriority(text, apiKey);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gemini/summary', async (req, res) => {
  try {
    const { apiKey, customComplaints } = req.body;
    const targetComplaints = Array.isArray(customComplaints) && customComplaints.length > 0 ? customComplaints : db.getAllComplaints();
    const result = await generateDailySummary(targetComplaints, apiKey);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CampusFix AI Database Server listening on port ${PORT}`);
});
