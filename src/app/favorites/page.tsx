'use client';
import React from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import MovieCard from '@/components/explore/MovieCard';

const FavoritesPage = () => {
  const { watchlist } = useWatchlist(); // now contains full movie objects

  if (!watchlist.length)
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-2xl font-bold">No favorites yet!</h1>
        <p>Add some movies to your watchlist to see them here.</p>
      </div>
    );

  return (
    <div className="p-4 max-w-6xl mx-auto overflow-hidden ">
      <h1 className="text-3xl font-bold text-white mb-6 z-50">My Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* <div className="flex gap-4 overflow-x-auto"> */}
        {watchlist.map((movie: any) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
      </div>
  );
};

export default FavoritesPage;
