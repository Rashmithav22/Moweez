'use client';

import { useState } from 'react';

interface User {
  name: string;
  email: string;
}

export const useAuth = () => {
  // Fake auth state — replace with real API calls
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    setUser({ name: 'John Doe', email });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};


// // src/context/AuthModalContext.tsx
// import { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthModalContextValue {
//   user: User | null;
//   login: (email: string, password: string) => void;
//   logout: () => void;
//   openAuthModal: (callback?: () => void) => void;
//   closeAuthModal: () => void;
//   activeTab: 'login' | 'signup';
// }

// const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

// export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

//   const login = (email: string, password: string) => {
//     setUser({ id: crypto.randomUUID(), name: 'John Doe', email });
//   };

//   const logout = () => setUser(null);

//   const openAuthModal = (callback?: () => void) => { /*...*/ };
//   const closeAuthModal = () => { /*...*/ };

//   return (
//     <AuthModalContext.Provider
//       value={{ user, login, logout, openAuthModal, closeAuthModal, activeTab }}>
//       {children}
//     </AuthModalContext.Provider>
//   );
// };

// // ✅ Hook to use auth context
// export const useAuth = () => {
//   const ctx = useContext(AuthModalContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthModalProvider');
//   return ctx;
// };
