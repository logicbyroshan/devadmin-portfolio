import React, { useState } from 'react';
import { User, Save, Upload, Github, Linkedin, Twitter, Globe, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function DetailsView() {
  const [saved, setSaved] = useState(false);
  const [details, setDetails] = useState({
    name: 'Roshan Kumar',
    title: 'Senior Full Stack Developer & UI Architect',
    bio: 'Passionate software engineer building high-performance React web applications, scalable Node.js microservices, and elegant OLED dark glassmorphic user interfaces.',
    location: 'New Delhi, India',
    email: 'roshan.dev@example.com',
    github: 'https://github.com/roshan-dev',
    linkedin: 'https://linkedin.com/in/roshan-dev',
    twitter: 'https://twitter.com/roshan_dev',
    website: 'https://roshankumar.dev',
    avatar: '/logo.png'
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDetails({ ...details, avatar: url });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Personal & Portfolio Details</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage public profile information, bio narrative, and social media handles.</p>
        </div>
        {saved && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Portfolio Details Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar Card */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center space-y-4 h-fit">
          <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden ring-4 ring-cyan-500/30 bg-slate-900">
            <img
              src={details.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{details.name}</h3>
            <p className="text-xs text-cyan-400 font-medium mt-0.5">{details.title}</p>
          </div>

          <label className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 border border-slate-700 transition-all">
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Change Profile Picture</span>
            <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Right Columns: Main Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-card border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={details.name}
                onChange={e => setDetails({ ...details, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={details.title}
                onChange={e => setDetails({ ...details, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={details.email}
                onChange={e => setDetails({ ...details, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={details.location}
                onChange={e => setDetails({ ...details, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Biography Narrative</label>
            <textarea
              rows="3"
              value={details.bio}
              onChange={e => setDetails({ ...details, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            ></textarea>
          </div>

          <h3 className="text-sm font-bold text-white pt-2 pb-2 border-b border-slate-800">
            Social Profiles & Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">GitHub Profile</label>
              <input
                type="url"
                value={details.github}
                onChange={e => setDetails({ ...details, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={details.linkedin}
                onChange={e => setDetails({ ...details, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Twitter / X Profile</label>
              <input
                type="url"
                value={details.twitter}
                onChange={e => setDetails({ ...details, twitter: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Personal Website</label>
              <input
                type="url"
                value={details.website}
                onChange={e => setDetails({ ...details, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Save className="w-4 h-4" /> Save All Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
