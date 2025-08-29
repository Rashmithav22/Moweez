



// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { X } from 'lucide-react';
// import { useAuth } from '@/context/AuthModalContext';
// import { useRouter } from 'next/navigation';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
// }

// export default function Sidebar({
//   isOpen,
//   onClose,
//   selectedCategory,
//   onCategoryChange,
// }: SidebarProps) {
//   const { user, logout, openAuthModal } = useAuth();
//   const router = useRouter();
//   const categories = ['Movies', 'Series', 'Documentary', 'Anime', 'Kids'];

//   return (
//     <div
//       className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}
//     >
//       {/* Overlay */}
//       <div onClick={onClose} className="absolute inset-0" />

//       <div className="relative w-64 h-full bg-black p-6 flex flex-col justify-between shadow-lg">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <X size={22} />
//         </button>

//         {/* Main Content */}
//         <div className="flex flex-col gap-6 overflow-y-auto">
//           {/* Section 1: Menu */}
//           <div className="flex flex-col gap-2">
//             <h2 className="text-lg font-semibold text-white  p-1">Menu</h2>
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => {
//                   if (!user) {
//                     openAuthModal('signup');
//                     return;
//                   }
//                   onCategoryChange(cat);
//                   router.push(`/movies?category=${cat}`);
//                   onClose();
//                 }}
//                 className={`px-3 py-2 rounded text-sm text-left font-medium ${
//                   selectedCategory === cat
//                     ? 'bg-blue-500 text-white'
//                     : ' text-gray-200 hover:bg-gray-600'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Section 2: Account */}
//           {user && (
//             <div className="flex flex-col gap-2 mt-4">
//               <h2 className="text-lg font-semibold text-white p-1">{user.name}</h2>
//               <button
//   onClick={() => {
//     onClose();        // close the sidebar
//     router.push('/profile'); // navigate to profile page
//   }}
//   className="px-3 py-2 rounded hover:bg-muted text-sm text-left w-full"
// >
//   Edit Profile
// </button>

//               <Link
//                 href="/settings"
//                 onClick={onClose}
//                 className="px-3 py-2 rounded hover:bg-muted text-sm"
//               >
//                 Settings
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Bottom: Logout */}
//         {user && (
//           <button
//             onClick={() => {
//               logout();
//               onClose();
//             }}
//             className="mt-4 px-4 py-2 rounded hover:bg-red-600 text-white bg-red-500 w-full"
//           >
//             Logout
//           </button>
//         )}

//         {/* If not logged in, show signup/login */}
//         {!user && (
//           <button
//             onClick={() => openAuthModal('login')}
//             className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition w-full"
//           >
//             Sign Up / Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthModalContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({ isOpen, onClose, selectedCategory, onCategoryChange }: SidebarProps) {
  const { user, openAuthModal, logout } = useAuth();
  const router = useRouter();
  const categories = ['Movies', 'Series', 'Documentary', 'Anime', 'Kids'];

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative w-64 h-full bg-black p-6 flex flex-col justify-between shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={22} />
        </button>

        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Categories */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-white p-1">Menu</h2>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (!user) return openAuthModal('signup');
                  onCategoryChange(cat);
                  router.push(`/movies?category=${cat}`);
                  onClose();
                }}
                className={`px-3 py-2 rounded text-sm text-left font-medium ${
                  selectedCategory === cat ? 'bg-blue-500 text-white' : 'text-gray-200 hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Account */}
          {user && (
            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-lg font-semibold text-white p-1">{user.name}</h2>
              <button
                onClick={() => {
                  onClose();
                  router.push('/profile');
                }}
                className="px-3 py-2 rounded hover:bg-muted text-sm text-left w-full"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push('/settings');
                }}
                className="px-3 py-2 rounded hover:bg-muted text-sm text-left w-full"
              >
                Settings
              </button>
            </div>
          )}
        </div>

        {/* Logout / Sign In */}
        {user ? (
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="mt-4 px-4 py-2 rounded hover:bg-red-600 text-white bg-red-500 w-full"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition w-full"
          >
            Sign Up / Login
          </button>
        )}
      </div>
    </div>
  );
}
