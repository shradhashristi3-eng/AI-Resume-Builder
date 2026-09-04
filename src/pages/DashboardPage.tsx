import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { LinkedInImportModal } from '../components/import/LinkedInImportModal';
import { GitHubImportModal } from '../components/import/GitHubImportModal';
import { TemplateId } from '../types';
import { 
  FileText, 
  Plus, 
  Sparkles, 
  Download, 
  Copy, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Linkedin, 
  Github, 
  History, 
  User as UserIcon, 
  Crown,
  CheckCircle2
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { resumes, activeResume, setActiveResumeId, createNewResume, duplicateResume, deleteResume, versionHistory, restoreVersionSnapshot } = useResume();
  const { user } = useAuth();
  
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');

  const handleCreateResume = () => {
    createNewResume('New Software Engineer Resume', selectedTemplate);
    onNavigate('builder');
  };

  const handleEditResume = (id: string) => {
    setActiveResumeId(id);
    onNavigate('builder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 text-white border border-indigo-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-cyan-300 text-xs font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>{user?.plan.toUpperCase()} Member Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.displayName || 'Alex'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage your resumes, check ATS compatibility scores, and import your latest achievements in one central hub.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Button
            variant="accent"
            onClick={() => handleCreateResume()}
            icon={<Plus className="w-4 h-4" />}
            className="shadow-lg shadow-cyan-500/20"
          >
            Create New Resume
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowLinkedInModal(true)}
            icon={<Linkedin className="w-4 h-4 text-blue-400" />}
            className="border-slate-700 text-white hover:bg-slate-800"
          >
            Import LinkedIn
          </Button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Columns: Resumes Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> My Saved Resumes ({resumes.length})
            </h2>
            <Button variant="ghost" size="sm" onClick={() => handleCreateResume()} icon={<Plus className="w-4 h-4" />}>
              New Resume
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resumes.map(r => (
              <div
                key={r.id}
                className={`p-5 rounded-2xl border transition-all glass-card space-y-4 flex flex-col justify-between ${
                  r.id === activeResume.id
                    ? 'border-indigo-500/80 ring-2 ring-indigo-500/20 shadow-lg'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                      {r.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      r.atsScore >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {r.atsScore} ATS
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Role: <span className="font-semibold text-slate-700 dark:text-slate-300">{r.targetRole}</span>
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Template: {r.templateId.toUpperCase()}</span>
                    <span>•</span>
                    <span>Updated {new Date(r.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditResume(r.id)}
                    icon={<Edit3 className="w-3.5 h-3.5" />}
                  >
                    Edit Resume
                  </Button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateResume(r.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Duplicate Resume"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {resumes.length > 1 && (
                      <button
                        onClick={() => deleteResume(r.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Imports, Profile & Snapshots */}
        <div className="space-y-6">
          
          {/* Quick Imports Widget */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> One-Click Imports
            </h3>
            <p className="text-xs text-slate-500">
              Instantly sync work experience and open source projects into your resume.
            </p>
            <div className="space-y-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLinkedInModal(true)}
                icon={<Linkedin className="w-4 h-4 text-blue-500" />}
                className="w-full justify-start text-xs font-semibold"
              >
                Import LinkedIn Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGitHubModal(true)}
                icon={<Github className="w-4 h-4 text-slate-800 dark:text-white" />}
                className="w-full justify-start text-xs font-semibold"
              >
                Import GitHub Projects
              </Button>
            </div>
          </div>

          {/* User Profile & Subscription Status */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.displayName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{user?.displayName}</h4>
                <p className="text-slate-500 text-[11px]">{user?.email}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Current Plan:</span>
                <span className="text-indigo-600 dark:text-cyan-400 uppercase font-bold">{user?.plan}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">AI Credits Remaining:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{user?.aiCredits} Credits</span>
              </div>
            </div>
          </div>

          {/* Version Snapshots History */}
          {versionHistory.length > 0 && (
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" /> Version Snapshot History
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {versionHistory.map(v => (
                  <div key={v.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                    <div>
                      <span className="font-semibold block">{v.label}</span>
                      <span className="text-[10px] text-slate-400">{v.timestamp}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => restoreVersionSnapshot(v.id)}>
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Import Modals */}
      <LinkedInImportModal isOpen={showLinkedInModal} onClose={() => setShowLinkedInModal(false)} />
      <GitHubImportModal isOpen={showGitHubModal} onClose={() => setShowGitHubModal(false)} />
    </div>
  );
};
