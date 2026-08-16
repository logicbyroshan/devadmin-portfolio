import React, { useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Building, Tag, Check, X } from 'lucide-react';

export default function ExperiencesView() {
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      status: 'CURRENT',
      description: 'Developed and maintained web applications using modern JavaScript frameworks and backend technologies.',
      category: 'Full-Stack Development',
      joined: '2022-05-01',
      left: 'Present',
      visible: true
    },
    {
      id: 2,
      role: 'Intern',
      company: 'Web Wizards Inc.',
      status: 'PAST',
      description: 'Assisted senior developers with frontend tasks and bug fixing. Learned about agile methodologies.',
      category: 'Frontend Development',
      joined: '2021-06-01',
      left: '2021-08-31',
      visible: false
    }
  ]);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    status: 'CURRENT',
    description: '',
    category: '',
    joined: '',
    left: 'Present',
    visible: true
  });

  const filteredExperiences = experiences.filter(exp => {
    if (filter === 'CURRENT') return exp.status === 'CURRENT';
    if (filter === 'PAST') return exp.status === 'PAST';
    return true;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      role: '',
      company: '',
      status: 'CURRENT',
      description: '',
      category: '',
      joined: '',
      left: 'Present',
      visible: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({ ...exp });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const handleToggleVisible = (id) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, visible: !e.visible } : e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExperiences(experiences.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
    } else {
      setExperiences([...experiences, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Manage Experiences</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Add, update, or reorganize work experience records for your portfolio.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Experience
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {['ALL', 'CURRENT', 'PAST'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === tab
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExperiences.map(exp => (
          <div key={exp.id} className="p-5 rounded-2xl glass-card glass-card-hover space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">{exp.role} <span className="text-cyan-400">@ {exp.company}</span></h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.category}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  exp.status === 'CURRENT'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {exp.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">{exp.description}</p>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Joined: {exp.joined} - {exp.left}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/60">
              <button
                onClick={() => handleToggleVisible(exp.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  exp.visible
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {exp.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{exp.visible ? 'Visible' : 'Hidden'}</span>
              </button>
              <button
                onClick={() => handleOpenEdit(exp)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-1.5 border border-rose-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input bg-slate-900"
                  >
                    <option value="CURRENT">CURRENT</option>
                    <option value="PAST">PAST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Web Development"
                    className="w-full px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Joined Date</label>
                  <input
                    type="date"
                    value={formData.joined}
                    onChange={e => setFormData({ ...formData, joined: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Left Date</label>
                  <input
                    type="text"
                    value={formData.left}
                    onChange={e => setFormData({ ...formData, left: e.target.value })}
                    placeholder="e.g. Present or 2023-12"
                    className="w-full px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  className="w-full px-3 py-2 rounded-xl glass-input"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
