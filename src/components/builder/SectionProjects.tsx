import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

export const SectionProjects: React.FC = () => {
  const { activeResume, updateResumeData } = useResume();
  const { projects } = activeResume;

  const handleAddProject = () => {
    updateResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: 'proj-' + Date.now(),
          title: 'New AI Project',
          description: 'High performance web platform with cloud backend.',
          link: 'https://github.com/user/project',
          github: 'github.com/user/project',
          techStack: ['React', 'TypeScript', 'Tailwind'],
          bullets: ['Built real-time web application processing 50k requests/min.']
        }
      ]
    }));
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    updateResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleRemoveProject = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-indigo-500" /> Projects & Open Source
        </h3>
        <Button variant="outline" size="sm" onClick={handleAddProject} icon={<Plus className="w-3.5 h-3.5" />}>
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                Project #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveProject(proj.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Project URL / GitHub</label>
                <input
                  type="text"
                  value={proj.link}
                  onChange={(e) => handleUpdateProject(proj.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Description</label>
              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
