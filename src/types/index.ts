export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  photoUrl: string;
  showPhoto: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1 to 5 (or percentage)
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g. Native, Fluent, Professional, Conversational
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ResumeSettings {
  templateId: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'playfair' | 'outfit' | 'inter';
  fontSize: number | 'sm' | 'md' | 'lg';
  headingSize?: number;
  contentSize?: number;
  spacing?: number;
  themeColor: string; // e.g. '#2563eb' (hex code)
  margins: 'sm' | 'md' | 'lg';
  layout: 'single' | 'two-column';
}

export interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  internships: Internship[];
  languages: Language[];
  hobbies: string[];
  references: Reference[];
  customSections: CustomSection[];
  sectionOrder: string[]; // for reordering sections
  visibleSections: Record<string, boolean>; // toggle section visibility
  settings: ResumeSettings;
  // Added fields for premium suite
  history?: Resume[]; // snapshot history for versioning
  branding?: {
    logo?: string; // base64 data URL of uploaded logo
    primaryColor?: string; // hex code for brand accent
  };
  darkMode?: boolean; // UI dark‑mode flag
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  premiumExpires?: string;
}

export interface CoverLetter {
  id: string;
  resumeId: string;
  recipientName: string;
  companyName: string;
  position: string;
  jobDescription: string;
  content: string;
  date: string;
}

export interface ATSScoreReport {
  score: number;
  strengths: string[];
  improvements: string[];
  details: {
    contactInfo: { score: number; feedback: string };
    skillsScore: { score: number; feedback: string };
    experienceScore: { score: number; feedback: string };
    projectsScore: { score: number; feedback: string };
    formattingScore: { score: number; feedback: string };
  };
}

export interface JobMatchReport {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestedSkills: string[];
  improvements: string[];
}

export interface Review {
  id: string;
  userName: string;
  userRole: string;
  avatar: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
}
