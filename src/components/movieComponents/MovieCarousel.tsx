"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import Link from 'next/link';

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

  if (!movies || movies.length === 0) return null;

  const nextMovie = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevMovie = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToMovie = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMovie = movies[currentIndex];

  // Fallback image if backdrop_path is null
  const getImageUrl = (movie: Movie) => {
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    } else if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } 
    else {
      return 'https://via.placeholder.com/1280x720/000000/FFFFFF?text=Movie+Poster'; // Online placeholder
    }
  };

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-[80px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 transform rotate-45"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        </div>
      </div>

      {/* Debug info - API data check */}
      <div className="px-4 md:px-[80px] mb-4 text-white text-sm bg-black bg-opacity-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Total movies: {movies.length}</p>
        <p>Current index: {currentIndex}</p>
        <p>Current movie title: {currentMovie.title}</p>
        <p>Current movie ID: {currentMovie.id}</p>
        <p>Backdrop path: {currentMovie.backdrop_path || 'null'}</p>
        <p>Poster path: {currentMovie.poster_path || 'null'}</p>
        <p>Image URL: {getImageUrl(currentMovie)}</p>
        <p>All movies data:</p>
        <pre className="text-xs overflow-auto max-h-32">
          {JSON.stringify(movies, null, 2)}
        </pre>
      </div>

      {/* Carousel container */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg border-2 border-red-500">
        {/* Movie background - Using img tag like MovieCard.tsx */}
        <img
          src={getImageUrl(currentMovie)}
          alt={currentMovie.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
          style={{
            zIndex: 25, // Between overlay (20) and navigation (20)
            border: '2px solid green', // Debug: img border
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
          }}
        />
        
        {/* Debug: Image info */}
        <div className="absolute top-4 left-4 z-50 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          <p>Image URL: {getImageUrl(currentMovie)}</p>
          <p>Backdrop: {currentMovie.backdrop_path || 'null'}</p>
          <p>Poster: {currentMovie.poster_path || 'null'}</p>
          <p>Style applied: img tag only (like MovieCard.tsx)</p>
          <p>Z-index: img=25, overlay=20, nav=20, debug=50</p>
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20" />
        
        {/* Navigation arrows */}
        <button
          onClick={prevMovie}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-500" />
        </button>
        
        <button
          onClick={nextMovie}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </button>

        {/* Movie details */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12">
          <div className="max-w-2xl">
            <div className="flex flex-col items-start gap-3 mb-3">
              <span className="text-sm md:text-base font-medium text-blue-400 bg-blue-900 bg-opacity-50 px-3 py-1 rounded-full">
                Now Playing:
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm md:text-base font-medium">
                  {currentMovie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            
            <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
              {currentMovie.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMovie(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
