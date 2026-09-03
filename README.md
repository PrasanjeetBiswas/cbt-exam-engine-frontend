# 🎓 CBT Exam Engine (Frontend)

A fully responsive, frontend-only Computer-Based Test (CBT) platform built using **React**, **Vite**, and **Tailwind CSS**. This project simulates a real-time exam environment (specifically designed around the NTA UGC NET pattern) offering a seamless experience for students to practice mock tests, track their time, and analyze their performance.

## ✨ Key Features

- **Real-time Exam Engine:** Live countdown timer with auto-submit functionality.
- **Interactive Question Palette:** Navigate easily between questions. Color-coded status for *Answered*, *Not Answered*, and *Marked for Review*.
- **Instant Result & Review:** Automatically calculates scores (correct, incorrect, skipped) and provides a detailed question-by-question review with explanations.
- **User Dashboard & Analytics:** Tracks past performance, total tests taken, and visualizes progress over time using charts (Recharts) via `localStorage`.
- **Sorting & Filtering:** Browse tests by category, subject, and difficulty level.
- **Fully Responsive:** Optimized for all devices, maintaining a clean UI even on small 300px mobile screens.
- **No Backend Required:** All user progress and test histories are managed locally within the browser.

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Charts:** Recharts
- **Storage:** Browser `localStorage`

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/PrasanjeetBiswas/cbt-exam-engine-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cbt-exam-engine-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`
