import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ExperiencesView from './components/ExperiencesView';
import SkillsView from './components/SkillsView';
import ProjectsView from './components/ProjectsView';
import BlogsView from './components/BlogsView';
import MessagesView from './components/MessagesView';
import DetailsView from './components/DetailsView';
import FaqsView from './components/FaqsView';
import SettingsView from './components/SettingsView';
import LogoutModal from './components/LogoutModal';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';

export const WEBSITES = [
  { 
    id: 'dev-meet', 
    name: 'Dev-Meet', 
    badge: 'MEET', 
    tag: 'Developer Meetings & Calls', 
    primaryColor: 'blue',
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    badgeStyle: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/20',
    dotColor: 'bg-blue-400',
    heatmapColors: {
      4: 'bg-blue-400 shadow-sm shadow-blue-400/50',
      3: 'bg-blue-500/80',
      2: 'bg-blue-600/50',
      1: 'bg-blue-950/60 border border-blue-500/20',
    }
  },
  { 
    id: 'dev-mitra', 
    name: 'Dev-Mitra', 
    badge: 'MITRA', 
    tag: 'Peer Support & Community Hub', 
    primaryColor: 'sky',
    accentText: 'text-sky-400',
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/30',
    badgeStyle: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    gradient: 'from-sky-500 to-cyan-600',
    glow: 'shadow-sky-500/20',
    dotColor: 'bg-sky-400',
    heatmapColors: {
      4: 'bg-sky-400 shadow-sm shadow-sky-400/50',
      3: 'bg-sky-500/80',
      2: 'bg-sky-600/50',
      1: 'bg-sky-950/60 border border-sky-500/20',
    }
  },
  { 
    id: 'dev-mate', 
    name: 'Dev-Mate', 
    badge: 'MATE', 
    tag: 'Pair Programming & Matcher', 
    primaryColor: 'violet',
    accentText: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    accentBorder: 'border-violet-500/30',
    badgeStyle: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    gradient: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/20',
    dotColor: 'bg-violet-400',
    heatmapColors: {
      4: 'bg-violet-400 shadow-sm shadow-violet-400/50',
      3: 'bg-violet-500/80',
      2: 'bg-violet-600/50',
      1: 'bg-violet-950/60 border border-violet-500/20',
    }
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeWebsite, setActiveWebsite] = useState('dev-meet');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [authState, setAuthState] = useState('AUTHENTICATED'); // 'AUTHENTICATED' | 'LOGIN' | 'SIGNUP'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    if (page === 'manage-logout') {
      setShowLogoutModal(true);
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setAuthState('LOGIN');
  };

  if (authState === 'LOGIN') {
    return (
      <LoginView
        onLoginSuccess={() => {
          setAuthState('AUTHENTICATED');
          setCurrentPage('dashboard');
        }}
        onSwitchToSignup={() => setAuthState('SIGNUP')}
      />
    );
  }

  if (authState === 'SIGNUP') {
    return (
      <SignupView
        onSignupSuccess={() => {
          setAuthState('AUTHENTICATED');
          setCurrentPage('dashboard');
        }}
        onSwitchToLogin={() => setAuthState('LOGIN')}
      />
    );
  }

  const selectedSite = WEBSITES.find(w => w.id === activeWebsite) || WEBSITES[0];

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Container wrapper locking layout above 1920px */}
      <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col relative">
        {/* Fixed Navbar */}
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage}
          activeWebsite={selectedSite}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Main Body Container */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar with Website Switcher */}
          <Sidebar 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            activeWebsite={selectedSite}
            onSelectWebsite={(siteId) => setActiveWebsite(siteId)}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main View Area */}
          <main className="flex-1 ml-0 md:ml-52 p-3.5 sm:p-5 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
            {currentPage === 'dashboard' && (
              <DashboardView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite}
              />
            )}
            {currentPage === 'manage-experiences' && <ExperiencesView />}
            {currentPage === 'manage-skills' && <SkillsView />}
            {currentPage === 'manage-projects' && <ProjectsView />}
            {currentPage === 'manage-blogs' && <BlogsView />}
            {currentPage === 'manage-contacts' && <MessagesView />}
            {currentPage === 'manage-portfolio' && <DetailsView />}
            {currentPage === 'manage-faq' && <FaqsView />}
            {currentPage === 'manage-settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirmLogout={handleConfirmLogout}
        />
      )}
    </div>
  );
}
