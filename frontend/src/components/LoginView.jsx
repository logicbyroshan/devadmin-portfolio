import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, Zap, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginView({ onLoginSuccess, onSwitchToSignup }) {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }
    try {
      await login(username.trim(), password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please check your username and password.');
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    try {
      await login('admin', 'admin123');
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#07080d] border border-neutral-800 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">DevAdmin Sign In</h2>
          <p className="text-xs text-neutral-400">Multi-Website Platform Administrative Control</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" /> Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or username"
              className="w-full px-3.5 py-2.5 rounded-lg glass-input bg-[#050609] border-neutral-800 text-white focus:outline-none focus:border-blue-500"
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
              className="w-full px-3.5 py-2.5 rounded-lg glass-input bg-[#050609] border-neutral-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold border border-neutral-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick 1-Click Demo Login (Admin)</span>
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
