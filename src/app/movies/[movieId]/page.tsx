import Navigation from "@/components/movieComponents/Navigation";
import Footer from "@/components/movieComponents/Footer";
import ShowDetails from "../../../components/movieComponents/ShowDetails";
import {
  MovieCard,
  MovieCategory,
} from "@/components/movieComponents/MovieCard";

// TMDB API Token - Environment variable
const token = process.env.NEXT_PUBLIC_TMDB_TOKEN || "";

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
    <div className="flex flex-col min-h-screen">
      <Navigation 
        showSearch={true} 
        isSearching={false} 
        searchResults={[]} 
        searchQuery="" 
      />

      <div className="flex flex-wrap gap-3 px-4 md:px-8 lg:px-12 xl:px-48">
        <div className="flex flex-col w-full border-none gap-8 md:gap-12 px-4 md:px-8 lg:px-[80px]">
          <ShowDetails
            vote_average={dataDetails?.vote_average}
            release_date={dataDetails?.release_date}
            adult={dataDetails?.adult}
            title={dataDetails?.title}
            runtime={dataDetails?.runtime}
            revenue={dataDetails?.revenue}
            image={imgBaseUrl + dataDetails?.poster_path}
            backdrop_path={imgBaseUrl + dataDetails?.backdrop_path}
            movieId={parseInt(movieId)}
            genres={dataDetails?.genres}
            overview={dataDetails?.overview}
            director={dataCredit?.crew?.find((cast: { job: string }) => cast.job === "Director")?.original_name}
            writers={dataCredit?.crew?.filter((cast: { job: string }) => cast.job === "Writer" || cast.job === "Story").map((cast: { original_name: string }) => cast.original_name)}
            stars={dataCredit?.cast?.slice(0, 2).map((cast: { original_name: string }) => cast.original_name)}
          />
        </div>

        <div className="flex flex-col w-full border-none gap-4 md:gap-5 px-4 md:px-8 lg:px-[80px] mt-0 md:mt-[60px]">
           <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
            <span className="font-bold text-sm md:text-base">Director</span>
            <div className="flex flex-wrap gap-2">
              {dataCredit?.crew?.map(
                (cast: { job: string; original_name: string }, index: number) => {
                  if (cast.job === "Director") {
                    return <span key={`director-${index}`} className="px-2 text-sm md:text-base">{cast.original_name}</span>;
                  }
                }
              )}
            </div>
          </div>

          <div className="w-full border-t-2"></div>

          <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
            <span className="font-bold text-sm md:text-base">Writers</span>
            <div className="flex flex-wrap gap-2">
              {dataCredit?.crew?.map(
                (cast: { job: string; original_name: string }, index: number) => {
                  if (cast.job === "Writer" || cast.job === "Story") {
                    return <span key={`writer-${index}`} className="px-2 text-sm md:text-base">{cast.original_name}</span>;
                  }
                }
              )}
            </div>
          </div>

          <div className="w-full border-t-2"></div>

          <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-3">
            <span className="font-bold text-sm md:text-base">Stars</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 text-sm md:text-base">{dataCredit?.cast[0]?.original_name}</span>
              <span className="px-2 text-sm md:text-base">{dataCredit?.cast[1]?.original_name}</span>
            </div>
          </div>
          <div className="w-full border-t-2"></div>
        </div>

        <div className="flex flex-col w-full border-none gap-8 md:gap-14 px-4 md:px-8 lg:px-[80px]">
          <MovieCategory title={"More like this"} />
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
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
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      image={movie.poster_path}
                      rank={movie.vote_average}
                    />
                  );
                }
              )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
