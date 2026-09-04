import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  demoLogin: (role?: 'user' | 'admin') => void;
  logout: () => void;
  updateUserPlan: (plan: 'free' | 'pro' | 'executive') => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  uid: 'demo-user-123',
  email: 'alex.vance@example.com',
  displayName: 'Alex Vance',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'pro',
  createdAt: new Date().toISOString(),
  downloadsCount: 14,
  aiCredits: 85,
  isAdmin: false
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('resumeai_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER; // Default logged in demo user for immediate experience
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('resumeai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('resumeai_user');
    }
  }, [user]);

  const login = async (email: string) => {
    // Simulated Auth Login
    const nameFromEmail = email.split('@')[0];
    const newUser: UserProfile = {
      uid: 'user-' + Date.now(),
      email,
      displayName: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      photoURL: `https://ui-avatars.com/api/?name=${nameFromEmail}&background=4F46E5&color=fff`,
      plan: 'pro',
      createdAt: new Date().toISOString(),
      downloadsCount: 3,
      aiCredits: 50,
      isAdmin: email.includes('admin')
    };
    setUser(newUser);
  };

  const signup = async (email: string, _pass: string, name: string) => {
    const newUser: UserProfile = {
      uid: 'user-' + Date.now(),
      email,
      displayName: name || 'New User',
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=7C3AED&color=fff`,
      plan: 'pro',
      createdAt: new Date().toISOString(),
      downloadsCount: 0,
      aiCredits: 50,
      isAdmin: false
    };
    setUser(newUser);
  };

  const loginWithGoogle = async () => {
    const googleUser: UserProfile = {
      uid: 'google-user-' + Date.now(),
      email: 'alex.google@example.com',
      displayName: 'Alex Vance (Google)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      plan: 'pro',
      createdAt: new Date().toISOString(),
      downloadsCount: 8,
      aiCredits: 100,
      isAdmin: false
    };
    setUser(googleUser);
  };

  const demoLogin = (role: 'user' | 'admin' = 'user') => {
    if (role === 'admin') {
      setUser({
        ...DEFAULT_DEMO_USER,
        displayName: 'Admin Manager',
        email: 'admin@resumeai.pro',
        isAdmin: true,
        plan: 'executive'
      });
    } else {
      setUser(DEFAULT_DEMO_USER);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserPlan = (plan: 'free' | 'pro' | 'executive') => {
    if (user) {
      setUser({ ...user, plan });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      loginWithGoogle,
      demoLogin,
      logout,
      updateUserPlan
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
