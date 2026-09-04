import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useResume } from '../../context/ResumeContext';
import { Github, Sparkles } from 'lucide-react';

interface GitHubImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubImportModal: React.FC<GitHubImportModalProps> = ({ isOpen, onClose }) => {
  const { updateResumeData } = useResume();
  const [username, setUsername] = useState('alexvance-dev');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    await new Promise((res) => setTimeout(res, 1000));

    updateResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        github: `github.com/${username}`
      },
      projects: [
        ...prev.projects,
        {
          id: 'proj-gh-' + Date.now(),
          title: `${username}/cloud-dashboard`,
          description: 'Open-source distributed metrics monitoring dashboard built with React, WebSockets, and Docker.',
          link: `https://github.com/${username}/cloud-dashboard`,
          github: `github.com/${username}/cloud-dashboard`,
          techStack: ['TypeScript', 'React', 'Go', 'Docker'],
          bullets: ['Featured in GitHub Trending with 1.2k+ stars and 150+ forks.']
        }
      ]
    }));

    setImporting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="GitHub Profile & Repositories Import" maxWidth="md">
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
          <Github className="w-6 h-6 text-slate-900 dark:text-white shrink-0" />
          <p>
            Enter your GitHub username to auto-import top starred repositories, tech stack tags, and open-source projects!
          </p>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">GitHub Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-slate-500"
            placeholder="e.g. alexvance-dev"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleImport}
          loading={importing}
          icon={<Sparkles className="w-4 h-4 text-cyan-300" />}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        >
          {importing ? 'Fetching Repositories...' : 'Import Top GitHub Projects'}
        </Button>
      </div>
    </Modal>
  );
};
