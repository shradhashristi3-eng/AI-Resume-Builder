import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { FresherTemplate } from './templates/FresherTemplate';

interface ResumePreviewProps {
  id?: string;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ id = 'resume-preview-document', className = '' }) => {
  const { activeResume, zoomLevel } = useResume();

  const renderTemplate = () => {
    switch (activeResume.templateId) {
      case 'minimal':
        return <MinimalTemplate resume={activeResume} />;
      case 'professional':
        return <ProfessionalTemplate resume={activeResume} />;
      case 'executive':
        return <ExecutiveTemplate resume={activeResume} />;
      case 'fresher':
        return <FresherTemplate resume={activeResume} />;
      case 'modern':
      default:
        return <ModernTemplate resume={activeResume} />;
    }
  };

  return (
    <div className={`flex justify-center items-start overflow-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 ${className}`}>
      <div 
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        className="transition-transform duration-200 ease-out"
      >
        <div 
          id={id}
          className="resume-paper w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm overflow-hidden select-text text-left"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
