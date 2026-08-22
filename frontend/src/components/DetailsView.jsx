import React, { useState } from 'react';
import { 
  User, 
  Save, 
  Upload, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Phone, 
  Briefcase,
  Code
} from 'lucide-react';

export default function DetailsView({ onNavigate, activeWebsite }) {
  const [saved, setSaved] = useState(false);
  const [details, setDetails] = useState({
    name: 'Roshan Kumar',
    title: 'Senior Full Stack Developer & UI Architect',
    bio: 'Passionate software engineer building high-performance React web applications, scalable Node.js microservices, and elegant OLED dark glassmorphic user interfaces with seamless UX.',
    location: 'New Delhi, India',
    email: 'roshan.dev@example.com',
    phone: '+91 98765 43210',
    experienceYears: '5+ Years',
    github: 'https://github.com/roshan-dev',
    linkedin: 'https://linkedin.com/in/roshan-dev',
    twitter: 'https://twitter.com/roshan_dev',
    website: 'https://roshankumar.dev',
    resumeUrl: 'https://roshankumar.dev/resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
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
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden font-sans">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#07080d] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white">Portfolio Profile & Personal Details</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Manage public profile information, biography narrative, resume URL, and social media handles.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="px-3.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile Saved Successfully!
            </div>
          )}

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all flex-shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Details</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Avatar & Quick Info Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#07080d] border border-neutral-800 text-center space-y-4 h-fit shadow-xl">
          <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden ring-2 ring-blue-500/40 bg-[#030406] shadow-xl">
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
            <h3 className="text-base font-extrabold text-white font-accent">{details.name}</h3>
            <p className="text-xs font-bold text-blue-400 mt-0.5">{details.title}</p>
            <p className="text-[11px] text-neutral-400 mt-1 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-500" />
              <span>{details.location}</span>
            </p>
          </div>

          <label className="w-full py-2.5 px-3 rounded-lg bg-[#050609] hover:bg-neutral-800 text-neutral-200 font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 border border-neutral-800 transition-all">
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Change Profile Picture</span>
            <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
          </label>

          <div className="pt-3 border-t border-neutral-800 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Experience:</span>
              <span className="font-bold text-white">{details.experienceYears}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>Current Portfolio:</span>
              <span className="font-bold text-blue-400">{activeWebsite?.name || 'DevMeet'}</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Main Details Form */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-xl bg-[#07080d] border border-neutral-800 space-y-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white pb-2.5 border-b border-neutral-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>General Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={details.name}
                  onChange={e => setDetails({ ...details, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white font-accent focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Professional Title</label>
                <input
                  type="text"
                  required
                  value={details.title}
                  onChange={e => setDetails({ ...details, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Contact Email</label>
                <input
                  type="email"
                  required
                  value={details.email}
                  onChange={e => setDetails({ ...details, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={details.phone}
                  onChange={e => setDetails({ ...details, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Location / City</label>
                <input
                  type="text"
                  value={details.location}
                  onChange={e => setDetails({ ...details, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5">Public Resume URL</label>
                <input
                  type="url"
                  value={details.resumeUrl}
                  onChange={e => setDetails({ ...details, resumeUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-bold text-xs mb-1.5">Biography Narrative</label>
              <textarea
                rows={4}
                value={details.bio}
                onChange={e => setDetails({ ...details, bio: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#050609] border border-neutral-800 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Social Media & Online Profiles */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-extrabold text-white pb-2.5 border-b border-neutral-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Social Profiles & Online Links</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-blue-400" /> GitHub URL
                </label>
                <input
                  type="url"
                  value={details.github}
                  onChange={e => setDetails({ ...details, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn URL
                </label>
                <input
                  type="url"
                  value={details.linkedin}
                  onChange={e => setDetails({ ...details, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5 flex items-center gap-1.5">
                  <Twitter className="w-3.5 h-3.5 text-blue-400" /> Twitter / X Handle
                </label>
                <input
                  type="text"
                  value={details.twitter}
                  onChange={e => setDetails({ ...details, twitter: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold text-xs mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> Personal Website
                </label>
                <input
                  type="url"
                  value={details.website}
                  onChange={e => setDetails({ ...details, website: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050609] border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
