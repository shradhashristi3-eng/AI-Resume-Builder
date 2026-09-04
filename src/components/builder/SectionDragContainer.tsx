import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { SectionType } from '../../types';
import { GripVertical, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

export const SectionDragContainer: React.FC = () => {
  const { activeResume, reorderSections, updateResumeData } = useResume();
  const { sectionOrder, enabledSections } = activeResume;

  const sectionTitles: Record<SectionType, string> = {
    personal: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills & Tech',
    projects: 'Projects',
    certifications: 'Certifications',
    languages: 'Languages',
    achievements: 'Achievements'
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    reorderSections(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    reorderSections(newOrder);
  };

  const toggleSection = (sec: SectionType) => {
    updateResumeData(prev => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [sec]: !prev.enabledSections[sec]
      }
    }));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-2">
        Reorder or hide resume layout sections below:
      </p>

      <div className="space-y-2">
        {sectionOrder.map((sec, idx) => {
          const isEnabled = enabledSections[sec] !== false;
          return (
            <div
              key={sec}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                isEnabled
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {sectionTitles[sec] || sec}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                  title="Move section up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === sectionOrder.length - 1}
                  className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                  title="Move section down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSection(sec)}
                  className="p-1 text-slate-400 hover:text-indigo-600 ml-1"
                  title={isEnabled ? 'Hide section' : 'Show section'}
                >
                  {isEnabled ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
