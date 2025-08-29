
"use client";
import React from "react";
import type { Movie } from "@/types/Movie";
import { useContinueWatching } from "@/context/ContinueWatchingContext";

interface ContinueWatchingProps {
  movies: Movie[];
  onMovieClick: (id: string) => void;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ onMovieClick }) => {
  const { items } = useContinueWatching();

  if (!items || items.length === 0) {
    return <p className="text-gray-400">No movies to continue watching</p>;
  }

  return (
    <div className="mx-auto max-w-6xl ">
      <h2 className="text-white text-2xl font-semibold mb-6 px-2">Continue Watching</h2>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl  mt-6 mx-1 px-4 sm:px-6 lg:px-2">
        {items.map(item => (
          <div
            key={item.movie.id}
            className="relative cursor-pointer"
            onClick={() => onMovieClick(item.movie.id)}
          >
            <img
              src={item.movie.posterUrl}
              alt={item.movie.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-2 w-[calc(100%-0.5rem)] h-2 bg-gray-700 rounded">
              <div
                className="h-full bg-red-600 rounded"
                style={{ width: `${(item.progress / item.duration) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
