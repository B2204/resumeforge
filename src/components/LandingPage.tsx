import React from 'react';
import { useApp, DEFAULT_PRELOADED_RESUME } from '../context/AppContext';
import { TemplatePreview } from './Builder/TemplatePreview';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, FileText, FileDown, Quote, Star, ChevronRight, 
  Sparkles, TrendingUp, CheckCircle2, Mail, Phone, Linkedin, Github, Globe, MapPin, Wand2, Check
} from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
  setActiveView: (view: string) => void;
  openAuthModal: (mode: 'login' | 'signup' | null) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveView, openAuthModal }) => {
  const { theme, user, reviews } = useApp();

  const startBuilding = () => {
    if (user) {
      setActiveView('dashboard');
    } else {
      openAuthModal('signup');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-black'} overflow-x-hidden`}>
      
      {/* Premium Minimal Corporate Background */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 40%), linear-gradient(to bottom, #ffffff, #f8fafc)`
        }}
      />

      {/* Content Container */}
      <div className="relative">
        {/* =========================================
            SECTION 1: HERO
        ========================================= */}
      <section className="min-h-[85vh] flex items-start justify-center pt-12 lg:pt-16 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
          
          {/* Text Left Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex-1 text-left relative z-10 max-w-2xl"
          >
            <h1 className="font-sans font-bold text-[48px] md:text-[68px] leading-[1.05] tracking-tight mb-6 text-slate-900">
              The Next Evolution of
              <br />
              <span className="text-indigo-600">Professional Resumes</span>
            </h1>
            <p className="font-medium text-lg md:text-xl text-slate-500 tracking-tight mb-10 leading-relaxed">
              A single unified experience to build, optimize, and export your career legacy. Skip the formatting struggles and land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-14">
              <button 
                onClick={startBuilding}
                className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-[15px] text-white transition-all duration-200 bg-[#0a0a0a] border border-transparent rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-900/10 w-full sm:w-auto"
              >
                Start Building Resume
                <ArrowRight className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button 
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-[15px] text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm w-full sm:w-auto"
              >
                View Templates
              </button>
            </div>

            {/* Stats below CTA */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-slate-200/80 pt-8 mt-auto">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[22px] md:text-2xl text-slate-900 tracking-tight">10,000+</span>
                <span className="text-[13px] font-semibold text-slate-500">Resumes Created</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[22px] md:text-2xl text-slate-900 tracking-tight">95%</span>
                <span className="text-[13px] font-semibold text-slate-500">ATS Compatible</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[22px] md:text-2xl text-slate-900 tracking-tight">4.9/5</span>
                <span className="text-[13px] font-semibold text-slate-500">User Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Mockup with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-[720px] relative hidden lg:block"
          >
            {/* Main Interactive Mockup (Dashboard View) */}
            <div className="relative rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden transition-transform duration-500 hover:-translate-y-2 group">
              <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm relative z-10 flex h-[580px]">
                
                {/* Dashboard Sidebar */}
                <div className="w-56 bg-white border-r border-slate-200/60 p-5 flex flex-col gap-1 z-20 shrink-0">
                  <div className="flex items-center gap-2 px-2 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                       <FileText size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm tracking-tight">MyResume Assistant</span>
                  </div>
                  
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 mt-2">Sections</div>
                  
                  {[
                    { name: 'Personal Info', done: true },
                    { name: 'Professional Summary', done: true },
                    { name: 'Work Experience', done: true },
                    { name: 'Education', done: true },
                    { name: 'Skills', done: true },
                    { name: 'Projects', done: false },
                    { name: 'Certifications', done: false }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${i === 2 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span>{item.name}</span>
                      {item.done ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200" />
                      )}
                    </div>
                  ))}
                  
                  <div className="mt-auto p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden group-hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                    <Sparkles size={16} className="mb-2 text-indigo-100" />
                    <p className="font-bold text-sm mb-1">AI Keyword Match</p>
                    <p className="text-[10px] text-indigo-100 opacity-90 mb-3 leading-tight">Your resume is matching 92% of targeted job keywords.</p>
                    <button className="w-full py-1.5 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm">View Report</button>
                  </div>
                </div>

                {/* Dashboard Main Content (Resume Preview) */}
                <div className="flex-1 bg-[#F8FAFC] flex flex-col relative overflow-hidden">
                  
                  {/* Top Action Bar */}
                  <div className="h-14 bg-white border-b border-slate-200/60 px-6 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-700 text-sm">Software_Engineer_Resume.pdf</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">Draft</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                        <Wand2 size={14} />
                        Improve with AI
                      </button>
                    </div>
                  </div>
                  
                  {/* Resume Paper Container */}
                  <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start custom-scrollbar">
                    
                    {/* The Actual Resume Document */}
                    <div className="w-full max-w-[500px] bg-white rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-slate-200 p-8 origin-top scale-[0.95] group/paper">
                      
                      {/* Header */}
                      <div className="flex flex-col items-center text-center border-b border-slate-300 pb-5 mb-5 relative">
                         {/* AI Tooltip Mock */}
                         <div className="absolute -right-36 top-0 opacity-0 group-hover/paper:opacity-100 transition-opacity bg-white border border-indigo-100 text-slate-600 text-[9px] px-3 py-2 rounded-lg shadow-xl pointer-events-none flex flex-col gap-1 w-32 z-20">
                           <div className="flex items-center gap-1 text-indigo-600 font-bold mb-0.5"><Sparkles size={10} /> AI Suggestion</div>
                           Add a link to your portfolio to increase interview chances by 15%.
                           <div className="absolute left-0 top-3 -translate-x-1/2 w-2 h-2 bg-white border-l border-b border-indigo-100 rotate-45" />
                         </div>

                        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-slate-100 shadow-sm">
                          <img src="https://i.pravatar.cc/150?img=11" alt="Rohit Kumar" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl font-serif text-slate-900 mb-1 tracking-tight">Rohit Kumar</h1>
                        <h2 className="text-sm font-medium text-indigo-600 uppercase tracking-widest mb-3">Senior Software Engineer</h2>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-slate-600 font-medium">
                          <span className="flex items-center gap-1"><Mail size={10} /> rohit.kumar@example.com</span>
                          <span className="flex items-center gap-1"><Phone size={10} /> +1 (555) 123-4567</span>
                          <span className="flex items-center gap-1"><MapPin size={10} /> San Francisco, CA</span>
                          <span className="flex items-center gap-1"><Linkedin size={10} /> linkedin.com/in/rohitk</span>
                          <span className="flex items-center gap-1"><Github size={10} /> github.com/rohitk</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mb-5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Professional Summary</h3>
                        <p className="text-[10px] text-slate-700 leading-relaxed text-justify">
                          Results-driven Senior Software Engineer with 6+ years of experience in designing and developing scalable web applications. Proven track record in leading cross-functional teams to deliver high-impact cloud solutions using React, Node.js, and AWS. Passionate about system architecture, performance optimization, and mentoring junior developers to foster a culture of engineering excellence.
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="mb-5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Technical Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {['React.js', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Tailwind CSS'].map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-slate-50 text-slate-700 text-[9px] font-medium rounded border border-slate-200/60">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience */}
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Work Experience</h3>
                        
                        <div className="mb-4 relative group/exp">
                          {/* AI Tooltip Mock 2 */}
                          <div className="absolute -left-44 top-2 opacity-0 group-hover/exp:opacity-100 transition-opacity bg-indigo-600 text-white text-[9px] px-2 py-1.5 rounded shadow-lg pointer-events-none flex items-center gap-1">
                            <Check size={10} />
                            Strong action verbs detected!
                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rotate-45" />
                          </div>

                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-[11px] font-bold text-slate-900">Senior Frontend Engineer</h4>
                            <span className="text-[9px] font-medium text-slate-500">Jan 2021 – Present</span>
                          </div>
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] font-semibold text-indigo-600">TechNova Solutions</span>
                            <span className="text-[9px] font-medium text-slate-500">San Francisco, CA</span>
                          </div>
                          <ul className="list-disc list-outside ml-3 space-y-1">
                            <li className="text-[10px] text-slate-700 leading-relaxed pl-1 text-justify">
                              Spearheaded the migration of a legacy monolithic application to a modern micro-frontend architecture using Next.js and Module Federation, reducing page load times by 45%.
                            </li>
                            <li className="text-[10px] text-slate-700 leading-relaxed pl-1 text-justify">
                              Implemented a comprehensive design system with Tailwind CSS and Storybook, adopted by 3 cross-functional teams, increasing UI consistency and developer velocity by 30%.
                            </li>
                            <li className="text-[10px] text-slate-700 leading-relaxed pl-1 text-justify">
                              Mentored 4 junior engineers, conducting weekly pair programming sessions and code reviews to elevate team code quality standards.
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-[11px] font-bold text-slate-900">Software Engineer</h4>
                            <span className="text-[9px] font-medium text-slate-500">Jun 2018 – Dec 2020</span>
                          </div>
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] font-semibold text-indigo-600">Innovate LLC</span>
                            <span className="text-[9px] font-medium text-slate-500">Austin, TX</span>
                          </div>
                          <ul className="list-disc list-outside ml-3 space-y-1">
                            <li className="text-[10px] text-slate-700 leading-relaxed pl-1 text-justify">
                              Developed and maintained RESTful APIs using Node.js and Express, serving over 10,000 daily active users with 99.9% uptime.
                            </li>
                            <li className="text-[10px] text-slate-700 leading-relaxed pl-1 text-justify">
                              Optimized PostgreSQL database queries, reducing average API response times from 350ms to 120ms.
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Decorative soft glow behind mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SECTION 2: RESUME TEMPLATES
      ========================================= */}
      <section id="templates" className="py-32 flex flex-col items-center justify-center text-center px-4 border-t border-slate-500/10 bg-gradient-to-b from-transparent to-slate-500/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-col items-center"
        >
          <h2 className="font-display font-black text-4xl md:text-6xl mb-16 drop-shadow-xl">Stunning High-Fidelity Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            {['ats', 'executive', 'sidebar-split'].map((id, i) => (
              <motion.div 
                key={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden p-4 border shadow-2xl transition-transform hover:-translate-y-2 ${theme === 'dark' ? 'bg-[#111111] border-white/10' : 'bg-white border-black/5'}`}
              >
                <div className="h-[400px] w-full rounded-2xl overflow-hidden pointer-events-none flex items-center justify-center bg-white relative">
                  <div className="transform scale-[0.35] origin-top-left absolute top-0 left-0">
                    <TemplatePreview 
                      resume={{
                        ...DEFAULT_PRELOADED_RESUME,
                        settings: { ...DEFAULT_PRELOADED_RESUME.settings, templateId: id }
                      }}
                      zoomScale={1}
                    />
                  </div>
                </div>
                <p className="mt-6 mb-2 font-black text-lg uppercase tracking-wider">{id.replace('-', ' ')}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 3: BUILDER PROCESS
      ========================================= */}
      <section className="py-32 flex flex-col md:flex-row items-center justify-center px-8 gap-16 max-w-7xl mx-auto border-t border-slate-500/10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex-1 text-left"
        >
          <h2 className="font-display font-black text-5xl md:text-7xl mb-6 leading-tight">
            Intelligent<br />Score Checker
          </h2>
          <p className="font-bold text-xl text-slate-400 mb-8 max-w-md">
            Our real-time ATS optimization engine instantly analyzes your experience, highlights missing keywords, and rewrites weak bullets.
          </p>
          <div className="flex items-center gap-4 font-bold">
            <ShieldCheck className="text-emerald-500" size={32} />
            <span className="text-emerald-500 text-xl tracking-tight">Parser Compliance Guaranteed</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          <div className={`p-8 rounded-[3rem] border shadow-2xl ${theme === 'dark' ? 'bg-[#111111] border-white/10' : 'bg-white border-black/5'}`}>
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-slate-500/20">
              <span className="font-bold text-sm tracking-widest uppercase text-slate-400">Live Sandbox</span>
              <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="font-black text-xl text-emerald-500">92</span>
              </div>
            </div>
            <div className="space-y-4 font-bold text-sm">
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                <span className="text-slate-400">Previous:</span> "worked on website"
              </div>
              <div className="flex justify-center"><ArrowRight className="text-indigo-500" /></div>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <span className="text-emerald-600 dark:text-emerald-400">AI Rewritten:</span> "Developed and maintained a responsive React web application, improving user engagement by 32%."
              </div>
            </div>
          </div>
        </motion.div>
      </section>



      {/* =========================================
          SECTION 6: FINAL CTA
      ========================================= */}
      <section className="py-40 flex flex-col items-center justify-center text-center px-4 border-t border-slate-500/10 bg-gradient-to-t from-indigo-500/10 to-transparent">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex justify-center mb-12">
            <Logo className="h-32 w-32 drop-shadow-2xl animate-pulse" />
          </div>
          <h2 className="font-display font-black text-6xl md:text-8xl tracking-tighter mb-10 drop-shadow-xl">
            Start Your Journey.
          </h2>
          <button 
            onClick={startBuilding}
            className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-2xl text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95"
          >
            Create Your Resume Now
            <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={28} />
          </button>
        </motion.div>
      </section>
      </div>
    </div>
  );
};
