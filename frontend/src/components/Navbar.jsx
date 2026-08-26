import React, { useState, useEffect, useRef } from 'react';
import { Bell, Calendar, ChevronDown, Sparkles, Check, Menu, X, User, Globe, LogOut, KeyRound, ShieldCheck } from 'lucide-react';
import { WEBSITES } from '../App';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  onNavigate, 
  currentPage, 
  activeWebsite, 
  onSelectWebsite,
  isMobileSidebarOpen, 
  onToggleMobileSidebar 
}) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [showWebsiteMenu, setShowWebsiteMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navRef = useRef(null);

  // Close all dropdowns when clicking outside
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

  const accentText = activeWebsite?.accentText || 'text-blue-400';
  const dotColor = activeWebsite?.dotColor || 'bg-blue-400';
  const badgeStyle = activeWebsite?.badgeStyle || 'bg-blue-500/10 text-blue-400 border-blue-500/30';

  return (
    <header 
      ref={navRef} 
      className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between border-b border-neutral-800/80 bg-[#030407]/95 px-4 sm:px-6 backdrop-blur-2xl transition-all duration-200"
    >
      {/* Left: Mobile Toggle & Multi-Site Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Multi-Site Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWebsiteMenu(!showWebsiteMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="h-9 flex items-center gap-2.5 px-3 rounded-lg bg-[#07080d] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 select-none"
          >
            <div className="flex items-center gap-2">
              <span className={`flex h-2 w-2 rounded-full ${dotColor} animate-pulse`}></span>
              <span className="text-xs font-extrabold tracking-wider text-neutral-200 uppercase font-accent">
                {activeWebsite?.name || 'DevMeet'}
              </span>
            </div>
            <span className={`hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
              {activeWebsite?.badge || 'MEET'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {showWebsiteMenu && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
              <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-800/80 mb-1">
                Target Portfolio Website
              </div>
              {WEBSITES.map((site) => {
                const isSelected = activeWebsite?.id === site.id || activeWebsite?.slug === site.slug;
                return (
                  <button
                    key={site.id}
                    onClick={() => {
                      onSelectWebsite(site);
                      setShowWebsiteMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all duration-150 ${
                      isSelected
                        ? `${site.accentBg || 'bg-blue-500/15'} ${site.accentText || 'text-blue-400'} font-bold`
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${site.dotColor || 'bg-blue-400'}`}></span>
                      <span className="font-accent">{site.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                      {site.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Date, Notifications & User Session */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Date Widget (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-lg bg-[#07080d] border border-neutral-800/80 text-xs font-semibold text-neutral-300 select-none">
          <Calendar className={`w-3.5 h-3.5 ${accentText}`} />
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowWebsiteMenu(false);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            className="relative h-9 w-9 flex items-center justify-center rounded-lg bg-[#07080d] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-200"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${dotColor} text-[10px] font-bold text-slate-950 animate-pulse`}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className={`w-3.5 h-3.5 ${accentText}`} /> Notifications
                </h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className={`text-xs ${accentText} hover:underline flex items-center gap-1 font-semibold`}
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.read ? 'bg-black/60 text-neutral-400 border border-neutral-900' : `${activeWebsite?.accentBg || 'bg-blue-500/10'} text-neutral-200 border ${activeWebsite?.accentBorder || 'border-blue-500/30'}`
                    }`}
                  >
                    <p className="line-clamp-2">{n.text}</p>
                    <span className="text-[11px] text-neutral-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Auth Session Button */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowWebsiteMenu(false);
                setShowNotifications(false);
              }}
              className="h-9 flex items-center gap-2.5 px-2.5 rounded-lg bg-[#07080d] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 select-none"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt="Profile"
                className="w-6 h-6 rounded-md object-cover ring-1 ring-neutral-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                }}
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-extrabold text-neutral-200 leading-tight font-accent">
                  {user?.name || user?.username || 'Roshan Kumar'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
                <div className="px-3 py-2 border-b border-neutral-800/80 mb-1">
                  <div className="text-xs font-bold text-white font-accent">{user?.name || user?.username}</div>
                  <div className="text-[11px] text-neutral-400 truncate">{user?.email}</div>
                  <span className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full ${badgeStyle} font-semibold`}>
                    {user?.role || 'Administrator'}
                  </span>
                </div>

                <div className="space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      onNavigate('manage-portfolio');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4 text-neutral-400" />
                    <span>Edit Profile Details</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('manage-settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-neutral-400" />
                    <span>Security & Password</span>
                  </button>

                  <div className="border-t border-neutral-800/80 my-1"></div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('manage-logout');
                    }}
                    className="w-full px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 flex items-center gap-2 transition-colors font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className={`h-9 px-4 rounded-lg bg-gradient-to-r ${activeWebsite?.gradient || 'from-blue-600 to-indigo-600'} hover:brightness-110 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/20 transition-all select-none`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
