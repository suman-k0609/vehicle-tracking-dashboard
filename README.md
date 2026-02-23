🚖 Live Vehicle Tracking Dashboard
A real-time vehicle tracking dashboard built using React + Leaflet as part of my Software UI Intern case study for MoveInSync.
This project simulates enterprise cab tracking with geofence monitoring, live alerts, route visualization, and an interactive command-center UI to demonstrate modern frontend engineering and real-time dashboard design skills.
📌 Project Overview
This application provides a live command center view to monitor multiple vehicles in real time.
It visualizes:
Live vehicle movement
Office geofence entry detection
Real-time alerts
Trip route tracking
Interactive filtering & vehicle monitoring
The dashboard is designed similar to real-world corporate transport tracking systems used by operations teams.
🎯 Objective
To design and implement a real-time vehicle tracking UI that allows operations teams to:
Track multiple vehicles on a live map
Monitor geofence entry events
View trip status and alerts
Filter vehicles by activity/status
Interact with vehicles and routes
✨ Key Features
🔄 Smooth live vehicle movement simulation
📍 Office geofence visualization
🔔 Real-time alerts (Entered Office & Speeding)
🛣 Route tracking with path history
🎯 Filter vehicles:
All vehicles
Moving vehicles
Inside Office
Alert vehicles
📊 Click vehicle to view details panel
💬 Toast notification when vehicle enters office
🌐 Connection status simulation
📱 Fully responsive design
🎨 Clean command-center UI layout
📱 Responsive Design
Fully responsive across all devices:
Desktop
Sidebar + Map + Details panel
Command center layout
Tablet
Flexible layout adjustment
Mobile
Horizontal alerts bar
Full-width map view
Optimized touch UI
Ensures smooth tracking experience on all screen sizes.
🛠 Tech Stack
React.js
Leaflet.js (Map & geofence rendering)
JavaScript (ES6)
CSS
Vite
Vercel (Deployment)
🧠 Architecture & Concepts Used
UI & Component Architecture
Functional components with React Hooks
Modular component-based design
Separation of UI and logic
Reusable components
State Management
useState for UI state
Real-time vehicle state updates
Filter-based rendering
Real-Time Simulation
Live vehicle movement using setInterval
Dynamic marker updates
Real-time alert generation
Map & Geofence
Leaflet map integration
Office geofence circle
Marker movement with route polyline
Popup with vehicle details
Performance & UX
Smooth marker movement
Controlled re-renders
Clean UI layout
Responsive design
🚀 Run Project Locally
Bash

npm install
npm run dev
Open browser:
http://localhost:5173�
🌍 Live Demo
🔗 Deployed Project:
https://vehicle-tracking-dashboard.vercel.app/�
📹 Demo Video Walkthrough
🎥 Project Demo Video:
https://drive.google.com/file/d/1b8C14krfUWfHZ8OCWHsHZBVTvDrchFu-/view�
🧪 How to Use
Open dashboard
Watch vehicles move in real time
Use filter dropdown:
All → shows all vehicles
Moving → only moving vehicles
Inside Office → vehicles inside geofence
Alert → speeding vehicles
Click any vehicle to view details
Click alert to focus vehicle on map
🔮 Future Improvements
Real-time backend integration (WebSocket)
Database for trip history
Authentication system
Dark mode UI
Historical trip playback
Advanced analytics dashboard
Multiple office geofences
Driver & employee pickup tracking
👩‍💻 Developed By
Suman Kumari
B.Tech Computer Science Engineering
Software UI Intern Candidate