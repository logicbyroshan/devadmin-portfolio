import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Cpu, 
  FolderKanban, 
  FileText, 
  Mail, 
  User, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronDown,
  Check,
  Globe
} from 'lucide-react';
import { WEBSITES } from '../App';

export default function Sidebar({ 
  currentPage, 
  onNavigate, 
  activeWebsite, 
  onSelectWebsite, 
  isOpen, 
  onClose 
}) {
  const [showWebsiteMenu, setShowWebsiteMenu] = useState(false);

  const middleNavItems = [
    { id: 'manage-experiences', label: 'Experiences', icon: Briefcase },
    { id: 'manage-skills', label: 'Skills', icon: Cpu },
    { id: 'manage-projects', label: 'Projects', icon: FolderKanban },
    { id: 'manage-blogs', label: 'Blogs', icon: FileText },
    { id: 'manage-contacts', label: 'Messages', icon: Mail },
    { id: 'manage-portfolio', label: 'Details', icon: User },
    { id: 'manage-faq', label: 'FAQs', icon: HelpCircle },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 md:hidden transition-opacity"
        />
      )}

      {/* Full-Height Compact Sidebar Container (w-52) */}
      <aside className={`fixed left-0 top-0 bottom-0 h-screen w-52 glass-sidebar z-50 flex flex-col justify-between select-none transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Top Section: Brand Logo Header & Website Switcher Dropdown */}
        <div>
          {/* Logo Header (h-16 aligned with Navbar border-b) */}
          <div className="h-16 px-3 flex items-center justify-between border-b border-neutral-800/80 relative">
            <div className="flex items-center gap-2 min-w-0">
              <img 
                src="/logo.png" 
                alt="DevAdmin Logo" 
                className="h-7 w-7 object-contain flex-shrink-0"
                onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg'; }}
              />
              <div className="flex items-center gap-1 min-w-0">
                <span 
                  onClick={() => handleNavClick('dashboard')}
                  className="font-extrabold tracking-tight text-white text-base cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Dev<span className={activeWebsite.accentText}>Admin</span>
                </span>
                
                {/* Interactive Website Switcher Badge Button */}
                <button
                  onClick={() => setShowWebsiteMenu(!showWebsiteMenu)}
                  className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border flex items-center gap-1 transition-all ${activeWebsite.badgeStyle} hover:brightness-125`}
                  title="Switch Website Target"
                >
                  <span>{activeWebsite.badge}</span>
                  <ChevronDown className={`w-3 h-3 ${activeWebsite.accentText}`} />
                </button>
              </div>
            </div>

            {/* Website Switcher Glass Dropdown Menu */}
            {showWebsiteMenu && (
              <div className="absolute left-2 top-14 w-56 rounded-lg bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 mb-1 flex items-center gap-1.5">
                  <Globe className={`w-3 h-3 ${activeWebsite.accentText}`} /> Select Target Website
                </div>

                <div className="space-y-1">
                  {WEBSITES.map((site) => {
                    const isSelected = site.id === activeWebsite.id;
                    return (
                      <button
                        key={site.id}
                        onClick={() => {
                          onSelectWebsite(site.id);
                          setShowWebsiteMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-md text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? `${site.accentBg} ${site.accentText} ${site.accentBorder} border`
                            : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{site.name}</span>
                            <span className={`text-[9px] font-black px-1 rounded border ${site.badgeStyle}`}>
                              {site.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">{site.tag}</span>
                        </div>
                        {isSelected && <Check className={`w-4 h-4 ${site.accentText} flex-shrink-0 ml-1`} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Nav Button (Theme-Coordinated Gradient) */}
          <div className="p-2 pb-1">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm font-bold transition-all duration-200 ${
                currentPage === 'dashboard'
                  ? `bg-gradient-to-r ${activeWebsite.gradient} text-white shadow-md ${activeWebsite.glow}`
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${currentPage === 'dashboard' ? 'text-white' : activeWebsite.accentText}`} />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Middle Section: Navigation Modules */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            Management Modules
          </div>
          {middleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? `${activeWebsite.accentBg} ${activeWebsite.accentText} ${activeWebsite.accentBorder} border font-bold`
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? activeWebsite.accentText : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Settings & Clean Boxed Logout Button */}
        <div className="p-2 pt-2 border-t border-neutral-800/80 space-y-1.5">
          <button
            onClick={() => handleNavClick('manage-settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
              currentPage === 'manage-settings'
                ? `${activeWebsite.accentBg} ${activeWebsite.accentText} ${activeWebsite.accentBorder} border font-bold`
                : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
            }`}
          >
            <Settings className={`w-4 h-4 ${currentPage === 'manage-settings' ? activeWebsite.accentText : 'text-neutral-400'}`} />
            <span>Settings</span>
          </button>

          {/* Clean Boxed Logout Button */}
          <button
            onClick={() => handleNavClick('manage-logout')}
            className="w-full py-2 px-3 rounded-md bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 hover:border-rose-700/50 text-rose-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
