'use client';

import React from 'react';


interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Fedelis',
  description = '',
  keywords = '',
}) => {
  return (
    <>
      {/* SEO Metadata */}
      {/* <SEOHead title={title} description={description} keywords={keywords} /> */}

      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
