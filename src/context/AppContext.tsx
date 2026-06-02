import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resume, User, CoverLetter, ATSScoreReport, Review } from '../types';
import { calculateATSScore } from '../data/mockAI';
import { supabase } from '../lib/supabase';

// Helper templates
export const DEFAULT_PRELOADED_RESUME: Resume = {
  id: 'alex-morgan-software',
  title: 'Alex Morgan - Tech Resume',
  updatedAt: new Date().toLocaleDateString(),
  personalInfo: {
    name: 'Alex Morgan',
    title: 'Senior Full Stack Software Engineer',
    email: 'alex.morgan@resume9.ai',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    github: 'https://github.com/alexmorgan',
    linkedin: 'https://linkedin.com/in/alexmorgan-dev',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces&q=80',
    showPhoto: true
  },
  summary: 'Innovative and results-driven Senior Full Stack Engineer...',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
  internships: [],
  languages: [],
  hobbies: [],
  references: [],
  customSections: [],
  sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'projects', 'skills', 'certifications', 'achievements', 'internships', 'languages', 'hobbies', 'references', 'customSections'],
  visibleSections: {
    personalInfo: true, summary: true, experience: true, education: true, projects: true, skills: true, certifications: true, achievements: true, internships: true, languages: true, hobbies: true, references: true, customSections: true
  },
  settings: {
    templateId: 'modern', fontFamily: 'outfit', fontSize: 'md', themeColor: '#4f46e5', margins: 'md', layout: 'two-column'
  }
};

const BLANK_RESUME_TEMPLATE = (title: string, templateId: string = 'ats'): Resume => ({
  id: `resume_${Date.now()}`,
  title: title,
  updatedAt: new Date().toLocaleDateString(),
  personalInfo: { name: '', title: '', email: '', phone: '', location: '', website: '', github: '', linkedin: '', photoUrl: '', showPhoto: false },
  summary: '', experience: [], education: [], projects: [], skills: [], certifications: [], achievements: [], internships: [], languages: [], hobbies: [], references: [], customSections: [],
  sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'projects', 'skills', 'certifications', 'achievements', 'internships', 'languages', 'hobbies', 'references', 'customSections'],
  visibleSections: { personalInfo: true, summary: true, experience: true, education: true, projects: true, skills: true, certifications: false, achievements: false, internships: false, languages: false, hobbies: false, references: false, customSections: true },
  settings: { templateId: templateId, fontFamily: 'inter', fontSize: 'md', themeColor: '#1e293b', margins: 'md', layout: 'single' }
});

interface AppContextType {
  user: User | null;
  resumes: Resume[];
  activeResumeId: string | null;
  activeResume: Resume | null;
  coverLetters: CoverLetter[];
  theme: 'light' | 'dark';
  isLoading: boolean;
  reviews: Review[];
  scoreHistory: Record<string, number[]>;
  branding: { primaryColor: string; font: string };
  history: { path: string; timestamp: number }[];
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  signUp: (name: string, email: string, pass: string) => Promise<{ success: boolean; needsEmailVerification: boolean }>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
  updateUserPremium: (isPremium: boolean) => void;
  createNewResume: (title: string, templateId?: string) => Promise<string>;
  importResume: (resumeData: Partial<Resume> & { title: string }) => Promise<string>;
  updateResume: (id: string, updatedResume: Resume) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  duplicateResume: (id: string) => Promise<void>;
  setActiveResumeId: (id: string | null) => void;
  saveCoverLetter: (letter: Omit<CoverLetter, 'id' | 'date'>) => string;
  deleteCoverLetter: (id: string) => void;
  addScoreToHistory: (resumeId: string, score: number) => void;
  addHistory: (path: string) => void;
  setBranding: (color: string, font: string) => void;
  addReview: (rating: number, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scoreHistory, setScoreHistory] = useState<Record<string, number[]>>({});
  const [branding, setBrandingState] = useState({ primaryColor: '#4f46e5', font: 'inter' });
  const [history, setHistory] = useState<{ path: string; timestamp: number }[]>([]);

  // 1. Initial State Loading from Supabase
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const metadata = session.user.user_metadata || {};
        
        setUser({
          id: session.user.id,
          name: profile?.name || metadata.full_name || metadata.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || profile?.email || '',
          avatar: profile?.avatar_url || metadata.avatar_url || metadata.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
          role: profile?.role || 'user',
          isPremium: false
        });

