
// 'use client';

// import React, { useEffect, useState } from 'react';
// import MovieSlider from '@/components/explore/MovieSlider';
// import ContinueWatchingList from '@/components/explore/ContinueWatching';
// import AutoScrollingCarousel from '@/components/carousel/AutoScrollingCarousel';
// import GenresBar from '@/components/explore/GenresBar'; 
// import MovieCard from '@/components/explore/MovieCard';
// import PopularSlider from '@/components/explore/PopularSlider';
// import { fetchUnsplashImages, UnplashImages } from '@/lib/unsplash';
// import { Movie } from '@/types/Movie';
// import { useRouter } from 'next/navigation';
// import { useContinueWatching } from '@/context/ContinueWatchingContext';
// import { useAuth } from '@/context/AuthModalContext';

// const genres = ['All', 'Romantic', 'Horror', 'Action', 'Comedy'];
// const languages = ['All', 'English', 'Hindi', 'Spanish'];

// export default function Movies() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState('All');
//   const router = useRouter();
//   const { items } = useContinueWatching();
//   const { user } = useAuth();

//   const localVideos = [
//     "/videos/video1.mp4",
//     "/videos/video2.mp4",
//     "/videos/video3.mp4",
//   ];

//   useEffect(() => {
//     async function loadMovies() {
//       try {
//         const imgs: UnplashImages[] = await fetchUnsplashImages('movie posters', 30);
//         const movieData: Movie[] = imgs.map((img, index) => ({
//           id: img.id,
//           title: img.alt_description || 'Untitled',
//           posterUrl: img.urls.small,
//           description: img.description || img.alt_description || 'No description available.',
//           genre: genres[Math.floor(Math.random() * (genres.length - 1)) + 1],
//           language: languages[Math.floor(Math.random() * (languages.length - 1)) + 1],
//           videoSrc: localVideos[index % localVideos.length],
//           videos: [
//             `/clips/clip${(index % 3) + 1}.mp4`,
//             `/clips/clip${((index + 1) % 3) + 1}.mp4`,
//           ],
//           resumeTime: 0,
//           alt_description: img.alt_description || "Untitled",
//           urls: img.urls,
//         }));

//         setMovies(movieData);
//         localStorage.setItem('movies', JSON.stringify(movieData));
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     }
//     loadMovies();
//   }, []);

//   // Filter Continue Watching for current logged-in user and unfinished movies
//   const continueWatchingMovies = items
//     .filter(item => user && item.progress < item.duration)
//     .map(item => item.movie);

//   const filteredMovies = selectedGenre === 'All'
//     ? movies
//     : movies.filter(m => m.genre === selectedGenre);

//   return (
//     <main className="min-h-screen py-2">
//       <MovieSlider movies={filteredMovies} onMovieClick={(movieId) => router.push(`/watch/${movieId}`)} />

//       {user && continueWatchingMovies.length > 0 && (
//         <ContinueWatchingList
//           movies={continueWatchingMovies}
//           onMovieClick={(movieId) => router.push(`/watch/${movieId}`)}
//         />
//       )}

      

//       <section className="my-10 max-w-6xl mx-auto">
//         <h2 className="text-white text-2xl font-semibold mb-6">Featured Movies</h2>
//         <AutoScrollingCarousel items={filteredMovies} speed={0.7} height={200} />
//       </section>

//       <PopularSlider />

//       <GenresBar 
//         genres={genres} 
//         selectedGenre={selectedGenre} 
//         onSelectGenre={setSelectedGenre} 
//       />

//       <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6">
//         {filteredMovies.length > 0 ? (
//           filteredMovies.map(movie => (
//             <MovieCard
//               key={movie.id}
//               {...movie}
//             />
//           ))
//         ) : (
//           <p className="text-white text-center col-span-full">No movies found.</p>
//         )}
//       </section>
//     </main>
//   );
// }


