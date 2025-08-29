// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { useContinueWatching } from '@/context/ContinueWatchingContext';
// import { useAuth } from '@/context/AuthModalContext';
// import type { Movie } from '@/types/Movie';

// export default function WatchPage() {
//   const params = useParams();
//   const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [showUI, setShowUI] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hideTimer = useRef<NodeJS.Timeout | null>(null);

//   const { addOrUpdateProgress, clearProgress } = useContinueWatching();
//   const { user } = useAuth();

//   // Load movie from localStorage
//   useEffect(() => {
//     if (!id) return;
//     const stored = localStorage.getItem('movies');
//     if (stored) {
//       try {
//         const parsed: Movie[] = JSON.parse(stored);
//         const found = parsed.find((m) => m.id === id);
//         setMovie(found || null);
//       } catch (err) {
//         console.error('Failed to parse movies from localStorage', err);
//       }
//     }
//   }, [id]);

//   // Resume and save progress
//   useEffect(() => {
//     const videoEl = videoRef.current;
//     if (!videoEl || !movie || !user) return;

//     const handleLoaded = () => {
//       try {
//         const stored = localStorage.getItem(`continueWatching_${user.email}`);
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           const progressItem = parsed.find((p: any) => p.movie.id === movie.id);
//           if (progressItem) {
//             videoEl.currentTime = progressItem.progress || 0;
//           }
//         }
//       } catch (err) {
//         console.error('Failed to load continue watching progress', err);
//       }
//     };

//     // const handleTimeUpdate = () => {
//     //   if (!user) return;
//     //   if (!videoEl.duration) return;

//     //   const currentTime = videoEl.currentTime;
//     //   const duration = videoEl.duration;

//     //   // Add or update progress
//     //   addOrUpdateProgress({
//     //     movie,
//     //     progress: currentTime,
//     //     duration,
//     //   });

//     //   // Remove if finished
//     //   if (currentTime + 0.5 >= duration) {
//     //     clearProgress(movie.id);
//     //   }
//     // };
// const handleTimeUpdate = () => {
//   if (!user) return;

//   addOrUpdateProgress({
//     movie,
//     progress: videoEl.currentTime,
//     duration: videoEl.duration || 0,
//   });

//   if (videoEl.currentTime >= (videoEl.duration || 0) - 0.5) {
//     clearProgress(movie.id); // remove only after fully watched
//   }
// };

//     videoEl.addEventListener('loadedmetadata', handleLoaded);
//     videoEl.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       videoEl.removeEventListener('loadedmetadata', handleLoaded);
//       videoEl.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [movie, addOrUpdateProgress, clearProgress, user]);

//   // UI auto-hide
//   const resetHideTimer = () => {
//     setShowUI(true);
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//     hideTimer.current = setTimeout(() => setShowUI(false), 3000);
//   };

//   const handleTogglePlay = () => {
//     const videoEl = videoRef.current;
//     if (!videoEl) return;
//     if (videoEl.paused) videoEl.play();
//     else videoEl.pause();
//     resetHideTimer();
//   };

//   // Initial auto-hide
//  useEffect(() => {
//   if (!movie) return;

//   resetHideTimer();

//   return () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };
// }, [movie]);


//   if (!movie) return (
//     <div className="p-6 text-white">
//       <h2 className="text-xl font-semibold">Movie not found</h2>
//       <p>Check if the movie exists in your list.</p>
//     </div>
//   );

//   return (
//     <div
//       className="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden cursor-pointer"
//       onClick={handleTogglePlay}
//       onMouseMove={resetHideTimer}
//     >
//       {movie.videos?.length ? (
//         <video
//           ref={videoRef}
//           src={movie.videos[0]}
//           autoPlay
//           controls={showUI}
//           className="w-full h-full object-cover"
//           onClick={(e) => e.stopPropagation()}
//         />
//       ) : (
//         <p className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           No video available for this movie.
//         </p>
//       )}

//       <div
//         className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col transition-opacity duration-300 pointer-events-none ${showUI ? 'opacity-100' : 'opacity-0'}`}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
//         <p className="text-lg md:text-xl text-gray-200 max-w-3xl">{movie.description}</p>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { useContinueWatching } from '@/context/ContinueWatchingContext';
// import { useAuth } from '@/context/AuthModalContext';
// import type { Movie } from '@/types/Movie';

