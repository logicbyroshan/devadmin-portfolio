import React, { useState } from 'react';
import { FileText, Plus, Edit2, Trash2, Search, Calendar, Eye, FileEdit, Clock, Check, X } from 'lucide-react';

export default function BlogsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Building Modern Glassmorphism UIs with Tailwind CSS',
      category: 'Design Systems',
      status: 'PUBLISHED',
      date: '2025-06-15',
      views: 1420
    },
    {
      id: 2,
      title: 'State Management in 2025: From Zustand to Redux Toolkit',
      category: 'React & Frontend',
      status: 'SCHEDULED',
      date: '2025-06-25',
      views: 0
    },
    {
      id: 3,
      title: 'Optimizing Node.js APIs for High Throughput Applications',
      category: 'Backend Engineering',
      status: 'DRAFT',
      date: '2025-07-01',
      views: 0
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'React & Frontend',
    status: 'DRAFT',
    date: new Date().toISOString().split('T')[0],
    views: 0
  });

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'React & Frontend',
      status: 'DRAFT',
      date: new Date().toISOString().split('T')[0],
      views: 0
    });
    setShowModal(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({ ...blog });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete blog post entry?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setBlogs(blogs.map(b => b.id === editingId ? { ...formData, id: editingId } : b));
    } else {
      setBlogs([...blogs, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Manage Blog Articles</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Publish technical articles, track readership views, and schedule drafts.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {/* Internal Search Bar for Articles */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filteredBlogs.length} articles found</span>
      </div>

      {/* Blog Table */}
      <div className="rounded-2xl glass-card border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Article Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Publish Date</th>
                <th className="px-5 py-3">Views</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 font-bold text-white max-w-xs">{blog.title}</td>
                  <td className="px-5 py-4 text-cyan-400 font-medium">{blog.category}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      blog.status === 'PUBLISHED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : blog.status === 'SCHEDULED'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{blog.date}</td>
                  <td className="px-5 py-4 font-semibold text-slate-200">{blog.views.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(blog)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Blog Entry' : 'Create Blog Post'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master TypeScript 5.0"
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
                    placeholder="e.g. Web Development"
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
                    <option value="DRAFT">DRAFT</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Publish Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input"
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
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
