"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/movieComponents/Navigation';
import { Movie } from '@/types/movie.types';
import { MovieCard } from '@/components/movieComponents/MovieCard';
import Footer from '@/components/movieComponents/Footer';
import Toast from '@/components/movieComponents/Toast';
import NoResults from '@/components/movieComponents/NoResults';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // TMDB API Token - Environment variable
  // Client-side дээр environment variable-ууд runtime дээр ажиллахгүй байж болно
  const getToken = () => {
    return process.env.NEXT_PUBLIC_TMDB_TOKEN || '';
  };

  // Жанрын жагсаалт
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
    { id: 10769, name: 'Foreign' },
    { id: 10437, name: 'Reality-TV' },
    { id: 10755, name: 'Sport' },
    { id: 10768, name: 'War & Politics' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 10762, name: 'Kids' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' }
  ];

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      const token = getToken();
      if (!token) {
        console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
        setIsLoading(false);
        setShowToast(true);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 0, 500));
        setTotalResults(data.total_results || 0);
        
        // Хэрэв үр дүн байхгүй бол toast харуулах
        if (data.total_results === 0 && query.trim()) {
          setShowToast(true);
        }
      } catch (error) {
        console.error('Хайлтын алдаа:', error);
        setMovies([]);
        if (query.trim()) {
          setShowToast(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleGenreClick = (genre: { id: number; name: string }) => {
    window.location.href = `/genre/${genre.id}`;
  };

  const closeToast = () => {
    setShowToast(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navigation 
        showSearch={true} 
        onGenreSelect={handleGenreClick}
      />
      
      {/* Toast Notification */}
      <Toast
        message={`No movies found for "${query}". Try different keywords or browse by genre.`}
        isVisible={showToast}
        onClose={closeToast}
        type="warning"
      />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Search Results (Mobile: First, Desktop: Left) */}
        <div className="flex-1 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 order-1 lg:order-1">
          <div className="mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Search results</h1>
            {query && (
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                {totalResults} results for &quot;{query}&quot;
              </p>
            )}
          </div>
          
          {movies.length === 0 ? (
            <NoResults query={query} />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    image={movie.poster_path}
                    rank={movie.vote_average}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 md:mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 md:px-4 py-2 text-sm md:text-base border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    ← Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-2 md:px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-1 md:px-2 text-gray-500">...</span>
                  )}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-2 md:px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {totalPages}
                    </button>
                  )}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Genre List (Mobile: Second, Desktop: Right) */}
        <div className="w-full lg:w-80 p-4 md:p-6 bg-gray-50 dark:bg-gray-800 order-2 lg:order-2">
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Search by genre</h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">See lists of movies by genre</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:space-y-2 lg:gap-0">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className="flex items-center justify-between p-2 lg:p-3 text-left hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer group"
              >
                <span className="text-xs lg:text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors truncate">
                  {genre.name}
                </span>
                <span className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors flex-shrink-0 text-sm">&gt;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
