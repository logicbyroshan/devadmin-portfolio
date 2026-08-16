import React, { useState } from 'react';
import { Cpu, Plus, Edit2, Trash2, Code2, Layers, Server, Terminal, X } from 'lucide-react';

export default function SkillsView() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [skills, setSkills] = useState([
    { id: 1, name: 'React.js & Next.js', category: 'Frontend', level: 95, icon: 'code' },
    { id: 2, name: 'Tailwind CSS & Glassmorphism', category: 'Frontend', level: 90, icon: 'layers' },
    { id: 3, name: 'Node.js & Express', category: 'Backend', level: 85, icon: 'server' },
    { id: 4, name: 'Python & Django', category: 'Backend', level: 88, icon: 'server' },
    { id: 5, name: 'Docker & Kubernetes', category: 'DevOps & Tools', level: 75, icon: 'terminal' },
    { id: 6, name: 'PostgreSQL & MongoDB', category: 'Database', level: 82, icon: 'server' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 80,
    icon: 'code'
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'Frontend', level: 80, icon: 'code' });
    setShowModal(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this skill record?')) {
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSkills(skills.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setSkills([...skills, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Manage Skills & Tech Stack</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure technical capabilities, proficiency percentages, and display categories.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 rounded-2xl glass-card glass-card-hover space-y-3 relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{skill.category}</span>
                </div>
              </div>
              <div className="text-sm font-black text-cyan-400">{skill.level}%</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60 opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleOpenEdit(skill)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs border border-slate-700 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs border border-rose-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input bg-slate-900"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="Database">Database</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1 text-slate-300">
                  <span>Proficiency Level</span>
                  <span className="text-cyan-400">{formData.level}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
