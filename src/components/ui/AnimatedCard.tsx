'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ onClick, className, children }) => {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ scale: 2.05, boxShadow: '0px 8px 15px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
