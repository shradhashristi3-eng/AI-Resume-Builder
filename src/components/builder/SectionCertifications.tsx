import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { Award, Plus, Trash2, Globe2 } from 'lucide-react';

export const SectionCertifications: React.FC = () => {
  const { activeResume, updateResumeData } = useResume();
  const { certifications, languages } = activeResume;

  const handleAddCert = () => {
    updateResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: 'cert-' + Date.now(),
          name: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2023-05'
        }
      ]
    }));
  };

  const handleRemoveCert = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const handleAddLang = () => {
    updateResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: 'lang-' + Date.now(),
          language: 'Spanish',
          proficiency: 'Intermediate'
        }
      ]
    }));
  };

  const handleRemoveLang = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-500" /> Certifications & Licenses
          </h3>
          <Button variant="outline" size="sm" onClick={handleAddCert} icon={<Plus className="w-3.5 h-3.5" />}>
            Add Certification
          </Button>
        </div>

        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{cert.name}</span>
                <p className="text-slate-500">{cert.issuer} • {cert.date}</p>
              </div>
              <button onClick={() => handleRemoveCert(cert.id)} className="text-slate-400 hover:text-rose-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-500" /> Languages
          </h3>
          <Button variant="outline" size="sm" onClick={handleAddLang} icon={<Plus className="w-3.5 h-3.5" />}>
            Add Language
          </Button>
        </div>

        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-slate-100">{lang.language}</span>
              <div className="flex items-center gap-3">
                <span className="text-indigo-600 dark:text-cyan-400 font-medium">{lang.proficiency}</span>
                <button onClick={() => handleRemoveLang(lang.id)} className="text-slate-400 hover:text-rose-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
