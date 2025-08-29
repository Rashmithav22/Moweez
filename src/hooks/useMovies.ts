// hooks/useMovies.ts
'use client';
import { useState, useEffect } from 'react';
import { Movie } from '@/types/Movie';

export function useMovies(initialMovies: Movie[] = []) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  // Optional: load from localStorage if needed
  useEffect(() => {
    const stored = localStorage.getItem('movies');
    if (stored) setMovies(JSON.parse(stored));
  }, []);

  return { movies, setMovies };
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchUnsplashImages, UnplashImages} from '@/lib/unsplash';
// import { Movie } from '@/types/Movie';
// export function useMovies(initialQuery: string = 'popular') {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState(initialQuery);
//   const videoPool = [
//   "/videos/video1.mp4",
//   "/videos/video2.mp4",
//   "/videos/video3.mp4",
// ];

//   useEffect(() => {
//     async function loadMovies() {
//       setLoading(true);
//       try {
//         const images: UnplashImages[] = await fetchUnsplashImages(query, 20);
//         const mapped: Movie[] = images.map((img, index) => ({
//   id: img.id,
//   title: img.alt_description || 'Untitled Movie',
//   posterUrl: img.urls.small || '/placeholder.png', // required
//   description: img.description || img.alt_description || 'No description available.', // required
//   imageUrl: img.urls.small || '/placeholder.png', // optional or remove if not needed
//   extraInfo: '2025 • Genre', // optional
//   rating: Math.floor(Math.random() * 5) + 1, // optional
//   videoSrc: videoPool[index % videoPool.length], // required
//   videos: [
//     `/clips/clip${(index % 3) + 1}.mp4`,
//     `/clips/clip${((index + 1) % 3) + 1}.mp4`,
//   ], // optional
//   resumeTime: 0, // optional
//   alt_description: img.alt_description || "Untitled", // optional
//   urls: img.urls, // optional
// }));

//         setMovies(mapped);
//         localStorage.setItem("movies", JSON.stringify(mapped));

//       } finally {
//         setLoading(false);
//       }
//     }
//     loadMovies();
//   }, [query]);

//   return { movies, loading, setQuery };
// }


