"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchMovies } from '@/lib/api';
import { Movie, SearchResponse } from '@/types/movie.types';
import { MovieCard } from '@/components/movieComponents/MovieCard';
import Navigation from '@/components/movieComponents/Navigation';
import Footer from '@/components/movieComponents/Footer';
import Pagination from '@/components/movieComponents/Pagination';
import Link from 'next/link';

// Search page
export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page') || '1';
  
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
  };

  // Perform search
  useEffect(() => {
    if (query) {
      performSearch(query, currentPage);
    }
  }, [query, currentPage]);

  const performSearch = async (searchQuery: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchMovies(searchQuery, page);
      setSearchResults(results);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Searching...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Found {searchResults?.total_results || 0} movies for "{query}"
          </p>
          {searchResults && (
            <p className="text-gray-500 text-sm mt-1">
              Page {currentPage} of {searchResults.total_pages} (20 movies per page)
            </p>
          )}
        </div>

        {searchResults && searchResults.results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {searchResults.results.map((movie: Movie) => (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                  <MovieCard
                    title={movie.title}
                    image={movie.poster_path}
                    rank={movie.vote_average}
                  />
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={searchResults.total_pages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {query ? 'No movies found for this search' : 'Please enter a search term'}
            </div>
            <p className="text-gray-400">
              {query ? 'Try searching with different keywords' : 'Use the search bar at the top'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
