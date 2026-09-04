import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useResume } from '../../context/ResumeContext';
import { analyzeATS } from '../../utils/aiEngine';
import { Target, CheckCircle, AlertTriangle, Plus, Sparkles } from 'lucide-react';

interface JobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobMatcherModal: React.FC<JobMatcherModalProps> = ({ isOpen, onClose }) => {
  const { activeResume, updateResumeData } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const atsResult = analyzeATS(activeResume, jobDescription);

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      setAnalyzed(true);
    }
  };

  const handleAddSkill = (skillName: string) => {
    updateResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: 'sk-' + Date.now(),
          name: skillName,
          category: 'Technical',
          level: 4
        }
      ]
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Job Description & Keyword Matcher" maxWidth="xl">
      <div className="space-y-4 text-xs">
        <p className="text-slate-600 dark:text-slate-400">
          Paste the target Job Description (JD) below to compare your resume against recruiter requirements and identify missing keywords instantly.
        </p>

        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job posting text here (e.g., We are seeking a Senior Full Stack Engineer proficient in React, TypeScript, Node.js, and AWS microservices...)"
          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-indigo-500"
        />

        <Button
          variant="primary"
          onClick={handleAnalyze}
          disabled={!jobDescription.trim()}
          icon={<Target className="w-4 h-4" />}
          className="w-full"
        >
          Analyze Job Compatibility
        </Button>

        {analyzed && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Match Score */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-500 font-semibold block">Job Match Compatibility Score</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-cyan-400">{atsResult.score}% Match</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Keywords Matched</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {atsResult.matchedKeywords.length} / {atsResult.matchedKeywords.length + atsResult.missingKeywords.length}
                </span>
              </div>
            </div>

            {/* Missing Skills Grid */}
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Recommended Keywords to Add
              </h4>
              <div className="flex flex-wrap gap-2">
                {atsResult.missingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => handleAddSkill(kw)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1 hover:scale-105 transition-transform"
                    title="Click to auto-add to skills section"
                  >
                    <span>+ Add "{kw}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matched Keywords Grid */}
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Successfully Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {atsResult.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
