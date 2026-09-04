import { ResumeData, ATSAnalysisResult } from '../types';

export const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Accelerated', 'Pioneered', 'Optimized',
  'Engineered', 'Orchestrated', 'Delivered', 'Transformed', 'Decreased',
  'Automated', 'Streamlined', 'Expanded', 'Maximised', 'Cultivated',
  'Implemented', 'Revamped', 'Engineered', 'Overhauled', 'Surpassed'
];

export const KEYWORD_DATABASE: Record<string, string[]> = {
  'Software Engineer': ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'CI/CD', 'REST API', 'Agile', 'Microservices', 'PostgreSQL', 'System Design'],
  'Frontend Engineer': ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3', 'Next.js', 'Web Vitals', 'Responsive Design', 'Jest', 'Webpack', 'Accessibility'],
  'Backend Engineer': ['Node.js', 'Python', 'Go', 'Java', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'Microservices', 'System Architecture', 'gRPC'],
  'Product Manager': ['Product Roadmap', 'Agile/Scrum', 'User Research', 'A/B Testing', 'Product Analytics', 'OKRs', 'KPIs', 'Cross-functional Leadership', 'Jira', 'SQL'],
  'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'PyTorch', 'TensorFlow', 'Pandas', 'Data Mining', 'Statistical Analysis', 'NLP', 'Big Data', 'Tableau'],
  'UX/UI Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'UI Components', 'Information Architecture', 'Interaction Design']
};

/**
 * Generate professional summary based on user details
 */
