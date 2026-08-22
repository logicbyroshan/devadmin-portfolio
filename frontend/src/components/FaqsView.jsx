import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  ChevronDown, 
  Tag
} from 'lucide-react';

export default function FaqsView({ onNavigate, activeWebsite }) {
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' | 'EDITOR'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [editingId, setEditingId] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: `What services and software solutions do you build?`,
      answer: `I specialize in full-stack web application development using React 18, Next.js, Django REST Framework, and custom UI design systems with modern dark OLED aesthetic architecture.`,
      category: 'Services',
      visible: true
    },
    {
      id: 2,
      question: 'How do you handle remote contract and async team collaboration?',
      answer: 'I work with async communication via GitHub, Slack, Linear, and weekly sprint reviews to ensure full transparency, fast iteration cycles, and timely delivery.',
      category: 'Workflow',
      visible: true
    },
    {
      id: 3,
      question: 'What is your typical project delivery roadmap and timeline?',
      answer: 'Small focused web tools take 1-2 weeks, while full enterprise multi-tenant web applications typically take 4-6 weeks depending on feature scope.',
      category: 'Timeline',
      visible: true
    },
    {
      id: 4,
      question: 'Do you provide post-launch maintenance and DevOps support?',
      answer: 'Yes! All client projects include 30 days of post-launch bug fixing, CI/CD pipeline setup, and production server monitoring.',
      category: 'Support',
      visible: true
    },
    {
      id: 5,
      question: 'Can you integrate existing REST and GraphQL backend services?',
      answer: 'Absolutely. I integrate third-party APIs, authentication systems (OAuth, JWT), payment gateways (Stripe), and real-time WebSockets.',
      category: 'Technical',
      visible: false
    },
    {
      id: 6,
      question: 'Are codebases delivered with complete documentation?',
      answer: 'Every project is delivered with modular code structure, TypeScript/JSDoc annotations, environment configuration templates, and comprehensive README guides.',
      category: 'Quality',
      visible: true
    }
  ]);

  // Form state for separate Add/Edit page
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Services',
    visible: true
  });

  const categories = ['ALL', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(faq => {
    if (selectedCategory === 'ALL') return true;
    return faq.category === selectedCategory;
  });

  // Open separate Editor Page for Adding
  const handleOpenAddPage = () => {
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: 'Services',
      visible: true
    });
    setViewMode('EDITOR');
    window.scrollTo(0, 0);
  };

  // Open separate Editor Page for Editing
  const handleOpenEditPage = (faq) => {
    setEditingId(faq.id);
    setFormData({ ...faq });
    setViewMode('EDITOR');
    window.scrollTo(0, 0);
  };

  // Return to List View
  const handleBackToList = () => {
    setViewMode('LIST');
    setEditingId(null);
    window.scrollTo(0, 0);
  };

  // Save FAQ Form (Add or Edit)
  const handleSaveForm = (e) => {
    e?.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Please enter both Question and Answer.');
      return;
    }

    if (editingId) {
      setFaqs(faqs.map(f => f.id === editingId ? { ...formData, id: editingId } : f));
    } else {
      const newEntry = {
        ...formData,
        id: Date.now()
      };
      setFaqs([newEntry, ...faqs]);
    }

    setViewMode('LIST');
    setEditingId(null);
    window.scrollTo(0, 0);
  };

  // Delete FAQ
  const handleDelete = (id) => {
    if (confirm('Delete this FAQ entry?')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  // Toggle visibility directly on card
  const handleToggleVisible = (id) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, visible: !f.visible } : f));
  };

  // ==========================================
  // VIEW 1: SEPARATE DEDICATED ADD / EDIT PAGE
  // ==========================================
  if (viewMode === 'EDITOR') {
    const isEditing = editingId !== null;
    return (
      <div className="space-y-6 w-full max-w-full overflow-x-hidden font-sans animate-in fade-in duration-150">
        {/* Top Header */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#07080d] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span className="font-accent">{isEditing ? 'Edit FAQ Item' : 'Add New FAQ Item'}</span>
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isEditing ? 'Update FAQ question, detailed answer, and category.' : 'Add a new client question and answer to your public FAQ section.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors"
            >
              Cancel
            </button>


            <button
              type="button"
              onClick={handleSaveForm}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Save & Publish FAQ'}</span>
            </button>
          </div>
        </div>

        {/* Dedicated Separate Form Container */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#07080d] border border-neutral-800 shadow-2xl space-y-6">
          <form onSubmit={handleSaveForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Question <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What is your typical turnaround time for full-stack builds?"
                  className="w-full px-4 py-3 rounded-lg bg-black/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors font-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  FAQ Category Tag
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Services, Timeline, Technical"
                  className="w-full px-4 py-3 rounded-lg bg-black/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Detailed Answer <span className="text-blue-400">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={formData.answer}
                onChange={e => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Provide a comprehensive and helpful response for your clients..."
                className="w-full p-4 rounded-lg bg-black/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 resize-none leading-relaxed transition-colors"
              />
            </div>

            {/* Visibility Toggle */}
            <div className="p-4 rounded-lg bg-black/50 border border-neutral-800/80 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Live Portfolio Visibility</div>
                <p className="text-xs text-neutral-400 mt-0.5">Show or hide this question from your public FAQ section.</p>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, visible: !formData.visible })}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  formData.visible
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                }`}
              >
                {formData.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{formData.visible ? 'Visible on Portfolio' : 'Hidden from Public'}</span>
              </button>
            </div>

            {/* Form Actions Footer */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-800">
              <button
                type="button"
                onClick={handleBackToList}
                className="px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-semibold border border-neutral-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Save & Publish FAQ'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FAQS 3-CARD GRID VIEW
  // ==========================================
  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden font-sans">
      {/* Header Banner with Category Dropdown & Add Button */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#07080d] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white">Manage Frequently Asked Questions</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Add, edit, or reorganize FAQ entries displayed across your portfolio.</p>
          </div>
        </div>

        {/* Right Actions: Category Dropdown & Add Button */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-[#050609] hover:bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none pr-8"
            >
              <option value="ALL">All Categories ({faqs.length})</option>
              {categories.filter(c => c !== 'ALL').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleOpenAddPage}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        </div>
      </div>

      {/* 3-Card Format Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="p-5 rounded-xl bg-[#07080d] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between shadow-lg space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{faq.category}</span>
                </span>
                <span className="text-[10px] font-bold text-neutral-500">FAQ #{faq.id}</span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-white line-clamp-2 font-accent leading-snug">
                {faq.question}
              </h3>

              <p className="text-xs text-neutral-300 line-clamp-4 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </div>

            {/* Action Buttons with Working Visibility Toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 gap-2">
              <button
                type="button"
                onClick={() => handleToggleVisible(faq.id)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all truncate ${
                  faq.visible
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700'
                }`}
                title="Toggle Live Visibility"
              >
                {faq.visible ? <Eye className="w-3.5 h-3.5 flex-shrink-0" /> : <EyeOff className="w-3.5 h-3.5 flex-shrink-0" />}
                <span className="truncate">{faq.visible ? 'Visible' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEditPage(faq)}
                  className="px-2.5 py-1.5 rounded-md bg-[#050609] hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-800 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 rounded-md bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 text-xs font-medium flex items-center gap-1.5 border border-rose-900/30 transition-all"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
