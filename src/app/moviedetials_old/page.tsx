"use client";
import React, { useEffect, useState } from "react";
// import { Movie } from "../page";
import Navigation from "@/components//components/Navigation";
import Footer from "@/components//components/Footer";
import ShowDetails from "../movies/components/DetialsMovie";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
type MovieDetailsType = {
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
  results: MovieDetailsType;
};
const MovieDetails = () => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w400";
  const [movieDetailData, setMovieDetailData] = useState<MovieResponse>();
  const [movieCreditsData, setMovieCreditsData] = useState<MovieResponse>();
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/552524/credits?language=en-US`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieCreditsData(data);
        console.log("movie credits data", data);
      });
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/552524?language=en-US`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetailData(data);
        console.log("movie detail data", data);
      });
  }, []);
  return (
    <div className="flex flex-wrap gap-3 p-2">
      <Navigation />

      <div className="flex flex-col w-full border-none gap-14 px-[80px]">
        <ShowDetails
          vote_average={movieDetailData?.vote_average}
          release_date={movieDetailData?.release_date}
          adult={movieDetailData?.adult}
          title={movieDetailData?.title}
          runtime={movieDetailData?.runtime}
          revenue={movieDetailData?.revenue}
          image={
            "https://image.tmdb.org/t/p/w400" + movieDetailData?.poster_path
          }
          backdrop_path={
            "https://image.tmdb.org/t/p/w400" + movieDetailData?.backdrop_path
          }
        />
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
