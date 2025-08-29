/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode support
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        accent: '#f43f5e',
        darkText: '#fff',
        lightText: '#000',
      },
      // Custom breakpoints
      screens: {
        '4xs': '320px',
        '3xs': '360px',
        '2xs': '408px',
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },

      // Custom fonts
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },

      fontSize: {
        'clamp-xl': 'clamp(2.5rem, 6vw, 4.5rem)', // heading
        'clamp-md': 'clamp(1rem, 2vw, 1.5rem)',   // paragraph
        'clamp-sm': 'clamp(0.875rem, 1.5vw, 1.125rem)',
        'clamp-lg': 'clamp(2rem, 5vw, 3.5rem)',
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'scroll-left-to-right': 'scrollLeftToRight 60s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scrollLeftToRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  
  plugins: [
    // Add any additional plugins here
  ],
  // Optimize for production
  corePlugins: {
    preflight: true,
  },
  // JIT mode for faster builds
  mode: 'jit',
};


