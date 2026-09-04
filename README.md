# 🚀 ResumeAI Pro — AI-Powered Resume Builder & ATS Optimizer

ResumeAI Pro is a modern, feature-rich SaaS platform designed to help software engineers, product managers, and executives generate, optimize, and export ATS-compliant resumes with cutting-edge AI.

---

## ✨ Features Overview

- **🤖 AI Power Suite**:
  - One-Click Professional Summary Generator
  - AI Bullet Point Enhancer & Action Verb Rewriter
  - Real-Time ATS Compatibility Score Gauge (0–100)
  - Job Description Matching & Keyword Gap Analysis
  - **ResuAI Assistant**: Floating AI Chat Advisor for step-by-step career guidance

- **📄 5 Production Resume Templates**:
  - **Modern**: 2-Column layout with bold typography & accent header.
  - **Minimal**: High-whitespace, ultra-clean aesthetic.
  - **Professional**: Corporate header banner & structured underlines.
  - **Executive**: Designed for VP & leadership positions.
  - **Fresher**: Highlights education, skills, and academic projects upfront.

- **🎨 Deep Personalization**:
  - Live Zoom Controls (50% to 130%).
  - Dynamic Color Theme Palettes (Indigo, Purple, Cyan, Emerald, Amber, Crimson, Slate).
  - Font Family Switcher (*Inter, Outfit, Playfair Display, Roboto*).
  - Section Drag-and-Drop Reordering & Visibility Toggles.

- **📥 One-Click Imports**:
  - LinkedIn Profile URL / PDF data extraction.
  - GitHub Username & Top Starred Repository import.

- **📄 Multi-Format Exports**:
  - Pixel-perfect A4 PDF Export (`jsPDF` + `html2canvas`).
  - Editable Microsoft Word DOCX Export (`docx`).
  - Browser Print Optimization.

- **✉️ Cover Letter Generator**:
  - Generates tailored cover letters matching target job descriptions.

- **📊 Admin Control Panel**:
  - User accounts management, subscription status controls, and MRR revenue charts.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism, Dark/Light Mode
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend / Database**: Firebase Authentication & Firestore (with automatic Demo Mode fallback)
- **Document Exporting**: jsPDF, html2canvas, docx

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd "AI Resume Builder"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

---

## 🔐 Environment Setup (Optional)

Create a `.env` file in the root directory (this file is ignored by git):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

*Note: If no `.env` file is present, the app automatically falls back to Demo Mode with sample resumes and AI capabilities.*

---

## 📜 License

Distributed under the MIT License.
