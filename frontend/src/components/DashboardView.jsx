import React, { useState } from 'react';
import { 
  FolderCheck, 
  Hourglass, 
  CalendarDays, 
  FileEdit, 
  FileText,
  Send, 
  Eye, 
  Plus, 
  Upload, 
  Clock, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle,
  FileUp,
  Sparkles,
  Globe,
  FolderKanban,
  BookOpen,
  Briefcase,
  Cpu,
  Mail,
  Layers,
  User,
  Star,
  Check
} from 'lucide-react';

export default function DashboardView({ onNavigate, activeWebsite }) {
  const [messages] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', preview: `Inquiry regarding ${activeWebsite?.name || 'Dev-Meet'} platform features...`, tag: 'Inquiry', time: '2m ago', unread: true },
    { id: 2, name: 'Renuka Dashbanda', email: 'renuka@design.co', preview: 'Great work on the UI update! Loved the glassmorphism theme...', tag: 'Feedback', time: '15m ago', unread: false },
    { id: 3, name: 'Riya Sayam', email: 'riya@techcorp.io', preview: 'Can we schedule a short discovery call tomorrow for contract work?', tag: 'Hire', time: '1h ago', unread: true },
    { id: 4, name: 'Jane Smith', email: 'jane@freelance.org', preview: 'Sent you an inquiry regarding full-stack architecture consultation.', tag: 'Consultation', time: '2d ago', unread: false },
  ]);

  // Separate Blogs Activities
  const [blogsActivities] = useState([
    { id: 1, title: `Published article for ${activeWebsite?.name || 'Dev-Meet'}: "Optimizing Node.js APIs"`, time: '4h ago', icon: FileText, color: activeWebsite?.accentText || 'text-blue-400', bg: activeWebsite?.accentBg || 'bg-blue-500/10' },
    { id: 2, title: 'Scheduled draft "State Management in 2025" for June 25', time: '2 days ago', icon: CalendarDays, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 3, title: 'Saved new draft "Understanding React Server Components"', time: '3 days ago', icon: FileEdit, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 4, title: 'Blog post reached 1,200 total reader views', time: '5 days ago', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]);

  // Separate Project Activities
  const [projectActivities] = useState([
    { id: 1, title: `Updated live preview URL for ${activeWebsite?.name || 'Dev-Meet'}`, time: '2h ago', icon: Globe, color: activeWebsite?.accentText || 'text-blue-400', bg: activeWebsite?.accentBg || 'bg-blue-500/10' },
    { id: 2, title: 'Completed milestone 3 of "Ecommerce Microservices"', time: '1 day ago', icon: CheckCircle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 3, title: 'Deployed v2.0 production build to Vercel', time: '2 days ago', icon: FolderCheck, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 4, title: 'Added 5 screenshots to Mobile App portfolio card', time: '4 days ago', icon: FolderKanban, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ]);

  const [resumeName, setResumeName] = useState('my-resume-v4.pdf');
  const [resumeDate, setResumeDate] = useState('3 days ago');

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setResumeDate('Just now');
      alert(`Resume uploaded successfully for ${activeWebsite?.name}: ${file.name}`);
    }
  };

  // Full 12 Months Data (Row 1: Jan-Jun, Row 2: Jul-Dec)
  const row1Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const row2Months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysForMonth = (monthName, monthIndex) => {
    const daysCount = (monthIndex === 1) ? 28 : (monthIndex % 2 === 0 ? 31 : 30);
    return Array.from({ length: daysCount }, (_, d) => {
      const dayNum = d + 1;
      const seed = (monthIndex * 31 + dayNum);
      const level = (seed % 7 === 0) ? 0 : (seed % 5 === 0) ? 4 : (seed % 3 === 0) ? 3 : (seed % 2 === 0) ? 2 : 1;
      return { day: dayNum, level, count: level * 2 + 1 };
    });
  };

  const getHeatmapColorClass = (level) => {
    if (activeWebsite?.heatmapColors && activeWebsite.heatmapColors[level]) {
      return activeWebsite.heatmapColors[level];
    }
    switch (level) {
      case 4: return 'bg-blue-400 shadow-sm shadow-blue-400/50';
      case 3: return 'bg-blue-500/80';
      case 2: return 'bg-blue-600/50';
      case 1: return 'bg-blue-950/60 border border-blue-500/20';
      default: return 'bg-[#030406] border border-neutral-900';
    }
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden">
      {/* Target Website Active Context Banner (Deep Charcoal Banner) */}
      <div className="p-3.5 rounded-lg bg-[#07080d] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-md ${activeWebsite?.badgeStyle}`}>
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Managing Website: {activeWebsite?.name}</h2>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${activeWebsite?.badgeStyle}`}>
                {activeWebsite?.badge}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{activeWebsite?.tag} — Shared database instance, site-specific theme & content isolated.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
          <span className={`w-2 h-2 rounded-full ${activeWebsite?.dotColor || 'bg-blue-400'} animate-pulse`}></span>
          <span>Live Sync Operational</span>
        </div>
      </div>

      {/* 1. TOP STAT BOXES (Deep Pitch Black Containers) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {/* Total Live Blogs */}
        <div 
          onClick={() => onNavigate('manage-blogs')}
          className="p-3.5 sm:p-4 rounded-lg glass-card glass-card-hover cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all flex items-center gap-3"
        >
          <div className={`p-2.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} border ${activeWebsite?.accentBorder} flex-shrink-0`}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xl sm:text-2xl font-black text-white leading-none">15</div>
            <div className="text-xs font-bold text-neutral-300 mt-1 truncate">Total Live Blogs</div>
          </div>
        </div>

        {/* Total Experiences */}
        <div 
          onClick={() => onNavigate('manage-experiences')}
          className="p-3.5 sm:p-4 rounded-lg glass-card glass-card-hover cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all flex items-center gap-3"
        >
          <div className={`p-2.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} border ${activeWebsite?.accentBorder} flex-shrink-0`}>
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xl sm:text-2xl font-black text-white leading-none">6</div>
            <div className="text-xs font-bold text-neutral-300 mt-1 truncate">Total Experiences</div>
          </div>
        </div>

        {/* Total Projects */}
        <div 
          onClick={() => onNavigate('manage-projects')}
          className="p-3.5 sm:p-4 rounded-lg glass-card glass-card-hover cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all flex items-center gap-3"
        >
          <div className={`p-2.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} border ${activeWebsite?.accentBorder} flex-shrink-0`}>
            <FolderKanban className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xl sm:text-2xl font-black text-white leading-none">27</div>
            <div className="text-xs font-bold text-neutral-300 mt-1 truncate">Total Projects</div>
          </div>
        </div>

        {/* Total Skills */}
        <div 
          onClick={() => onNavigate('manage-skills')}
          className="p-3.5 sm:p-4 rounded-lg glass-card glass-card-hover cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all flex items-center gap-3"
        >
          <div className={`p-2.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} border ${activeWebsite?.accentBorder} flex-shrink-0`}>
            <Cpu className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xl sm:text-2xl font-black text-white leading-none">32</div>
            <div className="text-xs font-bold text-neutral-300 mt-1 truncate">Total Skills</div>
          </div>
        </div>

        {/* Received Messages */}
        <div 
          onClick={() => onNavigate('manage-contacts')}
          className="p-3.5 sm:p-4 rounded-lg glass-card glass-card-hover cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all flex items-center gap-3 col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1"
        >
          <div className={`p-2.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} border ${activeWebsite?.accentBorder} flex-shrink-0`}>
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xl sm:text-2xl font-black text-white leading-none">48</div>
            <div className="text-xs font-bold text-neutral-300 mt-1 truncate">Received Messages</div>
          </div>
        </div>
      </div>

      {/* 2. SIDE-BY-SIDE PIPELINES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Projects Pipeline Card */}
        <div className="p-4 sm:p-5 rounded-lg glass-card border border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
              <FolderKanban className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Projects Status Pipeline ({activeWebsite?.name})
            </h3>
            <button 
              onClick={() => onNavigate('manage-projects')}
              className={`text-xs sm:text-sm font-bold ${activeWebsite?.accentText} hover:underline flex items-center gap-1`}
            >
              <span>Manage All (27)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Completed */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <FolderCheck className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Done Projects
                </span>
                <span className={`${activeWebsite?.accentText} font-extrabold`}>15 / 27</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${activeWebsite?.gradient} rounded-full`} style={{ width: '55%' }}></div>
              </div>
            </div>

            {/* In Progress */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <Hourglass className="w-4 h-4 text-amber-400" /> In Progress (Active Sprint)
                </span>
                <span className="text-amber-400 font-extrabold">4 / 27</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            {/* Planned */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <CalendarDays className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Planned (Upcoming Roadmap)
                </span>
                <span className={`${activeWebsite?.accentText} font-extrabold`}>8 / 27</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${activeWebsite?.gradient} rounded-full`} style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Pipeline Card */}
        <div className="p-4 sm:p-5 rounded-lg glass-card border border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
              <FileText className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Blogs Pipeline Status ({activeWebsite?.name})
            </h3>
            <button 
              onClick={() => onNavigate('manage-blogs')}
              className={`text-xs sm:text-sm font-bold ${activeWebsite?.accentText} hover:underline flex items-center gap-1`}
            >
              <span>Manage All (22)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Drafts */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-indigo-400" /> Draft Articles
                </span>
                <span className="text-indigo-400 font-extrabold">7 Drafts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            {/* Scheduled */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <CalendarDays className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Scheduled Publications
                </span>
                <span className={`${activeWebsite?.accentText} font-extrabold`}>3 Scheduled</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${activeWebsite?.gradient} rounded-full`} style={{ width: '14%' }}></div>
              </div>
            </div>

            {/* Planned Topics */}
            <div className="p-3 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Planned Topics
                </span>
                <span className="text-emerald-400 font-extrabold">12 Planned</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Quick Actions & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Quick Actions */}
        <div className="p-4 sm:p-5 rounded-lg glass-card space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Plus className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Quick Actions ({activeWebsite?.name})
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={() => onNavigate('manage-blogs')}
              className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/90 border border-neutral-800/80 text-left text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all flex items-center gap-2.5 group"
            >
              <span className={`p-1.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} group-hover:bg-gradient-to-r group-hover:${activeWebsite?.gradient} group-hover:text-white transition-colors`}>
                <Plus className="w-4 h-4" />
              </span>
              <span>Add Blog</span>
            </button>

            <button 
              onClick={() => onNavigate('manage-projects')}
              className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/90 border border-neutral-800/80 text-left text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all flex items-center gap-2.5 group"
            >
              <span className={`p-1.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} group-hover:bg-gradient-to-r group-hover:${activeWebsite?.gradient} group-hover:text-white transition-colors`}>
                <Plus className="w-4 h-4" />
              </span>
              <span>Add Project</span>
            </button>

            <button 
              onClick={() => onNavigate('manage-experiences')}
              className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/90 border border-neutral-800/80 text-left text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all flex items-center gap-2.5 group"
            >
              <span className={`p-1.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} group-hover:bg-gradient-to-r group-hover:${activeWebsite?.gradient} group-hover:text-white transition-colors`}>
                <Plus className="w-4 h-4" />
              </span>
              <span>Add Experience</span>
            </button>

            <button 
              onClick={() => onNavigate('manage-skills')}
              className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/90 border border-neutral-800/80 text-left text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all flex items-center gap-2.5 group"
            >
              <span className={`p-1.5 rounded-md ${activeWebsite?.accentBg} ${activeWebsite?.accentText} group-hover:bg-gradient-to-r group-hover:${activeWebsite?.gradient} group-hover:text-white transition-colors`}>
                <Plus className="w-4 h-4" />
              </span>
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Resume Management */}
        <div className="p-4 sm:p-5 rounded-lg glass-card space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <FileUp className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Resume & Documentation
          </h3>
          <div className="p-3.5 rounded-md bg-[#050609] border border-neutral-800/80 space-y-3">
            <div>
              <div className="text-xs text-neutral-400">Current Resume ({activeWebsite?.name}):</div>
              <div className={`text-sm sm:text-base font-extrabold ${activeWebsite?.accentText} mt-0.5`}>{resumeName}</div>
              <div className="text-xs text-neutral-500 mt-0.5">Last Updated: {resumeDate}</div>
            </div>

            <label className={`w-full py-2.5 px-4 rounded-md bg-gradient-to-r ${activeWebsite?.gradient} text-white font-extrabold text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2 shadow-lg ${activeWebsite?.glow} hover:brightness-110 transition-all`}>
              <Upload className="w-4 h-4" />
              <span>Upload New Resume</span>
              <input type="file" onChange={handleResumeUpload} className="hidden" accept=".pdf,.doc,.docx" />
            </label>
          </div>
        </div>
      </div>

      {/* 4. REDESIGNED RECENT MESSAGES */}
      <div className="p-4 sm:p-5 rounded-lg glass-card border border-neutral-800/80 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Recent Messages & Inquiries ({activeWebsite?.name})
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Latest contact submissions from your public portfolio.</p>
          </div>

          <button 
            onClick={() => onNavigate('manage-contacts')}
            className={`text-xs sm:text-sm font-bold ${activeWebsite?.accentText} hover:underline flex items-center gap-1.5`}
          >
            <span>View All Inbox (48)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => onNavigate('manage-contacts')}
              className="p-3.5 rounded-md bg-[#050609] hover:bg-neutral-900/80 border border-neutral-800/80 cursor-pointer transition-all duration-200 space-y-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${activeWebsite?.gradient} text-white font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    {msg.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold text-neutral-100 truncate group-hover:${activeWebsite?.accentText} transition-colors`}>{msg.name}</h4>
                      {msg.unread && (
                        <span className={`w-2 h-2 rounded-full ${activeWebsite?.dotColor} animate-pulse flex-shrink-0`}></span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">{msg.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeWebsite?.badgeStyle}`}>
                    {msg.tag}
                  </span>
                  <span className="text-xs text-neutral-500">{msg.time}</span>
                </div>
              </div>

              <p className={`text-xs sm:text-sm text-neutral-300 line-clamp-1 pl-10 border-l-2 ${activeWebsite?.accentBorder} font-medium`}>
                {msg.preview}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 12-MONTH ACTIVITY HEATMAP: DYNAMIC THEMED HEATMAP GRID */}
      <div className={`p-4 sm:p-5 rounded-lg glass-card border border-neutral-800/90 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
          <div>
            <h3 className="text-sm sm:text-base xl:text-lg font-extrabold text-white flex items-center gap-2">
              <Activity className={`w-5 h-5 ${activeWebsite?.accentText}`} /> Monthly Daily Activity ({activeWebsite?.name})
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Annual activity heatmap displaying 7 days per week in color-coordinated fluid grid boxes.</p>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className={`px-3 py-1 rounded-md ${activeWebsite?.badgeStyle} font-extrabold`}>
              528 Total Activities in 2025
            </span>
          </div>
        </div>

        {/* 2 ROWS OF 6 MONTHS */}
        <div className="space-y-5 pt-1 pb-1">
          {/* Row 1: Jan - Jun */}
          <div className="space-y-2.5">
            <div className={`text-xs sm:text-sm font-extrabold ${activeWebsite?.accentText} tracking-wider`}>FIRST HALF (JANUARY – JUNE 2025)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {row1Months.map((m, idx) => (
                <div key={m} className="p-2.5 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
                  <div className="text-xs font-extrabold text-neutral-200 text-center uppercase tracking-wide">{m}</div>
                  
                  {/* 7 Days of the Week Column Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-neutral-500">
                    {dayLabels.map((dayLabel, dIdx) => (
                      <span key={dIdx}>{dayLabel}</span>
                    ))}
                  </div>

                  {/* 7-Column Days Grid (Aspect Square Fluid Resizing) */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysForMonth(m, idx).map((d) => (
                      <div
                        key={d.day}
                        title={`${m} Day ${d.day}: ${d.count} activities`}
                        className={`aspect-square w-full rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${getHeatmapColorClass(d.level)}`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Jul - Dec */}
          <div className="space-y-2.5 pt-3 border-t border-neutral-800/80">
            <div className={`text-xs sm:text-sm font-extrabold ${activeWebsite?.accentText} tracking-wider`}>SECOND HALF (JULY – DECEMBER 2025)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {row2Months.map((m, idx) => (
                <div key={m} className="p-2.5 rounded-md bg-[#050609] border border-neutral-800/80 space-y-2">
                  <div className="text-xs font-extrabold text-neutral-200 text-center uppercase tracking-wide">{m}</div>
                  
                  {/* 7 Days of the Week Column Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-neutral-500">
                    {dayLabels.map((dayLabel, dIdx) => (
                      <span key={dIdx}>{dayLabel}</span>
                    ))}
                  </div>

                  {/* 7-Column Days Grid (Aspect Square Fluid Resizing) */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysForMonth(m, idx + 6).map((d) => (
                      <div
                        key={d.day}
                        title={`${m} Day ${d.day}: ${d.count} activities`}
                        className={`aspect-square w-full rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${getHeatmapColorClass(d.level)}`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Intensity Legend */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-400 pt-2 border-t border-neutral-800/80">
          <span className="font-semibold">Daily Box Activity Legend</span>
          <div className="flex items-center gap-1.5 text-xs">
            <span>Less</span>
            <div className="w-3.5 h-3.5 rounded-sm bg-[#030406] border border-neutral-900"></div>
            <div className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColorClass(1)}`}></div>
            <div className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColorClass(2)}`}></div>
            <div className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColorClass(3)}`}></div>
            <div className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColorClass(4)}`}></div>
            <span className={`${activeWebsite?.accentText} font-bold`}>More</span>
          </div>
        </div>
      </div>

      {/* 6. Separate Blogs Activity Card & Separate Project Activity Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Separate Blogs Activity Card */}
        <div className="p-4 sm:p-5 rounded-lg glass-card border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <FileText className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Blogs Activity
            </h3>
            <button 
              onClick={() => onNavigate('manage-blogs')}
              className={`text-xs sm:text-sm font-bold ${activeWebsite?.accentText} hover:underline flex items-center gap-1`}
            >
              <span>Manage Blogs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {blogsActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/80 border border-neutral-800/80 flex items-start gap-3 transition-colors">
                  <div className={`p-2 rounded-md ${act.bg} ${act.color} mt-0.5 flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm flex-1 min-w-0">
                    <p className="font-semibold text-neutral-200 line-clamp-1">{act.title}</p>
                    <span className="text-xs text-neutral-500 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separate Project Activity Card */}
        <div className="p-4 sm:p-5 rounded-lg glass-card border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <FolderKanban className={`w-4 h-4 ${activeWebsite?.accentText}`} /> Project Activity
            </h3>
            <button 
              onClick={() => onNavigate('manage-projects')}
              className={`text-xs sm:text-sm font-bold ${activeWebsite?.accentText} hover:underline flex items-center gap-1`}
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {projectActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="p-3 rounded-md bg-[#050609] hover:bg-neutral-900/80 border border-neutral-800/80 flex items-start gap-3 transition-colors">
                  <div className={`p-2 rounded-md ${act.bg} ${act.color} mt-0.5 flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm flex-1 min-w-0">
                    <p className="font-semibold text-neutral-200 line-clamp-1">{act.title}</p>
                    <span className="text-xs text-neutral-500 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
