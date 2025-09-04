import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export const MovieCard = ({
  id,
  title,
  image,
  rank,
}: {
  id: number;
  title: string;
  image: string;
  rank: number;
}) => {
  return (
    <Link href={`/movies/${id}`}>
      <div
        className="flex flex-col w-auto bg-[#F4F4F5] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md h-fit gap-2.5 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <img
          src={`https://image.tmdb.org/t/p/w400${image}`}
          className="w-full border-none rounded-md"
          alt="Poster"
        />
        <div className="flex items-center justify-start gap-2 px-2">
          <Star className="fill-[#fcf403] text-[#fcf403] w-4 h-4 md:w-5 md:h-5" />
          <p className="text-sm md:text-xl text-gray-900 dark:text-gray-100">{Math.floor(rank)}/10</p>
        </div>
        <h1 className="text-sm md:text-base font-medium px-2 pb-2 line-clamp-2 text-gray-900 dark:text-gray-100">{title}</h1>
      </div>
    </Link>
  );
};

export const MovieCategory = ({ 
  title, 
  onSeeMore 
}: { 
  title: string; 
  onSeeMore?: () => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-8 md:mt-13 h-auto md:h-9 gap-4 sm:gap-0">
      <div className="flex items-center justify-center w-full sm:w-[250px] h-full border-none rounded-2xl p-2">
        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</p>
      </div>
      <button 
        onClick={onSeeMore}
        className="flex items-center justify-center w-full sm:w-[166px] h-full border-none rounded-2xl p-2 cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm md:text-base text-gray-900 dark:text-gray-100">See more</span>
        <ArrowRight className="w-[16px] h-[16px] ml-1" />
      </button>
    </div>
  );
};
