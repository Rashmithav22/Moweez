'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from '@/components/sections/Hero';
import ExplorePanel from '@/components/explore/ExplorePanel';
import { fetchUnsplashImages, UnplashImages } from '@/lib/unsplash';
import gsap from 'gsap';
import { AuthModalProvider, useAuth } from "@/context/AuthModalContext";
import AuthOverlay from "@/components/auth/AuthOverlay";
import { Movie } from "@/types/Movie";

const genres = ['All', 'Romantic', 'Horror', 'Action', 'Comedy'];
const languages = ['All', 'English', 'Hindi', 'Spanish'];

export default function HomeContent() {
  const [exploreVisible, setExploreVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const imgs: UnplashImages[] = await fetchUnsplashImages('movie posters', 30);
        // in HomeContent's loadMovies mapping
        const movieData: Movie[] = imgs.map((img,index) => ({
          id: img.id,
          title: img.alt_description || 'Untitled',
          posterUrl: img.urls.small,
          description: img.description || img.alt_description || '',
          genre: 'All',
          language: 'English',
          alt_description: img.alt_description || "Untitled",
  urls: img.urls,
   videos: [
        `/videos/clip${(index % 3) + 1}.mp4`,
        `/videos/clip${((index + 1) % 3) + 1}.mp4`,
        `/videos/clip${((index + 2) % 3) + 1}.mp4`,
      ],
        }));

        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  useEffect(() => {
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  const filteredMovies = movies.filter(
    (movie) => selectedLanguage === 'All' || movie.language === selectedLanguage
  );

  return (
    <>
    
    <div
      ref={bgRef}
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCgs2bDM9emO-qyS8cJHOGSQBS86tVb13c8Q&s')`,
      }}
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-400 bg-opacity-40 dark:bg-black dark:bg-opacity-70" />
     
      {/* Content */}
      <div className="relative z-10 p-6 text-white">
        <Hero onExploreClick={() => setExploreVisible(true)} />


        {/* Explore Overlay */}
        {exploreVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 text-white z-50 overflow-auto p-6"
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={() => setExploreVisible(false)}
              className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-semibold"
            >
              &larr; Back
            </button>
            <ExplorePanel
              visible={exploreVisible}
              loading={loading}
              genres={genres}
              languages={languages}
              movies={filteredMovies}
              selectedGenre={selectedGenre}
              selectedLanguage={selectedLanguage}
              onSelectGenre={setSelectedGenre}
              onSelectLanguage={setSelectedLanguage}
            />
            
          </div>
        )}
      </div>
    </div>
    {/* <Rotating3DCarousel items={movies} /> */}
    
    </>
  );
}
