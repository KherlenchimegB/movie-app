import { useState } from 'react';
import { Movie } from '@/types/movie.types';

// TMDB API Token - Environment variable
const getToken = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_TMDB_TOKEN || '';
  }
  return process.env.NEXT_PUBLIC_TMDB_TOKEN || '';
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Search function
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    const token = getToken();
    if (!token) {
      console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
      setShowToast(true);
      return;
    }
    
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
      
      if (!response.ok) {
        throw new Error(`API алдаа: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
      
      // Хэрэв үр дүн байхгүй бол toast харуулах
      if (data.total_results === 0 && query.trim()) {
        setShowToast(true);
      }
    } catch (error) {
      console.error('Хайлтын алдаа:', error);
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
      // Search query-г localStorage-д хадгалах
      if (searchQuery && searchQuery.trim()) {
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('searchResults', JSON.stringify(searchResults));
      }
      
      // Search page руу шилжих
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery || '')}`;
      window.location.href = searchUrl;
    } catch {
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

  return {
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
  };
};

