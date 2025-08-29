'use client';

import { useAuth } from '@/context/AuthModalContext';

export default function LoginPage() {
  const { openAuthModal } = useAuth();

  // Immediately open the login modal when user visits this page
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => openAuthModal('login')}
        className="px-6 py-3 bg-primary text-white rounded-lg"
      >
        Open Login
      </button>
    </div>
  );
}
