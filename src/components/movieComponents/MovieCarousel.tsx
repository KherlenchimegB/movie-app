"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import Link from 'next/link';
import TrailerModal from './TrailerModal';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
}

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
}

// Movie carousel component
export default function MovieCarousel({ movies, title }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  if (!movies || movies.length === 0) return null;

  const nextMovie = () => {
   
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % movies.length;
   
      return newIndex;
    });
  };

  const prevMovie = () => {
    console.log('Prev clicked, current index:', currentIndex, 'total movies:', movies.length);
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + movies.length) % movies.length;
      console.log('New index:', newIndex);
      return newIndex;
    });
  };

  const goToMovie = (index: number) => {
    console.log('Go to movie:', index);
    setCurrentIndex(index);
  };

  const currentMovie = movies[currentIndex];

  // Fallback image if backdrop_path is null
  const getImageUrl = (movie: Movie) => {
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    } else if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
      return 'https://via.placeholder.com/1280x720/000000/FFFFFF?text=Movie+Poster';
    }
  };

  const openTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };

  return (
    <div className="w-full">
      {/* Carousel container */}
      <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px] overflow-hidden">
        {/* Movie background */}
        <img
          src={getImageUrl(currentMovie)}
          alt={currentMovie.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />
        
        {/* Navigation arrows */}
        <button
          onClick={() => {     
            prevMovie();
          }}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border-2 border-white"
          style={{ zIndex: 100 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
        </button>
        
        <button
          onClick={() => {
            nextMovie();
          }}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border-2 border-white"
          style={{ zIndex: 100 }}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
        </button>

        {/* Movie details - Overlay on desktop/tablet, hidden on mobile */}
        <div className="hidden sm:flex relative flex-col justify-end h-full p-6 md:p-12">
          <div className="max-w-2xl ml-6">
            <div className="flex flex-col items-start gap-3 mb-3">
              <span className="text-sm md:text-base font-medium text-white rounded-full">
                Now Playing:
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm md:text-base font-medium">
                  {currentMovie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            
            <p className="w-2/3 text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
              {currentMovie.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={openTrailerModal}
                className="flex items-center gap-2 bg-white hover:bg-red-700 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </button>
              <Link 
                href={`/movies/${currentMovie.id}`}
                className="flex items-center justify-center border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMovie(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Movie details - Below the image (Mobile only) */}
      <div className="sm:hidden bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start gap-2 mb-3">
            <span className="text-xs font-medium text-gray-600">
              Now Playing:
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">
                {currentMovie.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {currentMovie.title}
          </h1>
          
          <p className="w-full text-xs text-gray-600 mb-4 leading-relaxed">
            {currentMovie.overview}
          </p>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={openTrailerModal}
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <Play className="w-4 h-4" />
              Watch Trailer
            </button>
            <Link 
              href={`/movies/${currentMovie.id}`}
              className="flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={closeTrailerModal}
        movieId={currentMovie.id}
        movieTitle={currentMovie.title}
      />
    </div>
  );
}