export async function aiGenerateSummary(jobTitle: string, yearsExp: string, skills: string[]): Promise<string> {
  await new Promise((res) => setTimeout(res, 800)); // Simulate AI latency
  
  const formattedSkills = skills.slice(0, 4).join(', ') || 'modern software engineering standards';
  const roleName = jobTitle || 'Professional';

  const summaries = [
    `Results-driven ${roleName} with ${yearsExp || '5+'} years of hands-on experience building scalable applications and driving technical excellence. Proficient in ${formattedSkills}, with a proven track record of optimizing performance and delivering business impact. Recognized for cross-functional collaboration and delivering complex initiatives on schedule.`,
    `Innovative and analytical ${roleName} possessing ${yearsExp || '4+'} years of expertise in ${formattedSkills}. Passionate about leveraging cutting-edge technology to solve intricate user problems, streamline workflows, and scale high-throughput software architectures.`,
    `High-performing ${roleName} offering extensive experience in ${formattedSkills}. Demonstrated success in spearheading end-to-end product lifecycles, boosting operational efficiency by up to 40%, and elevating team productivity through continuous mentorship and CI/CD best practices.`
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
}

/**
 * Improve bullet point with strong action verbs & metrics
 */
export async function aiImproveBullet(bulletText: string, jobTitle: string): Promise<string> {
  await new Promise((res) => setTimeout(res, 600));

  if (!bulletText.trim()) {
    return 'Spearheaded end-to-end project execution, increasing overall operational efficiency by 35% across cross-functional teams.';
  }

  // Pick random strong action verb
  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const cleanText = bulletText.replace(/^(I|We|Responsible for|Worked on|Did|Made)\s+/i, '');

  return `${verb} ${cleanText.toLowerCase().replace(/^(architected|spearheaded|optimized|engineered|delivered)\s+/i, '')}, achieving a 30% increase in performance metrics and streamlining team workflow.`;
}

/**
 * Perform deep ATS analysis on resume data against target job description or role
 */
export function analyzeATS(resume: ResumeData, targetJobDescription?: string): ATSAnalysisResult {
  const fullText = [
    resume.personal.fullName,
    resume.personal.jobTitle,
    resume.personal.summary,
    ...resume.experiences.flatMap(e => [e.company, e.position, ...e.bullets]),
    ...resume.education.flatMap(e => [e.institution, e.degree, e.fieldOfStudy]),
    ...resume.skills.map(s => s.name),
    ...resume.projects.flatMap(p => [p.title, p.description, ...p.bullets])
  ].join(' ').toLowerCase();

  const words = fullText.split(/\s+/).filter(w => w.length > 2);
  const wordCount = words.length;

  const roleKeywords = KEYWORD_DATABASE[resume.targetRole] || KEYWORD_DATABASE['Software Engineer'];
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  roleKeywords.forEach(kw => {
    if (fullText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Action verbs check
  let actionVerbsFound = 0;
  ACTION_VERBS.forEach(v => {
    if (fullText.includes(v.toLowerCase())) actionVerbsFound++;
  });

  // Score calculation
  const keywordScore = Math.min(40, (matchedKeywords.length / Math.max(1, roleKeywords.length)) * 40);
  const actionVerbScore = Math.min(25, (actionVerbsFound / 5) * 25);
  const lengthScore = wordCount >= 250 && wordCount <= 750 ? 20 : 10;
  const formattingScore = resume.personal.email && resume.personal.phone && resume.personal.summary ? 15 : 8;

  const totalScore = Math.min(99, Math.round(keywordScore + actionVerbScore + lengthScore + formattingScore));

  const suggestions: { type: 'critical' | 'warning' | 'tip'; title: string; message: string }[] = [];

  if (missingKeywords.length > 0) {
    suggestions.push({
      type: 'warning',
      title: 'Missing Core Role Keywords',
      message: `Consider incorporating keywords like "${missingKeywords.slice(0, 3).join(', ')}" into your experience bullet points to match ATS filters.`
    });
  }

  if (actionVerbsFound < 4) {
    suggestions.push({
      type: 'critical',
      title: 'Low Impact Action Verbs',
      message: 'Start your bullet points with strong action verbs like Architected, Spearheaded, or Optimized to demonstrate clear leadership impact.'
    });
  }

  if (!resume.personal.summary || resume.personal.summary.length < 80) {
    suggestions.push({
      type: 'critical',
      title: 'Short or Missing Professional Summary',
      message: 'A compelling 3-4 sentence professional summary increases recruiter response rates by up to 50%.'
    });
  } else {
    suggestions.push({
      type: 'tip',
      title: 'Strong Contact & Summary Foundation',
      message: 'Your contact details and professional summary are well-structured for modern parsing engines.'
    });
  }

  return {
    score: totalScore,
    wordCount,
    matchedKeywords,
    missingKeywords,
    actionVerbsCount: actionVerbsFound,
    formattingScore: Math.round(formattingScore),
    contentImpactScore: Math.round(keywordScore + actionVerbScore),
    suggestions
  };
}

/**
 * AI Chat Assistant response generator
 */
export async function getAIChatResponse(userMessage: string, resumeContext: ResumeData): Promise<string> {
  await new Promise((res) => setTimeout(res, 700));
  const query = userMessage.toLowerCase();

  if (query.includes('ats') || query.includes('score')) {
    const analysis = analyzeATS(resumeContext);
    return `Your current ATS score is **${analysis.score}/100**. To boost your score above 90+:\n1. Add missing keywords: **${analysis.missingKeywords.slice(0, 3).join(', ') || 'All matched!'}**.\n2. Ensure every experience entry has 2-4 bullet points starting with strong action verbs (e.g. *Architected*, *Spearheaded*).`;
  }

  if (query.includes('summary') || query.includes('intro')) {
    return `Here is a refined summary tip for your role as **${resumeContext.personal.jobTitle || 'Software Engineer'}**:\nMake sure your summary answers three things in 3 sentences:\n1. Who you are and your years of experience\n2. Key technical skills (${resumeContext.skills.slice(0, 3).map(s => s.name).join(', ') || 'React, TS, Node'})\n3. Concrete quantifiable achievement (e.g., *scaled platform to 500k users*).`;
  }

  if (query.includes('experience') || query.includes('bullet')) {
    return `To write high-impact bullet points, use the **XYZ Formula** pioneered by Google recruiters:\n> *"Accomplished [X] as measured by [Y], by doing [Z]"*\n\nExample:\n- *Optimized query latency by 45% (Y) by rewriting PostgreSQL indexes (Z) across high-traffic microservices (X).*`;
  }

  return `I've analyzed your resume for **${resumeContext.personal.fullName || 'User'}** targeting the **${resumeContext.targetRole || 'Software Engineer'}** position. How can I help you optimize it further? You can ask me to write a summary, rewrite experience bullets, suggest missing skills, or match a job description!`;
}
