


'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  description?: string;
  videoSrc?: string;
  ratings?:number;
}

interface WatchlistContextProps {
  watchlist: Movie[];
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (id: string) => boolean;
   
}
interface WatchlistProviderProps {
  children: React.ReactNode;
  userId: string; // Add this
}

const WatchlistContext = createContext<WatchlistContextProps>({
  watchlist: [],
  toggleWatchlist: () => {},
  isInWatchlist: () => false,
});

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children, userId }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(`watchlist_${userId}`);
    if (stored) setWatchlist(JSON.parse(stored));
  }, [userId]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(watchlist));
    }
  }, [watchlist, mounted, userId]);

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist(prev =>
      prev.find(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isInWatchlist = (id: string) => watchlist.some(m => m.id === id);

  if (!mounted) return null;

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};


export const useWatchlist = () => useContext(WatchlistContext);
