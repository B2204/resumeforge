import React from 'react';
import { useApp, DEFAULT_PRELOADED_RESUME } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { TemplatePreview } from './Builder/TemplatePreview';

interface TemplateGalleryProps {
  setActiveView: (view: string) => void;
  openAuthModal: (mode: 'login' | 'signup' | null) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ setActiveView, openAuthModal }) => {
  const { theme, user, createNewResume } = useApp();

  const templatesList = [
    { id: 'ats', name: "ATS Clean Professional", style: "Standard Grid, Simple Typography", desc: "Single-column design engineered specifically to bypass automated job screeners.", tag: "ATS Optimized", imgClass: "bg-slate-50 text-slate-800", themeColor: "#1e293b", fontFamily: "times" },
    { id: 'modern', name: "Modern Corporate Executive", style: "Accent Colors, Multi-column layout", desc: "Premium styling containing touches suitable for mid-to-senior levels.", tag: "Corporate Elite", imgClass: "bg-slate-50 text-indigo-900", themeColor: "#4f46e5", fontFamily: "times" },
    { id: 'software', name: "Software Engineer Focus", style: "Code Tags, Technology Highlights", desc: "Prioritizes high-end technical skills tags and detailed framework integrations at the very top.", tag: "Dev / Tech Focus", imgClass: "bg-slate-50 text-cyan-900", themeColor: "#0ea5e9", fontFamily: "times" },
    { id: 'fresher', name: "Fresher & Academic Graduate", style: "Education Timelines, Key Projects", desc: "Tailored layout emphasizing course details, key projects, and certifications for students.", tag: "Student / Freshers", imgClass: "bg-slate-50 text-purple-900", themeColor: "#9333ea", fontFamily: "times" },
    { id: 'creative', name: "Creative Professional", style: "Vibrant accents, bold headings", desc: "Stand out with a modern, design-forward layout suitable for marketing and design roles.", tag: "Creative & Marketing", imgClass: "bg-slate-50 text-pink-900", themeColor: "#e11d48", fontFamily: "times" },
    { id: 'minimalist', name: "Minimalist Focus", style: "Generous whitespace, elegant fonts", desc: "A clean, breathing layout focusing entirely on content readability.", tag: "Minimalist", imgClass: "bg-slate-50 text-slate-600", themeColor: "#475569", fontFamily: "times" },
    { id: 'executive', name: "Executive Leader", style: "Formal Typography, Double-ruled", desc: "Traditional, high-impact header suitable for C-level executives and directors.", tag: "Executive", imgClass: "bg-slate-50 text-slate-800", themeColor: "#0f172a", fontFamily: "times" },
    { id: 'timeline', name: "Chronological Timeline", style: "Timeline Graphics, Structured", desc: "Visually maps out career progression and educational journey with a clean timeline.", tag: "Chronological", imgClass: "bg-slate-50 text-emerald-900", themeColor: "#10b981", fontFamily: "times" },
    { id: 'sidebar-split', name: "Sidebar Split Layout", style: "Full-page Sidebar, Colored", desc: "A robust layout with a dedicated colored sidebar for skills and contact information.", tag: "Modern Split", imgClass: "bg-slate-50 text-rose-900", themeColor: "#f43f5e", fontFamily: "times" },
    { id: 'harvard', name: "Harvard Classic", style: "Strict Structure, Monochrome", desc: "A time-tested, highly professional, purely black-and-white academic style favored by top firms.", tag: "Ivy League", imgClass: "bg-white text-black", themeColor: "#111827", fontFamily: "serif" },
    { id: 'startup', name: "Silicon Valley Tech", style: "High Contrast, Bold Header", desc: "A sleek, tech-focused design with subtle color accents and a prominent top banner.", tag: "Tech / Startup", imgClass: "bg-slate-50 text-indigo-900", themeColor: "#2563eb", fontFamily: "inter" },
    { id: 'elegant', name: "Elegant Centered", style: "Balanced, Generous Whitespace", desc: "A clean, balanced layout where headings are centered, perfect for design and management.", tag: "Minimal Elegance", imgClass: "bg-stone-50 text-stone-900", themeColor: "#78716c", fontFamily: "playfair" },
    { id: 'portfolio', name: "Creative Portfolio", style: "Visual Skill Meters, Photo", desc: "A gorgeous, high-contrast visual design that automatically calculates and draws beautiful progress bars.", tag: "Creative / Design", imgClass: "bg-pink-50 text-pink-900", themeColor: "#ec4899", fontFamily: "outfit" },
    { id: 'notion', name: "Notion Minimal", style: "Trendy Document Flow", desc: "A trendy, minimalist document style that uses a continuous left-border line for your experience.", tag: "Product / Minimal", imgClass: "bg-slate-100 text-slate-900", themeColor: "#0f172a", fontFamily: "sans" },
    { id: 'corporate', name: "Executive Corporate", style: "Ultra Dense, Border Heavy", desc: "A highly dense, structured layout designed to pack a massive amount of information elegantly onto one page.", tag: "Finance / Consulting", imgClass: "bg-blue-100 text-blue-900", themeColor: "#1e3a8a", fontFamily: "inter" }
  ];

  const handleUseTemplate = (templateId: string) => {
    if (!user) {
      openAuthModal('signup');
    } else {
      createNewResume('My New Resume', templateId);
      setActiveView('builder');
    }
  };

  return (
    <div className={`min-h-full py-12 flex flex-col items-center ${theme === 'dark' ? 'bg-[#0b101f]/35' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="mb-12">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-none mb-4">
            Resume Template Gallery
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Choose from our selection of professionally designed templates. Once selected, you can customize fonts, colors, and layouts in the builder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templatesList.map((tpl) => (
            <div 
              key={tpl.id}
              className={`border rounded-3xl p-6 text-left flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl select-none group ${theme === 'dark' ? 'bg-[#151f32]/40 border-slate-800 hover:border-indigo-600/50' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
            >
              <div className={`h-[340px] w-full rounded-2xl mb-5 flex flex-col items-center justify-start p-2 text-center relative overflow-hidden bg-slate-200 border border-slate-300`}>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none transform origin-top-left flex items-center justify-center p-4">
                  <div className="pointer-events-none shadow-sm rounded-md overflow-hidden bg-white">
                    <TemplatePreview 
                      resume={{
                        ...DEFAULT_PRELOADED_RESUME,
                        settings: {
                          ...DEFAULT_PRELOADED_RESUME.settings,
                          templateId: tpl.id,
                          themeColor: tpl.themeColor,
                          fontFamily: tpl.fontFamily as any,
                        }
                      }} 
                      zoomScale={0.3} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  {tpl.tag}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">{tpl.style}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tpl.name}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mt-2 flex-grow">
                {tpl.desc}
              </p>
              
              <button 
                onClick={() => handleUseTemplate(tpl.id)}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                Use Template <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
