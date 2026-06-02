import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FormSections } from './FormSections';
import { TemplatePreview } from './TemplatePreview';
import { PaymentModal } from './PaymentModal';
import { ReviewModal } from './ReviewModal';
import { calculateATSScore } from '../../data/mockAI';
import { 
  Download, Copy, Trash2, ZoomIn, ZoomOut, Sparkles, 
  Info, BarChart, FileText, CheckCircle2, ChevronRight, FileTextIcon,
  ChevronDown, Loader2, FileDown
} from 'lucide-react';

interface ResumeBuilderProps {
  setActiveView: (view: string) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ setActiveView }) => {
  const { activeResume, updateResume, duplicateResume, deleteResume, resumes, createNewResume, theme, user } = useApp();
  const [zoomScale, setZoomScale] = useState(0.8);
  const [atsScore, setAtsScore] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<'pdf' | null>(null);

  // Automatically compute real-time ATS score whenever active resume changes
  useEffect(() => {
    if (activeResume) {
      const report = calculateATSScore(activeResume);
      setAtsScore(report.score);
    }
  }, [activeResume]);

  // Visual Scale presets fit sizes
  useEffect(() => {
    // Responsive fit scale based on viewport widths
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setZoomScale(0.4);
      else if (width < 1024) setZoomScale(0.6);
      else if (width < 1280) setZoomScale(0.75);
      else setZoomScale(0.82);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!activeResume) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-6rem)]">
        <FileTextIcon size={64} className="text-slate-600 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">No Active Resume Found</h3>
        <p className="text-slate-400 text-xs max-w-sm mb-6">Create a new resume or select an existing version from your dashboard list.</p>
        <button 
          onClick={() => createNewResume('My Software Resume')}
          className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700"
        >
          Create New Resume
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = activeResume.title || 'MyResume_Assistant_Resume';
    window.print();
    document.title = oldTitle;
    
    // Trigger Review modal after print dialog closes
    setTimeout(() => {
      setShowReviewModal(true);
    }, 1000);
  };

  const handleDownloadRequest = (type: 'pdf') => {
    if (user?.role === 'admin') {
      if (type === 'pdf') handlePrint();
      return;
    }
    setPendingDownload(type);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    if (pendingDownload === 'pdf') {
      // Small timeout to allow the payment modal DOM unmounting to complete before blocking print dialog triggers
      setTimeout(() => {
        handlePrint();
      }, 150);
    }
    setPendingDownload(null);
  };


  const handleDuplicate = () => {
    duplicateResume(activeResume.id);
    alert('Resume duplicated successfully!');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this resume? This action is irreversible.')) {
      deleteResume(activeResume.id);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      
      {/* 1. TOP BUILDER BAR ACTIONS */}
      <div className={`print:hidden px-4 sm:px-6 py-3 border-b flex flex-col md:flex-row items-center justify-between gap-3 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text"
            value={activeResume.title}
            onChange={(e) => updateResume(activeResume.id, { ...activeResume, title: e.target.value })}
            className={`font-semibold text-sm px-3 py-1.5 rounded-xl border outline-none focus:border-indigo-600 ${theme === 'dark' ? 'bg-[#151f32]/50 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-850'}`}
          />
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleDuplicate}
              className={`p-2 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              title="Duplicate Version"
            >
              <Copy size={15} />
            </button>
            <button 
              onClick={handleDelete}
              disabled={resumes.length <= 1}
              className={`p-2 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800 text-rose-500 hover:bg-rose-500/10' : 'bg-slate-100 border-slate-200 text-rose-500 hover:bg-rose-100/50'} disabled:opacity-30`}
              title="Delete Version"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Dynamic Zooming Panel */}
        <div className={`hidden lg:flex items-center gap-3 border rounded-2xl px-4 py-1.5 text-xs font-semibold select-none transition-colors ${theme === 'dark' ? 'bg-[#1e293b]/40 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
          <button onClick={() => setZoomScale(prev => Math.max(prev - 0.05, 0.4))} className={`hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'hover:text-white' : ''}`}><ZoomOut size={14} /></button>
          <input 
            type="range"
            min="40"
            max="120"
            value={Math.round(zoomScale * 100)}
            onChange={(e) => setZoomScale(Number(e.target.value) / 100)}
            className={`w-20 accent-indigo-600 h-1 rounded ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'}`}
          />
          <button onClick={() => setZoomScale(prev => Math.min(prev + 0.05, 1.2))} className={`hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'hover:text-white' : ''}`}><ZoomIn size={14} /></button>
          <span className="w-10 text-right">{Math.round(zoomScale * 100)}%</span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Quick Dashboard shortcut */}
          <button
            onClick={() => setActiveView('ats')}
            className={`w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all ${theme === 'dark' ? 'border-slate-800 text-slate-350 hover:bg-slate-800' : 'border-slate-200 text-slate-650 hover:bg-slate-50'}`}
          >
            <BarChart size={14} className="text-indigo-400" />
            Check ATS Score
          </button>

          {/* Primary PDF action */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => handleDownloadRequest('pdf')}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20"
            >
              <Download size={13} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT SCREEN WORKSPACE LAYOUT */}
      <div className="flex flex-grow overflow-hidden">
        
        {/* Left Column - Form controls (5/12) */}
        <div className={`w-full lg:w-5/12 p-4 sm:p-6 border-r flex flex-col overflow-y-auto print:hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
          <FormSections 
            resume={activeResume}
            onChange={(updated) => updateResume(activeResume.id, updated)}
          />
        </div>

        {/* Right Column - Paper Live Canvas View (7/12) */}
        <div className={`hidden lg:flex lg:w-7/12 overflow-auto p-8 justify-center select-none relative scrollbar-thin print:flex print:w-full print:p-0 print:m-0 print:absolute print:inset-0 print:overflow-visible ${theme === 'dark' ? 'bg-[#111827]/70' : 'bg-slate-200/50'}`}>
          
          {/* Virtual Floating Paper Wrap */}
          <div className="w-full min-h-full flex items-start justify-center pb-24 relative" onContextMenu={(e) => { if(user?.role !== 'admin') e.preventDefault(); }}>
            <TemplatePreview 
              resume={activeResume}
              zoomScale={zoomScale}
            />
            {user?.role !== 'admin' && (
              <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center overflow-hidden opacity-[0.04] print:hidden z-50">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="text-4xl font-black transform -rotate-45 m-8 text-black whitespace-nowrap">
                    PREVIEW ONLY
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sticky ATS Progress Gauge Badge */}
          <div 
            onClick={() => setActiveView('ats')}
            className={`print:hidden fixed bottom-6 right-6 h-16 w-16 rounded-full border shadow-xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 group z-30 ${
              atsScore >= 80 
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400' 
                : 'bg-indigo-950/90 border-indigo-500/30 text-indigo-400'
            }`}
          >
            <div className="absolute inset-1 rounded-full border border-dashed animate-spin" style={{ animationDuration: '8s', borderColor: atsScore >= 80 ? '#10b981' : '#6366f1' }} />
            <span className="text-xs font-bold leading-none -mb-0.5">{atsScore}</span>
            <span className="text-[7.5px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-white transition-colors">ATS %</span>
          </div>



        </div>

      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </div>
  );
};
