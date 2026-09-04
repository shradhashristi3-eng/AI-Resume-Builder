import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { BuilderPage } from './pages/BuilderPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { AdminPage } from './pages/AdminPage';
import { AIChatAssistant } from './components/ai/AIChatAssistant';
import { Bot } from 'lucide-react';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'builder':
        return <BuilderPage onNavigate={setCurrentPage} />;
      case 'cover-letter':
        return <CoverLetterPage />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div>
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onToggleAIChat={() => setAiChatOpen(!aiChatOpen)}
        />
        <main className="w-full">
          {renderPage()}
        </main>
      </div>

      {/* Floating AI Chat Trigger Button */}
      {!aiChatOpen && (
        <button
          onClick={() => setAiChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group glow-border"
          title="Open ResuAI Assistant"
        >
          <Bot className="w-6 h-6 text-cyan-300 animate-bounce" />
          <span className="text-xs font-bold hidden sm:inline-block">Ask ResuAI</span>
        </button>
      )}

      {/* Floating AI Chat Window */}
      <AIChatAssistant isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <AppContent />
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
