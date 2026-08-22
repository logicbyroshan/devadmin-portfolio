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
    name: 'DevMeet', 
    badge: 'DevMeet', 
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
    name: 'DevMitra', 
    badge: 'DevMitra', 
    tag: 'Peer Support & Community Hub', 
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
    id: 'dev-mate', 
    name: 'DevMate', 
    badge: 'DevMate', 
    tag: 'Pair Programming & Matcher', 
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
      window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-black text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Container wrapper locking layout above 1920px */}
      <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col relative">
        {/* Fixed Navbar (Full-Width Header) */}
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage}
          activeWebsite={selectedSite}
          onSelectWebsite={(siteId) => setActiveWebsite(siteId)}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Main Body Container */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <Sidebar 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            activeWebsite={selectedSite}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main View Area (w-48 sidebar offset) */}
          <main className="flex-1 ml-0 md:ml-48 p-3.5 sm:p-5 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">



            {currentPage === 'dashboard' && (
              <DashboardView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite}
              />
            )}
            {currentPage === 'manage-experiences' && (
              <ExperiencesView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-skills' && (
              <SkillsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-projects' && (
              <ProjectsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-blogs' && (
              <BlogsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-contacts' && (
              <MessagesView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-portfolio' && (
              <DetailsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-faq' && (
              <FaqsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
            {currentPage === 'manage-settings' && (
              <SettingsView 
                onNavigate={handleNavigate} 
                activeWebsite={selectedSite} 
              />
            )}
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
