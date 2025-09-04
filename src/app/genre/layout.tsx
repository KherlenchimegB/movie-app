"use client";

import React, { useState } from 'react';
import Navigation from '@/components/movieComponents/Navigation';
import Footer from '@/components/movieComponents/Footer';

export default function GenreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

  // Search function
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setSearchQuery(query);
    setIsSearching(true);
    setShowSearchResults(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Search see more
  const handleSearchSeeMore = () => {
    try {
      // Search query болон results-ийг localStorage-д хадгалах
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
      // Search page руу шилжих
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    } catch (error) {
      console.error('Error navigating to search page:', error);
      alert('Search page руу шилжихэд алдаа гарлаа');
    }
  };

  // Close search results
  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        showSearch={true} 
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
        searchResults={searchResults}
        searchQuery={searchQuery}
        onGenreSelect={(genre) => {
          // Genre сонгох үед шинэ хуудас руу шилжих
          console.log('Genre layout handleGenreSelect called:', genre);
          window.location.href = `/genre/${genre.id}`;
        }} 
      />
      
      <div className="flex flex-1">
        {/* Left Panel - Genre Filter */}
        <div className="w-80 p-6 border-r border-gray-200 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Search filter</h2>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Genres</h3>
              <p className="text-sm text-gray-600 mb-4">See lists of movies by genre</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
                  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
                  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
                  'TV Movie', 'Thriller', 'War', 'Western'
                ].map((genre) => (
                  <button
                    key={genre}
                    className="flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md transition-colors border border-gray-200 text-gray-700 hover:border-gray-300"
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
                        console.log('Left sidebar genre clicked:', genre, newGenreId);
                        window.location.href = `/genre/${newGenreId}`;
                      }
                    }}
                  >
                    <span className="text-xs font-medium truncate">{genre}</span>
                    <span className="text-gray-400 text-xs">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 bg-gray-50">
          {children}
        </div>
      </div>

      {/* Search Results Overlay */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-96 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-2xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Search Results</h3>
              <button
                onClick={handleCloseSearchResults}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {searchResults.slice(0, 5).map((movie) => (
                <div 
                  key={movie.id} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => {
                    // Movie details руу шилжих
                    window.location.href = `/movies/${movie.id}`;
                  }}
                >
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-movie.jpg'}
                    alt={movie.title}
                    className="w-12 h-18 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{movie.title}</p>
                    <p className="text-xs text-gray-500">{movie.release_date?.split('-')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={handleSearchSeeMore}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                See all results for "{searchQuery}"
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
