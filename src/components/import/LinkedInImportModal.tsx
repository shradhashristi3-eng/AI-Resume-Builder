import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useResume } from '../../context/ResumeContext';
import { Linkedin, Sparkles, CheckCircle2 } from 'lucide-react';

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkedInImportModal: React.FC<LinkedInImportModalProps> = ({ isOpen, onClose }) => {
  const { updateResumeData } = useResume();
  const [profileUrl, setProfileUrl] = useState('https://linkedin.com/in/alexvance-dev');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    await new Promise((res) => setTimeout(res, 1200));

    updateResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        fullName: 'Alex Vance',
        jobTitle: 'Senior Full Stack Engineer',
        linkedin: profileUrl,
        summary: 'Accomplished Senior Full Stack Engineer imported from LinkedIn with 6+ years driving cloud architectures, React frontends, and high-volume REST APIs.',
      },
      skills: [
        ...prev.skills,
        { id: 'sk-li-1', name: 'Microservices', category: 'Technical', level: 5 },
        { id: 'sk-li-2', name: 'Cloud Architecture', category: 'Technical', level: 5 },
      ]
    }));

    setImporting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="LinkedIn Profile One-Click Import" maxWidth="md">
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
          <Linkedin className="w-6 h-6 text-blue-600 shrink-0" />
          <p>
            Paste your public LinkedIn profile URL or PDF export to automatically extract contact info, experience, and endorsements!
          </p>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
          <input
            type="text"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleImport}
          loading={importing}
          icon={<Sparkles className="w-4 h-4 text-cyan-300" />}
          className="w-full bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
        >
          {importing ? 'Extracting LinkedIn Profile Data...' : 'Import LinkedIn Profile Data'}
        </Button>
      </div>
    </Modal>
  );
};
