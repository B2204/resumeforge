import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateATSScore, parseResumeFromText } from '../../data/mockAI';
import { 
  FileText, TrendingUp, Download, Star, Briefcase, Plus, 
  Trash2, Copy, Sparkles, LayoutGrid, Calendar, HelpCircle, 
  BarChart, ArrowRight, ClipboardList, ChevronRight, Upload, X, FileUp, Zap, Info
} from 'lucide-react';

interface UserDashboardProps {
  setActiveView: (view: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ setActiveView }) => {
  const { 
    user, resumes, deleteResume, duplicateResume, 
    setActiveResumeId, createNewResume, importResume, coverLetters, 
    deleteCoverLetter, scoreHistory, theme 
  } = useApp();

  const [showImportModal, setShowImportModal] = useState(false);
  const [rawResumeText, setRawResumeText] = useState('');
  const [isParsingText, setIsParsingText] = useState(false);
  const [importTab, setImportTab] = useState<'text' | 'file'>('text');
  const [parsingProgress, setParsingProgress] = useState<string>('');
  const [parsedFileName, setParsedFileName] = useState<string>('');

  // Dynamic Loaders for PDF.js and JSZip
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any)['pdfjs-dist/build/pdf']) {
        resolve((window as any)['pdfjs-dist/build/pdf']);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        const pdfjs = (window as any)['pdfjs-dist/build/pdf'];
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(pdfjs);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsedFileName(file.name);
    setIsParsingText(true);
    setParsingProgress('Analyzing document metadata...');

    const fileExt = file.name.split('.').pop()?.toLowerCase();

    try {
      if (fileExt === 'json') {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            setParsingProgress('Restoring JSON backup...');
            setTimeout(() => {
              const parsed = JSON.parse(event.target?.result as string);
              if (!parsed.title || !parsed.personalInfo) {
                throw new Error("Invalid structure");
              }
              importResume(parsed);
              setShowImportModal(false);
              setActiveView('builder');
              setIsParsingText(false);
              setParsingProgress('');
              setParsedFileName('');
              alert("Resume backup loaded successfully!");
            }, 10);
          } catch (err) {
            alert("Invalid Resume'9 JSON backup file structure.");
            setIsParsingText(false);
            setParsingProgress('');
          }
        };
        reader.readAsText(file);
      } else if (fileExt === 'txt') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setParsingProgress('Parsing text lines with AI NLP...');
          setTimeout(() => {
            const rawText = event.target?.result as string;
            const parsedData = parseResumeFromText(rawText);
            const title = `Parsed CV - ${(parsedData.personalInfo?.name) || 'Import'}`;
            importResume({
              ...parsedData,
              title
            });
            setShowImportModal(false);
            setActiveView('builder');
            setIsParsingText(false);
            setParsingProgress('');
            setParsedFileName('');
            alert("Resume text parsed and imported successfully!");
          }, 10);
        };
        reader.readAsText(file);
      } else if (fileExt === 'pdf') {
        setParsingProgress('Loading browser PDF.js engine...');
        const pdfjs = await loadPdfJs();
        setParsingProgress('Extracting document pages...');
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let extractedText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          setParsingProgress(`Reading page ${i} of ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const sortedItems = textContent.items.sort((a: any, b: any) => {
            if (Math.abs(a.transform[5] - b.transform[5]) > 4) {
              return b.transform[5] - a.transform[5];
            }
            return a.transform[4] - b.transform[4];
          });

          let lastY = -1;
          let pageText = '';
          for (const item of sortedItems) {
            if (Math.abs(lastY - item.transform[5]) > 4 && lastY !== -1) {
              pageText += '\n' + item.str;
            } else {
              pageText += ' ' + item.str;
            }
            lastY = item.transform[5];
          }
          extractedText += pageText + '\n';
        }

        setParsingProgress('Mapping extracted resume vectors...');
        setTimeout(async () => {
          try {
            const parsedData = parseResumeFromText(extractedText);
            
            if (parsedData.personalInfo && parsedData.personalInfo.name === 'Parsed Candidate') {
              const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]/g, ' ');
              parsedData.personalInfo.name = nameWithoutExt.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            }

            const title = `Imported PDF - ${(parsedData.personalInfo?.name) || 'Candidate'}`;
            await importResume({
              ...parsedData,
              title
            });

            setShowImportModal(false);
            setActiveView('builder');
            setIsParsingText(false);
            setParsingProgress('');
            setParsedFileName('');
            alert("PDF resume parsed and imported successfully!");
          } catch (err: any) {
            console.error("Import error:", err);
            setIsParsingText(false);
            setParsingProgress('');
            alert(`Database Error: Could not save resume. Please check your Supabase Policies. Detailed error: ${err.message || err.toString()}`);
          }
        }, 10);
      } else {
        alert("Unsupported file format. Please upload .pdf, .txt, or .json.");
        setIsParsingText(false);
        setParsingProgress('');
        setParsedFileName('');
      }
    } catch (err) {
      console.error(err);
      alert("Error parsing document. Please ensure the file is not password-protected or corrupted.");
      setIsParsingText(false);
      setParsingProgress('');
      setParsedFileName('');
    }
  };

  const handleEdit = (id: string) => {
    setActiveResumeId(id);
    setActiveView('builder');
  };

  const handleCreateNew = () => {
    const title = `My Resume #${resumes.length + 1}`;
    createNewResume(title, 'ats');
    setActiveView('builder');
  };

  // Helper: compute active score for resume card
  const getResumeScore = (res: typeof resumes[0]) => {
    return calculateATSScore(res).score;
  };

  // Compute overall stats
  const totalResumes = resumes.length;
  const totalLetters = coverLetters.length;
  const avgScore = resumes.length > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + getResumeScore(curr), 0) / resumes.length)
    : 0;

  // Visual SVG Line Chart Renderer for ATS Score Trends
  const renderTrendChart = () => {
    if (resumes.length === 0) return null;
    
    // Pick the active resume's score history
    const activeResId = resumes[0].id;
    const history = scoreHistory[activeResId] || [65, 72, 79, getResumeScore(resumes[0])];
    
    // If we only have 1 point, pad it
    const dataPoints = history.length === 1 ? [history[0], history[0]] : history;
    
    const chartHeight = 120;
    const chartWidth = 480;
    const padding = 15;
    
    // Math maps
    const pointsCount = dataPoints.length;
    const maxVal = 100;
    const minVal = 0;
    
    const coords = dataPoints.map((val, idx) => {
      const x = padding + (idx * (chartWidth - 2 * padding)) / (pointsCount - 1);
      const y = chartHeight - padding - ((val - minVal) * (chartHeight - 2 * padding)) / (maxVal - minVal);
      return { x, y };
    });

    const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
    
    // Gradient fill path
    const fillPath = `${linePath} L ${coords[coords.length - 1].x} ${chartHeight - padding} L ${coords[0].x} ${chartHeight - padding} Z`;

    return (
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <span>Active ATS Score Progression Timeline</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{resumes[0].title.split(' - ')[0]}</span>
        </div>
        
        <div className="relative flex-grow min-h-[140px] flex items-center justify-center border border-slate-800/40 rounded-2xl bg-[#0f172a]/30 p-2 overflow-hidden">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            
            {/* Horizontal Gridlines */}
            {[0, 0.5, 1].map((ratio, idx) => {
              const y = padding + ratio * (chartHeight - 2 * padding);
              return (
                <line key={idx} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              );
            })}

            {/* Gradient Fill under path */}
            <path d={fillPath} fill="url(#chartGlow)" />

            {/* Main vector Line */}
            <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="2.5" className="transition-all duration-1000" />
            
            {/* Dots */}
            {coords.map((c, i) => (
              <g key={i} className="group">
                <circle cx={c.x} cy={c.y} r="4.5" fill="#6366f1" stroke="#0f172a" strokeWidth="1.5" />
                <text x={c.x} y={c.y - 8} textAnchor="middle" fill="#a5b4fc" className="text-[10px] font-black font-mono leading-none">{dataPoints[i]}%</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin">
      
      {/* 1. Welcome User Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-900/60 pb-6">
        <div className="text-left">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Welcome back, {user?.name || 'Professional'}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Review your active resume variants, cover letters, and scoring analytics progressions in minutes.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 font-bold text-xs px-5 py-3 rounded-xl active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <Upload size={15} className="text-indigo-500 dark:text-indigo-400" />
            Upload & Parse CV
          </button>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/25 active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <Plus size={16} />
            Create New Resume
          </button>
        </div>
      </div>

      {/* 2. STATS HIGHLIGHT TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none">
        {[
          { label: "Active Resumes", val: totalResumes, desc: "Created variants", icon: FileText, color: "from-blue-600/10 to-indigo-600/10 border-blue-500/10 text-indigo-400" },
          { label: "Average Score", val: `${avgScore}%`, desc: "ATS compatibility", icon: TrendingUp, color: "from-purple-600/10 to-pink-600/10 border-pink-500/10 text-pink-400" },
          { label: "Cover Letters", val: totalLetters, desc: "Custom generated letters", icon: ClipboardList, color: "from-emerald-600/10 to-teal-600/10 border-emerald-500/10 text-emerald-400" },
          { label: "Hiring Callback Rate", val: "+32%", desc: "Average increase", icon: Star, color: "from-amber-600/10 to-orange-600/10 border-amber-500/10 text-amber-500" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-5 rounded-3xl border text-left flex items-start gap-4 bg-gradient-to-tr ${stat.color}`}>
              <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800/40 flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider leading-none">{stat.label}</span>
                <span className="text-2xl font-black font-display text-slate-900 dark:text-white mt-1 leading-none">{stat.val}</span>
                <span className="text-[9.5px] text-slate-500 dark:text-slate-450 mt-1">{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. DYNAMIC SCORING TRENDS AND RECENT TIP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Trend line chart */}
        <div className={`lg:col-span-8 p-6 rounded-3xl border flex flex-col justify-between ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
          {renderTrendChart()}
        </div>

        {/* Tip of the day box */}
        <div className={`lg:col-span-4 p-6 rounded-3xl border flex flex-col gap-4 text-left ${theme === 'dark' ? 'bg-[#151f32]/25 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-indigo-500 dark:text-indigo-400">
            <Sparkles size={16} className="animate-pulse" />
            <h4 className="font-display font-bold text-xs uppercase tracking-wider">AI Optimization Tips</h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">"Adding numerical outcomes increases recruiter callback potential."</p>
          <p className="text-[10.5px] text-slate-600 dark:text-slate-400 leading-normal">
            Instead of writing flat tasks like <i>'wrote backend API code'</i>, enhance your experience boxes to specify numeric values, such as: <i>'Built Node.js high-throughput APIs, supporting 50k+ requests with 99.9% uptime.'</i>
          </p>
          <button 
            onClick={() => setActiveView('jobmatcher')} 
            className="text-[10.5px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 group mt-2 self-start"
          >
            Extract Keyword Deficits
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. ACTIVE RESUMES GRID TABS */}
      <div className="flex flex-col gap-4 text-left">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-900 pb-2 flex items-center gap-2 select-none">
          <LayoutGrid size={18} className="text-slate-500" />
          Active Resume Versions ({totalResumes})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((res) => {
            const score = getResumeScore(res);
            return (
              <div 
                key={res.id} 
                className={`border p-6 rounded-3xl text-left flex flex-col relative select-none group transition-all duration-300 hover:scale-[1.01] hover:border-slate-850 hover:bg-[#151f32]/25 ${theme === 'dark' ? 'bg-[#151f32]/10 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
              >
                {/* Visual Accent header indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: res.settings.themeColor }} />

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex flex-col truncate">
                    <span className="font-display font-bold text-slate-900 dark:text-white text-sm truncate leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{res.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-none">Modified &bull; {res.updatedAt}</span>
                  </div>

                  <div className={`h-11 w-11 rounded-full flex flex-col items-center justify-center border font-mono flex-shrink-0 ${
                    score >= 80 
                      ? 'bg-emerald-100 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400' 
                      : 'bg-indigo-100 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-400'
                  }`}>
                    <span className="text-xs font-black leading-none">{score}</span>
                    <span className="text-[6px] font-bold uppercase tracking-wider mt-0.5 text-slate-500 dark:text-slate-400">ATS %</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal flex-grow line-clamp-2">
                  {res.summary || 'Click edit to start writing your professional summary outline...'}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-6 border-t border-slate-200 dark:border-slate-800/40 pt-4 text-xs font-bold">
                  <button 
                    onClick={() => handleEdit(res.id)}
                    className="bg-slate-800 hover:bg-slate-700 dark:bg-[#1e293b] dark:hover:bg-[#25324c] text-white py-2 rounded-xl text-[10.5px] transition-colors text-center w-full shadow"
                  >
                    Edit Workspace
                  </button>
                  <div className="flex gap-1.5 items-center justify-end">
                    <button 
                      onClick={() => duplicateResume(res.id)}
                      className="p-2 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Duplicate"
                    >
                      <Copy size={13} />
                    </button>
                    <button 
                      onClick={() => deleteResume(res.id)}
                      disabled={resumes.length <= 1}
                      className="p-2 border border-slate-300 dark:border-slate-800 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors disabled:opacity-30"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIVE COVER LETTERS LIST */}
      {totalLetters > 0 && (
        <div className="flex flex-col gap-4 text-left select-none">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-900 pb-2 flex items-center gap-2">
            <ClipboardList size={18} className="text-slate-500" />
            Generated Cover Letters ({totalLetters})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverLetters.map((letter) => (
              <div 
                key={letter.id}
                className={`border p-6 rounded-3xl text-left flex flex-col relative transition-all duration-300 hover:scale-[1.01] hover:bg-[#151f32]/25 ${theme === 'dark' ? 'bg-[#151f32]/10 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-slate-900 dark:text-white text-sm leading-tight">{letter.position}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-none">{letter.companyName} &bull; {letter.date}</span>
                  </div>
                  <button 
                    onClick={() => deleteCoverLetter(letter.id)}
                    className="p-1.5 text-rose-500 rounded hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                
                <p className="text-[10.5px] text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed italic flex-grow">
                  "{letter.content}"
                </p>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(letter.content);
                    alert('Cover letter copied to clipboard!');
                  }}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 dark:bg-[#1e293b] dark:hover:bg-[#25324c] text-white py-2 rounded-xl text-[10px] font-bold text-center shadow"
                >
                  Copy Full Letter
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Resume Import & Parsing Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowImportModal(false)} />
          
          <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl p-6 border transition-all duration-300 ${theme === 'dark' ? 'bg-[#151f32] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-850'}`}>
            <button 
              onClick={() => setShowImportModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Upload size={20} />
              </div>
              <h3 className="font-display font-black text-2xl mt-3">Import & Parse Resume</h3>
              <p className="text-sm font-bold text-slate-800 text-center mt-2">
                Paste raw CV text or upload files (.pdf, .txt, .json) to extract details instantly!
              </p>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-300 mb-5 select-none text-sm font-bold">
              <button 
                onClick={() => setImportTab('text')}
                className={`pb-3 px-4 transition-colors relative ${importTab === 'text' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 font-bold'}`}
              >
                <div className="flex items-center gap-1.5">
                  <Zap size={13} />
                  <span>AI Raw Text Parser</span>
                </div>
                {importTab === 'text' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />}
              </button>
              
              <button 
                onClick={() => setImportTab('file')}
                className={`pb-3 px-4 transition-colors relative ${importTab === 'file' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 font-bold'}`}
              >
                <div className="flex items-center gap-1.5">
                  <FileUp size={13} />
                  <span>Upload Resume File</span>
                </div>
                {importTab === 'file' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />}
              </button>
            </div>

            {/* TAB CONTENT A - NLP RAW TEXT PARSER */}
            {importTab === 'text' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 text-xs text-left">
                  <label className="font-bold text-slate-900 text-sm">Paste Raw Resume Text</label>
                  <p className="text-xs font-bold text-slate-800 mb-2 leading-normal">
                    💡 Hint: Copy-paste your entire resume text from a PDF or text file. Our mock NLP engine parses contact details, titles, summaries, skills, and histories automatically!
                  </p>
                  <textarea 
                    rows={8}
                    placeholder={`Alex Morgan\nsenior.alex@example.com | (555) 019-2834\nSan Francisco, CA\n\nPROFESSIONAL SUMMARY\nSenior Full Stack Software Engineer with 5+ years experience building web architectures.\n\nTECHNICAL COMPETENCIES\nReact, TypeScript, Node.js, SQL, AWS, Docker\n\nWORK HISTORY\nInnovateTech - Senior Software Engineer\nJanuary 2022 to Present\nLed frontend development of modern cloud frameworks...`}
                    value={rawResumeText}
                    onChange={(e) => setRawResumeText(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-600 leading-relaxed font-mono w-full scrollbar-thin resize-none"
                  />
                </div>

                <button 
                  onClick={() => {
                    if (!rawResumeText.trim()) {
                      alert("Please paste some resume text first!");
                      return;
                    }
                    setIsParsingText(true);
                    setTimeout(() => {
                      try {
                        const parsedData = parseResumeFromText(rawResumeText);
                        const title = `Parsed CV - ${(parsedData.personalInfo?.name) || 'Import'}`;
                        importResume({
                          ...parsedData,
                          title
                        });
                        setShowImportModal(false);
                        setRawResumeText('');
                        setActiveView('builder');
                        alert("Resume parsed and imported successfully!");
                      } catch (err) {
                        alert("Parsing failed. Verify your text alignment.");
                      } finally {
                        setIsParsingText(false);
                      }
                    }, 1200);
                  }}
                  disabled={isParsingText}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Zap size={14} className={isParsingText ? 'animate-bounce' : ''} />
                  {isParsingText ? 'Parsing CV Details with AI...' : 'Run Mock AI NLP Parser'}
                </button>
              </div>
            )}

            {/* TAB CONTENT B - UPLOAD RESUME FILE */}
            {importTab === 'file' && (
              <div className="flex flex-col gap-5 text-xs text-left py-2">
                {isParsingText ? (
                  // Custom Parsing Progress Indicator Loader
                  <div className="border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-[#0f172a]/20 select-none min-h-[160px]">
                    <div className="relative h-12 w-12 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-600/20 border-t-indigo-500 animate-spin" />
                      <FileText size={18} className="text-indigo-400 animate-pulse" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-white text-xs">{parsingProgress}</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-xs">{parsedFileName}</span>
                    </div>
                  </div>
                ) : (
                  // Standard Upload File dropzone
                  <div className="flex flex-col gap-3">
                    <label className="font-bold text-slate-900 text-sm">Select Resume File (.pdf, .txt, .json)</label>
                    <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-[#0f172a]/20 hover:border-indigo-600/30 hover:bg-[#0f172a]/30 transition-all">
                      <FileUp size={36} className="text-slate-500 animate-pulse" />
                      <p className="text-xs font-bold text-slate-800 text-center">Drag in or click below to upload your resume file.</p>
                      
                      <input 
                        type="file" 
                        accept=".pdf,.txt,.json"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[11px] file:font-semibold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 file:cursor-pointer"
                      />
                    </div>
                    <div className="bg-slate-100 border border-slate-300 p-3.5 rounded-xl text-xs font-bold text-slate-800 leading-normal flex items-start gap-2">
                      <Info size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>💡 OCR File Extraction:</strong> PDF format is analyzed directly in the browser using binary ASCII streams to safeguard your private details securely.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