'use client';
import { useMoviesContext } from '@/context/MoviesContext';
import React, { useEffect, useState } from 'react';
import MovieSlider from '@/components/explore/MovieSlider';
import ContinueWatchingList from '@/components/explore/ContinueWatching';
import AutoScrollingCarousel from '@/components/carousel/AutoScrollingCarousel';
import GenresBar from '@/components/explore/GenresBar'; 
import MovieCard from '@/components/explore/MovieCard';
import PopularSlider from '@/components/explore/PopularSlider';
import { fetchUnsplashImages, UnplashImages } from '@/lib/unsplash';
import { Movie } from '@/types/Movie';
import { useRouter } from 'next/navigation';
import { useContinueWatching } from '@/context/ContinueWatchingContext';
import { useAuth } from '@/context/AuthModalContext';
const genres = ['All', 'Romantic', 'Horror', 'Action', 'Comedy'];
const languages = ['All', 'English', 'Hindi', 'Spanish'];

export default function Movies() {
const { movies, setMovies } = useMoviesContext();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const router = useRouter();
  const { user } = useAuth();
  const { items } = useContinueWatching();

  const localVideos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ];

  // Load movie data from Unsplash
  useEffect(() => {
    async function loadMovies() {
      try {
        const imgs: UnplashImages[] = await fetchUnsplashImages('movie posters', 30);

        const movieData: Movie[] = imgs.map((img, index) => ({
          id: img.id,
          title: img.alt_description || 'Untitled',
          posterUrl: img.urls.small,
          description: img.description || img.alt_description || 'No description available.',
          genre: genres[Math.floor(Math.random() * (genres.length - 1)) + 1],
          language: languages[Math.floor(Math.random() * (languages.length - 1)) + 1],
          videoSrc: localVideos[index % localVideos.length],
          videos: [
            `/clips/clip${(index % 3) + 1}.mp4`,
            `/clips/clip${((index + 1) % 3) + 1}.mp4`,
          ],
          resumeTime: 0,
          alt_description: img.alt_description || "Untitled",
          urls: img.urls,
        }));

        setMovies(movieData);
        localStorage.setItem('movies', JSON.stringify(movieData));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
    loadMovies();
  }, []);

  // Filtered list of continue watching movies for current user
  const continueWatchingMovies = items
    .filter(item => item.progress < item.duration) // only unfinished
    .map(item => item.movie);

  const handleAddToContinueWatching = (movieId: string) => {
    // nothing here — context handles add/update in WatchPage
  };

  const filteredMovies = selectedGenre === 'All'
    ? movies
    : movies.filter(m => m.genre === selectedGenre);

  return (
    <main className="min-h-screen py-2">
      {/* Continue Watching */}
      <MovieSlider movies={filteredMovies} onMovieClick={handleAddToContinueWatching} />
      {user && continueWatchingMovies.length > 0 && (
        <ContinueWatchingList
          movies={continueWatchingMovies}
          onMovieClick={(movieId) => router.push(`/watch/${movieId}`)}
        />
      )}

      {/* Movie Slider */}
      

      {/* Featured Section */}
      <section className="my-10 max-w-6xl mx-auto mb-6 px-4">
        <h2 className="text-white text-2xl font-semibold mb-6">Featured Movies</h2>
        {/* <AutoScrollingCarousel items={filteredMovies} speed={0.7} height={200} /> */}
        <AutoScrollingCarousel
  items={movies.map(m => ({
    ...m,
    posterUrl: m.posterUrl || '/placeholder.png', // fallback for undefined
  }))}
/>
      </section>

      {/* Popular Slider */}
      <PopularSlider />

      {/* Genres */}
      <GenresBar 
        genres={genres} 
        selectedGenre={selectedGenre} 
        onSelectGenre={setSelectedGenre} 
      />

      {/* Movie Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              {...movie} // pass all props
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No movies found.</p>
        )}
      </section>
    </main>
  );
}
