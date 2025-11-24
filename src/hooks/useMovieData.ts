import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie.types';

// TMDB API Token - Environment variable
// Client-side дээр environment variable-ууд runtime дээр ажиллахгүй байж болно
const getToken = () => {
  if (typeof window !== 'undefined') {
    // Client-side дээр environment variable-ууд build time дээр embed хийгддэг
    return process.env.NEXT_PUBLIC_TMDB_TOKEN || '';
  }
  return process.env.NEXT_PUBLIC_TMDB_TOKEN || '';
};

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

export const useMovieData = () => {
  // Loading states
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(true);

  const [moviePopularData, setMoviePopularData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieUpcomingData, setMovieUpcomingData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieTopRatedData, setMovieTopRatedData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });
  const [movieNowPlayingData, setMovieNowPlayingData] = useState<MovieResponse>({
    results: [],
    total_pages: 0,
  });

  useEffect(() => {
    // Popular movies
    const token = getToken();
    if (!token) {
      console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
      setIsPopularLoading(false);
      return;
    }
    
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMoviePopularData(data);
        setIsPopularLoading(false);
      })
      .catch((error) => {
        console.error('Popular movies алдаа:', error);
        setIsPopularLoading(false);
      });
  }, []);

  useEffect(() => {
    // Upcoming movies
    const token = getToken();
    if (!token) {
      console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
      setIsUpcomingLoading(false);
      return;
    }
    
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovieUpcomingData(data);
        setIsUpcomingLoading(false);
      })
      .catch((error) => {
        console.error('Upcoming movies алдаа:', error);
        setIsUpcomingLoading(false);
      });
  }, []);

  useEffect(() => {
    // Top rated movies
    const token = getToken();
    if (!token) {
      console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
      setIsTopRatedLoading(false);
      return;
    }
    
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovieTopRatedData(data);
        setIsTopRatedLoading(false);
      })
      .catch((error) => {
        console.error('Top rated movies алдаа:', error);
        setIsTopRatedLoading(false);
      });
  }, []);

  useEffect(() => {
    // Genres
    const token = getToken();
    if (!token) {
      return;
    }
    
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Genre data is not used in this component
      })
      .catch((error) => {
        console.error('Genres алдаа:', error);
      });
  }, []);

  useEffect(() => {
    // Now playing movies (Hero section)
    const token = getToken();
    if (!token) {
      console.error('TMDB API Token олдсонгүй. Environment variable шалгана уу.');
      setIsHeroLoading(false);
      return;
    }
    
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API алдаа: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovieNowPlayingData(data);
        setIsHeroLoading(false);
      })
      .catch((error) => {
        console.error('Now playing movies алдаа:', error);
        setIsHeroLoading(false);
      });
  }, []);

  return {
    moviePopularData,
    movieUpcomingData,
    movieTopRatedData,
    movieNowPlayingData,
    isHeroLoading,
    isPopularLoading,
    isUpcomingLoading,
    isTopRatedLoading,
  };
};

