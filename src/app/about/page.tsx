'use client';

import { motion } from 'framer-motion';
import TeamMemberCard from '@/components/TeamMemberCard';
const teamMembers = [
  {
    name: 'Rashmitha V',
    role: ' Developer',
    imageUrl: '/team/rashmitha.jpg', // replace with actual images in /public/team/
    bio: 'Passionate about building engaging movie experiences.',
  },
  {
    name: 'ABC',
    role: 'UI/UX Designer',
    imageUrl: '/team/alex.jpg',
    bio: 'Crafting beautiful and user-friendly interfaces.',
  },
  {
    name: 'XYZ',
    role: 'Content Creator',
    imageUrl: '/team/maria.jpg',
    bio: 'Selecting the best movies and content for you.',
  },
];

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto p-8 mt-12 text-gray-900 dark:text-gray-100"
    >
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight text-blue-600 dark:text-blue-400">
        About Us
      </h1>

      <p className="mb-6 text-lg leading-relaxed">
        Welcome to our platform! We are passionate about bringing you the best movie
        exploration experience with stunning visuals and smooth interactivity.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Our team is dedicated to curating content that inspires, entertains, and
        engages you. We continuously update our platform to offer new features and
        improvements.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Thank you for visiting! We hope you enjoy your time here.
      </p>

      <h2 className="text-3xl font-semibold mt-12 mb-5 text-gray-800 dark:text-gray-200">
        Our Mission
      </h2>

      <p className="text-lg leading-relaxed">
        To provide a seamless and enjoyable way to discover movies with personalized
        recommendations and beautiful UI experiences.
      </p>
      {/* Team Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </motion.main>
  );
}
