"use client";

import { Star, Play } from "lucide-react";
import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface ShowDetailsProps {
  title: string;
  release_date: string;
  adult: boolean;
  runtime: number;
  vote_average: number;
  revenue: number;
  image: string;
  backdrop_path: string;
  movieId?: number;
  genres?: { id: number; name: string }[];
  overview?: string;
  director?: string;
  writers?: string[];
  stars?: string[];
}

const ShowDetails = ({
  title,
  release_date,
  adult,
  runtime,
  vote_average,
  revenue,
  image,
  backdrop_path,
  movieId,
  genres = [],
  overview = "",
  director = "",
  writers = [],
  stars = [],
}: ShowDetailsProps) => {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const openTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        {/* Movie Info Section - Top */}
        <div className="px-4 py-4 bg-white">
          <div className="flex justify-between items-start">
            {/* Left Side - Title and Date */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-black mb-1">{title}</h1>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span>{release_date}</span>
                <span>·</span>
                <span>{adult ? "PG13" : "PG"}</span>
                <span>·</span>
                <span>{runtime}min</span>
              </div>
            </div>

            {/* Right Side - Rating */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#fcf403] text-[#fcf403]" />
                <span className="text-black text-lg font-medium">{Math.floor(vote_average)}/10</span>
              </div>
              <span className="text-gray-500 text-xs mt-1">{Math.floor(revenue / 1000000)}k</span>
            </div>
          </div>
        </div>

        {/* Hero Section - Movie Image with Overlay Button */}
        <div className="relative w-full h-80">
          <img
            src={backdrop_path}
            alt="backdrop"
            className="w-full h-full object-cover"
          />
          
          {/* Play Trailer Button Overlay */}
          {movieId && (
            <div className="absolute bottom-4 left-4">
              <button
                onClick={openTrailerModal}
                className="flex items-center justify-center gap-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-black px-4 py-2 rounded-full font-medium transition-colors border border-gray-200 shadow-lg"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Play trailer</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Section - Small Poster, Genres, and Details */}
        <div className="px-4 py-6 space-y-0">
          {/* Small Poster and Content Row */}
          <div className="flex gap-4">
            {/* Small Poster */}
            <div className="flex-shrink-0">
              <img
                src={image}
                alt="poster"
                className="w-20 h-28 object-cover rounded-md"
              />
            </div>

            {/* Right Side Content */}
            <div className="flex-1 space-y-4">
              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Movie Description - Below Genres */}
              {overview && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {overview}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-center w-full h-auto border-none">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0">
          <div className="w-full lg:w-fit h-auto lg:h-[100px] text-center lg:text-left">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</p>
            <p className="mt-2 md:mt-4 text-sm md:text-base">
              {release_date} · {adult ? "PG13" : "PG"} · {runtime}min
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end justify-start gap-1">
            <p className="text-xs">Rating</p>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#fcf403] text-[#fcf403]" />
              <p className="text-lg md:text-xl">{Math.floor(vote_average)}/10</p>
            </div>
            <p className="text-xs">{Math.floor(revenue / 1000000)}m</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 border-none rounded-md w-full mt-6">
          <img
            src={image}
            alt="poster"
            className="w-full lg:w-1/3 h-auto max-w-sm lg:max-w-none mx-auto lg:mx-0 border-none rounded-md"
          />
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <img
              src={backdrop_path}
              alt="back drop"
              className="w-full h-48 md:h-64 lg:h-auto border-none rounded-md object-cover"
            />
            
            {/* Watch Trailer Button */}
            {movieId && (
              <button
                onClick={openTrailerModal}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors w-full text-sm md:text-base"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {movieId && (
        <TrailerModal
          isOpen={isTrailerModalOpen}
          onClose={closeTrailerModal}
          movieId={movieId}
          movieTitle={title}
        />
      )}
    </div>
  );
};

export default ShowDetails;
