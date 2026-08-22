import React, { useState, useEffect, useRef } from 'react';
import { Bell, Calendar, ChevronDown, Sparkles, Check, Menu, X, User, Globe } from 'lucide-react';
import { WEBSITES } from '../App';

export default function Navbar({ 
  onNavigate, 
  currentPage, 
  activeWebsite, 
  onSelectWebsite,
  isMobileSidebarOpen, 
  onToggleMobileSidebar 
}) {
  const [showWebsiteMenu, setShowWebsiteMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navRef = useRef(null);

  // Close all dropdowns when clicking anywhere outside the navbar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowWebsiteMenu(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: `New contact inquiry submitted on ${activeWebsite?.name || 'Dev-Meet'}`, time: '5m ago', read: false },
    { id: 2, text: 'Project "React Frontend" received 4 new stars', time: '1h ago', read: false },
    { id: 3, text: 'System backup completed successfully', time: '3h ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 w-full h-16 z-40 bg-[#040508]/95 backdrop-blur-2xl border-b border-neutral-800/90 flex items-center justify-between px-3.5 sm:px-6">
      {/* Left: Brand Logo, Target Website Switcher & Breadcrumb */}
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg bg-[#07080c] text-neutral-300 hover:text-white border border-neutral-800"
          aria-label="Toggle Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="DevAdmin Logo" 
            className="h-7 w-7 object-contain flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('dashboard')}
            onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg'; }}
          />
          <span 
            onClick={() => onNavigate('dashboard')}
            className="font-extrabold tracking-tight text-white text-base sm:text-lg cursor-pointer hover:opacity-80 transition-opacity font-accent"
          >
            Dev<span className={activeWebsite?.accentText || 'text-blue-400'}>Admin</span>
          </span>
        </div>

        {/* Interactive Target Website Switcher Dropdown (Showing Full Name e.g. DevMeet) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWebsiteMenu(!showWebsiteMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="text-xs font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-all bg-blue-500/15 text-blue-400 border-blue-500/30 hover:brightness-125"
            title="Switch Target Website"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>{activeWebsite?.name || 'DevMeet'}</span>
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </button>

          {/* Website Switcher Dropdown Menu */}
          {showWebsiteMenu && (
            <div className="absolute left-0 top-11 w-64 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Select Target Website
              </div>

              <div className="space-y-1">
                {WEBSITES.map((site) => {
                  const isSelected = site.id === activeWebsite?.id;
                  return (
                    <button
                      key={site.id}
                      onClick={() => {
                        if (onSelectWebsite) onSelectWebsite(site.id);
                        setShowWebsiteMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{site.name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">{site.tag}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-400 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>


      {/* Right: Uniform Height Widgets */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Date Widget */}
        <div className="hidden sm:flex h-9 items-center gap-2 px-3 rounded-lg bg-[#07080c] border border-neutral-800 text-xs font-semibold text-neutral-200">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-accent">20th June 2025</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowWebsiteMenu(false);
              setShowProfileMenu(false);
            }}
            className="relative h-9 w-9 flex items-center justify-center rounded-lg bg-[#07080c] hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-all duration-200"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Notifications
                </h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.read ? 'bg-black/60 text-neutral-400 border border-neutral-900' : 'bg-blue-500/10 text-neutral-200 border border-blue-500/30'
                    }`}
                  >
                    <p className="line-clamp-2">{n.text}</p>
                    <span className="text-[10px] text-neutral-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill with Equal Balanced Symmetrical Padding */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowWebsiteMenu(false);
              setShowNotifications(false);
            }}
            className="h-9 flex items-center gap-2 p-1.5 pr-2.5 rounded-lg bg-[#07080c] border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
          >
            <img
              src="/logo.png"
              alt="Profile"
              className="w-6 h-6 rounded-md object-cover ring-1 ring-neutral-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-extrabold text-neutral-200 leading-tight font-accent">Roshan Kumar</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>



          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  onNavigate('manage-portfolio');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg text-neutral-300 hover:bg-neutral-900 hover:${activeWebsite?.accentText} flex items-center gap-2`}
              >
                <User className={`w-3.5 h-3.5 ${activeWebsite?.accentText}`} />
                <span>Edit Profile Details</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('manage-settings');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg text-neutral-300 hover:bg-neutral-900 hover:${activeWebsite?.accentText} flex items-center gap-2`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeWebsite?.accentText}`} />
                <span>Website Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
