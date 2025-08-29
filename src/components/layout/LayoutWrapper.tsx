// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/context/AuthModalContext';
// // import { useRouter, usePathname } from 'next/navigation';
// // import Sidebar from '@/components/layout/Sidebar';
// // import { AnimatePresence, motion } from 'framer-motion';

// // const pageVariants = {
// //   initial: { opacity: 0, y: 20 },
// //   animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
// //   exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
// // };


// // export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     if (user === null) {
// //       router.push('/'); // redirect if not logged in
// //     }
// //   }, [user, router]);

// //   if (!user) return null; // or a loading spinner

// //   return (
// //     <div className="flex min-h-screen">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <div className="flex-1 flex flex-col">
// //         <AnimatePresence mode="wait" initial={false}>
// //           <motion.div
// //             key={pathname} // triggers animation on route change
// //             initial="initial"
// //             animate="animate"
// //             exit="exit"
// //             variants={pageVariants}
// //             className="flex-1"
// //           >
// //             <main className="p-4">{children}</main>
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import React, { useState } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Sidebar from '@/components/layout/Sidebar';

// export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex-1 flex flex-col">
//         <Navbar
//           onCategoryChange={handleCategoryChange}
//           selectedCategory={selectedCategory}
//           onSidebarToggle={() => setSidebarOpen(true)}
//         />
//         <main className="p-4">
//           {/* Pass selectedCategory to children so pages can filter movies */}
//           {children && React.cloneElement(children as React.ReactElement, { selectedCategory })}
//         </main>
//       </div>
//     </div>
//   );
// }

