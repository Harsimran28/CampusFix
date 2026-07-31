# CampusFix AI - Smart Campus Maintenance MVP

CampusFix AI is a clean, modern, and minimal hackathon MVP for smart campus maintenance reporting and issue triage. It allows students to report campus issues with real-time AI severity predictions, enables administrators to triage and dispatch technicians, and provides technicians with a streamlined field work order queue.

---

## 🛠️ Technology Stack & Design System

- **Core**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Soft Shadows & Smooth Animations
- **Icons**: Lucide React
- **Design System**: Blue & White color palette (`#2563EB`, `#EFF6FF`, `#1E3A8A`, `#0F172A`), rounded cards (`rounded-2xl`), minimal and clean typography.
- **State Management**: Lightweight React Context with live mock data & real-time keyword AI severity analysis.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
campusfix-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Header with logo, role switcher & notification alerts
│   │   ├── Sidebar.jsx          # Simple collapsible navigation sidebar
│   │   ├── StatCard.jsx         # KPI summary metric card
│   │   ├── ComplaintCard.jsx    # Ticket detail card
│   │   ├── StatusBadge.jsx      # Status pill indicator (Pending, Assigned, In Progress, Resolved)
│   │   ├── PriorityBadge.jsx    # Priority pill indicator (Urgent, High, Medium, Low)
│   │   ├── AssignModal.jsx      # Admin technician dispatch dialog
│   │   └── Timeline.jsx         # 5-stage progress timeline stepper
│   ├── context/
│   │   └── AppContext.jsx       # Global state for roles, complaints, and AI simulation engine
│   ├── data/
│   │   └── mockData.js          # Pre-populated complaints, locations, and technicians
│   ├── pages/
│   │   ├── LandingPage.jsx      # Page 1: Public overview & role demo launcher
│   │   ├── LoginPage.jsx        # Page 2: Role selection login cards & 1-click login
│   │   ├── StudentDashboard.jsx # Page 3: Student tickets overview & filter tabs
│   │   ├── RaiseComplaint.jsx   # Page 4: AI-assisted filing with live severity prediction
│   │   ├── ComplaintTrack.jsx   # Page 5: Ticket detail, live stepper, rating prompt
│   │   ├── AdminDashboard.jsx   # Page 6: Admin triage matrix & technician workload board
│   │   └── TechDashboard.jsx    # Page 7: Technician work order queue & status updater
│   ├── App.jsx                  # Main app container & routing wrapper
│   ├── index.css                # Tailwind directives & soft animation classes
│   └── main.jsx                 # React entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 📱 Page Summary

1. **Landing Page**: Public hero section, 4-step "How It Works", live metrics, quick role launcher.
2. **Login**: 3 role selector cards (Student, Admin, Technician) with pre-filled credentials.
3. **Student Dashboard**: Reported tickets overview, filter tabs (All, Active, Resolved), "+ Raise Complaint" CTA.
4. **Raise Complaint**: AI smart triage form (auto-predicts urgency score based on issue description + photo preview).
5. **Complaint Tracking**: 5-step interactive progress timeline, technician profile card, and star rating prompt.
6. **Admin Dashboard**: Triage matrix, urgent issue alerts, filterable ticket table, technician dispatch modal.
7. **Technician Dashboard**: Assigned work order queue, status progression ("Start Repairs", "Complete Job"), resolution proof dialog.
