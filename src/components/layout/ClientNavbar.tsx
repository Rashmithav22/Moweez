'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';

export default function ClientNavbar() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Navbar
      onCategoryChange={handleCategoryChange}
      selectedCategory={selectedCategory}
      onSidebarToggle={() => {}}
    />
  );
}
