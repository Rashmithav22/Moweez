'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

interface MovieItem {
  id: string;
  title: string;
  posterUrl: string;
}

interface AutoScrollingCarouselProps {
  items: MovieItem[];
  speed?: number; // pixels per frame
  height?: number; // height of carousel items
  width?: number;
  pauseOnHover?: boolean;
}

export default function AutoScrollingCarousel({
  items,
  speed = 0.5,
  height = 200,

}: AutoScrollingCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const isPaused = useRef(false);
  
  // Animate the scroll
  useAnimationFrame(() => {
    if (trackRef.current && !isPaused.current) {
      offset.current -= speed;
      if (Math.abs(offset.current) >= trackRef.current.scrollWidth / 2) {
        offset.current = 0;
      }
      trackRef.current.style.transform = `translateX(${offset.current}px)`;
    }
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <div
        ref={trackRef}
        className="flex gap-4"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        {items.concat(items).map((movie, index) => (
          <div
            key={movie.id + '-' + index}
            className="flex-shrink-0  w-full aspect-[2/3]"
            style={{ height, width: 'auto' }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="h-full w-auto rounded-lg object-fill shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
