import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devadmin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check auth session on boot
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        try {
          const profile = await authApi.getMe();
          if (profile) {
            const userData = {
              id: profile.id,
              username: profile.username,
              name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username,
              email: profile.email || `${profile.username}@devadmin.io`,
              role: profile.is_superuser ? 'Super Administrator' : (profile.is_staff ? 'Platform Administrator' : 'Developer Admin'),
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
            };
            setUser(userData);
            localStorage.setItem('devadmin_user', JSON.stringify(userData));
          }
        } catch (err) {
          // If token check fails and no user, clear
          if (!localStorage.getItem('refresh_token')) {
            logout();
          }
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(username, password);
      if (res && res.access) {
        localStorage.setItem('access_token', res.access);
        if (res.refresh) localStorage.setItem('refresh_token', res.refresh);
        setToken(res.access);
        setRefreshToken(res.refresh || null);

        // Fetch user profile from /auth/me/
        let profile = null;
        try {
          profile = await authApi.getMe();
        } catch {
          profile = null;
        }

        const newUser = {
          id: profile?.id || 1,
          username: profile?.username || username,
          name: profile ? (`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username) : (username === 'admin' ? 'Roshan Kumar' : username),
          email: profile?.email || `${username}@devadmin.io`,
          role: profile?.is_superuser ? 'Super Administrator' : 'Platform Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        };
        setUser(newUser);
        localStorage.setItem('devadmin_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        return { success: true, user: newUser };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(userData);
      if (res && res.access) {
        localStorage.setItem('access_token', res.access);
        if (res.refresh) localStorage.setItem('refresh_token', res.refresh);
        setToken(res.access);
        setRefreshToken(res.refresh || null);

        const newUser = {
          id: res.user?.id,
          username: res.user?.username || userData.username,
          name: `${res.user?.first_name || userData.first_name || ''} ${res.user?.last_name || userData.last_name || ''}`.trim() || userData.username,
          email: res.user?.email || userData.email,
          role: 'Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        };
        setUser(newUser);
        localStorage.setItem('devadmin_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        return { success: true, user: newUser };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      const res = await authApi.changePassword(currentPassword, newPassword);
      if (res && res.access) {
        localStorage.setItem('access_token', res.access);
        if (res.refresh) localStorage.setItem('refresh_token', res.refresh);
        setToken(res.access);
        setRefreshToken(res.refresh || null);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('devadmin_user');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token || !!user,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
