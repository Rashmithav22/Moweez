import './globals.css';
import './font.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import {AuthModalProvider} from '@/context/AuthModalContext';
import ClientNavbar from '@/components/layout/ClientNavbar';
import AuthOverlay from '@/components/auth/AuthOverlay';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from '@/components/ToastContainer';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { ContinueWatchingProvider } from "@/context/ContinueWatchingContext";
// import { useAuth } from '@/context/AuthModalContext';
import { MoviesProvider } from '@/context/MoviesContext';


export const metadata: Metadata = {
  title: 'Welcome to Moweez',
  description: 'A movie browsing website with GSAP animation',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // const { user } = useAuth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <AuthModalProvider>
            <ContinueWatchingProvider>
              <ToastProvider>
                <div className="flex flex-col min-h-screen">
                  <ClientNavbar />
                  <AuthOverlay />
                  {/* {user && ( */}
                    {/* <WatchlistProvider userId={user.id}> */}
                    <WatchlistProvider userId={ ''}>
                      <MoviesProvider>
                      <main className="flex-grow pt-[70px]">{children}</main>
                      </MoviesProvider>
                    </WatchlistProvider>
                  {/* )} */}
                  <Footer />
                  <ToastContainer />
                </div>
              </ToastProvider>
            </ContinueWatchingProvider>
          </AuthModalProvider>
        </ThemeProvider>
      </body>
    </html>
        
    
  );
}

