// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthModalContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.replace('/'); // Redirect to Home if not logged in
//     }
//   }, [user, router]);

//   if (!user) {
//     // Optionally render null or a loader while redirecting
//     return null;
//   }

//   return <>{children}</>;
// }


'use client';
import { useAuth } from '@/context/AuthModalContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>; // ✅ prevent redirect until ready

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
    </div>
  );
}
