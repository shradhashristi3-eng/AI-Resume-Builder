import React from 'react';
import { ResumeData } from '../../../types';

export const ProfessionalTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personal, experiences, education, skills, projects, certifications, colorTheme } = resume;

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1050px] p-8 sm:p-10 shadow-lg text-sm">
      {/* Corporate Solid Accent Banner */}
      <div 
        className="w-full text-white p-6 rounded-lg mb-6 shadow-sm"
        style={{ backgroundColor: colorTheme }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">
          {personal.fullName || 'Your Name'}
        </h1>
        <p className="text-base font-medium opacity-90 mb-3">
          {personal.jobTitle || 'Senior Software Engineer'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-85 pt-2 border-t border-white/20">
          {personal.email && <span>Email: {personal.email}</span>}
          {personal.phone && <span>Phone: {personal.phone}</span>}
          {personal.location && <span>Location: {personal.location}</span>}
          {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-200 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-200 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{exp.position}</span>
                  <span className="text-xs text-slate-500 font-semibold">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-slate-700 mb-1">{exp.company} | {exp.location}</div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-200 pb-1 mb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-slate-800">
            {skills.map(s => (
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorTheme }} />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-200 pb-1 mb-2">
            Education & Academic Credentials
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                  <p className="text-slate-600">{edu.institution}</p>
                </div>
                <span className="text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
