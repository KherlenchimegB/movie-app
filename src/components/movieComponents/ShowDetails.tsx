import { Star } from "lucide-react";
const ShowDetails = ({
  title,
  release_date,
  adult,
  runtime,
  vote_average,
  revenue,
  image,
  backdrop_path,
}: {
  title: string;
  release_date: string;
  adult: boolean;
  runtime: number;
  vote_average: number;
  revenue: number;
  image: string;
  backdrop_path: string;
}) => {
  return (
    <div className="flex flex-col items-center w-full h-auto border-none">
      <div className="flex justify-between w-full">
        <div className="w-fit h-[100px] ">
          <p className="text-4xl font-bold">{title}</p>
          <p className="mt-4">
            {release_date} · {adult ? "PG13" : "PG"} · {runtime}
          </p>
        </div>

        <div className="flex flex-col items-center justify-start gap-1">
          <p className="text-xs">Rating</p>
          <div className="flex items-center gap-2">
            <Star className="w-18px h-18px fill-[#fcf403] text-[#fcf403]" />
            <p className="text-xl">{Math.floor(vote_average)}/10</p>
          </div>
          <p className="text-xs">{Math.floor(revenue / 1000000)}m</p>
        </div>
      </div>

      <div className="flex gap-6 border-none rounded-md w-full">
        <img
          src={image}
          alt="poster"
          className="w-1/3 border-none rounded-md"
        />
        <img
          src={backdrop_path}
          alt="back drop"
          className=" w-2/3 border-none rounded-md"
        />
      </div>
    </div>
  );
};
export default ShowDetails;
