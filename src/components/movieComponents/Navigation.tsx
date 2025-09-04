"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import SearchBar from "./SearchBar";
import GenreDropdown from "./GenreDropdown";
import { useTheme } from "@/contexts/ThemeContext";
import { Movie } from "@/types/movie.types";

interface NavigationProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  isSearching?: boolean;
  searchResults?: Movie[];
  searchQuery?: string;
  showSearch?: boolean;
  onGenreSelect?: (genre: { id: number; name: string }) => void;
}

const Navigation = ({
  onSearch,
  onClear,
  isSearching = false,
  searchResults = [],
  searchQuery = '',
  showSearch = true,
  onGenreSelect
}: NavigationProps = {}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // Event handler функцуудыг дотор нь тодорхойлох
  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior - search page руу шилжих
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    // Default behavior - search query-г цэвэрлэх
    if (typeof window !== 'undefined') {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.value = '';
      }
    }
  };

  const handleGenreSelect = (genre: { id: number; name: string }) => {
    if (onGenreSelect) {
      onGenreSelect(genre);
    } else {
      // Default behavior - genre page руу шилжих
      window.location.href = `/genre/${genre.id}`;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      {/* Mobile Layout */}
      <div className="flex flex-row md:hidden items-center justify-between px-4 py-3 h-[60px]">
        {/* Logo - Left side (hidden when search is active) */}
        {!isSearchActive && (
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src="../film.svg" alt="film logo" className="w-[20px] h-[20px]" />
            <span className="text-[18px] font-bold text-indigo-700 dark:text-indigo-400">Movie Z</span>
          </button>
        )}

        {/* Right side - Search + Dark Mode */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClear}
              isSearching={isSearching}
              searchResults={searchResults}
              searchQuery={searchQuery}
              onActiveStateChange={setIsSearchActive}
            />
          )}
          
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-[36px] h-[36px] border border-[#E4E4E7] dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-[18px] h-[18px] text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-[18px] h-[18px] text-yellow-500" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-between items-center h-[60px] px-4 py-0 gap-0">
        <div className="flex items-center justify-between gap-1">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src="../film.svg" alt="film logo" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-bold text-indigo-700 dark:text-indigo-400">Movie Z</span>
          </button>
        </div>
        <div className="flex flex-row justify-between gap-2 w-auto">
          <GenreDropdown onGenreSelect={handleGenreSelect} />
          {showSearch && (
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClear}
              isSearching={isSearching}
              searchResults={searchResults}
              searchQuery={searchQuery}
            />
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-[36px] h-[36px] border border-[#E4E4E7] dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-[18px] h-[18px] text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="w-[18px] h-[18px] text-yellow-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
