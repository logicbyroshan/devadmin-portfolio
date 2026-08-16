import React, { useState } from 'react';
import { Settings, Shield, UserPlus, Save, Lock, Trash2, Edit2, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, X } from 'lucide-react';

export default function SettingsView() {
  const [siteTitle, setSiteTitle] = useState("Roshan's Portfolio");
  const [seoDescription, setSeoDescription] = useState("Welcome to my personal portfolio showcasing my skills and projects.");
  const [seoKeywords, setSeoKeywords] = useState("portfolio, web developer, roshan, projects");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: 'Roshan Kumar (You)', email: 'your.email@example.com', role: 'Super User', status: 'Active' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Normal User', status: 'Temporary' },
    { id: 3, name: 'Mark Smith', email: 'mark.smith@example.com', role: 'Normal User', status: 'Inactive' }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Normal User' });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passFeedback, setPassFeedback] = useState(null);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Date.now(), status: 'Active' }]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'Normal User' });
  };

  const handleDeleteUser = (id) => {
    if (confirm('Remove user access?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPassFeedback({ error: 'New passwords do not match!' });
      return;
    }
    setPassFeedback({ success: 'Password updated successfully!' });
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPassFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>Website Settings & User Access</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage global website configuration, administrative role access, and account security.</p>
        </div>
      </div>

      {/* Section 1: General Site Settings */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" /> General Site Settings
          </h3>
          {savedSettings && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Settings Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Website Title</label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={e => setSiteTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Maintenance Mode</label>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-full px-3.5 py-2 rounded-xl flex items-center justify-between font-bold transition-all border ${
                  maintenanceMode
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span>{maintenanceMode ? 'ENABLED (Site Hidden)' : 'DISABLED (Live)'}</span>
                {maintenanceMode ? <ToggleRight className="w-6 h-6 text-rose-400" /> : <ToggleLeft className="w-6 h-6 text-slate-500" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Default SEO Meta Description</label>
            <textarea
              rows="2"
              value={seoDescription}
              onChange={e => setSeoDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            ></textarea>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Default SEO Meta Keywords (comma-separated)</label>
            <input
              type="text"
              value={seoKeywords}
              onChange={e => setSeoKeywords(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Save className="w-4 h-4" /> Save General Settings
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: User Management */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" /> User Management
          </h3>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/10"
          >
            <UserPlus className="w-3.5 h-3.5" /> Add New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-white">{u.name}</td>
                  <td className="px-4 py-3 text-slate-400">{u.email}</td>
                  <td className="px-4 py-3 font-semibold text-cyan-400">{u.role}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.id !== 1 && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Password Security */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" /> Account Security & Password
          </h3>
          {passFeedback?.success && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {passFeedback.success}
            </span>
          )}
          {passFeedback?.error && (
            <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {passFeedback.error}
            </span>
          )}
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs max-w-md">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Current Password</label>
            <input
              type="password"
              required
              value={passwords.current}
              onChange={e => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">New Password</label>
            <input
              type="password"
              required
              value={passwords.new}
              onChange={e => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Lock className="w-3.5 h-3.5" /> Update Password
          </button>
        </form>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card border border-slate-700 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-cyan-400" /> Add Admin User
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input bg-slate-900"
                >
                  <option value="Normal User">Normal User</option>
                  <option value="Super User">Super User</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
