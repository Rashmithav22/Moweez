  // 'use client';

  // import React, {useState, useEffect, useRef } from 'react';
  // import { gsap } from 'gsap';
  // import GenresList from './GenresList';
  // import LanguageSelector from './LanguageSelector';
  // import MovieCard from './MovieCard';
  // import { Button } from '@/components/ui/Button';
  // import Navbar from '@/components/layout/Navbar'
  // import { useDebounce } from '@/hooks/useDebounce';


  // interface Movie {
  //   id: string;
  // title: string;
  // posterUrl: string;
  // description: string;
  // genre: string;
  // language: string;
  // videoSrc: string;
  // }

  // interface ExplorePanelProps {
  //   visible: boolean;
  //   loading?: boolean;
  //   genres: string[];
  //   languages: string[];
  //   movies: Movie[];
  //   selectedGenre: string;
  //   selectedLanguage: string;
  //   onSelectGenre: (genre: string) => void;
  //   onSelectLanguage: (language: string) => void;
    
    
  // }

  // export default function ExplorePanel({
  //   visible,
  //   loading,
  //   genres,
  //   languages,
  //   movies,
  //   selectedGenre,
  //   selectedLanguage,
  //   onSelectGenre,
  //   onSelectLanguage,
  
  // }: ExplorePanelProps) {
  //   const panelRef = useRef<HTMLDivElement>(null);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [category, setCategory] = useState('Movies');
  //   const [movie, setMovie] = useState<Movie[]>([]);
  //   const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
  //   useEffect(() => {
  //     const fetchMovies = async () => {
  //       try {
  //         const res = await fetch(
  //           `https://api.unsplash.com/search/photos?query=${encodeURIComponent(category)}&per_page=12&client_id=${UNSPLASH_KEY}`
  //         );
  //         const data = await res.json();
  //         const videos = [
  //   "/videos/video1.mp4",
  //   "/videos/video2.mp4",
  //   "/videos/video3.mp4",
  // ];
  //         const formatted = data.results.map((img: any,index:number) => ({
  //           id: img.id,
  //           title: img.alt_description || category,
  //           poster: img.urls.regular,
  //           videoSrc: videos[index % videos.length],
  //         }));
  //         setMovie(formatted);
  //       } catch (err) {
  //         console.error('Error fetching Unsplash data:', err);
  //       }
  //     };

  //     fetchMovies();
  //   }, [category, UNSPLASH_KEY]);

  //   useEffect(() => {
  //     if (!panelRef.current) return;

  //     if (visible) {
  //       gsap.fromTo(
  //         panelRef.current,
  //         { autoAlpha: 0, y: -20, scale: 0.95 },
  //         { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
  //       );
  //     } else {
  //       gsap.to(panelRef.current, {
  //         autoAlpha: 0,
  //         y: -20,
  //         scale: 0.95,
  //         duration: 0.3,
  //         ease: 'power2.in',
  //       });
  //     }
  //   }, [visible]);

  //   const filteredMovies = movies.filter(
  //   (movie) =>
  //     (selectedGenre === 'All' || movie.genre === selectedGenre) &&
  //     (selectedLanguage === 'All' || movie.language === selectedLanguage) &&
  //     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );


  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(category)}&per_page=12&client_id=${UNSPLASH_KEY}`
  //       );
  //       const data = await res.json();

  //       const localVideos = [
  //         "/videos/video1.mp4",
  //         "/videos/video2.mp4",
  //         "/videos/video3.mp4",
          
  //       ];

  //       const formatted = data.results.map((img: any, index: number) => ({
  //         id: img.id,
  //         title: img.alt_description || category,
  //         posterUrl: img.urls.regular,
  //         videoSrc: localVideos[index % localVideos.length] // assign different video
  //       }));

  //       setMovie(formatted);
  //     } catch (err) {
  //       console.error("Error fetching Unsplash data:", err);
  //     }
  //   };

  //   fetchMovies();
  // }, [category, UNSPLASH_KEY]);

  //   return (
  //     <div className=" overflow-hidden min-h-screen w-full p-6
  //       bg-white dark:bg-gray-900
  //       text-gray-900 dark:text-white
        
        
  //     ">
  //       <Navbar onCategoryChange={setCategory} />
  //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
  //         {movie.map((movie) => (
  //           <div key={movie.id} className="rounded-lg overflow-hidden shadow-lg">
  //             <img
  //               src={movie.posterUrl}
  //               alt={movie.title}
  //               className="w-full h-60 object-cover"
  //             />
  //             videoSrc={movie.videoSrc}
  //             <p className=" text-gray-200 text-center py-2">{movie.title}</p>
  //           </div>
  //         ))}
  //       </div>
  //       <GenresList genres={genres} selectedGenre={selectedGenre} onSelectGenre={onSelectGenre} />
  //   <input
  //     type="text"
  //     placeholder="Search movies..."
  //     value={searchQuery}
  //     onChange={(e) => setSearchQuery(e.target.value)}
  //     className=" overflow-hidden px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs flex-grow"
  //   />
  //       <LanguageSelector
  //         languages={languages}
  //         selectedLanguage={selectedLanguage}
  //         onSelectLanguage={onSelectLanguage}
  //       />

  //       {loading ? (
  //         <div className="text-white text-center p-10">Loading images...</div>
  //       ) : (
  //         <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-auto ">
  //           {filteredMovies.length > 0 ? (
  //             filteredMovies.map((movie) => (
  //   <MovieCard key={movie.id} title={movie.title} posterUrl={movie.posterUrl} id={movie.id} />
  // ))

  //           ) : (
  //             <p className="text-white text-center col-span-full">No movies found.</p>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }


  'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import GenresList from './GenresList';
import LanguageSelector from './LanguageSelector';
import MovieCard from './MovieCard';
import Navbar from '@/components/layout/Navbar';
import { Movie } from "@/types/Movie";
import { OptimizedImage } from '../ui/OptimizedImage';
export interface ExplorePanelProps {
  visible: boolean;
  loading?: boolean;
  genres: string[];
  languages: string[];
  movies: Movie[];
  selectedGenre: string;
  selectedLanguage: string;
  onSelectGenre: (genre: string) => void;
  onSelectLanguage: (language: string) => void;
}

export default function ExplorePanel({
  visible,
  loading: _externalLoading, // not used; kept to avoid breaking callers
  genres,
  languages,
  movies: _externalMovies, // not used; instant mode manages its own data
  selectedGenre,
  selectedLanguage,
  onSelectGenre,
  onSelectLanguage,
}: ExplorePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // 👇 Categories match your Navbar exactly
  const CATEGORIES = ['Movies', 'Series', 'Documentary', 'Anime', 'Kids'] as const;
  type Category = typeof CATEGORIES[number];

  const [category, setCategory] = useState<Category>('Movies'); // wired to Navbar
  const [searchQuery, setSearchQuery] = useState('');
  const [allMovies, setAllMovies] = useState<Record<Category, Movie[]>>({
    Movies: [],
    Series: [],
    Documentary: [],
    Anime: [],
    Kids: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const localVideos = useMemo(
    () => ['/videos/video1.mp4', '/videos/video2.mp4', '/videos/video3.mp4'],
    []
  );

  // ✨ Animate panel show/hide (kept from your version)
  useEffect(() => {
    if (!panelRef.current) return;
    if (visible) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: -20, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [visible]);

  // 🔥 Instant switching:
  // Fetch *all* categories once on mount, then just swap arrays when category changes.
  useEffect(() => {
    let cancelled = false;

    async function fetchCategory(cat: Category): Promise<Movie[]> {
      const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cat)}&per_page=16&client_id=${UNSPLASH_KEY}`
      );
      const data = await res.json();

      // fallback lists to avoid empty UI on rare API blanks
      const safeResults: any[] = Array.isArray(data?.results) ? data.results : [];

      return safeResults.map((img: any, index: number) => {
        const gIdx = Math.floor(Math.random() * Math.max(1, genres.length - 1)) + 1; // avoid 'All'
        const lIdx = Math.floor(Math.random() * Math.max(1, languages.length - 1)) + 1; // avoid 'All'

        return {
          id: img.id,
          title: img.alt_description || cat,
          posterUrl: img.urls?.regular || img.urls?.small || '',
          description:
            img.description || img.alt_description || 'No description available.',
          genre: genres[gIdx] || 'Action',
          language: languages[lIdx] || 'English',
          videoSrc: localVideos[index % localVideos.length],
        } as Movie;
      });
    }

    async function preloadAll() {
      setIsLoading(true);
      try {
        const results = await Promise.all(CATEGORIES.map((c) => fetchCategory(c)));
        if (cancelled) return;

        const next: Record<Category, Movie[]> = { ...allMovies };
        CATEGORIES.forEach((c, i) => {
          next[c] = results[i] || [];
        });
        setAllMovies(next);
      } catch (e) {
        // keep existing state; show whatever we have
        console.error('Error preloading categories:', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    preloadAll();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // 🎯 Movies for the current category
  const currentCategoryMovies = allMovies[category] || [];

  // 🔎 Apply local filters (genre, language, search) — instant
  const filteredMovies = currentCategoryMovies.filter((m) => {
    const okGenre = selectedGenre === 'All' || m.genre === selectedGenre;
    const okLang = selectedLanguage === 'All' || m.language === selectedLanguage;
    const okSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return okGenre && okLang && okSearch;
  });

  return (
    <div
      ref={panelRef}
      className="overflow-hidden min-h-screen w-full p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      {/* Navbar: clicking a category is now INSTANT (no refetch) */}
      <Navbar 
        onCategoryChange={(cat) => setCategory(cat as Category)}
        selectedCategory={category}
        onSidebarToggle={() => {}}
      />

      {/* Top grid you already had (kept). Shows raw posters of the current category */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
        {(allMovies[category] || []).map((m) => (
          <div key={m.id} className="rounded-lg overflow-hidden shadow-lg">
            <OptimizedImage
  src={m.posterUrl}
  alt={m.title}
  width={400}
  height={240}
  className="w-full h-60 object-cover rounded-lg"
/>

            <p className="text-gray-200 text-center py-2">{m.title}</p>
          </div>
        ))}
      </div>

      {/* Controls (kept) */}
      <GenresList
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
      />

      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="overflow-hidden px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs flex-grow"
      />

      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={onSelectLanguage}
      />

      {/* Main grid: uses filteredMovies (instant) */}
      {isLoading ? (
        <div className="text-white text-center p-10">Loading images...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-auto">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((m) => (
              <MovieCard
                key={m.id}
                id={m.id}
                title={m.title}
                posterUrl={m.posterUrl}
                description={m.description}
                videoSrc={m.videoSrc}
                alt_description={m.title}         // required
                urls={{ regular: m.posterUrl }}   // required
                videos={m.videos || []}  
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
