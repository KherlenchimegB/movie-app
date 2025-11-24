"use client";
import React from "react";
import { useMovieData } from "@/hooks/useMovieData";
import { useSearch } from "@/hooks/useSearch";
import { useMovieNavigation } from "@/hooks/useMovieNavigation";
import MovieSectionView from "@/components/movieComponents/MovieSectionView";
import HomePageView from "@/components/movieComponents/HomePageView";

const SWR = () => {
  // Movie data hooks
  const {
    moviePopularData,
    movieUpcomingData,
    movieTopRatedData,
    movieNowPlayingData,
    isHeroLoading,
    isPopularLoading,
    isUpcomingLoading,
    isTopRatedLoading,
  } = useMovieData();

  // Search hooks
  const {
    searchQuery,
    searchResults,
    isSearching,
    showSearchResults,
    showToast,
    handleSearch,
    handleClearSearch,
    handleSearchSeeMore,
    handleCloseSearchResults,
    closeToast,
  } = useSearch();

  // Navigation hooks
  const {
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
  } = useMovieNavigation(
    moviePopularData,
    movieUpcomingData,
    movieTopRatedData
  );

  // If a section is active, show only that section
  if (activeSection) {
    return (
      <MovieSectionView
        activeSection={activeSection}
        currentPage={currentPage}
        totalPages={totalPages}
        currentMovies={currentMovies}
        searchQuery={searchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        onBackToHome={handleBackToHome}
        onPageChange={setCurrentPage}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        getSectionTitle={getSectionTitle}
      />
    );
  }

  // Default home page view
  return (
    <HomePageView
      movieNowPlayingData={movieNowPlayingData}
      movieUpcomingData={movieUpcomingData}
      moviePopularData={moviePopularData}
      movieTopRatedData={movieTopRatedData}
      isHeroLoading={isHeroLoading}
      isUpcomingLoading={isUpcomingLoading}
      isPopularLoading={isPopularLoading}
      isTopRatedLoading={isTopRatedLoading}
      searchQuery={searchQuery}
      searchResults={searchResults}
      showSearchResults={showSearchResults}
      showToast={showToast}
      onSearch={handleSearch}
      onClearSearch={handleClearSearch}
      onSearchSeeMore={handleSearchSeeMore}
      onCloseSearchResults={handleCloseSearchResults}
      onCloseToast={closeToast}
      onUpcomingSeeMore={handleUpcomingSeeMore}
      onPopularSeeMore={handlePopularSeeMore}
      onTopRatedSeeMore={handleTopRatedSeeMore}
      onGenreSelect={handleGenreSelect}
    />
  );
};

export default SWR;
