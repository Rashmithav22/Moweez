


// // src/context/ContinueWatchingContext.tsx
// 'use client';
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { WatchProgress } from "@/types/WatchProgress";
// import { useAuth } from "@/context/AuthModalContext";

// interface ContinueWatchingContextProps {
//   items: WatchProgress[];
//   addOrUpdateProgress: (progress: WatchProgress) => void;
//   clearProgress: (movieId: string) => void;
// }

// const ContinueWatchingContext = createContext<ContinueWatchingContextProps | undefined>(undefined);

// export const ContinueWatchingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth();
//   const [items, setItems] = useState<WatchProgress[]>([]);

//   // Load saved progress
//   useEffect(() => {
//     if (!user) return;
//     const stored = localStorage.getItem(`continueWatching_${user.email}`);
//     if (stored) setItems(JSON.parse(stored));
//   }, [user]);

//   // Save whenever items change
//   useEffect(() => {
//     if (!user) return;
//     localStorage.setItem(`continueWatching_${user.email}`, JSON.stringify(items));
//   }, [items, user]);

//   const addOrUpdateProgress = (progress: WatchProgress) => {
//     setItems((prev) => {
//       // Remove if finished
//       if (progress.progress >= progress.duration) {
//         return prev.filter(p => p.movie.id !== progress.movie.id);
//       }

//       const existing = prev.find(p => p.movie.id === progress.movie.id);
//       if (existing) {
//         return prev.map(p => p.movie.id === progress.movie.id ? progress : p);
//       }

//       return [...prev, progress];
//     });
//   };

//   return (
//     <ContinueWatchingContext.Provider value={{ items, addOrUpdateProgress,clearProgress(movieId) {
        
//     }, }}>
//       {children}
//     </ContinueWatchingContext.Provider>
//   );
// };

// export const useContinueWatching = () => {
//   const ctx = useContext(ContinueWatchingContext);
//   if (!ctx) throw new Error("useContinueWatching must be used within ContinueWatchingProvider");
//   return ctx;
// };



'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { WatchProgress } from "@/types/WatchProgress";
import { useAuth } from "@/context/AuthModalContext";

interface ContinueWatchingContextProps {
  items: WatchProgress[];
  addOrUpdateProgress: (progress: WatchProgress) => void;
  clearProgress: (movieId: string) => void;
}

const ContinueWatchingContext = createContext<ContinueWatchingContextProps | undefined>(undefined);

export const ContinueWatchingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WatchProgress[]>([]);

  // Load saved progress on mount or user change
 useEffect(() => {
  if (!user) {
    setItems([]);
    return;
  }
  const stored = localStorage.getItem(`continueWatching_${user.email}`);
  if (stored) {
    try {
      setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
  }
}, [user]);

useEffect(() => {
  if (!user) return;
  localStorage.setItem(`continueWatching_${user.email}`, JSON.stringify(items));
}, [items, user]);


  const addOrUpdateProgress = (progress: WatchProgress) => {
    setItems((prev) => {
      const existing = prev.find(p => p.movie.id === progress.movie.id);
      if (existing) {
        // Remove if fully watched
        if (progress.progress >= progress.duration) {
          return prev.filter(p => p.movie.id !== progress.movie.id);
        }
        return prev.map(p => p.movie.id === progress.movie.id ? progress : p);
      }
      // Add new if not finished
      if (progress.progress < progress.duration) return [...prev, progress];
      return prev;
    });
  };

  const clearProgress = (movieId: string) => {
    setItems(prev => prev.filter(p => p.movie.id !== movieId));
  };

  return (
    <ContinueWatchingContext.Provider value={{ items, addOrUpdateProgress, clearProgress }}>
      {children}
    </ContinueWatchingContext.Provider>
  );
};

export const useContinueWatching = () => {
  const ctx = useContext(ContinueWatchingContext);
  if (!ctx) throw new Error("useContinueWatching must be used within ContinueWatchingProvider");
  return ctx;
};
