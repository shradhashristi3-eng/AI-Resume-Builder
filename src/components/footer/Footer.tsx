import React from 'react';
import { Sparkles, Heart, Github, Twitter, Linkedin, Shield, Zap, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                ResumeAI <span className="text-cyan-400">PRO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The next-generation AI-powered resume builder helping software engineers, product managers, and executives land top interviews with ATS-optimized resumes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate?.('builder')} className="hover:text-cyan-400 transition-colors">AI Resume Builder</button></li>
              <li><button onClick={() => onNavigate?.('landing')} className="hover:text-cyan-400 transition-colors">ATS Resume Checker</button></li>
              <li><button onClick={() => onNavigate?.('cover-letter')} className="hover:text-cyan-400 transition-colors">Cover Letter Generator</button></li>
              <li><button onClick={() => onNavigate?.('landing')} className="hover:text-cyan-400 transition-colors">Resume Templates</button></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-400" /> One-Click AI Summary</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% ATS Compatibility</li>
              <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-violet-400" /> PDF & DOCX Export</li>
              <li>LinkedIn / GitHub Import</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Account & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate?.('dashboard')} className="hover:text-cyan-400 transition-colors">User Dashboard</button></li>
              <li><button onClick={() => onNavigate?.('admin')} className="hover:text-cyan-400 transition-colors">Admin Dashboard</button></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ & Guide</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeAI Pro Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
