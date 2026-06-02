import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateATSScore } from '../../data/mockAI';
import { ATSScoreReport } from '../../types';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, BarChart3, 
  Info, ArrowRight, UserCheck, Calendar, BookOpen, Layers, Sparkles
} from 'lucide-react';

interface ScoreCheckerProps {
  setActiveView: (view: string) => void;
}

export const ScoreChecker: React.FC<ScoreCheckerProps> = ({ setActiveView }) => {
  const { activeResume, theme } = useApp();
  const [report, setReport] = useState<ATSScoreReport | null>(null);

  useEffect(() => {
    if (activeResume) {
      setReport(calculateATSScore(activeResume));
    }
  }, [activeResume]);

  if (!activeResume) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-6rem)]">
        <BarChart3 size={48} className="text-slate-600 mb-2 animate-pulse" />
        <h3 className="text-lg font-bold text-white mb-1">No Resume Selected</h3>
        <p className="text-slate-400 text-xs mb-4">Please select or build a resume version first to check ATS rankings.</p>
        <button onClick={() => setActiveView('builder')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
          Open Builder
        </button>
      </div>
    );
  }

  if (!report) return null;

  const scoreDetails = [
    { name: "Contact Registration", val: report.details.contactInfo.score, fb: report.details.contactInfo.feedback, icon: UserCheck, color: "from-blue-600 to-indigo-500" },
    { name: "Skills Keyword Richness", val: report.details.skillsScore.score, fb: report.details.skillsScore.feedback, icon: Layers, color: "from-purple-600 to-pink-500" },
    { name: "Experience Density", val: report.details.experienceScore.score, fb: report.details.experienceScore.feedback, icon: Calendar, color: "from-amber-600 to-orange-500" },
    { name: "Projects Assessment", val: report.details.projectsScore.score, fb: report.details.projectsScore.feedback, icon: BookOpen, color: "from-emerald-600 to-teal-500" },
    { name: "Layout Formatting Standards", val: report.details.formattingScore.score, fb: report.details.formattingScore.feedback, icon: ShieldCheck, color: "from-pink-600 to-rose-500" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-900/60 pb-6">
        <div className="text-left">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">ATS Optimization Dashboard</h2>
          <p className="text-slate-400 text-xs mt-1">Review complete diagnostic breakdowns of your active resume structure against automated hiring checkers.</p>
        </div>
        <button 
          onClick={() => setActiveView('builder')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow shadow-indigo-600/10 active:scale-95 transition-all"
        >
          Return to Builder Workspace
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 2. TOP SCORES SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Visual Ring Gauge */}
        <div className={`md:col-span-4 p-6 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden select-none min-h-[300px] ${theme === 'dark' ? 'bg-[#151f32]/45 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} className="text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Overall Optimization Grade</span>
          </div>

          <div className="relative h-36 w-36 flex items-center justify-center mt-4">
            <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
              <circle cx="72" cy="72" r="60" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} strokeWidth="10" fill="transparent" />
              <circle 
                cx="72" 
                cy="72" 
                r="60" 
                stroke={report.score >= 80 ? '#10b981' : report.score >= 60 ? '#6366f1' : '#f43f5e'} 
                strokeWidth="12" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60 * (1 - report.score / 100)}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black font-display tracking-tight text-white">{report.score}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">out of 100</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-1 w-full text-center">
            <span className={`text-xs font-bold uppercase tracking-wider ${report.score >= 80 ? 'text-emerald-400' : report.score >= 60 ? 'text-indigo-400' : 'text-rose-400'}`}>
              {report.score >= 80 ? 'Excellent ATS Quality' : report.score >= 60 ? 'Good Standard Quality' : 'Critical Issues Detected'}
            </span>
            <p className="text-[10.5px] text-slate-400 leading-normal px-2">
              {report.score >= 80 
                ? 'Your resume possesses superb keyword frequency and structure parameters to clear automated screens easily.' 
                : 'Address the primary visual/keyword improvements detailed on the right to optimize callback chances.'}
            </p>
          </div>
        </div>

        {/* Detailed Criteria Bar Progress Grid */}
        <div className={`md:col-span-8 p-6 rounded-3xl border flex flex-col gap-5 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-display font-bold text-sm border-b border-slate-800 pb-2 text-white">Diagnostics Category Breakdown</h3>
          
          <div className="flex flex-col gap-4">
            {scoreDetails.map((det, idx) => {
              const Icon = det.icon;
              return (
                <div key={idx} className="grid grid-cols-12 gap-3 items-center text-xs">
                  <div className="col-span-4 flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-tr ${det.color} flex items-center justify-center text-white flex-shrink-0 shadow`}>
                      <Icon size={14} />
                    </div>
                    <span className="font-bold text-slate-300 leading-tight truncate">{det.name}</span>
                  </div>

                  <div className="col-span-6 flex flex-col gap-1">
                    <div className="h-2 w-full bg-slate-850 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${det.val}%`, backgroundColor: report.score >= 80 ? '#10b981' : '#6366f1' }} />
                    </div>
                    <span className="text-[10.5px] text-slate-450 leading-none truncate font-medium">{det.fb}</span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-black text-sm text-slate-100">{det.val}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STRENGTHS AND AREAS OF IMPROVEMENT SPLIT BOX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Strengths Card */}
        <div className={`p-6 rounded-3xl border flex flex-col gap-4 min-h-[250px] ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <CheckCircle2 className="text-emerald-400" size={18} />
            <h4 className="font-display font-bold text-sm text-white">Resume Strengths ({report.strengths.length})</h4>
          </div>

          <div className="flex flex-col gap-3">
            {report.strengths.map((str, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 select-none">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px]">&bull;</div>
                <span className="leading-relaxed">{str}</span>
              </div>
            ))}
            {report.strengths.length === 0 && (
              <p className="text-xs text-slate-500 italic py-2">No structural strengths detected yet. Expand content inside the builder.</p>
            )}
          </div>
        </div>

        {/* Improvements Card */}
        <div className={`p-6 rounded-3xl border flex flex-col gap-4 min-h-[250px] ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <AlertTriangle className="text-rose-400" size={18} />
            <h4 className="font-display font-bold text-sm text-white">Areas of Improvement ({report.improvements.length})</h4>
          </div>

          <div className="flex flex-col gap-3">
            {report.improvements.map((imp, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-350 select-none">
                <AlertTriangle size={13} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{imp}</span>
              </div>
            ))}
            {report.improvements.length === 0 && (
              <div className="flex items-start gap-2.5 text-xs text-emerald-400 py-2">
                <CheckCircle2 size={14} className="flex-shrink-0" />
                <span>Your resume meets all critical ATS formatting parameters beautifully! Excellent work.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Educational Print Alert banner at bottom */}
      <div className={`border p-4 rounded-3xl flex items-start gap-3.5 backdrop-blur-md select-none leading-relaxed text-xs text-slate-300 ${theme === 'dark' ? 'bg-[#1e293b]/30 border-slate-800' : 'bg-white border-slate-200'}`}>
        <Info size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h5 className="font-bold text-slate-100 leading-none">Understanding Automated Hiring Screeners (ATS)</h5>
          <p className="text-[11px] text-slate-400">
            Automated screening algorithms scan text formats looking for matching target keywords. Corrupt formatting structures (such as image-based PDFs, text inside visual canvas borders, tables, columns inside ATS professional sheets, headers, or graph images) prevent text extraction. Use our <strong>ATS Clean Template</strong> inside a single-column layout for perfect compatibility.
          </p>
        </div>
      </div>

    </div>
  );
};
