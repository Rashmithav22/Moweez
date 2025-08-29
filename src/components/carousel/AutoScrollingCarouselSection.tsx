// src/components/carousel/AutoScrollingCarouselSection.tsx
'use client';

import { useEffect, useState } from 'react';
import AutoScrollingCarousel from './AutoScrollingCarousel';
import { fetchUnsplashImages, UnplashImages } from '@/lib/unsplash';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

export default function AutoScrollingCarouselSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const imgs: UnplashImages[] = await fetchUnsplashImages('movie posters', 30);
        const movieData: Movie[] = imgs.map((img) => ({
          id: img.id,
          title: img.alt_description || 'Untitled',
          posterUrl: img.urls.small,
        }));
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching carousel movies:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading featured movies...</p>;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Featured Movies</h2>
      <AutoScrollingCarousel
        items={movies}
        speed={0.7}
        height={200}
        width={300}
        
      />
    </section>
  );
}