// export default function WatchPage() {
//   const params = useParams();
//   const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [showUI, setShowUI] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hideTimer = useRef<NodeJS.Timeout | null>(null);

//   const { addOrUpdateProgress, clearProgress } = useContinueWatching();
//   const { user } = useAuth();

//   // Load movie from localStorage
//   useEffect(() => {
//     if (!id) return;
//     const stored = localStorage.getItem('movies');
//     if (stored) {
//       try {
//         const parsed: Movie[] = JSON.parse(stored);
//         const found = parsed.find((m) => m.id === id);
//         setMovie(found || null);
//       } catch (err) {
//         console.error('Failed to parse movies from localStorage', err);
//       }
//     }
//   }, [id]);

//   // Resume and save progress
//   useEffect(() => {
//     const videoEl = videoRef.current;
//     if (!videoEl || !movie || !user) return;

//     const handleLoaded = () => {
//       try {
//         const stored = localStorage.getItem(`continueWatching_${user.email}`);
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           const progressItem = parsed.find((p: any) => p.movie.id === movie.id);
//           if (progressItem) {
//             videoEl.currentTime = progressItem.progress || 0;
//           }
//         }
//       } catch (err) {
//         console.error('Failed to load continue watching progress', err);
//       }
//     };

//     // const handleTimeUpdate = () => {
//     //   if (!user) return;
//     //   if (!videoEl.duration) return;

//     //   const currentTime = videoEl.currentTime;
//     //   const duration = videoEl.duration;

//     //   // Add or update progress
//     //   addOrUpdateProgress({
//     //     movie,
//     //     progress: currentTime,
//     //     duration,
//     //   });

//     //   // Remove if finished
//     //   if (currentTime + 0.5 >= duration) {
//     //     clearProgress(movie.id);
//     //   }
//     // };
// const handleTimeUpdate = () => {
//   if (!user) return;

//   addOrUpdateProgress({
//     movie,
//     progress: videoEl.currentTime,
//     duration: videoEl.duration || 0,
//   });

//   if (videoEl.currentTime >= (videoEl.duration || 0) - 0.5) {
//     clearProgress(movie.id); // remove only after fully watched
//   }
// };

//     videoEl.addEventListener('loadedmetadata', handleLoaded);
//     videoEl.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       videoEl.removeEventListener('loadedmetadata', handleLoaded);
//       videoEl.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [movie, addOrUpdateProgress, clearProgress, user]);

//   // UI auto-hide
//   const resetHideTimer = () => {
//     setShowUI(true);
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//     hideTimer.current = setTimeout(() => setShowUI(false), 3000);
//   };

//   const handleTogglePlay = () => {
//     const videoEl = videoRef.current;
//     if (!videoEl) return;
//     if (videoEl.paused) videoEl.play();
//     else videoEl.pause();
//     resetHideTimer();
//   };

//   // Initial auto-hide
//  useEffect(() => {
//   if (!movie) return;

//   resetHideTimer();

//   return () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };
// }, [movie]);


//   if (!movie) return (
//     <div className="p-6 text-white">
//       <h2 className="text-xl font-semibold">Movie not found</h2>
//       <p>Check if the movie exists in your list.</p>
//     </div>
//   );

//   return (
//     <div
//       className="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden cursor-pointer"
//       onClick={handleTogglePlay}
//       onMouseMove={resetHideTimer}
//     >
//       {movie.videos?.length ? (
//         <video
//           ref={videoRef}
//           src={movie.videos[0]}
//           autoPlay
//           controls={showUI}
//           className="w-full h-full object-cover"
//           onClick={(e) => e.stopPropagation()}
//         />
//       ) : (
//         <p className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           No video available for this movie.
//         </p>
//       )}

//       <div
//         className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col transition-opacity duration-300 pointer-events-none ${showUI ? 'opacity-100' : 'opacity-0'}`}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
//         <p className="text-lg md:text-xl text-gray-200 max-w-3xl">{movie.description}</p>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useContinueWatching } from '@/context/ContinueWatchingContext';
import { useAuth } from '@/context/AuthModalContext';
import type { Movie } from '@/types/Movie';

