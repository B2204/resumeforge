import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, Sparkles, TrendingUp, Briefcase, MailOpen, Shield, 
  Menu, X, Sun, Moon, LogIn, LogOut, User as UserIcon, 
  Lock, Mail, Star, ChevronDown, Check, CreditCard, Sparkle, Laptop, LayoutGrid
} from 'lucide-react';
import { Logo, LogoWordmark } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  openAuthModal: (mode: 'login' | 'signup' | null) => void;
  authModalMode: 'login' | 'signup' | null;
  setAuthModalMode: (mode: 'login' | 'signup' | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  setActiveView,
  openAuthModal,
  authModalMode,
  setAuthModalMode
}) => {
  const { user, theme, toggleTheme, logout, login, loginWithGoogle, signUp, updateUserPremium } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<{ title: string; content: string } | null>(null);

  // Form states for login/signup
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccessMessage, setAuthSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMessage('');
    setIsSubmitting(true);
    console.log("Starting auth submit for mode:", authModalMode);

    try {
      if (authModalMode === 'login') {
        const success = await login(authEmail, authPassword);
        console.log("Login success:", success);
        if (success) {
          openAuthModal(null);
          setAuthEmail('');
          setAuthPassword('');
          if (activeView === 'landing') setActiveView('dashboard');
        } else {
          setAuthError('Invalid credentials.');
        }
      } else {
        if (!authName) {
          setAuthError('Name is required.');
          setIsSubmitting(false);
          return;
        }
        const result = await signUp(authName, authEmail, authPassword);
        console.log("Signup success:", result.success);
        if (result.success) {
          if (result.needsEmailVerification) {
            setAuthSuccessMessage('A verification link has been sent to your email address. Please click the link to verify your account before logging in.');
            setAuthEmail('');
            setAuthPassword('');
            setAuthName('');
            setAuthModalMode('login'); // Switch to login view to show success message
          } else {
            openAuthModal(null);
            setAuthName('');
            setAuthEmail('');
            setAuthPassword('');
            if (activeView === 'landing') setActiveView('dashboard');
          }
        } else {
          setAuthError('Sign up failed.');
        }
      }
    } catch (err: any) {
      console.error("Auth error caught:", err);
      let errMsg = 'An error occurred. Please try again.';
      if (err) {
        errMsg = err.message || err.toString() || errMsg;
      }
      setAuthError(errMsg);
    } finally {
      console.log("Auth submit finally block reached. Resetting isSubmitting.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setAuthError('Google login failed.');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, roles: ['user', 'admin'] },
    { id: 'builder', label: 'Resume Builder', icon: FileText, roles: ['user', 'admin'] },
    { id: 'gallery', label: 'Template Gallery', icon: LayoutGrid, roles: ['user', 'admin'] },
    { id: 'jobmatcher', label: 'Job Matcher', icon: Briefcase, roles: ['user', 'admin'] },
    { id: 'coverletter', label: 'Cover Letters', icon: MailOpen, roles: ['user', 'admin'] },
    { id: 'admin', label: 'Admin Portal', icon: Shield, roles: ['admin'] }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. Header Navbar */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            >
              <Menu size={24} />
            </button>
            <div 
              onClick={() => setActiveView('landing')} 
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              <div className="hidden sm:block">
                <LogoWordmark />
              </div>
            </div>
          </div>

          <nav className={`hidden md:flex items-center gap-2 p-2 rounded-[1.25rem] backdrop-blur-md border shadow-inner ${theme === 'dark' ? 'bg-[#151f32]/60 border-slate-800/50' : 'bg-slate-100/50 border-slate-200/50'}`}>
            <button 
              onClick={() => setActiveView('landing')} 
              className={`px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${activeView === 'landing' ? (theme === 'dark' ? 'bg-[#1e293b] text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50')}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveView('blog')} 
              className={`px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${activeView === 'blog' || activeView === 'post' ? (theme === 'dark' ? 'bg-[#1e293b] text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50')}`}
            >
              Blog
            </button>
            {user && (
              <>
                <button 
                  onClick={() => setActiveView('dashboard')} 
                  className={`px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${activeView === 'dashboard' ? (theme === 'dark' ? 'bg-[#1e293b] text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50')}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveView('builder')} 
                  className={`px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${activeView === 'builder' ? (theme === 'dark' ? 'bg-[#1e293b] text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50')}`}
                >
                  Builder
                </button>
              </>
            )}
            {!user && (
              <>
                <button 
                  onClick={() => setAuthModalMode('login')} 
                  className={`px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                >
                  Features
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">

            {/* Auth Session / Profile dropdown */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-9 w-9 rounded-xl border border-indigo-500/30 object-cover shadow"
                  />
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold leading-none">{user.name}</span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-3 w-52 rounded-2xl shadow-xl border p-2 flex flex-col gap-1 transition-all duration-300 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-850 text-slate-200' : 'bg-white border-slate-200 text-slate-850'}`}>
                    <div className="px-3 py-2 border-b border-slate-850 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setProfileDropdownOpen(false); setActiveView('dashboard'); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-indigo-600/10 hover:text-indigo-400 text-left transition-colors"
                    >
                      <TrendingUp size={16} /> My Dashboard
                    </button>
                    <button 
                      onClick={() => { setProfileDropdownOpen(false); logout(); setActiveView('landing'); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 text-left transition-colors"
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalMode('login')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                <LogIn size={16} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 2. Responsive Sidebar (Hidden on landing view) */}
        {user && activeView !== 'landing' && (
          <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:flex flex-col w-72 min-h-[calc(100vh-4rem)] border-r transition-colors duration-300 sticky top-16 ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="p-4 flex flex-col gap-1.5 flex-grow">
                {menuItems.filter(item => item.roles.includes(user.role)).map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                      }}
                      className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-600/5 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-850">
                <div className={`p-4 rounded-2xl flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 to-indigo-950/50 border border-indigo-500/10' : 'from-indigo-50 to-purple-50 border border-indigo-200'}`}>
                  <div className="flex items-center gap-2 text-indigo-500">
                    <Sparkle size={18} className="animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="font-display font-bold text-xs uppercase tracking-wider">AI Integration</span>
                  </div>
                  <h4 className="text-xs font-bold leading-tight">ATS Optimization Engine Active</h4>
                  <p className="text-[10.5px] text-slate-400 leading-normal">Score resumes instantly and receive detailed keyword summaries to boost hiring response rates by up to 30%.</p>
                </div>
              </div>


            </aside>

            {/* Mobile Drawer Sidebar */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                <div className={`relative flex flex-col w-72 max-w-xs h-full border-r p-6 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5">
                      <Logo className="h-8 w-8" />
                      <LogoWordmark className="scale-[0.85] origin-left" />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-800"><X size={20} /></button>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-grow">
                    {menuItems.filter(item => item.roles.includes(user.role)).map(item => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSidebarOpen(false);
                            setActiveView(item.id);
                          }}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                            isActive 
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                              : 'text-slate-400 hover:bg-indigo-600/5 hover:text-indigo-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{item.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* 3. Main Content Area */}
        <main className="flex-grow w-full overflow-hidden">
          {children}
        </main>
      </div>

      {/* 4. Footer on Landing Page */}
      {activeView === 'landing' && (
        <footer className={`relative z-10 border-t py-12 px-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0b101f] border-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-6 lg:mb-0">
                <Logo className="h-8 w-8" />
                <LogoWordmark className="scale-[0.85] origin-left" />
              </div>
              <p className="text-xs leading-relaxed">Create modern, professional, ATS-optimized resumes in minutes. Powered by mock AI matching technologies to land more dream interviews.</p>
            </div>
            <div>
              <h5 className="font-black text-sm text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider">Features</h5>
              <ul className="flex flex-col gap-2 text-xs font-medium">
                <li><button onClick={() => openAuthModal('signup')} className="hover:text-indigo-500 text-left transition-colors">Real-time ATS Scorer</button></li>
                <li><button onClick={() => openAuthModal('signup')} className="hover:text-indigo-500 text-left transition-colors">AI Bullet Rewrite</button></li>
                <li><button onClick={() => openAuthModal('signup')} className="hover:text-indigo-500 text-left transition-colors">Job Keyword Matching</button></li>
                <li><button onClick={() => openAuthModal('signup')} className="hover:text-indigo-500 text-left transition-colors">Cover Letter Generator</button></li>
                <li><button onClick={() => { setActiveView('blog'); window.scrollTo(0,0); }} className="hover:text-indigo-500 text-left transition-colors text-indigo-600">Career Blog</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-sm text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider">Company</h5>
              <ul className="flex flex-col gap-2 text-xs font-medium">
                <li><button onClick={() => setLegalModalContent({ title: 'About Us', content: "We are MyResume Assistant, a platform dedicated to making professional resume building accessible and optimized using smart analysis algorithms." })} className="hover:text-indigo-500 text-left transition-colors">About Us</button></li>
                <li><button onClick={() => setLegalModalContent({ title: 'Privacy Policy', content: 'Your privacy is important to us. We do not sell your personal data. All your resume data is securely stored locally and managed by you.' })} className="hover:text-indigo-500 text-left transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setLegalModalContent({ title: 'Terms of Service', content: 'By using this service, you agree to our standard terms. The platform is free to use with optional premium features. Please behave responsibly.' })} className="hover:text-indigo-500 text-left transition-colors">Terms of Service</button></li>
                <li><button onClick={() => setLegalModalContent({ title: 'Contact', content: 'Need assistance, have feature requests, or business inquiries? Please reach out to the developer, Barathrajan S, directly at barathrajanselvaraju22@gmail.com.' })} className="hover:text-indigo-500 text-left transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-sm text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider">Newsletter</h5>
              <p className="text-xs leading-normal mb-3 font-medium">Get resume templates, job hunt tips, and interview advice.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="name@email.com" className={`border rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-indigo-600 ${theme === 'dark' ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-300 text-slate-900'}`} />
                <button onClick={() => alert('Thanks for subscribing!')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs">
            <p>&copy; {new Date().getFullYear()} MyResume Assistant. Engineered by Antigravity at DeepMind. All rights reserved.</p>
            <p className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-indigo-400 cursor-pointer">Security</span>
              <span className="hover:text-indigo-400 cursor-pointer">GDPR</span>
              <span className="hover:text-indigo-400 cursor-pointer">ATS Checkers</span>
            </p>
          </div>
        </footer>
      )}

      {/* 5. Auth Overlay Modal */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => openAuthModal(null)} />
          
          <div className={`relative w-full max-w-md rounded-3xl shadow-2xl p-8 border font-bold transition-all duration-300 ${theme === 'dark' ? 'bg-[#151f32] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-950'}`}>
            <button 
              onClick={() => openAuthModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <Logo className="h-14 w-14 drop-shadow-xl" />
              <h3 className="font-display font-bold text-2xl mt-4">
                {authModalMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1">
                {authModalMode === 'login' 
                  ? 'Access your resume dashboards and optimize ATS scores.' 
                  : 'Start building professional, parsable resumes in minutes.'}
              </p>
            </div>

            {authSuccessMessage && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs px-4 py-3 rounded-xl mb-4 font-semibold text-center leading-relaxed">
                {authSuccessMessage}
              </div>
            )}

            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs px-4 py-2.5 rounded-xl mb-4 font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              {authModalMode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className={`w-full bg-transparent border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-slate-55 border-slate-200'}`}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className={`w-full bg-transparent border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-slate-55 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Password</label>
                  {authModalMode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => alert('Demo account: Try typing anything or use the Google Login bypass!')} 
                      className="text-[11px] text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className={`w-full bg-transparent border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-slate-55 border-slate-200'}`}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying...' : authModalMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-800/60"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-xs font-medium uppercase">Or Connect</span>
              <div className="flex-grow border-t border-slate-800/60"></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-3 border font-semibold py-3 rounded-xl text-sm transition-colors duration-300 hover:bg-indigo-600/5 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.626 5.626 0 0 1 8.35 13a5.626 5.626 0 0 1 5.64-5.6c1.55 0 2.966.626 4.004 1.636l3.11-3.11C19.123 4.02 16.793 3 13.99 3c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.38 0 9.873-4.223 9.873-10 0-.61-.06-1.2-.176-1.715H12.24z"/>
              </svg>
              Sign In with Google
            </button>

            <div className="text-center text-xs mt-6 text-slate-400">
              {authModalMode === 'login' ? (
                <>Don't have an account? <button onClick={() => setAuthModalMode('signup')} className="text-indigo-400 hover:text-indigo-300 font-bold">Sign Up Free</button></>
              ) : (
                <>Already have an account? <button onClick={() => setAuthModalMode('login')} className="text-indigo-400 hover:text-indigo-300 font-bold">Sign In</button></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Legal / Company Content Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setLegalModalContent(null)} />
          
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl p-8 border transition-all duration-300 ${theme === 'dark' ? 'bg-[#151f32] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-850'}`}>
            <button 
              onClick={() => setLegalModalContent(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            >
              <X size={20} />
            </button>

            <h3 className="font-display font-black text-2xl mb-4 text-indigo-500">
              {legalModalContent.title}
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              {legalModalContent.content}
            </p>
            
            <button 
              onClick={() => setLegalModalContent(null)}
              className="mt-8 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
