import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeJobDescriptionMatch } from '../../data/mockAI';
import { JobMatchReport } from '../../types';
import { 
  Briefcase, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, Check, RefreshCw, Clipboard, FileText, ArrowRight
} from 'lucide-react';

interface JobMatcherProps {
  setActiveView: (view: string) => void;
}

export const JobMatcher: React.FC<JobMatcherProps> = ({ setActiveView }) => {
  const { activeResume, updateResume, theme } = useApp();
  const [jobDescription, setJobDescription] = useState('');
  const [report, setReport] = useState<JobMatchReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showAutoDeveloperAlert, setShowAutoDeveloperAlert] = useState(false);
  const [boostedKeywordCount, setBoostedKeywordCount] = useState(0);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeResume) return;
    if (!jobDescription.trim()) {
      alert("Please paste a job description first!");
      return;
    }

    setIsScanning(true);
    setShowAutoDeveloperAlert(false);
    setTimeout(() => {
      // 1. Run initial match assessment
      const result = analyzeJobDescriptionMatch(activeResume, jobDescription);
      
      // 2. Identify and compile missing keywords
      const currentSkillNames = activeResume.skills.map(s => s.name.toLowerCase());
      const skillsToAdd = result.missingKeywords.filter(s => !currentSkillNames.includes(s.toLowerCase()));
      
      const newSkillsList = [
        ...activeResume.skills,
        ...skillsToAdd.map((s, i) => ({
          id: `sk_jd_${i}_${Date.now()}`,
          name: s,
          category: 'Core Competency',
          level: 5
        }))
      ];

      // 3. Extract matching job profile from JD
      let targetJobTitle = "Professional";
      const lowercaseJD = jobDescription.toLowerCase();
      if (lowercaseJD.includes("software engineer") || lowercaseJD.includes("developer")) {
        targetJobTitle = "Software Engineer";
      } else if (lowercaseJD.includes("frontend")) {
        targetJobTitle = "Frontend Developer";
      } else if (lowercaseJD.includes("backend")) {
        targetJobTitle = "Backend Systems Engineer";
      } else if (lowercaseJD.includes("business analyst")) {
        targetJobTitle = "Business Analyst";
      } else if (lowercaseJD.includes("marketing")) {
        targetJobTitle = "Digital Marketing Specialist";
      }

      // 4. Draft elegant, metric-oriented summary aligned to JD
      const allKeywords = [...result.matchedKeywords, ...result.missingKeywords];
      const newSummary = `Results-oriented ${targetJobTitle} with a proven track record of engineering high-impact deliverables. Expert in high-throughput architectures and responsive systems, leveraging skills in ${result.matchedKeywords.slice(0, 3).join(', ')}${result.missingKeywords.length > 0 ? ', ' + result.missingKeywords.slice(0, 3).join(', ') : ''} to optimize operational parameters and boost efficiency margins by 25%.`;

      // 5. Refactor experience registry
      let updatedExperience = [...activeResume.experience];
      if (updatedExperience.length === 0) {
        updatedExperience = [{
          id: `exp_jd_${Date.now()}`,
          company: "Enterprise Technology Corp",
          position: targetJobTitle,
          location: "Remote",
          startDate: "2023-01",
          endDate: "Present",
          current: true,
          description: `Spearheaded architecture deliverables and daily operations utilizing ${allKeywords.slice(0, 5).join(', ')}.\nOptimized system latency by 30% and drove continuous automated deployment integrations.\nCollaborated in agile sprint cycles to improve monthly active user onboarding rate by 15%.`
        }];
      } else {
        updatedExperience = activeResume.experience.map((exp, idx) => {
          if (idx === 0) {
            if (exp.description.includes("Spearheaded product milestones utilizing key competencies in")) {
              return exp;
            }
            return {
              ...exp,
              description: `Spearheaded product milestones utilizing key competencies in ${allKeywords.slice(0, 5).join(', ')}.\nOptimized transactional efficiencies by 35% and compiled automated testing pipelines.\nLed sprint tasks and mentored junior candidates to improve feature delivery by 20%.\nOriginal duties: ${exp.description}`
            };
          }
          return exp;
        });
      }

      // 6. Push updates to active resume
      const updatedResume = {
        ...activeResume,
        skills: newSkillsList,
        summary: newSummary,
        experience: updatedExperience,
        settings: {
          ...activeResume.settings,
          templateId: 'ats'
        }
      };

      updateResume(activeResume.id, updatedResume);

      // 7. Re-calculate perfect final score report
      const finalResult = analyzeJobDescriptionMatch(updatedResume, jobDescription);
      setReport(finalResult);
      setBoostedKeywordCount(skillsToAdd.length);
      setShowAutoDeveloperAlert(true);
      setIsScanning(false);
    }, 1200);
  };

  const handlePasteSample = () => {
    const sample = `We are looking for a Senior Software Engineer to build scalable, high-performance web systems. 
Core stack includes React, TypeScript, Node.js, Express, and MongoDB databases. 
Experience containerizing setups with Docker and deploying nodes to AWS is highly preferred. 
Must understand REST API designs, Git version control, and CI/CD pipelines in an Agile environment.`;
    setJobDescription(sample);
  };

  const handleClear = () => {
    setJobDescription('');
    setReport(null);
  };

  if (!activeResume) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-6rem)]">
        <Briefcase size={48} className="text-slate-400 mb-2 animate-pulse" />
        <h3 className="text-lg font-extrabold text-slate-800 mb-1">No Active Resume</h3>
        <p className="text-slate-500 text-xs mb-4">You need an active resume before executing job matching algorithms.</p>
        <button onClick={() => setActiveView('builder')} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm">
          Open Builder
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin">
      
      {/* 1. Header Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="text-left">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">Job Description Matching Engine</h2>
          <p className="text-slate-500 text-xs mt-1">Paste target job descriptions to extract high-priority keywords, identify skills gaps, and optimize callbacks.</p>
        </div>
        <button 
          onClick={() => setActiveView('builder')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow shadow-indigo-600/10 active:scale-95 transition-all"
        >
          Return to Builder Workspace
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 2. SPLIT LAYOUT INPUT AND RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side - Paste input form (5/12) */}
        <form onSubmit={handleScan} className="lg:col-span-5 flex flex-col gap-4">
          <div className={`p-5 rounded-3xl border flex flex-col gap-4 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-800">
              <label>Target Job Specifications</label>
              <button 
                type="button" 
                onClick={handlePasteSample} 
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold"
              >
                Paste Sample JD
              </button>
            </div>
            
            <textarea
              rows={10}
              placeholder="Paste job posting details here (responsibilities, requirements, skills section)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 leading-relaxed font-sans transition-all shadow-inner"
              required
            />

            <div className="flex gap-3">
              {jobDescription && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold border transition-colors ${theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-650 hover:bg-slate-50'}`}
                >
                  Clear Description
                </button>
              )}
              <button
                type="submit"
                disabled={isScanning || !jobDescription.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow shadow-indigo-600/25 active:scale-95 transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Extracting Keywords...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Scan JD Compatibility
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Right Side - Analysis Results (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {report ? (
            <div className="flex flex-col gap-6">
              
              {showAutoDeveloperAlert && (
                <div className="p-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col gap-3 text-left animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Sparkles size={16} className="animate-pulse text-indigo-400" />
                    <span>AI Resume Auto-Developer Engaged!</span>
                  </div>
                  <p className="text-[11.5px] text-slate-350 leading-relaxed">
                    We parsed the Job Description, analyzed the keyword gaps, and automatically developed your active resume:
                  </p>
                  <ul className="list-disc list-inside text-[10px] text-slate-400 flex flex-col gap-1.5 pl-1.5">
                    <li>Injected <strong>{boostedKeywordCount}</strong> missing core competencies directly into your Skills section.</li>
                    <li>Refactored your <strong>Professional Summary</strong> to align with the role specifications and key matching metrics.</li>
                    <li>Injected required keywords into your <strong>Top Work Experience</strong> (or added a targeted professional entry).</li>
                    <li>Automatically set the layout styling to the highly parsable <strong>ATS Clean</strong> template.</li>
                  </ul>
                  <p className="text-[10px] text-emerald-400 font-bold mt-1">
                    🎉 Match rate boosted to a stunning <strong>{report.score}%</strong>! You can review or edit these changes anytime in the Builder.
                  </p>
                </div>
              )}
              
              {/* Dynamic Match Score Gauge */}
              <div className={`p-6 rounded-3xl border grid grid-cols-1 sm:grid-cols-12 gap-6 items-center ${theme === 'dark' ? 'bg-[#151f32]/45 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="sm:col-span-4 flex justify-center">
                  <div className="relative h-28 w-28 flex items-center justify-center select-none">
                    <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                      <circle cx="56" cy="56" r="48" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke={report.score >= 80 ? '#10b981' : report.score >= 60 ? '#6366f1' : '#f43f5e'} 
                        strokeWidth="10" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - report.score / 100)}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-black font-display text-slate-800">{report.score}%</span>
                      <span className="text-[7px] text-slate-500 uppercase tracking-widest font-bold">Match Grade</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-8 text-left flex flex-col gap-1.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${report.score >= 80 ? 'text-emerald-400' : report.score >= 60 ? 'text-indigo-400' : 'text-rose-400'}`}>
                    {report.score >= 80 ? 'Excellent JD Alignment' : report.score >= 60 ? 'Moderate Skills Overlap' : 'Severe Keyword Gaps'}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {report.score >= 80 
                      ? 'Your resume coordinates beautifully with the target job posting. Optimize minor formatting to submit.' 
                      : 'Hiring software looks for exact matches. Inject the high-priority missing terms highlighted below to bypass automatic filters.'}
                  </p>
                </div>
              </div>

              {/* Keywords Tag boxes */}
              <div className={`p-6 rounded-3xl border flex flex-col gap-5 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-display font-extrabold text-sm border-b border-slate-200 pb-2 text-slate-800">Target Keyword Audit</h3>

                {/* Matched Keywords */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Present in Resume ({report.matchedKeywords.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {report.matchedKeywords.map((kw, i) => (
                      <span key={i} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full select-none flex items-center gap-1">
                        <Check size={10} strokeWidth={4} /> {kw}
                      </span>
                    ))}
                    {report.matchedKeywords.length === 0 && (
                      <span className="text-[10.5px] text-slate-500 italic">No matching keywords located yet.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="flex flex-col gap-2 border-t border-slate-800/40 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Missing Core Keywords ({report.missingKeywords.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {report.missingKeywords.map((kw, i) => (
                      <span key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full select-none flex items-center gap-1">
                        <AlertTriangle size={10} /> {kw}
                      </span>
                    ))}
                    {report.missingKeywords.length === 0 && (
                      <span className="text-[10.5px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> You possess 100% of the core target keywords!
                      </span>
                    )}
                  </div>
                </div>

                {/* Suggested secondary skills */}
                {report.suggestedSkills.length > 0 && (
                  <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Suggested Trending Skills ({report.suggestedSkills.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {report.suggestedSkills.map((sk, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full select-none">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action checklist */}
              <div className={`p-6 rounded-3xl border flex flex-col gap-4 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-display font-extrabold text-sm border-b border-slate-200 pb-2 text-slate-800">Actionable Optimization Checklist</h3>
                <div className="flex flex-col gap-3">
                  {report.improvements.map((imp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px]">{idx + 1}</div>
                      <span className="leading-relaxed">{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            // Placeholder/Instructions view
            <div className={`p-10 rounded-3xl border text-center flex flex-col items-center justify-center min-h-[350px] ${theme === 'dark' ? 'bg-[#151f32]/15 border-slate-850' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Clipboard size={48} className="text-slate-300 mb-4 animate-bounce" />
              <h4 className="font-display font-extrabold text-lg text-slate-800">Awaiting Analysis Scan</h4>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed mt-2 font-medium">
                Paste the target job description details in the left panel and click <strong className="text-slate-700">Scan JD Compatibility</strong>. The smart parser will run natural language index checkups immediately.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
