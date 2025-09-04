"use client";

import React from 'react';
import { Star, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsProps {
  results: any[];
  query: string;
  onSeeMore: () => void;
  onClose: () => void;
}

export default function SearchResults({ results, query, onSeeMore, onClose }: SearchResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
      {/* Header with close button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {results.slice(0, 5).map((movie, index) => (
          <div key={movie?.id || index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/w92${movie?.poster_path || ''}`}
              alt={movie?.title || 'Movie poster'}
              className="w-12 h-16 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-movie.jpg';
              }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{movie?.title || 'Unknown Title'}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
              </div>
              <p className="text-xs text-gray-500">
                {movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </p>
            </div>
            <Link 
              href={`/movies/${movie?.id || 'unknown'}`}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              See more →
            </Link>
          </div>
        ))}
      </div>
      
      {results.length > 5 && (
        <div className="mt-4 pt-3 border-t">
          <button
            onClick={onSeeMore}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            See all results for '{query}'
          </button>
        </div>
      )}
    </div>
  );
}
