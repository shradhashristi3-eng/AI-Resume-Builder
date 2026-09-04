import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { aiImproveBullet } from '../../utils/aiEngine';
import { Briefcase, Plus, Trash2, Wand2 } from 'lucide-react';

export const SectionExperience: React.FC = () => {
  const { activeResume, updateResumeData } = useResume();
  const { experiences } = activeResume;

  const handleAddExperience = () => {
    updateResumeData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: 'exp-' + Date.now(),
          company: 'New Company',
          position: 'Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2023-01',
          endDate: 'Present',
          current: true,
          bullets: ['Spearheaded application development with React and TypeScript, boosting performance by 30%.']
        }
      ]
    }));
  };

  const handleUpdateExp = (id: string, field: string, value: any) => {
    updateResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleRemoveExp = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const handleUpdateBullet = (expId: string, index: number, value: string) => {
    updateResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          const newBullets = [...e.bullets];
          newBullets[index] = value;
          return { ...e, bullets: newBullets };
        }
        return e;
      })
    }));
  };

  const handleAddBullet = (expId: string) => {
    updateResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          return { ...e, bullets: [...e.bullets, ''] };
        }
        return e;
      })
    }));
  };

  const handleRemoveBullet = (expId: string, index: number) => {
    updateResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          return { ...e, bullets: e.bullets.filter((_, i) => i !== index) };
        }
        return e;
      })
    }));
  };

  const handleAIImproveBullet = async (expId: string, index: number, currentText: string, position: string) => {
    const improved = await aiImproveBullet(currentText, position);
    handleUpdateBullet(expId, index, improved);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-500" /> Work Experience
        </h3>
        <Button variant="outline" size="sm" onClick={handleAddExperience} icon={<Plus className="w-3.5 h-3.5" />}>
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Experience #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveExp(exp.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Position / Job Title</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleUpdateExp(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleUpdateExp(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="e.g. 2022-01"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">End Date</label>
                <input
                  type="text"
                  disabled={exp.current}
                  value={exp.current ? 'Present' : exp.endDate}
                  onChange={(e) => handleUpdateExp(exp.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:opacity-50"
                  placeholder="e.g. 2024-03"
                />
              </div>
            </div>

            {/* Current job checkbox */}
            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => handleUpdateExp(exp.id, 'current', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`current-${exp.id}`} className="text-slate-700 dark:text-slate-300 font-medium">
                I currently work here
              </label>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 pt-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs">
                Key Accomplishments & Bullet Points
              </label>
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                    placeholder="Describe your achievement using strong metrics..."
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAIImproveBullet(exp.id, bIdx, bullet, exp.position)}
                    title="Improve this bullet with AI action verbs"
                    className="text-xs text-indigo-600 dark:text-cyan-400 p-1.5"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                  </Button>
                  <button
                    onClick={() => handleRemoveBullet(exp.id, bIdx)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddBullet(exp.id)}
                icon={<Plus className="w-3.5 h-3.5" />}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1"
              >
                Add Bullet Point
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
