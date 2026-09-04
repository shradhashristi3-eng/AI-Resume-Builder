import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useResume } from '../../context/ResumeContext';
import { aiGenerateSummary } from '../../utils/aiEngine';
import { Sparkles, Wand2, Check, RefreshCw } from 'lucide-react';

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({ isOpen, onClose }) => {
  const { activeResume, updatePersonalInfo } = useResume();
  const [jobTitle, setJobTitle] = useState(activeResume.personal.jobTitle || 'Full Stack Software Engineer');
  const [yearsExp, setYearsExp] = useState('5+');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const skillsList = activeResume.skills.map(s => s.name);
      const summary = await aiGenerateSummary(jobTitle, yearsExp, skillsList);
      setGeneratedSummary(summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedSummary) {
      updatePersonalInfo('summary', generatedSummary);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Summary Generator" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <p className="text-slate-600 dark:text-slate-400">
          Specify your targeted role and experience level. ResuAI will generate a high-impact, recruiter-optimized summary tailored for your background.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Years of Experience</label>
            <select
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="Fresher / Entry Level">Fresher / Student</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5+">5+ Years (Senior)</option>
              <option value="10+">10+ Years (Executive)</option>
            </select>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleGenerate}
          loading={loading}
          icon={<Wand2 className="w-4 h-4" />}
          className="w-full mt-2"
        >
          {generatedSummary ? 'Regenerate Summary' : 'Generate Summary with AI'}
        </Button>

        {generatedSummary && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> AI Generated Result
              </span>
              <button
                onClick={handleGenerate}
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-cyan-400 p-1"
                title="Try another variation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed italic">
              "{generatedSummary}"
            </p>
            <Button
              variant="accent"
              size="sm"
              onClick={handleApply}
              icon={<Check className="w-4 h-4" />}
              className="w-full"
            >
              Apply Summary to Resume
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
