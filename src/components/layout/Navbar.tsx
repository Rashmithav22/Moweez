
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthModalContext';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { Menu, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  onSidebarToggle: () => void;
}

export default function Navbar({ onCategoryChange, selectedCategory }: NavbarProps) {
  const router = useRouter();
  const { user, logout, openAuthModal } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const categories = ['Movies', 'Series', 'Documentary', 'Anime', 'Kids'];

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-black backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded hover:bg-muted"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="w-7 h-7" />
            <span className="text-white font-bold text-lg sm:text-sm">Moweez</span>
          </Link>
        </div>

        {/* Categories (Desktop) */}
        <div className="hidden md:flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (!user) return openAuthModal('signup');
                router.push(`/movies?category=${cat}`);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === cat ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="p-2 rounded hover:bg-muted">
            <Search size={20} />
          </Link>
          <Link href="/favorites" className="text-red-500 hover:text-red-400">
            <FaHeart />
          </Link>

          <ThemeToggle />

          {!user ? (
            <button
              onClick={() => openAuthModal('login')}
              className="px-2 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Sign Up / Login
            </button>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2">{user.name}</button>
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-border rounded-md shadow-lg hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 hover:bg-muted">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-muted">
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-muted"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </>
  );
}
