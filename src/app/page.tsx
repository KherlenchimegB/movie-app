"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/movieComponents/Navigation";
import Footer from "@/components/movieComponents/Footer";
import {
  MovieCard,
  MovieCategory,
} from "../components/movieComponents/MovieCard";
import MovieCarousel from "@/components/movieComponents/MovieCarousel";
import Link from "next/link";
import SearchResults from "@/components/movieComponents/SearchResults";
import Toast from "@/components/movieComponents/Toast";
import { 
  NavigationSkeleton, 
  HeroSkeleton, 
  MovieGridSkeleton, 
  CategoryTitleSkeleton 
} from "@/components/movieComponents/Skeleton";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

export type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  video: boolean;
  dates: {};
  release_date: Date;
  popularity: number;
  original_language: string;
};

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

const SWR = () => {
  // Section visibility state
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showToast, setShowToast] = useState(false); // New state for toast
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(true);

  const [moviePopularData, setMoviePopularData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieUpcomingData, setMovieUpcomingData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieTopRatedData, setMovieTopRatedData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieGenresData, setMovieGenresData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieNowPlayingData, setMovieNowPlayingData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });

  // Search function
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
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
      
      // Хэрэв үр дүн байхгүй бол toast харуулах
      if (data.total_results === 0 && query.trim()) {
        setShowToast(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      if (query.trim()) {
        setShowToast(true);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    setShowToast(false);
  };

  // Handle search see more
  const handleSearchSeeMore = () => {
    try {
      console.log('See more clicked for query:', searchQuery);
      
      // Search query-г localStorage-д хадгалах
      if (searchQuery && searchQuery.trim()) {
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('searchResults', JSON.stringify(searchResults));
        console.log('Search data saved to localStorage');
      }
      
      // Search page руу шилжих
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery || '')}`;
      console.log('Navigating to:', searchUrl);
      window.location.href = searchUrl;
    } catch (error) {
      console.error('Error in handleSearchSeeMore:', error);
      alert('Алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  // Close search results overlay
  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
  };

  // Close toast
  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    // Popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMoviePopularData(data);
        setIsPopularLoading(false);
      });
  }, []);

  useEffect(() => {
    // Upcoming movies
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieUpcomingData(data);
        setIsUpcomingLoading(false);
      });
  }, []);

  useEffect(() => {
    // Top rated movies
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieTopRatedData(data);
        setIsTopRatedLoading(false);
      });
  }, []);

  useEffect(() => {
    // Genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieGenresData(data);
      });
  }, []);

  useEffect(() => {
    // Now playing movies (Hero section)
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Now Playing API Response:', data);
        setMovieNowPlayingData(data);
        setIsHeroLoading(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Now Playing API Error:', error);
        setIsHeroLoading(false);
        setIsLoading(false);
      });
  }, []);

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

  // If a section is active, show only that section
  if (activeSection) {
    return (
      <div className="flex flex-col gap-3 p-2 w-screen">
        <Navigation 
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isSearching}
          searchResults={searchResults}
          searchQuery={searchQuery}
        />
        
        {/* Back to home button */}
        <div className="px-4 md:px-[80px] mt-4">
          <button
            onClick={handleBackToHome}
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
                onClick={() => setCurrentPage(currentPage - 1)}
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
                    onClick={() => setCurrentPage(pageNum)}
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
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
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

  // Genre selection handler
  const handleGenreSelect = (genre: { id: number; name: string }) => {
    // Genre page руу шилжих
    console.log('Homepage handleGenreSelect called:', genre); 
    window.location.href = `/genre/${genre.id}`;
  };

  // Default home page view
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
        searchResults={searchResults}
        searchQuery={searchQuery}
        showSearch={true}
        onGenreSelect={handleGenreSelect}
      />

      {/* Hero section - Now Playing movies carousel */}
      <div className="relative">
        {isHeroLoading ? (
          <HeroSkeleton />
        ) : (
          <MovieCarousel 
            movies={movieNowPlayingData?.results?.slice(0, 3) || []}
            title="Now Playing"
          />
        )}
        
        {/* Toast Notification - Overlay on top of hero section */}
        <Toast
          message={`No results found for "${searchQuery}". Please try a different search term.`}
          isVisible={showToast}
          onClose={closeToast}
          type="warning"
        />
      </div>

      {/* Search results - overlay on top */}
      {showSearchResults && (
        <SearchResults
          results={searchResults}
          query={searchQuery}
          onSeeMore={handleSearchSeeMore}
          onClose={handleCloseSearchResults}
        />
      )}

      {/* Upcoming Movies Section */}
      <div className="flex flex-col w-full border-none gap-6 md:gap-8 lg:gap-14 px-4 md:px-8 lg:px-[80px] py-6 md:py-8">
        {isUpcomingLoading ? (
          <CategoryTitleSkeleton />
        ) : (
          <MovieCategory 
            title={"Upcoming"} 
            onSeeMore={handleUpcomingSeeMore}
          />
        )}
        {isUpcomingLoading ? (
          <MovieGridSkeleton count={10} />
        ) : (
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
            {movieUpcomingData?.results?.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            ))}
          </div>
        )}
      </div>

      {/* Popular Movies Section */}
      <div className="flex flex-col w-full border-none gap-6 md:gap-8 lg:gap-14 px-4 md:px-8 lg:px-[80px] py-6 md:py-8">
        {isPopularLoading ? (
          <CategoryTitleSkeleton />
        ) : (
          <MovieCategory 
            title={"Popular"} 
            onSeeMore={handlePopularSeeMore}
          />
        )}
        {isPopularLoading ? (
          <MovieGridSkeleton count={10} />
        ) : (
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
            {moviePopularData?.results?.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            ))}
          </div>
        )}
      </div>

      {/* Top Rated Movies Section */}
      <div className="flex flex-col w-full border-none gap-6 md:gap-8 lg:gap-14 px-4 md:px-8 lg:px-[80px] py-6 md:py-8">
        {isTopRatedLoading ? (
          <CategoryTitleSkeleton />
        ) : (
          <MovieCategory 
            title={"Top rated"} 
            onSeeMore={handleTopRatedSeeMore}
          />
        )}
        {isTopRatedLoading ? (
          <MovieGridSkeleton count={10} />
        ) : (
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
            {movieTopRatedData?.results?.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SWR;
