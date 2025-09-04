"use client";

import React, { useState } from 'react';
import { ArrowDown, X } from 'lucide-react';

interface Genre {
  id: number;
  name: string;
}

interface GenreDropdownProps {
  onGenreSelect?: (genre: Genre) => void;
}

const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export default function GenreDropdown({ onGenreSelect }: GenreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreClick = (genre: Genre) => {
    if (onGenreSelect) {
      onGenreSelect(genre);
    } else {
      // Default behavior - genre page руу шилжих
      window.location.href = `/genre/${genre.id}`;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border rounded-md border-[#E4E4E7] px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>Genre</span>
        <ArrowDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-2xl z-[9999]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Genres</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">See lists of movies by genre</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre)}
                  className="flex items-center justify-between p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-200 dark:border-gray-600 text-xs cursor-pointer"
                >
                  <span className="text-xs font-medium truncate text-gray-700 dark:text-gray-300">{genre.name}</span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs">&gt;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
