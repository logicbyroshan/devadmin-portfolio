import React, { useState } from 'react';
import { HelpCircle, Plus, ChevronDown, ChevronUp, Edit2, Trash2, X } from 'lucide-react';

export default function FaqsView() {
  const [openId, setOpenId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What services do you offer for clients?',
      answer: 'I specialize in full-stack web application development using React, Next.js, Node.js, and custom UI design systems with glassmorphic aesthetic architecture.'
    },
    {
      id: 2,
      question: 'How do you handle remote contract work?',
      answer: 'I work with async communication via GitHub, Slack, and weekly sprint reviews to ensure full transparency and timely delivery.'
    },
    {
      id: 3,
      question: 'What is your typical project delivery timeline?',
      answer: 'Small web applications take 1-2 weeks, while full enterprise web apps typically take 4-6 weeks depending on feature scope.'
    }
  ]);

  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ question: '', answer: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete FAQ entry?')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setFaqs(faqs.map(f => f.id === editingId ? { ...formData, id: editingId } : f));
    } else {
      setFaqs([...faqs, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Manage Frequently Asked Questions</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Add, edit, or reorganize FAQ cards displayed on your public portfolio page.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add FAQ Item
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="rounded-2xl glass-card border border-slate-800 overflow-hidden transition-all duration-200">
              <div
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>{faq.question}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(faq); }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs border border-slate-700 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs border border-rose-500/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What tools do you use?"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Answer</label>
                <textarea
                  rows="4"
                  required
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Type full answer explanation..."
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
