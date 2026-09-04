import { ResumeData } from '../types';

export const INITIAL_RESUME_DATA: ResumeData = {
  id: 'resume-sample-1',
  title: 'Senior Software Engineer Resume',
  targetRole: 'Senior Full Stack Engineer',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'modern',
  colorTheme: '#4F46E5',
  fontFamily: 'Inter',
  fontSize: 'md',
  spacing: 'normal',
  atsScore: 92,

  personal: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance-dev',
    github: 'github.com/alexvance-dev',
    summary: 'Driven Senior Full Stack Engineer with 6+ years of experience architecting cloud-native web applications using React, TypeScript, Node.js, and Distributed Microservices. Proven track record of scaling high-throughput SaaS platforms to 1M+ active monthly users while reducing server latency by 45%. Strong advocate for clean architecture, automated testing, and developer productivity.',
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Solutions',
      position: 'Senior Full Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected real-time collaborative workspace platform serving 500k+ daily users using React, WebSockets, and Node.js microservices.',
        'Optimized PostgreSQL query execution plans and Redis caching layer, decreasing average API latency by 42% across high-traffic endpoints.',
        'Mentored team of 6 junior and mid-level engineers, establishing CI/CD pipeline automation with GitHub Actions that cut release deployment cycles from 3 days to 20 minutes.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Nexus Digital Tech',
      position: 'Frontend Engineer II',
      location: 'Austin, TX',
      startDate: '2020-06',
      endDate: '2022-12',
      current: false,
      bullets: [
        'Developed modular design system with React & Tailwind CSS adopted across 4 major SaaS products, improving frontend build consistency by 80%.',
        'Spearheaded migration of legacy jQuery codebases to Next.js & TypeScript, boosting Lighthouse performance score from 58 to 98.',
        'Integrated Stripe payments and subscription webhooks with 99.9% uptime for $12M ARR payment processor module.'
      ]
    }
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2016-08',
      endDate: '2020-05',
      current: false,
      gpa: '3.85 / 4.0',
      achievements: ['Dean\'s Honors List (All Semesters)', 'President of ACM Student Chapter']
    }
  ],

  skills: [
    { id: 'sk-1', name: 'React.js / Next.js', category: 'Technical', level: 5 },
    { id: 'sk-2', name: 'TypeScript & JavaScript', category: 'Technical', level: 5 },
    { id: 'sk-3', name: 'Node.js & Express', category: 'Technical', level: 4 },
    { id: 'sk-4', name: 'PostgreSQL & MongoDB', category: 'Technical', level: 4 },
    { id: 'sk-5', name: 'GraphQL & REST APIs', category: 'Technical', level: 5 },
    { id: 'sk-6', name: 'Docker & Kubernetes', category: 'Tools', level: 4 },
    { id: 'sk-7', name: 'AWS (S3, EC2, Lambda)', category: 'Tools', level: 4 },
    { id: 'sk-8', name: 'Agile & Technical Leadership', category: 'Soft Skills', level: 5 },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Developer Productivity Metrics Dashboard',
      description: 'Open-source analytics tool that aggregates GitHub commits, PR reviews, and CI test status into actionable team metrics.',
      link: 'https://devpulse-demo.dev',
      github: 'github.com/alexvance-dev/devpulse',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Chart.js'],
      bullets: [
        'Grew to 3.5k+ GitHub stars within 4 months of launch.',
        'Processed over 100,000 GitHub webhook events per hour using queue-based workers.'
      ]
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-04',
      credentialId: 'AWS-98741029'
    }
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Intermediate' }
  ],

  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner - SF Global Hackathon 2023',
      issuer: 'TechCrunch Disrupt',
      date: '2023-09',
      description: 'Built an AI-driven automated bug triaging engine for open-source maintainers in 48 hours.'
    }
  ],

  sectionOrder: [
    'personal',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
    'achievements'
  ],

  enabledSections: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    achievements: true
  }
};

export const SAMPLE_RESUMES_LIST: ResumeData[] = [
  INITIAL_RESUME_DATA,
  {
    ...INITIAL_RESUME_DATA,
    id: 'resume-sample-2',
    title: 'Product Manager Resume',
    targetRole: 'Lead Product Manager',
    templateId: 'executive',
    colorTheme: '#7C3AED',
    atsScore: 88,
    personal: {
      ...INITIAL_RESUME_DATA.personal,
      fullName: 'Sarah Jenkins',
      jobTitle: 'Lead Product Manager',
      email: 'sarah.jenkins@example.com',
      summary: 'Strategic Lead Product Manager with 7+ years leading cross-functional engineering & design teams to build user-obsessed SaaS products. Skilled in product discovery, roadmap strategy, A/B experimentation, and data-driven growth initiatives that increased ARR by $5M+.',
    }
  },
  {
    ...INITIAL_RESUME_DATA,
    id: 'resume-sample-3',
    title: 'Data Scientist Resume',
    targetRole: 'Senior Data Scientist',
    templateId: 'minimal',
    colorTheme: '#06B6D4',
    atsScore: 95,
    personal: {
      ...INITIAL_RESUME_DATA.personal,
      fullName: 'David Chen',
      jobTitle: 'Senior Data Scientist & AI Specialist',
      email: 'david.chen@example.com',
      summary: 'Data Scientist specializing in Machine Learning, Large Language Model fine-tuning, and predictive analytics with 5+ years of industry experience turning unstructured data into high-value business insights.',
    }
  }
];
