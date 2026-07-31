export const INITIAL_COMPLAINTS = [
  {
    id: "CFX-1092",
    ticketNo: "CFX-1092",
    title: "Water Leakage from Overhead Pipe",
    category: "Plumbing",
    location: "Hostel Block B, 2nd Floor Corridor",
    description: "Water leaking heavily near Room 204. Floor is getting slippery and water might damage electrical sockets nearby.",
    priority: "Urgent",
    status: "In Progress",
    aiSeverityScore: 92,
    aiReasoning: "Potential risk of slip hazard and electrical contact. High severity detected.",
    studentName: "Aarav Sharma",
    studentId: "STU-2024-041",
    assignedTechnician: "Rajesh Kumar",
    assignedTechnicianId: "TECH-101",
    techId: "TECH-101",
    createdAt: "2026-07-30T09:15:00",
    updatedAt: "2026-07-30T10:30:00",
    estimatedFixTime: "45 mins",
    image: "/assets/complaint_pipe_leak.jpg",
    repairImages: {
      before: [
        { id: "img-b1", url: "/assets/complaint_pipe_leak.jpg", caption: "Heavy pipe corrosion and leak at joint" }
      ],
      after: [
        { id: "img-a1", url: "/assets/repair_pipe_fixed.jpg", caption: "Joint sealed and pressure checked" }
      ]
    },
    timeline: [
      { status: "Reported", time: "09:15 AM", note: "Complaint logged by Aarav Sharma" },
      { status: "AI Triage", time: "09:16 AM", note: "AI classified priority as Urgent (Score: 92)" },
      { status: "Assigned", time: "09:30 AM", note: "Assigned to Technician Rajesh Kumar" },
      { status: "In Progress", time: "10:30 AM", note: "Technician arrived on site with repair kit" }
    ]
  },
  {
    id: "CFX-1088",
    ticketNo: "CFX-1088",
    title: "Projector Display Flickering & Blackout",
    category: "Electrical / Audio-Visual",
    location: "Science Building, Lecture Hall 3",
    description: "The main HDMI overhead projector dims every 5 minutes during lectures. Fan inside projector makes loud humming sound.",
    priority: "High",
    status: "Pending Assignment",
    aiSeverityScore: 78,
    aiReasoning: "Impacts ongoing academic lectures for 120+ students.",
    studentName: "Ananya Roy",
    studentId: "STU-2024-118",
    assignedTechnician: null,
    assignedTechnicianId: null,
    techId: null,
    createdAt: "2026-07-30T11:00:00",
    updatedAt: "2026-07-30T11:00:00",
    estimatedFixTime: "1-2 hours",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80",
    repairImages: { before: [], after: [] },
    timeline: [
      { status: "Reported", time: "11:00 AM", note: "Complaint logged by Ananya Roy" },
      { status: "AI Triage", time: "11:01 AM", note: "AI classified priority as High (Score: 78)" }
    ]
  },
  {
    id: "CFX-1075",
    ticketNo: "CFX-1075",
    title: "Air Conditioner Cooling Failure",
    category: "HVAC",
    location: "Central Library, 1st Floor Study Zone",
    description: "AC unit #4 blowing warm air. Temperature in the quiet reading zone is exceeding 32°C.",
    priority: "Medium",
    status: "In Progress",
    aiSeverityScore: 64,
    aiReasoning: "Comfort degradation in public study area. Moderate urgency.",
    studentName: "Rohan Patel",
    studentId: "STU-2024-089",
    assignedTechnician: "Sanjay Verma",
    assignedTechnicianId: "TECH-103",
    techId: "TECH-103",
    createdAt: "2026-07-29T14:20:00",
    updatedAt: "2026-07-30T08:45:00",
    estimatedFixTime: "30 mins",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
    repairImages: { before: [], after: [] },
    timeline: [
      { status: "Reported", time: "Yesterday 02:20 PM", note: "Complaint logged by Rohan Patel" },
      { status: "AI Triage", time: "Yesterday 02:21 PM", note: "AI priority assigned: Medium" },
      { status: "Assigned", time: "Yesterday 04:00 PM", note: "Assigned to Sanjay Verma" },
      { status: "In Progress", time: "Today 08:45 AM", note: "Refrigerant level check in progress" }
    ]
  },
  {
    id: "CFX-1060",
    ticketNo: "CFX-1060",
    title: "Broken Study Desk Drawer & Chair Armrest",
    category: "Furniture",
    location: "Dorm Hall A, Room 108",
    description: "Wooden desk drawer handles snapped and chair height lock mechanism is broken.",
    priority: "Low",
    status: "Resolved",
    aiSeverityScore: 35,
    aiReasoning: "Minor non-emergency interior repair.",
    studentName: "Priyanaka Sen",
    studentId: "STU-2024-210",
    assignedTechnician: "Vikram Singh",
    assignedTechnicianId: "TECH-104",
    techId: "TECH-104",
    createdAt: "2026-07-28T16:00:00",
    updatedAt: "2026-07-29T11:15:00",
    estimatedFixTime: "Completed",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&auto=format&fit=crop&q=80",
    repairImages: { before: [], after: [] },
    rating: 5,
    timeline: [
      { status: "Reported", time: "Jul 28 04:00 PM", note: "Complaint logged" },
      { status: "AI Triage", time: "Jul 28 04:01 PM", note: "AI priority assigned: Low" },
      { status: "Assigned", time: "Jul 29 09:00 AM", note: "Assigned to Vikram Singh" },
      { status: "In Progress", time: "Jul 29 10:00 AM", note: "Replaced handles and lock pin" },
      { status: "Resolved", time: "Jul 29 11:15 AM", note: "Student verified and rated 5 stars" }
    ]
  },
  {
    id: "CFX-1054",
    ticketNo: "CFX-1054",
    title: "Wi-Fi Router Power Adapter Burnt",
    category: "Networking",
    location: "Student Activity Center, Gaming Lounge",
    description: "Wi-Fi router on North wall sparked and powered off. Smells like burnt plastic.",
    priority: "High",
    status: "Pending Assignment",
    aiSeverityScore: 82,
    aiReasoning: "Electrical spark hazard detected + local network outage.",
    studentName: "Kavya Nair",
    studentId: "STU-2024-155",
    assignedTechnician: null,
    assignedTechnicianId: null,
    techId: null,
    createdAt: "2026-07-30T12:10:00",
    updatedAt: "2026-07-30T12:10:00",
    estimatedFixTime: "30 mins",
    image: null,
    repairImages: { before: [], after: [] },
    timeline: [
      { status: "Reported", time: "12:10 PM", note: "Complaint logged by Kavya Nair" },
      { status: "AI Triage", time: "12:11 PM", note: "AI classified priority as High (Score: 82)" }
    ]
  }
];

