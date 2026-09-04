import React from 'react';
import { ResumeData } from '../../../types';

export const ExecutiveTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personal, experiences, education, skills, achievements, colorTheme } = resume;

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1050px] p-10 shadow-lg text-sm border-t-8" style={{ borderColor: colorTheme }}>
      {/* Top Header */}
      <div className="flex justify-between items-end pb-6 border-b-2 border-slate-900 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            {personal.fullName || 'Executive Leader'}
          </h1>
          <p className="text-sm font-semibold tracking-wider uppercase mt-0.5" style={{ color: colorTheme }}>
            {personal.jobTitle || 'Chief Technology Officer / VP of Engineering'}
          </p>
        </div>
        <div className="text-right text-xs text-slate-600 space-y-0.5">
          <p>{personal.email}</p>
          <p>{personal.phone}</p>
          <p>{personal.location}</p>
          <p className="font-medium text-slate-800">{personal.linkedin}</p>
        </div>
      </div>

      {/* Executive Summary */}
      {personal.summary && (
        <section className="mb-6 bg-slate-50 p-4 rounded border-l-4" style={{ borderColor: colorTheme }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Executive Summary</h2>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">{personal.summary}</p>
        </section>
      )}

      {/* Leadership Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-4">
            Leadership & Career History
          </h2>
          <div className="space-y-5">
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                  <span className="text-xs font-semibold text-slate-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme }}>
                  {exp.company} | {exp.location}
                </div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Competencies & Board Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Strategic Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {skills.map(s => (
                <span key={s.id} className="bg-slate-900 text-white font-medium px-2.5 py-1 rounded text-xs">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Education & Credentials
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 text-xs">
                <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                <p className="text-slate-600">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
