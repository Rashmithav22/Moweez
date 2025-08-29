// src/components/Footer.tsx
'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-200 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-400 mt-8">
      <p>© {new Date().getFullYear()} My Movie App. All rights reserved.</p>
      <Link href="/about" className=" hover:text-gray-100 ">About</Link>
    </footer>
  );
}
