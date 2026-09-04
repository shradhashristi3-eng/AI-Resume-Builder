import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, experiences, education, skills, projects, certifications, languages, colorTheme, fontFamily } = resume;

  const fontStyle = {
    fontFamily: fontFamily === 'Outfit' ? 'Outfit, sans-serif' : fontFamily === 'Playfair Display' ? 'Playfair Display, serif' : 'Inter, sans-serif'
  };

  return (
    <div 
      className="bg-white text-slate-900 w-full min-h-[1050px] p-8 sm:p-10 shadow-lg text-sm relative box-border transition-all"
      style={fontStyle}
    >
      {/* Header Accent Bar */}
      <div 
        className="w-full h-2 rounded-full mb-6"
        style={{ backgroundColor: colorTheme }}
      />

      {/* Main Header */}
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ color: colorTheme }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg font-semibold text-slate-600 mt-1">
            {personal.jobTitle || 'Target Role / Job Title'}
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-600">
          {personal.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[180px]">{personal.website}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[180px]">{personal.linkedin}</span>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[180px]">{personal.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Professional Summary</h2>
          <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{personal.summary}</p>
        </section>
      )}

      {/* Two Column Layout for Main Body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left / Main Column (Experience & Projects) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Work Experience */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                      {exp.bullets.map((bullet, i) => (
                        bullet.trim() && <li key={i} className="leading-normal">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{proj.title}</h3>
                      {proj.link && <span className="text-xs text-slate-500 underline truncate max-w-[140px]">{proj.link}</span>}
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{proj.description}</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-xs pl-1">
                      {proj.bullets.map((b, i) => (
                        b.trim() && <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar (Skills, Education, Certifications) */}
        <div className="space-y-6">
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(sk => (
                  <span 
                    key={sk.id}
                    className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p className="text-xs font-medium text-slate-600 mt-0.5">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map(cert => (
                  <div key={cert.id} className="text-xs">
                    <p className="font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-slate-500">{cert.issuer} ({cert.date})</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1 mb-3 text-slate-900" style={{ color: colorTheme }}>
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">{lang.language}</span>
                    <span className="text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
