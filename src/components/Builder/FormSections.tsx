import React, { useState } from 'react';
import { Resume, Experience, Education, Project, Skill, Certification, Achievement, Internship, Language, Reference } from '../../types';
import { generateSmartAIPhrase, calculateATSScore } from '../../data/mockAI';
import { 
  User, AlignLeft, Briefcase, GraduationCap, Code, Shield, 
  Award, Globe, Heart, Users, Sliders, ChevronDown, ChevronUp, 
  Plus, Trash2, ArrowUp, ArrowDown, Sparkles, PlusCircle, Check, RotateCcw,
  LayoutTemplate, X, Presentation, Compass, Layout, Target, Rocket, Scissors, FileText
} from 'lucide-react';

interface FormSectionsProps {
  resume: Resume;
  onChange: (updatedResume: Resume) => void;
}

// Shared peach input & section classes (styled via index.css)
const INPUT = 'builder-field';
const SECTION = 'builder-section';

const NumberStepper = ({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-slate-600 font-bold">{label}</label>
    <div className="flex items-center border border-orange-200 rounded-lg overflow-hidden bg-orange-50 shadow-sm h-8">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="px-3 hover:bg-orange-100 text-orange-600 font-bold border-r border-orange-200 h-full flex items-center justify-center transition-colors select-none active:bg-orange-200 cursor-pointer">
        &minus;
      </button>
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || min)))} className="w-full bg-transparent text-center outline-none text-xs font-bold text-orange-900 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" />
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="px-3 hover:bg-orange-100 text-orange-600 font-bold border-l border-orange-200 h-full flex items-center justify-center transition-colors select-none active:bg-orange-200 cursor-pointer">
        +
      </button>
    </div>
  </div>
);


