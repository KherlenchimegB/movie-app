import { ArrowRight, Star } from "lucide-react";

export const MovieCard = ({
  title,
  image,
  rank,
}: {
  title: string;
  image: string;
  rank: number;
}) => {
  return (
    <div
      className="flex flex-col w-auto bg-[#F4F4F5] border border-gray-200 rounded-md h-fit gap-2.5 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={`https://image.tmdb.org/t/p/w400${image}`}
        className="w-full border-none rounded-md"
        alt="Poster"
      />
      <div className="flex items-center justify-start gap-2 px-2">
        <Star className="fill-[#fcf403] text-[#fcf403] w-4 h-4 md:w-5 md:h-5" />
        <p className="text-sm md:text-xl">{Math.floor(rank)}/10</p>
      </div>
      <h1 className="text-sm md:text-base font-medium px-2 pb-2 line-clamp-2">{title}</h1>
    </div>
  );
};

export const MovieCategory = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-8 md:mt-13 h-auto md:h-9 gap-4 sm:gap-0">
      <div className="flex items-center justify-center w-full sm:w-[250px] h-full border-none rounded-2xl p-2">
        <p className="text-xl md:text-2xl font-bold">{title}</p>
      </div>
      <button className="flex items-center justify-center w-full sm:w-[166px] h-full border-none rounded-2xl p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
        <span className="text-sm md:text-base">See more</span>
        <ArrowRight className="w-[16px] h-[16px] ml-1" />
      </button>
    </div>
  );
};
