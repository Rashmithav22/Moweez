
'use client';

import React, { useState, useEffect } from 'react';
import ExplorePanel from '@/components/explore/ExplorePanel';
import { fetchUnsplashImages, UnplashImages } from '@/lib/unsplash';


const genres = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romantic'];
const languages = ['All', 'English', 'French', 'Spanish', 'Hindi', 'German'];

function assignGenreAndLanguage(id: string) {
  const genreOptions = genres.slice(1); 
  const languageOptions = languages.slice(1); 

  const genreIndex = id.charCodeAt(0) % genreOptions.length;
  const languageIndex = id.charCodeAt(id.length - 1) % languageOptions.length;

  return {
    genre: genreOptions[genreIndex],
    language: languageOptions[languageIndex],
  };
}

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [movies, setMovies] = useState<UnplashImages[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      try {
        const images = await fetchUnsplashImages('movie posters', 12);
        setMovies(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const adaptedMovies = movies.map((img) => {
    const { genre, language } = assignGenreAndLanguage(img.id);
    return {
      id: img.id,
      title: img.alt_description || 'Untitled',
      posterUrl: img.urls.small,
      description: img.description || img.alt_description || '',
      genre,
      language,
      videos: [], // Add empty videos array to satisfy Movie interface
    };
  });

  // Filtering happens instantly here before passing to ExplorePanel
  const filteredMovies = adaptedMovies.filter((movie) => {
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    const matchesLanguage = selectedLanguage === 'All' || movie.language === selectedLanguage;
    return matchesGenre && matchesLanguage;
  });

  return (
    <main className="overflow-hidden min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl mb-6">Explore Movies</h1>

      <ExplorePanel
        visible={true}
        loading={loading}
        genres={genres}
        languages={languages}
        movies={filteredMovies} // ✅ now passing filtered movies
        selectedGenre={selectedGenre}
        selectedLanguage={selectedLanguage}
        onSelectGenre={setSelectedGenre}
        onSelectLanguage={setSelectedLanguage}
      />
    </main>
  );
}
