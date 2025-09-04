"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Movie } from '@/types/movie.types';
import { MovieCard } from '@/components/movieComponents/MovieCard';

export default function GenrePage() {
  const params = useParams();
  const genreId = params.genreId as string;
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!genreId || !token) return;

      setIsLoading(true);
      try {
        // Genre name-ийг эхлээд олох
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const genreData = await genreResponse.json();
        const genre = genreData.genres?.find((g: any) => g.id.toString() === genreId);
        setGenreName(genre?.name || 'Genre');

        // Дараа нь кинонуудыг олох
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${currentPage}&language=en-US&sort_by=popularity.desc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 0, 500));
      } catch (error) {
        console.error('Error fetching genre movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId, currentPage, token]);

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
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">{movies.length} titles in "{genreName}"</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
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
            const page = i + 1;
            if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 md:px-3 py-2 text-sm md:text-base border rounded-md transition-colors ${
                    page === currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 3 || page === currentPage + 3) {
              return <span key={page} className="px-1 md:px-2 text-sm md:text-base">...</span>;
            }
            return null;
          })}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 md:px-4 py-2 text-sm md:text-base border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
