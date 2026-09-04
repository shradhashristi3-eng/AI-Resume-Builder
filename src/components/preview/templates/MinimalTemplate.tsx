import React from 'react';
import { ResumeData } from '../../../types';

export const MinimalTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personal, experiences, education, skills, projects, certifications, colorTheme } = resume;

  return (
    <div className="bg-white text-slate-800 w-full min-h-[1050px] p-10 shadow-lg text-sm tracking-normal">
      {/* Clean Centered Header */}
      <div className="text-center pb-6 border-b border-slate-200 mb-6">
        <h1 className="text-3xl font-light tracking-wide uppercase text-slate-900 mb-1" style={{ color: colorTheme }}>
          {personal.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3">
          {personal.jobTitle || 'Target Profession'}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <p className="text-xs text-slate-600 leading-relaxed italic text-center max-w-2xl mx-auto">
            "{personal.summary}"
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-1 border-b border-slate-100">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-slate-900">{exp.position}</span>
                  <span className="text-xs text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mb-1.5">{exp.company} {exp.location && `| ${exp.location}`}</div>
                <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                  {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 pb-1 border-b border-slate-100">
            Education
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="font-semibold text-slate-900 text-xs">{edu.degree} in {edu.fieldOfStudy}</div>
                <div className="text-xs text-slate-500">{edu.institution}</div>
                <div className="text-xs text-slate-400">{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 pb-1 border-b border-slate-100">
            Skills
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {skills.map(s => s.name).join('   •   ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 pb-1 border-b border-slate-100">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id}>
                <span className="font-semibold text-xs text-slate-900">{p.title}</span>
                <p className="text-xs text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