export default function WatchPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [showUI, setShowUI] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const { addOrUpdateProgress, clearProgress } = useContinueWatching();
  const { user } = useAuth();

  // Load movie from localStorage
 // Load movie from selectedMovie or fallback to stored movies
useEffect(() => {
  if (!id) return;

  // Try to get selectedMovie first (from search or MovieCard click)
  const selected = localStorage.getItem('selectedMovie');
  if (selected) {
    try {
      const parsed: Movie = JSON.parse(selected);
      if (parsed.id === id) {
        setMovie(parsed);
        return;
      }
    } catch (err) {
      console.error('Failed to parse selectedMovie', err);
    }
  }

  // Fallback: load from stored movies array
  const stored = localStorage.getItem('movies');
  if (stored) {
    try {
      const parsed: Movie[] = JSON.parse(stored);
      const found = parsed.find((m) => m.id === id);
      setMovie(found || null);
    } catch (err) {
      console.error('Failed to parse movies from localStorage', err);
    }
  }
}, [id]);


  // Resume and save progress
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !movie || !user) return;

    const handleLoaded = () => {
      try {
        const stored = localStorage.getItem(`continueWatching_${user.email}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          const progressItem = parsed.find((p: any) => p.movie.id === movie.id);
          if (progressItem) {
            videoEl.currentTime = progressItem.progress || 0;
          }
        }
      } catch (err) {
        console.error('Failed to load continue watching progress', err);
      }
    };


    // Load movie from localStorage (selectedMovie first)
// useEffect(() => {
//   if (!id) return;

//   // Try to get the movie passed from search or click
//   const selected = localStorage.getItem('selectedMovie');
//   if (selected) {
//     try {
//       const parsed: Movie = JSON.parse(selected);
//       if (parsed.id === id) {
//         setMovie(parsed);
//         return;
//       }
//     } catch (err) {
//       console.error('Failed to parse selectedMovie', err);
//     }
//   }

//   // Fallback: load from stored movies array
//   const stored = localStorage.getItem('movies');
//   if (stored) {
//     try {
//       const parsed: Movie[] = JSON.parse(stored);
//       const found = parsed.find((m) => m.id === id);
//       setMovie(found || null);
//     } catch (err) {
//       console.error('Failed to parse movies from localStorage', err);
//     }
//   }
// }, [id]);


const handleTimeUpdate = () => {
  if (!user) return;

  addOrUpdateProgress({
    movie,
    progress: videoEl.currentTime,
    duration: videoEl.duration || 0,
  });

  if (videoEl.currentTime >= (videoEl.duration || 0) - 0.5) {
    clearProgress(movie.id); // remove only after fully watched
  }
};

    videoEl.addEventListener('loadedmetadata', handleLoaded);
    videoEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoEl.removeEventListener('loadedmetadata', handleLoaded);
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [movie, addOrUpdateProgress, clearProgress, user]);

  // UI auto-hide
  const resetHideTimer = () => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
  };

  const handleTogglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) videoEl.play();
    else videoEl.pause();
    resetHideTimer();
  };

  // Initial auto-hide
 useEffect(() => {
  if (!movie) return;

  resetHideTimer();

  return () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };
}, [movie]);


  if (!movie) return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold">Movie not found</h2>
      <p>Check if the movie exists in your list.</p>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden cursor-pointer"
      onClick={handleTogglePlay}
      onMouseMove={resetHideTimer}
    >
      {movie.videos?.length ? (
  <video
    ref={videoRef}
    src={movie.videos[0]}
    autoPlay
    controls={showUI}
    className="w-full h-full object-cover"
    onClick={(e) => e.stopPropagation()}
  />
) : movie.videoSrc ? (
  <video
    ref={videoRef}
    src={movie.videoSrc}
    autoPlay
    controls={showUI}
    className="w-full h-full object-cover"
    onClick={(e) => e.stopPropagation()}
  />
) : (
  <p className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    No video available for this movie.
  </p>
)}


      <div
        className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col transition-opacity duration-300 pointer-events-none ${showUI ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl">{movie.description}</p>
      </div>
    </div>
  );
}


