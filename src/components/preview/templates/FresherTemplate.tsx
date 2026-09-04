import React from 'react';
import { ResumeData } from '../../../types';

export const FresherTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personal, education, skills, projects, experiences, certifications, colorTheme } = resume;

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1050px] p-8 sm:p-10 shadow-lg text-sm">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-slate-200 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1" style={{ color: colorTheme }}>
          {personal.fullName || 'Graduate / Entry Level Name'}
        </h1>
        <p className="text-sm font-semibold text-slate-600 mb-2">
          {personal.jobTitle || 'Associate Software Engineer / Computer Science Graduate'}
        </p>
        <p className="text-xs text-slate-500">
          {[personal.email, personal.phone, personal.location, personal.github, personal.linkedin].filter(Boolean).join(' | ')}
        </p>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1.5 px-3 rounded mb-2">
            Career Objective & Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Education First for Freshers */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1.5 px-3 rounded mb-3">
            Academic Background
          </h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-slate-600 font-medium">{edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                {edu.achievements && edu.achievements.length > 0 && (
                  <p className="text-slate-500 mt-0.5">Honors: {edu.achievements.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical & Core Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1.5 px-3 rounded mb-2">
            Technical & Soft Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => (
              <span key={s.id} className="border border-slate-300 text-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1.5 px-3 rounded mb-3">
            Academic & Independent Projects
          </h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title}</span>
                  {proj.link && <span className="text-slate-500 font-normal underline">{proj.link}</span>}
                </div>
                <p className="text-slate-600 my-0.5">{proj.description}</p>
                <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                  {proj.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience / Internships */}
      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1.5 px-3 rounded mb-3">
            Internships & Work Experience
          </h2>
          <div className="space-y-3">
            {experiences.map(exp => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.position} — {exp.company}</span>
                  <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-slate-700 space-y-0.5 mt-1">
                  {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
