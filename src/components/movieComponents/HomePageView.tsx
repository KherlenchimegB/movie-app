import React from 'react';
import Navigation from '@/components/movieComponents/Navigation';
import Footer from '@/components/movieComponents/Footer';
import { MovieCard, MovieCategory } from '@/components/movieComponents/MovieCard';
import MovieCarousel from '@/components/movieComponents/MovieCarousel';
import SearchResults from '@/components/movieComponents/SearchResults';
import Toast from '@/components/movieComponents/Toast';
import { 
  HeroSkeleton, 
  MovieGridSkeleton, 
  CategoryTitleSkeleton 
} from '@/components/movieComponents/Skeleton';
import { Movie } from '@/types/movie.types';

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

interface HomePageViewProps {
  movieNowPlayingData: MovieResponse;
  movieUpcomingData: MovieResponse;
  moviePopularData: MovieResponse;
  movieTopRatedData: MovieResponse;
  isHeroLoading: boolean;
  isUpcomingLoading: boolean;
  isPopularLoading: boolean;
  isTopRatedLoading: boolean;
  searchQuery: string;
  searchResults: Movie[];
  showSearchResults: boolean;
  showToast: boolean;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  onSearchSeeMore: () => void;
  onCloseSearchResults: () => void;
  onCloseToast: () => void;
  onUpcomingSeeMore: () => void;
  onPopularSeeMore: () => void;
  onTopRatedSeeMore: () => void;
  onGenreSelect: (genre: { id: number; name: string }) => void;
}

export default function HomePageView({
  movieNowPlayingData,
  movieUpcomingData,
  moviePopularData,
  movieTopRatedData,
  isHeroLoading,
  isUpcomingLoading,
  isPopularLoading,
  isTopRatedLoading,
  searchQuery,
  searchResults,
  showSearchResults,
  showToast,
  onSearch,
  onClearSearch,
  onSearchSeeMore,
  onCloseSearchResults,
  onCloseToast,
  onUpcomingSeeMore,
  onPopularSeeMore,
  onTopRatedSeeMore,
  onGenreSelect,
}: HomePageViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navigation
        onSearch={onSearch}
        onClear={onClearSearch}
        isSearching={false}
        searchResults={searchResults}
        searchQuery={searchQuery}
        showSearch={true}
        onGenreSelect={onGenreSelect}
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
          onClose={onCloseToast}
          type="warning"
        />
      </div>

      {/* Search results - overlay on top */}
      {showSearchResults && (
        <SearchResults
          results={searchResults}
          query={searchQuery}
          onSeeMore={onSearchSeeMore}
          onClose={onCloseSearchResults}
        />
      )}

      {/* Upcoming Movies Section */}
      <div className="flex flex-col w-full border-none gap-6 md:gap-8 lg:gap-14 px-4 md:px-8 lg:px-[80px] py-6 md:py-8">
        {isUpcomingLoading ? (
          <CategoryTitleSkeleton />
        ) : (
          <MovieCategory 
            title={"Upcoming"} 
            onSeeMore={onUpcomingSeeMore}
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
            onSeeMore={onPopularSeeMore}
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
            onSeeMore={onTopRatedSeeMore}
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
}

