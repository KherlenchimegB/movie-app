// Киноны үндсэн мэдээлэл
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  popularity: number;
  original_language: string;
  original_title: string;
  media_type?: string;
}

// Жанрын мэдээлэл
export interface Genre {
  id: number;
  name: string;
}

// API-аас ирэх хариу
export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Жанрын жагсаалт
export interface GenreResponse {
  genres: Genre[];
}

// Хайлтын үр дүн
export interface SearchResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Киноны дэлгэрэнгүй мэдээлэл
export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

// Киноны трейлер
export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

// Киноны трейлерын жагсаалт
export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

// Жүжигчид
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  order: number;
}

// Багийн гишүүд
export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string;
}

// Жүжигчид болон багийн мэдээлэл
export interface MovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// Үйлдвэрлэгчийн компани
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

// Үйлдвэрлэгчийн улс
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Хэл
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Хайлтын параметрүүд
export interface SearchParams {
  query: string;
  page?: number;
  language?: string;
}

// Жанраар шүүх параметрүүд
export interface GenreFilterParams {
  genreIds: number[];
  page?: number;
  language?: string;
  sortBy?: string;
}
