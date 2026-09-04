import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { ResumePreview } from '../components/preview/ResumePreview';
import { SectionPersonal } from '../components/builder/SectionPersonal';
import { SectionExperience } from '../components/builder/SectionExperience';
import { SectionEducation } from '../components/builder/SectionEducation';
import { SectionSkills } from '../components/builder/SectionSkills';
import { SectionProjects } from '../components/builder/SectionProjects';
import { SectionCertifications } from '../components/builder/SectionCertifications';
import { SectionDragContainer } from '../components/builder/SectionDragContainer';
import { ATSScoreWidget } from '../components/ai/ATSScoreWidget';
import { AISummaryModal } from '../components/ai/AISummaryModal';
import { JobMatcherModal } from '../components/ai/JobMatcherModal';
import { exportResumeToPdf } from '../utils/exportPdf';
import { exportResumeToDocx } from '../utils/exportDocx';
import { Button } from '../components/ui/Button';
import { TemplateId } from '../types';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  GripVertical, 
  Download, 
  Printer, 
  Sparkles, 
  Target, 
  ZoomIn, 
  ZoomOut, 
  Palette, 
  Type, 
  Check, 
  FileCheck,
  Save
} from 'lucide-react';

interface BuilderPageProps {
  onNavigate: (page: string) => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onNavigate }) => {
  const { 
    activeResume, 
    setTemplate, 
    setColorTheme, 
    setFontFamily, 
    zoomLevel, 
    setZoomLevel, 
    autoSaveStatus,
    saveVersionSnapshot 
  } = useResume();

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'reorder'>('personal');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showJobMatcherModal, setShowJobMatcherModal] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingDocx, setExportingDocx] = useState(false);

  const templatesList: { id: TemplateId; label: string }[] = [
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'professional', label: 'Professional' },
    { id: 'executive', label: 'Executive' },
    { id: 'fresher', label: 'Fresher' }
  ];

  const colorThemes = [
    { hex: '#4F46E5', label: 'Indigo' },
    { hex: '#7C3AED', label: 'Purple' },
    { hex: '#06B6D4', label: 'Cyan' },
    { hex: '#10B981', label: 'Emerald' },
    { hex: '#F59E0B', label: 'Amber' },
    { hex: '#EF4444', label: 'Crimson' },
    { hex: '#1E293B', label: 'Slate' }
  ];

  const fontOptions: ('Inter' | 'Outfit' | 'Playfair Display' | 'Roboto')[] = [
    'Inter', 'Outfit', 'Playfair Display', 'Roboto'
  ];

  const handlePdfDownload = async () => {
    setExportingPdf(true);
    await exportResumeToPdf('resume-preview-document', `${activeResume.title || 'Resume'}.pdf`);
    setExportingPdf(false);
  };

  const handleDocxDownload = async () => {
    setExportingDocx(true);
    await exportResumeToDocx(activeResume, `${activeResume.title || 'Resume'}.docx`);
    setExportingDocx(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Title & Auto-Save Indicator */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={activeResume.title}
            onChange={(e) => {}}
            className="text-base font-bold bg-transparent border-none text-slate-900 dark:text-white focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Save className="w-3.5 h-3.5 text-emerald-500" />
            <span className="capitalize font-medium">{autoSaveStatus}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJobMatcherModal(true)}
            icon={<Target className="w-4 h-4 text-indigo-500" />}
          >
            Job Matcher
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => saveVersionSnapshot('Manual Snapshot')}
            icon={<FileCheck className="w-4 h-4 text-violet-500" />}
          >
            Save Snapshot
          </Button>

          {/* Export Group */}
          <Button
            variant="primary"
            size="sm"
            loading={exportingPdf}
            onClick={handlePdfDownload}
            icon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </Button>

          <Button
            variant="secondary"
            size="sm"
            loading={exportingDocx}
            onClick={handleDocxDownload}
            icon={<Download className="w-4 h-4" />}
          >
            DOCX
          </Button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Print Resume"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Customization Toolbar (Template, Color, Font) */}
          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            
            {/* Template Selector */}
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2">Select Template</span>
              <div className="grid grid-cols-5 gap-1.5">
                {templatesList.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`py-1.5 rounded-lg font-semibold text-[11px] transition-all border ${
                      activeResume.templateId === t.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-indigo-500" /> Color Accent Theme
              </span>
              <div className="flex items-center gap-2">
                {colorThemes.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => setColorTheme(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                      activeResume.colorTheme === c.hex ? 'scale-125 ring-2 ring-indigo-500 ring-offset-2' : 'hover:scale-110 opacity-80'
                    }`}
                  >
                    {activeResume.colorTheme === c.hex && <Check className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-indigo-500" /> Typography Font
              </span>
              <div className="flex items-center gap-1.5">
                {fontOptions.map(f => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      activeResume.fontFamily === f
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-cyan-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Form Tabs Nav */}
          <div className="flex gap-1 overflow-x-auto p-1 rounded-xl bg-slate-200 dark:bg-slate-800 no-scrollbar">
            {[
              { id: 'personal', icon: <User className="w-3.5 h-3.5" />, label: 'Info' },
              { id: 'experience', icon: <Briefcase className="w-3.5 h-3.5" />, label: 'Experience' },
              { id: 'skills', icon: <Code className="w-3.5 h-3.5" />, label: 'Skills' },
              { id: 'education', icon: <GraduationCap className="w-3.5 h-3.5" />, label: 'Education' },
              { id: 'projects', icon: <FolderGit2 className="w-3.5 h-3.5" />, label: 'Projects' },
              { id: 'certifications', icon: <Award className="w-3.5 h-3.5" />, label: 'Certs' },
              { id: 'reorder', icon: <GripVertical className="w-3.5 h-3.5" />, label: 'Order' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Content Area */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            {activeTab === 'personal' && <SectionPersonal onOpenAISummaryModal={() => setShowSummaryModal(true)} />}
            {activeTab === 'experience' && <SectionExperience />}
            {activeTab === 'education' && <SectionEducation />}
            {activeTab === 'skills' && <SectionSkills />}
            {activeTab === 'projects' && <SectionProjects />}
            {activeTab === 'certifications' && <SectionCertifications />}
            {activeTab === 'reorder' && <SectionDragContainer />}
          </div>

          {/* ATS Analyzer Widget */}
          <ATSScoreWidget />

        </div>

        {/* Right Column: Live Resume Canvas Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 sticky top-20">
          
          {/* Zoom & Canvas controls */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-300">Live Interactive Preview</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-indigo-600 dark:text-cyan-400 font-bold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scaled Resume Document Canvas */}
          <ResumePreview />

        </div>

      </div>

      {/* AI Modals */}
      <AISummaryModal isOpen={showSummaryModal} onClose={() => setShowSummaryModal(false)} />
      <JobMatcherModal isOpen={showJobMatcherModal} onClose={() => setShowJobMatcherModal(false)} />
    </div>
  );
};
