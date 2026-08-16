import React, { useEffect } from 'react';
import { LogOut, Loader2, CheckCircle2 } from 'lucide-react';

export default function LogoutModal({ onCancel, onConfirmLogout }) {
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      onConfirmLogout();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-card border border-slate-700/80 rounded-2xl p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {!loggingOut ? (
          <>
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Sign Out Confirmation</h3>
              <p className="text-xs text-slate-400 mt-1">Are you sure you want to log out of your Dev-Admin session?</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onCancel}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-lg shadow-rose-500/20"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="py-6 space-y-3">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-white">Logging Out...</h3>
            <p className="text-xs text-slate-400">Securing your active session tokens.</p>
          </div>
        )}
      </div>
    </div>
  );
}
