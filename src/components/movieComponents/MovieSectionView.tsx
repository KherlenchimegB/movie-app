import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/movieComponents/Navigation';
import Footer from '@/components/movieComponents/Footer';
import { MovieCard } from '@/components/movieComponents/MovieCard';
import { Movie } from '@/types/movie.types';

interface MovieSectionViewProps {
  activeSection: string | null;
  currentPage: number;
  totalPages: number;
  currentMovies: Movie[];
  searchQuery: string;
  searchResults: Movie[];
  isSearching: boolean;
  onBackToHome: () => void;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  getSectionTitle: () => string;
}

export default function MovieSectionView({
  activeSection,
  currentPage,
  totalPages,
  currentMovies,
  searchQuery,
  searchResults,
  isSearching,
  onBackToHome,
  onPageChange,
  getSectionTitle,
  onSearch,
  onClearSearch,
}: MovieSectionViewProps) {
  if (!activeSection) return null;

  return (
    <div className="flex flex-col gap-3 p-2 w-screen">
      <Navigation 
        onSearch={onSearch}
        onClear={onClearSearch}
        isSearching={isSearching}
        searchResults={searchResults}
        searchQuery={searchQuery}
      />
      
      {/* Back to home button */}
      <div className="px-4 md:px-[80px] mt-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </button>
      </div>

      {/* Section title */}
      <div className="px-4 md:px-[80px]">
        <h1 className="text-3xl md:text-4xl font-bold">{getSectionTitle()}</h1>
      </div>

      {/* Movies grid */}
      <div className="px-4 md:px-[80px]">
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {currentMovies.map((movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 md:px-[80px]">
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

