import { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { ResumeBuilder } from './components/Builder/ResumeBuilder';
import { ScoreChecker } from './components/ATS/ScoreChecker';
import { JobMatcher } from './components/ATS/JobMatcher';
import { CoverLetterGen } from './components/Dashboard/CoverLetterGen';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { calculateATSScore } from './data/mockAI';
import { TemplateGallery } from './components/TemplateGallery';
import { BlogIndex } from './components/Blog/BlogIndex';
import { BlogPost } from './components/Blog/BlogPost';

function App() {
  const { user, activeResumeId, resumes, setActiveResumeId } = useApp();
  const [activeView, setActiveView] = useState<string>('landing');
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string>('');

  // If a user logs in, automatically take them from landing to dashboard
  useEffect(() => {
    if (user && activeView === 'landing') {
      setActiveView('dashboard');
    } else if (!user && activeView !== 'landing') {
      setActiveView('landing');
    }
  }, [user]);

  // Handle active resume selections on view swaps
  useEffect(() => {
    if (resumes.length > 0 && !activeResumeId) {
      setActiveResumeId(resumes[0].id);
    }
  }, [resumes, activeResumeId]);

  const renderView = () => {
    switch (activeView) {
      case 'landing':
        return (
          <LandingPage 
            setActiveView={setActiveView} 
            openAuthModal={setAuthModalMode} 
          />
        );
      case 'dashboard':
        return <UserDashboard setActiveView={setActiveView} />;
      case 'builder':
        return <ResumeBuilder setActiveView={setActiveView} />;
      case 'ats':
        return <ScoreChecker setActiveView={setActiveView} />;
      case 'jobmatcher':
        return <JobMatcher setActiveView={setActiveView} />;
      case 'coverletter':
        return <CoverLetterGen setActiveView={setActiveView} />;
      case 'admin':
        if (user?.role === 'admin') {
          return <AdminDashboard setActiveView={setActiveView} />;
        }
        return <UserDashboard setActiveView={setActiveView} />;
      case 'gallery':
        return <TemplateGallery setActiveView={setActiveView} openAuthModal={setAuthModalMode} />;
      case 'blog':
        return <BlogIndex onOpenPost={(id) => { setSelectedPostId(id); setActiveView('post'); }} />;
      case 'post':
        return <BlogPost postId={selectedPostId} onBack={() => setActiveView('blog')} onCTA={() => { setActiveView('landing'); setAuthModalMode('login'); }} />;
      default:
        return (
          <LandingPage 
            setActiveView={setActiveView} 
            openAuthModal={setAuthModalMode} 
          />
        );
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView}
      openAuthModal={setAuthModalMode}
      authModalMode={authModalMode}
      setAuthModalMode={setAuthModalMode}
    >
      <div className="w-full h-full min-h-[calc(100vh-4rem)]">
        {renderView()}
      </div>
    </Layout>
  );
}

export default App;
