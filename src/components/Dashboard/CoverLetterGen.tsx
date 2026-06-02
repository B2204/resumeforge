import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MailOpen, Clipboard, Check, RefreshCw, Sparkles, 
  Trash2, ArrowRight, ClipboardList, Info, Download
} from 'lucide-react';

interface CoverLetterGenProps {
  setActiveView: (view: string) => void;
}

export const CoverLetterGen: React.FC<CoverLetterGenProps> = ({ setActiveView }) => {
  const { activeResume, saveCoverLetter, coverLetters, deleteCoverLetter, theme } = useApp();

  // Generator form inputs
  const [company, setCompany] = useState('');
  const [recipient, setRecipient] = useState('Hiring Manager');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeResume) return;
    if (!company || !position) {
      alert("Please fill in the target Company Name and Job Position!");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const candidateName = activeResume.personalInfo.name || "Alex Morgan";
      const candidateTitle = activeResume.personalInfo.title || "Full Stack Software Engineer";
      const candidateEmail = activeResume.personalInfo.email || "alex@morgan.dev";
      const candidatePhone = activeResume.personalInfo.phone || "+1 (555) 234-5678";
      const candidateLocation = activeResume.personalInfo.location || "San Francisco, CA";
      const topSkills = activeResume.skills.slice(0, 4).map(s => s.name).join(', ') || 'React, TypeScript, Node.js, and databases';
      const recentCompany = activeResume.experience[0]?.company || 'InnovateTech Systems';
      const recentRole = activeResume.experience[0]?.position || 'Senior Full Stack Engineer';

      const generatedLetter = `Dear ${recipient},

I am writing to express my enthusiastic interest in the ${position} position at ${company}. As a highly skilled and results-driven professional with extensive hands-on experience building scalable applications, I am confident that my technical expertise and problem-solving mindset make me an exceptional fit for your engineering team.

Currently, I serve as a ${recentRole} at ${recentCompany}, where I have spearheaded the architecture of responsive visual workflows and optimized backend pipelines. Over my career, I have focused on translating client requirements into robust, high-performance web products. Specifically, I am highly proficient in utilizing ${topSkills} to streamline coding pipelines and boost page loading speeds. For instance, in my current tenure, my refactoring of core customer portals improved page speed by 35% and boosted active engagement indexes by 28%.

What excites me most about ${company} is your commitment to technical innovation and client-centric designs. I am eager to apply my analytical methodologies and frontend responsive architectures to help optimize your products, reduce infrastructure latencies, and onboard new user segments.

Enclosed is my resume, which outlines my complete professional timeline and core technical competencies. I welcome the opportunity to discuss how my backgrounds and outcomes align with the requirements for the ${position} role. Thank you for your time and consideration.

Sincerely,

${candidateName}
${candidateTitle}
${candidateEmail} | ${candidatePhone} | ${candidateLocation}`;

      setLetterContent(generatedLetter);
      setIsGenerating(false);

      // Save to local storage letter log list
      saveCoverLetter({
        resumeId: activeResume.id,
        recipientName: recipient,
        companyName: company,
        position: position,
        jobDescription: jobDescription,
        content: generatedLetter
      });
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePasteSample = () => {
    setCompany("TechForge AI Solutions");
    setRecipient("Sarah Jenkins (VP of Engineering)");
    setPosition("Senior Frontend Developer");
    setJobDescription("Looking for a Senior Frontend dev with solid mastery of React, TypeScript, and Tailwind CSS to design outstanding dashboard mockups.");
  };

  const handleClear = () => {
    setCompany('');
    setRecipient('Hiring Manager');
    setPosition('');
    setJobDescription('');
    setLetterContent('');
  };

  if (!activeResume) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-6rem)]">
        <MailOpen size={48} className="text-slate-400 mb-2 animate-pulse" />
        <h3 className="text-lg font-extrabold text-slate-800 mb-1">No Active Resume</h3>
        <p className="text-slate-500 text-xs mb-4">You need an active resume version to auto-populate cover letters.</p>
        <button onClick={() => setActiveView('builder')} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm">
          Open Builder
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6 flex-shrink-0">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <MailOpen size={20} className="text-indigo-600" />
            <h2 className="font-display font-extrabold text-2xl text-slate-900">Cover Letter Generator</h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">Create professional, tailored cover letters matching your resume details to specific positions in seconds.</p>
        </div>
        <button 
          onClick={() => setActiveView('builder')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow shadow-indigo-600/10 active:scale-95 transition-all"
        >
          Return to Builder
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Main Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Form inputs (5/12) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 flex flex-col gap-4">
          <div className={`p-5 rounded-3xl border flex flex-col gap-4 ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-800">
              <label>Target Application Metadata</label>
              <button 
                type="button" 
                onClick={handlePasteSample} 
                className="text-[10px] text-indigo-500 hover:text-indigo-600 font-bold"
              >
                Paste Sample Details
              </button>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-left">
              <label className="font-bold text-slate-600">Target Company Name</label>
              <input 
                type="text"
                required
                placeholder="TechForge AI Solutions"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-xs shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-left">
              <label className="font-bold text-slate-600">Recipient Name / Salutation</label>
              <input 
                type="text"
                placeholder="Sarah Jenkins (VP of Engineering)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-xs shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-left">
              <label className="font-bold text-slate-600">Target Position Title</label>
              <input 
                type="text"
                required
                placeholder="Senior Frontend Developer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-xs shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-left">
              <label className="font-bold text-slate-600">Job Posting Details (Optional)</label>
              <textarea 
                rows={4}
                placeholder="Paste the key responsibilities or descriptions to optimize keywords matching..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-xs shadow-inner leading-relaxed font-sans"
              />
            </div>

            <div className="flex gap-3">
              {company && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold border transition-colors ${theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-650 hover:bg-slate-50'}`}
                >
                  Clear Fields
                </button>
              )}
              <button
                type="submit"
                disabled={isGenerating || !company || !position}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow shadow-indigo-600/25 active:scale-95 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Generating Letter...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Generate Letter
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Right column: Letter Paper preview (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6 select-none">
          {letterContent ? (
            <div className="flex flex-col gap-4">
              
              {/* Virtual Paper Sheet layout */}
              <div className="bg-white border border-slate-250 p-10 rounded-2xl shadow-xl aspect-[1/1.3] text-left flex flex-col gap-4 relative overflow-hidden text-slate-850">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-600" />
                
                <div className="flex justify-between items-start border-b pb-4 mb-2">
                  <div className="flex flex-col text-left">
                    <h4 className="font-extrabold text-sm text-slate-900">{activeResume.personalInfo.name || 'Alex Morgan'}</h4>
                    <span className="text-[10px] text-slate-500 font-semibold">{activeResume.personalInfo.title || 'Full Stack Engineer'}</span>
                  </div>
                  
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-[10.5px] shadow"
                  >
                    {copied ? <Check size={11} strokeWidth={3} /> : <Clipboard size={11} />}
                    {copied ? 'Copied!' : 'Copy Letter'}
                  </button>
                </div>

                <div className="text-left font-serif leading-relaxed text-[11px] text-slate-750 flex-grow whitespace-pre-wrap select-text max-h-[480px] overflow-y-auto pr-1 text-justify scrollbar-thin">
                  {letterContent}
                </div>
              </div>

            </div>
          ) : (
            // Placeholder Panel
            <div className={`p-10 rounded-3xl border text-center flex flex-col items-center justify-center min-h-[350px] ${theme === 'dark' ? 'bg-[#151f32]/15 border-slate-850' : 'bg-white border-slate-200 shadow-sm'}`}>
              <ClipboardList size={48} className="text-slate-300 mb-4 animate-bounce" />
              <h4 className="font-display font-extrabold text-lg text-slate-800">Awaiting Letter Generation</h4>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed mt-2 font-medium">
                Fill out the company and role fields on the left and click <strong className="text-slate-700">Generate Letter</strong>. The generator compiles your core highlights instantly.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
