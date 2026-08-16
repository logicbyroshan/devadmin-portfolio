import React, { useState } from 'react';
import { FolderKanban, Plus, Edit2, Trash2, Globe, Github, Tag, Calendar, ExternalLink, Eye, EyeOff, X } from 'lucide-react';

export default function ProjectsView() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Awesome Project One',
      status: 'LIVE',
      category: 'Web Application',
      description: 'A brief overview of this fantastic project and what it achieves. It uses modern tech stacks.',
      completed: '2023-10-15',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 2,
      title: 'Mobile App Redesign',
      status: 'OFFLINE',
      category: 'UI/UX Design',
      description: 'Redesign of a popular mobile application focusing on user experience and modern UI trends.',
      completed: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    status: 'LIVE',
    category: 'Web Application',
    description: '',
    completed: '',
    image: '',
    demoUrl: '',
    githubUrl: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      status: 'LIVE',
      category: 'Web Application',
      description: '',
      completed: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      demoUrl: '',
      githubUrl: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    setFormData({ ...proj });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: p.status === 'LIVE' ? 'OFFLINE' : 'LIVE' } : p));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            <span>Manage Projects Portfolio</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Showcase your best software projects, live preview links, and GitHub repositories.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="rounded-2xl glass-card glass-card-hover overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div>
              {/* Card Image */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                    proj.status === 'LIVE'
                      ? 'bg-emerald-500/90 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-700'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {proj.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Completed: {proj.completed}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {proj.demoUrl && proj.demoUrl !== '#' && (
                      <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {proj.githubUrl && proj.githubUrl !== '#' && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-900/40 border-t border-slate-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => handleToggleStatus(proj.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  proj.status === 'LIVE'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {proj.status === 'LIVE' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{proj.status === 'LIVE' ? 'Online' : 'Offline'}</span>
              </button>
              <button
                onClick={() => handleOpenEdit(proj)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
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
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Portfolio Dashboard"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Web Application"
                    className="w-full px-3 py-2 rounded-xl glass-input"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input bg-slate-900"
                  >
                    <option value="LIVE">LIVE</option>
                    <option value="OFFLINE">OFFLINE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Demo / Live URL</label>
                  <input
                    type="text"
                    value={formData.demoUrl}
                    onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
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
                  placeholder="Project details and technical highlights..."
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
