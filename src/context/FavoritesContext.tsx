import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Movie } from '@/types/Movie';

type Ctx = { favorites: Movie[]; toggleFavorite: (m: Movie) => void; isFavorite: (id: string) => boolean; };
const C = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  useEffect(() => { const raw = localStorage.getItem('favorites'); if (raw) setFavorites(JSON.parse(raw)); }, []);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (m: Movie) =>
    setFavorites(prev => prev.some(x => x.id === m.id) ? prev.filter(x => x.id !== m.id) : [...prev, m]);
  const isFavorite = (id: string) => favorites.some(x => x.id === id);

  return <C.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</C.Provider>;
}
export const useFavorites = () => {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
