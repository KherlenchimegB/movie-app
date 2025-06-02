import { log } from "console";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  console.log(movieId);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${movieId}`
  );

  const data = await response.json();
  console.log("data", data);
  return (
    <div>
      <div className="flex flex-col items-center w-full h-auto border border-red-300">
        <div className="flex justify-between w-full">
          <div className="w-fit h-[100px]">
            <p className="text-4xl font-bold">{props.title}</p>
            <p>
              {props.release_date} · {props.adult ? "PG13" : "PG"} ·{" "}
              {props.runtime}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start gap-2 border">
            <p className="text-xs">Rating</p>
            <div className="flex items-center gap-2">
              <img src="./star.svg" alt="star" className="h-4" />
              <p className="text-xl">{Math.floor(props.vote_average)}/10</p>
            </div>
            <p className="text-xs">{Math.floor(props.revenue / 1000000)}m</p>
          </div>
        </div>
        <div className="flex w-full gap-6 border">
          <img src={props.image} alt="poster" className=" h-[428px]" />
          <img src={props.back_drop} alt="back drop" className=" h-[428px]" />
        </div>
      </div>
    </div>
  );
}
