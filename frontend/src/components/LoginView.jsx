import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function LoginView({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#070b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="w-full max-w-md p-8 rounded-2xl glass-card border border-slate-700/80 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <img 
            src="/logo.png" 
            alt="Admin Logo" 
            className="w-16 h-16 mx-auto object-contain"
            onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg'; }}
          />
          <h2 className="text-2xl font-black tracking-tight text-white">Admin Sign In</h2>
          <p className="text-xs text-slate-400">Access your modern Dev-Admin portfolio dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input"
            />
          </div>

          <div className="flex justify-end text-[11px]">
            <a href="#" className="text-cyan-400 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-cyan-400 font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