const TEMPLATES_META = [
  { id: 'ats', name: 'ATS Professional', desc: 'Standard Machine-Readable', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
  { id: 'modern', name: 'Modern Professional', desc: 'Clean & Corporate', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'software', name: 'Software Engineer', desc: 'FAANG Style Coding', icon: Code, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'fresher', name: 'Fresher Graduate', desc: 'Warm & Welcoming', icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'executive', name: 'Corporate Executive', desc: 'Rigorous & Formal', icon: Shield, color: 'text-slate-800', bg: 'bg-slate-200' },
  { id: 'creative', name: 'Creative Design', desc: 'Asymmetric Photo Layout', icon: Sparkles, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  { id: 'minimalist', name: 'Minimalist Elegant', desc: 'Lots of White Space', icon: Layout, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'timeline', name: 'Dotted Timeline', desc: 'Journey Focused', icon: Compass, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'sidebar-split', name: 'Asymmetric Split Side', desc: 'Two-Column Hybrid', icon: LayoutTemplate, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 'harvard', name: 'Harvard Academic', desc: 'Classic University Strict', icon: Award, color: 'text-red-800', bg: 'bg-red-50' },
  { id: 'startup', name: 'Startup Tech', desc: 'Bold Header Banner', icon: Rocket, color: 'text-orange-500', bg: 'bg-orange-100' },
  { id: 'elegant', name: 'Elegant Serif', desc: 'High-End Typography', icon: Presentation, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'portfolio', name: 'Creative Portfolio', desc: 'Visual Skill Meters', icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-50' },
  { id: 'notion', name: 'Notion Minimal', desc: 'Trendy Document Flow', icon: AlignLeft, color: 'text-slate-900', bg: 'bg-slate-100' },
  { id: 'corporate', name: 'Executive Corporate', desc: 'Ultra Dense Structured', icon: Target, color: 'text-blue-800', bg: 'bg-blue-100' }
];

export const FormSections: React.FC<FormSectionsProps> = ({ resume, onChange }) => {
  const [activeAccordion, setActiveAccordion] = useState<string>('personalInfo');
  const [showGallery, setShowGallery] = useState(false);
  const [targetRole, setTargetRole] = useState('software_engineer');
  const [isBoosting, setIsBoosting] = useState(false);

  const roleMetadata: Record<string, { skills: string[]; summary: string }> = {
    software_engineer: {
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Git', 'Docker', 'AWS', 'CI/CD'],
      summary: 'Results-oriented Software Engineer with a proven track record of engineering scalable full-stack web applications. Expert in React, TypeScript, and high-performance Node.js REST APIs, implementing containerized Docker pipelines to reduce latencies by 35% and boost deployment speeds by 40%.'
    },
    frontend_engineer: {
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Redux', 'UI/UX Design'],
      summary: 'Creative Frontend Developer specializing in crafting high-fidelity responsive user interfaces. Highly skilled in React, Tailwind CSS, and Framer Motion micro-animations, improving client engagement scores by 32% and speeding page load latencies by 45%.'
    },
    backend_engineer: {
      skills: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'Redis', 'JWT', 'Docker', 'AWS'],
      summary: 'Backend Architecture Engineer expert in constructing high-throughput, secure microservice layers. Proficient in Node.js server pipelines, database indexing, and containerized DevOps deployments, sustaining 99.9% uptime for 50k+ daily transactions.'
    },
    business_analyst: {
      skills: ['Excel', 'SQL', 'Tableau', 'Power BI', 'Data Modeling', 'KPIs', 'Reporting'],
      summary: 'Senior Business Analyst expert in bridging requirements gaps between client executives and system engineering groups. Skilled in complex SQL queries, Tableau data visualizations, and KPI reporting pipelines, helping save $20,000 in yearly overheads.'
    },
    marketing_manager: {
      skills: ['SEO', 'Google Analytics', 'SaaS Marketing', 'Paid Ads', 'A/B Testing', 'ROAS'],
      summary: 'Digital Marketing Specialist with experience scaling SaaS organic acquisition models. Expert in SEO site crawls, Google Analytics funnel optimizations, and high-yielding Paid Advertising campaigns, delivering a robust 3.5x average ROAS.'
    }
  };

  const currentRole = roleMetadata[targetRole] || { skills: [], summary: '' };
  const resumeTextLower = JSON.stringify(resume).toLowerCase();
  const missingKeywords = currentRole.skills.filter(s => !resumeTextLower.includes(s.toLowerCase()));
  const atsScore = calculateATSScore(resume).score;

  const handleBoostATS = () => {
    setIsBoosting(true);
    setTimeout(() => {
      const currentSkillNames = resume.skills.map(s => s.name.toLowerCase());
      const skillsToAdd = currentRole.skills.filter(s => !currentSkillNames.includes(s.toLowerCase()));
      const newSkillsList = [
        ...resume.skills,
        ...skillsToAdd.map((s, i) => ({ id: `sk_boost_${i}_${Date.now()}`, name: s, category: 'Core Competency', level: 5 }))
      ];
      let updatedExperience = [...resume.experience];
      if (updatedExperience.length === 0) {
        const roleTitles: Record<string, { title: string; company: string }> = {
          software_engineer: { title: 'Senior Software Engineer', company: 'TechCorp Global Solutions' },
          frontend_engineer: { title: 'Frontend Developer', company: 'PixelCraft Interactive Studio' },
          backend_engineer: { title: 'Backend Systems Architect', company: 'DataForge Cloud Architectures' },
          business_analyst: { title: 'Senior Business Analyst', company: 'Capital Growth Financials' },
          marketing_manager: { title: 'Digital Marketing Specialist', company: 'SaaSify Growth Platforms' }
        };
        const roleInfo = roleTitles[targetRole] || { title: 'Professional Consultant', company: 'Enterprise Solutions' };
        updatedExperience = [{
          id: `exp_boost_${Date.now()}`,
          company: roleInfo.company,
          position: roleInfo.title,
          location: 'San Francisco, CA',
          startDate: '2023-01',
          endDate: 'Present',
          current: true,
          description: `Spearheaded architecture deliverables using ${currentRole.skills.slice(0, 4).join(', ')}.\nOptimized transactional efficiencies by 35% and compiled automated testing pipelines.\nLed sprint tasks and mentored junior candidates to improve feature delivery by 20%.`
        }];
      } else {
        updatedExperience = resume.experience.map((exp, idx) =>
          idx === 0
            ? { ...exp, description: `Spearheaded architecture deliverables using ${currentRole.skills.slice(0, 4).join(', ')}.\nOptimized transactional efficiencies by 35% and compiled automated testing pipelines.\nLed sprint tasks and mentored junior candidates to improve feature delivery by 20%.` }
            : exp
        );
      }
      onChange({
        ...resume,
        skills: newSkillsList,
        summary: currentRole.summary,
        experience: updatedExperience,
        settings: { ...resume.settings, templateId: 'ats' }
      });
      setIsBoosting(false);
      alert(`🎉 Resume optimized for ${targetRole.replace(/_/g, ' ').toUpperCase()}! ATS Score boosted successfully!`);
    }, 1200);
  };

  const calculatePageFullness = () => {
    let fullness = 0;
    if (resume.summary && resume.summary.length > 50) fullness += 10;
    fullness += Math.min(resume.experience.length * 20, 40);
    fullness += Math.min(resume.projects.length * 15, 30);
    if (resume.skills.length >= 6) fullness += 10;
    else if (resume.skills.length >= 3) fullness += 5;
    if (resume.certifications.length >= 1) fullness += 5;
    if (resume.achievements.length >= 1) fullness += 5;
    return Math.min(fullness, 100);
  };

  const handleAutoFillPage = () => {
    const fillDb: Record<string, any> = {
      software_engineer: {
        projects: [
          { name: 'CollabDocs (Real-time Markdown Editor)', description: 'Developed a real-time collaborative writing platform using WebSockets for 100+ concurrent users.', technologies: ['React', 'Socket.io', 'Node.js', 'Redis'], link: 'https://github.com/example/collabdocs' },
          { name: 'CloudPulse (Server Resource Monitor)', description: 'Built a lightweight resource monitoring agent with real-time telemetry alerts, reducing outage detection by 30%.', technologies: ['TypeScript', 'InfluxDB', 'Go', 'Docker'], link: 'https://github.com/example/cloudpulse' }
        ],
        certifications: [
          { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2024-06' },
          { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', date: '2023-11' }
        ],
        achievements: [
          { title: '1st Place - InnovateTech Regional Hackathon', date: '2024-04', description: 'Won first prize for constructing an AI-driven disaster response tracker in 24 hours.' },
          { title: 'Published Technical Author on DEV.to', date: '2023-09', description: 'Authored articles on React performance, securing 8,000+ views.' }
        ],
        languages: [
          { id: `lang_1_${Date.now()}`, name: 'English', proficiency: 'Native / Bilingual' },
          { id: `lang_2_${Date.now()}`, name: 'Spanish', proficiency: 'Professional Working' }
        ],
        hobbies: ['Open Source Contribution', 'Technical Blogging', 'UI/UX Prototyping']
      },
      frontend_engineer: {
        projects: [
          { name: 'MotionKit (Animation Components Studio)', description: 'Built an open-source library of customizable landing page UI templates with 5,000+ NPM monthly installs.', technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'], link: 'https://github.com/example/motionkit' },
          { name: 'E-Shop Dash (E-Commerce Analytics)', description: 'Designed a highly interactive analytics panel, boosting page speed by 45%.', technologies: ['Next.js', 'Chart.js', 'Redux Toolkit', 'Tailwind CSS'], link: 'https://github.com/example/eshopdash' }
        ],
        certifications: [
          { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera / Meta', date: '2024-02' },
          { name: 'Certified UX Design Professional', issuer: 'UX Design Institute', date: '2023-08' }
        ],
        achievements: [
          { title: 'Nominated - Visual Interface Awards', date: '2025-01', description: 'Selected as top 5 finalists for custom micro-interaction layouts.' },
          { title: 'Contributed 15+ Accessibility Overrides to Open Source UI', date: '2024-05', description: 'Refactored keyboard navigations for popular calendar plugins.' }
        ],
        languages: [
          { id: `lang_1_${Date.now()}`, name: 'English', proficiency: 'Native / Bilingual' },
          { id: `lang_2_${Date.now()}`, name: 'German', proficiency: 'Professional Working' }
        ],
        hobbies: ['Visual Design', 'Photography', 'Keyboard Customization']
      },
      backend_engineer: {
        projects: [
          { name: 'SafeAuth (JWT/OAuth Microservice)', description: 'Engineered a secure, containerized authentication service with Redis session caching.', technologies: ['Node.js', 'Express', 'Redis', 'PostgreSQL'], link: 'https://github.com/example/safeauth' },
          { name: 'DataStream (Real-time Payment Pipeline)', description: 'Developed a message queue pipeline routing 20,000 requests/sec with zero-loss transactions.', technologies: ['Apache Kafka', 'Go', 'MongoDB', 'Docker'], link: 'https://github.com/example/datastream' }
        ],
        certifications: [
          { name: 'AWS Certified Developer - Associate', issuer: 'Amazon Web Services', date: '2024-03' },
          { name: 'Oracle Certified Professional: Java Developer', issuer: 'Oracle', date: '2023-10' }
        ],
        achievements: [
          { title: 'Reduced Cloud Infrastructure Expenses by 22%', date: '2024-08', description: 'Optimized SQL queries and tuned indexing matrices.' },
          { title: 'Technical Speaker at Backend Summit 2025', date: '2025-02', description: 'Delivered keynote on distributed rate limiters.' }
        ],
        languages: [
          { id: `lang_1_${Date.now()}`, name: 'English', proficiency: 'Native / Bilingual' },
          { id: `lang_2_${Date.now()}`, name: 'French', proficiency: 'Limited Working / Conversational' }
        ],
        hobbies: ['IoT Projects', 'Robotics', 'Home Server Lab']
      },
      business_analyst: {
        projects: [
          { name: 'SpendAudit (Corporate Expenditure Tracker)', description: 'Created an automated expenditure dashboard compiling $2M+ in quarterly expenses.', technologies: ['SQL', 'Power BI', 'Excel Advanced', 'Python'], link: 'https://github.com/example/spendaudit' },
          { name: 'MarketScope (Competitive Intelligence Hub)', description: 'Built a market intelligence dashboard optimizing regional marketing spend by 18%.', technologies: ['Tableau', 'SQL Server', 'Python Pandas', 'Excel'], link: 'https://github.com/example/marketscope' }
        ],
        certifications: [
          { name: 'Certified Business Analysis Professional (CBAP)', issuer: 'IIBA', date: '2024-01' },
          { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', date: '2023-09' }
        ],
        achievements: [
          { title: 'Led Requirements Modeling for a $500K Enterprise Portal', date: '2024-11', description: 'Managed stakeholder interviews and aligned client goals with development roadmaps.' },
          { title: 'Awarded High-Performer of the Quarter', date: '2024-04', description: 'Recognized for driving business validation sprints.' }
        ],
        languages: [
          { id: `lang_1_${Date.now()}`, name: 'English', proficiency: 'Native / Bilingual' },
          { id: `lang_2_${Date.now()}`, name: 'Mandarin', proficiency: 'Beginner / Elementary' }
        ],
        hobbies: ['Data Journalism', 'Financial Planning', 'Chess Strategy']
      },
      marketing_manager: {
        projects: [
          { name: 'SEO-Pulse (SaaS Organic Growth Overhaul)', description: 'Raised core keyword indexation by 150%, driving free sign-ups by 42%.', technologies: ['Google Search Console', 'SEMrush', 'Content Strategy'], link: 'https://github.com/example/seopulse' },
          { name: 'AdMax (Multi-Channel Paid Campaigns)', description: 'Supervised $12,000 digital advertising budget, growing campaign ROAS by 3.5x.', technologies: ['Facebook Ads Manager', 'Google Analytics', 'A/B Testing'], link: 'https://github.com/example/admax' }
        ],
        certifications: [
          { name: 'Google Analytics Individual Qualification (GAIQ)', issuer: 'Google Academy', date: '2024-05' },
          { name: 'HubSpot Inbound Marketing Certification', issuer: 'HubSpot Academy', date: '2023-12' }
        ],
        achievements: [
          { title: 'Scaled SaaS User Acquisition from 5k to 35k in 6 Months', date: '2024-10', description: 'Created viral onboarding pathways and SEO backlinks content.' },
          { title: "Publisher of 'SaaS Marketing Playbook' Newsletter", date: '2023-07', description: 'Grew weekly mailing subscribers to 3,000+ industry readers.' }
        ],
        languages: [
          { id: `lang_1_${Date.now()}`, name: 'English', proficiency: 'Native / Bilingual' },
          { id: `lang_2_${Date.now()}`, name: 'Spanish', proficiency: 'Fluent / Full Professional' }
        ],
        hobbies: ['Creative Copywriting', 'Public Speaking', 'SEO Experimentation']
      }
    };

    const fill = fillDb[targetRole] || { projects: [], certifications: [], achievements: [], languages: [], hobbies: [] };
    const newProjects = resume.projects.length < 2 ? [...resume.projects, ...fill.projects.map((p: any, i: number) => ({ ...p, id: `proj_fill_${i}_${Date.now()}` }))] : resume.projects;
    const newCerts = resume.certifications.length < 2 ? [...resume.certifications, ...fill.certifications.map((c: any, i: number) => ({ ...c, id: `cert_fill_${i}_${Date.now()}`, link: '' }))] : resume.certifications;
    const newAchs = resume.achievements.length < 2 ? [...resume.achievements, ...fill.achievements.map((a: any, i: number) => ({ ...a, id: `ach_fill_${i}_${Date.now()}` }))] : resume.achievements;
    const newLangs = resume.languages.length === 0 ? fill.languages : resume.languages;
    const newHobbies = resume.hobbies.length === 0 ? fill.hobbies : resume.hobbies;

    onChange({ ...resume, projects: newProjects, certifications: newCerts, achievements: newAchs, languages: newLangs, hobbies: newHobbies, settings: { ...resume.settings, margins: 'md' } });
    alert('✨ AI Content Spacing Engaged! Your resume page space has been successfully filled with realistic, targeted content.');
  };

  // Tag states
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState(5);
  const [newLangName, setNewLangName] = useState('');
  const [newLangProf, setNewLangProf] = useState('Full Professional');
  const [newHobby, setNewHobby] = useState('');

  const updateSection = <K extends keyof Resume>(key: K, data: Resume[K]) => onChange({ ...resume, [key]: data });
  const handlePersonalInfoChange = (field: keyof Resume['personalInfo'], value: any) => updateSection('personalInfo', { ...resume.personalInfo, [field]: value });
  const handleSummaryAIImprove = () => updateSection('summary', 'Results-oriented Senior Software Engineer with a proven track record of engineering scalable backend frameworks and intuitive frontend components. Expert in modern state contexts and responsive systems, driving feature turnaround speeds by 25%.');

  const addExperience = () => updateSection('experience', [...resume.experience, { id: `exp_${Date.now()}`, company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }]);
  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => updateSection('experience', resume.experience.map(item => item.id === id ? { ...item, [field]: value } : item));
  const deleteExperience = (id: string) => updateSection('experience', resume.experience.filter(item => item.id !== id));
  const handleExperienceAIImprove = (id: string, text: string) => {
    if (!text) { alert('Please write a quick description first!'); return; }
    const enhanced = generateSmartAIPhrase(text, 'technical');
    updateSection('experience', resume.experience.map(item => item.id === id ? { ...item, description: enhanced } : item));
  };
  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newItems = [...resume.experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    updateSection('experience', newItems);
  };

  const addEducation = () => updateSection('education', [...resume.education, { id: `edu_${Date.now()}`, institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', current: false, gpa: '', description: '' }]);
  const handleEducationChange = (id: string, field: keyof Education, value: any) => updateSection('education', resume.education.map(item => item.id === id ? { ...item, [field]: value } : item));
  const deleteEducation = (id: string) => updateSection('education', resume.education.filter(item => item.id !== id));

  const addProject = () => updateSection('projects', [...resume.projects, { id: `proj_${Date.now()}`, name: '', description: '', technologies: [], link: '' }]);
  const handleProjectChange = (id: string, field: keyof Project, value: any) => updateSection('projects', resume.projects.map(item => item.id === id ? { ...item, [field]: value } : item));
  const deleteProject = (id: string) => updateSection('projects', resume.projects.filter(item => item.id !== id));
  const handleProjectTechTagsChange = (id: string, text: string) => handleProjectChange(id, 'technologies', text.split(',').map(t => t.trim()).filter(Boolean));

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    updateSection('skills', [...resume.skills, { id: `sk_${Date.now()}`, name: newSkillName.trim(), category: newSkillCategory, level: newSkillLevel }]);
    setNewSkillName('');
  };
  const deleteSkill = (id: string) => updateSection('skills', resume.skills.filter(s => s.id !== id));

  const handleSettingChange = (field: keyof Resume['settings'], value: any) => {
    let updatedSettings = { ...resume.settings, [field]: value };
    const singleColOnly = ['ats', 'sidebar-split', 'minimalist', 'timeline', 'software', 'fresher', 'executive'];
    if (field === 'templateId' && singleColOnly.includes(value)) updatedSettings.layout = 'single';
    onChange({ ...resume, settings: updatedSettings });
  };

  const addCertification = () => updateSection('certifications', [...resume.certifications, { id: `cert_${Date.now()}`, name: '', issuer: '', date: '', link: '' }]);
  const addAchievement = () => updateSection('achievements', [...resume.achievements, { id: `ach_${Date.now()}`, title: '', date: '', description: '' }]);
  const addLanguage = () => {
    if (!newLangName.trim()) return;
    updateSection('languages', [...resume.languages, { id: `lang_${Date.now()}`, name: newLangName.trim(), proficiency: newLangProf }]);
    setNewLangName('');
  };
  const addHobbyTag = () => {
    if (!newHobby.trim()) return;
    updateSection('hobbies', [...resume.hobbies, newHobby.trim()]);
    setNewHobby('');
  };
  const addReference = () => updateSection('references', [...resume.references, { id: `ref_${Date.now()}`, name: '', title: '', company: '', contact: '' }]);

  const addCustomSection = () => {
    const newSection = {
      id: `custom_${Date.now()}`,
      sectionTitle: 'New Section',
      items: []
    };
    updateSection('customSections', [...(resume.customSections || []), newSection]);
    setActiveAccordion(newSection.id);
  };

  const addCustomSectionItem = (sectionId: string) => {
    const sections = resume.customSections || [];
    updateSection('customSections', sections.map(sec => 
      sec.id === sectionId 
        ? { ...sec, items: [...sec.items, { id: `item_${Date.now()}`, title: '', subtitle: '', date: '', description: '' }] } 
        : sec
    ));
  };

  const toggleAccordion = (id: string) => setActiveAccordion(activeAccordion === id ? '' : id);

  const SectionToggle = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => {
    const isOpen = activeAccordion === id;
    const isVisible = resume.visibleSections[id] !== false;
    return (
      <div className="flex items-center justify-between border-b border-orange-200 pb-3 mb-3">
        <button onClick={() => toggleAccordion(id)} className="flex items-center gap-3 font-bold text-sm hover:text-indigo-600 transition-colors text-left text-slate-700 dark:text-slate-300">
          <Icon size={18} className="text-orange-400" />
          <span>{label}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {id !== 'personalInfo' && (
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" checked={isVisible} onChange={(e) => updateSection('visibleSections', { ...resume.visibleSections, [id]: e.target.checked })} className="sr-only peer" />
            <div className="w-7 h-4 bg-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-orange-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-white" />
          </label>
        )}
      </div>
    );
  };

  const themeColors = [
    { name: 'slate', hex: '#1e293b' }, { name: 'indigo', hex: '#4f46e5' }, { name: 'blue', hex: '#2563eb' },
    { name: 'emerald', hex: '#10b981' }, { name: 'amber', hex: '#d97706' }, { name: 'violet', hex: '#7c3aed' }, { name: 'rose', hex: '#e11d48' }
  ];

  return (
    <div className="flex flex-col w-full pb-10">

      {/* TEMPLATE GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <LayoutTemplate size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">Template Gallery</h2>
                  <p className="text-xs text-slate-500 font-medium">Select a layout architecture for your resume.</p>
                </div>
              </div>
              <button onClick={() => setShowGallery(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-50/50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {TEMPLATES_META.map(tmpl => {
                  const isActive = resume.settings.templateId === tmpl.id;
                  const Icon = tmpl.icon;
                  return (
                    <div 
                      key={tmpl.id}
                      onClick={() => {
                        onChange({
                          ...resume,
                          settings: { ...resume.settings, templateId: tmpl.id }
                        });
                        setShowGallery(false);
                      }}
                      className={`relative flex flex-col p-4 rounded-xl border-2 transition-all cursor-pointer group ${isActive ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/20' : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg'}`}
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${tmpl.bg} ${tmpl.color}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-1">{tmpl.name}</h3>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{tmpl.desc}</p>
                      
                      {isActive && (
                        <div className="absolute top-3 right-3 text-indigo-600">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== LAYOUT & THEME CUSTOMIZER (outside scroll so dropdowns aren't clipped) ===== */}
      <div className={`${SECTION} mb-4 flex flex-col gap-4 shadow-sm`}>
        <div className="flex items-center gap-2 border-b border-orange-200 pb-2">
          <Sliders size={18} className="text-orange-400 animate-pulse" />
          <h4 className="font-bold text-sm text-slate-700">Layout &amp; Theme Customizer</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
          <div className="flex flex-col gap-1 xl:col-span-2">
            <label className="text-slate-600 font-bold">Active Template</label>
            <button 
              type="button"
              onClick={() => setShowGallery(true)}
              className={`${INPUT} w-full flex items-center justify-between text-left hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400 transition-all shadow-sm bg-white cursor-pointer group h-10`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="text-indigo-500 group-hover:scale-110 transition-transform flex-shrink-0">
                  <LayoutTemplate size={16} />
                </div>
                <span className="font-bold text-slate-700 text-xs truncate">
                  {TEMPLATES_META.find(t => t.id === resume.settings.templateId)?.name || 'Select Template'}
                </span>
              </div>
              <span className="text-[9px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider group-hover:bg-indigo-100 transition-colors flex-shrink-0">Change</span>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-600 font-bold">Column Layout</label>
            <select value={resume.settings.layout} disabled={['ats','sidebar-split','minimalist','timeline','software','fresher','executive','harvard','startup','elegant','portfolio','notion','corporate'].includes(resume.settings.templateId)} onChange={(e) => handleSettingChange('layout', e.target.value)} className={`${INPUT} w-full disabled:opacity-50`}>
              <option value="single">Single Column</option>
              <option value="two-column">Two-Column Grid</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-600 font-bold">Typography Font</label>
            <select value={resume.settings.fontFamily} onChange={(e) => handleSettingChange('fontFamily', e.target.value)} className={`${INPUT} w-full`}>
              <option value="inter">Inter (Modern Clean)</option>
              <option value="sans">System Sans-Serif</option>
              <option value="outfit">Outfit (Display Elegant)</option>
              <option value="serif">Georgia (Classic Serif)</option>
              <option value="playfair">Playfair Display (Premium)</option>
              <option value="mono">Fira Code (Developer)</option>
            </select>
          </div>
          
          <NumberStepper 
            label="Base Font" 
            min={8} max={30} 
            value={typeof resume.settings.fontSize === 'number' ? resume.settings.fontSize : (resume.settings.fontSize === 'sm' ? 12 : resume.settings.fontSize === 'lg' ? 16 : 14)} 
            onChange={(v) => handleSettingChange('fontSize', v)} 
          />
          <NumberStepper 
            label="Heading Size" 
            min={8} max={40} 
            value={resume.settings.headingSize || (typeof resume.settings.fontSize === 'number' ? resume.settings.fontSize : 14)} 
            onChange={(v) => handleSettingChange('headingSize', v)} 
          />
          <NumberStepper 
            label="Content Size" 
            min={8} max={30} 
            value={resume.settings.contentSize || (typeof resume.settings.fontSize === 'number' ? resume.settings.fontSize : 14)} 
            onChange={(v) => handleSettingChange('contentSize', v)} 
          />
          <NumberStepper 
            label="Page Spacing" 
            min={0} max={30} 
            value={resume.settings.spacing !== undefined ? resume.settings.spacing : (resume.settings.margins === 'sm' ? 10 : resume.settings.margins === 'lg' ? 18 : 14)} 
            onChange={(v) => handleSettingChange('spacing', v)} 
          />
          <div className="flex flex-col gap-1 xl:col-span-1 justify-end">
            <button 
              type="button" 
              onClick={() => {
                onChange({
                  ...resume,
                  settings: {
                    ...resume.settings,
                    fontSize: 14,
                    headingSize: 14,
                    contentSize: 14,
                    spacing: 14,
                  }
                });
              }}
              className="h-8 border border-orange-200 bg-white hover:bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <RotateCcw size={12} /> Reset Sizes
            </button>
          </div>
        </div>

        {resume.settings.templateId !== 'ats' && (
          <div className="flex flex-col gap-2 border-t border-orange-200 pt-3">
            <label className="text-xs font-bold text-slate-600">Brand Accent Color</label>
            <div className="flex flex-wrap items-center gap-3">
              {themeColors.map(col => (
                <button key={col.name} onClick={() => handleSettingChange('themeColor', col.hex)} className="h-6 w-6 rounded-full border-2 border-black/10 transition-all flex items-center justify-center cursor-pointer shadow hover:scale-110 active:scale-95" style={{ backgroundColor: col.hex }} aria-label={`Select ${col.name}`}>
                  {resume.settings.themeColor === col.hex && <Check size={12} strokeWidth={4} className="text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-orange-200 pt-3 text-xs">
          <div className="flex justify-between items-center font-bold text-slate-700">
            <span>AI Page Spacing Utilization</span>
            <span className={calculatePageFullness() >= 60 ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}>
              {calculatePageFullness()}% {calculatePageFullness() >= 60 ? 'Balanced' : 'Underutilized'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-orange-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${calculatePageFullness() >= 60 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${calculatePageFullness()}%` }} />
          </div>
          {calculatePageFullness() < 60 ? (
            <div className="bg-orange-100 border border-orange-200 p-3 rounded-xl flex flex-col gap-2 mt-1">
              <span className="text-[10px] text-slate-600 leading-relaxed">⚠️ <strong>Page Space Underutilized</strong>: Your resume has sparse details. Recipient portals prefer a balanced, visually complete single page.</span>
              <button type="button" onClick={handleAutoFillPage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-[10.5px] transition-all flex items-center justify-center gap-1 shadow hover:scale-[1.01]">
                <Sparkles size={12} /> AI Auto-Fill Empty Space
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] text-slate-600">🎉 Page is beautifully filled and balanced!</span>
              <button type="button" onClick={handleAutoFillPage} className="text-[10.5px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer">
                <Sparkles size={11} /> Enrich Spacing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== SCROLLABLE FORM ACCORDIONS ===== */}
      <div className="flex flex-col gap-4">

        {/* AI TARGET ROLE & ATS BOOSTER */}
        <div className="border border-indigo-200 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 dark:border-indigo-800 relative mb-2 text-xs">
          <button type="button" onClick={() => toggleAccordion('atsBooster')} className="w-full flex items-center justify-between font-bold text-sm text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-indigo-500 animate-pulse" />
              <span>AI Target Role &amp; ATS Booster</span>
            </div>
            {activeAccordion === 'atsBooster' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {activeAccordion === 'atsBooster' && (
            <div className="flex flex-col gap-4 text-xs text-left mt-4">
              <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Select your target job role below. Our AI checker will audit your active resume fields, isolate keyword gaps, and automatically inject metric-driven improvements to guarantee you pass ATS scanners!</p>
              <div className="flex flex-col gap-1.5 font-bold">
                <label className="text-slate-700 dark:text-slate-300">Target Professional Role</label>
                <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500 cursor-pointer">
                  <option value="software_engineer">Software Engineer / Web Developer</option>
                  <option value="frontend_engineer">Frontend Developer</option>
                  <option value="backend_engineer">Backend Developer</option>
                  <option value="business_analyst">Business &amp; Financial Analyst</option>
                  <option value="marketing_manager">Digital Marketing Specialist</option>
                </select>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Active Match Rate</span>
                  <span className={`text-xl font-black mt-0.5 ${atsScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{atsScore}%</span>
                  <span className="text-[9px] text-slate-500 font-bold mt-1">{atsScore >= 80 ? '🎉 Scanner Green-Pass secured!' : '⚠️ Missing crucial keywords.'}</span>
                </div>
                <button type="button" onClick={handleBoostATS} disabled={isBoosting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50">
                  <Sparkles size={13} className={isBoosting ? 'animate-spin' : ''} />
                  {isBoosting ? 'Optimizing CV...' : 'Auto-Boost ATS Score'}
                </button>
              </div>
              {missingKeywords.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Detected Keyword Gaps ({missingKeywords.length})</span>
                  <div className="flex flex-wrap gap-1">
                    {missingKeywords.map((kw, i) => <span key={i} className="bg-rose-100 text-rose-600 text-[8.5px] px-2 py-0.5 rounded-md font-bold border border-rose-200">{kw}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 1. PERSONAL INFORMATION */}
        <div className={SECTION}>
          <SectionToggle id="personalInfo" label="Personal Information" icon={User} />
          {activeAccordion === 'personalInfo' && (
            <div className="grid grid-cols-2 gap-3 text-xs mt-4">
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="font-bold text-slate-600">Full Name</label>
                <input type="text" placeholder="Alex Morgan" value={resume.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Professional Title</label>
                <input type="text" placeholder="Senior Full Stack Software Engineer" value={resume.personalInfo.title} onChange={(e) => handlePersonalInfoChange('title', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Email Address</label>
                <input type="email" placeholder="alex@example.com" value={resume.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Phone Number</label>
                <input type="text" placeholder="+1 (555) 019-2834" value={resume.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Location (City, State)</label>
                <input type="text" placeholder="New York, NY" value={resume.personalInfo.location} onChange={(e) => handlePersonalInfoChange('location', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Personal Website URL</label>
                <input type="text" placeholder="https://alexmorgan.dev" value={resume.personalInfo.website} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">GitHub Profile URL</label>
                <input type="text" placeholder="https://github.com/alex" value={resume.personalInfo.github} onChange={(e) => handlePersonalInfoChange('github', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="font-bold text-slate-600">LinkedIn Profile URL</label>
                <input type="text" placeholder="https://linkedin.com/in/alex" value={resume.personalInfo.linkedin} onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 border-t border-orange-200 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-600">Profile Image URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold">Show Photo</span>
                    <input type="checkbox" checked={resume.personalInfo.showPhoto} onChange={(e) => handlePersonalInfoChange('showPhoto', e.target.checked)} className="cursor-pointer" />
                  </div>
                </div>
                <input type="text" placeholder="https://images.unsplash.com/photo-..." value={resume.personalInfo.photoUrl} disabled={!resume.personalInfo.showPhoto} onChange={(e) => handlePersonalInfoChange('photoUrl', e.target.value)} className={`${INPUT} disabled:opacity-40`} />
              </div>
            </div>
          )}
        </div>

        {/* 2. PROFESSIONAL SUMMARY */}
        <div className={SECTION}>
          <SectionToggle id="summary" label="Professional Summary" icon={AlignLeft} />
          {activeAccordion === 'summary' && resume.visibleSections.summary !== false && (
            <div className="flex flex-col gap-3 text-xs mt-4">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Professional Summary</span>
                <button type="button" onClick={handleSummaryAIImprove} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                  <Sparkles size={11} /> AI Improve
                </button>
              </div>
              <textarea rows={5} placeholder="Write a 2-3 sentence professional summary highlighting your top skills and career goals..." value={resume.summary} onChange={(e) => updateSection('summary', e.target.value)} className={`${INPUT} resize-none`} />
              <p className="text-[9.5px] text-slate-500 font-medium">💡 Keep it under 150 words. Focus on measurable achievements and top skills.</p>
            </div>
          )}
        </div>

        {/* 3. WORK EXPERIENCE */}
        <div className={SECTION}>
          <SectionToggle id="experience" label="Work Experience" icon={Briefcase} />
          {activeAccordion === 'experience' && resume.visibleSections.experience !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.experience.map((exp, index) => (
                <div key={exp.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Experience #{index + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveExperience(index, 'up')} disabled={index === 0} className="text-slate-400 hover:text-indigo-600 disabled:opacity-30"><ArrowUp size={12} /></button>
                      <button type="button" onClick={() => moveExperience(index, 'down')} disabled={index === resume.experience.length - 1} className="text-slate-400 hover:text-indigo-600 disabled:opacity-30"><ArrowDown size={12} /></button>
                      <button type="button" onClick={() => deleteExperience(exp.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Company Name</label><input type="text" placeholder="Google LLC" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Job Title</label><input type="text" placeholder="Software Engineer II" value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Location</label><input type="text" placeholder="San Francisco, CA" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Start Date</label><input type="month" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-600">End Date</label>
                      <input type="month" value={exp.current ? '' : exp.endDate} disabled={exp.current} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} className={`${INPUT} disabled:opacity-50`} />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <input type="checkbox" id={`current_${exp.id}`} checked={exp.current} onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)} className="cursor-pointer" />
                      <label htmlFor={`current_${exp.id}`} className="font-bold text-slate-600 cursor-pointer">Currently Working Here</label>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="font-bold text-slate-600">Job Description / Achievements</label>
                        <button type="button" onClick={() => handleExperienceAIImprove(exp.id, exp.description)} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-[10px] font-bold"><Sparkles size={10} /> AI Enhance</button>
                      </div>
                      <textarea rows={4} placeholder="- Led development of scalable microservices...&#10;- Reduced latency by 40% through optimization..." value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} className={`${INPUT} resize-none`} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addExperience} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Work Experience
              </button>
            </div>
          )}
        </div>

        {/* 4. EDUCATION */}
        <div className={SECTION}>
          <SectionToggle id="education" label="Education" icon={GraduationCap} />
          {activeAccordion === 'education' && resume.visibleSections.education !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Education Details</span>
                    <button type="button" onClick={() => deleteEducation(edu.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 col-span-2"><label className="font-bold text-slate-600">Institution Name</label><input type="text" placeholder="Massachusetts Institute of Technology" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Degree</label><input type="text" placeholder="Bachelor of Science" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Field of Study</label><input type="text" placeholder="Computer Science" value={edu.field} onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Start Date</label><input type="month" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">End Date</label><input type="month" value={edu.current ? '' : edu.endDate} disabled={edu.current} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} className={`${INPUT} disabled:opacity-50`} /></div>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="checkbox" checked={edu.current} onChange={(e) => handleEducationChange(edu.id, 'current', e.target.checked)} className="cursor-pointer" />
                      <label className="font-bold text-slate-600 cursor-pointer">Currently Studying</label>
                    </div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">GPA (Optional)</label><input type="text" placeholder="3.92 / 4.0" value={edu.gpa} onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)} className={INPUT} /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEducation} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* 5. PROJECTS */}
        <div className={SECTION}>
          <SectionToggle id="projects" label="Projects" icon={Code} />
          {activeAccordion === 'projects' && resume.visibleSections.projects !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Project Details</span>
                    <button type="button" onClick={() => deleteProject(proj.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Project Name</label><input type="text" placeholder="E-Commerce Platform" value={proj.name} onChange={(e) => handleProjectChange(proj.id, 'name', e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Description</label><textarea rows={3} placeholder="Describe what the project does and what impact it had..." value={proj.description} onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)} className={`${INPUT} resize-none`} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Tech Stack (comma-separated)</label><input type="text" placeholder="React, Node.js, MongoDB, AWS" value={proj.technologies.join(', ')} onChange={(e) => handleProjectTechTagsChange(proj.id, e.target.value)} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Project / GitHub Link</label><input type="text" placeholder="https://github.com/username/project" value={proj.link} onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)} className={INPUT} /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addProject} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Project
              </button>
            </div>
          )}
        </div>

        {/* 6. SKILLS */}
        <div className={SECTION}>
          <SectionToggle id="skills" label="Skills" icon={Shield} />
          {activeAccordion === 'skills' && resume.visibleSections.skills !== false && (
            <div className="flex flex-col gap-4 text-xs mt-4">
              <div className="grid grid-cols-2 gap-3 border border-orange-200 p-4 rounded-xl bg-orange-50/50">
                <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Skill Name</label><input type="text" placeholder="React.js" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} className={INPUT} /></div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-600">Category</label>
                  <select value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} className={INPUT}>
                    <option>Frontend</option><option>Backend</option><option>Database</option><option>DevOps</option><option>Mobile</option><option>Design</option><option>Core Competency</option><option>Other</option>
                  </select>
                </div>
                {resume.settings.templateId === 'creative' && (
                  <div className="flex flex-col gap-1 col-span-2">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wide"><span>Proficiency Level</span><span>{newSkillLevel} / 5</span></div>
                    <input type="range" min="1" max="5" value={newSkillLevel} onChange={(e) => setNewSkillLevel(Number(e.target.value))} className="w-full accent-indigo-600 h-1.5 rounded-lg cursor-pointer mt-1" />
                  </div>
                )}
              </div>
              <button type="button" onClick={addSkill} className="self-end bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow">
                <Plus size={14} /> Add Skill Tag
              </button>
              <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
                {resume.skills.map((skill) => (
                  <span key={skill.id} className="bg-orange-100 border border-orange-300 text-orange-800 font-bold pl-3 pr-2.5 py-1 rounded-full text-[10.5px] inline-flex items-center gap-1.5 group">
                    <span>{skill.name}</span>
                    <span className="text-[9px] font-bold px-1.5 bg-orange-200 rounded-full text-orange-600">{skill.category.substring(0, 4)}</span>
                    <button type="button" onClick={() => deleteSkill(skill.id)} className="p-0.5 rounded-full text-orange-400 hover:text-rose-600"><Trash2 size={10.5} /></button>
                  </span>
                ))}
                {resume.skills.length === 0 && <p className="text-[10px] text-slate-500 italic w-full text-center py-2">No skills added yet.</p>}
              </div>
            </div>
          )}
        </div>

        {/* 7. CERTIFICATIONS */}
        <div className={SECTION}>
          <SectionToggle id="certifications" label="Certifications" icon={Award} />
          {activeAccordion === 'certifications' && resume.visibleSections.certifications !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Cert Details</span>
                    <button type="button" onClick={() => updateSection('certifications', resume.certifications.filter(c => c.id !== cert.id))} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 col-span-2"><label className="font-bold text-slate-600">Certification Name</label><input type="text" placeholder="AWS Certified Solutions Architect" value={cert.name} onChange={(e) => updateSection('certifications', resume.certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Issuer</label><input type="text" placeholder="Amazon Web Services" value={cert.issuer} onChange={(e) => updateSection('certifications', resume.certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Issued Date</label><input type="month" value={cert.date} onChange={(e) => updateSection('certifications', resume.certifications.map(c => c.id === cert.id ? { ...c, date: e.target.value } : c))} className={INPUT} /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addCertification} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Certification
              </button>
            </div>
          )}
        </div>

        {/* 8. ACHIEVEMENTS */}
        <div className={SECTION}>
          <SectionToggle id="achievements" label="Achievements" icon={Award} />
          {activeAccordion === 'achievements' && resume.visibleSections.achievements !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.achievements.map((ach) => (
                <div key={ach.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Achievement</span>
                    <button type="button" onClick={() => updateSection('achievements', resume.achievements.filter(a => a.id !== ach.id))} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 col-span-2"><label className="font-bold text-slate-600">Achievement Title</label><input type="text" placeholder="1st Place - Hackathon 2024" value={ach.title} onChange={(e) => updateSection('achievements', resume.achievements.map(a => a.id === ach.id ? { ...a, title: e.target.value } : a))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Date</label><input type="month" value={ach.date} onChange={(e) => updateSection('achievements', resume.achievements.map(a => a.id === ach.id ? { ...a, date: e.target.value } : a))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1 col-span-2"><label className="font-bold text-slate-600">Description</label><textarea rows={2} placeholder="Describe the achievement and its impact..." value={ach.description} onChange={(e) => updateSection('achievements', resume.achievements.map(a => a.id === ach.id ? { ...a, description: e.target.value } : a))} className={`${INPUT} resize-none`} /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addAchievement} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Achievement
              </button>
            </div>
          )}
        </div>

        {/* 9. LANGUAGES */}
        <div className={SECTION}>
          <SectionToggle id="languages" label="Languages" icon={Globe} />
          {activeAccordion === 'languages' && resume.visibleSections.languages !== false && (
            <div className="flex flex-col gap-4 text-xs mt-4">
              <div className="border border-orange-200 p-4 rounded-xl bg-orange-50/50">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Language</label><input type="text" placeholder="Spanish" value={newLangName} onChange={(e) => setNewLangName(e.target.value)} className={INPUT} /></div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Proficiency</label>
                    <select value={newLangProf} onChange={(e) => setNewLangProf(e.target.value)} className={INPUT}>
                      <option value="Native / Bilingual">Native / Bilingual</option>
                      <option value="Fluent / Full Professional">Fluent / Full Professional</option>
                      <option value="Professional Working">Professional Working</option>
                      <option value="Limited Working / Conversational">Conversational</option>
                      <option value="Beginner / Elementary">Beginner</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={addLanguage} className="mt-3 self-end bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow">
                  <Plus size={14} /> Add Language
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.languages.map((lang) => (
                  <span key={lang.id} className="bg-orange-100 border border-orange-300 text-orange-800 font-bold pl-3 pr-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                    <span>{lang.name} • <span className="text-orange-600">{lang.proficiency}</span></span>
                    <button type="button" onClick={() => updateSection('languages', resume.languages.filter(l => l.id !== lang.id))} className="text-orange-400 hover:text-rose-600 p-0.5 rounded-full"><Trash2 size={11} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 10. HOBBIES */}
        <div className={SECTION}>
          <SectionToggle id="hobbies" label="Hobbies & Interests" icon={Heart} />
          {activeAccordion === 'hobbies' && resume.visibleSections.hobbies !== false && (
            <div className="flex flex-col gap-4 text-xs mt-4">
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. Open Source, Photography" value={newHobby} onChange={(e) => setNewHobby(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addHobbyTag()} className={`${INPUT} flex-1`} />
                <button type="button" onClick={addHobbyTag} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow shrink-0"><Plus size={14} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.hobbies.map((hobby, i) => (
                  <span key={i} className="bg-orange-100 border border-orange-300 text-orange-800 font-bold pl-3 pr-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                    {hobby}
                    <button type="button" onClick={() => updateSection('hobbies', resume.hobbies.filter((_, idx) => idx !== i))} className="text-orange-400 hover:text-rose-600"><Trash2 size={10} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 11. REFERENCES */}
        <div className={SECTION}>
          <SectionToggle id="references" label="Professional References" icon={Users} />
          {activeAccordion === 'references' && resume.visibleSections.references !== false && (
            <div className="flex flex-col gap-5 text-xs mt-4">
              {resume.references.map((ref) => (
                <div key={ref.id} className="border border-orange-200 p-4 rounded-xl flex flex-col gap-3 bg-orange-50/50">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-1.5">
                    <span className="font-extrabold text-[10px] uppercase text-indigo-600">Reference</span>
                    <button type="button" onClick={() => updateSection('references', resume.references.filter(r => r.id !== ref.id))} className="text-slate-400 hover:text-rose-500"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Reference Name</label><input type="text" placeholder="Sarah Jenkins" value={ref.name} onChange={(e) => updateSection('references', resume.references.map(r => r.id === ref.id ? { ...r, name: e.target.value } : r))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Job Position</label><input type="text" placeholder="Engineering Director" value={ref.title} onChange={(e) => updateSection('references', resume.references.map(r => r.id === ref.id ? { ...r, title: e.target.value } : r))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Company</label><input type="text" placeholder="InnovateTech Systems" value={ref.company} onChange={(e) => updateSection('references', resume.references.map(r => r.id === ref.id ? { ...r, company: e.target.value } : r))} className={INPUT} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Contact (Email/Phone)</label><input type="text" placeholder="sarah.jenkins@company.dev" value={ref.contact} onChange={(e) => updateSection('references', resume.references.map(r => r.id === ref.id ? { ...r, contact: e.target.value } : r))} className={INPUT} /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addReference} className="w-full py-2.5 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-50 text-orange-500 font-bold transition-colors">
                <Plus size={14} /> Add Reference
              </button>
            </div>
          )}
        </div>

        {/* 12. CUSTOM SECTIONS */}
        {(resume.customSections || []).map((customSection) => (
          <div key={customSection.id} className={SECTION}>
            <div className="flex justify-between items-center bg-indigo-50/50 p-4 border-b border-indigo-100 cursor-pointer" onClick={() => toggleAccordion(customSection.id)}>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={customSection.sectionTitle} 
                  onChange={(e) => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, sectionTitle: e.target.value } : sec))}
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-sm text-slate-700 bg-transparent border-b border-transparent hover:border-indigo-300 focus:border-indigo-600 focus:outline-none transition-colors w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={(e) => { e.stopPropagation(); updateSection('customSections', resume.customSections.filter(sec => sec.id !== customSection.id)); }} className="text-slate-400 hover:text-rose-500"><Trash2 size={16} /></button>
                {activeAccordion === customSection.id ? <ChevronUp className="text-indigo-600" size={20} /> : <ChevronDown className="text-slate-400 group-hover:text-indigo-600" size={20} />}
              </div>
            </div>
            
            {activeAccordion === customSection.id && (
              <div className="p-4 bg-white flex flex-col gap-5 text-xs">
                {customSection.items.map((item) => (
                  <div key={item.id} className="border border-indigo-100 p-4 rounded-xl flex flex-col gap-3 bg-white shadow-sm relative group">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, items: sec.items.filter(i => i.id !== item.id) } : sec))} className="text-slate-400 hover:text-rose-500 bg-white shadow-sm rounded-full p-1 border"><Trash2 size={12} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Title</label><input type="text" placeholder="e.g. Volunteer Firefighter" value={item.title} onChange={(e) => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, items: sec.items.map(i => i.id === item.id ? { ...i, title: e.target.value } : i) } : sec))} className={INPUT} /></div>
                      <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Subtitle</label><input type="text" placeholder="e.g. Community Department" value={item.subtitle} onChange={(e) => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, items: sec.items.map(i => i.id === item.id ? { ...i, subtitle: e.target.value } : i) } : sec))} className={INPUT} /></div>
                      <div className="flex flex-col gap-1"><label className="font-bold text-slate-600">Date</label><input type="text" placeholder="2022 - Present" value={item.date} onChange={(e) => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, items: sec.items.map(i => i.id === item.id ? { ...i, date: e.target.value } : i) } : sec))} className={INPUT} /></div>
                      <div className="flex flex-col gap-1 col-span-2"><label className="font-bold text-slate-600">Description</label><textarea rows={3} placeholder="Describe your roles, responsibilities, or impact..." value={item.description} onChange={(e) => updateSection('customSections', resume.customSections.map(sec => sec.id === customSection.id ? { ...sec, items: sec.items.map(i => i.id === item.id ? { ...i, description: e.target.value } : i) } : sec))} className={`${INPUT} resize-none`} /></div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addCustomSectionItem(customSection.id)} className="w-full py-2.5 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center gap-1.5 hover:bg-indigo-50 text-indigo-600 font-bold transition-colors">
                  <Plus size={14} /> Add Item to {customSection.sectionTitle}
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 flex justify-center pb-8">
          <button type="button" onClick={addCustomSection} className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-300 flex items-center gap-2 transition-colors shadow-sm">
            <PlusCircle size={16} /> Add Custom Section
          </button>
        </div>

      </div>
    </div>
  );
};
