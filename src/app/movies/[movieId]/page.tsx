import Navigation from "@/components/movieComponents/Navigation";
import Footer from "@/components/movieComponents/Footer";
import ShowDetails from "../../../components/movieComponents/ShowDetails";
import {
  MovieCard,
  MovieCategory,
} from "@/components/movieComponents/MovieCard";
import Link from "next/link";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
export default async function MovieDetails({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const responseCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const dataCredit = await responseCredit.json();

  const responseDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const dataDetails = await responseDetails.json();

  const responseMoreLike = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const dataMoreLike = await responseMoreLike.json();

  const imgBaseUrl = "https://image.tmdb.org/t/p/w400";

  return (
    <div className="flex flex-wrap gap-3 px-48">
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
          {dataDetails?.genres?.map((genre: { name: string }) => {
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
          {dataCredit?.crew?.map(
            (cast: { job: string; original_name: string }) => {
              if (cast.job === "Director") {
                return <span className="px-2 ">{cast.original_name}</span>;
              }
            }
          )}
        </div>

        <div className="w-full border-t-2"></div>

        <div className="w-full flex gap-3">
          <span className="font-bold">Writers</span>
          {dataCredit?.crew?.map(
            (cast: { job: string; original_name: string }) => {
              if (cast.job === "Writer" || cast.job === "Story") {
                return <span className="px-2 ">{cast.original_name}</span>;
              }
            }
          )}
        </div>

        <div className="w-full border-t-2"></div>

        <div className="flex w-full gap-3">
          <span className="font-bold">Stars</span>
          {dataCredit?.cast?.map(
            (cast: { cast_id: number; original_name: string }) => {
              if (cast.cast_id === 1 || cast.cast_id === 2) {
                return <span className="px-2 ">{cast.original_name}</span>;
              }
            }
          )}
        </div>
        <div className="w-full border-t-2"></div>
      </div>

      <div className="flex flex-col w-full border-none gap-14 px-[80px]">
        <MovieCategory title={"More like this"} />
        <div className="grid w-full grid-cols-5 grid-rows-1 gap-5">
          {dataMoreLike?.results
            ?.slice(0, 5)
            .map(
              (movie: {
                id: number;
                title: string;
                poster_path: string;
                vote_average: number;
              }) => {
                return (
                  <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      image={movie.poster_path}
                      rank={movie.vote_average}
                    />
                  </Link>
                );
              }
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
