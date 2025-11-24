import { useState } from 'react';
import { Movie } from '@/types/movie.types';

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

export const useMovieNavigation = (
  moviePopularData: MovieResponse,
  movieUpcomingData: MovieResponse,
  movieTopRatedData: MovieResponse
) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // See more товчны функцүүд
  const handleUpcomingSeeMore = () => {
    setActiveSection('upcoming');
    setCurrentPage(1);
  };

  const handlePopularSeeMore = () => {
    setActiveSection('popular');
    setCurrentPage(1);
  };

  const handleTopRatedSeeMore = () => {
    setActiveSection('topRated');
    setCurrentPage(1);
  };

  // Back to home function
  const handleBackToHome = () => {
    setActiveSection(null);
    setCurrentPage(1);
  };

  // Get current movies based on active section
  const getCurrentMovies = () => {
    switch (activeSection) {
      case 'upcoming':
        return movieUpcomingData?.results || [];
      case 'popular':
        return moviePopularData?.results || [];
      case 'topRated':
        return movieTopRatedData?.results || [];
      default:
        return [];
    }
  };

  // Get section title
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'upcoming':
        return 'Upcoming Movies';
      case 'popular':
        return 'Popular Movies';
      case 'topRated':
        return 'Top Rated Movies';
      default:
        return '';
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(getCurrentMovies().length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = getCurrentMovies().slice(startIndex, endIndex);

  // Genre selection handler
  const handleGenreSelect = (genre: { id: number; name: string }) => {
    // Genre page руу шилжих
    window.location.href = `/genre/${genre.id}`;
  };

  return {
    activeSection,
    currentPage,
    totalPages,
    currentMovies,
    setCurrentPage,
    handleUpcomingSeeMore,
    handlePopularSeeMore,
    handleTopRatedSeeMore,
    handleBackToHome,
    getSectionTitle,
    handleGenreSelect,
  };
};

