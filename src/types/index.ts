export type TemplateId = 'modern' | 'minimal' | 'professional' | 'executive' | 'fresher';

export type UserPlan = 'free' | 'pro' | 'executive';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: UserPlan;
  createdAt: string;
  downloadsCount: number;
  aiCredits: number;
  isAdmin?: boolean;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  achievements?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Tools' | 'Frameworks' | 'Languages';
  level: number; // 1 to 5
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link: string;
  github: string;
  techStack: string[];
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  items: { id: string; title: string; subtitle: string; date: string; description: string }[];
}

export type SectionType = 
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'achievements';

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  createdAt: string;
  updatedAt: string;
  templateId: TemplateId;
  colorTheme: string; // e.g. '#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#1E293B'
  fontFamily: 'Inter' | 'Outfit' | 'Playfair Display' | 'Roboto';
  fontSize: 'sm' | 'md' | 'lg';
  spacing: 'compact' | 'normal' | 'spacious';
  atsScore: number;
  
  personal: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  customSections?: CustomSectionItem[];
  
  sectionOrder: SectionType[];
  enabledSections: Record<SectionType, boolean>;
}

export interface ResumeVersion {
  id: string;
  timestamp: string;
  label: string;
  resumeData: ResumeData;
}

export interface ATSAnalysisResult {
  score: number;
  wordCount: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  actionVerbsCount: number;
  formattingScore: number;
  contentImpactScore: number;
  suggestions: {
    type: 'critical' | 'warning' | 'tip';
    title: string;
    message: string;
  }[];
}

export interface CoverLetterData {
  id: string;
  title: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIResponseState {
  loading: boolean;
  error: string | null;
  data: any;
}
