"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/components/Navigation";
import Footer from "@/components/components/Footer";
import { Search, MapPin } from "lucide-react";
import { MovieCard, MovieCategory } from "../components/components/MovieCard";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
export type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  video: boolean;
  dates: {};
  release_date: Date;
  popularity: number;
  original_language: string;
};
type MovieResponse = {
  results: Movie[];
};
const SWR = () => {
  const [moviePopularData, setMoviePopularData] = useState<MovieResponse>({
    results: [],
  });
  const [movieUpcomingData, setMovieUpcomingData] = useState<MovieResponse>({
    results: [],
  });
  const [movieTopRatedData, setMovieTopRatedData] = useState<MovieResponse>({
    results: [],
  });
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMoviePopularData(data);
        console.log("popular data", data);
      });
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieUpcomingData(data);
        console.log(
          "upcoming data",
          data,
          "poster",
          movieUpcomingData?.results[0]?.poster_path
        );
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieTopRatedData(data);
        console.log("toprated data", data);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-3 p-2">
      <Navigation />
      <div className="flex items-center justify-center h-[600px] w-full ">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w400${movieUpcomingData?.results[0]?.backdrop_path}")`,
          }}
        ></div>
      </div>

      <div className="flex flex-col w-full border-none gap-14 px-[80px]">
        <MovieCategory title={"Popular"} />
        <div className="grid w-full grid-cols-5 grid-rows-2 gap-5">
          {moviePopularData?.results?.slice(0, 10).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-full border-none gap-14 px-[80px]">
        <MovieCategory title={"Upcoming"} />
        <div className="grid w-full grid-cols-5 grid-rows-2 gap-5">
          {movieUpcomingData?.results?.slice(0, 10).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-full border-none gap-14 px-[80px]">
        <MovieCategory title={"Top rated"} />
        <div className="grid w-full grid-cols-5 grid-rows-2 gap-5">
          {movieTopRatedData?.results?.slice(0, 10).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.poster_path}
                rank={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SWR;
