import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Button } from '../components/ui/Button';
import { Sparkles, FileText, Download, Copy, Printer, Check } from 'lucide-react';

export const CoverLetterPage: React.FC = () => {
  const { activeResume, generateCoverLetter, coverLetters } = useResume();
  
  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer');
  const [companyName, setCompanyName] = useState('Acme SaaS Tech Inc.');
  const [jobDesc, setJobDesc] = useState('');
  const [activeLetterContent, setActiveLetterContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const letter = generateCoverLetter(jobTitle, companyName, jobDesc);
    setActiveLetterContent(letter.content);
  };

  const handleCopy = () => {
    if (activeLetterContent) {
      navigator.clipboard.writeText(activeLetterContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-xs font-bold text-violet-600 dark:text-violet-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Cover Letter AI Engine
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Cover Letter Generator
        </h1>
        <p className="text-xs text-slate-500">
          Generate tailored, high-converting cover letters matching your resume details to target job roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (5 Cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-500" /> Target Job Info
          </h3>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. Google / Stripe / OpenAI"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. Senior Full Stack Engineer"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Job Description (Optional)</label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500"
              placeholder="Paste job posting details here..."
            />
          </div>

          <Button
            variant="secondary"
            onClick={handleGenerate}
            icon={<Sparkles className="w-4 h-4 text-amber-300" />}
            className="w-full py-3 text-sm font-bold"
          >
            Generate Cover Letter
          </Button>

          {/* Generated History */}
          {coverLetters.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Recent Letters</span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {coverLetters.map(cl => (
                  <button
                    key={cl.id}
                    onClick={() => setActiveLetterContent(cl.content)}
                    className="w-full text-left p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium truncate block"
                  >
                    {cl.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output Paper Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 text-xs font-semibold">
            <span>Generated Cover Letter Preview</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy} icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}>
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer className="w-3.5 h-3.5" />}>
                Print Letter
              </Button>
            </div>
          </div>

          <div className="bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-2xl border border-slate-200 min-h-[600px] text-sm leading-relaxed font-sans whitespace-pre-line">
            {activeLetterContent || (
              <div className="text-center py-20 text-slate-400 space-y-3">
                <FileText className="w-12 h-12 mx-auto text-slate-300" />
                <p className="font-medium">Fill in the target job details on the left and click "Generate Cover Letter".</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
