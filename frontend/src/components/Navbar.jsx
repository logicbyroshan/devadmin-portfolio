import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, Sparkles, Check, Menu, X, User } from 'lucide-react';

export default function Navbar({ onNavigate, currentPage, activeWebsite, isMobileSidebarOpen, onToggleMobileSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
    <nav className="fixed top-0 left-0 md:left-52 right-0 h-16 glass-navbar z-40 px-3.5 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-md bg-[#07080c] text-neutral-300 hover:text-white border border-neutral-800"
          aria-label="Toggle Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Page Title & Active Target Website Context Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-300">DevAdmin</span>
          <span className={`w-1.5 h-1.5 rounded-full ${activeWebsite?.dotColor || 'bg-blue-400'}`}></span>
          <span className={`text-xs sm:text-sm font-extrabold ${activeWebsite?.accentText || 'text-blue-400'}`}>
            {activeWebsite?.name || 'Dev-Meet'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
          <span className="text-xs sm:text-sm font-semibold text-neutral-300 capitalize">
            {currentPage.replace('manage-', '').replace('dashboard', 'Overview Dashboard')}
          </span>
        </div>
      </div>

      {/* Right: Uniform Height (h-9) Widgets */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* 1. Target Website Badge (h-9) */}
        <div className="hidden sm:flex h-9 items-center gap-2 px-3 rounded-md bg-[#07080c] border border-neutral-800/80 text-xs font-semibold text-neutral-200">
          <span className="text-neutral-400">Active Site:</span>
          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${activeWebsite?.badgeStyle}`}>
            {activeWebsite?.badge}
          </span>
        </div>

        {/* 2. Date Badge (h-9) */}
        <div className="hidden sm:flex h-9 items-center gap-2 px-3 rounded-md bg-[#07080c] border border-neutral-800/80 text-xs font-semibold text-neutral-200">
          <Calendar className={`w-3.5 h-3.5 ${activeWebsite?.accentText || 'text-blue-400'}`} />
          <span>20th June 2025</span>
        </div>

        {/* 3. Notification Bell (h-9) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative h-9 w-9 flex items-center justify-center rounded-md bg-[#07080c] hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-all duration-200"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${activeWebsite?.dotColor || 'bg-blue-400'} text-[10px] font-bold text-slate-950 animate-pulse`}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-lg bg-[#07080c] border border-neutral-800 shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className={`w-3.5 h-3.5 ${activeWebsite?.accentText}`} /> Notifications
                </h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className={`text-[11px] ${activeWebsite?.accentText} hover:underline flex items-center gap-1`}
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-md text-xs transition-colors ${
                      n.read ? 'bg-black/60 text-neutral-400 border border-neutral-900' : `${activeWebsite?.accentBg} text-neutral-200 border ${activeWebsite?.accentBorder}`
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

        {/* 4. User Profile Pill (h-9) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="h-9 flex items-center gap-2 px-2.5 rounded-md bg-[#07080c] border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
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
              <div className="text-xs font-bold text-neutral-200 leading-tight">Roshan Kumar</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-lg bg-[#07080c] border border-neutral-800 shadow-2xl p-2 z-50">
              <button
                onClick={() => {
                  onNavigate('manage-portfolio');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-md text-neutral-300 hover:bg-neutral-900 hover:${activeWebsite?.accentText} flex items-center gap-2`}
              >
                <User className={`w-3.5 h-3.5 ${activeWebsite?.accentText}`} />
                <span>Edit Portfolio Details</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('manage-settings');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-md text-neutral-300 hover:bg-neutral-900 hover:${activeWebsite?.accentText} flex items-center gap-2`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeWebsite?.accentText}`} />
                <span>Account Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
