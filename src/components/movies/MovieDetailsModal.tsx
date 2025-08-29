// 'use client';

// import React from 'react';
// import { X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import type { UnplashImages } from '@/lib/unsplash';

// interface MovieDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   movie: (UnplashImages & { releaseDate?: string; cast?: string[] }) | null;
//   videoRef?: React.RefObject<HTMLVideoElement>;
// }

// const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ isOpen, onClose, movie }) => {
//   if (!movie) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-lg w-full p-6 relative"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-1 right-1 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2"
//             >
//               <X size={20} />
//             </button>

//             {movie.urls?.regular && (
//               <img
//                 src={movie.urls.regular}
//                 alt={movie.alt_description || 'Movie Poster'}
//                 className="w-full h-64  pt-4 object-cover rounded-md mb-4 relative"
//               />
//             )}

//             <h2 className="text-2xl font-bold mb-2">{movie.alt_description}</h2>
//             {movie.releaseDate && (
//               <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
//                 Release Date: {movie.releaseDate}
//               </p>
//             )}
//             {movie.description && <p className="mb-4">{movie.description}</p>}

//             {movie.cast && movie.cast.length > 0 && (
//               <div>
//                 <h3 className="font-semibold mb-1">Cast:</h3>
//                 <ul className="list-disc list-inside text-sm">
//                   {movie.cast.map((actor: string, idx: number) => (
//                     <li key={idx}>{actor}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <button
//   onClick={() => {
//     const progress = JSON.parse(localStorage.getItem('continueWatchingProgress') || '{}');
//     const time = progress[movie.id]?.time || 0;
//     videoRef.current!.currentTime = time;
//     videoRef.current!.play();
//   }}
// >
//   Resume
// </button>

//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MovieDetailsModal;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UnplashImages } from '@/lib/unsplash';

interface MovieDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: (UnplashImages & { releaseDate?: string; cast?: string[]; videoSrc?: string }) | null;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ isOpen, onClose, movie }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!movie?.id || !videoRef.current) return;

    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('continueWatchingProgress') || '{}');
    const time = savedProgress[movie.id]?.time || 0;
    videoRef.current.currentTime = time;

    const handleTimeUpdate = () => {
      const progress = JSON.parse(localStorage.getItem('continueWatchingProgress') || '{}');
      progress[movie.id] = { time: videoRef.current!.currentTime };
      localStorage.setItem('continueWatchingProgress', JSON.stringify(progress));
      setCurrentTime(videoRef.current!.currentTime);
    };

    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl w-full p-4 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2"
            >
              <X size={20} />
            </button>

            {/* Video player */}
            {movie.videoSrc && (
              <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  src={movie.videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
                <p className="absolute bottom-2 right-2 text-sm text-gray-300">
                  {Math.floor(currentTime)}s watched
                </p>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{movie.alt_description}</h2>
            {movie.releaseDate && (
              <p className="text-sm mb-2 text-gray-400">Release Date: {movie.releaseDate}</p>
            )}
            {movie.description && <p className="mb-4">{movie.description}</p>}

            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="font-semibold mb-1">Cast:</h3>
                <ul className="list-disc list-inside text-sm">
                  {movie.cast.map((actor, idx) => (
                    <li key={idx}>{actor}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailsModal;
