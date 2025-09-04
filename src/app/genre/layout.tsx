"use client";

import React from 'react';
import Navigation from '@/components/movieComponents/Navigation';
import Footer from '@/components/movieComponents/Footer';

export default function GenreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        showSearch={true} 
        onGenreSelect={(genre) => {
          // Genre сонгох үед шинэ хуудас руу шилжих
          window.location.href = `/genre/${genre.id}`;
        }} 
      />
      
      
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Right Panel - Content (Mobile: First, Desktop: Second) */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 order-1 lg:order-2">
          {children}
        </div>

        {/* Left Panel - Genre Filter (Mobile: Second, Desktop: First) */}
        <div className="w-full lg:w-80 p-4 lg:p-6 border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 order-2 lg:order-1">
          <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Search filter</h2>
            <div>
              <h3 className="text-base lg:text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Genres</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-4">See lists of movies by genre</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
                  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
                  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
                  'TV Movie', 'Thriller', 'War', 'Western'
                ].map((genre) => (
                  <button
                    key={genre}
                    className="flex items-center justify-between p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    onClick={() => {
                      // Genre сонгох үед шинэ хуудас руу шилжих
                      const genreMap: { [key: string]: number } = {
                        'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35,
                        'Crime': 80, 'Documentary': 99, 'Drama': 18, 'Family': 10751,
                        'Fantasy': 14, 'History': 36, 'Horror': 27, 'Music': 10402,
                        'Mystery': 9648, 'Romance': 10749, 'Science Fiction': 878, 'TV Movie': 10770,
                        'Thriller': 53, 'War': 10752, 'Western': 37
                      };
                      const newGenreId = genreMap[genre];
                      if (newGenreId) {
                        window.location.href = `/genre/${newGenreId}`;
                      }
                    }}
                  >
                    <span className="text-xs font-medium truncate text-gray-700 dark:text-gray-300">{genre}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">&gt;</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
