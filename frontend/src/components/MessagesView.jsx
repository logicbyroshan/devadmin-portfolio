import React, { useState } from 'react';
import { Mail, Star, Trash2, Reply, CheckCircle2, Clock, Filter, Send, X } from 'lucide-react';

export default function MessagesView() {
  const [filter, setFilter] = useState('ALL');
  const [replyMessage, setReplyMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry regarding React Frontend Contract',
      body: 'Hi Roshan, I came across your impressive web developer portfolio and wanted to ask if you are available for a contract React frontend build next month?',
      time: '2m ago',
      read: false,
      starred: true
    },
    {
      id: 2,
      sender: 'Renuka Dashbanda',
      email: 'renuka.d@company.io',
      subject: 'Feedback on Glassmorphism UI Template',
      body: 'Great work on the modern dev dashboard! The dark theme glass styling looks extremely slick. Let us know when the open source repo is ready.',
      time: '15m ago',
      read: true,
      starred: false
    },
    {
      id: 3,
      sender: 'Riya Sayam',
      email: 'riya@techcorp.com',
      subject: 'Full Stack Engineer Position',
      body: 'Hello Roshan! We would love to discuss an open Senior Engineer role at our team. Please let me know your availability for a 15-minute introductory call.',
      time: '1h ago',
      read: false,
      starred: true
    }
  ]);

  const filteredMessages = messages.filter(m => {
    if (filter === 'UNREAD') return !m.read;
    if (filter === 'STARRED') return m.starred;
    return true;
  });

  const toggleStar = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  const markRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    alert(`Reply sent to ${replyMessage.email}!`);
    setReplyMessage(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>Contact Messages & Inquiries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review inquiries submitted via your portfolio contact form and send instant replies.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {['ALL', 'UNREAD', 'STARRED'].map((tab) => (
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

      {/* Messages Feed */}
      <div className="space-y-3">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => markRead(msg.id)}
            className={`p-5 rounded-2xl glass-card transition-all duration-200 border space-y-3 ${
              msg.read ? 'border-slate-800/80 bg-slate-900/40' : 'border-cyan-500/30 bg-cyan-950/10'
            }`}
          >
            {/* Sender Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-base flex items-center justify-center shadow-md">
                  {msg.sender.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{msg.sender}</h3>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{msg.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {msg.time}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStar(msg.id); }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    msg.starred ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Subject & Body */}
            <div>
              <h4 className="text-xs font-bold text-cyan-400 mb-1">{msg.subject}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{msg.body}</p>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/60">
              <button
                onClick={() => setReplyMessage(msg)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/10"
              >
                <Reply className="w-3.5 h-3.5" /> Reply
              </button>
              <button
                onClick={() => handleDelete(msg.id)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-1.5 border border-rose-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Reply className="w-4 h-4 text-cyan-400" /> Reply to {replyMessage.sender}
              </h3>
              <button onClick={() => setReplyMessage(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">To Email</label>
                <input
                  type="text"
                  disabled
                  value={replyMessage.email}
                  className="w-full px-3 py-2 rounded-xl glass-input opacity-70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message Content</label>
                <textarea
                  rows="4"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full px-3 py-2 rounded-xl glass-input"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReplyMessage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
