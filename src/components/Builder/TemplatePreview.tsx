import React from 'react';
import { Resume } from '../../types';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Star } from 'lucide-react';

interface TemplatePreviewProps {
  resume: Resume;
  zoomScale: number;
}

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ resume, zoomScale }) => {
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements, internships, languages, hobbies, references, sectionOrder, visibleSections, settings } = resume;

  // Outer sizing wrapper compensates for the CSS scale transform so the scroll
  // container reserves the correct visible (post-scale) dimensions.
  const wrapperStyle: React.CSSProperties = {
    width: `${A4_WIDTH * zoomScale}px`,
    minHeight: `${A4_HEIGHT * zoomScale}px`,
    position: 'relative',
    flexShrink: 0,
  };

  // The inner card is full A4 size, then scaled down via transform.
  const cardScaleStyle: React.CSSProperties = {
    transform: `scale(${zoomScale})`,
    transformOrigin: 'top left',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  // Font Family Mappings
  const fontClass = {
    sans: 'font-sans',
    inter: 'font-sans tracking-tight',
    outfit: 'font-display',
    serif: 'font-serif',
    playfair: 'font-serif tracking-wide',
    mono: 'font-mono text-xs'
  }[settings.fontFamily] || 'font-sans';

  // Margins padding size
  const marginClass = {
    sm: 'p-6 gap-4',
    md: 'p-10 gap-6',
    lg: 'p-14 gap-8'
  }[settings.margins] || 'p-10';

  // Section Spacings
  const itemSpacing = {
    sm: 'space-y-1.5',
    md: 'space-y-3.5',
    lg: 'space-y-5'
  }[settings.margins] || 'space-y-3.5';

  const themeHexColor = settings.themeColor;

  // Visual helper components
  const SectionHeader = ({ title, showLine = true, light = false }: { title: string; showLine?: boolean; light?: boolean }) => {
    if (settings.templateId === 'ats') {
      return (
        <div className="border-b-2 border-slate-900 pb-1 mb-2 mt-4">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-900">{title}</h3>
        </div>
      );
    }

    if (settings.templateId === 'executive') {
      return (
        <div className="flex items-center gap-3 mb-2 mt-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-800" style={{ color: themeHexColor }}>{title}</h3>
          <div className="flex-grow h-[1px] bg-slate-200" />
        </div>
      );
    }

    if (settings.templateId === 'minimalist') {
      return (
        <div className="border-b border-slate-200 pb-1 mb-2 mt-4 text-left">
          <h3 className="text-[11px] font-medium uppercase tracking-widest text-slate-600">{title}</h3>
        </div>
      );
    }

    if (settings.templateId === 'timeline') {
      return (
        <div className="flex items-center gap-2 mb-3 mt-4 text-left">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: themeHexColor }} />
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-850" style={{ color: themeHexColor }}>{title}</h3>
          <div className="flex-grow h-[1px] bg-slate-100" />
        </div>
      );
    }

    if (settings.templateId === 'sidebar-split') {
      if (light) {
        return (
          <div className="flex flex-col gap-1 mb-2.5 mt-3 text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/95">{title}</h3>
            <div className="h-[1px] w-full rounded bg-white/20" />
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-1 mb-2.5 mt-3 text-left">
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-800" style={{ color: themeHexColor }}>{title}</h3>
          <div className="h-[1.5px] w-full rounded" style={{ backgroundColor: `${themeHexColor}20` }} />
        </div>
      );
    }

    if (settings.templateId === 'harvard') {
      return (
        <div className="border-b-[1.5px] border-black pb-0.5 mb-2 mt-4 text-center">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">{title}</h3>
        </div>
      );
    }

    if (settings.templateId === 'startup') {
      return (
        <div className="flex flex-col gap-0.5 mb-2.5 mt-4">
          <h3 className="text-[12px] font-black uppercase tracking-wider text-slate-800">{title}</h3>
          <div className="h-[3px] w-12 rounded-full" style={{ backgroundColor: themeHexColor }} />
        </div>
      );
    }

    if (settings.templateId === 'software') {
      return (
        <div className="border-b border-slate-300 pb-0.5 mb-2.5 mt-4 text-left">
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-900">{title}</h3>
        </div>
      );
    }

    if (settings.templateId === 'elegant') {
      return (
        <div className="flex flex-col items-center gap-1.5 mb-4 mt-5">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.15em]" style={{ color: themeHexColor }}>{title}</h3>
          <div className="h-[1px] w-24 bg-slate-300" />
        </div>
      );
    }

    if (settings.templateId === 'portfolio') {
      return (
        <div className="flex flex-col gap-1 mb-3 mt-5 text-left">
          <h3 className="text-[14px] font-black uppercase tracking-tight text-slate-900">{title}</h3>
          <div className="h-[4px] w-8 rounded-full" style={{ backgroundColor: themeHexColor }} />
        </div>
      );
    }

    if (settings.templateId === 'notion') {
      return (
        <div className="mb-2 mt-4 text-left">
          <h3 className="text-[13px] font-bold text-slate-900">{title}</h3>
        </div>
      );
    }

    if (settings.templateId === 'corporate') {
      return (
        <div className="border-b-[1.5px] border-slate-800 pb-0.5 mb-2 mt-4 text-left">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900">{title}</h3>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 mb-3 mt-4">
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeHexColor }}>{title}</h3>
        {showLine && <div className="h-[2px] w-full rounded" style={{ backgroundColor: `${themeHexColor}25` }} />}
      </div>
    );
  };

  // Contacts panel
  const ContactLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-600 dark:text-slate-500 font-medium ${vertical ? 'flex-col gap-1.5' : 'items-center justify-center'}`}>
      {personalInfo.email && (
        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
          <Mail size={11} className="text-slate-400" /> {personalInfo.email}
        </a>
      )}
      {personalInfo.phone && (
        <span className="flex items-center gap-1">
          <Phone size={11} className="text-slate-400" /> {personalInfo.phone}
        </span>
      )}
      {personalInfo.location && (
        <span className="flex items-center gap-1">
          <MapPin size={11} className="text-slate-400" /> {personalInfo.location}
        </span>
      )}
      {personalInfo.website && (
        <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
          <Globe size={11} className="text-slate-400" /> {personalInfo.website.replace(/^https?:\/\//, '')}
        </a>
      )}
      {personalInfo.github && (
        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
          <Github size={11} className="text-slate-400" /> {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
        </a>
      )}
      {personalInfo.linkedin && (
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
          <Linkedin size={11} className="text-slate-400" /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
        </a>
      )}
    </div>
  );

  // Sub-render methods for sections
  const renderSummary = () => {
    if (!summary || !visibleSections.summary) return null;
    return (
      <div className="w-full">
        <SectionHeader title="Professional Summary" showLine={false} />
        {settings.templateId === 'executive' ? (
          <div className="border-l-4 pl-4 py-1 italic text-xs leading-relaxed text-slate-700 bg-slate-50 border-indigo-600 rounded-r-xl" style={{ borderColor: themeHexColor }}>
            {summary}
          </div>
        ) : (
          <p className="text-[11px] text-slate-750 leading-relaxed text-justify">{summary}</p>
        )}
      </div>
    );
  };

  const renderExperience = () => {
    const list = experience;
    if (list.length === 0 || !visibleSections.experience) return null;

    if (settings.templateId === 'timeline') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Professional Experience" />
          <div className="relative border-l border-dashed border-slate-300 pl-5 ml-2.5 space-y-4">
            {list.map((exp) => (
              <div key={exp.id} className="relative flex flex-col">
                <div 
                  className="absolute -left-[25.5px] top-1 h-3 w-3 rounded-full border-2 bg-white transition-colors" 
                  style={{ borderColor: themeHexColor }}
                />
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div>
                    <h4 className="text-[11.5px] font-bold text-slate-900 leading-tight">{exp.position}</h4>
                    <span className="text-[9.5px] font-semibold text-slate-600">{exp.company} &bull; {exp.location}</span>
                  </div>
                  <span className="text-[9.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-[10px] text-slate-750 leading-relaxed mt-1.5 whitespace-pre-line text-justify pl-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'minimalist') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Professional Experience" />
          <div className="space-y-4">
            {list.map((exp) => (
              <div key={exp.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] font-bold text-slate-900">{exp.position}</span>
                    <span className="text-[9px] text-slate-400">|</span>
                    <span className="text-[10px] font-medium text-slate-600">{exp.company}</span>
                    {exp.location && (
                      <>
                        <span className="text-[9px] text-slate-400">&bull;</span>
                        <span className="text-[9px] text-slate-400 italic">{exp.location}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[9px] font-semibold text-slate-500 tracking-wider uppercase">
                    {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-[10px] text-slate-700 leading-relaxed mt-1.5 whitespace-pre-line text-justify pl-2 border-l border-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'harvard') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Professional Experience" />
          <div className="space-y-3.5">
            {list.map((exp) => (
              <div key={exp.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-black">{exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                  <span className="text-[10px] text-black">
                    {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-[10.5px] italic text-black">{exp.position}</span>
                </div>
                <p className="text-[10.5px] text-black leading-relaxed mt-1 whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'notion') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Experience" />
          <div className="space-y-4 border-l-2 border-slate-200 pl-3 ml-1">
            {list.map((exp) => (
              <div key={exp.id} className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-[11.5px] font-bold text-slate-900">{exp.position}</h4>
                  <span className="text-[10.5px] font-medium text-slate-600">at {exp.company}</span>
                </div>
                <span className="text-[9.5px] font-medium text-slate-500 mt-0.5">
                  {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate} {exp.location ? `• ${exp.location}` : ''}
                </span>
                <p className="text-[10px] text-slate-700 leading-relaxed mt-1.5 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'corporate') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {list.map((exp) => (
              <div key={exp.id} className="flex flex-col border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase">{exp.company}</h4>
                  <span className="text-[9.5px] font-bold text-slate-700">
                    {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-[10.5px] font-semibold italic text-slate-800">{exp.position}</span>
                  {exp.location && <span className="text-[9px] text-slate-500">{exp.location}</span>}
                </div>
                <p className="text-[10px] text-slate-700 leading-normal mt-1 whitespace-pre-line pl-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'software') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {list.map((exp) => (
              <div key={exp.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-[11.5px] font-bold text-slate-900">{exp.position}</h4>
                  <span className="text-[10px] font-bold text-slate-600 tracking-wider">
                    {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-[10.5px] font-semibold" style={{ color: themeHexColor }}>{exp.company}</span>
                  {exp.location && <span className="text-[9.5px] text-slate-500 italic">{exp.location}</span>}
                </div>
                <p className="text-[10.5px] text-slate-750 leading-relaxed mt-1.5 whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <SectionHeader title="Professional Experience" />
        <div className={itemSpacing}>
          {list.map((exp) => (
            <div key={exp.id} className="flex flex-col text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[11.5px] font-bold text-slate-900 leading-tight">{exp.position}</h4>
                  <span className="text-[10px] font-semibold text-slate-600">{exp.company} &bull; {exp.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 flex-shrink-0">
                  {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-[10.5px] text-slate-700 leading-normal mt-1.5 whitespace-pre-line pl-2 border-l border-slate-200">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    const list = education;
    if (list.length === 0 || !visibleSections.education) return null;

    if (settings.templateId === 'timeline') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Education" />
          <div className="relative border-l border-dashed border-slate-300 pl-5 ml-2.5 space-y-4">
            {list.map((edu) => (
              <div key={edu.id} className="relative flex flex-col">
                <div 
                  className="absolute -left-[25.5px] top-1 h-3 w-3 rounded-full border-2 bg-white transition-colors" 
                  style={{ borderColor: themeHexColor }}
                />
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div>
                    <h4 className="text-[11.5px] font-bold text-slate-900 leading-tight">
                      {edu.degree} in {edu.field}
                    </h4>
                    <span className="text-[9.5px] font-semibold text-slate-600">{edu.institution} &bull; {edu.location}</span>
                  </div>
                  <div className="text-right text-[9px] font-semibold text-slate-500 flex flex-col items-end">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">{edu.startDate} &mdash; {edu.current ? 'Present' : edu.endDate}</span>
                    {edu.gpa && <p className="font-bold mt-0.5" style={{ color: themeHexColor }}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-normal pl-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'minimalist') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {list.map((edu) => (
              <div key={edu.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] font-bold text-slate-900">{edu.degree} in {edu.field}</span>
                    <span className="text-[9px] text-slate-400">|</span>
                    <span className="text-[10px] font-semibold text-slate-600">{edu.institution}</span>
                    {edu.location && <span className="text-[9px] text-slate-400 italic">({edu.location})</span>}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-500 tracking-wider uppercase flex gap-1.5 items-center">
                    <span>{edu.startDate} &mdash; {edu.current ? 'Present' : edu.endDate}</span>
                    {edu.gpa && <span className="text-slate-800 font-bold bg-slate-100 px-1.5 py-0.5 rounded">GPA {edu.gpa}</span>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-normal pl-2 border-l border-slate-100">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'harvard') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Education" />
          <div className="space-y-3.5">
            {list.map((edu) => (
              <div key={edu.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-black">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                  <span className="text-[10px] text-black">
                    {edu.startDate} &mdash; {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-[10.5px] italic text-black">{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span className="text-[10px] text-black">GPA: {edu.gpa}</span>}
                </div>
                {edu.description && (
                  <p className="text-[10.5px] text-black leading-relaxed mt-1 whitespace-pre-line text-justify">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <SectionHeader title="Education" />
        <div className={itemSpacing}>
          {list.map((edu) => (
            <div key={edu.id} className="flex flex-col text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                    {edu.degree} in {edu.field}
                  </h4>
                  <span className="text-[9.5px] font-semibold text-slate-600">{edu.institution} &bull; {edu.location}</span>
                </div>
                <div className="text-right text-[9.5px] font-semibold text-slate-500">
                  <span>{edu.startDate} &mdash; {edu.current ? 'Present' : edu.endDate}</span>
                  {edu.gpa && <p className="text-indigo-600 mt-0.5" style={{ color: themeHexColor }}>GPA: {edu.gpa}</p>}
                </div>
              </div>
              {edu.description && (
                <p className="text-[10px] text-slate-600 mt-1 leading-normal pl-2 border-l border-slate-100">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    const list = projects;
    if (list.length === 0 || !visibleSections.projects) return null;

    if (settings.templateId === 'minimalist') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Key Projects" />
          <div className="space-y-3">
            {list.map((proj) => (
              <div key={proj.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[9px] font-medium text-slate-400 hover:text-indigo-600 ml-1.5 hover:underline">
                        [Link]
                      </a>
                    )}
                  </h4>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <span className="text-[8.5px] font-semibold text-slate-500 tracking-wide uppercase">
                      {proj.technologies.slice(0, 4).join('  /  ')}
                    </span>
                  )}
                </div>
                <p className="text-[9.5px] text-slate-700 leading-relaxed mt-1">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'software') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {list.map((proj) => (
              <div key={proj.id} className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-[11.5px] font-bold text-slate-900 flex items-center gap-1.5">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[9px] font-mono text-indigo-600 hover:underline">
                        [Repository/Live]
                      </a>
                    )}
                  </h4>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <span className="text-[9px] font-mono text-slate-600 italic">
                      {proj.technologies.slice(0, 5).join(' | ')}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-750 leading-relaxed mt-1">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <SectionHeader title="Key Projects" />
        <div className={itemSpacing}>
          {list.map((proj) => (
            <div key={proj.id} className="flex flex-col text-left">
              <div className="flex items-start justify-between">
                <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                  {proj.name} 
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[9.5px] font-medium text-slate-400 hover:text-indigo-600 ml-1.5 hover:underline">
                      [Link]
                    </a>
                  )}
                </h4>
              </div>
              <p className="text-[10px] text-slate-700 leading-relaxed mt-1">
                {proj.description}
              </p>
              {proj.technologies && proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {proj.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded text-[8px] border border-slate-300/40">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    const list = skills;
    if (list.length === 0 || !visibleSections.skills) return null;
    
    // Group skills by category if any category is written
    const categories = list.reduce((acc, skill) => {
      const cat = skill.category || 'Core Technologies';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {} as Record<string, typeof list>);

    if (settings.templateId === 'minimalist') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Technical Competencies" />
          <div className="flex flex-col gap-2 text-[10px] text-slate-755">
            {Object.entries(categories).map(([cat, skillsList]) => (
              <div key={cat} className="flex items-start gap-3">
                <span className="font-bold text-slate-900 min-w-[125px] max-w-[125px] shrink-0 uppercase tracking-wider text-[8.5px] mt-0.5">{cat}:</span>
                <span className="text-slate-700">{skillsList.map(s => s.name).join('   •   ')}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'software') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Technical Skills" />
          <div className="flex flex-col gap-1.5 text-[10.5px]">
            {Object.entries(categories).map(([cat, skillsList]) => (
              <div key={cat} className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[120px] shrink-0">{cat}:</span>
                <span className="text-slate-700 font-mono text-[9.5px] leading-relaxed">
                  {skillsList.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (settings.templateId === 'portfolio') {
      return (
        <div className="w-full text-left">
          <SectionHeader title="Skills & Expertise" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {list.map((skill) => (
              <div key={skill.id} className="flex flex-col gap-1 text-[10px]">
                <div className="flex justify-between items-center font-bold text-slate-800">
                  <span>{skill.name}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(20, skill.level * 20)}%`, backgroundColor: themeHexColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <SectionHeader title="Technical Competencies" />
        {settings.templateId === 'ats' ? (
          <div className="text-[10px] text-slate-800 leading-relaxed text-left">
            {Object.entries(categories).map(([cat, skillsList]) => (
              <p key={cat} className="mb-1">
                <strong className="text-slate-900">{cat}:</strong> {skillsList.map(s => s.name).join(', ')}
              </p>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {Object.entries(categories).map(([cat, skillsList]) => (
              <div key={cat} className="flex flex-col">
                <h5 className="text-[10.5px] font-bold text-slate-800 border-b border-slate-100 pb-0.5 mb-1.5">{cat}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill) => (
                    <span key={skill.id} className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-100/50 text-slate-800 font-medium px-2.5 py-0.5 rounded-full text-[9px] border border-slate-200/50">
                      {skill.name}
                      {settings.templateId === 'creative' && (
                        <div className="flex gap-0.5 ml-1">
                          {[...Array(5)].map((_, idx) => (
                            <div key={idx} className={`h-1.5 w-1.5 rounded-full ${idx < skill.level ? 'bg-indigo-600' : 'bg-slate-300'}`} style={{ backgroundColor: idx < skill.level ? themeHexColor : undefined }} />
                          ))}
                        </div>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCertifications = () => {
    const list = certifications;
    if (list.length === 0 || !visibleSections.certifications) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="Certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {list.map((cert) => (
            <div key={cert.id} className="text-xs">
              <h4 className="text-[10.5px] font-bold text-slate-900 leading-tight">
                {cert.name}
              </h4>
              <p className="text-[9.5px] text-slate-500 font-medium mt-0.5">
                {cert.issuer} &bull; {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    const list = achievements;
    if (list.length === 0 || !visibleSections.achievements) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="Achievements & Awards" />
        <div className="flex flex-col gap-2">
          {list.map((ach) => (
            <div key={ach.id} className="text-[10px]">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{ach.title}</span>
                <span className="text-slate-500 font-medium">{ach.date}</span>
              </div>
              {ach.description && <p className="text-slate-650 leading-relaxed mt-0.5">{ach.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInternships = () => {
    const list = internships;
    if (list.length === 0 || !visibleSections.internships) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="Internship History" />
        <div className={itemSpacing}>
          {list.map((item) => (
            <div key={item.id} className="text-[10.5px]">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{item.role}</h4>
                  <span className="text-[9.5px] font-semibold text-slate-600">{item.company}</span>
                </div>
                <span className="text-[9.5px] font-semibold text-slate-500">
                  {item.startDate} &mdash; {item.current ? 'Present' : item.endDate}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed mt-1 pl-2 border-l border-slate-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLanguages = () => {
    const list = languages;
    if (list.length === 0 || !visibleSections.languages) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="Languages" />
        <div className="flex flex-wrap gap-4">
          {list.map((lang) => (
            <div key={lang.id} className="text-[10px] flex items-center gap-1.5">
              <strong className="text-slate-900">{lang.name}:</strong>
              <span className="text-slate-500 font-medium">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHobbies = () => {
    const list = hobbies;
    if (list.length === 0 || !visibleSections.hobbies) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="Hobbies & Interests" />
        <p className="text-[10px] text-slate-700 leading-relaxed">{list.join(', ')}</p>
      </div>
    );
  };

  const renderReferences = () => {
    const list = references;
    if (list.length === 0 || !visibleSections.references) return null;
    return (
      <div className="w-full text-left">
        <SectionHeader title="References" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {list.map((ref) => (
            <div key={ref.id} className="text-[10px]">
              <h4 className="font-bold text-slate-900">{ref.name}</h4>
              <p className="text-slate-500 font-medium">{ref.title} &bull; {ref.company}</p>
              {ref.contact && <p className="text-indigo-600 mt-0.5" style={{ color: themeHexColor }}>{ref.contact}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomSections = () => {
    const list = resume.customSections || [];
    if (list.length === 0 || !visibleSections.customSections) return null;
    return (
      <div className="w-full text-left">
        {list.map((customSec) => (
          <div key={customSec.id} className="w-full mb-6">
            <SectionHeader title={customSec.sectionTitle} />
            <div className={itemSpacing}>
              {customSec.items.map((item) => (
                <div key={item.id} className="flex flex-col text-left">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[11.5px] font-bold text-slate-900 leading-tight">{item.title}</h4>
                      {item.subtitle && <span className="text-[10px] font-semibold text-slate-600">{item.subtitle}</span>}
                    </div>
                    {item.date && (
                      <span className="text-[10px] font-semibold text-slate-500 flex-shrink-0">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[10.5px] text-slate-700 leading-normal mt-1.5 whitespace-pre-line pl-2 border-l border-slate-200">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Section Selector Dispatch
  const renderSection = (secId: string) => {
    switch (secId) {
      case 'summary': return renderSummary();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'projects': return renderProjects();
      case 'skills': return renderSkills();
      case 'certifications': return renderCertifications();
      case 'achievements': return renderAchievements();
      case 'internships': return renderInternships();
      case 'languages': return renderLanguages();
      case 'hobbies': return renderHobbies();
      case 'references': return renderReferences();
      case 'customSections': return renderCustomSections();
      default: return null;
    }
  };

  // Layout templates dispatching
  const renderTwoColumnLayout = () => (
    <div className="grid grid-cols-12 gap-8 items-start">
      {/* Sidebar - 4 Cols */}
      <div className="col-span-4 flex flex-col gap-6 text-left border-r border-slate-100 pr-6">
        
        {/* Contact panel */}
        <div>
          <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Connect</h5>
          <ContactLinks vertical={true} />
        </div>

        {/* Skills sidebar */}
        {visibleSections.skills && skills.length > 0 && (
          <div>
            <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">Skills</h5>
            <div className="flex flex-col gap-2.5">
              {skills.map(s => (
                <div key={s.id} className="flex flex-col gap-1 text-[10px]">
                  <span className="font-semibold text-slate-800">{s.name}</span>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.level * 20}%`, backgroundColor: themeHexColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages sidebar */}
        {visibleSections.languages && languages.length > 0 && (
          <div>
            <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Languages</h5>
            <div className="flex flex-col gap-1.5 text-[10px]">
              {languages.map(l => (
                <p key={l.id}><strong className="text-slate-800">{l.name}:</strong> <span className="text-slate-500">{l.proficiency}</span></p>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies sidebar */}
        {visibleSections.hobbies && hobbies.length > 0 && (
          <div>
            <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Interests</h5>
            <p className="text-[9.5px] text-slate-650 leading-relaxed">{hobbies.join(', ')}</p>
          </div>
        )}
      </div>

      {/* Main Bar - 8 Cols */}
      <div className="col-span-8 flex flex-col gap-6 text-left">
        {sectionOrder
          .filter(secId => secId !== 'personalInfo' && secId !== 'skills' && secId !== 'languages' && secId !== 'hobbies')
          .map(secId => renderSection(secId))}
      </div>
    </div>
  );

  const renderSingleColumnLayout = () => {
    let order = sectionOrder.filter(secId => secId !== 'personalInfo');
    
    if (settings.templateId === 'software') {
      const softwareOrder = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'internships', 'languages', 'achievements', 'hobbies', 'references', 'customSections'];
      order = softwareOrder.filter(id => order.includes(id));
      order = [...order, ...sectionOrder.filter(id => !softwareOrder.includes(id) && id !== 'personalInfo')];
    }

    return (
      <div className="flex flex-col gap-5">
        {order.map(secId => renderSection(secId))}
      </div>
    );
  };

  const renderSidebarSplitFullDocument = () => {
    const sidebarBg = themeHexColor;
    
    return (
      <div 
        id="printable-resume-card"
        className={`relative bg-white text-slate-800 shadow-2xl border border-slate-200 select-none text-left flex ${fontClass}`}
        style={{ 
          width: `${A4_WIDTH}px`,
          minHeight: `${A4_HEIGHT}px`,
          height: 'auto',
          fontFamily: settings.fontFamily === 'outfit' ? 'Outfit, sans-serif' : undefined
        }}
      >
        {/* Left Column Sidebar - 1/3 (width: 264px) */}
        <div 
          className="w-[264px] shrink-0 text-white flex flex-col p-8"
          style={{ backgroundColor: sidebarBg, minHeight: `${A4_HEIGHT}px` }}
        >
          <div className="flex flex-col gap-6">
            {/* Photo inside Sidebar */}
            {personalInfo.showPhoto && personalInfo.photoUrl && (
              <div className="flex justify-center mb-2">
                <img 
                  src={personalInfo.photoUrl} 
                  alt="" 
                  className="h-28 w-28 rounded-full border-4 object-cover shadow-lg border-white/20"
                />
              </div>
            )}
            
            {/* Personal info summary inside Sidebar */}
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-lg font-black tracking-tight text-white uppercase">{personalInfo.name || 'YOUR NAME'}</h2>
              {personalInfo.title && <h3 className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-snug">{personalInfo.title}</h3>}
            </div>

            {/* Contact panel in Sidebar */}
            <div>
              <SectionHeader title="Contact" light={true} />
              <div className="flex flex-col gap-2.5 text-[9.5px] text-white/90 font-medium">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline">
                    <Mail size={11} className="text-white/60 shrink-0" /> <span className="truncate">{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <Phone size={11} className="text-white/60 shrink-0" /> {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <MapPin size={11} className="text-white/60 shrink-0" /> {personalInfo.location}
                  </span>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                    <Globe size={11} className="text-white/60 shrink-0" /> <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                    <Github size={11} className="text-white/60 shrink-0" /> <span className="truncate">{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                    <Linkedin size={11} className="text-white/60 shrink-0" /> <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Skills sidebar in Sidebar */}
            {visibleSections.skills && skills.length > 0 && (
              <div>
                <SectionHeader title="Technical Skills" light={true} />
                <div className="flex flex-col gap-2">
                  {skills.map(s => (
                    <div key={s.id} className="flex flex-col gap-1 text-[9px]">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white">{s.name}</span>
                        <span className="text-white/60">{s.level * 20}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages sidebar in Sidebar */}
            {visibleSections.languages && languages.length > 0 && (
              <div>
                <SectionHeader title="Languages" light={true} />
                <div className="flex flex-col gap-1.5 text-[9.5px]">
                  {languages.map(l => (
                    <p key={l.id} className="flex justify-between text-white/95">
                      <span className="font-bold">{l.name}</span>
                      <span className="text-white/70">{l.proficiency}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hobbies in Sidebar */}
          {visibleSections.hobbies && hobbies.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 block mb-1">Interests</span>
              <p className="text-[9px] text-white/80 leading-relaxed">{hobbies.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Right Column Body - 2/3 (width: 530px) */}
        <div className="flex-grow flex flex-col p-9 gap-5 overflow-hidden">
          
          {/* Header Name block in Main Body if NO photo exists in sidebar */}
          {(!personalInfo.showPhoto || !personalInfo.photoUrl) && (
            <div className="border-b pb-4 flex flex-col gap-1" style={{ borderBottomColor: `${themeHexColor}15` }}>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: themeHexColor }}>{personalInfo.name || 'YOUR NAME'}</h1>
              {personalInfo.title && <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{personalInfo.title}</h2>}
            </div>
          )}

          {/* Render right-column segments dynamically from sectionOrder */}
          <div className="flex flex-col gap-4">
            {sectionOrder
              .filter(secId => secId !== 'personalInfo' && secId !== 'skills' && secId !== 'languages' && secId !== 'hobbies')
              .map(secId => renderSection(secId))}
          </div>
        </div>
        
        {/* Visual Page Break Guides inside editor - hidden during print */}
        {[1123, 2246, 3369].map((breakPx, i) => (
          <div
            key={breakPx}
            className="absolute left-0 right-0 border-t border-dashed border-indigo-500/50 print:hidden flex justify-center select-none pointer-events-none"
            style={{ top: `${breakPx}px` }}
          >
            <span className="bg-indigo-600 text-white font-bold px-2.5 py-0.5 rounded text-[8px] -translate-y-1/2 uppercase tracking-widest shadow-md">
              Page {i + 1} Ends · Page {i + 2} Begins
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderFontSizeStyles = () => {
    // 1. Content Scale
    let contentScale = 1;
    if (settings.contentSize !== undefined) {
      contentScale = settings.contentSize / 14;
    } else if (typeof settings.fontSize === 'number') {
      contentScale = settings.fontSize / 14;
    } else if (settings.fontSize === 'sm') {
      contentScale = 0.9;
    } else if (settings.fontSize === 'lg') {
      contentScale = 1.1;
    }

    // 2. Heading Scale
    let headingScale = 1;
    if (settings.headingSize !== undefined) {
      headingScale = settings.headingSize / 14;
    } else {
      headingScale = contentScale;
    }

    // 3. Spacing Scale
    let spacingScale = 1;
    if (settings.spacing !== undefined) {
      spacingScale = settings.spacing / 14;
    } else {
      spacingScale = settings.margins === 'sm' ? 0.8 : settings.margins === 'lg' ? 1.2 : 1;
    }

    if (contentScale === 1 && headingScale === 1 && spacingScale === 1) return null;

    const classMappings: { size: number; classes: string[] }[] = [
      { size: 7.5, classes: ['text-\\[7\\.5px\\]'] },
      { size: 8, classes: ['text-\\[8px\\]'] },
      { size: 8.5, classes: ['text-\\[8\\.5px\\]'] },
      { size: 9, classes: ['text-\\[9px\\]'] },
      { size: 9.5, classes: ['text-\\[9\\.5px\\]'] },
      { size: 10, classes: ['text-\\[10px\\]'] },
      { size: 10.5, classes: ['text-\\[10\\.5px\\]'] },
      { size: 11, classes: ['text-\\[11px\\]'] },
      { size: 11.5, classes: ['text-\\[11\\.5px\\]'] },
      { size: 12, classes: ['text-\\[12px\\]', 'text-xs'] },
      { size: 13, classes: ['text-\\[13px\\]'] },
      { size: 14, classes: ['text-sm'] },
      { size: 16, classes: ['text-base'] },
      { size: 18, classes: ['text-lg'] },
      { size: 24, classes: ['text-xl'] },
      { size: 26, classes: ['text-\\[26px\\]'] },
      { size: 28, classes: ['text-2xl'] },
    ];

    let styles = '';

    // Content font sizes
    classMappings.forEach(mapping => {
      mapping.classes.forEach(cls => {
        styles += `#printable-resume-card .${cls} { font-size: ${mapping.size * contentScale}px !important; }\n`;
      });
    });

    // Heading font sizes
    classMappings.forEach(mapping => {
      mapping.classes.forEach(cls => {
        styles += `#printable-resume-card h1.${cls}, #printable-resume-card h2.${cls}, #printable-resume-card h3.${cls}, #printable-resume-card h4.${cls}, #printable-resume-card h5.${cls}, #printable-resume-card h6.${cls} { font-size: ${mapping.size * headingScale}px !important; }\n`;
        styles += `#printable-resume-card h1 .${cls}, #printable-resume-card h2 .${cls}, #printable-resume-card h3 .${cls}, #printable-resume-card h4 .${cls}, #printable-resume-card h5 .${cls}, #printable-resume-card h6 .${cls} { font-size: ${mapping.size * headingScale}px !important; }\n`;
      });
    });

    // Spacing classes
    if (spacingScale !== 1) {
      styles += `
        #printable-resume-card { --spacing-scale: ${spacingScale}; }
        #printable-resume-card .mb-0\\.5 { margin-bottom: calc(0.125rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-1 { margin-bottom: calc(0.25rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-1\\.5 { margin-bottom: calc(0.375rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-2 { margin-bottom: calc(0.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-2\\.5 { margin-bottom: calc(0.625rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-3 { margin-bottom: calc(0.75rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mb-4 { margin-bottom: calc(1rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-0\\.5 { margin-top: calc(0.125rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-1 { margin-top: calc(0.25rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-1\\.5 { margin-top: calc(0.375rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-2 { margin-top: calc(0.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-2\\.5 { margin-top: calc(0.625rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-3 { margin-top: calc(0.75rem * var(--spacing-scale)) !important; }
        #printable-resume-card .mt-4 { margin-top: calc(1rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-1 { gap: calc(0.25rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-1\\.5 { gap: calc(0.375rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-2 { gap: calc(0.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-2\\.5 { gap: calc(0.625rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-3 { gap: calc(0.75rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-4 { gap: calc(1rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-5 { gap: calc(1.25rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-6 { gap: calc(1.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .gap-8 { gap: calc(2rem * var(--spacing-scale)) !important; }
        #printable-resume-card .p-4 { padding: calc(1rem * var(--spacing-scale)) !important; }
        #printable-resume-card .p-5 { padding: calc(1.25rem * var(--spacing-scale)) !important; }
        #printable-resume-card .p-6 { padding: calc(1.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .p-10 { padding: calc(2.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .p-14 { padding: calc(3.5rem * var(--spacing-scale)) !important; }
        #printable-resume-card .space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: calc(0.375rem * var(--spacing-scale)) !important; }
        #printable-resume-card .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: calc(0.75rem * var(--spacing-scale)) !important; }
        #printable-resume-card .space-y-3\\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: calc(0.875rem * var(--spacing-scale)) !important; }
        #printable-resume-card .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: calc(1rem * var(--spacing-scale)) !important; }
        #printable-resume-card .space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: calc(1.25rem * var(--spacing-scale)) !important; }
      `;
    }

    return <style>{styles}</style>;
  };

  if (settings.templateId === 'sidebar-split') {
    return (
      <div className="print-wrapper" style={wrapperStyle}>
        {renderFontSizeStyles()}
        <div className="print-scale-container" style={cardScaleStyle}>
          {renderSidebarSplitFullDocument()}
        </div>
      </div>
    );
  }

  return (
    <div className="print-wrapper" style={wrapperStyle}>
      {renderFontSizeStyles()}
      <div className="print-scale-container" style={cardScaleStyle}>
        <div
          id="printable-resume-card"
          className={`relative bg-white text-slate-800 shadow-2xl border border-slate-200 select-none text-left flex flex-col ${fontClass}`}
          style={{
            width: `${A4_WIDTH}px`,
            minHeight: `${A4_HEIGHT}px`,
            height: 'auto',
            fontFamily: settings.fontFamily === 'outfit' ? 'Outfit, sans-serif' : undefined
          }}
        >
          {/* ── Template-specific accent elements ── */}
          {settings.templateId === 'modern' && (
            <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: themeHexColor }} />
          )}
          {settings.templateId === 'software' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900" />
          )}
          {settings.templateId === 'executive' && (
            <>
              <div className="absolute top-0 left-0 right-0 h-[6px]" style={{ backgroundColor: themeHexColor }} />
              <div className="absolute top-[6px] left-0 right-0 h-[2px] bg-slate-800/10" />
            </>
          )}

          {/* Main Core Document Container */}
          <div className={`flex flex-col w-full text-slate-800 ${marginClass}`} style={{ minHeight: `${A4_HEIGHT}px` }}>

            {/* ── Template Personal Info Headers ── */}

            {settings.templateId === 'harvard' ? (
              /* Harvard: classic centered, strict academic structure */
              <div className="text-center border-b-[1.5px] border-black pb-3 mb-2 flex flex-col gap-1.5 font-serif">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-black">{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && <h2 className="text-[11px] text-black font-semibold uppercase tracking-widest mt-0.5">{personalInfo.title}</h2>}
                <ContactLinks />
              </div>

            ) : settings.templateId === 'startup' ? (
              /* Startup: high impact modern banner */
              <div className="rounded-2xl mb-4 overflow-hidden shadow-sm" style={{ backgroundColor: themeHexColor }}>
                <div className="px-8 py-7 flex items-center justify-between">
                  <div className="text-white">
                    <h1 className="text-3xl font-black tracking-tight">{personalInfo.name || 'YOUR NAME'}</h1>
                    {personalInfo.title && <h2 className="text-[12px] font-bold text-white/80 uppercase tracking-widest mt-1">{personalInfo.title}</h2>}
                    <div className="mt-3">
                      <ContactLinks />
                    </div>
                  </div>
                  {personalInfo.showPhoto && personalInfo.photoUrl && (
                    <img src={personalInfo.photoUrl} alt="" className="h-20 w-20 rounded-xl object-cover border-4 border-white/20 shadow-md" />
                  )}
                </div>
              </div>

            ) : settings.templateId === 'elegant' ? (
              /* Elegant: beautiful centered with serif / whitespace */
              <div className="text-center pb-6 mb-2 flex flex-col items-center justify-center">
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <img src={personalInfo.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover mb-3" />
                )}
                <h1 className="text-3xl font-serif tracking-[0.1em] text-slate-800" style={{ color: themeHexColor }}>{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && <h2 className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em] mt-2 mb-3">{personalInfo.title}</h2>}
                <ContactLinks />
              </div>

            ) : settings.templateId === 'ats' ? (
              /* ATS: centered, plain, uppercase — max machine-readability */
              <div className="text-center border-b-2 border-slate-900 pb-3 flex flex-col gap-1.5">
                <h1 className="text-xl font-bold tracking-wide uppercase text-slate-900">{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && <h2 className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">{personalInfo.title}</h2>}
                <ContactLinks />
              </div>

            ) : settings.templateId === 'software' ? (
              /* Software Engineer: Clean FAANG-style header */
              <div className="flex flex-col items-center border-b pb-4 mb-3" style={{ borderBottomColor: `${themeHexColor}30` }}>
                <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-1">{personalInfo.name || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[10.5px] font-medium text-slate-700">
                  {personalInfo.email && (
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline hover:text-indigo-600 transition-colors flex items-center gap-1">
                      <Mail size={11} className="text-slate-400" /> {personalInfo.email}
                    </a>
                  )}
                  {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={11} className="text-slate-400" /> {personalInfo.phone}</span>}
                  {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={11} className="text-slate-400" /> {personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[10.5px] font-semibold mt-1.5" style={{ color: themeHexColor }}>
                  {personalInfo.github && (
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Github size={11} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Linkedin size={11} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                  {personalInfo.website && (
                    <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Globe size={11} /> {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  )}
                </div>
              </div>

            ) : settings.templateId === 'fresher' ? (
              /* Fresher: warm centered header with soft gradient band */
              <div className="text-center pb-4 mb-1" style={{ borderBottom: `2px solid ${themeHexColor}20` }}>
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <div className="flex justify-center mb-3">
                    <img src={personalInfo.photoUrl} alt="" className="h-20 w-20 rounded-full border-4 object-cover shadow-lg" style={{ borderColor: themeHexColor }} />
                  </div>
                )}
                <h1 className="text-2xl font-black tracking-tight text-slate-900">{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && (
                  <div className="inline-block mt-1 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: themeHexColor }}>
                    {personalInfo.title}
                  </div>
                )}
                <div className="mt-2.5">
                  <ContactLinks />
                </div>
              </div>

            ) : settings.templateId === 'executive' ? (
              /* Executive: formal double-ruled header with left-aligned gravitas */
              <div className="pb-4 mb-1 flex flex-col gap-1">
                <h1 className="text-[26px] font-black tracking-tight text-slate-900 leading-none">{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && (
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mt-1" style={{ color: themeHexColor }}>
                    {personalInfo.title}
                  </h2>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[3px] w-10 rounded" style={{ backgroundColor: themeHexColor }} />
                  <div className="h-[1px] flex-grow bg-slate-200" />
                </div>
                <div className="mt-2">
                  <ContactLinks />
                </div>
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <div className="absolute top-10 right-10">
                    <img src={personalInfo.photoUrl} alt="" className="h-20 w-20 rounded object-cover border border-slate-200 shadow" />
                  </div>
                )}
              </div>

            ) : settings.templateId === 'portfolio' ? (
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-end border-b-2 pb-4" style={{ borderColor: themeHexColor }}>
                  <div className="flex flex-col text-left">
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">{personalInfo.name || 'YOUR NAME'}</h1>
                    {personalInfo.title && (
                      <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: themeHexColor }}>
                        {personalInfo.title}
                      </h2>
                    )}
                  </div>
                  {personalInfo.showPhoto && personalInfo.photoUrl && (
                    <img src={personalInfo.photoUrl} alt="" className="h-20 w-20 rounded-2xl object-cover shadow-sm border border-slate-200" />
                  )}
                </div>
                <div className="bg-slate-900 text-white rounded-xl py-3 px-5 shadow-md">
                  <ContactLinks />
                </div>
              </div>

            ) : settings.templateId === 'notion' ? (
              <div className="flex flex-col pb-4 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-5">
                  {personalInfo.showPhoto && personalInfo.photoUrl && (
                    <img src={personalInfo.photoUrl} alt="" className="h-16 w-16 rounded object-cover shadow-sm border border-slate-200" />
                  )}
                  <div className="flex flex-col text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{personalInfo.name || 'YOUR NAME'}</h1>
                    {personalInfo.title && <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">{personalInfo.title}</h2>}
                  </div>
                </div>
                <div className="mt-4">
                  <ContactLinks />
                </div>
              </div>

            ) : settings.templateId === 'corporate' ? (
              <div className="flex flex-col items-center text-center pb-4 mb-2">
                <h1 className="text-[28px] font-bold uppercase tracking-widest text-slate-900">{personalInfo.name || 'YOUR NAME'}</h1>
                {personalInfo.title && <h2 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mt-1 mb-3">{personalInfo.title}</h2>}
                <div className="border-t-[1.5px] border-b-[1.5px] border-slate-800 py-2 w-full max-w-[85%] mx-auto">
                  <ContactLinks />
                </div>
              </div>

            ) : settings.templateId === 'creative' ? (
              /* Creative: asymmetric with photo */
              <div className="grid grid-cols-12 gap-6 items-center border-b pb-5" style={{ borderBottomColor: `${themeHexColor}20` }}>
                <div className="col-span-8 text-left">
                  <h1 className="text-2xl font-black tracking-tight" style={{ color: themeHexColor }}>{personalInfo.name || 'YOUR NAME'}</h1>
                  {personalInfo.title && <h2 className="text-xs font-semibold text-slate-500 mt-0.5 tracking-wider">{personalInfo.title}</h2>}
                  <div className="mt-3">
                    <ContactLinks vertical={false} />
                  </div>
                </div>
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <div className="col-span-4 flex justify-end">
                    <img src={personalInfo.photoUrl} alt="" className="h-20 w-20 rounded-full border-2 object-cover shadow-md" style={{ borderColor: themeHexColor }} />
                  </div>
                )}
              </div>

            ) : (
              /* Default / Modern: clean left-aligned header with optional photo */
              <div className="flex items-center justify-between border-b pb-5" style={{ borderBottomColor: `${themeHexColor}25` }}>
                <div className="text-left flex flex-col gap-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{personalInfo.name || 'YOUR NAME'}</h1>
                  {personalInfo.title && <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{personalInfo.title}</h2>}
                  <div className="mt-2.5">
                    <ContactLinks />
                  </div>
                </div>
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <img src={personalInfo.photoUrl} alt="" className="h-16 w-16 rounded-2xl object-cover shadow border border-slate-100" />
                )}
              </div>
            )}

            {/* Body layouts */}
            <div className="mt-4">
              {settings.layout === 'two-column' && settings.templateId !== 'ats'
                ? renderTwoColumnLayout()
                : renderSingleColumnLayout()}
            </div>

          </div>

          {/* Visual page-break guides (editor only, hidden when printing) */}
          {[1123, 2246, 3369].map((breakPx, i) => (
            <div
              key={breakPx}
              className="absolute left-0 right-0 border-t-2 border-dashed border-indigo-500/60 print:hidden flex justify-center select-none pointer-events-none"
              style={{ top: `${breakPx}px` }}
            >
              <span className="bg-indigo-600 text-white font-bold px-2.5 py-0.5 rounded text-[8px] -translate-y-1/2 uppercase tracking-widest shadow-md">
                Page {i + 1} ends • Page {i + 2} starts
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
 
