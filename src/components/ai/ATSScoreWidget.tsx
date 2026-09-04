import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { analyzeATS } from '../../utils/aiEngine';
import { ShieldCheck, AlertCircle, CheckCircle2, Lightbulb, Zap } from 'lucide-react';

export const ATSScoreWidget: React.FC = () => {
  const { activeResume } = useResume();
  const atsResult = analyzeATS(activeResume);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 70) return 'text-indigo-500 stroke-indigo-500';
    if (score >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { label: 'ATS Ready (Top 5%)', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };
    if (score >= 70) return { label: 'Good Compatibility', bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' };
    if (score >= 50) return { label: 'Needs Improvement', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
    return { label: 'High Risk of Filter Drop', bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' };
  };

  const badgeInfo = getScoreBadge(atsResult.score);

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
      {/* Gauge Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live ATS Compatibility Score</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeInfo.bg}`}>
          {badgeInfo.label}
        </span>
      </div>

      {/* Circle Gauge & Metrics */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-1">
        {/* SVG Circular Progress */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`transition-all duration-1000 ease-out ${getScoreColor(atsResult.score)}`}
              strokeDasharray={`${atsResult.score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {atsResult.score}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">out of 100</span>
          </div>
        </div>

        {/* Quick breakdown metrics */}
        <div className="grid grid-cols-2 gap-3 w-full text-xs">
          <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[11px] text-slate-400 block font-medium">Matched Keywords</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {atsResult.matchedKeywords.length} Found
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[11px] text-slate-400 block font-medium">Action Verbs</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-cyan-400">
              {atsResult.actionVerbsCount} Verbs
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[11px] text-slate-400 block font-medium">Word Count</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {atsResult.wordCount} Words
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[11px] text-slate-400 block font-medium">Missing Skills</span>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {atsResult.missingKeywords.length} Recommended
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations & Tips */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Key Optimization Suggestions
        </h4>
        <div className="space-y-2">
          {atsResult.suggestions.map((s, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              {s.type === 'critical' && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
              {s.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
              {s.type === 'tip' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">{s.title}</span>
                <span className="text-slate-600 dark:text-slate-400 leading-snug">{s.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
