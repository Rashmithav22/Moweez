// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useDebounce } from '@/hooks/useDebounce';
// import ResultCard, { SearchResult } from '@/app/search/ResultCard';
// import { useMovies } from '@/hooks/useMovies';
// import { useRouter } from 'next/navigation';

// export default function SearchPage() {
//   const { movies } = useMovies();
//   const [query, setQuery] = useState('');
//   const debouncedQuery = useDebounce(query, 300);
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router=useRouter();

//   useEffect(() => {
//     if (!debouncedQuery.trim()) {
//       setResults([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     const timeout = setTimeout(() => {
//       const filtered = movies.filter((movie) =>
//         movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
//       );

//       // adapt Movie type -> SearchResult type
//       const adapted: SearchResult[] = filtered.map((m) => ({
//         id: m.id,
//         type: 'movie',
//         title: m.title,
//         description: m.description,
//         imageUrl: m.imageUrl,
//         extraInfo: m.extraInfo,
//       }));

//       setResults(adapted);
//       setLoading(false);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [debouncedQuery, movies]);

//   return (
//     <main className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 dark: text-white">Search</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search movies..."
//         className="
//     w-full px-4 py-2 rounded-md border
//     text-gray-900 dark:text-gray-100
//     bg-white dark:bg-gray-800
//     border-gray-300 dark:border-gray-600
//     placeholder-gray-500 dark:placeholder-gray-400
//     focus:outline-none focus:ring-2 focus:ring-indigo-500
//     hover:bg-gray-100
//   "
//       />

//       {loading && <p className="text-gray-400">Searching...</p>}

//       {!loading && results.length === 0 && debouncedQuery.trim() !== '' && (
//         <p className="text-gray-200">No results found for "{debouncedQuery}"</p>
//       )}

//       <div className="flex flex-col space-y-2">
//         {results.map((result) => (
//           <ResultCard
//             key={result.id}
//             result={result}
//             onClick={(id) => {
//   const movie = movies.find((m) => m.id === id);
//   if (movie) {
//     localStorage.setItem('selectedMovie', JSON.stringify(movie));
//     router.push(`/watch/${id}`);
//   }
//             }}

//           />
//         ))}
//       </div>
//     </main>
//   );
// }





//  'use client'
// import React, { useEffect, useState } from 'react';
// import { useDebounce } from '@/hooks/useDebounce';
// import MovieCard from '@/components/explore/MovieCard';
// import { useMovies } from '@/hooks/useMovies';
// import { useRouter } from 'next/navigation';
// import type { Movie } from '@/types/Movie';

// export default function SearchPage() {
//   const { movies } = useMovies(); // your full movies list
//   const [query, setQuery] = useState('');
//   const debouncedQuery = useDebounce(query, 300);
//   const [results, setResults] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (!debouncedQuery.trim()) {
//       setResults([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     const timeout = setTimeout(() => {
//       const filtered = movies.filter((movie) =>
//         movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
//       );

//       setResults(filtered); // <- directly store Movie objects
//       setLoading(false);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [debouncedQuery, movies]);

//   const handleMovieClick = (movie: Movie) => {
//     // Save selected movie so WatchPage can pick it up
//     localStorage.setItem('selectedMovie', JSON.stringify(movie));
//     router.push(`/watch/${movie.id}`);
//   };

//   return (
//     <main className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-white">Search</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search movies..."
//         className="w-full px-4 py-2 rounded-md border
//           text-gray-900 dark:text-gray-100
//           bg-white dark:bg-gray-800
//           border-gray-300 dark:border-gray-600
//           placeholder-gray-500 dark:placeholder-gray-400
//           focus:outline-none focus:ring-2 focus:ring-indigo-500
//           hover:bg-gray-100"
//       />

//       {loading && <p className="text-gray-400">Searching...</p>}
//       {!loading && results.length === 0 && debouncedQuery.trim() !== '' && (
//         <p className="text-gray-200">No results found for "{debouncedQuery}"</p>
//       )}

//       <div className="flex flex-col space-y-2 mt-4">
//         {results.map((movie) => (
//           <div
//             key={movie.id}
//             className="cursor-pointer hover:bg-gray-800 p-2 rounded flex items-center"
//             onClick={() => handleMovieClick(movie)}
//           >
//             <img
//               src={movie.posterUrl}
//               alt={movie.title}
//               className="w-16 h-24 object-cover rounded mr-4"
//             />
//             <div>
//               <h3 className="text-white font-semibold">{movie.title}</h3>
//               <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useDebounce } from '@/hooks/useDebounce';
// import MovieCard from '@/components/explore/MovieCard';
// import { useRouter } from 'next/navigation';
// import { Movie } from '@/types/Movie';

// export default function SearchPage() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [query, setQuery] = useState('');
//   const debouncedQuery = useDebounce(query, 300);
//   const [results, setResults] = useState<Movie[]>([]);
//   const router = useRouter();

//   // Load movies from localStorage
//   useEffect(() => {
//     const storedMovies = localStorage.getItem('movies');
//     if (storedMovies) setMovies(JSON.parse(storedMovies));
//   }, []);

//   // Filter movies based on search
//   useEffect(() => {
//     if (!debouncedQuery.trim()) {
//       setResults([]);
//       return;
//     }
//     const filtered = movies.filter((movie) =>
//       movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
//     );
//     setResults(filtered);
//   }, [debouncedQuery, movies]);

//   return (
//     <main className="min-h-screen py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search movies..."
//         className="w-full px-4 py-2 rounded-md border
//           text-gray-900 dark:text-gray-100
//           bg-white dark:bg-gray-800
//           border-gray-300 dark:border-gray-600
//           placeholder-gray-500 dark:placeholder-gray-400
//           focus:outline-none focus:ring-2 focus:ring-indigo-500
//           hover:bg-gray-100"
//       />

//       <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {results.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             {...movie}
//             onClick={() => router.push(`/watch/${movie.id}`)}
//           />
//         ))}
//       </section>

//       {results.length === 0 && query.trim() !== '' && (
//         <p className="text-gray-200 mt-4">No results found for "{query}"</p>
//       )}
//     </main>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import MovieCard from '@/components/explore/MovieCard';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/Movie';

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 2000); // wait 400ms after typing
  const [results, setResults] = useState<Movie[]>([]);
  const router = useRouter();

  // Load movies from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem('movies');
    if (stored) setMovies(JSON.parse(stored));
  }, []);

  // Filter movies based on debounced query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]); // no results if search is empty
      return;
    }

    const filtered = movies.filter((m) =>
      m.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setResults(filtered);
  }, [debouncedQuery, movies]);

  return (
    <main className="min-h-screen py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Search Movies</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="
          w-full px-4 py-2 rounded-md border
          text-gray-900 dark:text-gray-100
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          hover:bg-gray-100 mb-6
        "
      />

      {results.length === 0 && query.trim() !== '' && (
        <p className="text-gray-200 mt-4">No results found for "{query}"</p>
      )}

      {/* <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            onClick={() => router.push(`/watch/${movie.id}`)}
          />
        ))}
      </section> */}
     <section className="flex flex-col space-y-2 px-4">
  {results.map((movie) => (
    <div
      key={movie.id}
      className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer"
      onClick={() => router.push(`/watch/${movie.id}`)}
    >
      {/* Small thumbnail */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-12 h-16 object-cover rounded"
      />
      {/* Movie title/details */}
      <div className="flex flex-col">
        <span className="font-medium text-sm">{movie.title}</span>
        <span className="text-xs text-muted-foreground">{movie.genre}</span>
      </div>
    </div>
  ))}
</section>

    </main>
  );
}
