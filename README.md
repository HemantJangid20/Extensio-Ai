# 🚀 Extensio.ai — No-Code Extension Factory

**Project 3 — Text-to-Extension Developer Platform**  
Company: Zaalima Development Pvt. Ltd.

---

# 🧠 Overview

Extensio.ai is an AI-powered platform that allows users to create Chrome Extensions using natural language prompts.

Users can type:

"Create a Chrome extension that blocks images."

The system generates:

- manifest.json
- content.js
- popup.html
- popup.js

Future versions will support:

- Auto ZIP generation
- Extension publishing
- Project version control

---

# 📦 Week 1 Implementation

This version includes:

✅ Prompt Engineering System  
✅ OpenAI Integration  
✅ JSON Output Validation  
✅ Extension File Structure Generator  
✅ API Endpoint for Code Generation  

---

# 🧱 Tech Stack

## Backend

- Node.js
- Express.js
- OpenAI API
- AJV JSON Validator

## Frontend

- React (Vite)
- Axios

---

# 🗂️ Project Structure
Extensio-AI/
│
├── backend/
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── utils/
│ ├── config/
│ ├── app.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── package.json
│
└── README.md


---

# ⚙️ Installation

## Backend Setup

```bash
cd backend
npm install
node server.js

http://localhost:5000

cd frontend
npm install
npm run dev

http://localhost:5173

🧪 API Endpoint
Generate Extension
POST /api/generate

Body:

{
  "prompt": "Create extension that blocks images"
}
🎯 Week 1 Goals Completed
LLM Prompt Engineering
Structured JSON Output
JSON Validation
API Routing
React Prompt UI
🚀 Upcoming Features

Week 2:

JSON → Files
Files → ZIP
Download System

Week 3:

Dashboard
Version Control

Week 4:

Deployment
Security Hardening
👨‍💻 Author

Hemant Jangid
Software Developer
Extensio.ai Team