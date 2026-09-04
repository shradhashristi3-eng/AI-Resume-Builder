import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, TemplateId, ResumeVersion, CoverLetterData } from '../types';
import { INITIAL_RESUME_DATA, SAMPLE_RESUMES_LIST } from '../data/sampleResumes';
import { analyzeATS } from '../utils/aiEngine';

interface ResumeContextType {
  activeResume: ResumeData;
  resumes: ResumeData[];
  versionHistory: ResumeVersion[];
  autoSaveStatus: 'saved' | 'saving' | 'unsaved';
  zoomLevel: number;
  coverLetters: CoverLetterData[];
  
  // Actions
  setActiveResumeId: (id: string) => void;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  setTemplate: (templateId: TemplateId) => void;
  setColorTheme: (colorHex: string) => void;
  setFontFamily: (font: 'Inter' | 'Outfit' | 'Playfair Display' | 'Roboto') => void;
  createNewResume: (title?: string, templateId?: TemplateId) => void;
  duplicateResume: (id: string) => void;
  deleteResume: (id: string) => void;
  reorderSections: (newOrder: ResumeData['sectionOrder']) => void;
  setZoomLevel: (zoom: number) => void;
  saveVersionSnapshot: (label?: string) => void;
  restoreVersionSnapshot: (versionId: string) => void;
  generateCoverLetter: (jobTitle: string, companyName: string, jobDesc: string) => CoverLetterData;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const saved = localStorage.getItem('resumeai_all_resumes');
    return saved ? JSON.parse(saved) : SAMPLE_RESUMES_LIST;
  });

  const [activeResumeId, setActiveResumeIdState] = useState<string>(() => {
    return resumes[0]?.id || INITIAL_RESUME_DATA.id;
  });

  const [versionHistory, setVersionHistory] = useState<ResumeVersion[]>([]);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>(() => {
    const saved = localStorage.getItem('resumeai_cover_letters');
    return saved ? JSON.parse(saved) : [];
  });

  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0] || INITIAL_RESUME_DATA;

  // Sync all resumes to local storage
  useEffect(() => {
    localStorage.setItem('resumeai_all_resumes', JSON.stringify(resumes));
  }, [resumes]);

  // Sync cover letters to local storage
  useEffect(() => {
    localStorage.setItem('resumeai_cover_letters', JSON.stringify(coverLetters));
  }, [coverLetters]);

  // Update active resume
  const updateResumeData = (updater: (prev: ResumeData) => ResumeData) => {
    setAutoSaveStatus('saving');
    setResumes(prevResumes => {
      return prevResumes.map(r => {
        if (r.id === activeResume.id) {
          const updated = updater(r);
          const atsResult = analyzeATS(updated);
          return {
            ...updated,
            atsScore: atsResult.score,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      });
    });

    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 600);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    updateResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const setTemplate = (templateId: TemplateId) => {
    updateResumeData(prev => ({ ...prev, templateId }));
  };

  const setColorTheme = (colorTheme: string) => {
    updateResumeData(prev => ({ ...prev, colorTheme }));
  };

  const setFontFamily = (fontFamily: 'Inter' | 'Outfit' | 'Playfair Display' | 'Roboto') => {
    updateResumeData(prev => ({ ...prev, fontFamily }));
  };

  const setActiveResumeId = (id: string) => {
    setActiveResumeIdState(id);
  };

  const createNewResume = (title: string = 'Untitled Resume', templateId: TemplateId = 'modern') => {
    const newId = 'resume-' + Date.now();
    const newResume: ResumeData = {
      ...INITIAL_RESUME_DATA,
      id: newId,
      title: title || 'My Professional Resume',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateId,
    };
    setResumes(prev => [newResume, ...prev]);
    setActiveResumeIdState(newId);
  };

  const duplicateResume = (id: string) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return;
    const duplicated: ResumeData = {
      ...target,
      id: 'resume-' + Date.now(),
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setResumes(prev => [duplicated, ...prev]);
    setActiveResumeIdState(duplicated.id);
  };

  const deleteResume = (id: string) => {
    if (resumes.length <= 1) return; // keep at least one
    const filtered = resumes.filter(r => r.id !== id);
    setResumes(filtered);
    if (activeResumeId === id) {
      setActiveResumeIdState(filtered[0].id);
    }
  };

  const reorderSections = (newOrder: ResumeData['sectionOrder']) => {
    updateResumeData(prev => ({ ...prev, sectionOrder: newOrder }));
  };

  const saveVersionSnapshot = (label: string = 'Auto Snapshot') => {
    const newVersion: ResumeVersion = {
      id: 'ver-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      label,
      resumeData: JSON.parse(JSON.stringify(activeResume))
    };
    setVersionHistory(prev => [newVersion, ...prev].slice(0, 10)); // Keep max 10 snapshots
  };

  const restoreVersionSnapshot = (versionId: string) => {
    const version = versionHistory.find(v => v.id === versionId);
    if (version) {
      updateResumeData(() => ({ ...version.resumeData, id: activeResume.id }));
    }
  };

  const generateCoverLetter = (jobTitle: string, companyName: string, jobDesc: string): CoverLetterData => {
    const newLetter: CoverLetterData = {
      id: 'cl-' + Date.now(),
      title: `Cover Letter - ${companyName || 'Target Company'}`,
      recipientName: 'Hiring Manager',
      recipientTitle: 'Head of Talent Acquisition',
      companyName: companyName || 'Innovate Tech Inc.',
      jobTitle: jobTitle || activeResume.personal.jobTitle || 'Software Engineer',
      jobDescription: jobDesc,
      content: `Dear Hiring Manager,\n\nI am writing to express my enthusiastic interest in the ${jobTitle || 'Software Engineer'} position at ${companyName || 'your esteemed company'}. With over ${activeResume.experiences.length > 1 ? '5' : '3'} years of practical experience driving key software solutions and architecting robust systems, I am confident in my ability to deliver immediate value to your team.\n\nIn my previous role at ${activeResume.experiences[0]?.company || 'Apex Cloud'}, I ${activeResume.experiences[0]?.bullets[0] || 'led high-impact engineering projects'}. My core background in ${activeResume.skills.slice(0, 4).map(s => s.name).join(', ')} aligns seamlessly with the requirements listed in your job description.\n\nThank you for considering my application. I welcome the opportunity to discuss how my background and technical leadership can accelerate ${companyName || 'the company\'s'} strategic roadmap.\n\nSincerely,\n${activeResume.personal.fullName || 'Alex Vance'}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCoverLetters(prev => [newLetter, ...prev]);
    return newLetter;
  };

  return (
    <ResumeContext.Provider value={{
      activeResume,
      resumes,
      versionHistory,
      autoSaveStatus,
      zoomLevel,
      coverLetters,
      setActiveResumeId,
      updateResumeData,
      updatePersonalInfo,
      setTemplate,
      setColorTheme,
      setFontFamily,
      createNewResume,
      duplicateResume,
      deleteResume,
      reorderSections,
      setZoomLevel,
      saveVersionSnapshot,
      restoreVersionSnapshot,
      generateCoverLetter
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};
