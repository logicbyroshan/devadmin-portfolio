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
    return {
      username: 'admin',
      name: 'Roshan Kumar',
      email: 'roshan.dev@example.com',
      role: 'Super Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };
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
            setUser({
              username: profile.username,
              name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username,
              email: profile.email || 'roshan.dev@example.com',
              role: profile.is_superuser ? 'Super Administrator' : 'Platform Administrator',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
            });
          }
        } catch {
          // Keep local state if offline
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

        const newUser = {
          username: username,
          name: username === 'admin' ? 'Roshan Kumar' : username,
          email: `${username}@devadmin.io`,
          role: 'Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        };
        setUser(newUser);
        localStorage.setItem('devadmin_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      // Fallback demo login if offline/local
      if (username === 'admin') {
        const demoUser = {
          username: 'admin',
          name: 'Roshan Kumar',
          email: 'roshan.dev@example.com',
          role: 'Super Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        };
        setUser(demoUser);
        localStorage.setItem('devadmin_user', JSON.stringify(demoUser));
        setIsAuthModalOpen(false);
        return { success: true };
      }
      throw err;
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
        const newUser = {
          username: res.user?.username || userData.username,
          name: `${res.user?.first_name || userData.first_name || ''} ${res.user?.last_name || userData.last_name || ''}`.trim() || userData.username,
          email: res.user?.email || userData.email,
          role: 'Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        };
        setUser(newUser);
        localStorage.setItem('devadmin_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        return { success: true };
      }
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
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
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
