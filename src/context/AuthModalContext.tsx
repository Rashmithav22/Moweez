// // src/context/AuthModalContext.tsx
// 'use client';

// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation'; 



// export type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// } | null;

// type AuthTab = 'signup' | 'login';

// interface AuthModalContextValue {
//   user: User;
//   open: boolean;
//   tab: AuthTab;
//   openAuthModal: (tab?: AuthTab) => void;
//   closeAuthModal: () => void;
//   login: (user: User) => void;
//   logout: () => void;
// }

// const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

// export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [open, setOpen] = useState(false);
//   const [tab, setTab] = useState<AuthTab>('signup');
//   const [user, setUser] = useState<User>(null);
//    const router = useRouter();
   


//   const [postLoginCallback, setPostLoginCallback] = useState<(() => void) | null>(null);

//   const openAuthModal = (t: AuthTab = 'signup', afterLoginCallback?: () => void) => {
//     setTab(t);
//     setOpen(true);
//     if (afterLoginCallback) setPostLoginCallback(() => afterLoginCallback);
//   };

//   const closeAuthModal = () => setOpen(false);

//   const login = (userData: User) => {
//     setUser(userData);
//     setOpen(false);
//     if (postLoginCallback) {
//       postLoginCallback();
//       setPostLoginCallback(null);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     router.push('/');
//   };
    

//   return (
//     <AuthModalContext.Provider
//       value={{ open, tab, openAuthModal, closeAuthModal, login, logout, user }}
//     >
//       {children}
//     </AuthModalContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthModalContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthModalProvider');
//   return ctx;
// };

'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  name: string;
  email: string;
  avatar?: string;
} | null;

type AuthTab = 'signup' | 'login';

interface AuthModalContextValue {
  user: User;
  loading: boolean;   // ✅ NEW
  open: boolean;
  tab: AuthTab;
  openAuthModal: (tab?: AuthTab, afterLoginCallback?: () => void) => void;
  closeAuthModal: () => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (formData: FormData) => Promise<void>;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<AuthTab>('signup');
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true); // ✅ NEW
  const router = useRouter();

  const [postLoginCallback, setPostLoginCallback] = useState<(() => void) | null>(null);

//  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }
  setLoading(false); // ✅ done restoring
}, []);


  const openAuthModal = (t: AuthTab = 'signup', afterLoginCallback?: () => void) => {
    setTab(t);
    setOpen(true);
    if (afterLoginCallback) setPostLoginCallback(() => afterLoginCallback);
  };

  const closeAuthModal = () => setOpen(false);

  const login = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined' && userData) {
      localStorage.setItem('user', JSON.stringify(userData)); // ✅ persist
    }
    setOpen(false);
    if (postLoginCallback) {
      postLoginCallback();
      setPostLoginCallback(null);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem('user'); // ✅ remove on logout
    router.push('/');
  };

  const updateUser = async (formData: FormData) => {
    if (!user) return;

    const updatedUser: User = {
      name: (formData.get('name') as string) || user.name,
      email: user.email, // must always exist
      avatar: formData.get('avatar')
        ? URL.createObjectURL(formData.get('avatar') as File)
        : user.avatar,
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthModalContext.Provider
      value={{ open, tab, openAuthModal, closeAuthModal, login, logout, user, updateUser, loading }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuth must be used within AuthModalProvider');
  return ctx;
};
