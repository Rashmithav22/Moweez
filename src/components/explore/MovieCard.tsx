'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StarRating from '@/components/explore/StarRating';
import { useWatchlist } from '@/context/WatchlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Movie } from '@/types/Movie';
import { useRouter } from 'next/navigation';


interface MovieCardProps extends Movie {
  className?: string;
  width?: string | number;
  disableHoverAnimation?: boolean;
  onClick?: (movie: Movie) => void;
  discription?:string;
  posterUrl: string;
  videos:string[];

  }

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  description,
  videoSrc,
  videos,
  className,
  disableHoverAnimation = false,

}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [rating, setRating] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);

  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(id);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${id}`);
    if (savedRating) setRating(Number(savedRating));
  }, [id]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem(`rating_${id}`, newRating.toString());
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const popupWidth = rect.width * 1.2;
    const popupHeight = rect.height * 1.2;

    let offsetX = 0, offsetY = 0;
    if (rect.left + popupWidth > window.innerWidth) offsetX = window.innerWidth - (rect.left + popupWidth) - 16;
    if (rect.top + popupHeight > window.innerHeight) offsetY = window.innerHeight - (rect.top + popupHeight) - 16;

    setLeftOffset(offsetX);
    setTopOffset(offsetY);
    setIsHovered(true);

    hoverTimer.current = setTimeout(() => {
      setPreviewReady(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 3000);

    if (!disableHoverAnimation && cardRef.current) {
       gsap.to(cardRef.current, {
        scale: 1.1,
        zIndex: 10,
        boxShadow: '0 10px 20px rgba(0, 123, 255, 0.8)', 
        duration: 0.3,
        transformOrigin: 'center center',
        x: offsetX,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPreviewReady(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (!disableHoverAnimation && cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        zIndex: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power3.in',
      });
      setLeftOffset(0);
      setTopOffset(0);
    }
  };

  const handleCardClick = () => {
    router.push(`/watch/${id}`);
  };

  const hoverVideo = videoSrc || (videos && videos.length > 0 ? videos[0] : null);

  useEffect(() => {
    if (!videoRef.current || !hoverVideo) return;

    const handleTimeUpdate = () => {
      const currentTime = videoRef.current!.currentTime;
      const saved: Movie[] = JSON.parse(localStorage.getItem('continueWatching') || '[]');
      const updated = saved.map((m) => (m.id === id ? { ...m, resumeTime: currentTime } : m));
      localStorage.setItem('continueWatching', JSON.stringify(updated));
    };

    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
  }, [id, hoverVideo]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col cursor-pointer rounded-lg overflow-visible ${className}`}
      style={{ width: '100%', left: `${leftOffset}px`, top: `${topOffset}px`, backgroundColor: '#111' }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-[240px] md:h-[300px] lg:h-[360px] overflow-hidden rounded-lg">
        {isHovered && previewReady && hoverVideo ? (
          <video
            ref={videoRef}
            src={hoverVideo}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <OptimizedImage
            src={posterUrl || '/placeholder.png'}
            alt={title}
            width={1400}
            height={600}
            className=" w-full h-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        )}

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {description && <p className="text-sm text-gray-300 line-clamp-2">{description}</p>}
        </div>

        <button
          className="absolute top-2 right-2 text-white z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist({ id, title, posterUrl, description, videoSrc,videos });
          }}
        >
          {inWatchlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="mb-2">
        <StarRating rating={rating} onChange={handleRatingChange} />
      </div>
    </div>
  );
};

export default MovieCard;






// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import StarRating from '@/components/explore/StarRating';
// import MovieDetailsModal from '@/components/movies/MovieDetailsModal';
// import { useWatchlist } from '@/context/WatchlistContext';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { OptimizedImage } from '../ui/OptimizedImage';
// import { Movie } from '@/types/Movie';
// import { ModalMovie } from '@/hooks/useMovies';

// interface MovieCardProps extends Movie {
//   onClick?: (movie: Movie) => void;
//   className?: string;
//   width?: string | number;
//   disableHoverAnimation?: boolean;
// }

// const MovieCard: React.FC<MovieCardProps> = ({
//   id,
//   title,
//   posterUrl,
//   description,
//   videoSrc,
//   onClick,
//   className,
//   disableHoverAnimation = false,
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hoverTimer = useRef<NodeJS.Timeout | null>(null);

//   const [isHovered, setIsHovered] = useState(false);
//   const [previewReady, setPreviewReady] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState<ModalMovie | null>(null);
//   const [leftOffset, setLeftOffset] = useState(0);
//   const [topOffset, setTopOffset] = useState(0);

//   const { toggleWatchlist, isInWatchlist } = useWatchlist();
//   const inWatchlist = isInWatchlist(id);

//   // Load saved rating
//   useEffect(() => {
//     const savedRating = localStorage.getItem(`rating_${id}`);
//     if (savedRating) setRating(Number(savedRating));
//   }, [id]);

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//     localStorage.setItem(`rating_${id}`, newRating.toString());
//   };

