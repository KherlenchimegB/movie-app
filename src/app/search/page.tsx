"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/movieComponents/Navigation';
import { Movie } from '@/types/movie.types';
import { MovieCard } from '@/components/movieComponents/MovieCard';
import Footer from '@/components/movieComponents/Footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 0, 500));
      } catch (error) {
        console.error('Search error:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, token]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        showSearch={true} 
        onGenreSelect={(genre) => {
          // Genre сонгох үед genre page руу шилжих
          window.location.href = `/genre/${genre.id}`;
        }}
      />
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Search Results for "{query}"</h1>
        
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found for "{query}"</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  image={movie.poster_path}
                  rank={movie.vote_average}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 border rounded-md transition-colors ${
                          page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
