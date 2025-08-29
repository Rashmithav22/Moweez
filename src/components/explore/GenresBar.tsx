'use client';

import React from 'react';

interface GenresBarProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

const GenresBar: React.FC<GenresBarProps> = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <section className="my-6 max-w-6xl mx-auto px-4 z-50">
      <h2 className="text-white text-xl font-semibold mb-4">Genres</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`whitespace-nowrap px-5 py-2 rounded-full font-semibold transition ${
              selectedGenre === genre
                ? 'bg-[#0DD3F5] text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-[#0bbdd6] hover:text-black'
            }`}
            onClick={() => onSelectGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GenresBar;
