'use client';

import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
}

export default function TeamMemberCard({ name, role, imageUrl, bio }: TeamMemberCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.3)' }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-4"
        loading="lazy"
      />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{role}</p>
      {bio && <p className="text-gray-700 dark:text-gray-300 text-sm">{bio}</p>}
    </motion.div>
  );
}