export const TECHNICIANS = [
  { id: "TECH-101", name: "Rajesh Kumar", specialization: "Plumbing & Hydraulics", activeJobs: 2, completedToday: 4, status: "On-Site", phone: "+91 98765-43210", rating: 4.9, avatarColor: "#2563eb" },
  { id: "TECH-102", name: "Amitabh Das", specialization: "Electrical & AV", activeJobs: 1, completedToday: 3, status: "Available", phone: "+91 98765-43211", rating: 4.8, avatarColor: "#d97706" },
  { id: "TECH-103", name: "Sanjay Verma", specialization: "HVAC & Cooling", activeJobs: 2, completedToday: 1, status: "On-Site", phone: "+91 98765-43212", rating: 4.7, avatarColor: "#0284c7" },
  { id: "TECH-104", name: "Vikram Singh", specialization: "Carpentry & Locks", activeJobs: 0, completedToday: 5, status: "Available", phone: "+91 98765-43213", rating: 4.95, avatarColor: "#059669" },
  { id: "TECH-105", name: "Deepak Mehta", specialization: "IT & Connectivity", activeJobs: 1, completedToday: 2, status: "Available", phone: "+91 98765-43214", rating: 4.85, avatarColor: "#4f46e5" }
];

export const LOCATIONS = [
  "Hostel Block A",
  "Hostel Block B",
  "Hostel Block C",
  "Science Building",
  "Engineering Complex",
  "Central Library",
  "Student Activity Center",
  "Main Auditorium",
  "Sports Complex",
  "Campus Cafeteria"
];

export const CATEGORIES = [
  { id: "Plumbing", label: "Plumbing", icon: "Droplets", color: "blue" },
  { id: "Electrical", label: "Electrical / AV", icon: "Zap", color: "amber" },
  { id: "HVAC", label: "HVAC / Cooling", icon: "Wind", color: "sky" },
  { id: "Furniture", label: "Furniture / Woodwork", icon: "Armchair", color: "emerald" },
  { id: "Networking", label: "Wi-Fi & IT", icon: "Wifi", color: "indigo" },
  { id: "General", label: "General Maintenance", icon: "Wrench", color: "slate" }
];

export const DEMO_USERS = {
  student: {
    name: "Aarav Sharma",
    role: "Student",
    id: "STU-2024-041",
    email: "aarav.sharma@campus.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  admin: {
    name: "Dr. Sarah Jenkins",
    role: "Campus Admin",
    id: "ADM-901",
    email: "s.jenkins@campus.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  tech: {
    name: "Rajesh Kumar",
    role: "Senior Technician",
    id: "TECH-101",
    email: "rajesh.tech@campus.edu",
    avatar: "/assets/tech_portrait.jpg"
  }
};
