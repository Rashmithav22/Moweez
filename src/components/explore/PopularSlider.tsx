
'use client'
import React, { useEffect, useState, useRef } from 'react';
import { fetchUnsplashImages } from '@/lib/unsplash';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PopularSlider() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUnsplashImages('popular movies', 15)
      .then(results => setImages(results))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Scroll left and right handlers (optional)
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      const scrollWidth = slider.scrollWidth;
      const clientWidth = slider.clientWidth;
      const scrollLeft = slider.scrollLeft;

      const halfScroll = scrollWidth / 2;

      if (scrollLeft >= halfScroll) {
        // Jump back by half content width without smooth, seamless because content repeats
        slider.scrollLeft = scrollLeft - halfScroll;
      } else {
        // Scroll right smoothly
        slider.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (loading) return <div>Loading popular movies...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Render images duplicated to enable seamless scroll
  const doubledImages = [...images, ...images];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-white text-2xl font-semibold mb-4">Popular Movies</h2>

      <div className="relative overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll Left"
          className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          aria-label="Scroll Right"
          className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={sliderRef}
          className="popular-slider flex space-x-4 p-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {doubledImages.map((img, idx) => (
            <img
              key={idx} // Use idx here since images repeat
              src={img.urls.small}
              alt={img.alt_description || 'Popular movie'}
              className="w-48 h-28 object-cover rounded-lg shadow-md flex-shrink-0 select-none"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
