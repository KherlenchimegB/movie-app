import Navigation from "@/components//components/Navigation";
import Footer from "@/components//components/Footer";
import ShowDetails from "../components/DetialsMovie";
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
export default async function MovieDetails({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  console.log(movieId);
  const responseCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const dataCredit = await responseCredit.json();
  console.log("dataCredit", dataCredit);

  const responseDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const dataDetails = await responseDetails.json();
  console.log("dataDetails", dataDetails);

  const responseGenres = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const dataGenres = await responseGenres.json();
  console.log("dataGenres", dataGenres);

  const directorName = dataCredit?.crew.filter(
    (data) => data.job === "Director"
  );
  console.log("directorName", directorName);

  const writersName = dataCredit?.crew.filter((data) => data.job === "Writer");
  console.log("writersName", writersName);

  const imgBaseUrl = "https://image.tmdb.org/t/p/w400";

  return (
    <div className="flex flex-wrap gap-3 p-2">
      <Navigation />

      <div className="flex flex-col w-full border-none gap-12 px-[80px]">
        <ShowDetails
          vote_average={dataDetails?.vote_average}
          release_date={dataDetails?.release_date}
          adult={dataDetails?.adult}
          title={dataDetails?.title}
          runtime={dataDetails?.runtime}
          revenue={dataDetails?.revenue}
          image={imgBaseUrl + dataDetails?.poster_path}
          backdrop_path={imgBaseUrl + dataDetails?.backdrop_path}
        />
      </div>

      <div className="flex flex-col w-full border-none gap-5 px-[80px] mt-[60px]">
        <div className="flex w-full gap-4">
          {dataDetails?.genres?.map((genre) => {
            return (
              <span className="px-2 border border-[#E4E4E7] rounded-2xl">
                {genre.name}
              </span>
            );
          })}
        </div>
        <span>{dataDetails.overview}</span>

        <div className="w-full flex gap-3">
          <span className="font-bold">Director</span>
          <span>{directorName[0].original_name}</span>
        </div>

        <div className="w-full flex gap-3">
          <span className="font-bold">Writers</span>
          <span>{writersName[0].original_name}</span>
        </div>

        <div className="flex w-full gap-3">
          <span className="font-bold">Stars</span>

          {dataCredit?.cast?.map((cast) => {
            if (cast.cast_id === 1 || cast.cast_id === 2) {
              return <span className="px-2 ">{cast.original_name} ·</span>;
            }
          })}
        </div>
      </div>

      <div></div>
      <Footer />
    </div>
  );
}
