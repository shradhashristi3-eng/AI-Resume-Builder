import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const SectionEducation: React.FC = () => {
  const { activeResume, updateResumeData } = useResume();
  const { education } = activeResume;

  const handleAddEducation = () => {
    updateResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: 'edu-' + Date.now(),
          institution: 'University Name',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'City, State',
          startDate: '2019-08',
          endDate: '2023-05',
          current: false,
          gpa: '3.8 / 4.0'
        }
      ]
    }));
  };

  const handleUpdateEdu = (id: string, field: string, value: any) => {
    updateResumeData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleRemoveEdu = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-500" /> Education
        </h3>
        <Button variant="outline" size="sm" onClick={handleAddEducation} icon={<Plus className="w-3.5 h-3.5" />}>
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                Education #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveEdu(edu.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Institution / School</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="e.g. Bachelor of Science"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Field of Study / Major</label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleUpdateEdu(edu.id, 'fieldOfStudy', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="3.8 / 4.0"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleUpdateEdu(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleUpdateEdu(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
