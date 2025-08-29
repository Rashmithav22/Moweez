'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  maxStars?: number;
  rating: number;
  onChange?: (rating: number) => void;

}

const starVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.3, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, rating, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="flex space-x-1 mt-2  p-2 pl-4">
      {[...Array(maxStars)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= (hoveredStar ?? rating);

        return (
          <motion.button
  key={starIndex}
  type="button"
  className="focus:outline-none"
 onClick={(e) => {
  e.stopPropagation();
  onChange?.(starIndex);
}}

  onMouseEnter={() => setHoveredStar(starIndex)}
  onMouseLeave={() => setHoveredStar(null)}
  variants={starVariants}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
>
  <FaStar
    size={20}
    color={isFilled ? '#0DD3F5' : '#555'}
    className="drop-shadow-md"
  />
</motion.button>

        );
      })}
    </div>
  );
};

export default StarRating;
