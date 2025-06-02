const ShowDetails = (props) => {
  return (
    <div className="flex flex-col items-center w-full h-auto border-none">
      <div className="flex justify-between w-full">
        <div className="w-fit h-[100px] ">
          <p className="text-4xl font-bold">{props.title}</p>
          <p className="mt-4">
            {props.release_date} · {props.adult ? "PG13" : "PG"} ·{" "}
            {props.runtime}
          </p>
        </div>

        <div className="flex flex-col items-center justify-start gap-1">
          <p className="text-xs">Rating</p>
          <div className="flex items-center gap-2">
            <img src="./star.svg" alt="star" className="h-4" />
            <p className="text-xl">{Math.floor(props.vote_average)}/10</p>
          </div>
          <p className="text-xs">{Math.floor(props.revenue / 1000000)}m</p>
        </div>
      </div>

      <div className="flex w-full gap-6 border-none rounded-md h-[400px]">
        <img
          src={props.image}
          alt="poster"
          className=" w-1/3 border-none rounded-md"
        />
        <img
          src={props.backdrop_path}
          alt="back drop"
          className=" w-2/3 border-none rounded-md"
        />
      </div>
    </div>
  );
};
export default ShowDetails;
