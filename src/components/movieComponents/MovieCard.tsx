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
      className="flex flex-col w-auto bg-[#F4F4F5] border border-gray-200 rounded-md h-fit gap-2.5 cursor-pointer"
      // onClick={MovieDetails}
    >
      <img
        src={`https://image.tmdb.org/t/p/w400${image}`}
        className="w-full border-none rounded-md"
        alt="Poster"
      />
      <div className="flex items-center justify-start gap-2">
        <Star className="fill-[#fcf403] text-[#fcf403]" />
        <p className="text-xl">{Math.floor(rank)}/10</p>
      </div>
      <h1>{title}</h1>
    </div>
  );
};
export const MovieCategory = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between w-full mt-13 h-9">
      <div className=" flex items-center justify-center w-[250px] h-full border-none rounded-2xl p-2">
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <button className="flex items-center justify-center w-[166px] h-full border-none rounded-2xl p-2 cursor-pointer">
        See more <ArrowRight className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
};
