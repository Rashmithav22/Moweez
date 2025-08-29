
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthModalContext';


interface HeroProps {
  onExploreClick: () => void;
}


const Hero = ({ onExploreClick }: HeroProps) => {

  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const handleGetStarted = () => {
     if (!user) {
      // Open signup modal and after login redirect
      openAuthModal('signup');
    } else {
      // Already logged in, redirect directly
      router.push('/movies');
    }
  };
  return (
    <section className="w-full min-h-screen flex items-center justify-center
      "
    >
      <div className="max-w-5xl text-center space-y-6">
        <h1 className="text-clamp-xl font-bold leading-tight
          text-gray-900 dark:text-gray-200"
        >
          Discover Movies Like Never Before
        </h1>
        <p className="text-clamp-md max-w-3xl mx-auto
          text-gray-700 dark:text-gray-300"
        >
          Dive into a world of cinema with stunning visuals, animations, and curated collections powered by GSAP.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button size="lg" onClick={handleGetStarted} className="text-black dark:text-black font-bold">
            Get Started
          </Button>

          <section>

    </section>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