//   const handleMouseEnter = () => {
//     if (!cardRef.current) return;

//     const rect = cardRef.current.getBoundingClientRect();
//     const popupWidth = rect.width * 1.2;
//     const popupHeight = rect.height * 1.2;

//     let offsetX = 0, offsetY = 0;

//     if (rect.left + popupWidth > window.innerWidth) offsetX = window.innerWidth - (rect.left + popupWidth) - 16;
//     if (rect.top + popupHeight > window.innerHeight) offsetY = window.innerHeight - (rect.top + popupHeight) - 16;

//     setLeftOffset(offsetX);
//     setTopOffset(offsetY);

//     setIsHovered(true);

//     // Delay video play
//     hoverTimer.current = setTimeout(() => {
//       setPreviewReady(true);
//       if (videoRef.current) {
//         videoRef.current.currentTime = 0;
//         videoRef.current.play();
//       }
//     }, 3000);

//     if (!disableHoverAnimation && cardRef.current) {
      // gsap.to(cardRef.current, {
      //   scale: 1.1,
      //   zIndex: 10,
      //   boxShadow: '0 20px 30px rgba(0,0,0,0.7)',
      //   duration: 0.3,
      //   transformOrigin: 'center center',
      //   x: offsetX,
//       });
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setPreviewReady(false);

//     if (hoverTimer.current) {
//       clearTimeout(hoverTimer.current);
//       hoverTimer.current = null;
//     }

//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }

//     if (!disableHoverAnimation && cardRef.current) {
      // gsap.to(cardRef.current, {
      //   scale: 1,
      //   zIndex: 1,
      //   boxShadow: 'none',
      //   duration: 0.3,
      //   ease: 'power3.in',
      // });
      // setLeftOffset(0);
      // setTopOffset(0);
//     }
//   };

//  const handleCardClick = () => {
//   if (!id) return;

//    setSelectedMovie({
//     id,
//     alt_description: title,
//     urls: { regular: posterUrl },
//     description,
//     videoSrc,
//     // releaseDate,
//     // cast,
//   });

//   setIsModalOpen(true);

//   if (onClick)
//     onClick({
//       id,
//       title,
//       posterUrl,
//       description,
//       videoSrc,
//       rating,
//     } as Movie);
// };


//   // Track video progress for hing
//   useEffect(() => {
//     if (!videoRef.current || !videoSrc) return;

//     const handleTimeUpdate = () => {
//       if (!videoRef.current) return;
//       const currentTime = videoRef.current.currentTime;
//       const saved = JSON.parse(localStorage.getItem('continueWatching') || '[]') as Movie[];
//       const updated = saved.map((m) => (m.id === id ? { ...m, progress: currentTime } : m));
//       localStorage.setItem('continueWatching', JSON.stringify(updated));
//     };

//     const videoEl = videoRef.current;
//     videoEl.addEventListener('timeupdate', handleTimeUpdate);

//     // Resume previous progress
//     const savedProgress = JSON.parse(localStorage.getItem('continueWatchingProgress') || '{}')[id];
//     if (savedProgress?.time && savedProgress.time > 0) {
//       videoEl.currentTime = savedProgress.time;
//     }

//     return () => videoEl.removeEventListener('timeupdate', handleTimeUpdate);
//   }, [id, videoSrc]);

//   return (
//     <>
//       <div
//         ref={cardRef}
//         className={`flex flex-col cursor-pointer rounded-lg overflow-visible ${className}`}
//         style={{
//           width: '100%',
//           left: `${leftOffset}px`,
//           top: `${topOffset}px`,
//           backgroundColor: '#111',
//         }}
//         onClick={handleCardClick}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="relative w-full h-[240px] md:h-[300px] lg:h-[360px] overflow-hidden rounded-lg">
//           {isHovered && previewReady && videoSrc ? (
//             <video
//               ref={videoRef}
//               src={videoSrc}
//               muted
//               loop
//               playsInline
//               autoPlay
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <OptimizedImage
//               src={posterUrl}
//               alt={title}
//               width={1200}
//               height={600}
//               className="absolute top-0 left-0 w-full h-full object-contain"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//               placeholder="blur"
//               blurDataURL="/placeholder.png"
//             />
//           )}

//           <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
//             <h3 className="text-lg font-bold text-white">{title}</h3>
//             {description && <p className="text-sm text-gray-300 line-clamp-2">{description}</p>}
//           </div>

//           <button
//             className="absolute top-2 right-2 text-white z-10"
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleWatchlist({ id, title, posterUrl, description, videoSrc, rating });
//             }}
//           >
//             {inWatchlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//           </button>
//         </div>

//         <div className="mt-2">
//           <StarRating rating={rating} onChange={handleRatingChange} />
//         </div>
//       </div>

//       <MovieDetailsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         movie={selectedMovie}
//       />
//     </>
//   );
// };

// export default MovieCard;