        // Fetch user resumes
        const { data: userResumes } = await supabase.from('resumes').select('*').order('created_at', { ascending: false });
        if (userResumes && userResumes.length > 0) {
          const parsedResumes = userResumes.map(r => ({ ...r.data, id: r.id }));
          setResumes(parsedResumes);
          setActiveResumeId(parsedResumes[0].id);
        }
      }

      setIsLoading(false);
    };

    fetchSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const metadata = session.user.user_metadata || {};
        
        setUser({
          id: session.user.id,
          name: profile?.name || metadata.full_name || metadata.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || profile?.email || '',
          avatar: profile?.avatar_url || metadata.avatar_url || metadata.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
          role: profile?.role || 'user',
          isPremium: false
        });
        
        // Fetch resumes on sign in
        const { data: userResumes } = await supabase.from('resumes').select('*').order('created_at', { ascending: false });
        if (userResumes && userResumes.length > 0) {
          const parsedResumes = userResumes.map(r => ({ ...r.data, id: r.id }));
          setResumes(parsedResumes);
          setActiveResumeId(parsedResumes[0].id);
        } else {
          setResumes([]);
          setActiveResumeId(null);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setResumes([]);
        setActiveResumeId(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Synchronize theme class list on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Auth Operations
  const login = async (email: string, pass: string): Promise<boolean> => {

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      console.error(error);
      throw error;
    }
    return true;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      console.error('Error logging in with Google:', error.message);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, pass: string): Promise<{ success: boolean; needsEmailVerification: boolean }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name: name,
        }
      }
    });
    if (error) {
      console.error(error);
      throw error;
    }
    
    const needsEmailVerification = !!data.user && !data.session;
    return { success: true, needsEmailVerification };
  };

  const logout = async () => {
    setUser(null);
    setResumes([]);
    setActiveResumeId(null);
    await supabase.auth.signOut().catch(e => console.log('Silent logout error:', e));
  };

  const toggleTheme = () => {};

  const updateUserPremium = (isPremium: boolean) => {
    if (!user) return;
    setUser({ ...user, isPremium });
  };

  // Resume Collection Actions (Supabase)
  const createNewResume = async (title: string, templateId: string = 'ats'): Promise<string> => {
    if (!user) throw new Error("Must be logged in");
    const newResumeData = BLANK_RESUME_TEMPLATE(title, templateId);
    
    // Create placeholder ID for optimistic UI
    const tempId = `temp_${Date.now()}`;
    const optimisticResume = { ...newResumeData, id: tempId };
    
    setResumes([...resumes, optimisticResume]);
    setActiveResumeId(tempId);

    // Save to DB
    const { data, error } = await supabase.from('resumes').insert({
      user_id: user.id,
      title: title,
      data: newResumeData
    }).select().single();

    if (error) throw error;

    // Update with real ID
    const realResume = { ...newResumeData, id: data.id };
    setResumes(prev => prev.map(r => r.id === tempId ? realResume : r));
    setActiveResumeId(data.id);
    return data.id;
  };

  const importResume = async (importedData: Partial<Resume> & { title: string }): Promise<string> => {
    if (!user) throw new Error("Must be logged in");
    const template = BLANK_RESUME_TEMPLATE(importedData.title, importedData.settings?.templateId || 'ats');
    
    const mergedData = { ...template, ...importedData };
    
    const { data, error } = await supabase.from('resumes').insert({
      user_id: user.id,
      title: importedData.title,
      data: mergedData
    }).select().single();

    if (error) throw error;

    const realResume = { ...mergedData, id: data.id };
    setResumes([...resumes, realResume]);
    setActiveResumeId(data.id);
    return data.id;
  };

  const updateResume = async (id: string, updatedResume: Resume) => {
    // Optimistic UI update
    setResumes(prev => prev.map(r => r.id === id ? updatedResume : r));
    
    if (id.startsWith('temp_')) return; // Don't sync temp IDs
    
    // DB sync
    const { error } = await supabase.from('resumes').update({
      title: updatedResume.title,
      data: updatedResume,
      updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) console.error("Failed to update resume in DB:", error);
  };

  const deleteResume = async (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    if (activeResumeId === id) {
      setActiveResumeId(resumes.length > 1 ? resumes.find(r => r.id !== id)?.id || null : null);
    }
    
    if (!id.startsWith('temp_')) {
      await supabase.from('resumes').delete().eq('id', id);
    }
  };

  const duplicateResume = async (id: string) => {
    if (!user) return;
    const target = resumes.find(r => r.id === id);
    if (!target) return;

    const duplicateData = { ...JSON.parse(JSON.stringify(target)), title: `${target.title} (Copy)` };
    
    const { data, error } = await supabase.from('resumes').insert({
      user_id: user.id,
      title: duplicateData.title,
      data: duplicateData
    }).select().single();

    if (error) throw error;

    const realResume = { ...duplicateData, id: data.id };
    setResumes([...resumes, realResume]);
    setActiveResumeId(data.id);
  };

  // Remaining mock logic for non-critical features
  const saveCoverLetter = (letter: Omit<CoverLetter, 'id' | 'date'>) => 'fake-id';
  const deleteCoverLetter = (id: string) => {};
  const addScoreToHistory = (resumeId: string, score: number) => {};
  const addHistory = (path: string) => {};
  const setBranding = (color: string, font: string) => {};
  const addReview = (rating: number, text: string) => {};

  const activeResume = resumes.find(r => r.id === activeResumeId) || null;

  return (
    <AppContext.Provider
      value={{
        user, resumes, activeResumeId, activeResume, coverLetters, theme, isLoading, reviews, scoreHistory, branding, history,
        login, loginWithGoogle, signUp, logout, toggleTheme, updateUserPremium, createNewResume, importResume, updateResume, deleteResume, duplicateResume, setActiveResumeId, saveCoverLetter, deleteCoverLetter, addScoreToHistory, addHistory, setBranding, addReview
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};
