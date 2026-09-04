import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Bot, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Play, 
  Download, 
  ChevronDown, 
  Wand2, 
  Cpu, 
  Layout, 
  BarChart3, 
  Check,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoPrompt, setDemoPrompt] = useState('Senior Full Stack Engineer with React & AWS experience');
  const [demoResult, setDemoResult] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoGenerate = () => {
    setDemoLoading(true);
    setTimeout(() => {
      setDemoResult('Architected cloud-native SaaS platforms using React, TypeScript, and AWS microservices. Scaled active user base to 500k+ while reducing API query response times by 42% through optimized caching strategies.');
      setDemoLoading(false);
    }, 800);
  };

  const faqs = [
    {
      q: "How does the AI Resume Builder optimize my resume for ATS?",
      a: "ResumeAI Pro parses your target job title and job description against our database of 50,000+ top recruiter ATS filters. It identifies missing keywords, formats bullet points with high-impact action verbs, and removes parsing errors."
    },
    {
      q: "Can I download my resume in both PDF and DOCX formats?",
      a: "Yes! You can download pixel-perfect A4 PDFs, fully editable DOCX Word files, or print directly from your browser with zero formatting loss."
    },
    {
      q: "Are the resume templates ATS compliant?",
      a: "All 5 of our templates (Modern, Minimal, Professional, Executive, Fresher) strictly follow ATS structural standards—avoiding text-box traps and multi-layered graphic clutter."
    },
    {
      q: "What is included in the Free vs Pro plan?",
      a: "The Free plan lets you build and preview resumes. The Pro plan unlocks unlimited PDF & DOCX downloads, AI summary generation, ATS score analysis, cover letter generator, and version history."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-cyan-400 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Next-Gen AI Resume Engine v3.0 Powered</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Land Your Dream Job <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-400 bg-clip-text text-transparent">3x Faster</span> With AI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Build ATS-optimized resumes in seconds. Powered by intelligent keyword matching, bullet point rewriting, and 5 recruiter-approved templates.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('builder')}
              icon={<Wand2 className="w-5 h-5" />}
              className="w-full sm:w-auto text-base shadow-indigo-500/30 glow-border"
            >
              Build My Resume Free
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('dashboard')}
              icon={<Play className="w-5 h-5 text-indigo-500" />}
              className="w-full sm:w-auto text-base"
            >
              View Live Demo
            </Button>
          </motion.div>

          {/* Social metrics */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% ATS Guaranteed
            </div>
            <div className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" /> 4.9/5 Rating (12k+ Users)
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Download className="w-4 h-4 text-indigo-500" /> PDF & DOCX Export
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI RESUME GENERATION DEMO WIDGET */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Live AI Bullet Improver Demo</h3>
                <p className="text-xs text-slate-500">Test how ResuAI converts plain text into high-impact bullet points</p>
              </div>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-500/20">
              Interactive
            </span>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Input Job Role / Draft Bullet</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={demoPrompt}
                onChange={(e) => setDemoPrompt(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                variant="primary"
                onClick={handleDemoGenerate}
                loading={demoLoading}
                icon={<Wand2 className="w-4 h-4" />}
              >
                Generate Bullet
              </Button>
            </div>
          </div>

          {demoResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium space-y-2"
            >
              <div className="flex items-center justify-between text-indigo-600 dark:text-cyan-400 font-bold">
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-500" /> AI Optimized Result:</span>
                <span className="text-[11px] bg-indigo-200 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">+45% Impact Score</span>
              </div>
              <p>"{demoResult}"</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need To Beat The Recruiter Screen
          </h2>
          <p className="text-sm text-slate-500">
            Powered by modern SaaS engineering to give job seekers an unfair advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">AI Summary & Bullet Generator</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Auto-generate professional summaries tailored by industry, years of experience, and target job titles in one click.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Real-Time ATS Keyword Analyzer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Get an instant ATS compatibility score (0-100) with detailed missing skill suggestions before submitting your resume.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5 Production Resume Templates</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose between Modern, Minimal, Professional, Executive, and Fresher designs with dynamic color palettes and font switchers.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Transparent SaaS Pricing
          </h2>
          <p className="text-sm text-slate-500">
            Start for free, upgrade when you need unlimited AI credits and multi-format exports.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Yearly Billing
              <span className="px-1.5 py-0.5 rounded bg-emerald-400 text-slate-950 text-[10px] font-bold">Save 30%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Plan */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Free Tier</h3>
              <p className="text-xs text-slate-500">Perfect for exploring templates & editing content.</p>
              <div className="text-3xl font-black text-slate-900 dark:text-white">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1 Saved Resume</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> All 5 Resume Templates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic ATS Checker</li>
                <li className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-400" /> PDF & DOCX Exports</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('builder')}>
              Start Free
            </Button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="glass-card p-8 rounded-3xl border-2 border-indigo-500 space-y-6 flex flex-col justify-between relative shadow-2xl scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Pro Plan</h3>
              <p className="text-xs text-slate-500">For serious job seekers looking to land interviews fast.</p>
              <div className="text-3xl font-black text-indigo-600 dark:text-cyan-400">
                {billingCycle === 'yearly' ? '$12' : '$18'} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited Saved Resumes</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited PDF & DOCX Downloads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Full AI Summary & Bullet Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Job Description Keyword Matcher</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> AI Cover Letter Generator</li>
              </ul>
            </div>
            <Button variant="primary" className="w-full" onClick={() => onNavigate('builder')}>
              Upgrade to Pro
            </Button>
          </div>

          {/* Executive Plan */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Executive Tier</h3>
              <p className="text-xs text-slate-500">Dedicated career team & 1-on-1 expert review.</p>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {billingCycle === 'yearly' ? '$29' : '$39'} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1-on-1 Human Resume Review</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Priority 24/7 Support</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Custom Branding & Portfolio Builder</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('builder')}>
              Get Executive
            </Button>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="faq">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about ResumeAI Pro.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready To Build Your Recruiter-Ready Resume?</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Join thousands of job seekers who landed interviews at Google, Meta, Amazon, and top startups.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => onNavigate('builder')}
              icon={<ArrowRight className="w-5 h-5" />}
              className="mt-4"
            >
              Create My Resume Now
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
