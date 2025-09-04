import { 
  MovieResponse, 
  MovieDetails, 
  GenreResponse, 
  SearchResponse, 
  MovieVideosResponse, 
  MovieCreditsResponse 
} from '@/types/movie.types';

// API тохиргоо
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// TMDB API Token - Environment variable
const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN || '';

// API хүсэлт илгээх функц
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API алдаа: ${response.status}`);
  }

  return response.json();
}

// Зургийн URL үүсгэх
export function getImageUrl(path: string, size: string = 'w500'): string {
  if (!path) return '/placeholder-image.jpg';
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}

// Алдартай кинонууд
export async function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  return fetchAPI<MovieResponse>(`/movie/popular?language=en-US&page=${page}`);
}

// Удахгүй гарах кинонууд
export async function getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
  return fetchAPI<MovieResponse>(`/movie/upcoming?language=en-US&page=${page}`);
}

// Өндөр үнэлгээтэй кинонууд
export async function getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
  return fetchAPI<MovieResponse>(`/movie/top_rated?language=en-US&page=${page}`);
}

// Одоо гарч буй кинонууд
export async function getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
  return fetchAPI<MovieResponse>(`/movie/now_playing?language=en-US&page=${page}`);
}

// Киноны дэлгэрэнгүй мэдээлэл
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchAPI<MovieDetails>(`/movie/${movieId}?language=en-US`);
}

// Жанрын жагсаалт
export async function getGenres(): Promise<GenreResponse> {
  return fetchAPI<GenreResponse>('/genre/movie/list?language=en');
}

// Жанраар кино шүүх
export async function getMoviesByGenre(
  genreIds: number[], 
  page: number = 1
): Promise<MovieResponse> {
  const genreIdsString = genreIds.join(',');
  return fetchAPI<MovieResponse>(
    `/discover/movie?language=en&with_genres=${genreIdsString}&page=${page}`
  );
}

// Хайлт
export async function searchMovies(
  query: string, 
  page: number = 1
): Promise<SearchResponse> {
  const encodedQuery = encodeURIComponent(query);
  return fetchAPI<SearchResponse>(
    `/search/movie?query=${encodedQuery}&language=en-US&page=${page}`
  );
}

// Киноны трейлер
export async function getMovieVideos(movieId: number): Promise<MovieVideosResponse> {
  return fetchAPI<MovieVideosResponse>(`/movie/${movieId}/videos?language=en-US`);
}

// Киноны жүжигчид
export async function getMovieCredits(movieId: number): Promise<MovieCreditsResponse> {
  return fetchAPI<MovieCreditsResponse>(`/movie/${movieId}/credits?language=en-US`);
}

// Ижил төстэй кинонууд
export async function getSimilarMovies(
  movieId: number, 
  page: number = 1
): Promise<MovieResponse> {
  return fetchAPI<MovieResponse>(`/movie/${movieId}/similar?language=en-US&page=${page}`);
}
