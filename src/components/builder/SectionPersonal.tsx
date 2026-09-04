import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { Sparkles, User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface SectionPersonalProps {
  onOpenAISummaryModal: () => void;
}

export const SectionPersonal: React.FC<SectionPersonalProps> = ({ onOpenAISummaryModal }) => {
  const { activeResume, updatePersonalInfo } = useResume();
  const { personal } = activeResume;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-500" /> Personal Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={personal.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="Alex Vance"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Target Job Title</label>
          <input
            type="text"
            value={personal.jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="Senior Full Stack Engineer"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
          </label>
          <input
            type="email"
            value={personal.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="alex.vance@example.com"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
          </label>
          <input
            type="text"
            value={personal.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="+1 (555) 019-2834"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location (City, State / Country)
          </label>
          <input
            type="text"
            value={personal.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Personal Website / Portfolio
          </label>
          <input
            type="text"
            value={personal.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="https://alexvance.dev"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-slate-400" /> LinkedIn Profile
          </label>
          <input
            type="text"
            value={personal.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="linkedin.com/in/alexvance-dev"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub Profile
          </label>
          <input
            type="text"
            value={personal.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="github.com/alexvance-dev"
          />
        </div>
      </div>

      {/* Summary Field with AI trigger */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs">
            Professional Summary
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenAISummaryModal}
            icon={<Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
            className="text-xs text-indigo-600 dark:text-cyan-400 font-bold"
          >
            Generate with AI
          </Button>
        </div>
        <textarea
          rows={4}
          value={personal.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a brief overview of your background, experience, and key accomplishments..."
        />
      </div>
    </div>
  );
};
