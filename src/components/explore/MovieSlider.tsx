// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import MovieCard from './MovieCard';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// interface Movie {
//   id: string;
//   title: string;
//   posterUrl: string;
//   description?: string;
//   pauseOnHover?: boolean;
// }

// interface MovieSliderProps {
//   movies: Movie[];
//   onMovieClick: (id: string) => void;
// }

// const MovieSlider: React.FC<MovieSliderProps> = ({ movies, onMovieClick }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const prev = () => {
//     setCurrentIndex((i) => (i === 0 ? movies.length - 1 : i - 1));
//   };

//   const next = () => {
//     setCurrentIndex((i) => (i === movies.length - 1 ? 0 : i + 1));
//   };

//     useEffect(() => {
//     if (!isHovered) {
//       intervalRef.current = setInterval(() => {
//         next();
//     },3000);
//     }

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [isHovered, currentIndex]);


//   if (movies.length === 0) return <p className="text-white text-center py-8">No movies available</p>;

//   return (
//       <div
//       className="relative w-full  max-w-6xl mx-auto  h-full select-none overflow-x-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <button
//         onClick={prev}
//         aria-label="Previous Slide"
//         className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 text-white z-10"
//       >
//         <FaChevronLeft size={20} />
//       </button>
//       <button
//         onClick={next}
//         aria-label="Next Slide"
//         className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 text-white z-10"
//       >
//         <FaChevronRight size={20} />
//       </button>

//       <div className="overflow-hidden rounded-lg ">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {movies.map((movie) => (
//             <div key={movie.id} className=" relative group min-w-full p-1" onClick={() => onMovieClick(movie.id)}>
//               <MovieCard {...movie} />
//               {/* {movie.description && (
//                 <p className="text-gray-300 mt-2 text-center">{movie.description}</p>
//               )} */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MovieSlider;


'use client';

import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Movie } from "@/types/Movie";
interface MovieSliderProps {
  movies: Movie[];
  onMovieClick: (id: string) => void;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? movies.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === movies.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        next();
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, currentIndex]);

  if (movies.length === 0)
    return <p className="text-white text-center py-8">No movies available</p>;

  return (
    <div
      className=" relative w-full  h-full object-cover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 text-white z-10"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next Slide"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 text-white z-10"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Slider */}
      <div className="overflow-hidden rounded-lg z-50">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group min-w-full p-1"
              onClick={() => onMovieClick(movie.id)}
            >
              {/* Disable GSAP animations for slider cards, but keep video preview */}
              <MovieCard {...movie} disableHoverAnimation={true} />
              {/* <MovieCard {...movie} disableHoverAnimation={true} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;
