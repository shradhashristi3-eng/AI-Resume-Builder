import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { Code, Plus, Trash2, Sparkles } from 'lucide-react';

export const SectionSkills: React.FC = () => {
  const { activeResume, updateResumeData } = useResume();
  const { skills } = activeResume;
  const [newSkillName, setNewSkillName] = useState('');

  const popularSuggestions = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 
    'GraphQL', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'CI/CD', 'Git'
  ];

  const handleAddSkill = (skillNameToAdd?: string) => {
    const name = skillNameToAdd || newSkillName;
    if (!name.trim()) return;

    updateResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: 'sk-' + Date.now() + Math.random(),
          name: name.trim(),
          category: 'Technical',
          level: 4
        }
      ]
    }));

    if (!skillNameToAdd) setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Code className="w-4 h-4 text-indigo-500" /> Skills & Technical Expertise
        </h3>
      </div>

      {/* Add new skill input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder="Add a skill (e.g. React.js, Kubernetes)..."
          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-indigo-500"
        />
        <Button variant="primary" size="sm" onClick={() => handleAddSkill()} icon={<Plus className="w-3.5 h-3.5" />}>
          Add Skill
        </Button>
      </div>

      {/* Popular suggestions */}
      <div>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Recommended High-Demand Skills
        </span>
        <div className="flex flex-wrap gap-1.5">
          {popularSuggestions.map((s, idx) => {
            const isAlreadyAdded = skills.some(sk => sk.name.toLowerCase() === s.toLowerCase());
            return (
              <button
                key={idx}
                disabled={isAlreadyAdded}
                onClick={() => handleAddSkill(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  isAlreadyAdded
                    ? 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400 cursor-default'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-cyan-400'
                }`}
              >
                + {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Skill Badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map(sk => (
          <div
            key={sk.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            <span>{sk.name}</span>
            <button
              onClick={() => handleRemoveSkill(sk.id)}
              className="text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
