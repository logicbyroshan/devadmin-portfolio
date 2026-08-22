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
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#07080d] border border-neutral-800 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="text-center space-y-2">
          <img 
            src="/logo.png" 
            alt="DevAdmin Logo" 
            className="w-14 h-14 mx-auto object-contain"
            onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg'; }}
          />
          <h2 className="text-2xl font-black tracking-tight text-white">DevAdmin Sign In</h2>
          <p className="text-xs text-neutral-400">Multi-Website Platform Administrative Control</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg glass-input bg-[#050609] border-neutral-800"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg glass-input bg-[#050609] border-neutral-800"
            />
          </div>

          <div className="flex justify-end text-xs">
            <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In to Dashboard
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-800">
          <p className="text-xs text-neutral-400">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-blue-400 font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
