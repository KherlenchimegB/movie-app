"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Movie } from '@/types/movie.types';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  isSearching: boolean;
  searchResults: Movie[];
  searchQuery: string;
  onActiveStateChange?: (isActive: boolean) => void;
}

export default function SearchBar({
  onSearch,
  onClear,
  isSearching,
  searchQuery,
  onActiveStateChange
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      if (onSearch) {
        onSearch(localQuery.trim());
      } else {
        // Default behavior - search page руу шилжих
        window.location.href = `/search?q=${encodeURIComponent(localQuery.trim())}`;
      }
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    handleDeactivate();
    if (onClear) {
      onClear();
    }
  };


  const handleFocus = () => {
    setIsActive(true);
    if (onActiveStateChange) {
      onActiveStateChange(true);
    }
  };

  const handleDeactivate = () => {
    setIsActive(false);
    if (onActiveStateChange) {
      onActiveStateChange(false);
    }
  };

  return (
    <div className="relative">
      {/* Mobile Active State */}
      <div className={`md:hidden ${isActive ? 'block' : 'hidden'}`}>
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={handleDeactivate}
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
          
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Inactive State */}
      <div className={`md:hidden ${!isActive ? 'block' : 'hidden'}`}>
        <button
          onClick={handleFocus}
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Search className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Desktop State */}
      <div className="hidden md:block relative w-full max-w-md">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Loading spinner */}
          {isSearching && (
            <div className="absolute -bottom-12 left-0 right-0 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-50">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
