"use client";

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearching: boolean;
  searchResults: any[];
  searchQuery: string;
}

export default function SearchBar({
  onSearch,
  onClear,
  isSearching,
  searchResults,
  searchQuery
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    onClear();
  };

  return (
    <div className="relative w-full max-w-md">
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
  );
}
